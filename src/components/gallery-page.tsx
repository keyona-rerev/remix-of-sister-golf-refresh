import { Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "./section";
import { galleries, type Gallery } from "../lib/pages-content";

export function GalleryPage({ gallery }: { gallery: Gallery }) {
  return (
    <>
      <PageHero eyebrow={`Gallery ${gallery.year}`} title={gallery.title} />

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <img
          src={gallery.bannerImage}
          alt={gallery.title}
          loading="lazy"
          className="w-full object-cover"
        />
        <div className="mt-10 max-w-3xl space-y-5">
          {gallery.body.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <SectionHeading eyebrow="Results" title={gallery.winnersHeading} />
          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            {gallery.winners.map((image) => (
              <figure key={image.src}>
                <img
                  src={image.src}
                  alt={image.caption ?? gallery.title}
                  loading="lazy"
                  className="w-full object-cover"
                />
                {image.caption ? (
                  <figcaption className="mt-3 text-sm text-muted-foreground">
                    {image.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </div>
      </section>

      {gallery.sections.map((section) => (
        <section key={section.heading} className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <SectionHeading eyebrow="Highlights" title={section.heading} />
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {section.images.map((image) => (
              <figure key={image.src}>
                <img
                  src={image.src}
                  alt={image.caption ?? section.heading}
                  loading="lazy"
                  className="w-full object-cover"
                />
                {image.caption ? (
                  <figcaption className="mt-3 text-sm text-muted-foreground">
                    {image.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </section>
      ))}

      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeading eyebrow="More galleries" title="Other tournament years" />
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {galleries
              .filter((g) => g.slug !== gallery.slug)
              .map((g) => (
                <li key={g.slug}>
                  <Link
                    to={`/${g.slug}`}
                    className="text-sm font-medium text-fairway hover:text-accent"
                  >
                    {g.navLabel}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}
