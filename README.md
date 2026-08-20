# Click Clocks — Web Build

**Quick Connect Footwear, LLC**
Private repository — internal use only.

---

## Live Preview

> Enable GitHub Pages: Settings → Pages → Deploy from branch → `main` → `/ (root)`
> Your URL will appear as: `https://{your-username}.github.io/{repo-name}`

Local preview (any static server):

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

---

## Project Overview

This repo contains the full frontend build for the Click Clocks website —
a customizable footwear brand offering flip-flops with interchangeable straps
and slides with replaceable sliders.

The site is built iteratively in versioned increments (v1.1 → current),
each as its own commit. The version history in this repo reflects the full
development progression.

**Stack:** HTML · CSS · Vanilla JS (no framework dependency)
**Design tool:** Cursor AI
**Asset status:** Stock/placeholder images throughout — real product assets
to be swapped in before launch.

---

## Build Status

| Version | Feature | Status |
|---|---|---|
| v1.1 | Hero carousel, transparent header, announcement bar | ✅ Done |
| v1.2 | Header icon spacing fix, dark overlay fix, hover-pause fix, per-slide text | ✅ Done |
| v1.3 | Product duo panels, Shop by Category section | ✅ Done |
| v1.4 | Featured products carousel (10 products, 5 shown), real product data | ✅ Done |
| v1.5 | Full-width fix, arrow repositioning, How It Works groundwork, Our Story groundwork | ✅ Done |
| v1.6 | Full-width spans, arrow centering, Our Story up/down buttons, section cleanup | ✅ Done |
| v1.7 | Section headers centered, per-card image carousel, dot indicators | ✅ Done |
| v1.8 | Dot indicator restyle, placeholder label removal | ✅ Done |
| v1.9 | Line below dots removed, Our Story image label fix, hero grey overlay in half-view | ✅ Done |
| v2.0 | Men's hamburger nav, collection landing page, filter bar | ✅ Done |
| v2.1 | Bootstrap removal, filter dropdowns rebuilt, collection card styling | ✅ Done |
| v2.2 | How It Works section (3-step, full-width, stock images) | ✅ Done |
| v2.3 | Why Click Clocks Are Different carousel (5 slides, split-panel) | ✅ Done |
| v2.4 | How It Works full-view span, Our Story timeline animation, perpetual loop | ✅ Done |
| v2.5 | Footer (4 columns, newsletter, social, payment icons, bottom bar) | ✅ Done |
| v2.6 | Our Story standalone page, legal pages, blog index + articles | ✅ Done |
| v2.7 | Women's nav flow (mirrors Men's) | 🔲 Planned |
| v2.8 | Individual product pages | 🔲 Planned |
| v2.9 | Real product asset swap (images, CDN) | 🔲 Planned |
| v3.0 | Backend wiring — cart, checkout, filter logic | 🔲 Planned |

---

## Repo Structure

```
.
├── README.md
├── index.html                  Homepage
├── styles.css                  Design tokens and all page styles
├── catalog.js                  Shared data, cards, footer, collection + blog + story pages
├── script.js                   Homepage: announcement, header, carousels
├── logo.svg                    Placeholder wordmark
├── vercel.json                 Optional Vercel rewrite config
├── images/                     Optimized WebP and JPEG derivatives that ship
│   └── source/                 Full-size originals (hero, products, categories,
│                               how-it-works, why-*, story-*, blog-*)
├── pages/
│   ├── our-story/              Standalone Our Story page
│   ├── blog/                   Journal index
│   ├── privacy-policy/
│   ├── privacy-request/
│   ├── terms-of-use/
│   ├── ca-privacy/             California residents notice
│   └── accessibility/
├── collections/
│   ├── flip-flops/
│   ├── slides/
│   ├── straps/
│   ├── bundles/
│   ├── new-arrivals/
│   ├── best-sellers/
│   ├── element-edition/
│   ├── elite-packages/
│   ├── collab-drop-01/
│   └── collab-drop-02/
├── blog/
│   └── {slug}/                 Article pages (one folder per post)
└── tools/
    ├── make-angle-placeholders.py
    └── optimize-images.py      Regenerates images/ from images/source/
```

Routes use folder `index.html` files so paths stay clean
(`/pages/our-story`, `/blog/five-ways-one-base/`, `/collections/slides/`).

---

## Commit Convention

One version per commit. Format:

```
feat: v1.4 featured products carousel with real product data
fix: v1.9 remove grey overlay on hero in half-view
```

This keeps the commit log readable as a changelog for stakeholders
reviewing progress in GitHub.

---

## Setting Up GitHub Pages (Private Repo)

1. Push all files to the `main` branch
2. Go to **Settings → Pages**
3. Under "Build and deployment," set:
   - Source: **Deploy from a branch**
   - Branch: `main` / `/ (root)`
4. Click **Save**
5. Wait ~60 seconds, then refresh — your Pages URL will appear
6. Share that URL with stakeholders — they can view the live site
   without needing a GitHub account

> Note: GitHub Pages on private repos requires a GitHub Free account
> or higher. The live URL is publicly accessible even on a private repo —
> do not push any sensitive credentials or private data to the codebase.

---

## Inviting Stakeholders as Collaborators

To give bosses read-only access to the repo itself (not just the live URL):

1. **Settings → Collaborators → Add people**
2. Enter their GitHub username or email
3. Set role to **Read** — they can view code and commit history,
   not push changes

---

## Asset Swap Checklist (pre-launch)

- [ ] Hero carousel — real model photos
- [ ] Product cards — real product images, all angles (`slug-angle-01` naming)
- [ ] Shop by Category — real model shots (her, him, lifestyle)
- [ ] How It Works — real product/lifestyle shots per step
- [ ] Why Click Clocks — real lifestyle/sustainability shots per slide
- [ ] Our Story — real milestone images (`story-01` through `story-05`)
- [ ] Blog — real article hero images (`blog-*` stems in `images/source/`)
- [ ] Logo — replace `logo.svg` placeholder with final asset
- [ ] Social links — replace placeholder URLs with real handles
- [ ] Contact info — fill in mailing address, phone, privacy email
- [ ] Legal pages — counsel review before publish

---

## Contact

Built by Mahathir — Quick Connect Footwear, LLC
