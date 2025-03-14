import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "@/app/router.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { client } from "@/shared/api/api.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
