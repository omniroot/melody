import {
  AddToPlaylistIcon,
  NextIcon,
  PauseIcon,
  PlayIcon,
  PrevIcon,
  RepeatIcon,
} from "@/shared/icons/index.ts";
import { IconButton } from "@components/IconButton/IconButton.tsx";
import { usePlayer } from "@features/player/stores/player.store.ts";
import { getCurrentPercent } from "@features/player/utils/getCurrentPercent.ts";
import { getCurrentTime } from "@features/player/utils/getCurrentTime.ts";
import { motion } from "motion/react";
import styles from "./Player.fragment.module.css";
export const PlayerFragment = () => {
  const { music, getMusic, togglePlay } = usePlayer();
  const currentMusic = getMusic(music.id);

  const currentPercent = getCurrentPercent(
    music.time,
    currentMusic?.duration || 1
  );
  const currentTime = getCurrentTime(music.time);
  const maxTime = getCurrentTime(currentMusic?.duration || 1);

  const onPlayClick = () => {
    togglePlay();
  };

  // const onCloseClick = (event: React.MouseEvent) => {
  //   event.stopPropagation();
  //   close();
  // };

  if (!currentMusic) return null;
  return (
    <div className={styles.player_fragment}>
      <motion.img
        src={currentMusic.poster}
        alt={currentMusic.title}
        className={styles.poster}
      />
      <div className={styles.subinfo}>
        <div className={styles.name}>
          <span className={styles.title}>{currentMusic.title}</span>
          <span className={styles.author}>{currentMusic.artist}</span>
        </div>
        <div className={styles.fast_actions}>
          <IconButton variant="transparent">
            <AddToPlaylistIcon />
          </IconButton>
        </div>
      </div>
      <div className={styles.progress_bar}>
        <motion.div
          className={styles.percent}
          initial={{ width: `1%` }}
          animate={{ width: `${currentPercent}%` }}
          // style={{ width: `${currentPercent}%` }}
        ></motion.div>
        <div className={styles.progress_info}>
          <span>{currentTime}</span>
          <span>{maxTime}</span>
        </div>
      </div>
      <div className={styles.controls}>
        <div className={styles.left}>
          <IconButton variant="transparent">
            <RepeatIcon />
          </IconButton>
        </div>
        <div className={styles.center}>
          <IconButton>
            <PrevIcon />
          </IconButton>

          <IconButton onClick={onPlayClick}>
            {music.isPlaying ? <PauseIcon /> : <PlayIcon />}
          </IconButton>
          <IconButton>
            <NextIcon />
          </IconButton>
        </div>
        <div className={styles.right}>
          <IconButton variant="transparent"></IconButton>
        </div>
      </div>
    </div>
  );
};
