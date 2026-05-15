# SEO Audit — washcalc.app

**Audit date:** 2026-05-15
**Scope:** Read-only audit. No code has been changed. Phase 2 fixes pend approval.
**Verified URLs (live, served as Googlebot):**
`/`, `/calculator`, `/calculators/{driveway,roof,house-washing,deck}`, `/pressure-washing-pricing-guide`.

---

## Summary (ranked by impact)

1. **Calculator pages are too thin and almost identical to each other.** Every `/calculators/*` page renders the same H2/H3 outline (How this price is calculated → Rate-based / Cost-plus / Recommended → Factors → FAQ → Related). Only the H1, intro paragraph, and 2–3 FAQ items differ. Per-page unique body text is ~390–410 words, of which ~250 are repeated boilerplate. Google's classifier sees a near-duplicate template, which caps how high any of them can rank.
2. **FAQ answers are not in the prerendered HTML** — only the first item's answer is rendered; closed accordion answers are absent from the SSR output. Googlebot rendering may eventually pick them up via hydration, but indexing-time HTML shows 5 questions and only 1 answer on the homepage, 2 questions and 1 answer on each calculator page. That's the easiest content depth win on the site.
3. **JSON-LD coverage is wrong/duplicated.** Every prerendered page ships an identical `WebApplication` schema pointing at the homepage URL. `FAQPage` and `BreadcrumbList` are injected client-side via `useEffect` and are absent from the served HTML. No `SoftwareApplication`/`HowTo`/`Calculator`-flavored markup on the calculator pages.
4. **The homepage title doesn't match the H1's framing.** Title is "WashCalc — Pressure Washing Cost Calculator & Quoting Tool" (good keywords), H1 is "Quote pressure washing jobs in seconds — and protect your profit." (zero keyword overlap with the search). Title is also 62 chars — slightly over the 60-char snippet limit.
5. **`/calculators/house-washing` underperforms its meta because the snippet is too generic.** Description "Estimate house washing cost. Vinyl, brick or stucco — get recommended price, labor time and profit." reads like a description-of-a-tool, not an answer to the searcher's question. Add a number ("$0.25–$0.35/sq ft, ~$250–$700 per home") and "Free" — both raise CTR.
6. **Homepage doesn't link to two of its own calculator pages with descriptive anchors.** The "Popular Calculators" 3-card section links only to `/calculator`, `/calculators/deck`, `/calculators/roof` — **`/calculators/driveway` and `/calculators/house-washing` are missing.** They're only reachable from the homepage via the nav (anchor "House", "Driveway") and via the bottom "Specialized calculators" tiles. PageRank distribution to those two pages is artificially weak.
7. **`exclude` filter on `RelatedTools` is broken.** `src/pages/CalculatorPage.jsx:141` does `canonical.replace("https://washcalc.app", "")` but canonicals all use `https://www.washcalc.app`. Result: the current page is always present in its own "Related calculators" panel — self-referential noise on every page.
8. **Pricing guide doesn't link to `/calculators/driveway` or `/calculators/house-washing`.** It links to the all-surface tool, deck, and roof — but driveway and house-washing get no internal link from the longest-form content on the site. Both are the highest-volume residential queries.
9. **No `lastmod` on sitemap entries.** Google uses lastmod for crawl prioritization; entries currently only declare `changefreq` + `priority`, which Google largely ignores.
10. **`<script type="module">` is in `<head>` instead of `<body>` end, but it's fine.** Modules defer by default. JS bundle is ~207 KB — acceptable. No images at all (emoji + SVG favicon), so image-heavy LCP issues don't exist on this site.

The single highest-leverage move: differentiate the calculator pages with surface-specific body content (300–500 unique words below the calculator) and ship per-page `FAQPage` + `BreadcrumbList` JSON-LD in the prerendered HTML.

---

## Findings by category

### 1. Rendering & indexability

- **Stack:** Vite + React (`react@18`, `react-router-dom@6`), built with `vite build` (client) + `vite build --ssr` (server entry), then a custom Node script (`prerender.js`) walks a hard-coded route list, runs `renderToString(<StaticRouter location={url}>)`, and writes per-route `dist/<path>/index.html`. Vercel serves `dist/` as static.
- **Effective rendering mode: SSG (build-time prerender) with client hydration.** Googlebot sees full HTML for every route in the route table. Confirmed by fetching `/` and `/calculators/house-washing` with `User-Agent: Googlebot/2.1` — both returned 200 with full DOM, H1, body content, breadcrumbs.
- **No CSR fallback risk for the published routes.** Any path not in `prerender.js`'s route list falls through to `dist/404.html` (Vercel `vercel.json` line 10) with HTTP 404 — confirmed live.
- **Non-www → www:** apex `https://washcalc.app/` returns HTTP 307 → `https://www.washcalc.app/` (Vercel default). Not 301, but search engines treat 307 similarly enough that this isn't urgent.
- **Trailing slash:** `/calculators/house-washing/` returns HTTP 308 → `/calculators/house-washing`. Consistent and crawlable.
- **Short-form alias redirects:** `/house-washing`, `/driveway`, `/roof`, `/deck` all 301 to their `/calculators/*` canonical (per `vercel.json`).

### 2. robots.txt / sitemap

- **`robots.txt`:**
  ```
  User-agent: *
  Allow: /
  Sitemap: https://www.washcalc.app/sitemap.xml
  ```
  Clean. Allows everything; declares sitemap. No `Disallow`. Fine.
- **`sitemap.xml`** covers all 7 published routes (`/`, `/calculator`, 4 × `/calculators/*`, `/pressure-washing-pricing-guide`). Missing `<lastmod>` on every entry — minor crawl-prioritization gap.
- **No `noindex` on indexable pages.** `noindex` is only set on `/404-page` (output to `dist/404.html`) — correct.

### 3. On-page SEO (per page)

| Page | Title (chars) | Meta desc (chars) | H1 | Heading count | Approx text words | FAQ? | JSON-LD in HTML |
|---|---|---|---|---|---|---|---|
| `/` | "WashCalc — Pressure Washing Cost Calculator & Quoting Tool" **(62)** ⚠ | "Pressure washing pricing calculator for faster, more profitable quotes." (72) | "Quote pressure washing jobs in seconds — and protect your profit." | 1×H1, 5×H2, 10×H3 | ~549 | 5 Q / **1 A in HTML** ⚠ | `WebApplication` only |
| `/calculator` | "Pressure Washing Cost Calculator — WashCalc" (44) | (132) ✅ | "Pressure Washing Cost Calculator" | 1×H1, 4×H2, 4×H3 | ~409 | 3 Q / **1 A in HTML** ⚠ | `WebApplication` only (canonical wrong) |
| `/calculators/driveway` | "Driveway Cleaning Cost Calculator — WashCalc" (45) | "Estimate driveway cleaning price per square foot. Get recommended price, labor time and gross profit instantly." (113) | "Driveway Cleaning Cost Calculator" | 1×H1, 4×H2, 4×H3 | ~406 | 3 Q / **1 A in HTML** ⚠ | `WebApplication` only (canonical wrong) |
| `/calculators/roof` | "Roof Cleaning Cost Calculator — WashCalc" (41) | "Soft-wash roof cleaning calculator. Estimate price, labor time and profit per square foot." (90) | "Roof Cleaning Cost Calculator" | 1×H1, 4×H2, 4×H3 | ~386 | 2 Q / **1 A in HTML** ⚠ | `WebApplication` only (canonical wrong) |
| `/calculators/house-washing` | "House Washing Cost Calculator — WashCalc" (41) | "Estimate house washing cost. Vinyl, brick or stucco — get recommended price, labor time and profit." (99) | "House Washing Cost Calculator" | 1×H1, 4×H2, 4×H3 | ~393 | 2 Q / **1 A in HTML** ⚠ | `WebApplication` only (canonical wrong) |
| `/calculators/deck` | "Deck Cleaning Cost Calculator — WashCalc" (41) | "Wood and composite deck cleaning calculator. Estimate price, labor time and profit per square foot." (100) | "Deck Cleaning Cost Calculator" | 1×H1, 4×H2, 4×H3 | ~389 | 2 Q / **1 A in HTML** ⚠ | `WebApplication` only (canonical wrong) |
| `/pressure-washing-pricing-guide` | "Pressure Washing Pricing Guide (2026) — WashCalc" (49) | "How to price pressure washing jobs in 2026. Average cost per square foot, pricing by surface (deck, roof, driveway), labor and chemical costs, plus common mistakes to avoid." (172) ⚠ | "Pressure Washing Pricing Guide (2026)" | 1×H1, 5×H2, 4×H3 | ~1,351 ✅ | none | `WebApplication` only (canonical wrong) |

Issues flagged:

- **Homepage title (62 chars)** is slightly truncated in Google's SERP (~60-char snippet). Drop "& Quoting Tool" → "WashCalc — Free Pressure Washing Cost Calculator" (50 chars).
- **Homepage H1 ≠ title intent.** Title targets "pressure washing cost calculator," H1 reads as a marketing tagline with no keyword. Add the keyword to the H1 ("Pressure Washing Cost Calculator — quote any job in seconds") and keep the tagline as the H1 subhead.
- **Pricing guide meta description (172 chars)** will be truncated. Trim to ~155.
- **`/calculators/house-washing` title is competent but the meta description is the weakest of the four.** It promises "estimate" but no price anchor. The 172 impressions / 0 clicks at avg position ~61 tells me the snippet *and* the position both work against it. Position is the biggest factor at rank 61, but the meta is a free CTR win once it ranks better. Suggested rewrite (146 chars): "Free house washing cost calculator. Estimate $/sq ft, total price, labor hours and profit for vinyl, stucco or brick siding — in under a minute."
- **All 4 calculator pages have the same body shell.** Each renders the H2 "How this price is calculated" → three cards labeled "Rate-based price" / "Cost-plus price" / "The recommended price" → H2 "Factors that affect job price" with the same three cards. That boilerplate accounts for roughly ~250 of the ~400 words on each page. Per-page unique content is just the H1, intro line, FAQs (2 Q each), and a per-surface defaults preview — well under the ~300 unique words threshold I'd expect for a query like "house washing cost calculator."

### 4. Structured data

What ships in the prerendered HTML today (per page):

```json
{ "@type": "WebApplication", "url": "https://www.washcalc.app/", ... }
```

What's missing from the prerendered HTML on calculator pages:

- **`SoftwareApplication`** (or per-page `WebApplication` with the *correct* per-page URL — right now every calculator page points to the homepage URL).
- **`BreadcrumbList`** — the visible breadcrumb nav exists in HTML, but the JSON-LD version is only injected client-side via `useSEO` (`src/useSEO.js:36`).
- **`FAQPage`** — injected client-side from `src/components/FAQ.jsx:6`, not in the served HTML. This is the highest-impact missing schema for the calculator pages.
- **`Article` / `BlogPosting`** on `/pressure-washing-pricing-guide` — a 1,350-word evergreen guide with no article markup.
- **Optional but useful:** `HowTo` markup for the "How this price is calculated" three-step section.

### 5. Internal linking

- **Homepage links to:** `/calculator` (multiple times), `/calculators/deck`, `/calculators/roof` (via "Popular Calculators" cards), then all four calculators via "Specialized calculators" tiles and nav menu, and the footer. **`/calculators/driveway` and `/calculators/house-washing` are NOT in the top "Popular Calculators" section.** That section is the strongest above-the-fold internal link on the site.
- **No link from homepage to `/pressure-washing-pricing-guide`.** The site's longest, deepest piece of content has zero discovery path from the front door.
- **Calculator pages link to each other** via the `RelatedTools` panel and the nav. Anchor text is descriptive ("Driveway Cleaning Calculator", "Roof Cleaning Calculator") — good.
- **Calculator pages link to the pricing guide** ("Learn how to price jobs" — `src/pages/CalculatorPage.jsx:149`). Anchor text is OK; could be improved ("pressure washing pricing guide").
- **Pricing guide links out to `/calculator`, `/calculators/deck`, `/calculators/roof` — but not `/calculators/driveway` or `/calculators/house-washing`.** Same gap as homepage.
- **Header nav anchor text is weak.** The 4 calculator links use `Driveway`, `Roof`, `House`, `Deck` — just the surface name. Either widen ("House Washing", "Driveway Cleaning") or treat the nav as functional and rely on the body-content anchors for keyword signal.
- **`RelatedTools` `exclude` filter is broken.** `src/pages/CalculatorPage.jsx:141` strips `https://washcalc.app` from the canonical, but canonicals use the `www.` prefix. The filter never matches → the current page always self-links inside its own "Related calculators" tiles.
- **No orphan pages.** Every route in `App.jsx`'s `<Routes>` is in the sitemap and reachable from the nav/footer.

### 6. Technical

- **Core Web Vitals (heuristic, not measured):**
  - LCP: hero is mostly text + 1 styled card; no large images. Likely <1.5s on a fast connection. Fine.
  - CLS: hero is a fixed grid; the calculator results card uses static numeric values pre-hydration → no layout shift expected. Fine.
  - INP: the calculator's `useMemo(() => calculateQuote(values), [values])` recomputes on each input — trivial work. Fine.
- **JS bundle:** `dist/assets/index-CsKobAdq.js` is 207 KB minified (the only bundle). Reasonable for React 18 + react-router + the app. No code-splitting on routes — entire app loads on every page — but with this footprint that's not a real problem.
- **Render-blocking scripts:** GA `gtag.js` is `async`. The app entry is `<script type="module" crossorigin>` — module scripts defer by default. No render-blocking JS in head.
- **Images:** there are literally no `<img>` tags on the prerendered HTML for any audited page. Visual interest comes from emoji + the SVG favicon. So: no alt-text issues, no format-conversion issues, no width/height-attribute issues. (Worth considering 1–2 relevant illustrative images per calculator page for visual interest + a small extra keyword signal in alt text — separate decision.)
- **URL consistency:** all lowercase, hyphenated, no trailing slash, redirects handle all the obvious variants. ✅
- **Redirect chains:** none observed (single-hop redirects on all aliases tested).
- **`<html lang="en">`:** present. ✅
- **`<meta name="viewport">`:** present. ✅

---

## Proposed fixes

Each fix is labeled **Impact** (High/Med/Low) and **Effort** (S/M/L). High/S fixes go first.

### A. Titles & meta descriptions

| # | Fix | Files | Impact | Effort |
|---|---|---|---|---|
| A1 | Trim homepage title to 50 chars; align with H1's keyword intent. New: `"Free Pressure Washing Cost Calculator — WashCalc"`. | `prerender.js:10`, `index.html:7`, `src/pages/Landing.jsx:32` | High | S |
| A2 | Rewrite homepage H1 to lead with the keyword. New: `"Free Pressure Washing Cost Calculator"`, keep the current tagline as a subhead `<p class="lead">`. | `src/components/Hero.jsx:11` | High | S |
| A3 | Rewrite `/calculators/house-washing` meta description to include a price anchor (this is the page with 172 impressions / 0 clicks). New: `"Free house washing cost calculator. Estimate $/sq ft, total price, labor hours and profit for vinyl, stucco or brick siding — in under a minute."` (146 chars) | `prerender.js:36`, `src/pages/variants.js:54` | High | S |
| A4 | Add a price anchor to each of the other 3 calculator pages' meta descriptions (e.g. driveway: "...$0.20–$0.25/sq ft, $160–$250 per driveway..."). | `prerender.js:23,29,42`, `src/pages/variants.js:7,32,76` | High | S |
| A5 | Trim pricing-guide meta description to ~155 chars. | `prerender.js:47`, `src/pages/PricingGuide.jsx:7` | Med | S |
| A6 | The two title/meta sources (`prerender.js` ROUTES table and `src/pages/*` `useSEO` calls / `src/pages/variants.js`) duplicate every string. Pick one source of truth (recommend `src/pages/variants.js` + a lightweight registry that `prerender.js` imports) so per-page metadata can't drift. | `prerender.js`, `src/pages/*`, `src/pages/variants.js` | Med | M |

### B. Structured data

| # | Fix | Files | Impact | Effort |
|---|---|---|---|---|
| B1 | Inject per-page `BreadcrumbList` JSON-LD in the **prerendered** HTML (not client-side). Easiest path: extend `prerender.js`'s `perPageHead()` to emit a `<script type="application/ld+json">` from each route's `breadcrumb` array. | `prerender.js`, `src/pages/variants.js` | High | S |
| B2 | Inject per-page `FAQPage` JSON-LD in the prerendered HTML for each calculator page and the homepage. Source the FAQ data from a shared module that both the React `<FAQ>` component and `prerender.js` import — so questions/answers can't drift. | `prerender.js`, `src/pages/Landing.jsx`, `src/pages/variants.js`, `src/pages/CalculatorPage.jsx` | High | M |
| B3 | Replace the duplicated `WebApplication` block on calculator pages with a per-page `SoftwareApplication` schema (or use `WebApplication` with the *correct* per-page `url`, `name`, and `description`). Today every calculator page declares `url: https://www.washcalc.app/` which is wrong. | `index.html` (or move JSON-LD out of the shell and emit per-page from `prerender.js`) | Med | S |
| B4 | Add `Article` schema to `/pressure-washing-pricing-guide` (datePublished, author "WashCalc", headline, image). | `prerender.js` (extend ROUTES entry) | Med | S |

### C. FAQ rendering

| # | Fix | Files | Impact | Effort |
|---|---|---|---|---|
| C1 | Render all FAQ answers in the HTML (don't gate on accordion `open` state). Either initialize `open=null` and always render `.wc-faq-a` with `hidden`/`aria-hidden`, or render the answer always and use CSS `max-height` to collapse it visually. Google's seen 1 of 5 answers; this unlocks the other 4 at indexing time. | `src/components/FAQ.jsx` | High | S |
| C2 | Expand the per-calculator FAQ from 2 questions to 5–6 questions each, with answers in the 60–120 word range. Use real long-tail keywords ("how often should I wash my house", "soft wash vs pressure wash siding", "house washing cost for two-story home", etc.). Worth doing per surface — biggest unique-content win. | `src/pages/variants.js` | High | M (content) |

### D. Per-page content depth

| # | Fix | Files | Impact | Effort |
|---|---|---|---|---|
| D1 | Add a 300–500-word per-surface body section between the calculator and the "How this price is calculated" boilerplate. Topics that differ across surfaces: typical job size, equipment, chemical mix, time per sq ft, common upsells, regional variation. This is the single biggest move to break the calculator pages out of "near-duplicate template" territory. | `src/pages/variants.js` (new `body` field), `src/pages/CalculatorPage.jsx` | High | M (content) |
| D2 | Move the identical "How this price is calculated" / "Factors that affect job price" block below the per-surface content (or compress it to 2 short sentences). The boilerplate is fine, but it shouldn't be 60% of the page. | `src/pages/CalculatorPage.jsx:96-127` | Med | S |

### E. Internal linking

| # | Fix | Files | Impact | Effort |
|---|---|---|---|---|
| E1 | Replace one of the homepage's "Popular Calculators" cards (currently deck/roof/all-surface) so all four calculators are represented above the fold. Suggested mix: all-surface, driveway, house-washing, roof, deck (5 cards in a 2-row grid). | `src/pages/Landing.jsx:42-67` | High | S |
| E2 | Add a homepage link to `/pressure-washing-pricing-guide` (e.g., a small "Learn how to price jobs" callout below the calculators section, or a "Pricing guide" item in the header nav). | `src/pages/Landing.jsx`, optionally `src/components/Header.jsx` | High | S |
| E3 | Fix the `RelatedTools` `exclude` mismatch — pass the `pathname` (e.g. `/calculators/house-washing`), not a regex-replaced canonical, so the current page is excluded from its own related-tools panel. | `src/pages/CalculatorPage.jsx:141` | Med | S |
| E4 | Add internal links from the pricing guide to `/calculators/driveway` and `/calculators/house-washing` in their respective surface sections (currently only `/calculator`, `/calculators/deck`, `/calculators/roof` are linked). | `src/pages/PricingGuide.jsx:71-85,115-125` | Med | S |
| E5 | Widen header nav anchor text from "Driveway / Roof / House / Deck" to "Driveway / Roof / House Washing / Deck" — costs nothing, adds one keyword for the highest-priority page. | `src/components/Header.jsx:15-18` | Low | S |

### F. Sitemap

| # | Fix | Files | Impact | Effort |
|---|---|---|---|---|
| F1 | Add `<lastmod>` to every sitemap entry (build-time generated date). | `public/sitemap.xml` (or move generation into `prerender.js`) | Low | S |

### G. Non-fixes (called out but not recommended this session)

- **Switching to a different framework / SSR runtime.** Current Vite + React + SSG prerender works fine. Don't migrate.
- **Adding hero images per calculator.** Adds load, complexity, and stock-photo risk. Lower priority than the FAQ/content/schema work above.
- **City-specific pages** (`/pressure-washing-cost-calculator-los-angeles` style). Already in `docs/prd.md` as Phase 2. Don't start until the existing pages are at full strength.
- **Backlinks, directory submissions, GBP, etc.** Out of scope for this audit.

---

## Re-indexing order (for after Phase 2 fixes ship)

When fixes land and the new build is live, request re-indexing in GSC in this order:

1. `/calculators/house-washing` — biggest existing impression base; fixes should move it off page 6.
2. `/` — title/H1 changes are the most visible, and it gets the most traffic.
3. `/calculators/driveway`, `/calculators/roof`, `/calculators/deck` — submit together once their per-page content + FAQ + schema improvements are in.
4. `/calculator` — lower priority, less specific intent.
5. `/pressure-washing-pricing-guide` — only resubmit if its meta description or schema actually changed.

Also re-submit the sitemap so the new `<lastmod>` values are picked up.

---

## What needs your input (not code) for Phase 2

- The **per-surface 300–500-word body sections** (D1) — these need your voice and your real numbers (production rates, chemical brands, regional pricing). I can draft, but you'll want to edit.
- The **expanded FAQ blocks** (C2) — same: I can produce a first draft, but the "real operator" voice in your current FAQs is your strongest CTR asset, so you should review.
- Decision on whether to add hero images to calculator pages (skipped here; can revisit).

I'll wait for your review of this report before making any code changes. Reply with which fixes to apply (e.g., "do A, B, C, E — hold D until I write content") and I'll execute them in grouped commits.
