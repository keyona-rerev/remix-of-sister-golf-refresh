import { createFileRoute, Link } from "@tanstack/react-router";
import { PostCard } from "../components/cards";
import { PageHero, SectionHeading } from "../components/section";
import { posts, press, testimonials } from "../lib/site-content";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About Us — What is SisterGolf all about? Our Mission" },
      {
        name: "description",
        content:
          "The mission of SisterGolf is to expose and educate female business professionals on how they can use golf as a tool for developing mutually beneficial business relationships.",
      },
      { property: "og:title", content: "About SisterGolf — Expose, Educate, Empower" },
      {
        property: "og:description",
        content:
          "Our mission is to help women use golf as a tool for business relationships and professional advancement.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sister-golf-revive.lovable.app/about-us" },
    ],
    links: [{ rel: "canonical", href: "https://sister-golf-revive.lovable.app/about-us" }],
  }),
  component: AboutPage,
});

const pillars = [
  {
    title: "Expose",
    body: "Expose women to the game of golf and the benefits that the sport has on one’s career.",
  },
  {
    title: "Educate",
    body: "Educate women on the rules and etiquette of the game.",
  },
  {
    title: "Empower",
    body: "Empower women by helping them build confidence to play alongside their male counterparts",
  },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Next level"
        title="What is SisterGolf all about? Our Mission"
        intro="The mission of SisterGolf is to expose and educate female business professionals on how they can use golf as a tool for developing mutually beneficial business relationships, and creating connections for professional advancement in the Corporate America workplace."
      />

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-10 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <div key={pillar.title} className="border-t border-border pt-6">
              <span className="eyebrow text-accent">0{i + 1}</span>
              <h2 className="mt-3 text-2xl text-fairway-deep">{pillar.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <SectionHeading
            eyebrow="SisterGolf noteworthy"
            title="SisterGolf In The News"
            intro="Click on images to read articles."
          />
          <div className="mt-12 grid grid-cols-2 items-center gap-10 sm:grid-cols-3 lg:grid-cols-6">
            {press.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="opacity-70 transition-opacity hover:opacity-100"
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  loading="lazy"
                  className="max-h-14 w-full object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <SectionHeading eyebrow="Stories of us" title="Testimonials" />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.youtubeId}>
              <div className="aspect-video w-full overflow-hidden bg-secondary">
                <iframe
                  src={`https://www.youtube.com/embed/${t.youtubeId}`}
                  title={t.title}
                  loading="lazy"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
              <figcaption className="mt-3 text-sm text-muted-foreground">
                {t.title}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-14 border-t border-border pt-8">
          <h2 className="text-2xl text-fairway-deep">
            Regions Tradition Women's Intro to Golf Clinic
          </h2>
          <p className="mt-2 text-xl text-fairway">Empowering Women Through Golf</p>
          <p className="mt-1 text-sm text-muted-foreground">May 13, 2022</p>
        </div>
      </section>

      <section className="bg-fairway-deep">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <SectionHeading eyebrow="Latest news" title="Blog Articles" tone="onDark" />
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <Link
            to="/category/golf-tips"
            className="mt-10 inline-block rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
          >
            All articles
          </Link>
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-xl text-3xl leading-tight text-fairway-deep">
            Ready to get your team in the game?
          </h2>
          <Link
            to="/contact"
            className="rounded-sm bg-fairway px-6 py-3 text-sm font-semibold text-fairway-foreground hover:bg-fairway-deep"
          >
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  );
}
