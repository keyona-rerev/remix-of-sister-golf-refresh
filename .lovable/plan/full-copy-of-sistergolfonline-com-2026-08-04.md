# Full copy of sistergolfonline.com

Goal: replicate the original site page-for-page — same content, same structure, and a layout/typography/color treatment that mirrors the original WordPress theme rather than the current editorial redesign.

## Pages to build

| Route | Source |
|---|---|
| `/` | Home |
| `/about-us` | About Us |
| `/founder-message` | Message from the Founder |
| `/workshops` | Workshops |
| `/service/ladies-business-golf` | Service detail |
| `/service/deals-on-the-green` | Service detail |
| `/service/cubicle-to-course` | Service detail |
| `/service/private-coaching` | Service detail |
| `/service/private-training` | Service detail |
| `/service-category/workshops` | Category listing |
| `/service-category/private-coaching` | Category listing |
| `/service-category/online-course` | Category listing |
| `/category/golf-tips` | Blog index |
| `/golf-tips/$slug` | 6 posts: what-is-sister-golf, how-golf-acts-as-an-equalizer-in-business, the-fusion-of-golf-and-business-tactics, five-reasons-you-should-pick-up-a-golf-club-today, practice-the-way-you-play, should-you-mark-and-play-with-practice-balls |
| `/mailchimp-signup` | Newsletter signup |
| `/contact` | Contact (kept from current build, linked in nav) |

Old routes that change path (`/about`, `/founder`, `/blog`) get permanent redirects to the new paths so existing links keep working.

## Layout and design

- Scrape each page for its real text, headings, images and link targets; no invented copy.
- Rework the theme tokens in `src/styles.css` to match the original: its actual palette (green/black/white with the accent used on buttons), heading and body typefaces loaded via `<link>` in `__root.tsx`, and its button/section spacing rhythm.
- Rebuild the header (logo, top nav order, dropdowns for Services) and footer (columns, social links, copyright) to mirror the original structure.
- Mirror per-page section order: hero banner, intro block, service/feature grids, testimonial and press strips, CTA band.
- Images are hot-linked from the original media URLs, same as the current build.

## Technical notes

- Blog posts and service pages are data-driven: one content module per group (`src/lib/posts.ts`, `src/lib/services.ts`) with title, slug, hero image, body blocks, plus dynamic routes `golf-tips.$slug.tsx` and `service.$slug.tsx`, and static category routes filtering that data. No backend.
- Every route gets its own `head()` with title, description, `og:title`/`og:description`, `og:url`, canonical; post routes add Article JSON-LD and `og:image`.
- Blog post bodies are stored as structured blocks (paragraph / heading / image / list) rather than raw HTML, so they render with the design tokens.
- Contact form stays client-side only (no email delivery) unless you want it wired to a backend.

## Scope note

This is a static reproduction: no WordPress comments, no search, no author archive pages. Say the word if you want any of those too.
