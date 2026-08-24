import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logoAsset from "../assets/sistergolf-logo.png.asset.json";

type NavChild = { label: string; to?: string; href?: string };
type NavItem = { label: string; to?: string; href?: string; children?: NavChild[] };

const nav: NavItem[] = [
  { label: "Home", to: "/" },
  {
    label: "About",
    to: "/about-us",
    children: [
      { label: "About Us", to: "/about-us" },
      { label: "Founder Message", to: "/founder-message" },
      { label: "SisterGolf Foundation", to: "/sistergolf-foundation" },
    ],
  },
  {
    label: "Workshops",
    to: "/workshops",
    children: [
      { label: "Deals on the Green", to: "/service/deals-on-the-green" },
      { label: "Cubicle to Course", to: "/service/cubicle-to-course" },
      { label: "Ladies Business Golf", to: "/service/ladies-business-golf" },
      { label: "Private Lessons & Coaching", to: "/service/private-coaching" },
    ],
  },
  {
    label: "Programs",
    to: "/programs",
    children: [
      { label: "Golf Journey", to: "/choose-your-golf-journey" },
      { label: "One-on-One Training", to: "/portfolio/one-on-one" },
      {
        label: "Private Lesson Experience",
        to: "/portfolio/sistergolf-private-lesson-experience",
      },
      { label: "Play Dates and Practice Sessions", to: "/practice-playdate-sessions" },
    ],
  },
  {
    label: "Gallery",
    to: "/woodfin-golf-2025",
    children: [
      { label: "Woodfin Golf 2025", to: "/woodfin-golf-2025" },
      { label: "Woodfin Golf 2024", to: "/woodfin-golf-2024" },
      { label: "Woodfin Golf 2023", to: "/woodfin-golf-2023" },
      { label: "Woodfin Golf 2022", to: "/woodfin-golf-2022" },
    ],
  },
  { label: "Products", to: "/products" },
  { label: "News & Articles", to: "/blog-grid-view" },
  {
    label: "Membership",
    to: "/sistergolf-membership",
    children: [
      { label: "Membership Overview", to: "/sistergolf-membership" },
      { label: "Join SisterGolf", href: "https://sg-membership.vibepreview.com/" },
      { label: "Membership Portal", to: "/membership-preview" },
    ],
  },
  { label: "Contact Us", to: "/contact" },
];

const linkClass =
  "text-sm font-medium text-muted-foreground transition-colors hover:text-fairway";

function DesktopItem({ item }: { item: NavItem }) {
  if (!item.children) {
    return (
      <Link
        to={item.to!}
        activeOptions={{ exact: item.to === "/" }}
        activeProps={{ className: "text-fairway" }}
        className={linkClass}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="group relative">
      <Link to={item.to!} activeProps={{ className: "text-fairway" }} className={linkClass}>
        {item.label}
      </Link>
      <div className="invisible absolute left-1/2 top-full z-50 min-w-56 -translate-x-1/2 pt-4 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <ul className="border border-border bg-background py-2 shadow-lg">
          {item.children.map((child) => (
            <li key={child.label}>
              {child.href ? (
                <a
                  href={child.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block px-4 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-fairway"
                >
                  {child.label}
                </a>
              ) : (
                <Link
                  to={child.to!}
                  className="block px-4 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-fairway"
                >
                  {child.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link to="/" className="flex items-center" onClick={close}>
          <img
            src={logoAsset.url}
            alt="SisterGolf"
            className="h-12 w-auto"
            width={132}
            height={48}
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <DesktopItem key={item.label} item={item} />
          ))}
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-sm border border-border lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span className="block h-px w-5 bg-foreground" />
            <span className="block h-px w-5 bg-foreground" />
            <span className="block h-px w-5 bg-foreground" />
          </div>
        </button>
      </div>

      {open && (
        <nav className="max-h-[75vh] overflow-y-auto border-t border-border bg-background px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-5">
            {nav.map((item) => (
              <div key={item.label}>
                <Link
                  to={item.to!}
                  onClick={close}
                  className="text-sm font-semibold text-foreground"
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <ul className="mt-2 space-y-2 border-l border-border pl-4">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        {child.href ? (
                          <a
                            href={child.href}
                            target="_blank"
                            rel="noreferrer"
                            onClick={close}
                            className="text-sm text-muted-foreground"
                          >
                            {child.label}
                          </a>
                        ) : (
                          <Link
                            to={child.to!}
                            onClick={close}
                            className="text-sm text-muted-foreground"
                          >
                            {child.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
