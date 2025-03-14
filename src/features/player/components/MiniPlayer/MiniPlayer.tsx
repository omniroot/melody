import { IconButton } from "@components/IconButton/IconButton.tsx";
import { usePlayer } from "@features/player/stores/player.store.ts";
import { getCurrentPercent } from "@features/player/utils/getCurrentPercent.ts";
import { AnimatePresence, motion } from "motion/react";
import styles from "./MiniPlayer.module.css";
import { PauseIcon } from "@/shared/icons/svg/pause-icon";
import { PlayIcon } from "@/shared/icons/svg/play-icon";
import { useState } from "react";

export const MiniPlayer = () => {
  const [isDrag, setIsDrag] = useState(false);
  const { music, getMusic, close, toggleFullscreen, togglePlay, debugEnd } =
    usePlayer();
  const currentMusic = getMusic(music.id);

  const currentPercent = getCurrentPercent(
    music.time,
    currentMusic?.duration || 1
  );

  const onPlayerClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (!isDrag) {
      toggleFullscreen();
    }
  };

  const onPlayClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    togglePlay();
  };

  const onCloseClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    close();
  };

  const onDebugClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    debugEnd();
  };

  return (
    <AnimatePresence mode="wait">
      {currentMusic && !music.isFullscreen && (
        <motion.div
          className={styles.mini_player}
          onClick={onPlayerClick}
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          drag
          whileDrag={{ cursor: "grabbing", scale: 0.95 }}
          dragSnapToOrigin
          onDragStart={(event) => {
            event.stopPropagation();
            setIsDrag(true);
          }}
          onDragEnd={(event, info) => {
            event.stopPropagation();
            if (info.velocity.y > 200) {
              close();
            }
            if (info.velocity.y < -200) {
              toggleFullscreen(true);
            }
            setIsDrag(false);
          }}
          dragDirectionLock
          transition={{ duration: 0.2 }}
        >
          <div className={styles.progress_bar}>
            <motion.div
              className={styles.percent}
              initial={{ width: `1%` }}
              animate={{ width: `${currentPercent}%` }}
              // style={{ width: `${currentPercent}%` }}
            ></motion.div>
          </div>
          <img
            src={currentMusic.poster}
            alt={currentMusic.title}
            className={styles.poster}
          />
          <div className={styles.info}>
            <span className={styles.title}>{currentMusic.title}</span>
            <span className={styles.author}>{currentMusic.artist}</span>
            {/* <span>{getCurrentPercent()}</span> */}
          </div>
          <div className={styles.actions}>
            <span>{String(isDrag)}</span>
            <IconButton variant="transparent" onClick={onCloseClick}>
              X
            </IconButton>

            <IconButton variant="transparent" onClick={onDebugClick}>
              END
            </IconButton>
            <IconButton variant="transparent" onClick={onPlayClick}>
              {music.isPlaying ? <PauseIcon /> : <PlayIcon />}
            </IconButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
