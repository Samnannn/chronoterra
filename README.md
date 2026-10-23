# CHRONOTERRA — The Time Traveler's Tourism Board

An original, fictional tourism-board website for the **Autumn of Code 24-hour Website Design Competition**
(prompt: *Time Traveler's Tourism Board*).

> *"Some places are worth travelling centuries for."*

**Participants:** Samnan · Mohammad Shadab

**Live site:** https://samnannn.github.io/chronoterra/

## Run it

It is plain HTML, CSS and JavaScript. There is **no install and no build step** to view the site.

**Option A — open the file.** Double-click `index.html`. Everything uses relative paths and works from `file://`.

**Option B — local server** (recommended for judging; needs Node 18+ or Python 3):

```bash
# from this folder
npx serve .            # or:
python -m http.server 8080   # then visit http://localhost:8080
```

Optional: `node tools/build.mjs` regenerates the HTML pages and `assets/js/data.js` from the content in
`tools/content.mjs` (Node 18+, no dependencies). The generated files are already included in this folder.

## What is in it

| Page | File |
| --- | --- |
| Homepage | `index.html` |
| Destinations / Eras (6 expeditions, filters) | `destinations.html` |
| Destination detail ×6 (data-driven) | `destination-<id>.html` |
| Travel Advisories | `advisories.html` |
| Booking (prototype) | `booking.html` |
| Field Journal + 5 articles | `journal.html`, `journal-<id>.html` |
| Packing List (interactive) | `packing.html` |
| Paradox FAQ (searchable) | `faq.html` |
| Credits | `credits.html`, `CREDITS.md` |

## Concept & art direction

CHRONOTERRA is an independent-travel-magazine meets cultural-institution meets sci-fi film. The palette is the
brief's (midnight ink, warm parchment, antique gold, muted olive, oxidised burgundy, soft charcoal), set in
**Instrument Serif** (headlines), **Hanken Grotesk** (body) and **IBM Plex Mono** (coordinates and metadata).

Bespoke motifs: expedition **stamps**, a rotating **temporal portal** (astrolabe-like ring) in the hero, a
**non-linear timeline ruler** and live **coordinate / drift / clock rail**, **ticket-notch** CTAs, a five-class
**temporal-risk** system, **hazard-stripe** advisory notices, and a **boarding-pass** confirmation.

The hero is a composite artwork (a Fatehpur Sikri palace under the Milky Way, with a futuristic tree-structure
rising behind it), built from open-licensed photographs. See `CREDITS.md`.

### Honesty about fact and fiction
Every destination carries a label: **Historical reconstruction**, **Speculative future**, **Alternate-timeline
fiction** or **Deep-time speculation**. Each detail page has a *"What we know / What we imagine"* panel, and every
photograph is captioned as a present-day stand-in. Advisories, diaries and prices are fictional (currency: **TC**,
Time Credits). **No real booking, payment, backend or personal data exists anywhere.**

## Interactions

Responsive nav with "Traveller's Kit" menu and full-screen mobile menu · hero ticker & live clock · route-finder
timeline · destination filters (kind × era) · booking form (validation, per-destination durations, live itemised
costs, sample packages, mobile sticky summary, boarding-pass confirmation, edit/reset) · accordions · pre-departure
and packing checklists with progress (saved in `localStorage`) · FAQ search / expand-all · back-to-top ·
reduced-motion support · visible keyboard focus · skip link.

## Tech notes

- Static site; ~46 optimised JPEGs (900 px / 1800 px `srcset`), self-hosted `woff2` fonts, no CDN, no framework.
- Layout verified at 1440, 1280, 768 and 390 px with no horizontal overflow (see "Testing" below).
- Source of truth for content: `tools/content.mjs`. Components: `tools/lib.mjs`. Pages: `tools/pages*.mjs`.
- CSS is split by concern: `base.css`, `components.css`, `home.css`, `destinations.css`, `pages.css`.

## Testing performed

Automated (headless Edge via Playwright): every page loaded at 1440 / 1280 / 768 / 390 px with no console errors,
no failed requests and no horizontal scroll; all internal links, anchors, `srcset` files and image alt text
validated; one `<h1>` per page with no heading-level skips; the booking flow exercised end to end (validation,
duration limits, cost arithmetic, confirmation, edit, reset, packages, URL pre-selection).
Visual review of screenshots for every page at desktop and mobile.
Not tested: Safari/Firefox, real touch devices, screen readers.
