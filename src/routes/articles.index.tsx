import { createFileRoute, redirect } from "@tanstack/react-router";

// Articles now live on the In the News page.
export const Route = createFileRoute("/articles/")({
  beforeLoad: () => {
    throw redirect({ to: "/in-the-news" });
  },
});
