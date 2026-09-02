import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/service/$slug")({
  beforeLoad: () => {
    throw redirect({ to: "/for-companies" });
  },
});
