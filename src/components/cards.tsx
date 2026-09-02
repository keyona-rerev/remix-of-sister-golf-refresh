import { Link } from "@tanstack/react-router";
import type { Article } from "../lib/articles";

export function PostCard({ post }: { post: Article }) {
  return (
    <article className="group flex flex-col">
      <Link
        to="/articles/$slug"
        params={{ slug: post.slug }}
        className="block overflow-hidden"
      >
        <img
          src={post.cardImage}
          alt={post.title}
          loading="lazy"
          className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        {post.isoDate ? <time dateTime={post.isoDate}>{post.date}</time> : null}
        <span>by {post.author}</span>
        {post.placeholder ? (
          <span className="eyebrow text-accent">Coming soon</span>
        ) : null}
      </div>
      <h3 className="mt-2 text-xl leading-snug text-fairway-deep">
        <Link
          to="/articles/$slug"
          params={{ slug: post.slug }}
          className="hover:text-accent"
        >
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
      <Link
        to="/articles/$slug"
        params={{ slug: post.slug }}
        className="mt-3 inline-block self-start border-b border-accent pb-0.5 text-sm font-semibold text-fairway"
      >
        Read more
      </Link>
    </article>
  );
}
