import { useSearchGenius } from "@features/genius/api/search/search.api.ts";
import { LyricsComponent } from "@features/player/components/LyricComponent/LyricComponent.tsx";
import { usePlayer } from "@features/player/stores/player.store.ts";
import styles from "./Lyric.fragment.module.css";

export const LyricFragment = () => {
  const { music, getMusic } = usePlayer();
  const currentMusic = getMusic(music.id);
  const { data: searchs } = useSearchGenius({
    variables: { query: currentMusic?.title || "" },
  });
  // const { data: lyric } = useGetLyricGenius({
  //   variables: { path: searchs?.response.hits[0].result.path || "" },
  // });

  return (
    <div className={styles.lyric_fragment}>
      {/* <span>{lyric}</span> */}
      <LyricsComponent path={searchs?.response.hits[0].result.path || ""} />
    </div>
  );
};
