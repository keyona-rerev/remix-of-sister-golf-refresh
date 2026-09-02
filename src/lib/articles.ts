import { newsPosts, posts, type Post } from "./site-content";

export type Article = Post & { placeholder?: boolean };

const titleOverrides: Record<string, string> = {
  "sistergolf-produces-woodfin-charity-golf-tournament":
    "SisterGolf and the Woodfin Charity Golf Tournament",
  "how-sistergolf-consults-on-golf-tournaments":
    "How SisterGolf consults on a custom tournament plan",
};

const written: Article[] = newsPosts.map((post) => ({
  ...post,
  title: titleOverrides[post.slug] ?? post.title,
}));

const placeholder: Article = {
  slug: "things-nobody-tells-you-on-a-golf-course",
  title: "Things nobody tells you on a golf course",
  date: "[CONFIRM: publish date]",
  isoDate: "",
  longDate: "[CONFIRM: publish date]",
  author: "Shella Sylla",
  category: "Articles",
  tag: "business golf",
  cardImage: newsPosts[0]?.cardImage ?? "",
  heroImage: newsPosts[0]?.heroImage ?? "",
  excerpt: "[PLACEHOLDER: summary to be written]",
  placeholder: true,
  blocks: [
    {
      type: "paragraph",
      text: "[PLACEHOLDER: article to be written. Working title: Things nobody tells you on a golf course.]",
    },
  ],
};

/** The three current articles, newest work first. */
export const featuredArticles: Article[] = [written[0]!, written[1]!, placeholder].filter(
  Boolean,
);

/** Earlier posts kept from the previous blog. */
export const archiveArticles: Article[] = posts;

export const allArticles: Article[] = [...featuredArticles, ...archiveArticles];

export const articleBySlug = (slug: string) => allArticles.find((a) => a.slug === slug);
