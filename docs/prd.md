# PRD — washcalc.app

## Phase 1 — MVP

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
- [x] Force redirect **www → apex** (308 via `vercel.json`; live-verified 2026-07-13)
- [ ] Submit sitemap in Google Search Console + request indexing

## Phase 1.B — SEO page expansion (search-demand targets)

Status: **in progress** — planned 2026-08-21, before implementation.

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
  guide, the relevant surface calculator, and their sibling Phase 1.B pages.
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

## Phase 2 — Growth
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

