#!/usr/bin/env python3
"""Baut den NarraTec-Methoden-One-Pager (A4, 2 Seiten) aus onepager-de.html zu PDF.

Alles wird eingebettet (Fonts als data-URI, QR als inline SVG, Portraits als data-URI),
damit die Ausgabe deterministisch und offline reproduzierbar ist.

    python3 build.py [--html-only]

Abhaengigkeiten: segno (QR), ein Chromium-basierter Browser fuer --print-to-pdf.
"""
from __future__ import annotations

import argparse
import base64
import re
import shutil
import subprocess
import sys
import tempfile
import urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO = HERE.parent.parent

TEMPLATE = HERE / "onepager-de.html"
FLOW = HERE / "flow.svg"
OUT_HTML = HERE / "build" / "onepager-de.built.html"
OUT_PDF = HERE / "NarraTec-Methode-Onepager-DE.pdf"

PHOTOS = {"__PHOTO_R__": REPO / "public" / "Roessler.jpeg",
          "__PHOTO_W__": REPO / "public" / "Wieland.jpeg"}

BOOKING_URL = "https://cal.meetergo.com/richard-rossler/narratec?src=onepager"

GOOGLE_FONTS_CSS = (
    "https://fonts.googleapis.com/css2"
    "?family=Instrument+Serif:ital@0;1"
    "&family=Inter+Tight:wght@400;500;600;700"
    "&family=JetBrains+Mono:wght@400;500"
    "&display=swap"
)
UA = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"}

# Chromium-basierte Browser, die --print-to-pdf koennen (erster Treffer gewinnt).
BROWSERS = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Opera.app/Contents/MacOS/Opera",
    "chromium", "google-chrome",
]


def fetch(url: str) -> bytes:
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30).read()


def font_css(cache_dir: Path) -> str:
    """Google-Fonts-CSS holen, latin/latin-ext behalten, woff2 als data-URI einbetten."""
    cache = cache_dir / "fonts-inline.css"
    if cache.exists():
        return cache.read_text()

    css = fetch(GOOGLE_FONTS_CSS).decode()
    parts = re.split(r"/\*\s*([a-z0-9\-]+)\s*\*/", css)
    blocks, downloaded = [], {}
    for subset, block in zip(parts[1::2], parts[2::2]):
        if subset not in ("latin", "latin-ext"):
            continue
        m = re.search(r"url\((https://fonts\.gstatic\.com[^)]+)\)", block)
        if not m:
            continue
        url = m.group(1)
        downloaded.setdefault(url, fetch(url))
        b64 = base64.b64encode(downloaded[url]).decode()
        blocks.append(block.strip().replace(url, f"data:font/woff2;base64,{b64}"))

    out = "\n".join(blocks)
    cache_dir.mkdir(parents=True, exist_ok=True)
    cache.write_text(out)
    print(f"  fonts   {len(blocks)} @font-face, {sum(map(len, downloaded.values())) / 1024:.0f} KB")
    return out


def qr_svg() -> str:
    import segno
    qr = segno.make(BOOKING_URL, error="q")
    buf = tempfile.NamedTemporaryFile(suffix=".svg", delete=False)
    qr.save(buf.name, kind="svg", scale=10, border=0, dark="#14110D", light=None, omitsize=True)
    svg = Path(buf.name).read_text()
    Path(buf.name).unlink()
    print(f"  qr      Version {qr.version}, {qr.symbol_size(scale=1, border=0)[0]} Module")
    return re.sub(r"<\?xml[^>]*\?>\s*", "", svg).strip()


def data_uri(path: Path, mime: str) -> str:
    return f"data:{mime};base64," + base64.b64encode(path.read_bytes()).decode()


def find_browser() -> str | None:
    for cand in BROWSERS:
        if Path(cand).exists():
            return cand
        found = shutil.which(cand)
        if found:
            return found
    return None


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--html-only", action="store_true", help="nur die gebuendelte HTML schreiben")
    args = ap.parse_args()

    print("NarraTec One Pager")
    html = TEMPLATE.read_text()
    html = html.replace("/*__FONTS__*/", font_css(HERE / "build" / ".cache"))
    html = html.replace("<!--__FLOW__-->", FLOW.read_text())
    html = html.replace("<!--__QR__-->", qr_svg())
    for token, path in PHOTOS.items():
        html = html.replace(token, data_uri(path, "image/jpeg"))

    for leftover in ("__FONTS__", "__FLOW__", "__QR__", "__PHOTO_R__", "__PHOTO_W__"):
        if leftover in html:
            print(f"  WARNUNG: Platzhalter {leftover} nicht ersetzt", file=sys.stderr)

    OUT_HTML.parent.mkdir(parents=True, exist_ok=True)
    OUT_HTML.write_text(html)
    print(f"  html    {OUT_HTML.relative_to(REPO)} ({len(html) / 1024:.0f} KB)")
    if args.html_only:
        return 0

    engine = render_pdf()
    if not engine:
        print("  FEHLER: kein Renderer gefunden. Entweder `pip install playwright && playwright install "
              "chromium`, oder die HTML im Browser oeffnen und per Drucken > Als PDF sichern (A4, "
              "Raender: keine, Hintergrundgrafiken: an) exportieren.", file=sys.stderr)
        return 1
    set_metadata()
    print(f"  pdf     {OUT_PDF.relative_to(REPO)} ({OUT_PDF.stat().st_size / 1024:.0f} KB)  [{engine}]")
    return 0


def set_metadata() -> None:
    """Dokument-Eigenschaften setzen — sichtbar in Mail-Clients und PDF-Viewern."""
    try:
        from pypdf import PdfReader, PdfWriter
    except ImportError:
        print("  hinweis pypdf fehlt — PDF ohne Metadaten geschrieben")
        return
    reader = PdfReader(OUT_PDF)
    writer = PdfWriter()
    for page in reader.pages:
        writer.add_page(page)
    writer.add_metadata({
        "/Title": "NarraTec — Die Methode: vom Problem zur Entscheidung, von der Entscheidung in die Umsetzung",
        "/Author": "NarraTec — Dr. Richard Rößler Management Advisory",
        "/Subject": "Methoden-Überblick: Root-Cause-Analyse, analytisches Narrativ, "
                    "Narrative-to-Action und Narrative Feedback Cycle",
        "/Keywords": "Narrativ, Entscheidungsfindung, Execution Gap, Narrative-to-Action, "
                     "Narrative Feedback Cycle, IT-Management, evidenzbasiert",
        "/Creator": "NarraTec",
    })
    writer.write(OUT_PDF)


def render_pdf() -> str | None:
    """PDF erzeugen — bevorzugt ueber Playwright, sonst ueber einen Chromium-CLI."""
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        pass
    else:
        with sync_playwright() as pw:
            browser = pw.chromium.launch()
            page = browser.new_page()
            page.goto(OUT_HTML.as_uri(), wait_until="load")
            page.wait_for_timeout(400)          # Fonts/SVG sicher gerendert
            page.pdf(path=str(OUT_PDF), format="A4", print_background=True,
                     margin={"top": "0", "right": "0", "bottom": "0", "left": "0"},
                     prefer_css_page_size=True)
            browser.close()
        return "playwright/chromium"

    cli = find_browser()
    if not cli:
        return None
    # Achtung: --user-data-dir laesst manche Chromium-Derivate (u. a. Opera) haengen.
    subprocess.run(
        [cli, "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
         "--virtual-time-budget=10000", f"--print-to-pdf={OUT_PDF}", OUT_HTML.as_uri()],
        check=True, capture_output=True, timeout=120,
    )
    return Path(cli).name


if __name__ == "__main__":
    raise SystemExit(main())
