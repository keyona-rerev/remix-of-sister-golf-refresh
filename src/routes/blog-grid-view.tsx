import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/blog-grid-view")({
  beforeLoad: () => {
    throw redirect({ to: "/articles" });
  },
});
