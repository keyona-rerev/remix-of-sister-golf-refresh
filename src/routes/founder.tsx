import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/founder")({
  beforeLoad: () => {
    throw redirect({ to: "/founder-message" });
  },
});
