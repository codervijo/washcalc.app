# Growth Log — washcalc.app

> **What this file is for:** an honest, append-only log of growth experiments
> on this site — what was tried, what was measured, what happened. The data
> source is GSC; this file narrates *why*. Future-you (or future-Claude)
> reads this when deciding what to try next, both on this site and on
> related sister sites.

## How to use this (workflow — re-read this when you forget)

**Add an entry whenever you do something growth-relevant.** That includes:
shipping new content, structural SEO changes (sitemap, schema, redirects,
internal linking), tech changes that affect crawl/indexing, marketing
pushes, backlink campaigns. *Not* every code commit — just things you'd
want to point at when GSC numbers move (or fail to).

**Each entry is a hypothesis you can be wrong about.** Commit to a
measurable KPI and an observation window before acting — otherwise "did
this work?" is just a feeling.

### Lifecycle of one entry

1. **Day of action** — append a new dated H2 with `Status: active`, the
   hypothesis, the KPI you'll watch, current baseline numbers, what you
   did, and the date to review (default: today + 28 days, matching GSC's
   reporting window).
2. **Review day** — pull current GSC numbers, compute delta vs baseline.
   Fill in **Result** and **Learning**. Set **Status** to `shipped` (worked,
   keep going), `failed` (didn't pay off, abandon), or extend the review
   another window if results are ambiguous.
3. **Never rewrite older entries.** Wrong hypotheses are the most valuable
   data — they tell you what NOT to repeat on the next site. Append, don't
   edit.

### Where to get the numbers

```bash
cd ~/work/projects/sites/portfolio && make run ARGS="gsc sync"
```

Then read the row for `washcalc.app`. Or pull from
https://search.google.com/search-console directly.

### Format

```
## YYYY-MM-DD — <one-line hypothesis or action>
- **Status:** active | testing | shipped | failed | abandoned
- **KPI:** <what GSC metric / query / page>
- **Baseline:** <numbers at start>
- **Action:** <what was done; 1-2 lines>
- **Result:** <numbers after window; "TBD — review YYYY-MM-DD" until then>
- **Learning:** <why it worked / didn't; what to try next; "TBD" until reviewed>
```

---

## 2026-05-09 — site scaffolded; growth log started
- **Status:** active
- **KPI:** any GSC traffic — clicks, impressions, indexed-page count
- **Baseline:** 0 clicks / 0 impressions (just deployed)
- **Action:** project scaffolded via `portfolio new bootstrap`; first deploy
  pending. After deploy: verify in GSC as `sc-domain:washcalc.app` and submit
  the sitemap.
- **Result:** TBD — review 2026-06-06
- **Learning:** TBD

## 2026-07-13 — host consolidation to non-www apex + OG image + /about
- **Status:** active
- **KPI:** GSC indexed-page count and impressions; duplicate-host signals
  (www vs apex) collapsing to a single canonical. Watch impressions/clicks
  and the "Page indexing" report for consolidation.
- **Baseline:** site was 100% www-canonical; live host default redirected
  apex → www (307), splitting signals across www / non-www / http. `/about`
  did not exist. No `og:image` anywhere; twitter:card was `summary`.
- **Action:** reversed canonical host to non-www apex `https://washcalc.app`
  everywhere (canonicals, breadcrumbs, sitemap, robots). Rewrote `vercel.json`
  to modern schema with a `www → apex` 308 redirect (all paths preserved).
  Added `og:image` + `twitter:image` (1200×630 `public/og-image.png`),
  switched twitter:card to `summary_large_image`, rewrote homepage meta
  description to 143 chars (contractor-focused). Added `/about` (E-E-A-T)
  wired into routing/prerender/sitemap. Live-verified: www/http → apex 308,
  apex 200, og-image 200, all 7 routes self-canonical + og:image, unknown
  route real 404, sitemap 8 apex / 0 www URLs.
- **Result:** TBD — review 2026-08-10
- **Learning:** TBD (also pending: `/about` author name + contact are still
  placeholders; GSC sitemap resubmit under `sc-domain:washcalc.app`)

## 2026-07-17 — deepen house-washing & deck into tool-rich pages + pillar guide
- **Status:** active — ⚠️ BUILT, NOT YET DEPLOYED (committed `bcff287`, not pushed).
  Observation window starts at **deploy**, not today. Do not review before then.
- **KPI:** ‹FILL: confirm/adjust› — impressions + avg position in GSC for
  `/calculators/house-washing`, `/calculators/deck`, and
  `/pressure-washing-pricing-guide`; new long-tail query capture
  (e.g. "sh dilution calculator", "deck cleaning psi by material",
  "house washing profit calculator", "deck stain coverage calculator",
  "house washing cost by city"); and rich-result eligibility for the new
  HowTo (deck) + FAQPage (all three) in the GSC Enhancements report.
- **Baseline (capture at deploy):**
  - house-washing: ‹FILL: clicks / impressions / avg pos / indexed?›
  - deck: ‹FILL: clicks / impressions / avg pos / indexed?›
  - pricing-guide: ‹FILL: clicks / impressions / avg pos / indexed?›
  - Rich results: ‹FILL: HowTo/FAQ valid items count in GSC Enhancements at deploy›
  - (Pull via `cd ~/work/projects/sites/portfolio && make run ARGS="gsc sync"`)
- **Action:** kept the primary calculator as the above-fold hero on each calc
  page and added secondary contractor tools below. House-washing: SH dilution
  (batch + downstream), job-profitability (auto-pulls chem cost), regional
  pricing table. Deck: material selector (PSI/nozzle/multiplier + safe-PSI
  warning), stain/seal coverage, clean-and-seal timeline. Pricing guide
  restructured as a pillar hub linking every calculator + `/quote-tool`.
  Added HowTo (deck), FAQPage (pillar + both calc pages), retained
  SoftwareApplication + BreadcrumbList — all in prerendered static HTML,
  Googlebot-curl verified; 92/92 crawl tests. Contractor-only framing.
- **BLOCKERS before deploy (must clear first):** ‹FILL / DO›
  - Regional pricing table data is stubbed (`null`) with a visible
    "do-not-deploy" banner — supply verified $/sq ft + 1-story/2-story +
    per-row source, set `LAST_UPDATED`.
  - Deep body copy is `[COPY PLACEHOLDER]` blocks — supply ~1,200 words
    contractor prose per page.
  - Tool math defaults marked `TODO(operator)` (SH ratios, deck PSI ranges &
    multipliers, stain coverage rates) — confirm against your SOPs.
- **Result:** TBD — review ‹FILL: deploy date + 28 days›
- **Learning:** TBD
