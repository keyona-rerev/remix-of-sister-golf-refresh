import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "../components/section";

const SITE = "https://sister-golf-revive.lovable.app";
const DESCRIPTION =
  "Corporate golf workshops, curriculum licensing, tournament consulting and on-course coaching from SisterGolf, for companies developing client-facing teams.";

export const Route = createFileRoute("/for-companies")({
  head: () => ({
    meta: [
      { title: "For Companies | SisterGolf Workshops, Licensing and Consulting" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "For Companies | SisterGolf" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/for-companies` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/for-companies` }],
  }),
  component: ForCompaniesPage,
});

type Offering = {
  id: string;
  name: string;
  summary: string;
  points: string[];
  confirms: string[];
  interest: string;
  page?: "/curriculum-licensing" | "/tournament-consulting" | "/on-course-coaching";
};

const offerings: Offering[] = [
  {
    id: "corporate-workshops",
    interest: "Corporate workshop",
    name: "Corporate workshops",
    summary:
      "Professional development sessions that teach sales teams to use golf for client relationships and business development.",
    points: [
      "Delivered on site at your office or at a golf course.",
      "Covers when to talk business, course etiquette, scoring, scramble formats and how to accept and host a client round.",
      "Built for client-facing and commission-driven teams, not for golfers looking to lower a handicap.",
    ],
    confirms: ["[CONFIRM: half-day rate]", "[CONFIRM: session length and group size]"],
  },
  {
    id: "curriculum-licensing",
    page: "/curriculum-licensing",
    interest: "Curriculum licensing",
    name: "Curriculum licensing",
    summary:
      "License the SisterGolf program and run it with your own team, priced per seat.",
    points: [
      "Your organization delivers the material internally on your own schedule.",
      "Priced per seat, so it scales with the size of the group you enroll.",
    ],
    confirms: ["[CONFIRM: per-seat price]", "[CONFIRM: what a licensed seat includes]"],
  },
  {
    id: "tournament-consulting",
    page: "/tournament-consulting",
    interest: "Tournament consulting",
    name: "Tournament consulting",
    summary:
      "Advisory support for organizations planning and running their own golf tournament.",
    points: [
      "We build the plan with you: timeline, budget structure, vendor strategy, staffing model and day-of run of show.",
      "We then advise your team or your event planner as they carry it out.",
      "This is consulting and advisory only. SisterGolf does not produce or run tournaments for clients and does not staff your event day-of. Your organization owns execution.",
    ],
    confirms: ["[CONFIRM: consulting engagement price]"],
  },
  {
    id: "on-course-coaching",
    page: "/on-course-coaching",
    interest: "On-course coaching",
    name: "On-course coaching",
    summary:
      "Shella joins a client at a tournament or a round and coaches them live inside their foursome.",
    points: [
      "Real-time coaching during play: shot selection, pace, etiquette and how to handle the business side of the conversation.",
      "Useful before a high-stakes client round or a corporate scramble.",
    ],
    confirms: ["[CONFIRM: pricing and travel terms]"],
  },
];

function ForCompaniesPage() {
  return (
    <>
      <PageHero
        eyebrow="For companies"
        title="Golf, used as a business development tool"
        intro="Four ways to work with SisterGolf. Pick the one that fits your team, then tell us what you need."
      />

      <section className="border-b border-border bg-background">
        <nav className="mx-auto max-w-6xl px-6 py-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground">
            {offerings.map((offering, i) => (
              <li key={offering.id}>
                <a href={`#${offering.id}`} className="hover:text-fairway">
                  <span className="text-accent">{i + 1}.</span> {offering.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <div className="space-y-14">
          {offerings.map((offering, i) => (
            <article
              key={offering.id}
              id={offering.id}
              className="scroll-mt-28 border-t border-border pt-8"
            >
              <p className="eyebrow text-accent">Offering {i + 1}</p>
              <h2 className="mt-3 text-3xl leading-tight text-fairway-deep">
                {offering.name}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {offering.summary}
              </p>
              <ul className="mt-6 space-y-3 text-base leading-relaxed text-foreground/85">
                {offering.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-6 flex flex-wrap gap-2">
                {offering.confirms.map((confirm) => (
                  <li
                    key={confirm}
                    className="rounded-sm bg-secondary px-3 py-1.5 text-xs font-semibold text-fairway-deep"
                  >
                    {confirm}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {offering.page ? (
                  <Link
                    to={offering.page}
                    className="text-sm font-semibold text-fairway underline underline-offset-4 hover:text-fairway-deep"
                  >
                    See the full {offering.name.toLowerCase()} page
                  </Link>
                ) : null}
              <Link
                to="/contact"
                search={{ interest: offering.interest }}
                className="inline-block rounded-sm bg-fairway px-6 py-3 text-sm font-semibold text-fairway-foreground transition-colors hover:bg-fairway-deep"
              >
                Ask about {offering.name.toLowerCase()}
              </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-fairway-deep">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl leading-tight text-fairway-foreground">
              Tell us what your team needs
            </h2>
            <p className="mt-3 text-base leading-relaxed text-fairway-foreground/75">
              One message is enough. Name the offering you are looking at and the size of
              the group.
            </p>
          </div>
          <Link
            to="/contact"
            className="rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
          >
            Contact SisterGolf
          </Link>
        </div>
      </section>
    </>
  );
}
