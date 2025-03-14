import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect } from "react";
import data from "~/public/db.json";

interface IPlayerStore {
  id: string;
  isPlaying: boolean;
  time: number;
  volume: number;
  isFullscreen: boolean;
}

const playerStore = atomWithStorage<IPlayerStore>("player", {
  id: "",
  isPlaying: false,
  volume: 1,
  time: 0,
  isFullscreen: false,
});

const audioStore = atom<HTMLAudioElement | null>(null);

export const usePlayer = () => {
  const musicList = data.musics;
  const [music, setMusic] = useAtom(playerStore);
  const [audio, setAudio] = useAtom(audioStore);

  const getMusic = (id: string) => {
    return musicList.find((music) => music.id === id);
  };

  useEffect(() => {
    if (!audio && music.id) {
      setAudio(new Audio(getMusic(music.id)?.path || ""));
      setMusic((prev) => ({ ...prev, isPlaying: false }));
    }
  }, [audio, music]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (audio) {
      audio.volume = music.volume;
      audio.currentTime = music.time;

      audio.onplaying = () => {
        interval = setInterval(() => {
          setMusic((prev) => ({ ...prev, time: audio.currentTime }));
        }, 1000);
      };

      audio.onpause = () => {
        clearInterval(interval);
      };

      audio.onended = () => {
        setMusic((prev) => ({
          ...prev,
          time: getMusic(prev.id)?.duration || 0,
          isPlaying: false,
        }));
        clearInterval(interval);
      };
    }
    return () => clearInterval(interval);
  }, [audio]);

  useEffect(() => {
    if (music.isPlaying && audio) {
      setMusic((prev) => ({ ...prev, time: audio.currentTime }));
    }
  }, [music.isPlaying]);

  useEffect(() => {
    if (music.isPlaying) {
      audio?.play();
    } else {
      audio?.pause();
    }
  }, [audio, music.isPlaying]);

  const setCurrentMusic = (id: string) => {
    if (music.id === id) {
      toggleFullscreen(true);
      return;
    }

    audio?.pause();
    setAudio(new Audio(getMusic(id)?.path || ""));
    setMusic({ time: 0, volume: 1, isPlaying: true, id, isFullscreen: true });
  };

  const togglePlay = () => {
    const nextState = !music.isPlaying;
    if (nextState) {
      audio?.play();
    } else {
      audio?.pause();
    }
    setMusic((prev) => ({ ...prev, isPlaying: nextState }));
  };

  const debugEnd = () => {
    console.log(getMusic(music.id)?.duration);
    const duration = getMusic(music.id)?.duration;

    const newTime = duration ? duration - 5 : 0;

    console.log("prev: ", audio?.currentTime);
    setMusic((prev) => ({
      ...prev,
      time: newTime,
      isPlaying: false,
    }));

    if (audio) {
      audio.pause();
      audio.currentTime = newTime;
      audio.play();
    }
    setMusic((prev) => ({
      ...prev,
      time: newTime,
      isPlaying: true,
    }));
  };

  const close = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = "";
      setAudio(null);
      setMusic({
        id: "",
        isPlaying: false,
        time: 0,
        volume: 1,
        isFullscreen: false,
      });
    }
  };

  const toggleFullscreen = (newSize: boolean | null = null) => {
    console.log(music.isFullscreen, ">>", newSize);
    if (newSize !== null) {
      setMusic((prev) => ({ ...prev, isFullscreen: newSize }));
      return;
    }

    setMusic((prev) => ({ ...prev, isFullscreen: !prev.isFullscreen }));
  };

  console.log({ music, audio });

  return {
    music,
    musicList,
    togglePlay,
    toggleFullscreen,
    close,
    debugEnd,
    getMusic,
    setCurrentMusic,
  };
};
