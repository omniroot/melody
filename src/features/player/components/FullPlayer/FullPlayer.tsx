import { LyricIcon } from "@/shared/icons/lyric-icon.tsx";
import { MoreHorizontalIcon } from "@/shared/icons/more-horizontal-icon.tsx";
import { NextIcon } from "@/shared/icons/next-icon.tsx";
import { PauseIcon } from "@/shared/icons/pause-icon.tsx";
import { PlayIcon } from "@/shared/icons/play-icon.tsx";
import { PlayListIcon } from "@/shared/icons/play-list-icon.tsx";
import { PrevIcon } from "@/shared/icons/prev-icon.tsx";
import { IconButton } from "@components/IconButton/IconButton.tsx";
import { usePlayer } from "@features/player/stores/player.store.ts";
import { getCurrentPercent } from "@features/player/utils/getCurrentPercent.ts";
import { getCurrentTime } from "@features/player/utils/getCurrentTime.ts";
import { AnimatePresence, motion } from "motion/react";
import styles from "./FullPlayer.module.css";
import { AddToPlaylistIcon } from "@/shared/icons/add-to-playlist-icon.tsx";
import { RepeatIcon } from "@/shared/icons/repeat-icon.tsx";
import { Button } from "@components/Button/Button.tsx";

export const FullPlayer = () => {
  const { music, getMusic, close, toggleFullscreen, togglePlay, debugEnd } =
    usePlayer();
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

  const onCloseClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    close();
  };

  const onDebugClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    debugEnd();
  };
  const onMinimizeClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    toggleFullscreen();
  };

  return (
    <AnimatePresence>
      {currentMusic && music.isFullscreen && (
        <motion.div
          className={styles.full_player}
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ duration: 0.2 }}
        >
          <div className={styles.header}>
            <Button onClick={onMinimizeClick}>minimize</Button>
          </div>
          <img
            src={currentMusic.poster}
            alt={currentMusic.title}
            className={styles.poster}
          />
          <div className={styles.info}>
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

            <div className={styles.actions}>
              <IconButton onClick={onCloseClick}>
                <LyricIcon />
              </IconButton>
              <IconButton onClick={onDebugClick}>
                <MoreHorizontalIcon />
              </IconButton>

              <IconButton onClick={onDebugClick}>
                <PlayListIcon />
              </IconButton>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
