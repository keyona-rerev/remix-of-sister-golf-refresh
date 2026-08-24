import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ServiceCard } from "../components/cards";
import { PageHero } from "../components/section";
import { serviceCategories, services } from "../lib/site-content";

const SITE = "https://sister-golf-revive.lovable.app";

export const Route = createFileRoute("/service-category/$slug")({
  loader: ({ params }) => {
    const category = serviceCategories.find((c) => c.slug === params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Category not found — SisterGolf" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { category } = loaderData;
    const url = `${SITE}/service-category/${params.slug}`;
    const description = `${category.name} from SisterGolf — programs that teach women business professionals to use golf for relationships, deals and career advancement.`;
    return {
      meta: [
        { title: `${category.name} — SisterGolf` },
        { name: "description", content: description },
        { property: "og:title", content: `${category.name} — SisterGolf` },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: CategoryNotFound,
  component: CategoryPage,
});

function CategoryNotFound() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-3xl text-fairway-deep">Category not found</h1>
      <Link
        to="/workshops"
        className="mt-6 inline-block border-b border-accent pb-0.5 text-sm font-semibold text-fairway"
      >
        See all workshops
      </Link>
    </section>
  );
}

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const matching = services.filter((s) => s.categorySlug === category.slug);

  return (
    <>
      <PageHero eyebrow="Workshops & online courses" title={category.name} />
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {matching.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>
    </>
  );
}
