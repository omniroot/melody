import { MusicItem } from "@features/musics/components/MusicItem/MusicItem.tsx";
import { usePlayer } from "@features/player/stores/player.store.ts";
import styles from "./MusicList.module.css";
export const MusicList = () => {
  const { musicList } = usePlayer();
  return (
    <div className={styles.music_list}>
      {musicList.map((music) => {
        return <MusicItem key={music.id} music={music} />;
      })}
    </div>
  );
};
