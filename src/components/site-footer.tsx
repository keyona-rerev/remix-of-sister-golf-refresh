import { Link } from "@tanstack/react-router";

const LOGO_URL =
  "https://res.cloudinary.com/dialhpycd/image/upload/f_auto,q_auto/v1791473674/sistergolf/sistergolf-logo.png";

export function SiteFooter() {
  return (
    <footer className="bg-fairway-deep text-fairway-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img
            src={LOGO_URL}
            alt="SisterGolf"
            className="h-14 w-auto rounded-sm bg-background p-2"
            width={154}
            height={56}
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-fairway-foreground/70">
            Golf as a business tool. We work with companies that want their sales teams on
            the course, and with women who want to get there themselves.
          </p>
        </div>

        <div>
          <h3 className="eyebrow text-fairway-foreground/60">For companies</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link to="/for-companies" className="hover:text-accent">
                Corporate workshops
              </Link>
            </li>
            <li>
              <Link to="/curriculum-licensing" className="hover:text-accent">
                Curriculum licensing
              </Link>
            </li>
            <li>
              <Link to="/tournament-consulting" className="hover:text-accent">
                Tournament consulting
              </Link>
            </li>
            <li>
              <Link to="/on-course-coaching" className="hover:text-accent">
                On-course coaching
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
          <h3 className="eyebrow text-fairway-foreground/60">For women learning golf</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link to="/start-your-golf-journey" className="hover:text-accent">
                Start your golf journey
              </Link>
            </li>
            <li>
              <Link to="/sistergolf-membership" className="hover:text-accent">
                Membership
              </Link>
            </li>
            <li>
              <Link to="/practice-playdate-sessions" className="hover:text-accent">
                Play dates and practice
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-accent">
                About
              </Link>
            </li>
            <li>
              <Link to="/in-the-news" className="hover:text-accent">
                In the news
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-fairway-foreground/15">
        <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-fairway-foreground/60">
          <p>© {new Date().getFullYear()} SisterGolf. All rights reserved.</p>
          <p className="mt-2">
            Photo credits:{" "}
            <a
              href="https://www.flickr.com/photos/71018547@N00/2543049856"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-accent"
            >
              danperry.com
            </a>{" "}
            (CC BY 2.0),{" "}
            <a
              href="https://www.flickr.com/photos/13878737@N05/1413021987"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-accent"
            >
              lele3100
            </a>{" "}
            (CC BY 2.0)
          </p>
        </div>
      </div>
    </footer>
  );
}
