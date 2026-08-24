import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { serviceBySlug, services, type Service } from "../lib/site-content";

const SITE = "https://sister-golf-revive.lovable.app";

export const Route = createFileRoute("/service/$slug")({
  loader: ({ params }) => {
    const service = serviceBySlug(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Program not found — SisterGolf" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { service } = loaderData;
    const url = `${SITE}/service/${params.slug}`;
    return {
      meta: [
        { title: `${service.name} — SisterGolf` },
        { name: "description", content: service.metaDescription },
        { property: "og:title", content: `${service.name} — SisterGolf` },
        { property: "og:description", content: service.metaDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: service.heroImage },
        { name: "twitter:image", content: service.heroImage },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: ServiceNotFound,
  component: ServicePage,
});

function ServiceNotFound() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-3xl text-fairway-deep">Program not found</h1>
      <Link
        to="/workshops"
        className="mt-6 inline-block border-b border-accent pb-0.5 text-sm font-semibold text-fairway"
      >
        See all workshops
      </Link>
    </section>
  );
}

function ServicePage() {
  const { service } = Route.useLoaderData() as { service: Service };
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <section className="border-b border-border bg-sand">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr]">
          <img
            src={service.heroImage}
            alt={service.name}
            className="w-full object-cover"
          />
          <div className="rise-in">
            <Link
              to="/service-category/$slug"
              params={{ slug: service.categorySlug }}
              className="eyebrow text-accent hover:underline"
            >
              {service.categoryName}
            </Link>
            <h1 className="mt-4 text-4xl leading-[1.06] text-fairway-deep sm:text-5xl">
              {service.name}
            </h1>
            {service.subtitle ? (
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {service.subtitle}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <div className="space-y-6 text-base leading-relaxed text-foreground/85">
          {service.blocks.map((block, i) => {
            if (block.type === "paragraph") return <p key={i}>{block.text}</p>;
            if (block.type === "strong")
              return (
                <p key={i} className="font-semibold text-fairway-deep">
                  {block.text}
                </p>
              );
            if (block.type === "heading")
              return (
                <h2 key={i} className="pt-4 text-2xl text-fairway-deep">
                  {block.text}
                </h2>
              );
            if (block.type === "subheading")
              return (
                <h3 key={i} className="pt-2 text-xl text-fairway-deep">
                  {block.text}
                </h3>
              );
            return (
              <ul key={i} className="space-y-2">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3 border-b border-border pb-2">
                    <span className="text-accent">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          })}
        </div>

        {service.cta ? (
          <a
            href={service.cta.url}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-block rounded-sm bg-fairway px-6 py-3 text-sm font-semibold text-fairway-foreground transition-colors hover:bg-fairway-deep"
          >
            {service.cta.label}
          </a>
        ) : null}
        {service.ctaNote ? (
          <p className="mt-10 inline-block rounded-sm bg-secondary px-6 py-3 text-sm font-semibold text-fairway-deep">
            {service.ctaNote}
          </p>
        ) : null}
      </section>

      <section className="bg-fairway-deep">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2">
          {service.highlights.map((h) => (
            <div key={h.title} className="border-t border-fairway-foreground/20 pt-5">
              <h2 className="text-2xl text-fairway-foreground">{h.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-fairway-foreground/75">
                {h.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl text-fairway-deep">Other programs</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {others.map((s) => (
            <li key={s.slug} className="border-t border-border pt-4">
              <Link
                to="/service/$slug"
                params={{ slug: s.slug }}
                className="text-lg text-fairway-deep hover:text-accent"
              >
                {s.name}
              </Link>
              <p className="eyebrow mt-1 text-muted-foreground">{s.categoryName}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
