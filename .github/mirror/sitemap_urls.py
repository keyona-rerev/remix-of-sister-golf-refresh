"""Print every page URL listed in the WordPress sitemaps of a site."""
import re
import sys
import urllib.request

base, ua = sys.argv[1].rstrip("/"), sys.argv[2]
seen, pages = set(), set()


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": ua})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "replace")


def walk(url):
    if url in seen or len(seen) > 200:
        return
    seen.add(url)
    try:
        body = get(url)
    except Exception as e:  # missing sitemap is fine
        print(f"skip {url}: {e}", file=sys.stderr)
        return
    for loc in re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", body):
        loc = loc.replace("&amp;", "&")
        if "sistergolfonline.com" not in loc:
            continue
        if loc.endswith(".xml") or "sitemap" in loc.rsplit("/", 1)[-1]:
            walk(loc)
        else:
            pages.add(loc)


for path in ("/wp-sitemap.xml", "/sitemap_index.xml", "/sitemap.xml", "/page-sitemap.xml", "/post-sitemap.xml"):
    walk(base + path)
for p in sorted(pages):
    print(p)
print(f"{len(pages)} pages from {len(seen)} sitemaps", file=sys.stderr)
