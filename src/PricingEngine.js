// WashCalc pricing engine — pure functions, easy to extend.

// Rates live in rates.js (single source of truth for engine + page copy).
import { SURFACES, CONDITIONS } from "./rates.js";
export { SURFACES, CONDITIONS };

export function getSurface(id) {
  return SURFACES.find((s) => s.id === id) || SURFACES[0];
}
export function getCondition(id) {
  return CONDITIONS.find((c) => c.id === id) || CONDITIONS[0];
}

function num(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

/**
 * Calculate a quote.
 * inputs: {
 *   surfaceId, conditionId, area, laborRate, chemicalCost, travelCost,
 *   marginPct, minimumCharge, materialMultiplier
 * }
 * materialMultiplier (optional, default 1) scales the rate-based price —
 * used by the deck material selector (e.g. hardwood/IPE costs more to clean
 * carefully than composite). Never zeroes the price.
 */
export function calculateQuote(inputs) {
  const surface = getSurface(inputs.surfaceId);
  const condition = getCondition(inputs.conditionId);

  const area         = num(inputs.area, 0);
  const laborRate    = num(inputs.laborRate, 0);
  const chemicalCost = num(inputs.chemicalCost, 0);
  const travelCost   = num(inputs.travelCost, 0);
  const marginPct    = Math.min(95, Math.max(0, num(inputs.marginPct, 40)));
  const minCharge    = num(inputs.minimumCharge, 0);
  const materialMult = num(inputs.materialMultiplier, 1) || 1;

  // Estimated hours: area / sqftPerHour, scaled by condition difficulty
  const baseHours = area > 0 ? area / surface.sqftPerHour : 0;
  const hours = baseHours * condition.timeMult;

  const laborCost = hours * laborRate;
  const totalCost = laborCost + chemicalCost + travelCost;

  // Two pricing signals:
  // 1) base by surface rate × area × condition multiplier
  // 2) cost-plus margin: cost / (1 - margin)
  const ratePrice   = area * surface.baseRate * condition.multiplier * materialMult;
  const marginDenom = Math.max(0.05, 1 - marginPct / 100);
  const costPlusPrice = totalCost / marginDenom;

  let recommendedPrice = Math.max(ratePrice, costPlusPrice);
  if (minCharge > 0) recommendedPrice = Math.max(recommendedPrice, minCharge);

  const grossProfit = recommendedPrice - totalCost;
  const pricePerSqFt = area > 0 ? recommendedPrice / area : 0;
  const effectiveMargin = recommendedPrice > 0 ? (grossProfit / recommendedPrice) * 100 : 0;

  return {
    hours,
    laborCost,
    totalCost,
    recommendedPrice,
    grossProfit,
    pricePerSqFt,
    effectiveMargin,
    surface,
    condition,
  };
}

export function formatMoney(n) {
  if (!Number.isFinite(n)) return "$0";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}
export function formatMoney2(n) {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
export function formatHours(h) {
  if (!Number.isFinite(h) || h <= 0) return "0 hrs";
  if (h < 1) return `${Math.round(h * 60)} min`;
  return `${h.toFixed(1)} hrs`;
}
