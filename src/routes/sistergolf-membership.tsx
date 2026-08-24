import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "../components/section";
import { membership } from "../lib/pages-content";

export const Route = createFileRoute("/sistergolf-membership")({
  head: () => ({
    meta: [
      { title: "Membership — SisterGolf Annual Membership" },
      { name: "description", content: membership.metaDescription },
      { property: "og:title", content: membership.title },
      { property: "og:description", content: membership.metaDescription },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://sister-golf-revive.lovable.app/sistergolf-membership",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://sister-golf-revive.lovable.app/sistergolf-membership",
      },
    ],
  }),
  component: MembershipPage,
});

function MembershipPage() {
  return (
    <>
      <PageHero
        eyebrow={membership.eyebrow}
        title={membership.title}
        intro={membership.body}
      />

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <img
            src={membership.image}
            alt={membership.subheading}
            loading="lazy"
            className="w-full object-cover"
          />
          <div>
            <p className="eyebrow text-accent">{membership.subheading}</p>
            <h2 className="mt-3 text-3xl leading-tight text-fairway-deep">
              {membership.callout}
            </h2>
            <a
              href={membership.join.url}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
            >
              {membership.join.label}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-fairway-deep">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl leading-tight text-fairway-foreground">
            {membership.portalHeading}
          </h2>
          <a
            href={membership.portal.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
          >
            {membership.portal.label}
          </a>
        </div>
      </section>
    </>
  );
}
