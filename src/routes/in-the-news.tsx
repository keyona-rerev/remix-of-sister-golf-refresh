import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "../components/section";
import { pressItems } from "../lib/press";

const SITE = "https://sister-golf-revive.lovable.app";
const DESCRIPTION =
  "SisterGolf and founder Shella Sylla in the news: features, TV and press coverage.";

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

function InTheNewsPage() {
  return (
    <>
      <PageHero
        eyebrow="In the news"
        title="SisterGolf in the news"
        intro="Coverage of SisterGolf and founder Shella Sylla. Each link opens the original story."
      />
      <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <ul className="divide-y divide-border border-y border-border">
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
    </>
  );
}
