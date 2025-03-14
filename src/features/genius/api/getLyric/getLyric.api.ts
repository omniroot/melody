import axios from "axios";
import { decode } from "html-entities";
import { createQuery } from "react-query-kit";

interface IProps {
  path: string;
}

const extractText = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const container = doc.querySelector('[data-lyrics-container="true"]');

  if (!container) return "";

  // Рекурсивно извлекаем текст
  const processNode = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE) {
      return decode(node.textContent || "");
    }
    if (node.nodeName === "BR") {
      return "\n";
    }
    return Array.from(node.childNodes).map(processNode).join("");
  };

  return processNode(container).replace(/\n+/g, "\n").trim();
};

const getLyricGenius = async ({ path }: IProps) => {
  const lyricsResponse = await axios.get(`https://genius.com${path}`);
  const html = lyricsResponse.data;

  // Ищем основной контейнер
  const lyricsMatch = html.match(
    /<div[^>]*data-lyrics-container="true"[^>]*>([\s\S]*?)<\/div>/i
  );
  if (!lyricsMatch) return "Текст песни не найден";

  // Декодируем HTML-сущности и очищаем текст
  return extractText(lyricsMatch[1]);
};

export const useGetLyricGenius = createQuery<string, IProps>({
  queryKey: ["search-genius"],
  fetcher: async ({ path }) => {
    const response = await getLyricGenius({ path });
    return response;
  },
});
