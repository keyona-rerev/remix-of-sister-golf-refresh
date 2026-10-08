import { createFileRoute } from "@tanstack/react-router";
import { OfferingPage, type OfferingContent } from "../components/offering-page";

import { SITE_URL as SITE } from "../lib/site-url";
const TITLE = "Tournament consulting";
const DESCRIPTION =
  "Advisory support from SisterGolf for organizations planning and running their own golf tournament.";

export const Route = createFileRoute("/tournament-consulting")({
  head: () => ({
    meta: [
      { title: `${TITLE} | SisterGolf` },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: `${TITLE} | SisterGolf` },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/tournament-consulting` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/tournament-consulting` }],
  }),
  component: Page,
});

const content: OfferingContent = {
  eyebrow: "Tournament consulting",
  title: "Plan your golf tournament with an advisor beside you",
  intro:
    "Advisory support for organizations planning and running their own golf tournament. We build the plan with you, then advise your team as they carry it out.",
  interest: "Tournament consulting",
  forWho: [
    "Organizations planning a charity, corporate or client golf tournament.",
    "Teams and event planners who run the event themselves and want an experienced guide.",
  ],
  included: [
    "A plan built with you: timeline, budget structure, vendor strategy, staffing model and day-of run of show.",
    "Advice for your team or your event planner as they put the plan into action.",
  ],
  howItWorks: [
    {
      title: "Scope the event",
      body: "You share the goal of the tournament, the date and the size of the field. [CONFIRM: intake questions Shella uses]",
    },
    {
      title: "Build the plan together",
      body: "We work through the timeline, budget structure, vendor strategy, staffing model and run of show with you.",
    },
    {
      title: "Advise as you execute",
      body: "Your team or event planner carries out the plan. We advise as questions come up.",
    },
  ],
  notIncluded: [
    "SisterGolf does not produce or run tournaments for clients.",
    "SisterGolf does not staff your event day-of. Your organization owns execution.",
  ],
  confirms: ["[CONFIRM: consulting engagement price]", "[CONFIRM: how far ahead to start]"],
  askTitle: "Tell us about your tournament",
  askBody: "One message is enough. Share the goal, the date and the size of the field.",
};

function Page() {
  return (
    <OfferingPage
      content={content}
      current="Tournament consulting"
      image={{
        src: "https://res.cloudinary.com/dialhpycd/image/upload/f_auto,q_auto,w_1280/v1791496805/sistergolf/tournament-consulting.jpg",
        alt: "Golf tournament on a course with players and golf bags",
      }}
    />
  );
}
