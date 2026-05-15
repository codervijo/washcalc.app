import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DRIVEWAY, ROOF, HOUSE_WASHING, DECK } from "./src/pages/variants.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// FAQ blocks for the routes that don't come from variants.js.
// Kept here (not in JSX page files) so prerender.js can inject FAQPage
// JSON-LD into the served HTML without React/JSX imports.
const LANDING_FAQS = [
  { q: "How much should I charge for pressure washing?",
    a: "Most operators land between $0.20 and $0.60 per square foot depending on surface and condition. Driveways are usually $0.20–$0.25/sq ft, roofs $0.40–$0.60/sq ft. WashCalc combines a per-surface base rate with your real labor, chemical and travel cost so you never quote below profitability." },
  { q: "How does WashCalc estimate labor time?",
    a: "Each surface has a typical productivity rate in square feet per hour. We multiply by a condition factor (light, moderate, heavy) so a heavily-soiled deck takes longer than a fresh one." },
  { q: "What is a healthy gross margin for pressure washing?",
    a: "40–60% gross margin is a common target for solo and small-crew operators. WashCalc lets you set a target margin and protects it automatically." },
  { q: "Does this replace a CRM or invoicing tool?",
    a: "No — WashCalc is a focused pricing tool. Saved quotes, PDF export and lead capture are on the roadmap." },
  { q: "Can I use this on mobile?",
    a: "Yes. The calculator is fully responsive — use it on the truck, on the lawn, or at the kitchen table." },
];

const ALLSURFACE_FAQS = [
  { q: "What's a fair price per square foot for pressure washing?",
    a: "Driveways usually run $0.20–$0.25/sq ft, house siding $0.25–$0.35, roofs $0.40–$0.60, decks $0.30–$0.45, patios $0.20–$0.30 and fences $0.25–$0.40." },
  { q: "How is labor time estimated?",
    a: "Each surface has a productivity rate in sq ft per hour. We multiply by a condition factor — heavy soil takes 60% longer than light." },
  { q: "Why does the price sometimes jump?",
    a: "WashCalc enforces your target margin. If your costs (labor, chemical, travel) exceed the rate-based price, we raise the price to protect profit." },
];

const ROUTES = [
  {
    path: "/",
    title: "WashCalc — Pressure Washing Cost Calculator & Quoting Tool",
    description: "Pressure washing pricing calculator for faster, more profitable quotes.",
    canonical: "https://www.washcalc.app/",
    schema: {
      "@type": "WebApplication",
      name: "WashCalc",
      applicationCategory: "BusinessApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    faqs: LANDING_FAQS,
  },
  {
    path: "/calculator",
    title: "Pressure Washing Cost Calculator — WashCalc",
    description: "Free pressure washing cost calculator. Estimate job price, labor time, cost and profit for driveways, roofs, house washing, decks and more.",
    canonical: "https://www.washcalc.app/calculator",
    schema: {
      "@type": "SoftwareApplication",
      name: "Pressure Washing Cost Calculator",
      applicationCategory: "BusinessApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    breadcrumbs: [
      { name: "Home", url: "https://www.washcalc.app/" },
      { name: "Calculator", url: "https://www.washcalc.app/calculator" },
    ],
    faqs: ALLSURFACE_FAQS,
  },
  {
    path: "/calculators/driveway",
    title: DRIVEWAY.title,
    description: DRIVEWAY.description,
    canonical: DRIVEWAY.canonical,
    schema: {
      "@type": "SoftwareApplication",
      name: DRIVEWAY.h1,
      applicationCategory: "BusinessApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    breadcrumbs: DRIVEWAY.breadcrumb,
    faqs: DRIVEWAY.faqs,
  },
  {
    path: "/calculators/roof",
    title: ROOF.title,
    description: ROOF.description,
    canonical: ROOF.canonical,
    schema: {
      "@type": "SoftwareApplication",
      name: ROOF.h1,
      applicationCategory: "BusinessApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    breadcrumbs: ROOF.breadcrumb,
    faqs: ROOF.faqs,
  },
  {
    path: "/calculators/house-washing",
    title: HOUSE_WASHING.title,
    description: HOUSE_WASHING.description,
    canonical: HOUSE_WASHING.canonical,
    schema: {
      "@type": "SoftwareApplication",
      name: HOUSE_WASHING.h1,
      applicationCategory: "BusinessApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    breadcrumbs: HOUSE_WASHING.breadcrumb,
    faqs: HOUSE_WASHING.faqs,
  },
  {
    path: "/calculators/deck",
    title: DECK.title,
    description: DECK.description,
    canonical: DECK.canonical,
    schema: {
      "@type": "SoftwareApplication",
      name: DECK.h1,
      applicationCategory: "BusinessApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    breadcrumbs: DECK.breadcrumb,
    faqs: DECK.faqs,
  },
  {
    path: "/pressure-washing-pricing-guide",
    title: "Pressure Washing Pricing Guide (2026) — WashCalc",
    description: "How to price pressure washing jobs in 2026. Average cost per square foot, pricing by surface (deck, roof, driveway), labor and chemical costs, plus common mistakes to avoid.",
    canonical: "https://www.washcalc.app/pressure-washing-pricing-guide",
    breadcrumbs: [
      { name: "Home", url: "https://www.washcalc.app/" },
      { name: "Pressure Washing Pricing Guide", url: "https://www.washcalc.app/pressure-washing-pricing-guide" },
    ],
  },
  // 404 page — output to dist/404.html, noindex
  {
    path: "/404-page",
    outFile: "dist/404.html",
    title: "Page not found — WashCalc",
    description: "The page you're looking for doesn't exist on WashCalc.",
    canonical: null,
    noindex: true,
  },
];

function jsonLdBlock(obj) {
  return `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", ...obj })}</script>`;
}

function perPageHead(route) {
  const tags = [];
  if (route.noindex) {
    tags.push(`<meta name="robots" content="noindex" />`);
  }
  if (route.canonical) {
    tags.push(`<link rel="canonical" href="${route.canonical}" />`);
    tags.push(`<meta property="og:title" content="${route.title}" />`);
    tags.push(`<meta property="og:description" content="${route.description}" />`);
    tags.push(`<meta property="og:url" content="${route.canonical}" />`);
    tags.push(`<meta name="twitter:title" content="${route.title}" />`);
    tags.push(`<meta name="twitter:description" content="${route.description}" />`);
  }
  if (route.schema) {
    tags.push(jsonLdBlock({
      ...route.schema,
      url: route.canonical,
      description: route.description,
    }));
  }
  if (route.breadcrumbs && route.breadcrumbs.length) {
    tags.push(jsonLdBlock({
      "@type": "BreadcrumbList",
      itemListElement: route.breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: b.url,
      })),
    }));
  }
  if (route.faqs && route.faqs.length) {
    tags.push(jsonLdBlock({
      "@type": "FAQPage",
      mainEntity: route.faqs.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      })),
    }));
  }
  return tags.join("\n    ");
}

async function prerender() {
  const { render } = await import("./dist-server/entry-server.js");
  const template = fs.readFileSync(path.resolve(__dirname, "dist/index.html"), "utf-8");

  for (const route of ROUTES) {
    // render path: use /not-found for the 404 page so React Router hits the * route
    const renderPath = route.path === "/404-page" ? "/404-page" : route.path;
    const appHtml = render(renderPath);

    const html = template
      .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
      .replace(
        /<meta name="description" content=".*?"\s*\/>/,
        `<meta name="description" content="${route.description}" />`
      )
      .replace("</head>", `    ${perPageHead(route)}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    let outPath;
    if (route.outFile) {
      outPath = path.resolve(__dirname, route.outFile);
    } else if (route.path === "/") {
      outPath = path.resolve(__dirname, "dist/index.html");
    } else {
      outPath = path.resolve(__dirname, `dist${route.path}/index.html`);
    }

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html);
    console.log(`  prerendered ${route.path} → ${path.relative(__dirname, outPath)}`);
  }

  // clean up server bundle
  fs.rmSync(path.resolve(__dirname, "dist-server"), { recursive: true, force: true });
  console.log("done.");
}

prerender().catch((err) => {
  console.error(err);
  process.exit(1);
});
