import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    basepath:
      typeof window !== "undefined" &&
      window.location.pathname.startsWith("/tres-r-barberia-e5a1e")
        ? "/tres-r-barberia-e5a1e"
        : "/",
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
