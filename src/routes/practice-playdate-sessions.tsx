import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "../components/section";
import { playDates } from "../lib/pages-content";

export const Route = createFileRoute("/practice-playdate-sessions")({
  head: () => ({
    meta: [
      { title: "Play Dates and Practice Sessions — SisterGolf" },
      { name: "description", content: playDates.metaDescription },
      { property: "og:title", content: playDates.title },
      { property: "og:description", content: playDates.metaDescription },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://sister-golf-revive.lovable.app/practice-playdate-sessions",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://sister-golf-revive.lovable.app/practice-playdate-sessions",
      },
    ],
  }),
  component: PlayDatesPage,
});

function PlayDatesPage() {
  return (
    <>
      <PageHero
        eyebrow={playDates.eyebrow}
        title={playDates.title}
        intro={playDates.body}
      />

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <img
            src={playDates.image}
            alt={playDates.title}
            loading="lazy"
            className="w-full object-cover"
          />
          <div>
            <h2 className="text-3xl leading-tight text-fairway-deep">
              Golf exposure, relationships, confidence and community.
            </h2>
            <a
              href={playDates.cta.url}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
            >
              {playDates.cta.label}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
