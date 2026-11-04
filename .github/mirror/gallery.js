/* static gallery: 20 photos per page, 10/20/50/All picker, page buttons, click to enlarge */
(function () {
  if (window.sgGallery) return;
  window.sgGallery = 1;
  // The theme wraps every <select> in a full-width box with its own arrow. Undo that here.
  var css = document.createElement("style");
  css.textContent =
    ".sg-gallery-bar label{display:inline-flex!important;align-items:center;gap:8px;margin:0!important;white-space:nowrap}" +
    ".sg-gallery-bar .thsn-select{display:inline-block!important;border:0!important;width:auto!important}" +
    ".sg-gallery-bar .thsn-select:after{display:none!important}" +
    ".sg-gallery-bar select{display:inline-block!important;width:auto!important;min-width:84px;height:auto!important;" +
    "padding:6px 10px!important;font-size:16px!important;line-height:1.4!important;color:#333!important;" +
    "background:#fff!important;border:2px solid #ececec!important;border-radius:4px!important;" +
    "-webkit-appearance:menulist!important;-moz-appearance:menulist!important;appearance:auto!important;cursor:pointer}";
  document.head.appendChild(css);
  var BTN = "padding:6px 14px;border:0;border-radius:4px;background:#ef67a5;color:#fff;cursor:pointer;font:inherit";
  function bar(withPicker) {
    var d = document.createElement("div");
    d.className = "sg-gallery-bar";
    d.style.cssText = "display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;margin:14px 0";
    d.innerHTML = (withPicker ? '<label style="margin:0">Show <select aria-label="Photos per page">' +
        '<option value="10">10</option><option value="20" selected>20</option><option value="50">50</option><option value="0">All</option></select></label>' : "") +
      '<button type="button" data-step="-1" style="' + BTN + '">Previous</button>' +
      '<span aria-live="polite"></span>' +
      '<button type="button" data-step="1" style="' + BTN + '">Next</button>';
    return d;
  }
  function setup(g) {
    if (g.getAttribute("data-sg-ready")) return;
    g.setAttribute("data-sg-ready", "1");
    var items = [].slice.call(g.querySelectorAll(":scope > a"));
    if (items.length <= 10) return;
    var per = 20, page = 0;
    var top = bar(true), bottom = bar(false);
    g.parentNode.insertBefore(top, g);
    g.parentNode.insertBefore(bottom, g.nextSibling);
    var bars = [top, bottom];
    function render(scroll) {
      var n = per || items.length, pages = Math.ceil(items.length / n);
      page = Math.max(0, Math.min(page, pages - 1));
      items.forEach(function (a, i) { a.style.display = i >= page * n && i < (page + 1) * n ? "" : "none"; });
      var text = per ? "Photos " + (page * n + 1) + " to " + Math.min((page + 1) * n, items.length) + " of " + items.length
                     : "All " + items.length + " photos";
      bars.forEach(function (b) {
        b.querySelector("span").textContent = text;
        [].forEach.call(b.querySelectorAll("button"), function (btn) {
          var step = +btn.getAttribute("data-step");
          btn.style.visibility = pages > 1 ? "visible" : "hidden";
          btn.disabled = step < 0 ? page === 0 : page >= pages - 1;
          btn.style.opacity = btn.disabled ? "0.4" : "1";
        });
      });
      if (scroll && top.scrollIntoView) top.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    top.querySelector("select").addEventListener("change", function (e) { per = +e.target.value; page = 0; render(false); });
    bars.forEach(function (b) {
      b.addEventListener("click", function (e) {
        var btn = e.target.closest("button");
        if (!btn || btn.disabled) return;
        page += +btn.getAttribute("data-step");
        render(true);
      });
    });
    render(false);
  }
  function init() { [].forEach.call(document.querySelectorAll(".sg-static-gallery"), setup); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest(".sg-static-gallery a");
    if (!a) return;
    e.preventDefault();
    var o = document.createElement("div");
    o.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.88);display:flex;align-items:center;justify-content:center;z-index:99999;cursor:zoom-out";
    var i = document.createElement("img");
    i.src = a.href;
    i.alt = (a.querySelector("img") || {}).alt || "";
    i.style.cssText = "max-width:94vw;max-height:92vh;box-shadow:0 0 24px #000";
    o.appendChild(i);
    o.onclick = function () { o.remove(); };
    document.body.appendChild(o);
  });
})();
