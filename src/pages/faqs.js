// FAQ sets rendered visibly on /, /quote-tool and /calculator AND emitted as
// FAQPage JSON-LD by prerender.js — one source so schema and page can't drift.
// Rates come from src/rates.js.
import { band, rateRange, allBands, PUBLISHED } from "../rates.js";

export const LANDING_FAQS = [
  { q: "How much should I charge for pressure washing?",
    a: `On WashCalc's rate card, most surfaces price at ${allBands()} per square foot depending on surface and condition. Driveways are ${band("driveway")}/sq ft and roofs ${band("roof")}/sq ft. WashCalc combines a per-surface base rate with your real labor, chemical and travel cost so you never quote below profitability.` },
  { q: "How does WashCalc estimate labor time?",
    a: "Each surface has a typical productivity rate in square feet per hour. We multiply by a condition factor (light, moderate, heavy) so a heavily-soiled deck takes longer than a fresh one." },
  { q: "What is a healthy gross margin for pressure washing?",
    a: "40–60% gross margin is a common target for solo and small-crew operators. WashCalc lets you set a target margin and protects it automatically." },
  { q: "Does this replace a CRM or invoicing tool?",
    a: "No — WashCalc is a focused pricing tool. Saved quotes, PDF export and lead capture are on the roadmap." },
  { q: "Can I use this on mobile?",
    a: "Yes. The calculator is fully responsive — use it on the truck, on the lawn, or at the kitchen table." },
];

export const QUOTE_TOOL_FAQS = [
  {
    q: "Is WashCalc's quote tool free?",
    a: "Yes. The calculator is free to use on any device. Saved quotes, branded PDF export, and lead capture are on the roadmap for WashCalc Pro.",
    open: true,
  },
  {
    q: "How much should I charge for power washing in 2026?",
    a: `Published national guides put most surfaces at ${rateRange([PUBLISHED.sidingPressure.perSqFt[0], PUBLISHED.sidingSoftWash.perSqFt[1]])} per square foot (${PUBLISHED.sidingSoftWash.source}), or $60–$160 per hour, depending on surface, region, and condition. WashCalc's own rate card is narrower: driveways ${band("driveway")} (published: ${rateRange(PUBLISHED.driveway.perSqFt)}, ${PUBLISHED.driveway.source}), roofs ${band("roof")}. Use the formula above to find your own profitable floor, then benchmark against local rates.`,
  },
  {
    q: "What's the difference between a pressure wash and a soft wash quote?",
    a: "Soft washing uses low pressure and cleaning solution and is required for siding, roofs, and most painted or delicate surfaces. It usually costs 10–20% more than concrete pressure washing because of chemical cost. Always note the method per line so the customer knows what they're getting.",
  },
  {
    q: "Should I quote per square foot, flat rate, or hourly?",
    a: "Use all three. Per-square-foot for commercial and large flat surfaces, flat-rate for standard residential jobs customers want simple pricing on, and hourly for unusual one-offs. Matching the model to the job is how top operators price higher and still win.",
  },
  {
    q: "What should a power washing estimate include?",
    a: "Your business and contact info, the client's name and service address, a unique estimate number and valid-until date, an itemized line per surface with square footage and method, optional add-ons, and clear terms — payment, deposit, weather reschedule, and exclusions.",
  },
  {
    q: "How fast should I send a quote?",
    a: "Same day, or within 24 hours. Fresh impressions approve faster, and for commercial work the first complete, professional estimate usually wins the contract.",
  },
];

export const ALLSURFACE_FAQS = [
  { q: "What's a fair price per square foot for pressure washing?",
    a: `On WashCalc's rate card, driveways run ${band("driveway")}/sq ft, house siding ${band("siding")}, roofs ${band("roof")}, decks ${band("deck")}, patios ${band("patio")} and fences ${band("fence")}. Published national ranges are wider — driveways ${rateRange(PUBLISHED.driveway.perSqFt)} (${PUBLISHED.driveway.source}), for example.` },
  { q: "How is labor time estimated?",
    a: "Each surface has a productivity rate in sq ft per hour. We multiply by a condition factor — heavy soil takes 60% longer than light." },
  { q: "Why does the price sometimes jump?",
    a: "WashCalc enforces your target margin. If your costs (labor, chemical, travel) exceed the rate-based price, we raise the price to protect profit." },
];
