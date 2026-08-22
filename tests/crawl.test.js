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

// ─── Expanded contractor pages: secondary tools + schema in static HTML ───────
//
// WHY: the deep house-washing/deck tools and the pillar FAQ are rendered by
// React. These tests prove their labels, headings, FAQ answers, and JSON-LD
// land in the prerendered HTML — i.e. a non-JS crawler sees them.

describe("House-washing page — secondary tools in static HTML", () => {
  let body;
  beforeAll(async () => { body = (await get("/calculators/house-washing")).body; });

  const MUST_CONTAIN = [
    "SH dilution calculator",              // tool 1 heading
    "Downstream injector ratio",           // tool 1 mode
    "Starting SH %",                       // tool 1 input label
    "House washing job profitability calculator", // tool 2 heading
    "Effective $/hr on site",              // tool 2 output label
    "Break-even price",                    // tool 2 output label
    "Regional house washing price benchmarks", // tool 3 heading
    "Soft-wash $/sq ft",                   // tool 3 derived column
    "High-cost urban",                     // tool 3 regional tier row (ampersand-free)
    "National baseline",                   // tool 3 baseline table caption
    "Source",                              // tool 3 source column
    "effective dollars per on-site hour",  // new FAQ answer (in static HTML)
  ];
  for (const frag of MUST_CONTAIN) {
    it(`contains "${frag}"`, () => {
      expect(body, `"${frag}" missing from prerendered /calculators/house-washing`).toContain(frag);
    });
  }

  it("ships SoftwareApplication JSON-LD", () => {
    expect(body).toContain('"@type":"SoftwareApplication"');
  });
  it("ships FAQPage JSON-LD", () => {
    expect(body).toContain('"@type":"FAQPage"');
  });
  it("ships BreadcrumbList JSON-LD", () => {
    expect(body).toContain('"@type":"BreadcrumbList"');
  });
  it("cross-links to /calculators/deck, pricing guide, and /quote-tool", () => {
    expect(body).toMatch(/href="\/calculators\/deck"/);
    expect(body).toMatch(/href="\/pressure-washing-pricing-guide"/);
    expect(body).toMatch(/href="\/quote-tool"/);
  });
});

describe("Deck page — secondary tools + HowTo in static HTML", () => {
  let body;
  beforeAll(async () => { body = (await get("/calculators/deck")).body; });

  const MUST_CONTAIN = [
    "Decking material",                    // material selector heading
    "Recommended PSI",                     // material selector spec
    "Safe PSI ceiling",                    // material selector spec
    "Hardwood / IPE",                      // a material option
    "seal coverage calculator",            // stain/seal heading (ampersand-free fragment)
    "Gallons needed",                      // stain/seal output
    "How to clean and seal a wood deck",   // timeline / HowTo name
    "Apply stain or sealer",               // HowTo step 3 name (visible + schema)
  ];
  for (const frag of MUST_CONTAIN) {
    it(`contains "${frag}"`, () => {
      expect(body, `"${frag}" missing from prerendered /calculators/deck`).toContain(frag);
    });
  }

  it("ships HowTo JSON-LD for the clean-and-seal sequence", () => {
    expect(body, "HowTo JSON-LD missing from /calculators/deck").toContain('"@type":"HowTo"');
    expect(body).toContain('"@type":"HowToStep"');
  });
  it("ships SoftwareApplication JSON-LD", () => {
    expect(body).toContain('"@type":"SoftwareApplication"');
  });
  it("cross-links to /calculators/house-washing, pricing guide, and /quote-tool", () => {
    expect(body).toMatch(/href="\/calculators\/house-washing"/);
    expect(body).toMatch(/href="\/pressure-washing-pricing-guide"/);
    expect(body).toMatch(/href="\/quote-tool"/);
  });
});

describe("Pricing guide — pillar page with FAQ + tool links in static HTML", () => {
  let body;
  beforeAll(async () => { body = (await get("/pressure-washing-pricing-guide")).body; });

  it("has no calculator form (pillar page, not a tool)", () => {
    expect(body, "Pricing guide should not embed a calculator form").not.toMatch(/wc-calc-grid/);
  });
  it("contains the pillar hub heading", () => {
    expect(body).toContain("Jump to a pricing tool");
  });
  it("contains a visible FAQ answer that matches the FAQPage schema", () => {
    expect(body).toContain("Reconcile two numbers and take the higher one");
  });
  it("ships FAQPage + BreadcrumbList JSON-LD", () => {
    expect(body).toContain('"@type":"FAQPage"');
    expect(body).toContain('"@type":"BreadcrumbList"');
  });
  it("links out to every calculator and the quote tool", () => {
    for (const href of [
      "/calculator", "/calculators/driveway", "/calculators/house-washing",
      "/calculators/roof", "/calculators/deck", "/quote-tool",
    ]) {
      expect(body, `pillar page missing link to ${href}`).toContain(`href="${href}"`);
    }
  });
});

// ─── Apex-canonical guard — no www canonicals may reappear ────────────────────
describe("Canonical host is non-www apex (regression guard)", () => {
  for (const path of ["/calculators/house-washing", "/calculators/deck", "/pressure-washing-pricing-guide"]) {
    it(`${path} canonical is https://washcalc.app (no www)`, async () => {
      const { body } = await get(path);
      const canon = body.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? "";
      expect(canon, `${path} missing canonical`).toBeTruthy();
      expect(canon, `${path} canonical must be apex, got ${canon}`).not.toContain("www.");
      expect(canon).toContain("https://washcalc.app");
    });
  }
});

// ─── Phase 1.B — search-demand pages ──────────────────────────────────────────
//
// WHY: six new URLs were added to capture validated search demand. These tests
// prove each one is a real prerendered page — reachable, uniquely titled,
// self-canonical on the apex, carrying its schema and its cross-links — rather
// than an SPA shell that only fills in once JavaScript runs.

const PHASE_1B = [
  {
    path: "/pressure-washing-estimate-calculator",
    h1: "Pressure Washing Estimate Calculator",
    mustContain: [
      "Build a multi-surface estimate",   // the tool heading
      "Add another surface",              // the add-line control
      "Bundle discount",                  // job-level input
      "Recommended estimate",             // summary row
      "Set by:",                          // which-signal-won label
      "Three worked estimates",           // worked examples section
    ],
    schema: ['"@type":"SoftwareApplication"', '"@type":"FAQPage"', '"@type":"BreadcrumbList"'],
    links: ["/calculator", "/pressure-washing-estimate-template", "/pressure-washing-quote-template", "/pressure-washing-pricing-guide"],
    hasForm: true,
  },
  {
    path: "/roof-cleaning-cost",
    h1: "Roof Cleaning Cost",
    mustContain: [
      "What roof cleaning costs in 2026",
      "What moves the price",
      "How contractors price roofs",
      "DIY versus professional",
      "Worked examples",
    ],
    schema: ['"@type":"FAQPage"', '"@type":"BreadcrumbList"'],
    links: ["/calculators/roof", "/house-washing-cost", "/pressure-washing-estimate-calculator"],
    hasForm: false,
  },
  {
    path: "/driveway-pressure-washing-cost",
    h1: "Driveway Pressure Washing Cost",
    mustContain: [
      "What driveway pressure washing costs in 2026",
      "Pricing models and why the minimum exists",
      "A long driveway with oil staining",
      "DIY versus professional",
    ],
    schema: ['"@type":"FAQPage"', '"@type":"BreadcrumbList"'],
    links: ["/calculator", "/house-washing-cost", "/roof-cleaning-cost"],
    hasForm: false,
  },
  {
    path: "/house-washing-cost",
    h1: "House Washing Cost",
    mustContain: [
      "What house washing costs in 2026",
      "Measuring siding area properly",
      "Siding material and storey count",
      "A two-storey home, two-person crew",
    ],
    schema: ['"@type":"FAQPage"', '"@type":"BreadcrumbList"'],
    links: ["/calculators/house-washing", "/roof-cleaning-cost", "/driveway-pressure-washing-cost"],
    hasForm: false,
  },
  {
    path: "/pressure-washing-quote-template",
    h1: "Pressure Washing Quote Template",
    mustContain: [
      "SCOPE OF WORK — FIXED PRICE",   // the template body itself, in static HTML
      "NOT INCLUDED — EXCLUSIONS",
      "ACCEPTANCE",
      "Every field explained",
      "How to write a pressure washing quote",
      "A filled-in example",
    ],
    schema: ['"@type":"FAQPage"', '"@type":"BreadcrumbList"', '"@type":"HowTo"', '"@type":"HowToStep"'],
    links: ["/pressure-washing-estimate-template", "/pressure-washing-estimate-calculator", "/quote-tool"],
    hasForm: true, // <textarea>
  },
  {
    path: "/pressure-washing-estimate-template",
    h1: "Pressure Washing Estimate Template",
    mustContain: [
      "PRELIMINARY ESTIMATE",
      "ASSUMPTIONS THIS ESTIMATE DEPENDS ON",
      "WHAT WOULD MOVE THE PRICE",
      "Setting the range honestly",
      "Converting it into a quote",
    ],
    schema: ['"@type":"FAQPage"', '"@type":"BreadcrumbList"'],
    links: ["/pressure-washing-quote-template", "/pressure-washing-estimate-calculator", "/house-washing-cost"],
    hasForm: true, // <textarea>
  },
];

describe("Phase 1.B pages — initial HTML (no JS)", () => {
  let homePage;
  beforeAll(async () => { homePage = await get("/"); });

  for (const route of PHASE_1B) {
    describe(route.path, () => {
      let page;
      beforeAll(async () => { page = await get(route.path); });

      it("returns HTTP 200", () => {
        expect(page.status, `${route.path} returned ${page.status} — route missing or not prerendered`).toBe(200);
      });

      it("body is at least 8 KB — these are thick pages, not stubs", () => {
        expect(
          page.body.length,
          `${route.path} is only ${page.body.length} bytes. Either prerendering regressed or the ` +
            "page shipped thin. Both are SEO failures."
        ).toBeGreaterThan(8000);
      });

      it(`renders its own <h1>: "${route.h1}"`, () => {
        const h1 = page.body.match(/<h1[^>]*>(.*?)<\/h1>/s)?.[1]?.replace(/<[^>]+>/g, "") ?? "";
        expect(h1, `${route.path} h1 is "${h1}", expected "${route.h1}"`).toContain(route.h1);
      });

      it("has a <title> unique from the homepage", () => {
        const t = extractTitle(page.body);
        expect(t, `${route.path} is missing a <title>`).toBeTruthy();
        expect(t, `${route.path} reuses the homepage title`).not.toBe(extractTitle(homePage.body));
      });

      it("has a meta description unique from the homepage", () => {
        const d = extractDescription(page.body);
        expect(d, `${route.path} is missing a meta description`).toBeTruthy();
        expect(d, `${route.path} reuses the homepage description`).not.toBe(extractDescription(homePage.body));
      });

      it("is self-canonical on the non-www apex", () => {
        const canon = page.body.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? "";
        expect(canon, `${route.path} missing canonical`).toBe(`https://washcalc.app${route.path}`);
      });

      for (const frag of route.mustContain) {
        it(`contains "${frag}" in prerendered HTML`, () => {
          expect(page.body, `"${frag}" missing from ${route.path} — content not in static HTML`).toContain(frag);
        });
      }

      for (const s of route.schema) {
        it(`ships ${s} JSON-LD`, () => {
          expect(page.body, `${route.path} missing ${s}`).toContain(s);
        });
      }

      it("does NOT ship schema it cannot support", () => {
        // Cost guides and the estimate template are not applications and have no
        // visible step-by-step procedure — declaring either would be false markup.
        if (!route.schema.includes('"@type":"SoftwareApplication"')) {
          expect(page.body, `${route.path} declares SoftwareApplication but is not an app`).not.toContain('"@type":"SoftwareApplication"');
        }
        if (!route.schema.includes('"@type":"HowTo"')) {
          expect(page.body, `${route.path} declares HowTo without a visible step sequence`).not.toContain('"@type":"HowTo"');
        }
      });

      it("renders a visible FAQ answer that matches its FAQPage schema", () => {
        const first = page.body.match(/"@type":"FAQPage","mainEntity":\[\{"@type":"Question","name":"([^"]+)"/)?.[1];
        expect(first, `${route.path} FAQPage schema has no questions`).toBeTruthy();
        const decoded = first.replace(/&quot;/g, '"').replace(/\\"/g, '"');
        expect(
          page.body.replace(/&#x27;|&#39;/g, "'"),
          `${route.path} first FAQ question is in schema but not visible on the page — Google flags this mismatch`
        ).toContain(decoded.slice(0, 40));
      });

      for (const href of route.links) {
        it(`links to ${href}`, () => {
          expect(page.body, `${route.path} is missing a crawlable link to ${href}`).toContain(`href="${href}"`);
        });
      }

      it(route.hasForm ? "contains interactive tool markup" : "contains no calculator form (it is a guide)", () => {
        if (route.hasForm) {
          expect(page.body, `${route.path} should carry an interactive tool`).toMatch(/<input|<select|<textarea/i);
        } else {
          expect(page.body, `${route.path} is a cost guide and must not embed a calculator form`).not.toMatch(/wc-calc-grid|wc-eb-lines/);
        }
      });

      it("has breadcrumbs in the visible HTML", () => {
        expect(page.body, `${route.path} missing visible breadcrumb nav`).toContain("wc-breadcrumbs");
      });
    });
  }

  it("every Phase 1.B URL is listed in sitemap.xml", async () => {
    const sm = await get("/sitemap.xml");
    for (const route of PHASE_1B) {
      expect(
        sm.body,
        `sitemap.xml is missing ${route.path} — the page will not be submitted to Google`
      ).toContain(`https://washcalc.app${route.path}</loc>`);
    }
  });

  it("all page titles across the site are unique — no cannibalization by title", async () => {
    const paths = [
      "/", "/calculator", "/calculators/driveway", "/calculators/roof",
      "/calculators/house-washing", "/calculators/deck",
      "/pressure-washing-pricing-guide", "/quote-tool", "/about",
      ...PHASE_1B.map((r) => r.path),
    ];
    const titles = await Promise.all(paths.map(async (p) => [p, extractTitle((await get(p)).body)]));
    const seen = new Map();
    for (const [p, t] of titles) {
      expect(seen.has(t), `Duplicate <title> "${t}" on ${p} and ${seen.get(t)} — two pages targeting one query`).toBe(false);
      seen.set(t, p);
    }
  });
});

// ─── Indexed-page protection ──────────────────────────────────────────────────
//
// WHY: /, /calculators/driveway and /about are `submitted_indexed` in Google
// Search Console. Phase 1.B was explicitly scoped to add new URLs without
// touching them. These guards fail if a later change alters their title, H1 or
// canonical — the three signals that would cost existing rankings.

describe("Indexed pages — protected signals unchanged", () => {
  const PROTECTED = [
    { path: "/", title: "Free Pressure Washing Cost Calculator — WashCalc", canonical: "https://washcalc.app/" },
    { path: "/calculators/driveway", title: "Driveway Cleaning Cost Calculator — WashCalc", canonical: "https://washcalc.app/calculators/driveway" },
    { path: "/about", title: "About WashCalc — Who Built It & How Pricing Works", canonical: "https://washcalc.app/about" },
  ];

  for (const p of PROTECTED) {
    it(`${p.path} keeps its indexed <title>`, async () => {
      const { body } = await get(p.path);
      const t = extractTitle(body).replace(/&amp;/g, "&");
      expect(
        t,
        `${p.path} is indexed in GSC and its title changed to "${t}". Changing the title of an ` +
          "indexed page risks its existing rankings and was out of scope for this phase."
      ).toBe(p.title);
    });

    it(`${p.path} keeps its canonical`, async () => {
      const { body } = await get(p.path);
      const canon = body.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? "";
      expect(canon, `${p.path} canonical changed — indexed URL must stay stable`).toBe(p.canonical);
    });
  }
});
