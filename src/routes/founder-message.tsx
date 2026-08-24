import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "../components/section";
import { books, images } from "../lib/site-content";

export const Route = createFileRoute("/founder-message")({
  head: () => ({
    meta: [
      { title: "Message from Founder & CEO Shella Sylla — SisterGolf" },
      {
        name: "description",
        content:
          "How an ex-banking executive with over 18 years in financial services turned golf into a career accelerator, and built SisterGolf around it.",
      },
      { property: "og:title", content: "Shella Sylla, Founder & CEO — SisterGolf" },
      {
        property: "og:description",
        content:
          "The story behind SisterGolf, from the Million Dollar club to workshops for women professionals.",
      },
      { property: "og:type", content: "profile" },
      {
        property: "og:url",
        content: "https://sister-golf-revive.lovable.app/founder-message",
      },
      { property: "og:image", content: images.founderMessage },
      { name: "twitter:image", content: images.founderMessage },
    ],
    links: [
      { rel: "canonical", href: "https://sister-golf-revive.lovable.app/founder-message" },
    ],
  }),
  component: FounderPage,
});

const podcasts = ["The ModGolf Podcast", "Make A Pivot Podcast"];

function FounderPage() {
  return (
    <>
      <section className="border-b border-border bg-sand">
        <div className="mx-auto grid max-w-6xl items-end gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rise-in">
            <p className="eyebrow text-accent">Shella Sylla</p>
            <h1 className="mt-4 text-4xl leading-[1.05] text-fairway-deep sm:text-6xl">
              Message from Founder &amp; CEO
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              An ex-banking executive with over 18 years in the financial services
              industry, and the reason SisterGolf exists.
            </p>
          </div>
          <img
            src={images.founderMessage}
            alt="Shella Sylla, founder of SisterGolf"
            className="w-full max-w-sm justify-self-end object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
        <div className="space-y-6 text-lg leading-relaxed text-foreground/85">
          <p>
            SisterGolf is the brainchild of Shella Sylla, ex-banking executive with over 18
            years in the financial services industry. Shella experienced firsthand how golf
            can positively impact your career or business after taking up the sport early
            on in her banking career. As a result of signing up for and taking lessons, in
            a few short months she went from struggling to meet her monthly goal of
            $500,000 to being a repeat member of the “Million Dollar” club — a designation
            given to associates who exceeded $1 million in production in any given month.
          </p>
          <p>
            While reaping the rewards of this newfound “secret” to success, Shella noticed
            that very few women, if any at all, were taking advantage of the business
            development and relationship building opportunities that golf has to offer.
            This prompted her to create SisterGolf as a tool for helping women learn and
            leverage the game of golf for business and career success.
          </p>
          <p>
            Shortly after launching a series of workshops, clinics and events designed to
            help women get in the game, Shella began getting numerous requests from male
            executives and professionals to provide a similar program for them. As a
            result, what began as a quest to empower women in the workplace expanded to
            include a curriculum that benefits both male and female professionals
            interested in using golf as a tool for relationship building and professional
            engagement.
          </p>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <img
            src={images.signature}
            alt="Shella Sylla signature"
            loading="lazy"
            className="h-16 w-auto"
          />
          <p className="mt-3 text-xl text-fairway-deep">— Shella Sylla</p>
          <p className="eyebrow mt-1 text-muted-foreground">
            CEO &amp; Founder of SisterGolf
          </p>
        </div>
      </section>

      <section className="bg-fairway-deep">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <SectionHeading eyebrow="Our history" title="Teachable moments" tone="onDark" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {images.history.map((src) => (
              <img
                key={src}
                src={src}
                alt="SisterGolf workshop moment"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            ))}
          </div>
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

      <section className="bg-secondary">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeading eyebrow="Podcast videos" title="PodCasts with Shella Sylla" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {podcasts.map((name) => (
              <div key={name} className="border-t border-border pt-5">
                <h3 className="text-xl text-fairway-deep">{name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
