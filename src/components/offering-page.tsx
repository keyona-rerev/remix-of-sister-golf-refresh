import { Link } from "@tanstack/react-router";
import { PageHero } from "./section";

export type OfferingContent = {
  eyebrow: string;
  title: string;
  intro: string;
  interest: string;
  forWho: string[];
  howItWorks: { title: string; body: string }[];
  included: string[];
  notIncluded?: string[];
  confirms: string[];
  askTitle: string;
  askBody: string;
};

const otherOfferings = [
  { to: "/for-companies", label: "Corporate workshops", hash: "corporate-workshops" },
  { to: "/curriculum-licensing", label: "Curriculum licensing" },
  { to: "/tournament-consulting", label: "Tournament consulting" },
  { to: "/on-course-coaching", label: "On-course coaching" },
] as const;

export function OfferingPage({
  content,
  current,
}: {
  content: OfferingContent;
  current: string;
}) {
  return (
    <>
      <PageHero eyebrow={content.eyebrow} title={content.title} intro={content.intro} />

      <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl leading-tight text-fairway-deep">Who it is for</h2>
            <ul className="mt-5 space-y-3 text-base leading-relaxed text-foreground/85">
              {content.forWho.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl leading-tight text-fairway-deep">What you get</h2>
            <ul className="mt-5 space-y-3 text-base leading-relaxed text-foreground/85">
              {content.included.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-sand">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <h2 className="text-3xl leading-tight text-fairway-deep">How it works</h2>
          <ol className="mt-8 space-y-8">
            {content.howItWorks.map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <span className="text-2xl font-semibold text-accent">{i + 1}.</span>
                <div>
                  <h3 className="text-xl text-fairway-deep">{step.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {content.notIncluded ? (
        <section className="mx-auto max-w-4xl px-6 pt-16 sm:pt-20">
          <h2 className="text-2xl leading-tight text-fairway-deep">What this is not</h2>
          <ul className="mt-5 space-y-3 text-base leading-relaxed text-foreground/85">
            {content.notIncluded.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <h2 className="text-2xl leading-tight text-fairway-deep">Pricing and terms</h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {content.confirms.map((confirm) => (
            <li
              key={confirm}
              className="rounded-sm bg-secondary px-3 py-1.5 text-xs font-semibold text-fairway-deep"
            >
              {confirm}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-fairway-deep">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl leading-tight text-fairway-foreground">
              {content.askTitle}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-fairway-foreground/75">
              {content.askBody}
            </p>
          </div>
          <Link
            to="/contact"
            search={{ interest: content.interest }}
            className="rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
          >
            Ask about {content.interest.toLowerCase()}
          </Link>
        </div>
      </section>

      <section className="border-t border-border bg-background">
        <nav className="mx-auto max-w-6xl px-6 py-8" aria-label="Other ways to work with SisterGolf">
          <p className="eyebrow text-accent">Other ways to work with SisterGolf</p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground">
            {otherOfferings
              .filter((o) => o.label !== current)
              .map((o) => (
                <li key={o.label}>
                  {"hash" in o ? (
                    <Link to={o.to} hash={o.hash} className="hover:text-fairway">
                      {o.label}
                    </Link>
                  ) : (
                    <Link to={o.to} className="hover:text-fairway">
                      {o.label}
                    </Link>
                  )}
                </li>
              ))}
          </ul>
        </nav>
      </section>
    </>
  );
}
