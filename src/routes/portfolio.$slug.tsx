import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/portfolio/$slug")({
  beforeLoad: () => {
    throw redirect({ to: "/start-your-golf-journey" });
  },
});
