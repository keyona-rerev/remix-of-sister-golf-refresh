import { createFileRoute, Link } from "@tanstack/react-router";
import { images } from "../lib/site-content";

const SITE = "https://sister-golf-revive.lovable.app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SisterGolf | Golf as a Business Tool" },
      {
        name: "description",
        content:
          "SisterGolf teaches golf as a business development tool. Workshops, curriculum licensing and tournament consulting for companies, and a clear path for women learning the game.",
      },
      { property: "og:title", content: "SisterGolf | Golf as a Business Tool" },
      {
        property: "og:description",
        content:
          "Two clear paths: corporate workshops, licensing and tournament consulting for companies, and a step by step start for women learning golf for business.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/` },
      { property: "og:image", content: images.heroGolfer },
      { name: "twitter:image", content: images.heroGolfer },
    ],
    links: [{ rel: "canonical", href: `${SITE}/` }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <section className="border-b border-border bg-sand">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rise-in">
            <p className="eyebrow text-accent">SisterGolf</p>
            <h1 className="mt-4 max-w-2xl text-4xl leading-[1.05] text-fairway-deep sm:text-6xl">
              We teach golf as a business tool.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Companies bring us in to get their client-facing teams comfortable on the
              course. Individual women come to us to learn the game and use it in their own
              careers.
            </p>
          </div>
          <img
            src={images.heroGolfer}
            alt="Woman golfer taking a swing"
            className="w-full max-w-sm justify-self-end object-contain"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
        <h2 className="text-2xl text-fairway-deep">Which one are you?</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Link
            to="/for-companies"
            className="group flex flex-col justify-between border-t-4 border-fairway bg-secondary p-8 transition-colors hover:bg-sand sm:p-10"
          >
            <div>
              <p className="eyebrow text-accent">For companies</p>
              <h3 className="mt-3 text-3xl leading-tight text-fairway-deep">
                Train your team on the course
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Corporate workshops, curriculum licensing, tournament consulting and
                on-course coaching for the people who carry your revenue.
              </p>
            </div>
            <span className="mt-8 inline-block self-start rounded-sm bg-fairway px-6 py-3 text-sm font-semibold text-fairway-foreground group-hover:bg-fairway-deep">
              See offerings for companies
            </span>
          </Link>

          <Link
            to="/start-your-golf-journey"
            className="group flex flex-col justify-between border-t-4 border-accent bg-secondary p-8 transition-colors hover:bg-sand sm:p-10"
          >
            <div>
              <p className="eyebrow text-accent">For individual women</p>
              <h3 className="mt-3 text-3xl leading-tight text-fairway-deep">
                Learn golf for your own book of business
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Answer three questions and we will point you to the right starting point,
                whether that is the cohort, the membership or a first time on a course.
              </p>
            </div>
            <span className="mt-8 inline-block self-start rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground group-hover:opacity-90">
              Start your golf journey
            </span>
          </Link>
        </div>
      </section>

      <section className="bg-fairway-deep">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-lg leading-relaxed text-fairway-foreground/85">
            Not sure which side you are on? Tell us what you are trying to do and we will
            answer directly.
          </p>
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
