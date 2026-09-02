import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logoAsset from "../assets/sistergolf-logo.png.asset.json";

const nav = [
  { label: "For Companies", to: "/for-companies" },
  { label: "Start Your Golf Journey", to: "/start-your-golf-journey" },
  { label: "Membership", to: "/sistergolf-membership" },
  { label: "About", to: "/about" },
  { label: "Articles", to: "/articles" },
  { label: "Contact", to: "/contact" },
] as const;

const linkClass =
  "text-sm font-medium text-muted-foreground transition-colors hover:text-fairway";

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

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              activeProps={{ className: "text-fairway" }}
              className={linkClass}
            >
              {item.label}
            </Link>
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
        <nav className="border-t border-border bg-background px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {nav.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={close}
                className="text-sm font-semibold text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
