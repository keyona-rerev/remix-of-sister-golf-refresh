import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "../components/section";
import { foundation, externalLinks } from "../lib/pages-content";

export const Route = createFileRoute("/sistergolf-foundation")({
  head: () => ({
    meta: [
      { title: "SisterGolf Foundation — Empowering Women and Youth Through Golf" },
      { name: "description", content: foundation.metaDescription },
      { property: "og:title", content: "SisterGolf Foundation" },
      { property: "og:description", content: foundation.metaDescription },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://sister-golf-revive.lovable.app/sistergolf-foundation",
      },
      { property: "og:image", content: foundation.highlightsImage },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://sister-golf-revive.lovable.app/sistergolf-foundation",
      },
    ],
  }),
  component: FoundationPage,
});

function FoundationPage() {
  return (
    <>
      <PageHero
        eyebrow={foundation.eyebrow}
        title={foundation.title}
        intro={foundation.intro[0]}
      />

      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <p className="text-base leading-relaxed text-muted-foreground">
          {foundation.intro[1]}
        </p>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <SectionHeading
            eyebrow="Give back"
            title={foundation.donationsHeading}
            intro={foundation.donationsIntro}
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {foundation.donationsSupport.map((item, i) => (
              <div key={item.title} className="border-t border-border pt-6">
                <span className="eyebrow text-accent">0{i + 1}</span>
                <h3 className="mt-3 text-xl text-fairway-deep">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-12 max-w-2xl text-base leading-relaxed text-fairway-deep">
            {foundation.donationsClosing}
          </p>
          <a
            href={externalLinks.donateFoundation}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
          >
            Donate Now
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <SectionHeading
              eyebrow="Join us"
              title={foundation.involvedHeading}
              intro={foundation.involvedBody}
            />
            <Link
              to="/contact"
              className="mt-8 inline-block rounded-sm bg-fairway px-6 py-3 text-sm font-semibold text-fairway-foreground hover:bg-fairway-deep"
            >
              Contact Us
            </Link>
          </div>
          <figure>
            <img
              src={foundation.highlightsImage}
              alt={foundation.highlightsCaption}
              loading="lazy"
              className="w-full object-cover"
            />
            <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {foundation.highlightsCaption}
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
