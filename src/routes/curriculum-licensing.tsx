import { createFileRoute } from "@tanstack/react-router";
import { OfferingPage, type OfferingContent } from "../components/offering-page";

import { SITE_URL as SITE } from "../lib/site-url";
const TITLE = "Curriculum licensing";
const DESCRIPTION =
  "License the SisterGolf program and run it with your own team, priced per seat.";

export const Route = createFileRoute("/curriculum-licensing")({
  head: () => ({
    meta: [
      { title: `${TITLE} | SisterGolf` },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: `${TITLE} | SisterGolf` },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/curriculum-licensing` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/curriculum-licensing` }],
  }),
  component: Page,
});

const content: OfferingContent = {
  eyebrow: "Curriculum licensing",
  title: "Run the SisterGolf program with your own team",
  intro:
    "License the SisterGolf curriculum and deliver it inside your organization, on your schedule, priced per seat.",
  interest: "Curriculum licensing",
  forWho: [
    "Companies that want golf skills taught to a client-facing team without booking outside sessions each time.",
    "Organizations with their own trainers, managers or learning and development staff.",
    "Teams that plan to enroll people in groups over time.",
  ],
  included: [
    "The SisterGolf program material, licensed for your organization to deliver internally.",
    "Per-seat pricing, so cost follows the number of people you enroll.",
    "[CONFIRM: what a licensed seat includes, for example guides, slides, facilitator notes]",
  ],
  howItWorks: [
    {
      title: "Tell us about your group",
      body: "Share who will take the program and how many seats you need. This sets the license.",
    },
    {
      title: "Agree the license",
      body: "We confirm what is included and the per-seat price. [CONFIRM: license term and renewal]",
    },
    {
      title: "Deliver it internally",
      body: "Your team runs the material on your own schedule. You decide when and how each group goes through it.",
    },
  ],
  notIncluded: [
    "Not a live SisterGolf session. If you want Shella in the room, see corporate workshops.",
  ],
  confirms: ["[CONFIRM: per-seat price]", "[CONFIRM: minimum seats]", "[CONFIRM: license term]"],
  askTitle: "Tell us how many seats you need",
  askBody: "One message is enough. Name your team and the size of the group.",
};

function Page() {
  return (
    <OfferingPage
      content={content}
      current="Curriculum licensing"
      image={{
        src: "https://res.cloudinary.com/dialhpycd/image/upload/f_auto,q_auto,w_1280/v1791496811/sistergolf/curriculum-licensing.jpg",
        alt: "Golf bags with clubs lined up at a driving range",
      }}
    />
  );
}
