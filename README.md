# SisterGolf website

Marketing site for SisterGolf (Shella Sylla). Built with TanStack Start, React and Tailwind.

## Where things live

- **Images:** all images are files in this repo, in `public/images/`.
  - `public/images/uploads/` holds the photos copied from the old WordPress site. The year and month folders match the old site.
  - `public/images/photos/` holds the stock golf photos.
  - `public/images/sistergolf-logo.png` is the logo.
- **Page text and image paths:** `src/lib/site-content.ts` and `src/lib/pages-content.ts`.
- **Site address:** `src/lib/site-url.ts`. Change `SITE_URL` when the final domain goes live. Canonical links, og:url and social-share images all read from it.
- **Contact form:** `src/lib/config.ts` holds `LEAD_ENDPOINT`. Deploy `apps-script/lead-intake/Code.gs` as an Apps Script web app and paste its URL there.

## Photo credits

Two stock photos need a credit. The credits are in the site footer (`src/components/site-footer.tsx`):

- danperry.com, CC BY 2.0
- lele3100, CC BY 2.0

## Development

You need Node.js.

```sh
npm install
npm run dev
npm run build
```
