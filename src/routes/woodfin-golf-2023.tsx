import { SITE_URL, absoluteUrl } from "../lib/site-url";
import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "../components/gallery-page";
import { galleryBySlug } from "../lib/pages-content";

const gallery = galleryBySlug("woodfin-golf-2023")!;

export const Route = createFileRoute("/woodfin-golf-2023")({
  head: () => ({
    meta: [
      { title: "Woodfin Golf 2023 — SisterGolf" },
      { name: "description", content: gallery.metaDescription },
      { property: "og:title", content: gallery.title },
      { property: "og:description", content: gallery.metaDescription },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: `${SITE_URL}/woodfin-golf-2023`,
      },
      { property: "og:image", content: absoluteUrl(gallery.bannerImage) },
    ],
    links: [
      {
        rel: "canonical",
        href: `${SITE_URL}/woodfin-golf-2023`,
      },
    ],
  }),
  component: () => <GalleryPage gallery={gallery} />,
});
