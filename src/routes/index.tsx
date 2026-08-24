import { createFileRoute, Link } from "@tanstack/react-router";
import { PostCard, ServiceCard } from "../components/cards";
import { HeroCarousel } from "../components/hero-carousel";
import { SectionHeading } from "../components/section";
import { books, images, links, posts, services } from "../lib/site-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SisterGolf — We Teach Women How To Play Golf For Business Success" },
      {
        name: "description",
        content:
          "SisterGolf teaches women business professionals how they can use golf as a tool for developing mutually beneficial business relationships and creating connections for professional advancement.",
      },
      {
        property: "og:title",
        content: "SisterGolf — We Teach Women How To Play Golf For Business Success",
      },
      {
        property: "og:description",
        content:
          "Build relationships, close more deals and get promoted. Workshops, private coaching and online courses from SisterGolf.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sister-golf-revive.lovable.app/" },
      { property: "og:image", content: images.heroGolfer },
      { name: "twitter:image", content: images.heroGolfer },
    ],
    links: [{ rel: "canonical", href: "https://sister-golf-revive.lovable.app/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroCarousel />

      <section className="border-b border-border bg-sand">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rise-in">
            <p className="eyebrow text-accent">About Us</p>
            <h2 className="mt-4 text-4xl leading-[1.06] text-fairway-deep sm:text-5xl">
              We Teach Women How To Play Golf To Achieve Business Success
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              SisterGolf teaches women business professionals how they can use golf as a
              tool for developing mutually beneficial business relationships, and creating
              connections for professional advancement in the Corporate workplace.
            </p>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div className="border-t border-border pt-5">
                <h3 className="text-xl text-fairway-deep">Build Relationships</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Close more deals and get promoted.
                </p>
              </div>
              <div className="border-t border-border pt-5">
                <h3 className="text-xl text-fairway-deep">Make Connections</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Play golf to achieve business and career success.
                </p>
              </div>
            </div>

            <Link
              to="/about-us"
              className="mt-10 inline-block rounded-sm bg-fairway px-6 py-3 text-sm font-semibold text-fairway-foreground transition-colors hover:bg-fairway-deep"
            >
              Learn More
            </Link>
          </div>

          <img
            src={images.heroGolfer}
            alt="Woman golfer taking a swing"
            className="w-full justify-self-end object-contain"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <SectionHeading eyebrow="What we offer" title="Workshops & Training" />
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section className="bg-fairway-deep">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="eyebrow text-accent">Shella Sylla / Founder &amp; CEO</p>
            <h2 className="mt-3 text-3xl leading-tight text-fairway-foreground sm:text-4xl">
              Message from the Founder
            </h2>
            <p className="mt-6 text-base leading-relaxed text-fairway-foreground/75">
              SisterGolf is the brainchild of Shella Sylla, ex-banking executive with over
              18 years in the financial services industry. Shella experienced firsthand how
              golf can positively impact your career or business after taking up the sport
              early on in her banking career. As a result of signing up for and taking
              lessons, in a few short months, she went from struggling to meet her monthly
              goal of $500,000 to being a repeat member of the “Million dollar” club (a
              designation given to associates who exceeded $1 million in production in any
              given month).
            </p>
            <Link
              to="/founder-message"
              className="mt-8 inline-block rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              Read More
            </Link>
          </div>
          <img
            src={images.founderMessage}
            alt="Shella Sylla, founder and CEO of SisterGolf"
            loading="lazy"
            className="w-full object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
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
                alt={`${book.title} cover`}
                loading="lazy"
                className="h-52 w-auto shadow-sm"
              />
              <h3 className="mt-5 text-xl text-fairway-deep">{book.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {book.description}
              </p>
              <a
                href={book.url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block border-b border-accent pb-0.5 text-sm font-semibold text-fairway"
              >
                Buy at Amazon
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="mx-auto max-w-2xl text-3xl leading-tight text-fairway-deep">
            Be sure to check out our Golf Workshops and Private Coaching
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Learn everything you need to know about making the game of Golf work for you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/workshops"
              className="rounded-sm bg-fairway px-6 py-3 text-sm font-semibold text-fairway-foreground hover:bg-fairway-deep"
            >
              SEE WORKSHOPS
            </Link>
            <Link
              to="/service/$slug"
              params={{ slug: "private-coaching" }}
              className="rounded-sm border border-fairway px-6 py-3 text-sm font-semibold text-fairway hover:bg-fairway hover:text-fairway-foreground"
            >
              PRIVATE COACHING
            </Link>
          </div>
          <div className="mt-10 border-t border-border pt-8">
            <h3 className="text-xl text-fairway-deep">Want to Stay in Touch?</h3>
            <Link
              to="/mailchimp-signup"
              className="mt-3 inline-block border-b border-accent pb-0.5 text-sm font-semibold text-fairway"
            >
              Newsletter Signup
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <SectionHeading
          eyebrow="Come join us"
          title="Tournaments, Meet-Ups & Clinics"
          intro="Come join us for tournaments, coaching, workshops and meet-ups for business networking or just for fun."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          {["All", "Charity Event", "Golf Tournament"].map((label) => (
            <span
              key={label}
              className="rounded-sm border border-border px-4 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            >
              {label}
            </span>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Upcoming events are announced by email first —{" "}
          <a
            href={links.newsletter}
            className="border-b border-accent pb-0.5 font-semibold text-fairway"
          >
            join the list
          </a>
          .
        </p>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <SectionHeading
            eyebrow="Latest news"
            title="Blog Articles"
            intro="Check out and share our Golfing Tips, Insights, News and Articles."
          />
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 6).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
