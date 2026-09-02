import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "../components/section";
import { externalLinks, membership } from "../lib/pages-content";

const SITE = "https://sister-golf-revive.lovable.app";
const DESCRIPTION =
  "The SisterGolf membership is for women who want ongoing access to rounds, practice sessions, coaching time with Shella and a network of women who use golf for business.";

export const Route = createFileRoute("/sistergolf-membership")({
  head: () => ({
    meta: [
      { title: "Membership | SisterGolf" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "SisterGolf Membership" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/sistergolf-membership` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/sistergolf-membership` }],
  }),
  component: MembershipPage,
});

const benefits = [
  "Access to member play dates and practice sessions.",
  "Discounted rates on SisterGolf programs and events.",
  "Networking with other women who use golf in their work.",
  "One-on-one Zoom time with Shella.",
  "[CONFIRM: current member benefit list]",
];

function MembershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership"
        title="For women who want to keep playing"
        intro="One membership, one community. If you already play or you are ready to play regularly, this is where you stay in the game."
      />

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="text-2xl text-fairway-deep">What a member gets</h2>
            <ul className="mt-6 space-y-3 text-base leading-relaxed text-foreground/85">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              [CONFIRM: membership price and billing period]
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={externalLinks.membershipJoin}
                target="_blank"
                rel="noreferrer"
                className="rounded-sm bg-fairway px-6 py-3 text-sm font-semibold text-fairway-foreground hover:bg-fairway-deep"
              >
                Join SisterGolf
              </a>
              <a
                href={externalLinks.membershipPortal}
                target="_blank"
                rel="noreferrer"
                className="rounded-sm border border-fairway px-6 py-3 text-sm font-semibold text-fairway hover:bg-fairway hover:text-fairway-foreground"
              >
                Member login
              </a>
            </div>
          </div>

          <img
            src={membership.image}
            alt="SisterGolf member on the golf course"
            loading="lazy"
            className="w-full object-cover"
          />
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-14 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            Not sure the membership is the right starting point? Answer three questions and
            we will tell you.
          </p>
          <Link
            to="/start-your-golf-journey"
            className="rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
          >
            Start your golf journey
          </Link>
        </div>
      </section>
    </>
  );
}
