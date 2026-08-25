import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SisterGolf — Golf for Business Success" },
      {
        name: "description",
        content:
          "SisterGolf teaches women business professionals how to use golf to build relationships, close deals and advance their careers.",
      },
      { name: "author", content: "SisterGolf" },
      { property: "og:site_name", content: "SisterGolf" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&display=swap",
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "SisterGolf",
          description:
            "Golf workshops and coaching that teach women business professionals to use golf for career and business development.",
          founder: { "@type": "Person", name: "Shella Sylla" },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

// Tournament announcement banner expiry: auto-hides on and after October 27, 2026.
const WOODFIN_BANNER_EXPIRY = new Date("2026-10-27T00:00:00");
const WOODFIN_BANNER_KEY = "sg-woodfin-2026-banner";

function TournamentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (new Date() >= WOODFIN_BANNER_EXPIRY) return;
    try {
      if (localStorage.getItem(WOODFIN_BANNER_KEY)) return;
    } catch {
      // localStorage unavailable; show the banner anyway.
    }
    setVisible(true);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(WOODFIN_BANNER_KEY, "dismissed");
    } catch {
      // localStorage unavailable; dismissal just won't persist.
    }
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Tournament announcement"
      className="relative border-b border-border bg-fairway-deep text-fairway-foreground"
    >
      <p className="mx-auto max-w-7xl px-10 py-2.5 text-center text-xs leading-relaxed sm:text-sm">
        SisterGolf produces the Randall L. Woodfin 5th Annual Charity Golf Tournament.
        Monday, October 26, 2026 at Highland Park Golf Course.{" "}
        <a
          href="https://rlwtournament2026.com/register"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-accent underline underline-offset-2 hover:text-fairway-foreground"
        >
          Register
        </a>
      </p>
      <button
        type="button"
        aria-label="Dismiss tournament announcement"
        onClick={dismiss}
        className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-sm text-fairway-foreground/80 hover:bg-fairway hover:text-fairway-foreground"
      >
        ×
      </button>
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <TournamentBanner />
        <SiteHeader />
        <main className="flex-1">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
