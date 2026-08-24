import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "../components/section";
import { golfJourney } from "../lib/pages-content";

export const Route = createFileRoute("/choose-your-golf-journey")({
  head: () => ({
    meta: [
      { title: "Choose Your Golf Journey — SisterGolf" },
      { name: "description", content: golfJourney.metaDescription },
      { property: "og:title", content: "Choose Your SisterGolf Journey" },
      { property: "og:description", content: golfJourney.metaDescription },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://sister-golf-revive.lovable.app/choose-your-golf-journey",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://sister-golf-revive.lovable.app/choose-your-golf-journey",
      },
    ],
  }),
  component: GolfJourneyPage,
});

function GolfJourneyPage() {
  return (
    <>
      <PageHero
        eyebrow={golfJourney.eyebrow}
        title={golfJourney.title}
        intro={golfJourney.lede}
      />

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              {golfJourney.body}
            </p>
            <a
              href={golfJourney.cta.url}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
            >
              {golfJourney.cta.label}
            </a>
          </div>
          <img
            src={golfJourney.image}
            alt={golfJourney.title}
            loading="lazy"
            className="w-full object-cover"
          />
        </div>
      </section>
    </>
  );
}
