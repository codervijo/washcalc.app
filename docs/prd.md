# PRD — washcalc.app

## v1.A — Kickoff / decisions lock

Status: **shipped** — 2026-04-19. Retroactive row: no separate planning
phase was recorded at the time. The locked decisions — operator audience,
SaaS-style calculator site, Vite build, surface base rate × condition
multiplier, a recommended price that protects target margin — are the
product spec in `docs/Prompts.md` (2026-04-19 entry).

## v1.B — MVP

### Core app
- [x] Pricing engine (surface rates, condition multipliers, cost-plus margin)
- [x] Calculator page with real-time results (price, hours, cost, profit)
- [x] Variant calculator pages (driveway, roof, house washing, deck)
- [x] Landing page with hero, benefits, FAQ, related tools
- [x] Sitemap + robots.txt
- [x] SVG favicon

### SEO / crawlability + tests
- [x] Add `vercel.json` SPA rewrites — fix 404 on all sub-routes
- [x] Build-time static prerendering — get real content into initial HTML for Googlebot
- [x] Fix canonical host mismatch — canonical host is **non-www apex** `https://washcalc.app` (sitemap, robots, canonicals, OG, breadcrumbs). NOTE: an earlier pass briefly chose `www.washcalc.app`; that was **reversed to apex on 2026-07-13** — see `docs/growth.md`. Do not re-introduce www canonicals.
- [x] Add `<link rel="canonical">` to HTML shell (not JS-injected)
- [x] Add Open Graph + Twitter Card tags to HTML shell
- [x] Add JSON-LD `WebApplication` schema to HTML shell
- [x] Automated crawl test suite (`pnpm test:crawl`) — 49 tests, no JS execution
- [x] GitHub Actions CI (`crawl-test.yml`) — runs on PR and push to main
- [x] Force redirect **www → apex** (308, live-verified 2026-07-13; re-checked 2026-09-29 — it is Vercel's domain-level redirect, not the `vercel.json` rule. Hosting is Vercel, not Cloudflare)
- [x] Submit sitemap in Google Search Console (`https://washcalc.app/sitemap.xml` submitted 2026-07-14, 0 errors — per portfolio GSC snapshot). Per-URL "Request indexing" is tracked per phase (see v1.D).

## v1.C — SEO page expansion (search-demand targets)

Status: **shipped** — deployed 2026-08-21 (`102fbda`). Early results in `docs/growth.md` (2026-08-21 entry); full review 2026-10-19.

### Goals

1. Capture eight operator-validated search targets with pages that fully
   satisfy their intent, without creating a second URL for any query an
   existing page already targets.
2. Add depth (calculators that work, worked examples, defensible ranges,
   FAQs) rather than thin keyword pages.
3. Grow the internal-link graph so the two `discovered_not_indexed` pages
   (`/calculators/deck`, `/pressure-washing-pricing-guide`) gain crawl paths
   — GSC's own hint for both is "internal links + a 30-day wait."
4. Ship **new URLs only**. Zero changes to any currently-indexed page.

### Demand data provenance

The eight targets are **operator-supplied and operator-validated** from
Ahrefs. They are recorded here as targets, not as metrics: the Ahrefs API
returned `API units limit reached. Expected usage: 1150, API units left: 0`
at plan time, so no volume / KD / traffic-potential figure was retrievable.
**No volume or difficulty numbers are recorded in this PRD, because none
could be verified.** Re-pull and append them when units reset.

Indexing state below comes from real GSC data:
`~/work/projects/sites/portfolio/data/gsc/washcalc.app/2026-07-17.json`
(property `sc-domain:washcalc.app`).

### Target queries → page map

| # | Target query | Page | Action | Intent |
|---|---|---|---|---|
| 1 | pressure washing estimate calculator | `/pressure-washing-estimate-calculator` | **new** | Tool — whole-job, multi-line |
| 2 | pressure washing cost calculator | `/calculator` | **upgrade** | Tool — single surface |
| 3 | pressure washing calculator | `/calculator` | **folded in** | Tool — head term |
| 4 | roof cleaning cost | `/roof-cleaning-cost` | **new** | Cost guide |
| 5 | driveway pressure washing cost | `/driveway-pressure-washing-cost` | **new** | Cost guide |
| 6 | house washing cost | `/house-washing-cost` | **new** | Cost guide |
| 7 | pressure washing quote template | `/pressure-washing-quote-template` | **new** | Template / document |
| 8 | pressure washing estimate template | `/pressure-washing-estimate-template` | **new** | Template / document |

Six new URLs, one upgraded page, one query deliberately folded in.

### SEO rationale

**Why #2 and #3 do not get new URLs.** `/calculator` already carries the
title and H1 "Pressure Washing Cost Calculator", and the homepage title is
"Free Pressure Washing Cost Calculator". A third URL on the same phrase
would split signals three ways against our own pages. `/calculator` is
`url_is_unknown_to_google` (never crawled), so it can be deepened freely —
that is a pure upgrade, not a new competitor. Its title and H1 are **kept
unchanged**: the phrase is already correct, and changing it would only churn
a page that is one crawl away from ranking.

**Why #1 gets its own URL despite looking close to #2.** It is only a new
page because it is a genuinely different tool. `/calculator` prices **one
surface**. `/pressure-washing-estimate-calculator` builds a **whole-job
estimate from multiple surface lines** — add driveway + siding + deck, get
per-line prices, a bundle discount, job-level minimum and travel, and one
total. Different job to be done, different output, no shared prose. If it
were only a synonym page it would not be built.

**Why #4–#6 get cost guides when surface calculators already exist.** The
calculator pages are tool-intent (`/calculators/roof`, `/calculators/driveway`,
`/calculators/house-washing`). "roof cleaning cost", "driveway pressure
washing cost" and "house washing cost" are cost-research intent — the SERP
wants ranges, factors, methods and DIY-vs-pro context, not a form. The two
page types answer different questions and cross-link to each other. Guides
carry no calculator form and no `SoftwareApplication` schema; calculators
carry no cost-guide body. That separation is what keeps them from
cannibalizing.

**Why #7 and #8 are two pages, not one.** In the trade these are different
documents, and the pages are written to that difference: a **quote** is a
firm, fixed-price offer with acceptance terms, deposit and a valid-until
date; an **estimate** is a preliminary, ranged figure with stated
assumptions and the conditions that would change it. Each page carries its
own template, its own filled example, and an explicit "which one do I need"
pointer at the other. No paragraph is shared.

### Routing decisions

- Flat, top-level slugs for guides and templates (`/roof-cleaning-cost`),
  matching the existing `/pressure-washing-pricing-guide` and `/quote-tool`
  precedent. `/calculators/*` stays reserved for surface calculator tools.
- Exact-match slugs on the target phrase where the phrase is the page
  (`/pressure-washing-quote-template`).
- No new short-form 301s. Existing `/driveway`, `/roof`, `/house-washing`,
  `/deck` redirects are untouched and do not collide with the new slugs.
- **No city/location pSEO pages** — explicitly out of scope for this phase.
- Every new route is registered in `App.jsx`, `prerender.js` (so it lands in
  static HTML), and therefore the generated sitemap.

### Content strategy

Target ~800–1,500 useful words per page, with no filler and no paragraph
reused across pages. Titles, H1s, intros, examples and FAQ sets are written
per page.

- **Calculator page** (#1): working multi-line estimate builder with useful
  defaults and editable inputs; methodology stated in full; output broken
  down into price, hours, cost, profit and margin; three worked examples;
  guidance on how to read the number before sending it.
- **Cost guides** (#4–#6): major price factors, the pricing methods actually
  used (per sq ft, flat, hourly), worked calculations, contractor
  perspective, DIY-vs-professional context, and a prominent CTA into the
  matching calculator.
- **Template pages** (#7–#8): an immediately usable template with editable
  fields and copy-to-clipboard, a fully filled example, a field-by-field
  explanation, and the workflow around sending it.

**Data rule.** No invented statistics. Every range shown is either sourced
and attributed inline (HomeGuide, Angi, Trex, Decks.com and the other
sources already cited on this site) or is a value the WashCalc pricing
engine computes from stated inputs. Derived figures are labelled as derived;
tunable defaults are labelled as assumptions the operator should confirm.

### Internal-linking strategy

Crawlable `<a href>` links, present in the prerendered HTML.

- New pages link out to: the main calculator, the quote tool, the pricing
  guide, the relevant surface calculator, and their sibling v1.C pages.
- Each cost guide ↔ its matching surface calculator.
- The two template pages point at each other with an explicit
  "quote vs estimate" distinction.
- Link equity is deliberately routed into `/calculators/deck` and
  `/pressure-washing-pricing-guide` from several new pages, targeting the
  `discovered_not_indexed` state GSC reports for both.
- **Links are added only from non-indexed and new pages.** No indexed page
  gains or loses a link in this phase.

### Indexed-page protection

Indexed per GSC (`submitted_indexed`) — **untouched in this phase**:

| URL | Coverage state |
|---|---|
| `https://washcalc.app/` | submitted_indexed |
| `https://washcalc.app/calculators/driveway` | submitted_indexed |
| `https://washcalc.app/about` | submitted_indexed |

Not indexed, therefore safe to extend: `/calculator`
(url_is_unknown_to_google), `/calculators/roof` (url_is_unknown_to_google),
`/calculators/house-washing` (redirect_error), `/calculators/deck`
(discovered_not_indexed), `/pressure-washing-pricing-guide`
(discovered_not_indexed), `/quote-tool` (created after the snapshot; never
reported by GSC).

Consequences accepted for this phase:

- `Header.jsx`, `Footer.jsx`, `Layout.jsx` and `RelatedTools.jsx` render on
  indexed pages, so **none of them may gain links to the new pages.** The new
  pages are reachable from `/calculator`, `/quote-tool`,
  `/pressure-washing-pricing-guide`, `/calculators/roof`,
  `/calculators/house-washing`, `/calculators/deck` and the sitemap instead.
- `/calculator` depth content is injected through `CalculatorPage`'s existing
  `belowHero` slot from the route only, so `/calculators/driveway` (indexed)
  and `/calculators/roof` render byte-identical to before.
- Adding footer or homepage links to the new pages is the obvious next
  win and is **deferred to a separate, operator-approved change.**

### Deliverables

- [x] `/pressure-washing-estimate-calculator` — multi-line estimate builder
- [x] `/roof-cleaning-cost` — cost guide
- [x] `/driveway-pressure-washing-cost` — cost guide
- [x] `/house-washing-cost` — cost guide
- [x] `/pressure-washing-quote-template` — template + HowTo
- [x] `/pressure-washing-estimate-template` — template
- [x] `/calculator` deepened (route-scoped, no effect on sibling routes)
- [x] Schema per page: FAQPage + BreadcrumbList everywhere; SoftwareApplication
      on the estimate calculator only; HowTo on the quote template only
- [x] Sitemap regenerated with all six new URLs (15 URLs total, 0 www)
- [x] Crawl tests extended to cover every new route — 226 tests passing (was 92)
- [x] `docs/Prompts.md` updated with the final reusable prompt
- [x] Indexed pages verified byte-identical against a HEAD worktree build

### Open item for operator decision

`DEFAULT_VALUES.laborRate = 75` in `src/pages/CalculatorPage.jsx` is labelled
"your labor rate" but is consumed by the engine as a *cost* per hour. At $75
the cost-plus floor dominates almost every job and pushes recommended prices
well above the ranges cited elsewhere on the site — an 800 sq ft driveway
prices at $423 ($0.53/sq ft) against a published band of $0.20–$0.35.

It was **not changed**, because that default is shared with
`/calculators/driveway`, which is indexed, and altering it would change that
page's rendered content. `/calculator` now explains the distinction in prose
instead. Options: (a) leave it and rely on the explanation, (b) lower the
default to ~$35 and accept a content change on an indexed page, or (c) rename
the field to "labor cost / hour" everywhere, which is also an indexed-page
content change.

## v1.D — Index the non-indexed pages

Status: **shipped** — deployed 2026-09-22. Remaining step is the operator's manual GSC "Request indexing" (last deliverable below). Review 2026-10-20 in `docs/growth.md`.

### Diagnosis (GSC URL inspection, 2026-09-21)

Every non-indexed URL is already linked from all three indexed pages
(checked live 2026-09-22), so link starvation is **not** the cause.

| URL | GSC state | Diagnosis |
|---|---|---|
| `/calculators/house-washing` | Page with redirect (last crawl 2026-04-30) | Stale: live URL returns 200. Pre-apex-switch crawl. Needs a re-crawl request, no code. |
| `/calculators/deck` | Discovered – not indexed | ~1,800 words, never crawled. Crawl priority. |
| `/calculators/roof` | Discovered – not indexed | Thin (~470 words, stock template) and overlapped by the 2,300-word `/roof-cleaning-cost`. |
| `/calculator` | Discovered – not indexed | Same title phrase + same tool as the homepage ("Pressure Washing Cost Calculator"); likely treated as a duplicate of `/`. |

### Decisions

- `/calculator` is **differentiated, not canonicalized to `/`**: repositioned
  as the *all-surface* calculator hub (matching the homepage's existing
  "all-surface pressure washing calculator" anchor text and the variant
  pages' "Calculators" breadcrumb). New title/H1; the homepage keeps
  "cost calculator".
- `/calculators/roof` gets the house-washing/deck treatment: roof-specific
  tools + contractor copy via route-scoped slots (`heroExtra`/`belowHero`).
- Sitemap `lastmod` stops being "build date for every URL" (which Google
  learns to ignore) and becomes a per-route last-content-change date.

### Deliverables

- [x] Sitemap: per-route `lastmod` = last content change, not build date
- [x] `/calculators/roof`: roof area-from-pitch tool (geometry; feeds the
      calculator), OSHA low-slope/steep classification, ARMA-sourced soft-wash
      guidance, roof contractor copy, expanded FAQ
- [x] `/calculator`: retitle + new H1 as the all-surface calculator; surface
      hub block linking every surface calculator
- [x] Crawl tests updated; indexed pages (`/`, `/calculators/driveway`,
      `/about`, and now `/pressure-washing-pricing-guide`,
      `/pressure-washing-estimate-calculator`, `/driveway-pressure-washing-cost`)
      verified byte-identical against a HEAD build — 248 tests passing (was 226)
- [ ] Operator (manual, GSC): Request indexing for house-washing, deck, roof,
      `/calculator` after deploy

### Sources used

- ARMA, *Algae Discoloration of Roofs* technical bulletin — 1:1 household
  bleach : water, 15–20 min dwell, gentle rinse, no power washer / brush.
  https://www.asphaltroofing.org/algae-discoloration-of-roofs/
- OSHA 29 CFR 1926.500(b) — low-slope ≤ 4 in 12, steep > 4 in 12.
  https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.500

## v1.E — Search growth (Week 1)

Status: **built** 2026-11-11 — placed by the operator the same day. Technical audit found no blocking issues (all 15 URLs 200 with one H1; single canonical = og:url; one-hop 301/308s; real 404; valid JSON-LD); the one content fix was an unsourced commercial $/sq ft claim in the pricing guide. The goal is 10×
Google Search impressions in 90 days. Leading indicators: indexed commercial
pages and growth in non-branded queries. It absorbs the content-quality items
from the 2026-11-11 page audit. The P2 waitlist batch (waitlist form, Pro
backend, soft-wash mix page) is **not** part of v1.E and is still unplaced.

### Goal

- Baseline: 1,829 impressions / 7 clicks over the 28 days 2026-10-12..11-08,
  and 4,371 / 42 over the 90 days 2026-08-11..11-08 (GSC API,
  `sc-domain:washcalc.app`, pulled 2026-11-11).
- Target: about 18,300 impressions per 28 days by 2027-02-09 (10× the 28-day
  baseline). This is the operator's stated goal, not a forecast.

### Demand data

US search volume (monthly) and keyword difficulty (KD, 0–100) are from
SE Ranking via treg, pulled 2026-11-11. SE Ranking's history shows step jumps
(e.g. 10 → 590) on several terms, so read volumes as rough estimates.
Live top-10 SERPs were pulled the same day (treg `google.serp.organic`,
unpersonalized US).

| Keyword | Vol | KD | Live SERP note | Owner page |
|---|---|---|---|---|
| pressure washing estimate calculator | 480 | 10 | washcalc.app **#1** (`/`) | `/` |
| pressure washing quote | 480 | 17 | washcalc.app **#2** (`/`) | `/` |
| pressure washing calculator | 260 | 8 | all tool pages; we're absent | `/` |
| pressure washing price calculator | 140 | 8 | washcalc.app #4 | `/calculator` |
| pressure washing pricing calculator | 140 | 11 | tool pages | `/calculator` |
| how much to charge for pressure washing | 480 | 5 | Angi, forums, video, HomeGuide | `/pressure-washing-pricing-guide` |
| how to price pressure washing | 320 | 13 | video, Reddit, Jobber | `/pressure-washing-pricing-guide` |
| how to price pressure washing jobs | 170 | 11 | TaskRabbit, forums, Housecall Pro | `/pressure-washing-pricing-guide` |
| pressure washing cost per square foot | 590 | 21 | Facebook, Fixr, Nextdoor | `/pressure-washing-price-per-square-foot` (new) |
| pressure washing price per square foot | 260 | 24 | Homewyse, Reddit, TaskRabbit | `/pressure-washing-price-per-square-foot` (new) |
| commercial pressure washing pricing / prices / cost / rates | 260 each | 7–17 | local companies, forums, HomeGuide #9 | `/commercial-pressure-washing-pricing` (new) |
| cost to power wash deck | 390 | 12 | Homewyse, Reddit, Angi | `/deck-pressure-washing-cost` (new) |
| deck pressure washing cost | 260 | 12 | Homewyse, Reddit, Angi | `/deck-pressure-washing-cost` (new) |
| how much to charge to pressure wash a driveway | 320 | 8 | Facebook, Angi, Quora | `/driveway-pressure-washing-cost` |
| driveway pressure washing cost | 260 | 16 | Housecall Pro, video, Facebook | `/driveway-pressure-washing-cost` |
| soft wash roof cleaning cost | 210 | 16 | local roofers, Reddit | `/roof-cleaning-cost` |
| roof cleaning cost calculator | 170 | 13 | mixed, weak | `/calculators/roof` |
| soft wash house cost | 170 | 13 | Reddit, local companies | `/house-washing-cost` |
| house washing cost | 170 | 25 | local companies, Facebook | `/house-washing-cost` |
| pressure washing estimate(s) / estimating | 170 each | 5–21 | `/` #8 for "estimate" | `/` |
| pressure washing quote template | 90 | 6 | doc-template sites, Pinterest | `/pressure-washing-quote-template` |
| pressure washing estimate template | 90 | 6 | doc-template sites, Pinterest | `/pressure-washing-estimate-template` |
| pressure washing hourly rate | 110 | 26 | TaskRabbit, Reddit, Thumbtack | pricing guide (section) |
| pressure washing price list | 110 | 29 | powerwash.com survey | pricing guide (section) |

Not pursued in v1.E: "gutter cleaning cost" (3,600, KD 58: off-core and
too hard); "pressure washing business plan" (590: not a pricing intent);
"bleach dilution calculator" (320: mostly disinfection intent; a soft-wash
mix page belongs with the P2 batch); "pressure washing invoice template"
(50: low volume).

### Decisions

- **Homepage title kept** ("Pressure Washing Calculator App: Free Estimate &
  Quote Tool"). The uncommitted revert was dropped: `/` ranks #1 and #2 live
  for "estimate calculator" and "quote", and GSC shows those positions
  improving after the title went live on 2026-10-02 (pos ~60 → 23 and
  ~90 → 27).
- `/calculator` takes "price / pricing calculator", so it stops competing
  with `/` for "calculator". `/pressure-washing-pricing-guide` takes "how
  much to charge / how to price". The new per-square-foot page takes the
  rate-reference queries, and the new commercial page takes the commercial
  impressions the guide was drawing at positions 70–90.
- Titles on the indexed calculator pages (driveway, house-washing, deck) are
  unchanged, to limit churn.
- Footer gets a sitewide "Guides & templates" column. This lifts the
  2026-08-21 deferral; the 2026-10-23 hold has expired.
- The calculator pages' shared "how this price is calculated / factors"
  block becomes per-surface: a worked example computed by the engine from
  the page's defaults, plus surface-specific factors.

### Deliverables

- [x] Technical audit: canonicals, og:url, sitemap, redirects, 404, robots,
      JSON-LD parse, internal links
- [x] New `/commercial-pressure-washing-pricing`
- [x] New `/deck-pressure-washing-cost`
- [x] New `/pressure-washing-price-per-square-foot`
- [x] Retitle `/calculator`, `/calculators/roof`, `/roof-cleaning-cost`,
      `/driveway-pressure-washing-cost`, `/pressure-washing-pricing-guide`
- [x] Direct-answer leads on the cost guides and the pricing guide
- [x] Per-surface worked example + factors on the 5 calculator pages
- [x] Footer "Guides & templates" column; homepage guides section
- [x] Sitemap lastmod bumped for every changed route; crawl tests extended
- [x] Deploy and verify in production (Googlebot UA curl) — `65e3913`, 2026-11-11: 18/18 URLs 200, self-canonical, footer + JSON-LD present
- [ ] Operator (manual, GSC): Request indexing for the 3 new URLs plus
      `/calculator`, `/calculators/roof`, `/quote-tool` and both templates

### Sources

- HomeGuide, *How much are commercial pressure washing prices?* (written
  2025-10-09), https://homeguide.com/costs/commercial-pressure-washing-prices
- HomeGuide, *Pressure washing prices* (2024-04-19),
  https://homeguide.com/costs/pressure-washing-prices
- Housecall Pro, *How to price pressure washing jobs* (last posted October
  2026), https://www.housecallpro.com/resources/how-to-price-pressure-washing-jobs/

## Open items (unphased)

Logged 2026-10-14 for later sessions. Not a phase: tick or delete as they
close. Anything that becomes build work gets its own phase row here once
the operator places it.

**Operator, manual (GSC)**
- [ ] Request indexing (uncrawled per URL inspection 2026-11-11, plus the v1.E
      pages): `/commercial-pressure-washing-pricing`, `/deck-pressure-washing-cost`,
      `/pressure-washing-price-per-square-foot`, `/calculator`, `/calculators/roof`, `/quote-tool`,
      `/pressure-washing-quote-template`, `/pressure-washing-estimate-template`.
      Deck and driveway are indexed now, so they're dropped from this list.
      Inspect:
      https://search.google.com/search-console/inspect?resource_id=sc-domain%3Awashcalc.app
- [ ] Remove the stale `https://www.washcalc.app/sitemap.xml` submission
      (last fetched 2026-05-03; www is a 308 to apex):
      https://search.google.com/search-console/sitemaps?resource_id=sc-domain%3Awashcalc.app

**Delegated to rankmill (off-site, not built here)**
- [ ] Forum and Reddit outreach for washcalc.app, owned by the rankmill tool
      (operator decision 2026-11-11). Targets from the v1.E SERP pull:
      pressurewashingresource.com (on 8 of 24 SERPs) and r/pressurewashing
      (14 of 24). Link pages: per-sq-ft, commercial, pricing guide. Link
      acceptance not checked. No work in this repo; rankmill is not modified
      from here.

**Scheduled reviews (`docs/growth.md`)**
- [x] 2026-10-19 — v1.C full review (done 2026-11-11; 6/8 indexed, no traffic).
- [x] 2026-10-20 — v1.D review (done 2026-11-11; 2/4 indexed).
- [x] 2026-10-23 — "Calculator App" title-CTR review (done 2026-11-11; failed,
      CTR fell).
- [x] 2026-11-11 — `/calculators/driveway` thickening review (KPI not met,
      not attributable).
- [ ] 2026-12-09 — re-review v1.C, v1.D and driveway.

**Needs operator decision**
- [ ] "Calculator App" titles: revert, keep or retitle (the title-CTR test
      failed; see `docs/growth.md` 2026-09-25).
- [x] Homepage/footer links to the v1.C pages: shipped in v1.E (2026-11-11).
- [ ] De-duplicate the copy `CalculatorPage` shares across the 5 calculator
      routes (~119 words: "How this price is calculated", "Factors that
      affect job price", the "WashCalc Pro coming soon" banner). The
      write-lamill-seo-page skill flags it as a template fingerprint. Touches
      the indexed `/`, `/calculators/driveway` and `/calculators/house-washing`,
      so wait for the 10-23 review.
- [ ] Calculator H1s say "… Cost Calculator" while the `*-cost` guides own the
      "cost" queries. Revisit after 10-23; H1 changes on indexed pages need
      operator OK.
- [ ] Unplaced ideas from the 2026-10-14 Ahrefs keyword-plan draft: a
      "February Pro launch", 50 state pages ("pressure washing license
      [state]"), a "gating plan", and keyword batches for chemistry,
      business, adjacent services and competitor comparisons. **None are in
      `docs/prd.md`; place them there before any work.** Several seeds overlap
      existing pages (price per sq ft and commercial → pricing guide; SH
      dilution → house-washing tools; "app" → `/` + calculator titles).
- [ ] Ahrefs API is unusable: trial workspace limit is **0 units** (not just
      exhausted), so the 2026-11-03 reset won't help. Keyword data needs a
      web-UI CSV export or a plan change.

**Doc hygiene**
- [ ] Placeholders to fill: `docs/prd.md` "Problem" and "Users";
      `AI_AGENTS.md` "Out of scope / don't touch".
- [ ] `/calculators/house-washing` shows a static "Last updated: 2026-07-17".
      It's the regional-table data date, so it's defensible, but the skill
      flags static dates. Confirm it's labelled as the data date.

## v2 — Growth

Status: **unscheduled.** Opens with `v2.A` (kickoff / decisions lock) when
the operator schedules it. The items below are candidates, not phases.

- [ ] Saved quotes (local storage or account)
- [ ] PDF quote export
- [ ] Lead capture / email CTA
- [ ] City SEO pages (e.g. /pressure-washing-cost-calculator-los-angeles)

## Problem

<1-2 sentences: what is the user-facing problem this site solves?
Who has it? Why does it matter?>

## Users

<Who's the target user? What do they care about? Roughly how many
exist? What's their willingness to pay / engage?>

