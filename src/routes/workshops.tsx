import { createFileRoute } from "@tanstack/react-router";
import { ServiceCard } from "../components/cards";
import { PageHero } from "../components/section";
import { services } from "../lib/site-content";

export const Route = createFileRoute("/workshops")({
  head: () => ({
    meta: [
      { title: "Schedule a Workshop — SisterGolf Workshops & Online Courses" },
      {
        name: "description",
        content:
          "Browse SisterGolf workshops, private coaching and online courses: Ladies Business Golf, Deals on the Green, Cubicle to Course and Private Coaching.",
      },
      { property: "og:title", content: "Schedule a Workshop — SisterGolf" },
      {
        property: "og:description",
        content:
          "Workshops and online courses that teach women to use golf for business and career success.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sister-golf-revive.lovable.app/workshops" },
    ],
    links: [
      { rel: "canonical", href: "https://sister-golf-revive.lovable.app/workshops" },
    ],
  }),
  component: WorkshopsPage,
});

function WorkshopsPage() {
  return (
    <>
      <PageHero eyebrow="Workshops & online courses" title="Schedule a Workshop" />

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>
    </>
  );
}
