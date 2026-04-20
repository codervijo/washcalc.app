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

// use redirect:"manual" to inspect 3xx without following
async function getNoFollow(path) {
  const res = await fetch(`${BASE}${path}`, { redirect: "manual" });
  const body = res.status < 300 || res.status >= 400 ? await res.text() : "";
  return {
    status: res.status,
    location: res.headers.get("location") || "",
    body,
  };
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

// ─── 404 handling ─────────────────────────────────────────────────────────────
//
// WHY: every URL previously returned 200 (soft-404). Google interprets a 200
// response as a valid page and may index junk URLs, creating duplicate-content
// issues and wasting crawl budget. Real 404s tell Google to stop crawling those
// paths immediately.

describe("404 — unknown routes return real 404, not soft-404", () => {
  it("GET /this-route-does-not-exist returns 404", async () => {
    const page = await getNoFollow("/this-route-does-not-exist");
    expect(
      page.status,
      "Soft-404 detected: /this-route-does-not-exist returned 200 instead of 404. " +
        "Google will attempt to index this URL and every other junk URL it discovers."
    ).toBe(404);
  });

  it("GET /another-fake-route-xyz returns 404", async () => {
    const page = await getNoFollow("/another-fake-route-xyz");
    expect(
      page.status,
      "Soft-404 detected: /another-fake-route-xyz returned 200. " +
        "The catch-all route is not returning real 404 status codes."
    ).toBe(404);
  });

  it("404 page HTML contains <meta name=\"robots\" content=\"noindex\">", async () => {
    const page = await get("/this-route-does-not-exist");
    expect(
      page.body,
      'The 404 page is missing <meta name="robots" content="noindex">. ' +
        "Without noindex, any URL Google already crawled with a 200 (before this fix) " +
        "will remain in the index even after it starts returning 404."
    ).toMatch(/name="robots"[^>]*noindex|noindex[^>]*name="robots"/i);
  });

  it("404 page has its own <title> — not the homepage title", async () => {
    const home = await get("/");
    const notFound = await get("/this-route-does-not-exist");
    const homeTitle = home.body.match(/<title>([^<]+)<\/title>/)?.[1] ?? "";
    const nfTitle = notFound.body.match(/<title>([^<]+)<\/title>/)?.[1] ?? "";
    expect(nfTitle, "404 page is missing a <title> tag").toBeTruthy();
    expect(
      nfTitle,
      `404 page has the same <title> as the homepage ("${homeTitle}") — ` +
        "crawlers and users cannot distinguish it from a real page."
    ).not.toBe(homeTitle);
  });

  it("404 page body contains 'not found' or '404'", async () => {
    const page = await get("/this-route-does-not-exist");
    expect(
      page.body.toLowerCase(),
      "404 page body should contain 'not found' or '404' to clearly signal to users and crawlers"
    ).toMatch(/not found|404/);
  });

  it("404 page contains a link back to the homepage", async () => {
    const page = await get("/this-route-does-not-exist");
    expect(
      page.body,
      "404 page has no link back to the homepage — users who land on a dead URL have no recovery path"
    ).toMatch(/href="\//);
  });
});

// ─── Short-form 301 redirects ─────────────────────────────────────────────────
//
// WHY: /driveway is a natural short URL users and other sites might link to.
// We 301 it to the canonical long-form so link equity flows to one URL and
// Google doesn't index both as separate pages.

describe("Short-form surface route redirects (301)", () => {
  const REDIRECTS = [
    { from: "/driveway",      to: "/calculators/driveway" },
    { from: "/roof",          to: "/calculators/roof" },
    { from: "/house-washing", to: "/calculators/house-washing" },
    { from: "/deck",          to: "/calculators/deck" },
  ];

  for (const { from, to } of REDIRECTS) {
    it(`GET ${from} → 301 to ${to}`, async () => {
      const res = await getNoFollow(from);
      expect(
        res.status,
        `${from} returned ${res.status} instead of 301. ` +
          "If this route returns 200, Google may index both the short and long form as duplicates. " +
          "If it returns 404, inbound links to the short URL are wasted."
      ).toBe(301);
      expect(
        res.location,
        `${from} redirects to "${res.location}" instead of "${to}". ` +
          "Link equity will flow to the wrong canonical URL."
      ).toContain(to);
    });
  }
});

// ─── Trailing-slash redirect ──────────────────────────────────────────────────
//
// WHY: /calculator and /calculator/ would be indexed as two separate pages with
// duplicate content if both return 200. One canonical form must redirect the other.

describe("Trailing-slash redirect (no trailing slash is canonical)", () => {
  it("GET /calculator/ → 301 to /calculator", async () => {
    const res = await getNoFollow("/calculator/");
    expect(
      res.status,
      "/calculator/ returned " + res.status + " instead of 301. " +
        "Both /calculator and /calculator/ returning 200 creates duplicate-content risk."
    ).toBe(301);
    expect(
      res.location,
      "/calculator/ should redirect to /calculator (no trailing slash)"
    ).toMatch(/\/calculator$/);
  });
});
