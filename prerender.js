import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROUTES = [
  {
    path: "/",
    title: "WashCalc — Pressure Washing Cost Calculator & Quoting Tool",
    description: "Pressure washing pricing calculator for faster, more profitable quotes.",
    canonical: "https://www.washcalc.app/",
  },
  {
    path: "/calculator",
    title: "Pressure Washing Cost Calculator — WashCalc",
    description: "Free pressure washing cost calculator. Estimate job price, labor time, cost and profit for driveways, roofs, house washing, decks and more.",
    canonical: "https://www.washcalc.app/calculator",
  },
  {
    path: "/calculators/driveway",
    title: "Driveway Cleaning Cost Calculator — WashCalc",
    description: "Estimate driveway cleaning price per square foot. Get recommended price, labor time and gross profit instantly.",
    canonical: "https://www.washcalc.app/calculators/driveway",
  },
  {
    path: "/calculators/roof",
    title: "Roof Cleaning Cost Calculator — WashCalc",
    description: "Soft-wash roof cleaning calculator. Estimate price, labor time and profit per square foot.",
    canonical: "https://www.washcalc.app/calculators/roof",
  },
  {
    path: "/calculators/house-washing",
    title: "House Washing Cost Calculator — WashCalc",
    description: "Estimate house washing cost. Vinyl, brick or stucco — get recommended price, labor time and profit.",
    canonical: "https://www.washcalc.app/calculators/house-washing",
  },
  {
    path: "/calculators/deck",
    title: "Deck Cleaning Cost Calculator — WashCalc",
    description: "Wood and composite deck cleaning calculator. Estimate price, labor time and profit per square foot.",
    canonical: "https://www.washcalc.app/calculators/deck",
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
