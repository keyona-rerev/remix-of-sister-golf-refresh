import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/choose-your-golf-journey")({
  beforeLoad: () => {
    throw redirect({ to: "/start-your-golf-journey" });
  },
});
