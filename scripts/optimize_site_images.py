#!/usr/bin/env python3
"""One-time, loss-aware image optimization for the TYKAIRO-AI static website.

Pillow is the only dependency. Keep original PNG URLs working and create WebP
replacements; catalog pages use separate lightweight thumbnail variants.
This script is idempotent and is designed to run in GitHub Actions.
"""
from __future__ import annotations

import re
from pathlib import Path
from urllib.parse import quote, unquote
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"
CATALOGS = [ROOT / "index.html", ROOT / "projects" / "index.html"]
PNG_CONVERSIONS = [
    ASSETS / "user" / "AutoQA AI V5_ Website Inspection Studio.png",
    ASSETS / "user" / "TYKAIRO Product Factory V5.0.png",
]
MAX_FULL_WIDTH = 2048
MAX_THUMB_WIDTH = 920
MIN_SAVING = 0.10
savings = []
generated = set()


def converted_image(path: Path):
    with Image.open(path) as source:
        img = ImageOps.exif_transpose(source)
        img.load()
        img = img.convert("RGBA" if "A" in img.getbands() else "RGB")
        return img


def shrink(img, width: int):
    if img.width <= width:
        return img
    height = max(1, round(img.height * width / img.width))
    return img.resize((width, height), Image.Resampling.LANCZOS)


def save_webp(img, dest: Path, quality: int):
    dest.parent.mkdir(parents=True, exist_ok=True)
    staging = dest.with_suffix(".optimizing.webp")
    img.save(staging, "WEBP", quality=quality, method=6, exact=True)
    with Image.open(staging) as verify:
        verify.verify()
    return staging


def replace_png_references():
    for source in PNG_CONVERSIONS:
        if not source.is_file():
            raise RuntimeError(f"Missing product artwork: {source}")
        dest = source.with_suffix(".webp")
        image = shrink(converted_image(source), MAX_FULL_WIDTH)
        candidate = save_webp(image, dest, quality=83)
        candidate.replace(dest)
        generated.add(dest)
        savings.append((str(source.relative_to(ROOT)), source.stat().st_size, dest.stat().st_size))
        for page in ROOT.rglob("*.html"):
            original = page.read_text(encoding="utf-8")
            old_url = "/" + source.relative_to(ROOT).as_posix()
            new_url = "/" + dest.relative_to(ROOT).as_posix()
            changed = original.replace(old_url, new_url).replace(quote(old_url, safe="/"), quote(new_url, safe="/"))
            if changed != original:
                page.write_text(changed, encoding="utf-8")


IMG_TAG = re.compile(r"<img\b[^>]*>", re.I)
SRC = re.compile(r'(\bsrc=")([^"]+)(")', re.I)


def generate_catalog_thumbnails():
    for page in CATALOGS:
        html = page.read_text(encoding="utf-8")

        def rewrite_tag(match):
            tag = match.group(0)
            if not re.search(r'\bclass="[^"]*\bcatalog-photo\b', tag):
                return tag
            found = SRC.search(tag)
            if not found:
                return tag
            url = found.group(2)
            if not url.startswith("/") or not url.lower().endswith(".webp"):
                return tag
            src = ROOT / unquote(url.lstrip("/"))
            if not src.exists() or src.name.endswith("-thumb.webp"):
                return tag
            dest = src.with_name(src.stem + "-thumb.webp")
            if dest not in generated:
                img = shrink(converted_image(src), MAX_THUMB_WIDTH)
                candidate = save_webp(img, dest, quality=74)
                if candidate.stat().st_size < src.stat().st_size * (1 - MIN_SAVING):
                    candidate.replace(dest)
                    generated.add(dest)
                    savings.append((str(src.relative_to(ROOT)) + " [thumbnail]", src.stat().st_size, dest.stat().st_size))
                else:
                    candidate.unlink()
                    return tag
            new_url = "/" + quote(dest.relative_to(ROOT).as_posix(), safe="/")
            return tag[:found.start(2)] + new_url + tag[found.end(2):]

        updated = IMG_TAG.sub(rewrite_tag, html)
        if updated != html:
            page.write_text(updated, encoding="utf-8")


def recompress_other_webps():
    for src in sorted(ASSETS.rglob("*.webp")):
        if src in generated or src.name.endswith("-thumb.webp") or src.stat().st_size < 75_000:
            continue
        before = src.stat().st_size
        try:
            img = shrink(converted_image(src), MAX_FULL_WIDTH)
            candidate = save_webp(img, src, quality=81)
            after = candidate.stat().st_size
            if after <= before * (1 - MIN_SAVING):
                candidate.replace(src)
                savings.append((str(src.relative_to(ROOT)), before, after))
            else:
                candidate.unlink()
        except (OSError, ValueError) as exc:
            print(f"Skipping {src}: {exc}")


def main():
    replace_png_references()
    generate_catalog_thumbnails()
    recompress_other_webps()
    print(f"Optimized {len(savings)} images / thumbnail variants")
    for label, before, after in savings:
        print(f"  {before/1024:7.1f} -> {after/1024:7.1f} KiB : {label}")
    print(f"Total bytes saved in optimized targets: {sum(b-a for _,b,a in savings):,}")
    for page in CATALOGS:
        text = page.read_text(encoding="utf-8")
        for original in PNG_CONVERSIONS:
            encoded = quote("/" + original.relative_to(ROOT).as_posix(), safe="/")
            if encoded in text:
                raise RuntimeError(f"Unconverted artwork URL remains in {page}: {encoded}")


if __name__ == "__main__":
    main()
