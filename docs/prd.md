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
- [x] Fix canonical host mismatch — update sitemap + robots.txt to use `www.washcalc.app`
- [x] Add `<link rel="canonical">` to HTML shell (not JS-injected)
- [x] Add Open Graph + Twitter Card tags to HTML shell
- [x] Add JSON-LD `WebApplication` schema to HTML shell
- [x] Automated crawl test suite (`pnpm test:crawl`) — 49 tests, no JS execution
- [x] GitHub Actions CI (`crawl-test.yml`) — runs on PR and push to main
- [ ] Force 301 redirect apex → www (Vercel dashboard — manual)
- [ ] Submit sitemap in Google Search Console + request indexing

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

