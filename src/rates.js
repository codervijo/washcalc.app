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
