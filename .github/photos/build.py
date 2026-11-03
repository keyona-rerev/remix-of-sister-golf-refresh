"""Add the Woodfin Golf 2026 page to the static copy.

    python3 .github/photos/build.py [--download]

--download fetches the photos listed in woodfin-golf-2026.txt (Drive file id,
tab, file name) and saves web-sized copies. Without it, the page and menus are
rebuilt from photos already in the repo (the mirror job runs it this way, so a
fresh mirror keeps the page).

The page copies the layout of the earlier Woodfin pages: banner, title,
thank-you text, then every photo under Highlights.
"""
import html
import os
import re
import sys
import urllib.request

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
HERE = os.path.dirname(os.path.abspath(__file__))
SLUG = "woodfin-golf-2026"
LABEL = "Woodfin Golf 2026"
TEMPLATE = "woodfin-golf-2025"
PHOTOS = os.path.join(ROOT, "wp-content", "uploads", SLUG)
TITLE = "Randall L. Woodfin's 5th Annual Charity Golf Tournament"
INTRO = ("SisterGolf sends a heartfelt and resounding thank you to all our incredible sponsors, "
         "dedicated volunteers, and amazing golfers who came together to make the Randall L. Woodfin "
         "Charity Golf Tournament an extraordinary success!")
BANNER = "wp-content/uploads/2023/10/Randall-L.-Woodfin-Banner.png"


def list_folder(folder_id):
    """List a Drive folder that is shared by link (the folder's public embed view)."""
    url = f"https://drive.google.com/embeddedfolderview?id={folder_id}"
    with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"}), timeout=60) as r:
        page = r.read().decode("utf-8", "replace")
    found = re.findall(r'id="entry-([\w-]+)".*?class="flip-entry-title">([^<]+)<', page, re.S)
    found = [(i, html.unescape(n)) for i, n in found if re.search(r"\.(jpe?g|png|webp)$", n, re.I)]
    print(f"folder {folder_id}: {len(found)} photos")
    if not found:
        sys.exit("the folder is empty or not shared by link")
    return found


def download():
    from PIL import Image, ImageOps
    os.makedirs(os.path.join(PHOTOS, "thumbs"), exist_ok=True)
    rows = []
    for line in open(os.path.join(HERE, SLUG + ".txt"), encoding="utf-8"):
        parts = line.strip().split("\t")
        if not parts[0] or parts[0].startswith("#"):
            continue
        if parts[0] == "folder":
            rows += list_folder(parts[1])
        else:
            rows.append((parts[0], parts[1] if len(parts) > 1 else parts[0]))
    ok = bad = 0
    for fid, name in rows:
        base = re.sub(r"[^A-Za-z0-9_-]+", "-", os.path.splitext(name)[0]).strip("-").lower() or fid
        full = os.path.join(PHOTOS, base + ".jpg")
        if os.path.exists(full):
            ok += 1
            continue
        url = f"https://drive.usercontent.google.com/download?id={fid}&export=download&confirm=t"
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"}), timeout=120) as r:
                ctype, data = r.headers.get("Content-Type", ""), r.read()
            if not ctype.startswith(("image/", "application/octet-stream")):
                raise ValueError(f"got {ctype or 'no type'}, the file is probably not shared by link")
            tmp = full + ".src"
            open(tmp, "wb").write(data)
            im = ImageOps.exif_transpose(Image.open(tmp)).convert("RGB")
            big = im.copy(); big.thumbnail((2000, 2000)); big.save(full, "JPEG", quality=82, optimize=True, progressive=True)
            small = im.copy(); small.thumbnail((640, 640)); small.save(os.path.join(PHOTOS, "thumbs", base + ".jpg"), "JPEG", quality=78, optimize=True)
            os.remove(tmp)
            ok += 1
        except Exception as e:
            bad += 1
            print(f"could not get {name}: {e}")
    print(f"photos: {ok} ready, {bad} failed")
    if bad:
        sys.exit(1)


def row(inner, col="12"):
    return ('<div class="vc_row wpb_row vc_row-fluid thsn-row thsn-bg-color-yes thsn-bg-color-transparent thsn-zindex-zero">'
            f'<div class="wpb_column vc_column_container vc_col-sm-{col} thsn-column thsn-bg-color-yes thsn-bg-color-transparent thsn-zindex-zero">'
            f'<div class="vc_column-inner "><div class="wpb_wrapper">{inner}</div></div></div></div>\n')


def gallery():
    names = sorted(n for n in os.listdir(PHOTOS) if n.endswith(".jpg"))
    cells = "".join(
        f'<a href="../wp-content/uploads/{SLUG}/{n}"><img src="../wp-content/uploads/{SLUG}/thumbs/{n}" alt="" '
        'loading="lazy" decoding="async" style="width:100%;aspect-ratio:1/1;object-fit:cover;display:block"></a>'
        for n in names)
    lightbox = ("<script>/* static gallery lightbox */(function(){if(window.sgLightbox)return;window.sgLightbox=1;"
                "document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('.sg-static-gallery a');"
                "if(!a)return;e.preventDefault();var o=document.createElement('div');o.style.cssText='position:fixed;inset:0;"
                "background:rgba(0,0,0,.88);display:flex;align-items:center;justify-content:center;z-index:99999;cursor:zoom-out';"
                "var i=document.createElement('img');i.src=a.href;i.style.cssText='max-width:94vw;max-height:92vh;box-shadow:0 0 24px #000';"
                "o.appendChild(i);o.onclick=function(){o.remove()};document.body.appendChild(o)})})();</script>")
    return len(names), ('<div class="sg-static-gallery" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));'
                        f'gap:10px;margin:20px 0">{cells}</div>{lightbox}')


def menu_item(href, current=False):
    cls = "menu-item menu-item-type-post_type menu-item-object-page menu-item-" + SLUG
    if current:
        return f'<li class="{cls} current-menu-item current_page_item"><a href="{href}" aria-current="page">{LABEL}</a></li>'
    return f'<li class="{cls}"><a href="{href}">{LABEL}</a></li>'


PREV = re.compile(r'<li[^>]*><a href="([^"]*)"[^>]*>Woodfin Golf 2025</a></li>')


def build_page():
    count, grid = gallery()
    h = open(os.path.join(ROOT, TEMPLATE, "index.html"), encoding="utf-8").read()
    h = re.sub(r'<li class="[^"]*menu-item-' + SLUG + r'[^"]*"><a [^>]*>[^<]*</a></li>\n?', "", h)
    # Menu: this page becomes the current item, 2025 a plain link.
    h = PREV.sub(lambda m: menu_item("index.html", True) + "\n"
                 '<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-17399">'
                 '<a href="../woodfin-golf-2025/index.html">@@PREV@@</a></li>', h)
    h = h.replace("Woodfin Golf 2025", LABEL).replace("@@PREV@@", "Woodfin Golf 2025")
    desc = html.escape(f"{TITLE}. {INTRO}", quote=True)
    h = re.sub(r'(<meta (?:name="description"|property="og:description"|name="twitter:description") content=")[^"]*', lambda m: m.group(1) + desc, h)
    body = (row('<div class="vc_empty_space" style="height: 80px"><span class="vc_empty_space_inner"></span></div>'
                '<div class="wpb_single_image wpb_content_element vc_align_center"><figure class="wpb_wrapper vc_figure">'
                f'<div class="vc_single_image-wrapper vc_box_border_grey"><img loading="lazy" decoding="async" src="../{BANNER}" '
                'class="vc_single_image-img attachment-full" alt="Randall L. Woodfin Charity Golf Tournament" /></div></figure></div>')
            + row('<div class="vc_empty_space" style="height: 32px"><span class="vc_empty_space_inner"></span></div>'
                  f'<h2 style="font-size: 42px;line-height: 50px;text-align: left" class="vc_custom_heading">{html.escape(TITLE)}</h2>'
                  f'<div class="wpb_text_column wpb_content_element"><div class="wpb_wrapper"><h4>{html.escape(INTRO)}</h4></div></div>')
            + row('<div class="vc_empty_space" style="height: 32px"><span class="vc_empty_space_inner"></span></div>'
                  '<h3 style="font-size: 36px;line-height: 44px;text-align: center" class="vc_custom_heading">Highlights</h3>' + grid))
    a = h.index('<div class="entry-content">') + len('<div class="entry-content">')
    b = h.index("<!-- .entry-content -->")
    h = h[:a] + f'<div class="wpb-content-wrapper">{body}</div><h3 class="thsn-hide">{LABEL}</h3></div>' + h[b:]
    os.makedirs(os.path.join(ROOT, SLUG), exist_ok=True)
    open(os.path.join(ROOT, SLUG, "index.html"), "w", encoding="utf-8").write(h)
    print(f"{SLUG}/index.html built with {count} photos")


def add_to_menus():
    target = os.path.join(ROOT, SLUG, "index.html")
    n = 0
    for d, dirs, files in os.walk(ROOT):
        dirs[:] = [x for x in dirs if not x.startswith(".") and x not in ("wp-content", "wp-includes")]
        for f in files:
            if not f.endswith(".html") or os.path.join(d, f) == target:
                continue
            p = os.path.join(d, f)
            h = open(p, encoding="utf-8", errors="replace").read()
            if SLUG + "/" in h or "Woodfin Golf 2025</a></li>" not in h:
                continue
            href = os.path.relpath(target, d).replace(os.sep, "/")
            new = PREV.sub(lambda m: menu_item(href) + "\n" + m.group(0), h)
            if new != h:
                open(p, "w", encoding="utf-8").write(new)
                n += 1
    print(f"menu link added on {n} pages")


if __name__ == "__main__":
    if "--download" in sys.argv:
        download()
    if not os.path.isdir(PHOTOS) or not any(n.endswith(".jpg") for n in os.listdir(PHOTOS)):
        print("no photos yet, nothing to build")
        sys.exit(0)
    build_page()
    add_to_menus()
