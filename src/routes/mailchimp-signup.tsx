import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "../components/section";
import { links } from "../lib/site-content";

export const Route = createFileRoute("/mailchimp-signup")({
  head: () => ({
    meta: [
      { title: "Newsletter Signup — SisterGolf" },
      {
        name: "description",
        content:
          "Join the SisterGolf mailing list for workshop dates, clinics, tournaments and tips for the business round.",
      },
      { property: "og:title", content: "Newsletter Signup — SisterGolf" },
      {
        property: "og:description",
        content: "Get SisterGolf workshop dates, clinics and business golf tips by email.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://sister-golf-revive.lovable.app/mailchimp-signup",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://sister-golf-revive.lovable.app/mailchimp-signup",
      },
    ],
  }),
  component: NewsletterPage,
});

function NewsletterPage() {
  return (
    <>
      <PageHero
        eyebrow="Want to stay in touch?"
        title="Newsletter Signup"
        intro="Get workshop dates, clinics, tournaments and tips for the business round delivered to your inbox."
      />
      <section className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
        <p className="text-base leading-relaxed text-muted-foreground">
          SisterGolf sends occasional updates on upcoming workshops, private coaching
          availability, charity events and golf tournaments. No spam, and you can
          unsubscribe at any time.
        </p>
        <a
          href={links.newsletter}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-block rounded-sm bg-fairway px-6 py-3 text-sm font-semibold text-fairway-foreground transition-colors hover:bg-fairway-deep"
        >
          Sign up for the newsletter
        </a>
      </section>
    </>
  );
}
