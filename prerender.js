import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DRIVEWAY, ROOF, HOUSE_WASHING, DECK, PRICING_GUIDE_FAQS } from "./src/pages/variants.js";
import { SEO_PAGES, ESTIMATE_CALCULATOR } from "./src/pages/seoPages.js";
import { LANDING_FAQS, QUOTE_TOOL_FAQS, ALLSURFACE_FAQS } from "./src/pages/faqs.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// FAQ blocks for /, /quote-tool and /calculator live in src/pages/faqs.js,
// shared with the visible page so FAQPage JSON-LD can't drift from it.

const ROUTES = [
  {
    path: "/",
    title: "Pressure Washing Calculator App: Free Estimate & Quote Tool",
    description: "Free pressure washing cost calculator for contractors. Estimate job price, labor and chemical cost, and send a quote that protects your profit.",
    canonical: "https://washcalc.app/",
    lastmod: "2026-09-29",
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
    title: "All-Surface Pressure Washing Calculator — WashCalc",
    description: "One pressure washing calculator for every surface — driveways, siding, roofs, decks, patios and fences. See the full rate card, labor hours and margin math.",
    canonical: "https://washcalc.app/calculator",
    lastmod: "2026-09-29",
    schema: {
      "@type": "SoftwareApplication",
      name: "All-Surface Pressure Washing Calculator",
      applicationCategory: "BusinessApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    breadcrumbs: [
      { name: "Home", url: "https://washcalc.app/" },
      { name: "Calculator", url: "https://washcalc.app/calculator" },
    ],
    faqs: ALLSURFACE_FAQS,
  },
  {
    path: "/calculators/driveway",
    title: DRIVEWAY.title,
    description: DRIVEWAY.description,
    canonical: DRIVEWAY.canonical,
    lastmod: "2026-09-29",
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
    lastmod: "2026-09-29",
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
    lastmod: "2026-09-29",
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
    lastmod: "2026-09-29",
    schema: {
      "@type": "SoftwareApplication",
      name: DECK.h1,
      applicationCategory: "BusinessApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    breadcrumbs: DECK.breadcrumb,
    faqs: DECK.faqs,
    howTo: DECK.howTo,
  },
  {
    path: "/pressure-washing-pricing-guide",
    title: "Pressure Washing Pricing Guide (2026) — WashCalc",
    description: "How to price pressure washing jobs in 2026. Average cost per square foot, pricing by surface (deck, roof, driveway), labor and chemical costs, plus common mistakes to avoid.",
    canonical: "https://washcalc.app/pressure-washing-pricing-guide",
    lastmod: "2026-09-29",
    breadcrumbs: [
      { name: "Home", url: "https://washcalc.app/" },
      { name: "Pressure Washing Pricing Guide", url: "https://washcalc.app/pressure-washing-pricing-guide" },
    ],
    faqs: PRICING_GUIDE_FAQS,
  },
  {
    path: "/quote-tool",
    title: "Power Washing Quote Tool — Build Profitable Estimates Fast | WashCalc",
    description: "A free power washing quote tool built for contractors. Price any job with the per-square-foot formula, itemize a professional estimate, and protect your margin on every quote.",
    canonical: "https://washcalc.app/quote-tool",
    lastmod: "2026-09-29",
    ogImage: "https://washcalc.app/og/quote-tool.png",
    schema: {
      "@type": "SoftwareApplication",
      name: "Power Washing Quote Tool",
      applicationCategory: "BusinessApplication",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    breadcrumbs: [
      { name: "Home", url: "https://washcalc.app/" },
      { name: "Power Washing Quote Tool", url: "https://washcalc.app/quote-tool" },
    ],
    faqs: QUOTE_TOOL_FAQS,
  },
  {
    path: "/about",
    title: "About WashCalc — Who Built It & How Pricing Works",
    description: "Who built WashCalc and why: the pricing pain pressure washing contractors face, the two-signal methodology behind every quote, and how to reach us.",
    canonical: "https://washcalc.app/about",
    lastmod: "2026-07-13",
    schema: {
      "@type": "AboutPage",
      name: "About WashCalc",
      publisher: { "@type": "Organization", name: "Lamill", url: "https://lamill.io" },
      author: { "@type": "Organization", name: "Lamill", url: "https://lamill.io" },
    },
    breadcrumbs: [
      { name: "Home", url: "https://washcalc.app/" },
      { name: "About", url: "https://washcalc.app/about" },
    ],
  },
  // ── Phase 1.B — search-demand pages ────────────────────────────────
  // Built from src/pages/seoPages.js so the visible FAQ text on each page
  // and the FAQPage JSON-LD emitted here come from one source and cannot
  // drift apart. Only the estimate calculator declares SoftwareApplication
  // (it is the only one of the six that IS an application); the cost guides
  // and template pages carry FAQPage + BreadcrumbList only, and the quote
  // template adds HowTo because it renders those steps visibly.
  ...SEO_PAGES.map((pg) => ({
    path: pg.path,
    title: pg.title,
    description: pg.description,
    canonical: pg.canonical,
    lastmod: pg.lastmod || "2026-08-21",
    breadcrumbs: pg.breadcrumbs,
    faqs: pg.faqs,
    ...(pg === ESTIMATE_CALCULATOR
      ? {
          schema: {
            "@type": "SoftwareApplication",
            name: pg.h1,
            applicationCategory: "BusinessApplication",
            operatingSystem: "All",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          },
        }
      : {}),
    ...(pg.howTo ? { howTo: pg.howTo } : {}),
  })),

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
  if (route.howTo && route.howTo.steps && route.howTo.steps.length) {
    tags.push(jsonLdBlock({
      "@type": "HowTo",
      name: route.howTo.name,
      description: route.howTo.description,
      step: route.howTo.steps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.name,
        text: s.text,
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

    let html = template
      .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
      .replace(
        /<meta name="description" content=".*?"\s*\/>/,
        `<meta name="description" content="${route.description}" />`
      )
      .replace("</head>", `    ${perPageHead(route)}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    // Per-route social image: override the template's global og:image /
    // twitter:image so this route shares its own 1200×630 card.
    if (route.ogImage) {
      html = html
        .replace(
          /(<meta property="og:image" content=").*?(")/,
          `$1${route.ogImage}$2`
        )
        .replace(
          /(<meta name="twitter:image" content=").*?(")/,
          `$1${route.ogImage}$2`
        );
    }

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

  // Generate sitemap.xml from the indexable routes (everything with a
  // canonical and no noindex). lastmod is each route's last CONTENT change,
  // set by hand in ROUTES above — not the build date. Google only trusts
  // lastmod when it is consistently accurate; stamping every URL with
  // today's date on every build teaches it to ignore the field. Bump a
  // route's lastmod in the same change that alters what it renders.
  const sitemapUrls = ROUTES
    .filter((r) => r.canonical && !r.noindex)
    .map((r) => (
      `  <url>\n` +
      `    <loc>${r.canonical}</loc>\n` +
      (r.lastmod ? `    <lastmod>${r.lastmod}</lastmod>\n` : "") +
      `    <changefreq>monthly</changefreq>\n` +
      `  </url>`
    ))
    .join("\n");
  const sitemapXml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${sitemapUrls}\n` +
    `</urlset>\n`;
  fs.writeFileSync(path.resolve(__dirname, "dist/sitemap.xml"), sitemapXml);
  console.log(`  wrote sitemap.xml (${ROUTES.filter((r) => r.canonical && !r.noindex).length} urls)`);

  // clean up server bundle
  fs.rmSync(path.resolve(__dirname, "dist-server"), { recursive: true, force: true });
  console.log("done.");
}

prerender().catch((err) => {
  console.error(err);
  process.exit(1);
});
