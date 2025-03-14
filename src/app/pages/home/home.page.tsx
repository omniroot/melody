import { MusicList } from "@features/musics/components/MusicList/MusicList.tsx";
import { FC, ReactNode } from "react";
import styles from "./home.page.module.css";
import { usePlayer } from "@features/player/stores/player.store.ts";

interface IProps {
  children?: ReactNode;
}

export const HomePage: FC<IProps> = () => {
  const { music } = usePlayer();

  return (
    <div className={styles.page}>
      <span>Home page</span>
      <span>Fullscreen: {String(music.isFullscreen)}</span>
      <div className={styles.musics_list}>
        <MusicList />
      </div>
      {/* <span>{searchs?.response.hits[0].result.title}</span> */}
    </div>
  );
};
