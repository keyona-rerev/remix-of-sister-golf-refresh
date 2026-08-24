import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PostCard } from "../components/cards";
import { postBySlug, posts, type Post } from "../lib/site-content";


const SITE = "https://sister-golf-revive.lovable.app";

export const Route = createFileRoute("/golf-tips/$slug")({
  loader: ({ params }) => {
    const post = postBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article not found — SisterGolf" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    const url = `${SITE}/golf-tips/${params.slug}`;
    return {
      meta: [
        { title: `${post.title} — SisterGolf` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: post.heroImage },
        { name: "twitter:image", content: post.heroImage },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            datePublished: post.isoDate,
            image: post.heroImage,
            author: { "@type": "Person", name: post.author },
            publisher: { "@type": "Organization", name: "SisterGolf" },
          }),
        },
      ],
    };
  },
  notFoundComponent: PostNotFound,
  component: PostPage,
});

function PostNotFound() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-3xl text-fairway-deep">Article not found</h1>
      <Link
        to="/category/golf-tips"
        className="mt-6 inline-block border-b border-accent pb-0.5 text-sm font-semibold text-fairway"
      >
        Back to all articles
      </Link>
    </section>
  );
}

function PostPage() {
  const { post } = Route.useLoaderData() as { post: Post };
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const shareUrl = `${SITE}/golf-tips/${post.slug}`;

  return (
    <>
      <section className="border-b border-border bg-sand">
        <div className="mx-auto max-w-4xl px-6 pt-12 pb-0">
          <img
            src={post.heroImage}
            alt={post.title}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
        <div className="mx-auto max-w-3xl px-6 py-10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <time dateTime={post.isoDate}>{post.longDate}</time>
            <Link to="/category/golf-tips" className="eyebrow text-accent hover:underline">
              {post.category}
            </Link>
            <span>{post.author}</span>
          </div>
          <h1 className="mt-4 text-3xl leading-tight text-fairway-deep sm:text-4xl">
            {post.title}
          </h1>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <div className="space-y-6 text-base leading-relaxed text-foreground/85">
          {post.blocks.map((block, i) => {
            if (block.type === "paragraph") return <p key={i}>{block.text}</p>;
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
                <ol key={i} className="list-decimal space-y-4 pl-6 font-semibold">
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              );
            return (
              <ol key={i} className="list-decimal space-y-4 pl-6">
                {block.items.map((item) => (
                  <li key={item.lead}>
                    <strong className="text-fairway-deep">{item.lead}</strong> — {item.text}
                  </li>
                ))}
              </ol>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-border pt-6">
          <span className="rounded-sm bg-secondary px-3 py-1 text-xs font-semibold text-fairway-deep">
            {post.tag}
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
            href={`https://twitter.com/intent/tweet/?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-fairway hover:text-accent"
          >
            Share on Twitter
          </a>
        </div>
      </article>

      <section className="bg-secondary">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl text-fairway-deep">More Golf Tips</h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
