import { Outlet } from "@tanstack/react-router";

export const GlobalLayout = () => {
  return (
    <>
      {/* <Header /> */}
      <main>
        <Outlet />
      </main>
    </>
  );
};
