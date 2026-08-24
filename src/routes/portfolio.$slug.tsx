import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "../components/section";
import { programBySlug, programs, type Program } from "../lib/pages-content";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }) => {
    const program = programBySlug(params.slug);
    if (!program) throw notFound();
    return program;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const url = `https://sister-golf-revive.lovable.app/portfolio/${loaderData.slug}`;
    return {
      meta: [
        { title: `(${loaderData.number}) ${loaderData.name} — SisterGolf` },
        { name: "description", content: loaderData.metaDescription },
        { property: "og:title", content: loaderData.name },
        { property: "og:description", content: loaderData.metaDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: loaderData.heroImage },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: ProgramPage,
});

function ProgramPage() {
  const program = Route.useLoaderData() as Program;

  return (
    <>
      <PageHero eyebrow={program.categoryName} title={program.name} />

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div className="space-y-5">
            {program.blocks.map((block, i) =>
              block.type === "heading" ? (
                <h2 key={i} className="text-2xl text-fairway-deep">
                  {block.text}
                </h2>
              ) : (
                <p key={i} className="text-base leading-relaxed text-muted-foreground">
                  {block.text}
                </p>
              ),
            )}

            {program.cta ? (
              <a
                href={program.cta.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
              >
                {program.cta.label}
              </a>
            ) : null}
          </div>

          <img
            src={program.heroImage}
            alt={program.name}
            loading="lazy"
            className="w-full object-cover"
          />
        </div>
      </section>

      {program.included ? (
        <section className="bg-secondary">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <SectionHeading eyebrow="Details" title="What's Included" />
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {program.included.map((item) => (
                <div key={item.title} className="border-t border-border pt-6">
                  <h3 className="text-xl text-fairway-deep">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {program.notes ? (
        <section className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
          <div className="space-y-10">
            {program.notes.map((note) => (
              <div key={note.heading}>
                <h2 className="text-2xl text-fairway-deep">{note.heading}</h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {note.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeading eyebrow="Keep exploring" title="Other programs" />
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {programs
              .filter((p) => p.slug !== program.slug)
              .map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/portfolio/$slug"
                    params={{ slug: p.slug }}
                    className="text-sm font-medium text-fairway hover:text-accent"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}
