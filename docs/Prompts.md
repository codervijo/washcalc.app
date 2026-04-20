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
