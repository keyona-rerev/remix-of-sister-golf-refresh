import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeading } from "../components/section";
import { books, images, press } from "../lib/site-content";

const SITE = "https://sister-golf-revive.lovable.app";
const DESCRIPTION =
  "SisterGolf teaches women business professionals to use golf for business relationships and professional advancement. Founded by Shella Sylla, a former banking executive.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SisterGolf and Founder Shella Sylla" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "About SisterGolf and Founder Shella Sylla" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/about` },
      { property: "og:image", content: images.founderMessage },
      { name: "twitter:image", content: images.founderMessage },
    ],
    links: [{ rel: "canonical", href: `${SITE}/about` }],
  }),
  component: AboutPage,
});

const pillars = [
  {
    title: "Expose",
    body: "Expose women to golf and to the effect the sport can have on a career.",
  },
  { title: "Educate", body: "Educate women on the rules and etiquette of the game." },
  {
    title: "Empower",
    body: "Build the confidence to play alongside male counterparts and clients.",
  },
];

function AboutPage() {
  return (
    <>
      <section className="border-b border-border bg-sand">
        <div className="mx-auto grid max-w-6xl items-end gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rise-in">
            <p className="eyebrow text-accent">About</p>
            <h1 className="mt-4 text-4xl leading-[1.05] text-fairway-deep sm:text-6xl">
              Golf is where business happens. We make sure women are there.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              SisterGolf exists to teach female business professionals how to use golf to
              build working relationships and open doors in their careers.
            </p>
          </div>
          <img
            src={images.founderMessage}
            alt="Shella Sylla, founder of SisterGolf"
            className="w-full max-w-sm justify-self-end object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-10 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <div key={pillar.title} className="border-t border-border pt-6">
              <span className="eyebrow text-accent">0{i + 1}</span>
              <h2 className="mt-3 text-2xl text-fairway-deep">{pillar.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <p className="eyebrow text-accent">Shella Sylla, Founder and CEO</p>
          <h2 className="mt-3 text-3xl leading-tight text-fairway-deep">
            Message from the founder
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/85">
            <p>
              SisterGolf is the brainchild of Shella Sylla, a former banking executive with
              over 18 years in the financial services industry. Shella saw firsthand how
              golf can change the course of a career after taking up the sport early in her
              banking years. Within a few months of starting lessons she went from
              struggling to hit her monthly goal of $500,000 to becoming a repeat member of
              the Million Dollar club, a designation given to associates who exceeded $1
              million in production in a month.
            </p>
            <p>
              While that was happening, she noticed how few women were using the business
              development and relationship building opportunities golf offers. SisterGolf
              was built to close that gap: teach the game, teach the etiquette, and put
              women in the rooms and foursomes where business gets done.
            </p>
            <p>
              Today that work runs on two tracks. Companies bring SisterGolf in to develop
              their client-facing teams. Individual women come to SisterGolf to learn the
              game and use it in their own careers.
            </p>
          </div>
          <img
            src={images.signature}
            alt="Shella Sylla signature"
            loading="lazy"
            className="mt-8 h-16 w-auto"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <SectionHeading
          eyebrow="SisterGolf noteworthy"
          title="SisterGolf in the news"
          intro="Click a logo to read the article."
        />
        <div className="mt-10 grid grid-cols-2 items-center gap-10 sm:grid-cols-3 lg:grid-cols-6">
          {press.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="opacity-70 transition-opacity hover:opacity-100"
            >
              <img
                src={item.logo}
                alt={item.name}
                loading="lazy"
                className="max-h-14 w-full object-contain"
              />
            </a>
          ))}
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <SectionHeading
            eyebrow="Books"
            title="Books by Shella Sylla"
            intro="Available at Amazon."
          />
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            {books.map((book) => (
              <article key={book.title}>
                <img
                  src={book.image}
                  alt={`${book.title} cover`}
                  loading="lazy"
                  className="h-44 w-auto shadow-sm"
                />
                <h3 className="mt-5 text-xl text-fairway-deep">{book.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {book.description}
                </p>
                <a
                  href={book.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block border-b border-accent pb-0.5 text-sm font-semibold text-fairway"
                >
                  Buy at Amazon
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-fairway-deep">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-14 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-xl text-3xl leading-tight text-fairway-foreground">
            Two ways to work with SisterGolf
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/for-companies"
              className="rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
            >
              For companies
            </Link>
            <Link
              to="/start-your-golf-journey"
              className="rounded-sm border border-fairway-foreground/40 px-6 py-3 text-sm font-semibold text-fairway-foreground hover:bg-fairway"
            >
              Start your golf journey
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
