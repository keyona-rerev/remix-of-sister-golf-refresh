import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/golf-tips/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/articles/$slug", params: { slug: params.slug } });
  },
});
