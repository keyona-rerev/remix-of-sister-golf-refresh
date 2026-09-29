export type PressItem = {
  outlet: string;
  title: string;
  url: string;
  isoDate: string;
  date: string;
  kind: "Feature" | "TV" | "News" | "Press release";
  excerpt: string;
};

/** Coverage of SisterGolf and Shella Sylla, newest first. Summaries are our own words. */
export const pressItems: PressItem[] = [
  {
    outlet: "Birmingham Business Journal",
    title: "SisterGolf earns national chamber recognition",
    url: "https://www.bizjournals.com/birmingham/news/2026/09/22/sistergolf-earns-national-chamber-recognition.html",
    isoDate: "2026-09-22",
    date: "September 22, 2026",
    kind: "News",
    excerpt:
      "Coverage of SisterGolf's national chamber recognition. [CONFIRM: name of the recognition and one-line summary]",
  },
  {
    outlet: "The Guam Daily Post",
    title:
      "Shella Sylla, Founder and Director of The SisterGolf Foundation, Encourages More Women and Youth to Explore Golf",
    url: "https://www.postguam.com/online_features/press_releases/shella-sylla-founder-and-director-of-the-sistergolf-foundation-encourages-more-women-and-youth-to/article_8b84967b-a1c7-5df9-afa0-e347a8155a54.html",
    isoDate: "2026-05-30",
    date: "May 30, 2026",
    kind: "Press release",
    excerpt:
      "A press release on the SisterGolf Foundation's work to widen access to golf for women and underrepresented youth through scholarships, mentorship, clinics and community events.",
  },
  {
    outlet: "WVTM 13",
    title: "Women Breaking Barriers: Shella Sylla helping women take a swing at networking via SisterGolf",
    url: "https://www.wvtm13.com/article/women-breaking-barriers-shella-sylla-sistergolf-birmingham/60980103",
    isoDate: "2024-06-04",
    date: "June 4, 2024",
    kind: "TV",
    excerpt:
      "A Birmingham TV segment on how Shella founded SisterGolf to help women use golf as a professional networking tool.",
  },
  {
    outlet: "StyleBlueprint",
    title: "Giving Ladies a Leading Edge: Meet Shella Sylla of SisterGolf",
    url: "https://styleblueprint.com/everyday/shella-sylla-sistergolf/",
    isoDate: "2019-06-16",
    date: "June 16, 2019",
    kind: "Feature",
    excerpt:
      "A profile of Shella and the idea behind SisterGolf: teaching women golf fundamentals and business etiquette so they do not miss the deals made on the course.",
  },
  {
    outlet: "Bold Journey",
    title: "Meet Shella Sylla",
    url: "https://boldjourney.com/meet-shella-sylla/",
    isoDate: "",
    date: "[CONFIRM: publish date]",
    kind: "Feature",
    excerpt: "An interview with Shella Sylla. [CONFIRM: one-line summary]",
  },
];
