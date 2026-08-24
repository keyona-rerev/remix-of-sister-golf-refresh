import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "@tanstack/react-router";
import { UPLOADS } from "../lib/site-content";
import { externalLinks } from "../lib/pages-content";

/**
 * Homepage hero carousel — mirrors the four Slider Revolution slides on
 * sistergolfonline.com. Copy, background images and CTA targets are taken
 * from the live slider.
 *
 * Note: slides 2 and 3 link to /service/private-training/ on the live site,
 * which currently returns a 404 there. They point at /service/private-coaching
 * here instead.
 */

type SlideCta =
  | { label: string; href: string }
  | { label: string; to: string }
  | { label: string; to: string; params: Record<string, string> };

type Slide = {
  key: string;
  eyebrow: string;
  title: string;
  image: string;
  ctas: SlideCta[];
};

const slides: Slide[] = [
  {
    key: "sister-golf",
    eyebrow: "Welcome to SisterGolf",
    title: "We Teach Women How To Play Golf To Achieve Business Success",
    image: `${UPLOADS}/2023/01/Slide-1-Logo.jpg`,
    ctas: [
      { label: "Donate Now", href: externalLinks.donateGeneral },
      { label: "Join SisterGolf", href: externalLinks.membershipJoin },
      {
        label: "Private Coaching",
        to: "/portfolio/$slug",
        params: { slug: "sistergolf-private-lesson-experience" },
      },
    ],
  },
  {
    key: "womens-golf",
    eyebrow: "Golf for Women",
    title: "We Show Women How To Close More Deals and Get Promoted Using Golf",
    image: `${UPLOADS}/2023/01/Slide-2-Female-Golfer.jpg`,
    ctas: [
      { label: "Golf Workshops", to: "/workshops" },
      {
        label: "Private Coaching",
        to: "/service/$slug",
        params: { slug: "private-coaching" },
      },
      { label: "Donate Now", href: externalLinks.donateGeneral },
    ],
  },
  {
    key: "business-golf",
    eyebrow: "Business Golf",
    title: "We Teach Women How To Use Golf For Developing Beneficial Business Relationships",
    image: `${UPLOADS}/2023/01/Slide-8-Dk.jpg`,
    ctas: [
      { label: "Golf Workshops", to: "/workshops" },
      {
        label: "Private Coaching",
        to: "/service/$slug",
        params: { slug: "private-coaching" },
      },
      { label: "Donate Now", href: externalLinks.donateGeneral },
    ],
  },
  {
    key: "scholarship",
    eyebrow: "Scholarship Donation",
    title:
      "All donations go to the Sistergolf Education Scholarship, which benefits women looking to advance their careers and networking opportunities through golf.",
    image: `${UPLOADS}/2023/12/Donation-3.png`,
    ctas: [{ label: "Donate Now", href: externalLinks.donateGeneral }],
  },
];

const primaryCta =
  "rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90";
const secondaryCta =
  "rounded-sm border border-white/70 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-fairway-deep";

function CtaButton({ cta, index }: { cta: SlideCta; index: number }) {
  const className = index === 0 ? primaryCta : secondaryCta;

  if ("href" in cta) {
    return (
      <a href={cta.href} target="_blank" rel="noreferrer" className={className}>
        {cta.label}
      </a>
    );
  }

  if ("params" in cta) {
    return (
      <Link to={cta.to} params={cta.params} className={className}>
        {cta.label}
      </Link>
    );
  }

  return (
    <Link to={cta.to} className={className}>
      {cta.label}
    </Link>
  );
}

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || paused) return;
    const id = window.setInterval(() => emblaApi.scrollNext(), 6000);
    return () => window.clearInterval(id);
  }, [emblaApi, paused]);

  return (
    <section
      aria-label="Featured"
      className="relative border-b border-border bg-fairway-deep"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, i) => (
            <div key={slide.key} className="relative min-w-0 flex-[0_0_100%]">
              <img
                src={slide.image}
                alt=""
                aria-hidden="true"
                loading={i === 0 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />

              <div className="relative mx-auto flex min-h-[70vh] max-w-6xl items-center px-6 py-24 sm:min-h-[78vh]">
                <div className="max-w-2xl">
                  <p className="eyebrow text-accent">{slide.eyebrow}</p>
                  <h1 className="mt-4 text-3xl leading-[1.08] text-white sm:text-5xl">
                    {slide.title}
                  </h1>
                  <div className="mt-9 flex flex-wrap gap-4">
                    {slide.ctas.map((cta, ctaIndex) => (
                      <CtaButton key={cta.label} cta={cta} index={ctaIndex} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 text-white transition-colors hover:bg-white hover:text-fairway-deep md:flex"
      >
        <span aria-hidden="true">&#8592;</span>
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 text-white transition-colors hover:bg-white hover:text-fairway-deep md:flex"
      >
        <span aria-hidden="true">&#8594;</span>
      </button>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
        {slides.map((slide, i) => (
          <button
            key={slide.key}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={selected === i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-2.5 rounded-full transition-all ${
              selected === i ? "w-8 bg-accent" : "w-2.5 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
