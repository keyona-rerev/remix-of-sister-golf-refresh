import { Link } from "@tanstack/react-router";
import logoAsset from "../assets/sistergolf-logo.png.asset.json";

export function SiteFooter() {
  return (
    <footer className="bg-fairway-deep text-fairway-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img
            src={logoAsset.url}
            alt="SisterGolf"
            className="h-14 w-auto rounded-sm bg-background p-2"
            width={154}
            height={56}
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-fairway-foreground/70">
            Teaching women business professionals how to use golf as a tool for building
            relationships, closing deals and advancing their careers.
          </p>
        </div>

        <div>
          <h3 className="eyebrow text-fairway-foreground/60">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link to="/about-us" className="hover:text-accent">
                About
              </Link>
            </li>
            <li>
              <Link to="/workshops" className="hover:text-accent">
                Workshops &amp; Coaching
              </Link>
            </li>
            <li>
              <Link to="/founder-message" className="hover:text-accent">
                Founder
              </Link>
            </li>
            <li>
              <Link to="/category/golf-tips" className="hover:text-accent">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-accent">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-fairway-foreground/60">Stay in touch</h3>
          <p className="mt-4 text-sm text-fairway-foreground/70">
            Workshop dates, clinics and tips for the business round.
          </p>
          <a
            href="http://sistergolfonline.com/mailchimp-signup/"
            className="mt-4 inline-block border-b border-accent pb-0.5 text-sm font-semibold hover:text-accent"
          >
            Newsletter signup
          </a>
        </div>
      </div>

      <div className="border-t border-fairway-foreground/15">
        <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-fairway-foreground/60">
          © {new Date().getFullYear()} SisterGolf. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
