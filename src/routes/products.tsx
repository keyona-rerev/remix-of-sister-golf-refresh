import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "../components/section";
import { books } from "../lib/site-content";
import { giftCards, merch } from "../lib/pages-content";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Gift Cards, Books and SisterGolf Gear" },
      {
        name: "description",
        content:
          "SisterGolf gift certificates, books by Shella Sylla, and SisterGolf apparel and golf accessories.",
      },
      { property: "og:title", content: "SisterGolf Products" },
      {
        property: "og:description",
        content:
          "Gift certificates, books by Shella Sylla, and SisterGolf apparel and accessories.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sister-golf-revive.lovable.app/products" },
    ],
    links: [{ rel: "canonical", href: "https://sister-golf-revive.lovable.app/products" }],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Gift cards"
        title="Gift Certificate"
        intro="When It's About Giving Something More Than Just A Gift!"
      />

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-10 sm:grid-cols-3">
          {giftCards.map((card) => (
            <article key={card.title}>
              <div className="overflow-hidden bg-secondary">
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="w-full object-cover"
                />
              </div>
              <h2 className="mt-5 text-xl text-fairway-deep">{card.title}</h2>
              <a
                href={card.url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block border-b border-accent pb-0.5 text-sm font-semibold text-fairway hover:text-accent"
              >
                Shop Online
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <SectionHeading
            eyebrow="Books for sale"
            title="Books by Shella Sylla"
            intro="Purchase Shella's books at Amazon."
          />
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {books.map((book) => (
              <article key={book.title}>
                <img
                  src={book.image}
                  alt={`${book.title} Book`}
                  loading="lazy"
                  className="w-full max-w-[244px] object-contain"
                />
                <h3 className="mt-5 text-xl text-fairway-deep">{book.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {book.description}
                </p>
                <a
                  href={book.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block border-b border-accent pb-0.5 text-sm font-semibold text-fairway hover:text-accent"
                >
                  Buy at Amazon
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <SectionHeading eyebrow="Beginners golf" title="Golf Accessories" />
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {merch.map((item) => (
            <article key={item.title}>
              <div className="overflow-hidden bg-secondary">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full object-cover"
                />
              </div>
              <h3 className="mt-5 text-lg leading-snug text-fairway-deep">{item.title}</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {item.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              {item.action.url ? (
                <a
                  href={item.action.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block border-b border-accent pb-0.5 text-sm font-semibold text-fairway hover:text-accent"
                >
                  {item.action.label}
                </a>
              ) : (
                <Link
                  to="/contact"
                  className="mt-3 inline-block border-b border-accent pb-0.5 text-sm font-semibold text-fairway hover:text-accent"
                >
                  {item.action.label}
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
