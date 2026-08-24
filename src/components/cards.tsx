import { Link } from "@tanstack/react-router";
import type { Post, Service } from "../lib/site-content";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group">
      <Link
        to="/service/$slug"
        params={{ slug: service.slug }}
        className="block overflow-hidden"
      >
        <img
          src={service.cardImage}
          alt={service.name}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <Link
        to="/service-category/$slug"
        params={{ slug: service.categorySlug }}
        className="eyebrow mt-4 inline-block text-accent hover:underline"
      >
        {service.categoryName}
      </Link>
      <h3 className="mt-2 text-xl text-fairway-deep">
        <Link
          to="/service/$slug"
          params={{ slug: service.slug }}
          className="hover:text-accent"
        >
          {service.name}
        </Link>
      </h3>
    </article>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group flex flex-col">
      <Link
        to="/golf-tips/$slug"
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
        <time dateTime={post.isoDate}>{post.date}</time>
        <span>by {post.author}</span>
        <Link
          to="/category/golf-tips"
          className="eyebrow text-accent hover:underline"
        >
          {post.category}
        </Link>
      </div>
      <h3 className="mt-2 text-xl leading-snug text-fairway-deep">
        <Link
          to="/golf-tips/$slug"
          params={{ slug: post.slug }}
          className="hover:text-accent"
        >
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
      <Link
        to="/golf-tips/$slug"
        params={{ slug: post.slug }}
        className="mt-3 inline-block self-start border-b border-accent pb-0.5 text-sm font-semibold text-fairway"
      >
        Read More
      </Link>
    </article>
  );
}
