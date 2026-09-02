import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PostCard } from "../components/cards";
import { allArticles, articleBySlug, type Article } from "../lib/articles";

const SITE = "https://sister-golf-revive.lovable.app";

// Renders [label](url) inline links inside paragraph text.
function renderInline(text: string): ReactNode {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!m) return part;
    const [, label, url] = m;
    const className =
      "font-semibold text-fairway underline underline-offset-2 hover:text-accent";
    if (url!.startsWith("/")) {
      return (
        <Link key={i} to={url!} className={className}>
          {label}
        </Link>
      );
    }
    return (
      <a key={i} href={url} target="_blank" rel="noreferrer" className={className}>
        {label}
      </a>
    );
  });
}

export const Route = createFileRoute("/articles/$slug")({
  loader: ({ params }) => {
    const article = articleBySlug(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Article unavailable — SisterGolf" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { article } = loaderData;
    const url = `${SITE}/articles/${params.slug}`;
    return {
      meta: [
        { title: `${article.title} — SisterGolf` },
        { name: "description", content: article.excerpt },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: article.heroImage },
        { name: "twitter:image", content: article.heroImage },
        ...(article.placeholder
          ? [{ name: "robots", content: "noindex" } as const]
          : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: article.placeholder
        ? []
        : [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: article.title,
                datePublished: article.isoDate,
                image: article.heroImage,
                author: { "@type": "Person", name: article.author },
                publisher: { "@type": "Organization", name: "SisterGolf" },
              }),
            },
          ],
    };
  },
  notFoundComponent: ArticleNotFound,
  component: ArticlePage,
});

function ArticleNotFound() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-3xl text-fairway-deep">Article not found</h1>
      <Link
        to="/articles"
        className="mt-6 inline-block border-b border-accent pb-0.5 text-sm font-semibold text-fairway"
      >
        Back to all articles
      </Link>
    </section>
  );
}

function ArticlePage() {
  const { article } = Route.useLoaderData() as { article: Article };
  const related = allArticles.filter((a) => a.slug !== article.slug).slice(0, 3);
  const shareUrl = `${SITE}/articles/${article.slug}`;

  return (
    <>
      <section className="border-b border-border bg-sand">
        <div className="mx-auto max-w-4xl px-6 pt-12 pb-0">
          <img
            src={article.heroImage}
            alt={article.title}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
        <div className="mx-auto max-w-3xl px-6 py-10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            {article.isoDate ? (
              <time dateTime={article.isoDate}>{article.longDate}</time>
            ) : (
              <span>{article.longDate}</span>
            )}
            <span className="eyebrow text-accent">{article.category}</span>
            <span>{article.author}</span>
          </div>
          <h1 className="mt-4 text-3xl leading-tight text-fairway-deep sm:text-4xl">
            {article.title}
          </h1>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <div className="space-y-6 text-base leading-relaxed text-foreground/85">
          {article.blocks.map((block, i) => {
            if (block.type === "paragraph")
              return <p key={i}>{renderInline(block.text)}</p>;
            if (block.type === "heading")
              return (
                <h2 key={i} className="pt-4 text-2xl text-fairway-deep">
                  {block.text}
                </h2>
              );
            if (block.type === "quote")
              return (
                <blockquote
                  key={i}
                  className="border-l-2 border-accent pl-6 text-xl leading-relaxed text-fairway-deep italic"
                >
                  {block.text}
                </blockquote>
              );
            if (block.type === "numbered")
              return (
                <ol key={i} className="list-decimal space-y-3 pl-6">
                  {block.items.map((item) => (
                    <li key={item} className="pl-1 font-semibold text-fairway-deep">
                      {item}
                    </li>
                  ))}
                </ol>
              );
            return (
              <ol key={i} className="list-decimal space-y-3 pl-6">
                {block.items.map((item) => (
                  <li key={item.lead} className="pl-1">
                    <strong className="text-fairway-deep">{item.lead}:</strong>{" "}
                    {item.text}
                  </li>
                ))}
              </ol>
            );
          })}
        </div>

        {!article.placeholder ? (
          <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-border pt-6">
            <span className="rounded-sm bg-secondary px-3 py-1 text-xs font-semibold text-fairway-deep">
              {article.tag}
            </span>
            <a
              href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-fairway hover:text-accent"
            >
              Share on Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet/?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-fairway hover:text-accent"
            >
              Share on Twitter
            </a>
          </div>
        ) : null}
      </article>

      {related.length > 0 ? (
        <section className="bg-secondary">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <h2 className="text-3xl text-fairway-deep">More articles</h2>
            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <PostCard key={a.slug} post={a} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
