import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { externalLinks } from "../lib/pages-content";

const SITE = "https://sister-golf-revive.lovable.app";
const DESCRIPTION =
  "Answer three questions and SisterGolf will point you to the right starting point: the cohort, the membership, or a lower-commitment first step on a course.";

export const Route = createFileRoute("/start-your-golf-journey")({
  head: () => ({
    meta: [
      { title: "Start Your Golf Journey | SisterGolf" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Start Your Golf Journey | SisterGolf" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/start-your-golf-journey` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/start-your-golf-journey` }],
  }),
  component: JourneyPage,
});

type Answers = {
  played: boolean | null;
  rules: boolean | null;
  sharpen: boolean | null;
};

const questions: { key: keyof Answers; text: string }[] = [
  { key: "played", text: "Have you ever played on a course?" },
  { key: "rules", text: "Do you know the rules?" },
  {
    key: "sharpen",
    text: "Are you mainly here to sharpen a swing you already have?",
  },
];

type Result = {
  eyebrow: string;
  title: string;
  body: string;
  detail: string[];
  price?: string;
  cta: { label: string; url?: string; to?: "/sistergolf-membership" | "/practice-playdate-sessions" };
};

function resultFor(answers: Answers): Result {
  if (answers.played === false || answers.rules === false) {
    return {
      eyebrow: "Start here",
      title: "Start with a play date or practice session",
      body: "You do not need to buy a program yet. Get on a course once, with people who will explain what is happening, and decide after that.",
      detail: [
        "Low commitment and no experience assumed.",
        "You will cover the basics of etiquette, pace of play and what to do when it is your turn.",
        "Most women move on to the membership or the cohort after one or two of these.",
      ],
      cta: { label: "See play dates and practice sessions", to: "/practice-playdate-sessions" },
    };
  }

  if (answers.sharpen === true) {
    return {
      eyebrow: "Your fit",
      title: "The membership is your fit",
      body: "You already play. What you need is regular access to rounds, coaching and other women who use golf for business.",
      detail: [
        "Ongoing access rather than a fixed program.",
        "Practice sessions, play dates and coaching time with Shella.",
        "[CONFIRM: current member benefit list]",
      ],
      cta: { label: "See membership", to: "/sistergolf-membership" },
    };
  }

  return {
    eyebrow: "Your fit",
    title: "The cohort is your fit",
    body: "You have played and you know enough to keep up. The cohort takes you from that point to confidently accepting a client invitation or playing a corporate scramble.",
    detail: [
      "Structured program with a set start and a set group.",
      "Covers business development strategy, rules, etiquette, scoring and on-course practice.",
      "[CONFIRM: cohort start dates and group size]",
    ],
    price: "[CONFIRM: cohort price]",
    cta: { label: "Apply for the cohort", url: externalLinks.experienceRegister },
  };
}

const buttonBase =
  "rounded-sm border px-5 py-2.5 text-sm font-semibold transition-colors";

function JourneyPage() {
  const [answers, setAnswers] = useState<Answers>({
    played: null,
    rules: null,
    sharpen: null,
  });

  const complete =
    answers.played !== null && answers.rules !== null && answers.sharpen !== null;
  const result = complete ? resultFor(answers) : null;

  const set = (key: keyof Answers, value: boolean) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  return (
    <>
      <section className="border-b border-border bg-sand">
        <div className="mx-auto max-w-3xl px-6 py-14 sm:py-16">
          <p className="eyebrow text-accent">Start your golf journey</p>
          <h1 className="mt-4 text-4xl leading-[1.05] text-fairway-deep sm:text-5xl">
            Three questions, then your next step
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Answer these and we will tell you where to start. No sign up required.
          </p>

          <div className="mt-10 space-y-8">
            {questions.map((question, i) => (
              <fieldset key={question.key}>
                <legend className="text-lg text-fairway-deep">
                  <span className="text-accent">{i + 1}.</span> {question.text}
                </legend>
                <div className="mt-4 flex gap-3">
                  {[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ].map((option) => {
                    const selected = answers[question.key] === option.value;
                    return (
                      <button
                        key={option.label}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => set(question.key, option.value)}
                        className={`${buttonBase} ${
                          selected
                            ? "border-fairway bg-fairway text-fairway-foreground"
                            : "border-border bg-background text-foreground hover:border-fairway"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>

          {!complete ? (
            <p className="mt-10 text-sm text-muted-foreground">
              Answer all three questions to see your starting point.
            </p>
          ) : null}
          <img
            src="https://res.cloudinary.com/dialhpycd/image/upload/f_auto,q_auto,w_1600/v1791469167/sistergolf/course-penha-longa.jpg"
            alt="Golf course landscape at Penha Longa, Portugal"
            loading="lazy"
            className="mt-12 h-64 w-full object-cover sm:h-80"
          />
        </div>
      </section>

      {result ? (
        <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <div className="border-t-4 border-accent bg-secondary p-8 sm:p-10">
            <p className="eyebrow text-accent">{result.eyebrow}</p>
            <h2 className="mt-3 text-3xl leading-tight text-fairway-deep">
              {result.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {result.body}
            </p>
            <ul className="mt-6 space-y-3 text-base leading-relaxed text-foreground/85">
              {result.detail.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {result.price ? (
              <p className="mt-6 text-sm font-semibold text-fairway-deep">
                Price: {result.price}
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-4">
              {result.cta.to ? (
                <Link
                  to={result.cta.to}
                  className="rounded-sm bg-fairway px-6 py-3 text-sm font-semibold text-fairway-foreground hover:bg-fairway-deep"
                >
                  {result.cta.label}
                </Link>
              ) : (
                <a
                  href={result.cta.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-sm bg-fairway px-6 py-3 text-sm font-semibold text-fairway-foreground hover:bg-fairway-deep"
                >
                  {result.cta.label}
                </a>
              )}
              <Link
                to="/contact"
                className="rounded-sm border border-fairway px-6 py-3 text-sm font-semibold text-fairway hover:bg-fairway hover:text-fairway-foreground"
              >
                Ask a question first
              </Link>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
