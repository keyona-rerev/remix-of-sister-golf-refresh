import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageHero } from "../components/section";
import { LEAD_ENDPOINT } from "../lib/config";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SisterGolf | Book a Workshop or Coaching" },
      {
        name: "description",
        content:
          "Get in touch to schedule a SisterGolf workshop, clinic or private on-course coaching for you or your organization.",
      },
      { property: "og:title", content: "Contact SisterGolf | Book a Workshop" },
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
  validateSearch: (search: Record<string, unknown>): { interest?: string } =>
    typeof search.interest === "string" ? { interest: search.interest } : {},
  component: ContactPage,
});

const inputClass =
  "mt-2 w-full rounded-sm border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-fairway";

function ContactPage() {
  const { interest } = Route.useSearch();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!LEAD_ENDPOINT) {
      setError("This form is not connected yet. Please try again soon.");
      return;
    }
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setSending(true);
    setError("");
    try {
      const res = await fetch(LEAD_ENDPOINT, { method: "POST", body: JSON.stringify(data) });
      const result = await res.json();
      if (!result.ok) throw new Error(result.error || "failed");
      setSent(true);
    } catch {
      setError("Your message did not send. Please try again in a moment.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Come join us"
        title="Let's get you on the course"
        intro="Tell us what you are trying to do and we will answer directly. One message is enough."
      />

      <section>
        <img
          src="https://res.cloudinary.com/dialhpycd/image/upload/f_auto,q_auto,w_1280/v1791497497/sistergolf/contact.jpg"
          alt="Sunny golf green with a flag and bunker under a blue sky"
          loading="lazy"
          className="h-64 w-full object-cover sm:h-96"
        />
      </section>

      <section className="mx-auto grid max-w-6xl gap-16 px-6 py-20 sm:py-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="text-2xl text-fairway-deep">Send a message</h2>
          {sent ? (
            <p className="mt-6 rounded-sm border border-fairway/30 bg-secondary p-6 text-sm text-fairway-deep">
              Thanks. Your message reached SisterGolf. We will answer you directly.
            </p>
          ) : (
            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
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
                <select
                  name="interest"
                  className={inputClass}
                  defaultValue={interest ?? ""}
                >
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
              {error ? (
                <p role="alert" className="text-sm font-medium text-destructive">
                  {error}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={sending}
                className="rounded-sm bg-fairway px-6 py-3 text-sm font-semibold text-fairway-foreground transition-colors hover:bg-fairway-deep"
              >
                {sending ? "Sending..." : "Send message"}
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
