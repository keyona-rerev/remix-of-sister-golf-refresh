import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "../components/section";
import { programs } from "../lib/pages-content";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "SisterGolf Programs — Experience, Group Lessons and Private Training" },
      {
        name: "description",
        content:
          "SisterGolf programs: the SisterGolf Experience, 2026 Group Golf Lessons, One-on-One Training and the SisterGolf Private Lesson Experience.",
      },
      { property: "og:title", content: "SisterGolf Programs" },
      {
        property: "og:description",
        content:
          "Explore the SisterGolf Experience, Group Golf Lessons, One-on-One Training and the Private Lesson Experience.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sister-golf-revive.lovable.app/programs" },
    ],
    links: [{ rel: "canonical", href: "https://sister-golf-revive.lovable.app/programs" }],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="What we run"
        title="Sistergolf Programs"
        intro="From your first lesson to private on-course coaching, choose the program that matches where your game is today."
      />

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-10 sm:grid-cols-2">
          {programs.map((program) => (
            <article key={program.slug} className="group">
              <Link
                to="/portfolio/$slug"
                params={{ slug: program.slug }}
                className="block overflow-hidden bg-secondary"
              >
                <img
                  src={program.cardImage}
                  alt={program.name}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </Link>
              <p className="eyebrow mt-5 text-accent">{program.categoryName}</p>
              <h2 className="mt-2 text-2xl leading-snug text-fairway-deep">
                <Link
                  to="/portfolio/$slug"
                  params={{ slug: program.slug }}
                  className="hover:text-accent"
                >
                  ({program.number}) {program.name}
                </Link>
              </h2>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
