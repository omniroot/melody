import {
  LyricIcon,
  MoreHorizontalIcon,
  PlayListIcon,
} from "@/shared/icons/index.ts";
import { Button } from "@components/Button/Button.tsx";
import { IconButton } from "@components/IconButton/IconButton.tsx";
import { LyricFragment } from "@features/player/components/FullPlayer/Lyric/Lyric.fragment.tsx";
import { PlayerFragment } from "@features/player/components/FullPlayer/Player/Player.fragment.tsx";
import { PlayListFragment } from "@features/player/components/FullPlayer/PlayList/PlayList.fragment.tsx";
import { usePlayer } from "@features/player/stores/player.store.ts";
import { AnimatePresence, motion } from "motion/react";
import { useLayoutEffect, useRef } from "react";
import styles from "./FullPlayer.module.css";

export const FullPlayer = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { music, getMusic, toggleFullscreen, debugEnd } = usePlayer();
  const currentMusic = getMusic(music.id);

  const onDebugClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    debugEnd();
  };
  const onMinimizeClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    toggleFullscreen();
  };

  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollRef.current.clientWidth,
        behavior: "instant",
      });
    }
  }, [scrollRef.current]);

  const scrollTo = (to: "lyric" | "playlist") => {
    if (scrollRef.current) {
      switch (to) {
        case "lyric":
          scrollRef.current.scrollLeft = 0;
          break;
        case "playlist":
          scrollRef.current.scrollLeft = window.innerWidth * 2;
          break;
      }
      // scrollRef.current.scrollBy({
      //   left: window.innerWidth,
      //   behavior: "smooth",
      // });
    }
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
          drag="y"
          whileDrag={{ cursor: "grabbing", scale: 0.95 }}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragSnapToOrigin
          onDragStart={(event) => {
            event.stopPropagation();
            // setIsDrag(true);
          }}
          onDragEnd={(event, info) => {
            event.stopPropagation();
            if (info.velocity.y > 200) {
              toggleFullscreen(false);
            }
            if (info.velocity.y < -200) {
              console.log("OPen more menu");
            }
            console.log(info.velocity);
          }}
        >
          <div className={styles.header}>
            <Button onClick={onMinimizeClick}>minimize</Button>
          </div>
          {/* {page === "lyric" && <LyricPage />}
          {page === "main" && (
           
          )}
          {page === "playlist" && <PlayListPage />} */}

          <div className={styles.info} ref={scrollRef}>
            <LyricFragment />
            <PlayerFragment />
            <PlayListFragment />
          </div>
          <div className={styles.actions}>
            <IconButton onClick={() => scrollTo("lyric")}>
              <LyricIcon />
            </IconButton>
            <IconButton onClick={onDebugClick}>
              <MoreHorizontalIcon />
            </IconButton>

            <IconButton onClick={() => scrollTo("playlist")}>
              <PlayListIcon />
            </IconButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
