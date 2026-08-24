import { createFileRoute } from "@tanstack/react-router";
import { PostCard } from "../components/cards";
import { PageHero } from "../components/section";
import { posts } from "../lib/site-content";

export const Route = createFileRoute("/category/golf-tips")({
  head: () => ({
    meta: [
      { title: "Golf Tips — SisterGolf Blog Articles" },
      {
        name: "description",
        content:
          "Golfing tips, insights, news and articles from SisterGolf on using golf for business relationships and career advancement.",
      },
      { property: "og:title", content: "Golf Tips — SisterGolf Blog" },
      {
        property: "og:description",
        content: "Check out and share our golfing tips, insights, news and articles.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://sister-golf-revive.lovable.app/category/golf-tips",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://sister-golf-revive.lovable.app/category/golf-tips",
      },
    ],
  }),
  component: GolfTipsIndex,
});

function GolfTipsIndex() {
  return (
    <>
      <PageHero
        eyebrow="Latest news"
        title="Golf Tips"
        intro="Check out and share our Golfing Tips, Insights, News and Articles."
      />
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
