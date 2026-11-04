"""Finish the static copy after wget.

1. Find links to sistergolfonline.com that are still absolute (often inside scripts,
   JSON or data attributes, for example slider images) and download any file that
   is missing.
2. Rewrite those absolute links to site-relative paths, so the copy works on any domain.
"""
import os
import re
import sys
import urllib.parse
import urllib.request

root, source, ua = os.path.abspath(sys.argv[1]), sys.argv[2].rstrip("/"), sys.argv[3]
TEXT_EXT = (".html", ".htm", ".css", ".js", ".json", ".xml", ".txt", ".svg")
# Matches http(s)://, protocol-relative //, and JSON-escaped https:\/\/ forms.
ABS = re.compile(r"(?:https?:)?(?:\\?/){2}(?:www\.)?sistergolfonline\.com((?:\\?/)[^\"'\s)<>,]*)?", re.I)
ASSET = re.compile(r"\.(?:jpe?g|png|gif|webp|svg|ico|css|js|woff2?|ttf|eot|otf|mp4|webm|mp3|pdf|json)$", re.I)

files = []
for d, _, names in os.walk(root):
    for n in names:
        if n.lower().endswith(TEXT_EXT) or ".css@" in n or ".js@" in n:
            files.append(os.path.join(d, n))

missing = set()
for f in files:
    with open(f, encoding="utf-8", errors="replace") as fh:
        text = fh.read()
    for m in ABS.finditer(text):
        path = (m.group(1) or "/").replace("\\/", "/")
        path = urllib.parse.unquote(path.split("?")[0].split("#")[0])
        if ASSET.search(path) and not os.path.exists(os.path.join(root, path.lstrip("/"))):
            missing.add(path)

# Some theme styles come from admin-ajax.php (made by PHP on each visit).
# Save each one as a plain .css file and point pages at it.
AJAX = re.compile(r"(?:https?:)?//(?:www\.)?sistergolfonline\.com/wp-admin/admin-ajax\.php\?action=([A-Za-z0-9_-]+)[^\"'\s<>]*")
generated = {}
for f in files:
    with open(f, encoding="utf-8", errors="replace") as fh:
        for m in AJAX.finditer(fh.read()):
            generated.setdefault(m.group(1), m.group(0).replace("&#038;", "&").replace("&amp;", "&"))
for action, url in generated.items():
    try:
        req = urllib.request.Request(url if url.startswith("http") else "https:" + url, headers={"User-Agent": ua})
        with urllib.request.urlopen(req, timeout=30) as r:
            ctype, data = r.headers.get("Content-Type", ""), r.read()
        if "css" not in ctype:
            print(f"skip {action}: {ctype}")
            continue
        dest = os.path.join(root, "wp-content", "generated", action + ".css")
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        with open(dest, "wb") as out:
            out.write(data)
        print(f"saved generated stylesheet {action}.css ({len(data)} bytes)")
        files.append(dest)
        for m in ABS.finditer(data.decode("utf-8", "replace")):
            path = urllib.parse.unquote((m.group(1) or "/").replace("\\/", "/").split("?")[0].split("#")[0])
            if ASSET.search(path) and not os.path.exists(os.path.join(root, path.lstrip("/"))):
                missing.add(path)
        for f in files:
            with open(f, encoding="utf-8", errors="replace") as fh:
                text = fh.read()
            rel_path = os.path.relpath(dest, os.path.dirname(os.path.abspath(f))).replace(os.sep, "/")
            new = re.sub(r"(?:https?:)?//(?:www\.)?sistergolfonline\.com/wp-admin/admin-ajax\.php\?action=" + re.escape(action) + r"[^\"'\s<>]*", rel_path, text)
            if new != text:
                with open(f, "w", encoding="utf-8") as out:
                    out.write(new)
    except Exception as e:
        print(f"could not save {action}: {e}")

# Photo galleries (WPBakery media grids) are filled in by the browser from
# admin-ajax.php, so the static copy shows an empty "Highlights" section.
# Ask WordPress for each grid once and write the photos into the page.
import html as _html
GRID = re.compile(r'<div class="vc_grid-container[^"]*"[^>]*data-vc-grid-settings="([^"]+)"[^>]*data-vc-request="([^"]+)"[^>]*data-vc-post-id="(\d+)"[^>]*data-vc-public-nonce="([^"]+)"[^>]*>\s*</div>')
IMG_URL = r'(?:https?:)?//(?:www\.)?sistergolfonline\.com/wp-content/uploads/[^"\'\s)<>]+\.(?:jpe?g|png|gif|webp)'
LIGHTBOX = "<script>" + open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "gallery.js"), encoding="utf-8").read() + "</script>"


def static_gallery(items):
    cells = "".join(
        f'<a href="{full}"><img src="{thumb}" alt="" loading="lazy" decoding="async" '
        f'style="width:100%;aspect-ratio:1/1;object-fit:cover;display:block"></a>'
        for full, thumb in items)
    return ('<div class="sg-static-gallery" style="display:grid;grid-template-columns:'
            'repeat(auto-fill,minmax(200px,1fr));gap:10px;margin:20px 0">' + cells + '</div>' + LIGHTBOX)


grids = 0
for f in [x for x in files if x.lower().endswith((".html", ".htm"))]:
    with open(f, encoding="utf-8", errors="replace") as fh:
        text = fh.read()
    if "vc_grid-container" not in text:
        continue

    def fill(m):
        global grids
        settings = __import__("json").loads(_html.unescape(m.group(1)))
        form = {"action": "vc_get_vc_grid_data", "vc_action": "vc_get_vc_grid_data",
                "tag": settings.get("tag", "vc_media_grid"), "vc_post_id": m.group(3),
                "_vcnonce": m.group(4)}
        for k, v in settings.items():
            form[f"data[{k}]"] = v
        try:
            req = urllib.request.Request(_html.unescape(m.group(2)), data=urllib.parse.urlencode(form).encode(),
                                         headers={"User-Agent": ua, "X-Requested-With": "XMLHttpRequest"})
            with urllib.request.urlopen(req, timeout=60) as r:
                resp = r.read().decode("utf-8", "replace")
        except Exception as e:
            print(f"gallery fetch failed in {os.path.relpath(f, root)}: {e}")
            return m.group(0)
        items = []
        for chunk in resp.split('class="vc_grid-item ')[1:]:
            urls = re.findall(IMG_URL, chunk.replace("\\/", "/"))
            if not urls:
                continue
            full = next((u for u in urls if not re.search(r"-\d+x\d+\.\w+$", u)), urls[0])
            thumb = next((u for u in urls if re.search(r"-\d+x\d+\.\w+$", u)), full)
            items.append((full, thumb))
        if not items:
            print(f"gallery in {os.path.relpath(f, root)} came back empty: {resp[:300]!r}")
            return m.group(0)
        for full, thumb in items:
            for u in (full, thumb):
                path = urllib.parse.unquote(re.sub(r"^(?:https?:)?//[^/]+", "", u))
                if not os.path.exists(os.path.join(root, path.lstrip("/"))):
                    missing.add(path)
        grids += 1
        print(f"gallery in {os.path.relpath(f, root)}: {len(items)} photos")
        return static_gallery(items)

    new = GRID.sub(fill, text)
    if new != text:
        with open(f, "w", encoding="utf-8") as out:
            out.write(new)
print(f"filled {grids} photo galleries")

ok = fail = 0
for path in sorted(missing):
    dest = os.path.join(root, path.lstrip("/"))
    try:
        req = urllib.request.Request(source + urllib.parse.quote(path), headers={"User-Agent": ua})
        with urllib.request.urlopen(req, timeout=30) as r:
            data = r.read()
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        with open(dest, "wb") as out:
            out.write(data)
        ok += 1
    except Exception as e:
        fail += 1
        print(f"could not fetch {path}: {e}")
print(f"extra assets: {ok} fetched, {fail} failed")


def local(path):
    clean = urllib.parse.unquote(path.replace("\\/", "/").split("?")[0].split("#")[0]).lstrip("/")
    full = os.path.join(root, clean)
    return clean == "" or os.path.isfile(full) or os.path.isfile(os.path.join(full, "index.html"))


def make_rel(cur_dir):
    """Rewrite to a path relative to the file, so the copy also works under a
    sub-folder (GitHub Pages) and not only at a domain root (Netlify)."""
    def rel(m):
        raw = m.group(1) or "/"
        escaped = "\\/" in raw
        path = raw.replace("\\/", "/")
        if path != "/" and not local(path):
            return m.group(0)  # not in the copy: keep the live address
        base, sep, tail = path.partition("?") if "?" in path else path.partition("#")
        target = os.path.join(root, base.lstrip("/"))
        out = os.path.relpath(target, cur_dir).replace(os.sep, "/")
        if base.endswith("/") or base == "":
            out = out.rstrip("/") + "/"
        if out in ("./", "."):
            out = "./"
        out = out + sep + tail
        return out.replace("/", "\\/") if escaped else out
    return rel


def make_root(_cur_dir):
    def rel(m):
        path = m.group(1)
        if not path:
            return "/"
        return path if local(path) else m.group(0)
    return rel


changed = 0
for f in files:
    with open(f, encoding="utf-8", errors="replace") as fh:
        text = fh.read()
    # HTML and CSS resolve links from their own location. Script files resolve
    # them from the page, so they keep site-root paths.
    is_doc = f.lower().endswith((".html", ".htm", ".css", ".svg", ".xml")) or ".css@" in f
    rewrite = (make_rel if is_doc else make_root)(os.path.dirname(os.path.abspath(f)))
    new = ABS.sub(rewrite, text)
    if new != text:
        with open(f, "w", encoding="utf-8") as out:
            out.write(new)
        changed += 1
print(f"rewrote absolute links in {changed} files")
