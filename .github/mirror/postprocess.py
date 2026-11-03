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

root, source, ua = sys.argv[1], sys.argv[2].rstrip("/"), sys.argv[3]
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


def rel(m):
    path = m.group(1)
    if not path:
        return "/"
    return path  # keeps \/ escaping when the source used it


changed = 0
for f in files:
    with open(f, encoding="utf-8", errors="replace") as fh:
        text = fh.read()
    new = ABS.sub(rel, text)
    if new != text:
        with open(f, "w", encoding="utf-8") as out:
            out.write(new)
        changed += 1
print(f"rewrote absolute links in {changed} files")
