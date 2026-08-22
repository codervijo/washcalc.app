# Prompt History

<!-- Append new prompts at the bottom, newest last. Format:
## YYYY-MM-DD
> <prompt text>
-->

## 2026-04-19
> Build a modern web app called **WashCalc** for **pressure washing pricing and quoting**.
>
> ## Product goal
>
> Create a simple SaaS-style site and calculator that helps pressure washing operators estimate:
>
> * job price
> * labor time
> * job cost
> * gross profit
>
> This should feel like a real niche tool for small service businesses, not a generic demo.
>
> ## Tech constraints
>
> * **JSX only**
> * **No TypeScript**
> * **No Tailwind**
> * Use **clean CSS** or **Material UI**
> * Keep code **modular, simple, and production-ready**
> * Vite-friendly structure
> * Fast, responsive, SEO-friendly
>
> ## Brand
>
> * Name: **WashCalc**
> * Domain: **washcalc.app**
> * Tone: practical, trustworthy, modern
> * Visual direction:
>
>   * clean white or very light gray background
>   * subtle blue/green accents
>   * simple SaaS look
>   * not too corporate
>   * not too playful
>
> ## Main pages to create
>
> ### 1. Home / landing page
>
> Sections:
>
> * Hero section
>
>   * headline: clear value prop for pressure washing pros
>   * subheadline: estimate jobs faster and avoid underpricing
>   * CTA buttons:
>
>     * "Use Calculator"
>     * "See How It Works"
> * Benefits section
>
>   * quote faster
>   * protect profit
>   * estimate labor and chemical cost
>   * look more professional
> * Calculator preview section
> * "How pricing works" section
> * FAQ section
> * Related tools section
> * CTA section for saving quotes / future paid features
>
> ### 2. Main calculator page
>
> Page title:
> **Pressure Washing Cost Calculator**
>
> Inputs:
>
> * Surface Type
>
>   * driveway
>   * house siding
>   * roof
>   * deck
>   * patio
>   * fence
> * Area in square feet
> * Condition
>
>   * light
>   * moderate
>   * heavy
> * Labor rate per hour
> * Chemical cost
> * Travel cost
> * Target margin %
> * Optional minimum charge
>
> Outputs:
>
> * Recommended price
> * Estimated hours
> * Estimated job cost
> * Estimated gross profit
> * Effective price per square foot
>
> Behavior:
>
> * Update results in real time
> * Show a strong results card on desktop and mobile
> * Include:
>
>   * "Copy Quote" button
>   * "Reset" button
>   * "Save Quote" button UI placeholder
>   * "Download PDF" button UI placeholder
>
> ### 3. Variant calculator pages
>
> Create page templates or examples for:
>
> * Driveway Cleaning Calculator
> * Roof Cleaning Calculator
> * House Washing Calculator
> * Deck Cleaning Calculator
>
> These should reuse shared calculator components and logic.
>
> ## Business logic
>
> Create a shared pricing engine file.
>
> Suggested defaults:
>
> * base rate varies by surface type
> * condition applies a multiplier
> * labor cost = estimated hours × labor rate
> * total cost = labor + chemical + travel
> * recommended price should protect target margin
> * minimum charge should be respected if entered
>
> Use sensible default values such as:
>
> * driveway: 0.20–0.25 per sq ft
> * siding: 0.25–0.35
> * roof: 0.40–0.60
> * deck: 0.30–0.45
> * patio: 0.20–0.30
> * fence: 0.25–0.40
>
> Condition multipliers:
>
> * light: 1.0
> * moderate: 1.2
> * heavy: 1.5
>
> Estimated hours can be based on area and condition with simple transparent logic.
>
> ## UX requirements
>
> * Inputs on left, results on right on desktop
> * Stacked layout on mobile
> * Results should be visually prominent
> * Strong spacing, cards, rounded corners
> * Clear labels and helper text
> * Make it look credible enough to show real users
> * Avoid clutter
>
> ## Components to create
>
> Create a clean component structure such as:
>
> * Layout.jsx
> * Header.jsx
> * Footer.jsx
> * Hero.jsx
> * CalculatorForm.jsx
> * ResultsPanel.jsx
> * SurfaceSelector.jsx
> * FAQ.jsx
> * RelatedTools.jsx
> * PricingEngine.js
>
> ## SEO requirements
>
> For all main pages:
>
> * strong title tag
> * meta description
> * semantic HTML
> * internal links between calculators
> * FAQ schema
> * breadcrumbs schema where useful
>
> Example SEO targets:
>
> * pressure washing cost calculator
> * driveway cleaning cost calculator
> * roof cleaning cost calculator
> * how much to charge for pressure washing
> * pressure washing price per square foot
>
> ## Content sections under calculator
>
> Below the calculator include:
>
> * short intro
> * how pricing is calculated
> * factors that affect job price
> * FAQ
> * related calculators
> * CTA for saving quotes
>
> ## Copy direction
>
> Use concise, useful copy. Example style:
>
> * "Estimate pressure washing jobs in seconds."
> * "Avoid underpricing driveways, roofs, and house washes."
> * "See price, time, and profit before you send a quote."
>
> ## Output format
>
> Please output in this order:
>
> 1. folder structure
> 2. shared pricing logic
> 3. reusable components
> 4. landing page
> 5. main calculator page
> 6. one example variant calculator page
> 7. styles
> 8. short notes on how to add more calculator pages
>
> ## Important
>
> * Do not overengineer
> * Do not use TypeScript
> * Do not use Tailwind
> * Keep naming clean
> * Make it easy to expand later into:
>
>   * saved quotes
>   * PDF quotes
>   * lead capture
>   * city SEO pages

## 2026-04-20
> Goal: fix the server-rendered HTML so crawlers see real content on first
> request, and add automated tests that verify this — run against a local
> production build, not the dev server, because dev-server HTML lies.
>
> Context: washcalc.app currently returns an almost-empty HTML shell on
> the root URL. Only <title> is in the initial response; the body is
> client-rendered. This must be fixed so Googlebot sees actual content
> without executing JavaScript.
>
> Work in this order. Pause after sections 1 and 2 for my confirmation.
>
> 1. DIAGNOSE.
>    - Identify the framework and current rendering mode.
>    - Run a local production build and serve it, then curl the root
>      with `curl -A "Googlebot" http://localhost:PORT/` and show me
>      exactly what comes back.
>    - Report: framework, current rendering strategy, what's missing
>      from the HTML, and the minimum-viable fix.
>
> 2. PROPOSE the fix.
>    - Prefer the smallest change that gets real content into the
>      initial HTML for the homepage and every surface route.
>    - Acceptable approaches: (a) true SSR/SSG, (b) framework static
>      export, (c) prerender plugin.
>    - The interactive calculator can still hydrate client-side.
>      Hydration must not wipe server-rendered content.
>
> 3. IMPLEMENT.
>    - Apply the chosen fix.
>    - Ensure <title>, meta description, canonical, OG, and JSON-LD
>      are rendered server-side per route.
>    - robots.txt and sitemap.xml must return 200 and list every route.
>
> 4. ADD AUTOMATED TESTS (Vitest, runs against local production build).
>    - npm script `test:crawl`: build → serve on known port → run tests → teardown.
>    - Fetch with plain HTTP, no JS execution (no Playwright).
>    - Test cases: 200 + Content-Type, H1 + "calculator" in body,
>      title/description/canonical/JSON-LD in <head>, unique title per
>      surface route, robots.txt Sitemap directive, sitemap.xml valid XML,
>      homepage body >= 2000 bytes, 404 for unknown route.
>    - Failure messages must explain the "empty shell" regression clearly.
>
> 5. WIRE INTO CI.
>    - Add `test:crawl` to GitHub Actions on PR and push to main.
>    - Add to pre-deploy step if one exists.
>
> 6. VERIFY LOCALLY AND REPORT.
>    - Run `test:crawl` and show output.
>    - Show byte count before and after with curl | wc -c.
>
> 7. DO NOT deploy. Manual deploy after review.

## 2026-04-20 (soft-404 fix)
> Fix the soft-404 problem on washcalc.app. Every URL currently returns
> 200, including nonsense routes. This must be fixed before Google
> indexes junk.
>
> 1. DIAGNOSE — identify how the SPA/SSR setup handles unmatched routes.
>    Confirm soft-404 by hitting a fake route locally.
>
> 2. FIX 404 HANDLING — catch-all route returns HTTP 404 with a real
>    "page not found" page including <meta name="robots" content="noindex">,
>    its own <title>, and links back to real routes. Never serve homepage
>    content on unknown routes.
>
> 3. SHORT-FORM REDIRECTS — 301 from /driveway, /roof, /house-washing,
>    /deck to their canonical /calculators/* forms. No catch-all redirect
>    to homepage.
>
> 4. TRAILING SLASH — 301 /path/ → /path consistently. No trailing slash
>    is canonical.
>
> 5. EXTEND CRAWL TESTS — add to test:crawl:
>    * fake routes return 404 (not 200)
>    * 404 page has noindex meta tag
>    * 404 page has unique title
>    * /driveway, /roof, /house-washing, /deck → 301 to canonical
>    * /calculator/ → 301 to /calculator
>
> 6. VERIFY — run extended test:crawl, show curl output. Do not deploy.

## 2026-08-21 (Phase 1.B — SEO page expansion)

Reusable prompt for a WashCalc search-demand expansion phase. The version
below is the **final** form — it folds in the corrections made during the
2026-08-21 run, which are listed after it. Supply a fresh target list and
re-run.

> Expand **washcalc.app** with SEO pages based on validated Ahrefs demand.
>
> Build or upgrade these targets:
> 1. pressure washing estimate calculator
> 2. pressure washing cost calculator
> 3. pressure washing calculator
> 4. roof cleaning cost
> 5. driveway pressure washing cost
> 6. house washing cost
> 7. pressure washing quote template
> 8. pressure washing estimate template
>
> ## Indexed-page protection — read this first
>
> Before changing anything, establish which URLs are actually indexed. The
> authoritative source is the portfolio GSC cache, NOT assumption:
> `~/work/projects/sites/portfolio/data/gsc/washcalc.app/<latest>.json` —
> read the `coverage[]` array and treat only `submitted_indexed` as indexed.
> Report the list before you edit.
>
> Do not modify any indexed page's URL, title, H1, canonical, primary
> content, structured data, or internal-link structure. Prefer new URLs only.
> You may link freely FROM non-indexed and new pages TO anything. If a link
> from an indexed page seems necessary, stop and report the proposed change
> instead of making it.
>
> Note the trap: shared components (`Header`, `Footer`, `Layout`,
> `RelatedTools`, and the default body of `CalculatorPage`) render on indexed
> pages. Editing any of them silently edits every indexed page. Route-scoped
> render slots (`belowHero`, `heroExtra`) are the mechanism for adding content
> to one route without touching its siblings.
>
> ## Before coding
>
> Audit routes, `prerender.js`, sitemap generation, components and existing
> pages. If an existing page already targets one of the queries, improve that
> page rather than creating a competing URL — and say which queries you
> deliberately folded in rather than building.
>
> Update `docs/prd.md` BEFORE implementation with: phase goals, the target
> query → page map, SEO rationale (including why each near-duplicate target
> does or does not get its own URL), routing decisions, content strategy,
> internal-linking strategy, and indexed-page protection. Follow the heading
> hygiene ritual in `docs/CLAUDE.md` — print the existing heading outline and
> confirm depth and label before writing.
>
> ## Content quality
>
> Thick, genuinely useful pages: roughly 800–1,500 words where appropriate,
> no filler, intent fully satisfied. Every calculator must actually work.
> Realistic inputs, stated formulas, labelled assumptions, worked examples,
> and guidance on interpreting the result. Tables and ranges where they earn
> their place. FAQs covering adjacent intent. Title, H1, intro, examples,
> FAQs and body copy meaningfully unique per page — no paragraph reused
> across pages. Do not invent statistics: every number is either cited to a
> source inline, computed by the pricing engine from stated inputs, or a
> clearly labelled modelling assumption.
>
> Calculator pages: useful defaults, editable inputs, methodology, output
> breakdown, profit implications, multiple worked examples, real quoting
> guidance, links to related calculators, quote tool and pricing guide.
> Cost guides: price factors, pricing methods, example calculations,
> defensible ranges only, contractor perspective, DIY-vs-professional, and a
> prominent CTA into the matching calculator. Template pages: an immediately
> usable copyable/editable template, a filled-out example, every field
> explained, and the contractor workflow around it.
>
> ## Technical SEO
>
> Reuse existing WashCalc components and CSS. Breadcrumbs on every page.
> Crawlable `<a href>` internal links present in the PRERENDERED HTML — every
> new page reachable from existing relevant pages. Unique title, meta
> description, canonical (non-www apex) and H1 per page. Register each route
> in `App.jsx` AND `prerender.js` (the sitemap is generated from the
> prerender route table). No city/location pSEO pages.
>
> Schema only where accurate: FAQPage and BreadcrumbList everywhere;
> SoftwareApplication only on pages that ARE applications; HowTo only where
> the page visibly renders that step sequence. FAQ answers must be sourced
> from the same module the JSON-LD is built from so schema and visible text
> cannot drift.
>
> ## Validation
>
> Build inside the `sites1` container — host `make build` short-circuits and
> `pnpm build` on the host bypasses the workspace contract:
> `docker exec $(docker ps --filter ancestor=sites1 --format '{{.Names}}' | head -1) sh -c 'cd /usr/src/app/washcalc.app && pnpm test:crawl'`
>
> Extend `tests/crawl.test.js` to cover every new route: 200, minimum body
> size, own H1, unique title and description, self-canonical on apex,
> required content fragments in static HTML, required schema present, schema
> it must NOT declare absent, visible-FAQ-matches-schema, required outbound
> links, and sitemap membership. Add a site-wide unique-title assertion as a
> cannibalization guard, and title/canonical regression guards for the
> indexed pages.
>
> Prove the indexed pages are untouched rather than asserting it: build the
> pre-change tree in a git worktree at HEAD and diff the prerendered HTML,
> normalising the hashed asset filenames. Then remove the worktree — its
> `dist/` is root-owned by the container, so delete it from inside the
> container.
>
> ## Documentation, only after the build and tests pass
>
> Update `docs/Prompts.md` with the final prompt including any corrections
> made during the work, so the next phase can reuse it. Tick the PRD
> deliverables.
>
> Report: new URLs, upgraded URLs, pages deliberately not created because of
> cannibalization, build/test results, docs updated, and a diff summary
> showing indexed pages untouched.

### Corrections folded in during this run

These were discovered while executing an earlier version of the prompt and
are now baked into the text above:

1. **GSC coverage is the source of truth for "indexed", not the sitemap.**
   The initial assumption that all live routes were indexed was wrong — only
   3 of 9 were `submitted_indexed` (`/`, `/calculators/driveway`, `/about`).
   Two were `url_is_unknown_to_google` and two `discovered_not_indexed`,
   which made `/calculator` freely upgradeable and made link-equity routing
   into the un-crawled pages a phase goal rather than a nice-to-have.
2. **Shared components are the indexed-page trap.** Adding the new pages to
   `Footer` or `RelatedTools` would have modified all three indexed pages.
   The fix — route-scoped `belowHero` slots — is now stated explicitly.
3. **Ahrefs may be out of API units.** The run hit
   `API units limit reached … units left: 0`, so no volume or KD figure could
   be verified. Record targets without metrics rather than inventing them,
   and say so in the PRD.
4. **`laborRate` in the pricing engine is a COST, not a billing rate.** The
   shipped default of $75/hr is a billing rate, which makes the cost-plus
   floor dominate and pushes recommended prices well above the cited market
   ranges on the same page. New tooling should default to a fully-loaded cost
   (~$35/crew-hour) and say so in the field label. **Still open:** the
   `DEFAULT_VALUES.laborRate = 75` in `CalculatorPage.jsx` is shared with the
   indexed `/calculators/driveway` route, so it was left untouched and needs
   an operator decision.
5. **Worked-example numbers must come from the engine, not from prose.**
   Every figure quoted on a page was computed by running `calculateQuote`
   first, so a reader entering the stated inputs reproduces them exactly.
