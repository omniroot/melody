import { IMusic } from "@features/musics/types/music.types.ts";
import { FC } from "react";
import styles from "./MusicItem.module.css";
import { usePlayer } from "@features/player/stores/player.store.ts";
import { Button } from "@components/Button/Button.tsx";
interface IProps {
  music: IMusic;
}
export const MusicItem: FC<IProps> = ({ music }) => {
  const { setCurrentMusic } = usePlayer();

  const handleClick = () => {
    setCurrentMusic(music.id);
  };
  return (
    <div className={styles.music_item} onClick={handleClick}>
      <img src={music.poster} alt={music.title} className={styles.poster} />
      <div className={styles.info}>
        <span className={styles.title}>{music.title}</span>
        <span className={styles.author}>{music.artist}</span>
      </div>
      <div className={styles.actions}>
        <Button>...</Button>
      </div>
    </div>
  );
};
