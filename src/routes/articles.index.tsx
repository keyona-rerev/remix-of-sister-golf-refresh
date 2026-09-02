import { createFileRoute } from "@tanstack/react-router";
import { PostCard } from "../components/cards";
import { PageHero, SectionHeading } from "../components/section";
import { archiveArticles, featuredArticles } from "../lib/articles";

const SITE = "https://sister-golf-revive.lovable.app";
const DESCRIPTION =
  "Articles from SisterGolf on business golf, tournament planning and what actually happens on a golf course.";

export const Route = createFileRoute("/articles/")({
  head: () => ({
    meta: [
      { title: "Articles | SisterGolf" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Articles | SisterGolf" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/articles` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/articles` }],
  }),
  component: ArticlesPage,
});

function ArticlesPage() {
  return (
    <>
      <PageHero
        eyebrow="Articles"
        title="Notes on golf and business"
        intro="Everything SisterGolf publishes now lives here."
      />

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {featuredArticles.map((article) => (
            <PostCard key={article.slug} post={article} />
          ))}
        </div>
      </section>

      {archiveArticles.length > 0 ? (
        <section className="bg-secondary">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <SectionHeading eyebrow="Earlier" title="From the archive" />
            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {archiveArticles.map((article) => (
                <PostCard key={article.slug} post={article} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
