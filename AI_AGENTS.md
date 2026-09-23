# AI Agent Context — washcalc.app

## What this project is
A free pressure-washing pricing site for contractors: surface calculators
(price, labor hours, cost, profit via a rate-based + cost-plus-margin engine),
a multi-surface estimate builder, cost guides, and quote/estimate templates.
Growth is organic search; see `docs/prd.md` (phases) and `docs/growth.md`
(experiments + GSC results).

## Stack
- React 18 + react-router-dom 6, built with Vite 5 (pnpm only).
- Build-time prerender (`prerender.js`) renders every route to static HTML and
  writes per-route meta, JSON-LD and `sitemap.xml`.
- Tests: vitest crawl suite (`tests/crawl.test.js`) against a static server
  (`scripts/crawl-runner.js`) — no JS execution, i.e. what Googlebot sees.
- Hosting: Cloudflare Pages (auto-build on push to `main`).

## Project structure
- `src/PricingEngine.js` — surface rates, condition multipliers, `calculateQuote`.
- `src/pages/` — route pages; `variants.js` (surface calculator presets + FAQs)
  and `seoPages.js` (Phase 1.B page meta + FAQs) are the single source for
  visible FAQ text and FAQPage JSON-LD.
- `src/components/` — shared UI; `src/components/tools/` — page-specific tools.
- `prerender.js` — route list (title, description, canonical, lastmod, schema).
- `tests/crawl.test.js` — crawl/SEO regression suite.
- `docs/` — PRD, growth log, prompt log, per-project CLAUDE.md.

## How to run
Inside the `sites1` container (see "Running builds" below):
`pnpm dev` (local dev), `pnpm build` (production build → `dist/`),
`pnpm test:crawl` (build + crawl tests).

## Key conventions
- **Indexed pages are protected.** Pages that GSC reports as indexed must not
  change title, H1, canonical or rendered content without an explicit operator
  decision; the crawl suite guards titles/canonicals. Verify with a HEAD
  worktree build diff before shipping.
- Page-specific content goes in `CalculatorPage`'s route-scoped
  `heroExtra` / `belowHero` slots, never in shared components (`Header`,
  `Footer`, `Layout`, `RelatedTools`) that render on indexed pages.
- Every new route is registered in `App.jsx` **and** `prerender.js`.
- Sitemap `lastmod` is a per-route last-content-change date in `prerender.js`
  — bump it in the same change that alters what the route renders.
- No invented numbers: every figure is cited inline or computed by
  `calculateQuote` from stated inputs.

## Out of scope / don't touch
- <leave blank for user to fill>

## Versioning

This project follows the two-level versioning convention canonical
to the portfolio (see `sites/portfolio/AI_AGENTS.md` for the full
statement):

- **`vN`** — major capability tier (SemVer-MAJOR semantics).
- **`vN.X`** — phase letter within a tier (A, B, C, …) for
  internal slicing.
- **`vN.X.Y`** — numeric sub-phase for follow-up work that lands
  after `vN.X` shipped.

Track current phase + completed work in `docs/prd.md`.

## Building info

This project's `Makefile` forwards every target to `../Makefile`
(the sites/ workspace) which delegates per-stack work to the central
builder at `~/work/projects/builder/`. Common: `make deps`, `make dev`,
`make build`. Don't duplicate build logic per-site.

### Running builds (agents: read this before invoking pnpm directly)

The parent `../Makefile` enforces `IS_DOCKER=yes` — `make build` /
`make test` run from the host short-circuit with
`"Warning: Not running inside Docker"` and do nothing. Do **not**
fall back to `pnpm build` on the host; that bypasses the workspace
contract.

The sites/ workspace ships a persistent dev container named `sites1`
(image: `sites1:latest`). One container is normally already running.
Find its name with `docker ps` (look for `IMAGE=sites1`) and exec the
build inside it — the host's `sites/` directory is bind-mounted at
`/usr/src/app/` so file changes are immediately visible:

```bash
CONTAINER=$(docker ps --filter ancestor=sites1 --format '{{.Names}}' | head -1)
docker exec "$CONTAINER" sh -c 'cd /usr/src/app/washcalc.app && pnpm build'
```

For an interactive shell inside the container, use `make buildsh`
from the parent dir (runs `dev_container.sh`).

Build = `pnpm build:client && pnpm build:server && node prerender.js`.
The prerender step is what writes per-route `dist/<path>/index.html`
files — without it, only the SPA shell is served and SEO breaks.

### Verifying the prerendered HTML

After build, the prerendered HTML on a single line — use whole-file
matches when grepping:

```bash
grep -oE 'wc-faq-a' dist/index.html | wc -l       # counts matches
grep -c 'wc-faq-a' dist/index.html                # counts lines (misleading: ~1)
```

## Canonical host

**Non-www apex `https://washcalc.app` is canonical** — all canonicals,
breadcrumbs, sitemap URLs, and OG tags use the bare apex, never `www.`.
A live `www → apex` 308 redirect enforces it. This was a deliberate
reversal away from www on 2026-07-13 (see `docs/growth.md`). Do not
re-introduce www canonicals.

## Deployment info

Cloudflare Pages. Push to `main` triggers an auto-build via the
`wrangler.jsonc` config; build output is `dist/`. Custom domain
configured via the CF Pages dashboard.

