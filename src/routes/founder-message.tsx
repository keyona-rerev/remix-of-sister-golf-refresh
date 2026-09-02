import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/founder-message")({
  beforeLoad: () => {
    throw redirect({ to: "/about" });
  },
});
