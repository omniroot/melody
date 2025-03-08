import { rootRoute } from "@/app/router.tsx";
import { HomePage } from "@pages/home/home.page.tsx";
import { createRoute } from "@tanstack/react-router";

export const RouteHome = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  component: () => <HomePage />,
});
