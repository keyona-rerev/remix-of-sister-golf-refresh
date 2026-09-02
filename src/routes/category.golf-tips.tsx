import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/category/golf-tips")({
  beforeLoad: () => {
    throw redirect({ to: "/articles" });
  },
});
