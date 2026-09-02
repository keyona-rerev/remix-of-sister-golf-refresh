import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageHero } from "../components/section";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SisterGolf — Book a Workshop or Coaching" },
      {
        name: "description",
        content:
          "Get in touch to schedule a SisterGolf workshop, clinic or private on-course coaching for you or your organization.",
      },
      { property: "og:title", content: "Contact SisterGolf — Book a Workshop" },
      {
        property: "og:description",
        content:
          "Schedule a workshop, clinic or private coaching session with SisterGolf.",
      },
      { property: "og:url", content: "/contact" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const inputClass =
  "mt-2 w-full rounded-sm border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-fairway";

function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <>
      <PageHero
        eyebrow="Come join us"
        title="Let's get you on the course"
        intro="Tell us what you are trying to do and we will answer directly. One message is enough."
      />

      <section className="mx-auto grid max-w-6xl gap-16 px-6 py-20 sm:py-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="text-2xl text-fairway-deep">Send a message</h2>
          {sent ? (
            <p className="mt-6 rounded-sm border border-fairway/30 bg-secondary p-6 text-sm text-fairway-deep">
              Thanks. Your message is ready to send. Connect a backend and we'll deliver
              it straight to the SisterGolf inbox.
            </p>
          ) : (
            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-medium text-foreground">
                  Name
                  <input required name="name" className={inputClass} />
                </label>
                <label className="block text-sm font-medium text-foreground">
                  Email
                  <input required type="email" name="email" className={inputClass} />
                </label>
              </div>
              <label className="block text-sm font-medium text-foreground">
                Organization
                <input name="organization" className={inputClass} />
              </label>
              <label className="block text-sm font-medium text-foreground">
                What are you interested in?
                <select name="interest" className={inputClass} defaultValue="">
                  <option value="" disabled>
                    Select a program
                  </option>
                  <option>Corporate workshop</option>
                  <option>Curriculum licensing</option>
                  <option>Tournament consulting</option>
                  <option>On-course coaching</option>
                  <option>Learning golf myself</option>
                </select>
              </label>
              <label className="block text-sm font-medium text-foreground">
                Message
                <textarea required name="message" rows={5} className={inputClass} />
              </label>
              <button
                type="submit"
                className="rounded-sm bg-fairway px-6 py-3 text-sm font-semibold text-fairway-foreground transition-colors hover:bg-fairway-deep"
              >
                Send message
              </button>
            </form>
          )}
        </div>

        <aside className="space-y-10">
          <div className="border-t border-border pt-6">
            <h3 className="eyebrow text-accent">For companies</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Workshops, curriculum licensing, tournament consulting and on-course
              coaching for client-facing teams.
            </p>
          </div>
          <div className="border-t border-border pt-6">
            <h3 className="eyebrow text-accent">For individual women</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The cohort, the membership and practice sessions for women learning golf for
              their own careers.
            </p>
          </div>
</aside>
      </section>
    </>
  );
}
