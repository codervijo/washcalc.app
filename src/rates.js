// Single source of truth for every per-surface rate the site states.
// Plain ESM (no JSX) so prerender.js can import it for FAQPage JSON-LD.
//
// Two tiers, always labelled on the page — never mixed:
//
//  • MODEL — WashCalc's own rate card. `baseRate` and `sqftPerHour` drive the
//    pricing engine; `band` is the per-sq-ft range the calculators and
//    "typical" copy quote. These are WashCalc modelling assumptions, not
//    survey data.
//
//  • PUBLISHED — third-party national ranges, reproduced as the named source
//    publishes them (measurement basis is the source's own).
//
// Production rates are LIGHT-condition figures. The engine divides them by
// the condition's timeMult, so moderate/heavy production is slower — use
// productionRate(id, conditionId) in copy rather than quoting sqftPerHour
// as a moderate figure.

export const SURFACES = [
  { id: "driveway", label: "Driveway",     emoji: "🚗", baseRate: 0.22, sqftPerHour: 450, band: [0.20, 0.25] },
  { id: "siding",   label: "House Siding", emoji: "🏠", baseRate: 0.30, sqftPerHour: 350, band: [0.25, 0.35] },
  { id: "roof",     label: "Roof",         emoji: "🏚️", baseRate: 0.50, sqftPerHour: 250, band: [0.40, 0.60] },
  { id: "deck",     label: "Deck",         emoji: "🪵", baseRate: 0.38, sqftPerHour: 220, band: [0.30, 0.45],
    // Deck sub-bands by board type (model).
    wood: [0.35, 0.45], composite: [0.30, 0.38] },
  { id: "patio",    label: "Patio",        emoji: "🧱", baseRate: 0.25, sqftPerHour: 400, band: [0.20, 0.30] },
  { id: "fence",    label: "Fence",        emoji: "🪚", baseRate: 0.32, sqftPerHour: 280, band: [0.25, 0.40] },
];

export const CONDITIONS = [
  { id: "light",    label: "Light",    multiplier: 1.0, timeMult: 1.0 },
  { id: "moderate", label: "Moderate", multiplier: 1.2, timeMult: 1.25 },
  { id: "heavy",    label: "Heavy",    multiplier: 1.5, timeMult: 1.6 },
];

export const PUBLISHED = {
  driveway:        { perSqFt: [0.20, 0.35], job: [100, 300], source: "HomeGuide, Angi" },
  sidingSoftWash:  { perSqFt: [0.25, 0.75], source: "HomeGuide" },
  sidingPressure:  { perSqFt: [0.15, 0.50], source: "HomeGuide" },
  house:           { job: [100, 711], avg: 311, source: "Angi" },
  roof:            { perSqFt: [0.40, 0.60], job: [300, 700], source: "HomeGuide, Angi" },
  deck:            { perSqFt: [0.30, 0.60], job: [150, 400], source: "HomeGuide, Angi, Housecall Pro" },
  commercial:      { perSqFt: [0.10, 0.40], source: "HomeGuide, Angi, Housecall Pro" },
};

// Typical job sizes (sq ft of the surface cleaned) used for the $ anchors in
// copy. The $ figure is always area × model band — see anchorPrice().
export const ANCHORS = {
  driveway:       [800, 1000],   // residential driveway surface
  sidingOneStory: [1000, 1300],  // siding (wall) area, typical single-story
  sidingTwoStory: [1600, 2000],  // siding (wall) area, typical two-story
  roof:           [1500, 1500],  // roof surface
};

// ── helpers ────────────────────────────────────────────────────────────
export function surface(id) {
  return SURFACES.find((s) => s.id === id);
}

const cents = (n) => `$${n.toFixed(2)}`;
const dollars = (n) => `$${n.toLocaleString("en-US")}`;
const range = ([lo, hi], fmt) => `${fmt(lo)}–${fmt(hi)}`;

/** Model band, e.g. band("driveway") → "$0.20–$0.25". */
export const band = (id) => range(surface(id).band, cents);
/** Any [lo, hi] per-sq-ft pair → "$0.20–$0.35". */
export const rateRange = (pair) => range(pair, cents);
/** Any [lo, hi] dollar pair → "$100–$300". */
export const jobRange = (pair) => range(pair, dollars);
/** Base rate, e.g. base("roof") → "$0.50". */
export const base = (id) => cents(surface(id).baseRate);
/** Model band midpoint (number). */
export const bandMid = (id) => (surface(id).band[0] + surface(id).band[1]) / 2;
/** Production in sq ft/hr for a condition, rounded to the nearest 10. */
export function productionRate(id, conditionId = "light") {
  const c = CONDITIONS.find((x) => x.id === conditionId);
  return Math.round(surface(id).sqftPerHour / c.timeMult / 10) * 10;
}
/** Model bands across all surfaces, e.g. "$0.20–$0.60". */
export const allBands = () =>
  range([Math.min(...SURFACES.map((s) => s.band[0])), Math.max(...SURFACES.map((s) => s.band[1]))], cents);
/** "$250–$455": anchor area × model band for a surface. */
export function anchorPrice(anchorKey, surfaceId) {
  const [a0, a1] = ANCHORS[anchorKey];
  const [r0, r1] = surface(surfaceId).band;
  return jobRange([Math.round(a0 * r0), Math.round(a1 * r1)]);
}
/** "1,000–1,300" (or "1,500" when both ends match). */
export function anchorArea(anchorKey) {
  const [a0, a1] = ANCHORS[anchorKey];
  return a0 === a1 ? a0.toLocaleString("en-US") : `${a0.toLocaleString("en-US")}–${a1.toLocaleString("en-US")}`;
}

// ── v1.E — named third-party sources, quoted as published ──────────────
// Each figure below is copied from the cited page (checked 2026-11-11).
// Render the source name + date beside any figure taken from here.
export const SOURCES = {
  homeguideCommercial: {
    name: "HomeGuide",
    title: "How much are commercial pressure washing prices?",
    date: "October 9, 2025",
    url: "https://homeguide.com/costs/commercial-pressure-washing-prices",
  },
  homeguideResidential: {
    name: "HomeGuide",
    title: "Pressure washing prices",
    date: "April 19, 2024",
    url: "https://homeguide.com/costs/pressure-washing-prices",
  },
  housecallPro: {
    name: "Housecall Pro",
    title: "How to price pressure washing jobs",
    date: "October 2026",
    url: "https://www.housecallpro.com/resources/how-to-price-pressure-washing-jobs/",
  },
};

// HomeGuide commercial tables (homeguideCommercial).
export const COMMERCIAL = {
  overallPerSqFt: [0.10, 1.00],
  flatFeeRange: [200, 3000],
  byJob: [
    { job: "Basic commercial",          price: "$0.10–$0.35 per sq ft", uses: "Sidewalks, storefronts, exterior walls" },
    { job: "Intensive commercial",      price: "$0.40–$1.00 per sq ft", uses: "Grease, graffiti, heavy staining" },
    { job: "Hourly rate",               price: "$50–$150 per hour",     uses: "Inaccessible or mixed-area jobs" },
    { job: "Flat fee (small area)",     price: "$200–$500",             uses: "Areas under 2,000 sq ft" },
    { job: "Flat fee (large property)", price: "$600–$3,000+",          uses: "Plazas, business parks, custom quotes" },
    { job: "Monthly service contract",  price: "$100–$600 per month",   uses: "Based on size and needs" },
  ],
  bySurface: [
    { surface: "Sidewalks & walkways", price: "$0.10–$0.30 per sq ft", lo: 0.10, hi: 0.30 },
    { surface: "Building exteriors",   price: "$0.15–$0.90 per sq ft", lo: 0.15, hi: 0.90 },
    { surface: "Dumpster pads",        price: "$0.75–$1.00 per sq ft", lo: 0.75, hi: 1.00 },
    { surface: "Parking garages",      price: "$0.10–$0.25 per sq ft", lo: 0.10, hi: 0.25 },
    { surface: "Parking lots",         price: "$8–$20 per space",      lo: 8,    hi: 20, perSpace: true },
  ],
};

// Housecall Pro per-sq-ft by surface material (housecallPro).
export const PER_SQFT_BY_MATERIAL = [
  { material: "Concrete (driveways, patios, walkways)", lo: 0.20, hi: 0.40 },
  { material: "Brick",        lo: 0.10, hi: 0.40 },
  { material: "Vinyl siding", lo: 0.20, hi: 0.50 },
  { material: "Stucco",       lo: 0.30, hi: 0.50 },
  { material: "Wood",         lo: 0.30, hi: 0.55 },
  { material: "Roof",         lo: 0.50, hi: 1.00 },
];

// HomeGuide residential deck figures (homeguideResidential).
export const DECK_PUBLISHED = {
  job: [120, 240],            // average cost to power wash a deck
  typicalPerSqFt: 0.35,       // "most homeowners paying around"
  washStainSeal: [0.50, 1.50],// power wash + stain + seal, per sq ft
  lattice: [0.85, 0.95],      // per sq ft
  underside: 1.50,            // per sq ft
  hcpJob: [100, 250],         // Housecall Pro: decks run $100–$250
};

// Hourly rates as published.
export const HOURLY = {
  homeguideResidential: [50, 160],  // "$50 to $160 per hour"
  hcpResidential: [50, 100],        // per crew member
  hcpCommercial: [50, 150],
};

// HomeGuide pressure-washer rental, per day (homeguideResidential table).
export const RENTAL_PER_DAY = [75, 180];
