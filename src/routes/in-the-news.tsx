import { createFileRoute } from "@tanstack/react-router";
import { PostCard } from "../components/cards";
import { PageHero, SectionHeading } from "../components/section";
import { archiveArticles, featuredArticles } from "../lib/articles";
import { pressItems } from "../lib/press";

const SITE = "https://sister-golf-revive.lovable.app";
const DESCRIPTION =
  "SisterGolf in the news: press coverage of founder Shella Sylla and articles from SisterGolf on golf and business.";

export const Route = createFileRoute("/in-the-news")({
  head: () => ({
    meta: [
      { title: "In the News | SisterGolf" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "In the News | SisterGolf" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/in-the-news` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/in-the-news` }],
  }),
  component: InTheNewsPage,
});

const articles = [...featuredArticles, ...archiveArticles].filter((a) => !a.placeholder);

function InTheNewsPage() {
  return (
    <>
      <PageHero
        eyebrow="In the news"
        title="SisterGolf in the news"
        intro="Press coverage of SisterGolf and founder Shella Sylla, plus articles from SisterGolf on golf and business."
      />
      <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <SectionHeading eyebrow="Press" title="Coverage of SisterGolf" intro="Each link opens the original story." />
        <ul className="mt-8 divide-y divide-border border-y border-border">
          {pressItems.map((item) => (
            <li key={item.url} className="py-8">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span className="eyebrow text-accent">{item.outlet}</span>
                <span>{item.kind}</span>
                {item.isoDate ? (
                  <time dateTime={item.isoDate}>{item.date}</time>
                ) : (
                  <span>{item.date}</span>
                )}
              </div>
              <h2 className="mt-3 text-2xl leading-snug text-fairway-deep">
                <a href={item.url} target="_blank" rel="noreferrer" className="hover:text-accent">
                  {item.title}
                </a>
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {item.excerpt}
              </p>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block border-b border-accent pb-0.5 text-sm font-semibold text-fairway"
              >
                Read at {item.outlet}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <SectionHeading
            eyebrow="Articles"
            title="Notes on golf and business"
            intro="Everything SisterGolf publishes lives here."
          />
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <PostCard key={article.slug} post={article} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
