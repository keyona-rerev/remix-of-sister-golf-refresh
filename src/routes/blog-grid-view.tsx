import { createFileRoute } from "@tanstack/react-router";
import { PostCard } from "../components/cards";
import { PageHero } from "../components/section";
import { posts } from "../lib/site-content";

export const Route = createFileRoute("/blog-grid-view")({
  head: () => ({
    meta: [
      { title: "News and Articles — SisterGolf" },
      {
        name: "description",
        content:
          "Golfing tips, insights, news and articles from SisterGolf on using golf for business and career success.",
      },
      { property: "og:title", content: "News and Articles — SisterGolf" },
      {
        property: "og:description",
        content: "Golfing tips, insights, news and articles from SisterGolf.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://sister-golf-revive.lovable.app/blog-grid-view",
      },
    ],
    links: [
      { rel: "canonical", href: "https://sister-golf-revive.lovable.app/blog-grid-view" },
    ],
  }),
  component: BlogGridPage,
});

function BlogGridPage() {
  return (
    <>
      <PageHero
        eyebrow="Latest news"
        title="News and Articles"
        intro="Check out and share our Golfing Tips, Insights, News and Articles."
      />

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
