import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "../components/gallery-page";
import { galleryBySlug } from "../lib/pages-content";

const gallery = galleryBySlug("woodfin-golf-2022")!;

export const Route = createFileRoute("/woodfin-golf-2022")({
  head: () => ({
    meta: [
      { title: "Woodfin Golf 2022 — SisterGolf" },
      { name: "description", content: gallery.metaDescription },
      { property: "og:title", content: gallery.title },
      { property: "og:description", content: gallery.metaDescription },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://sister-golf-revive.lovable.app/woodfin-golf-2022",
      },
      { property: "og:image", content: gallery.bannerImage },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://sister-golf-revive.lovable.app/woodfin-golf-2022",
      },
    ],
  }),
  component: () => <GalleryPage gallery={gallery} />,
});
