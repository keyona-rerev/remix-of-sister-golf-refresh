// One place for the public site address.
// Change SITE_URL when the final domain goes live. Canonical links, og:url
// and og:image all read from here.
export const SITE_URL = "https://sistergolf-refresh-preview.netlify.app";

// Social-share images must be absolute URLs. Local images use paths like
// "/images/uploads/...", so this adds the site address in front.
export function absoluteUrl(path: string): string {
  return /^https?:\/\//.test(path) ? path : `${SITE_URL}${path}`;
}
