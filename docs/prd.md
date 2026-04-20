# PRD — washcalc.app

## Phase 1 — MVP

### Core app
- [x] Pricing engine (surface rates, condition multipliers, cost-plus margin)
- [x] Calculator page with real-time results (price, hours, cost, profit)
- [x] Variant calculator pages (driveway, roof, house washing, deck)
- [x] Landing page with hero, benefits, FAQ, related tools
- [x] Sitemap + robots.txt
- [x] SVG favicon

### SEO / crawlability (next up)
- [ ] Add `vercel.json` SPA rewrites — fix 404 on all sub-routes
- [ ] Build-time static prerendering — get real content into initial HTML for Googlebot
- [ ] Fix canonical host mismatch — update sitemap + robots.txt to use `www.washcalc.app`
- [ ] Add `<link rel="canonical">` to HTML shell (not JS-injected)
- [ ] Add Open Graph + Twitter Card tags to HTML shell
- [ ] Add JSON-LD `WebApplication` schema to HTML shell
- [ ] Force 301 redirect apex → www (Vercel dashboard)
- [ ] Submit sitemap in Google Search Console + request indexing

## Phase 2 — Growth
- [ ] Saved quotes (local storage or account)
- [ ] PDF quote export
- [ ] Lead capture / email CTA
- [ ] City SEO pages (e.g. /pressure-washing-cost-calculator-los-angeles)
