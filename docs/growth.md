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
- **Status:** testing — reviewed 2026-09-22; page-level KPI not met in the
  first window, extended (see Result). Built `bcff287`; copy + sourced data
  filled `0744d5d`; regional table filled `a7fab7a`; **deployed 2026-07-17**
  (pushed 18:42 PT, `origin/main` → `a7fab7a`, per `git reflog origin/main`).
- **KPI:** (confirmed 2026-09-22) impressions, clicks + avg position in GSC for
  `/calculators/house-washing`, `/calculators/deck`, and
  `/pressure-washing-pricing-guide`; index state of the three; new long-tail
  query capture (e.g. "sh dilution calculator", "deck cleaning psi by
  material", "house washing profit calculator", "deck stain coverage
  calculator", "house washing cost by city"). **Dropped:** rich-result
  eligibility for HowTo/FAQPage — Google limits FAQ rich results to
  "well-known, authoritative government and health websites" and removed
  HowTo rich results (mobile Aug 2023, desktop 2023-09-14), so this site has
  no Enhancements count to measure
  (https://developers.google.com/search/blog/2023/08/howto-faq-changes).
- **Baseline (28 days ending at deploy, 2026-06-20..2026-07-17; GSC
  searchanalytics by page, `sc-domain:washcalc.app`, pulled 2026-09-22):**
  - house-washing: 0 clicks / 0 impressions on the apex URL (the legacy
    `www.` URL had 0 / 8 / pos 6.4) — **not indexed** (`redirect_error`)
  - deck: 0 clicks / 0 impressions / no position — **not indexed**
    (`discovered_not_indexed`)
  - pricing-guide: 0 clicks / 0 impressions / no position — **not indexed**
    (`discovered_not_indexed`)
  - Site total at deploy: 1 click / 583 impressions / avg pos 67.2
    (`portfolio/data/seo/2026-07-17.json`)
  - Rich results: n/a — see KPI (not shown for this site type since 2023)
  - Index states: `portfolio/data/gsc/washcalc.app/2026-07-17.json`
- **Action:** kept the primary calculator as the above-fold hero on each calc
  page and added secondary contractor tools below. House-washing: SH dilution
  (batch + downstream), job-profitability (auto-pulls chem cost), regional
  pricing table. Deck: material selector (PSI/nozzle/multiplier + safe-PSI
  warning), stain/seal coverage, clean-and-seal timeline. Pricing guide
  restructured as a pillar hub linking every calculator + `/quote-tool`.
  Added HowTo (deck), FAQPage (pillar + both calc pages), retained
  SoftwareApplication + BreadcrumbList — all in prerendered static HTML,
  Googlebot-curl verified; 92/92 crawl tests. Contractor-only framing.
- **BLOCKERS before deploy:** all cleared before the 2026-07-17 deploy
  (verified 2026-09-22 — no `TODO(operator)` / placeholder markers left in
  `src/`):
  - ✓ Regional pricing table filled with cited data, `LAST_UPDATED =
    "2026-07-17"` (`a7fab7a`).
  - ✓ Deep body copy written with sourced data (`0744d5d`).
  - ✓ Tool math defaults sourced/labelled (`0744d5d`; deck PSI sources noted
    in `src/pages/variants.js`).
- **Result:** reviewed 2026-09-22 (scheduled review 2026-08-14 = deploy + 28
  days was missed; numbers below cover that window and the latest one).
  - Review window 2026-07-18..2026-08-14: house-washing 0 / 5 / pos 6.2
    (+ `www.` 0 / 10 / 7.9); deck 0 / 2 / pos 4.0; pricing-guide 0 / 0.
    Site: 12 clicks / 749 impressions / avg pos 48.7
    (`portfolio/data/seo/2026-08-14.json`).
  - Latest window 2026-08-22..2026-09-19: house-washing 1 / 18 / pos 7.6
    (+ `www.` 0 / 13 / 7.8); deck 0 / 9 / pos 5.1; pricing-guide 0 / 169 /
    pos 81.5.
  - Index state (URL inspection 2026-09-21): pricing-guide **indexed**
    (crawled 2026-09-01); deck still Discovered – not indexed; house-washing
    still "Page with redirect" from a 2026-04-30 crawl.
  - Long-tail capture: none of the example queries appeared. The only
    house-washing query was "pressure washing calculator app". The pricing
    guide's impressions are mostly **commercial** pricing queries
    ("commercial pressure washing prices", "… price per square foot
    commercial", "… rates") at positions ~80–97.
- **Learning:** site-level visibility improved sharply after this deploy
  (avg pos 67.2 → 48.7 in 28 days) while the three target pages barely moved,
  so the gain can't be attributed to them from this data. Deck and
  house-washing were not being crawled at all; content depth didn't change
  that — pursued in Phase 1.C (2026-09-22 entry). The pricing guide ranks for
  commercial pricing it doesn't target; that is a possible future content
  angle, not a queued task. Re-review both calc pages 28 days after the
  Phase 1.C deploy.

## 2026-08-21 — Phase 1.B: six new SEO pages + deepened `/calculator`
- **Status:** active — early signal positive (see 2026-09-22 check below)
- **KPI:** site-wide GSC clicks / impressions / avg position (28-day rolling);
  index state of the six new URLs and of `/calculators/deck` +
  `/pressure-washing-pricing-guide` (link-equity targets).
- **Baseline (2026-08-21, 28-day rolling):** 13 clicks / 840 impressions /
  avg pos 47.7. Indexed (GSC coverage 2026-07-17): `/`, `/calculators/driveway`,
  `/about` only.
- **Action:** commit `102fbda`. New: `/pressure-washing-estimate-calculator`,
  `/roof-cleaning-cost`, `/driveway-pressure-washing-cost`, `/house-washing-cost`,
  `/pressure-washing-quote-template`, `/pressure-washing-estimate-template`.
  `/calculator` deepened (route-scoped). FAQPage + BreadcrumbList everywhere,
  SoftwareApplication (estimate calc), HowTo (quote template). Internal links
  from new pages into deck calc + pricing guide. Indexed pages byte-identical;
  no header/footer/homepage links added. Sitemap 15 URLs. Full detail:
  `docs/prd.md § Phase 1.B`.
- **Result:** partial — check 2026-09-22 below; full review 2026-10-19
  (≈ 28 days after the new pages were first crawled on 2026-08-25).
- **Learning:** TBD at review. Early read: new cost-guide / tool pages get
  crawled and indexed within ~4–5 days of deploy on this site, while
  never-linked-from-indexed-pages URLs (`/calculator`, `/calculators/roof`,
  `/calculators/deck`) stay "Discovered – not indexed".

### 2026-09-22 check — metrics snapshot

Source: `portfolio/data/seo/<date>.json` (`gsc_*` fields, 28-day rolling
window, `--days 28` default in `portfolio/src/portfolio/cli.py`). Values
copied verbatim; position is avg (lower = better).

| Date | Clicks | Impressions | Avg pos | Note |
|---|---|---|---|---|
| 2026-05-10 | 3 | 457 | 62.6 | earliest snapshot |
| 2026-06-08 | 5 | 940 | 66.2 | pre-apex peak |
| 2026-07-17 | 1 | 583 | 67.2 | trough; house-washing/deck work committed |
| 2026-08-21 | 13 | 840 | 47.7 | Phase 1.B committed |
| 2026-09-01 | 13 | 971 | 52.1 | |
| 2026-09-22 | 18 | 1,153 | 49.8 | +296 impressions vs 2026-08-22 (857) |

Index state — GSC URL inspection, `portfolio/data/gsc/washcalc.app/2026-09-21.json`
(`v16c_inspections`; only these 10 URLs were inspected):

| URL | State 2026-09-21 | Last crawl | State 2026-07-17 |
|---|---|---|---|
| `/` | Submitted and indexed | 2026-09-18 | submitted_indexed |
| `/calculators/driveway` | Submitted and indexed | 2026-08-27 | submitted_indexed |
| `/about` | Submitted and indexed | 2026-09-10 | submitted_indexed |
| `/pressure-washing-pricing-guide` | **Submitted and indexed** | 2026-09-01 | discovered_not_indexed |
| `/pressure-washing-estimate-calculator` | **Submitted and indexed** | 2026-08-25 | (new) |
| `/driveway-pressure-washing-cost` | **Submitted and indexed** | 2026-08-26 | (new) |
| `/calculator` | Discovered – not indexed | — | url_is_unknown_to_google |
| `/calculators/roof` | Discovered – not indexed | — | url_is_unknown_to_google |
| `/calculators/deck` | Discovered – not indexed | — | discovered_not_indexed |
| `/calculators/house-washing` | Page with redirect | 2026-04-30 | redirect_error |

Not inspected in this snapshot: `/roof-cleaning-cost`, `/house-washing-cost`,
`/pressure-washing-quote-template`, `/pressure-washing-estimate-template`,
`/quote-tool`.

Attribution caveats: the upturn starts ~2026-07-20 (position 67 → 48 by
2026-08-21), i.e. *before* Phase 1.B, so the 2026-07-17 work (deploy date
not recorded) likely drove the first leg. Impressions growth after
2026-08-21 coincides with Phase 1.B pages indexing. No per-page/per-query
breakdown was pulled, so page-level attribution is unverified.

## 2026-09-22 — Phase 1.C: get the four non-indexed calculator URLs indexed
- **Status:** active — ⚠️ BUILT, NOT YET DEPLOYED. Window starts at deploy.
- **KPI:** GSC index state of `/calculator`, `/calculators/roof`,
  `/calculators/deck`, `/calculators/house-washing` (target: Submitted and
  indexed); site-wide clicks / impressions / avg pos (28-day rolling).
- **Baseline (2026-09-22):** 18 clicks / 1,153 impressions / avg pos 49.8.
  `/calculator`, `/calculators/roof`, `/calculators/deck` = Discovered – not
  indexed; `/calculators/house-washing` = Page with redirect (stale crawl
  2026-04-30; live URL returns 200). Source: see 2026-09-22 check above.
- **Action:** sitemap `lastmod` changed from build-date-on-every-URL to
  per-route last-content-change. `/calculators/roof` expanded (~1,430 words,
  was ~470): roof-area-from-pitch tool feeding the calculator, OSHA
  low-slope/steep classification, ARMA soft-wash guidance, engine-computed
  worked examples, 3 new FAQs (FAQPage). `/calculator` repositioned as the
  "All-Surface Pressure Washing Calculator" hub (new title/H1, surface-hub
  links) to stop duplicating the homepage. Indexed pages verified
  byte-identical vs HEAD. Operator: request indexing for the four URLs in
  GSC after deploy. Detail: `docs/prd.md § Phase 1.C`.
- **Result:** TBD — not deployed yet; review date = deploy date + 28 days (set it at deploy)
- **Learning:** TBD
