import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow text-accent">{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "default",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "default" | "onDark";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p className={tone === "onDark" ? "eyebrow text-accent" : "eyebrow text-accent"}>
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`mt-3 text-3xl leading-tight sm:text-4xl ${
          tone === "onDark" ? "text-fairway-foreground" : "text-fairway-deep"
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-4 text-base leading-relaxed ${
            tone === "onDark" ? "text-fairway-foreground/75" : "text-muted-foreground"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="border-b border-border bg-sand">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="rise-in max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-4 text-4xl leading-[1.05] text-fairway-deep sm:text-6xl">
            {title}
          </h1>
          {intro ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {intro}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
