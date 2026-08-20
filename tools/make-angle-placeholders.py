#!/usr/bin/env python3
"""Create square placeholders for featured-product angle carousels.

Each file is named {slug}-angle-0N.png so production photos can replace them
one-for-one in images/source/. When a matching featured-{slug}.png exists, it
is used as the photo base. Neighbouring angles are cropped and tinted so the
carousel change is visible; no text is drawn on the image.

Run from the project root, then regenerate derivatives:

    python3 tools/make-angle-placeholders.py
    python3 tools/optimize-images.py
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance

ROOT = Path(__file__).resolve().parent.parent
SOURCE_DIR = ROOT / "images" / "source"
SIZE = 800

# (slug, angle count). Packages get six views; straps get five.
PRODUCTS = [
    ("elite-package-black-slides", 6),
    ("elite-package-white-slides", 6),
    ("element-edition-bundle", 6),
    ("element-edition-straps", 5),
    ("regular-straps", 5),
    ("roots", 5),
    ("flow", 5),
    ("fire", 5),
    ("breathe", 5),
    ("elite-package-black", 6),
]

TINTS = [
    (255, 255, 255, 0),
    (37, 99, 235, 36),
    (220, 38, 38, 32),
    (22, 163, 74, 32),
    (202, 138, 4, 36),
    (124, 58, 237, 36),
]


def square_from(source: Image.Image, angle: int) -> Image.Image:
    image = source.convert("RGB")
    width, height = image.size
    side = min(width, height)
    # Nudge the crop per angle so neighbouring slides are visibly different.
    shift = ((angle - 1) * 18) % max(side // 6, 1)
    if width >= height:
        left = min(max((width - side) // 2 + shift, 0), width - side)
        top = 0
    else:
        left = 0
        top = min(max((height - side) // 2 + shift, 0), height - side)
    cropped = image.crop((left, top, left + side, top + side))
    return cropped.resize((SIZE, SIZE), Image.LANCZOS)


def placeholder_base(angle: int) -> Image.Image:
    image = Image.new("RGB", (SIZE, SIZE), (243, 244, 246))
    draw = ImageDraw.Draw(image)
    inset = 48 + (angle * 10)
    draw.rounded_rectangle(
        (inset, inset, SIZE - inset, SIZE - inset),
        radius=12,
        outline=(156, 163, 175),
        width=2,
    )
    return image


def main() -> None:
    SOURCE_DIR.mkdir(parents=True, exist_ok=True)

    for slug, count in PRODUCTS:
        photo_path = SOURCE_DIR / f"featured-{slug}.png"
        photo = None
        if photo_path.exists():
            with Image.open(photo_path) as original:
                photo = original.convert("RGB")

        for angle in range(1, count + 1):
            stem = f"{slug}-angle-{angle:02d}"
            if photo is not None:
                frame = square_from(photo, angle)
                if angle > 1:
                    tint = TINTS[(angle - 1) % len(TINTS)]
                    wash = Image.new("RGBA", frame.size, tint)
                    frame = Image.alpha_composite(frame.convert("RGBA"), wash).convert("RGB")
                    frame = ImageEnhance.Contrast(frame).enhance(1.04)
            else:
                frame = placeholder_base(angle)

            out_path = SOURCE_DIR / f"{stem}.png"
            frame.save(out_path, "PNG")
            print(f"write {out_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
