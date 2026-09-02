import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/workshops")({
  beforeLoad: () => {
    throw redirect({ to: "/for-companies" });
  },
});
