import { createFileRoute } from "@tanstack/react-router";
import { OfferingPage, type OfferingContent } from "../components/offering-page";

import { SITE_URL as SITE } from "../lib/site-url";
const TITLE = "On-course coaching";
const DESCRIPTION =
  "Shella joins your client round or tournament and coaches you live inside your foursome.";

export const Route = createFileRoute("/on-course-coaching")({
  head: () => ({
    meta: [
      { title: `${TITLE} | SisterGolf` },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: `${TITLE} | SisterGolf` },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/on-course-coaching` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/on-course-coaching` }],
  }),
  component: Page,
});

const content: OfferingContent = {
  eyebrow: "On-course coaching",
  title: "A coach inside your foursome",
  intro:
    "Shella joins you at a tournament or a round and coaches you live, so you can play well and handle the business side of the day.",
  interest: "On-course coaching",
  forWho: [
    "Professionals heading into a high-stakes client round.",
    "Teams entering a corporate scramble.",
    "Anyone who wants real-time guidance on the course, not a lesson on the range.",
  ],
  included: [
    "Real-time coaching during play: shot selection, pace and etiquette.",
    "Guidance on how to handle the business conversation while you play.",
    "[CONFIRM: any pre-round prep call or post-round notes]",
  ],
  howItWorks: [
    {
      title: "Tell us about the round",
      body: "Share the date, the course and who you will play with.",
    },
    {
      title: "Confirm terms",
      body: "We agree pricing and travel. [CONFIRM: pricing and travel terms]",
    },
    {
      title: "Play with Shella beside you",
      body: "Shella joins your group on the day and coaches you as you play.",
    },
  ],
  confirms: ["[CONFIRM: pricing]", "[CONFIRM: travel terms]", "[CONFIRM: availability and lead time]"],
  askTitle: "Tell us about your round",
  askBody: "One message is enough. Share the date, the course and the occasion.",
};

function Page() {
  return <OfferingPage content={content} current="On-course coaching" />;
}
