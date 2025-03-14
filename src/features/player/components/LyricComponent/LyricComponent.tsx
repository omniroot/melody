import { useEffect, useState } from "react";
import axios from "axios";
import * as cheerio from "cheerio";
import { decode } from "html-entities";

interface LyricsComponentProps {
  path: string;
}

interface CheerioNode {
  type: string;
  name?: string;
  data?: string;
  children?: CheerioNode[];
}

export const LyricsComponent: React.FC<LyricsComponentProps> = ({ path }) => {
  const [lyrics, setLyrics] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`https://genius.com${path}`);
        const $ = cheerio.load(response.data);

        // Находим контейнер с текстом
        const lyricsContainer = $('[data-lyrics-container="true"]');

        if (!lyricsContainer.length) {
          throw new Error("Lyrics container not found");
        }

        // Рекурсивная функция для обработки узлов
        const processNode = (node: CheerioNode): string => {
          if (node.type === "text") {
            return decode(node.data?.trim() || "");
          }

          if (node.type === "tag") {
            if (node.name === "br") {
              return "\n";
            }

            // Обрабатываем дочерние элементы
            return (node.children || [])
              .map((child) => processNode(child))
              .join("")
              .concat(node.name === "a" ? "\n" : ""); // Добавляем перенос для ссылок
          }

          return "";
        };

        // Извлекаем и объединяем текст
        let lyricsText = lyricsContainer
          .contents()
          .toArray()
          .map((node) => processNode(node as CheerioNode))
          .join("\n");

        // Пост-обработка текста
        lyricsText = lyricsText
          .replace(/(\n\s*){2,}/g, "\n\n") // Убираем множественные переносы
          .replace(/\u00a0/g, " ") // Заменяем неразрывные пробелы
          .trim();

        setLyrics(lyricsText);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setLyrics("");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLyrics();
  }, [path]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="lyrics-container">
      <pre
        style={{
          whiteSpace: "pre-wrap",
          overflowY: "scroll",
          fontFamily: "Open Sans, sans-serif;",
        }}
      >
        {lyrics}
      </pre>
    </div>
  );
};
