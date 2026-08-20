#!/usr/bin/env python3
"""Generate responsive WebP and JPEG derivatives from the originals in images/source/.

Run from the project root:

    python3 tools/optimize-images.py

Each entry below declares a target aspect ratio and the widths referenced by the
srcset attributes in index.html. Sources are centre-cropped to the ratio first so
the framing is baked into the file and does not depend on object-fit.
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SOURCE_DIR = ROOT / "images" / "source"
OUTPUT_DIR = ROOT / "images"

WEBP_QUALITY = 72
JPEG_QUALITY = 78

# name: (aspect ratio as width/height, output widths)
# The hero carousel is art directed: each slide has a landscape crop for wide
# viewports and a 9:16 crop for portrait ones.
TARGETS = {
    "hero-slide-1": (16 / 9, [1536, 1024, 768]),
    "hero-slide-2": (16 / 9, [1536, 1024, 768]),
    "hero-slide-3": (16 / 9, [1536, 1024, 768]),
    "hero-slide-1-portrait": (9 / 16, [864, 576]),
    "hero-slide-2-portrait": (9 / 16, [864, 576]),
    "hero-slide-3-portrait": (9 / 16, [864, 576]),
    # v1.3 merchandising sections. Names deliberately describe each placement
    # so production photography can replace the source files one-for-one.
    "duo-flip-flops": (4 / 3, [1200, 768]),
    "duo-slides": (4 / 3, [1200, 768]),
    "category-for-her": (3 / 4, [800, 480]),
    "category-bestsellers": (3 / 4, [800, 480]),
    "category-for-him": (3 / 4, [800, 480]),
    # v1.4 featured products. Square source names mirror the product config in
    # script.js, making production image swaps explicit and one-for-one.
    "featured-elite-package-black-slides": (1 / 1, [800, 480]),
    "featured-elite-package-white-slides": (1 / 1, [800, 480]),
    "featured-element-edition-bundle": (1 / 1, [800, 480]),
    "featured-element-edition-straps": (1 / 1, [800, 480]),
    "featured-regular-straps": (1 / 1, [800, 480]),
    "featured-roots": (1 / 1, [800, 480]),
    # v1.5 featured products and interactive story timeline.
    "featured-flow": (1 / 1, [800, 480]),
    "featured-fire": (1 / 1, [800, 480]),
    "featured-breathe": (1 / 1, [800, 480]),
    "featured-elite-package-black": (1 / 1, [800, 480]),
    "story-01": (4 / 3, [1024, 640]),
    "story-02": (4 / 3, [1024, 640]),
    "story-03": (4 / 3, [1024, 640]),
    "story-04": (4 / 3, [1024, 640]),
    "story-05": (4 / 3, [1024, 640]),
    "story-1": (4 / 3, [1024, 640]),
    "story-2": (4 / 3, [1024, 640]),
    "product-1": (1 / 1, [800, 480]),
    "product-2": (1 / 1, [800, 480]),
    "product-3": (1 / 1, [800, 480]),
    "category-men": (4 / 3, [1152, 640]),
    "category-women": (4 / 3, [1152, 640]),
    "category-kids": (4 / 3, [1152, 640]),
    "category-collections": (4 / 3, [1152, 640]),
    # v2.2 How It Works. Square crops; production photos replace these
    # source names one-for-one.
    "how-it-works-base": (1 / 1, [800, 480]),
    "how-it-works-straps": (1 / 1, [800, 480]),
    "how-it-works-style": (1 / 1, [800, 480]),
    # v2.3 Why Click Clocks Are Different. Landscape crops for the left
    # split panel; production photos replace these source names one-for-one.
    "why-durable": (4 / 3, [1200, 768]),
    "why-variety": (4 / 3, [1200, 768]),
    "why-eco": (4 / 3, [1200, 768]),
    "why-impact": (4 / 3, [1200, 768]),
    "why-change": (4 / 3, [1200, 768]),
    # v2.11 Journal. 4:3 crops; production photos replace these source
    # names one-for-one. Widths cover featured, cards, and article heroes.
    "blog-five-ways": (4 / 3, [1600, 1200, 768]),
    "blog-old-soles": (4 / 3, [1600, 1200, 768]),
    "blog-prototype": (4 / 3, [1600, 1200, 768]),
    "blog-swap-guide": (4 / 3, [1600, 1200, 768]),
    "blog-packing": (4 / 3, [1600, 1200, 768]),
    "blog-element-edition": (4 / 3, [1600, 1200, 768]),
    "blog-ocean-plastic": (4 / 3, [1600, 1200, 768]),
    "blog-strap-care": (4 / 3, [1600, 1200, 768]),
    "blog-base-choice": (4 / 3, [1600, 1200, 768]),
}

# v1.7 per-card angle placeholders. Names are the swap contract:
# {slug}-angle-01.png through {slug}-angle-05.png (or 06).
for angle_source in sorted(SOURCE_DIR.glob("*-angle-*.png")):
    TARGETS[angle_source.stem] = (1 / 1, [800, 480])


def centre_crop(image: Image.Image, ratio: float) -> Image.Image:
    width, height = image.size
    if width / height > ratio:
        new_width = round(height * ratio)
        left = (width - new_width) // 2
        return image.crop((left, 0, left + new_width, height))
    new_height = round(width / ratio)
    top = (height - new_height) // 2
    return image.crop((0, top, width, top + new_height))


def main() -> None:
    if not SOURCE_DIR.is_dir():
        raise SystemExit(f"No source directory at {SOURCE_DIR}")

    total_bytes = 0
    for name, (ratio, widths) in TARGETS.items():
        source_path = SOURCE_DIR / f"{name}.png"
        if not source_path.exists():
            print(f"skip  {name}: missing {source_path.relative_to(ROOT)}")
            continue

        with Image.open(source_path) as original:
            cropped = centre_crop(original.convert("RGB"), ratio)

            for width in widths:
                height = round(width / ratio)
                resized = cropped.resize((width, height), Image.LANCZOS)

                webp_path = OUTPUT_DIR / f"{name}-{width}.webp"
                resized.save(webp_path, "WEBP", quality=WEBP_QUALITY, method=6)

                jpeg_path = OUTPUT_DIR / f"{name}-{width}.jpg"
                resized.save(
                    jpeg_path,
                    "JPEG",
                    quality=JPEG_QUALITY,
                    optimize=True,
                    progressive=True,
                )

                sizes = webp_path.stat().st_size + jpeg_path.stat().st_size
                total_bytes += sizes
                print(
                    f"write {name}-{width}: {width}x{height} "
                    f"webp {webp_path.stat().st_size // 1024}kB, "
                    f"jpg {jpeg_path.stat().st_size // 1024}kB"
                )

    print(f"\ntotal output: {total_bytes / 1_048_576:.1f} MB")


if __name__ == "__main__":
    main()
