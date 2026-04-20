/**
 * Crawl tests — verify what a non-JS crawler (Googlebot) sees on first request.
 *
 * WHY THESE EXIST
 * ---------------
 * washcalc.app is a Vite SPA. Without build-time prerendering the initial HTML
 * is an empty shell: Googlebot receives <div id="root"></div> and cannot index
 * any content. When that regression happens organic traffic collapses silently
 * because the site appears to work fine in a browser.
 *
 * These tests fetch pages with plain HTTP fetch — zero JavaScript execution —
 * exactly as Googlebot and other crawlers see them. They are deliberately NOT
 * Playwright/E2E tests. The calculator math has its own unit tests; these tests
 * only care about what lands in the initial HTML response.
 *
 * HOW TO RUN
 * ----------
 *   pnpm test:crawl          — full build + serve + test + teardown
 *   CRAWL_PORT=4200 pnpm test:crawl   — use a different port
 *
 * The test suite expects a running production server. `test:crawl` handles
 * lifecycle automatically via start-server-and-test.
 */

import { describe, it, expect, beforeAll } from "vitest";

const PORT = process.env.CRAWL_PORT || 4173;
const BASE = `http://localhost:${PORT}`;

async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  const body = await res.text();
  return { status: res.status, type: res.headers.get("content-type") || "", body };
}

// ─── Surface routes ───────────────────────────────────────────────────────────

const SURFACE_ROUTES = [
  {
    path: "/calculator",
    label: "All-surface calculator",
    titleFragment: "Pressure Washing Cost Calculator",
    bodyFragment: "Pressure Washing Cost Calculator",
  },
  {
    path: "/calculators/driveway",
    label: "Driveway",
    titleFragment: "Driveway Cleaning Cost Calculator",
    bodyFragment: "Driveway",
  },
  {
    path: "/calculators/roof",
    label: "Roof",
    titleFragment: "Roof Cleaning Cost Calculator",
    bodyFragment: "Roof",
  },
  {
    path: "/calculators/house-washing",
    label: "House washing",
    titleFragment: "House Washing Cost Calculator",
    bodyFragment: "House",
  },
  {
    path: "/calculators/deck",
    label: "Deck",
    titleFragment: "Deck Cleaning Cost Calculator",
    bodyFragment: "Deck",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function extractTitle(html) {
  return html.match(/<title>([^<]+)<\/title>/)?.[1] ?? "";
}

function extractDescription(html) {
  return html.match(/<meta name="description" content="([^"]+)"/i)?.[1] ?? "";
}

// ─── Homepage ────────────────────────────────────────────────────────────────

describe("Homepage — initial HTML (no JS)", () => {
  let page;
  beforeAll(async () => {
    page = await get("/");
  });

  it("returns HTTP 200 with Content-Type text/html", () => {
    expect(page.status, "Homepage did not return 200").toBe(200);
    expect(page.type, "Homepage Content-Type is not text/html").toContain("text/html");
  });

  it("body is at least 2 KB — catches empty-shell regression", () => {
    expect(
      page.body.length,
      `Homepage HTML is only ${page.body.length} bytes. ` +
        "This strongly suggests SSR/prerendering has regressed and the page is " +
        "shipping as a client-rendered shell again. Googlebot will see no content."
    ).toBeGreaterThan(2000);
  });

  it('contains site name "WashCalc"', () => {
    expect(page.body, '"WashCalc" not found in homepage HTML').toContain("WashCalc");
  });

  it("contains an <h1> element", () => {
    expect(page.body, "No <h1> found — page has no visible heading for crawlers").toMatch(/<h1[\s>]/i);
  });

  it('contains the word "calculator"', () => {
    expect(
      page.body.toLowerCase(),
      '"calculator" missing from homepage — primary keyword not in crawlable HTML'
    ).toContain("calculator");
  });

  it("contains at least one internal link to a surface route", () => {
    expect(
      page.body,
      "No internal links to /calculator* routes — crawlers cannot discover surface pages"
    ).toMatch(/href="\/calculator/);
  });

  it("has a <title> tag", () => {
    expect(extractTitle(page.body), "Missing <title> tag in initial HTML").toBeTruthy();
  });

  it("has <meta name=\"description\">", () => {
    expect(
      extractDescription(page.body),
      "Missing meta description in initial HTML"
    ).toBeTruthy();
  });

  it('has <link rel="canonical">', () => {
    expect(
      page.body,
      "Missing canonical link — crawlers cannot determine the preferred URL"
    ).toMatch(/<link rel="canonical"/i);
  });

  it("has JSON-LD with WebApplication or SoftwareApplication schema", () => {
    expect(
      page.body,
      'Missing <script type="application/ld+json"> tag'
    ).toContain("application/ld+json");
    expect(
      page.body,
      "JSON-LD block does not declare @type WebApplication or SoftwareApplication"
    ).toMatch(/WebApplication|SoftwareApplication/);
  });

  it("has Open Graph og:title", () => {
    expect(page.body, "Missing og:title meta property").toContain("og:title");
  });
});

// ─── Surface routes ───────────────────────────────────────────────────────────

describe("Surface routes — initial HTML (no JS)", () => {
  let homePage;
  beforeAll(async () => {
    homePage = await get("/");
  });

  for (const route of SURFACE_ROUTES) {
    describe(route.path, () => {
      let page;
      beforeAll(async () => {
        page = await get(route.path);
      });

      it("returns HTTP 200", () => {
        expect(
          page.status,
          `${route.path} returned ${page.status} — route is either missing or the server is misconfigured`
        ).toBe(200);
      });

      it("has a <title> unique from the homepage", () => {
        const homeTitle = extractTitle(homePage.body);
        const pageTitle = extractTitle(page.body);
        expect(pageTitle, `${route.path} is missing a <title> tag`).toBeTruthy();
        expect(
          pageTitle,
          `${route.path} has the same <title> as the homepage ("${homeTitle}") — ` +
            "per-page titles are not being injected during prerendering"
        ).not.toBe(homeTitle);
      });

      it("has a meta description unique from the homepage", () => {
        const homeDesc = extractDescription(homePage.body);
        const pageDesc = extractDescription(page.body);
        expect(pageDesc, `${route.path} is missing a meta description`).toBeTruthy();
        expect(
          pageDesc,
          `${route.path} shares the same meta description as the homepage — ` +
            "per-page descriptions are not being set during prerendering"
        ).not.toBe(homeDesc);
      });

      it(`contains "${route.titleFragment}" in body`, () => {
        expect(
          page.body,
          `"${route.titleFragment}" not found in ${route.path} — ` +
            "page body content may not be prerendered"
        ).toContain(route.titleFragment);
      });

      it("contains calculator form markup", () => {
        expect(
          page.body,
          `No form/input elements found in ${route.path} — ` +
            "calculator structure is missing from initial HTML"
        ).toMatch(/<input|<select|wc-field|wc-form/i);
      });
    });
  }
});

// ─── robots.txt ──────────────────────────────────────────────────────────────

describe("robots.txt", () => {
  let page;
  beforeAll(async () => {
    page = await get("/robots.txt");
  });

  it("returns HTTP 200", () => {
    expect(page.status, "robots.txt returned non-200 — crawlers cannot read it").toBe(200);
  });

  it("Content-Type is text/plain", () => {
    expect(
      page.type,
      "robots.txt should be served as text/plain"
    ).toContain("text/plain");
  });

  it("contains a Sitemap: directive", () => {
    expect(
      page.body,
      "robots.txt has no Sitemap: directive — GSC and crawlers cannot auto-discover the sitemap"
    ).toContain("Sitemap:");
  });

  it("does not block all crawlers with Disallow: /", () => {
    expect(
      page.body,
      'robots.txt contains "Disallow: /" which would block all crawlers from indexing the site'
    ).not.toMatch(/^Disallow:\s*\/\s*$/m);
  });
});

// ─── sitemap.xml ─────────────────────────────────────────────────────────────

describe("sitemap.xml", () => {
  let page;
  beforeAll(async () => {
    page = await get("/sitemap.xml");
  });

  it("returns HTTP 200", () => {
    expect(page.status, "sitemap.xml returned non-200").toBe(200);
  });

  it("is valid XML (has declaration and <urlset>)", () => {
    expect(page.body, "sitemap.xml missing XML declaration").toContain("<?xml");
    expect(page.body, "sitemap.xml missing <urlset> root element").toContain("<urlset");
  });

  const expectedRoutes = [
    "/",
    "/calculator",
    "/calculators/driveway",
    "/calculators/roof",
    "/calculators/house-washing",
    "/calculators/deck",
  ];

  for (const r of expectedRoutes) {
    it(`includes <loc> for ${r === "/" ? "homepage" : r}`, () => {
      expect(
        page.body,
        `sitemap.xml is missing a <loc> entry for ${r} — this route will not be submitted to Google`
      ).toContain(`washcalc.app${r === "/" ? "/" : r}`);
    });
  }
});

// ─── Unknown routes ───────────────────────────────────────────────────────────

describe("Unknown routes", () => {
  it("unknown route does not serve a falsely-rich prerendered page", async () => {
    // With Vercel SPA rewrites, unknown routes return 200 with the index.html
    // fallback — that is expected and acceptable. What we verify here is that
    // no ghost prerendered page was accidentally created for this path, which
    // would cause Google to index a duplicate at a junk URL.
    //
    // A prerendered page for a real route is >10 KB.
    // The SPA fallback shell (dist/index.html — our prerendered homepage) is
    // also large, so we can't distinguish by size alone.
    // Instead we verify that the response contains "WashCalc" (consistent shell)
    // but does NOT have a canonical pointing to this junk path.
    const page = await get("/this-route-does-not-exist-xyz");
    if (page.status === 404) {
      // Ideal — proper 404 means no soft-404 ghost indexing risk.
      return;
    }
    expect(page.status, "Unexpected status for unknown route").toBe(200);
    expect(
      page.body,
      "Unknown route canonical should not point to the junk path"
    ).not.toContain("/this-route-does-not-exist-xyz");
  });
});
