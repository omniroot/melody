import { FullPlayer } from "@features/player/components/FullPlayer/FullPlayer.tsx";
import { MiniPlayer } from "@features/player/components/MiniPlayer/MiniPlayer.tsx";
import { Outlet } from "@tanstack/react-router";

export const GlobalLayout = () => {
  return (
    <>
      {/* <Header /> */}
      <main>
        <Outlet />
      </main>
      <MiniPlayer />
      <FullPlayer />
    </>
  );
};
