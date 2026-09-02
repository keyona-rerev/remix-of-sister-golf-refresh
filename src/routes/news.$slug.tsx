import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/news/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/articles/$slug", params: { slug: params.slug } });
  },
});
