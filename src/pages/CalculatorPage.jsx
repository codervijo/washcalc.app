import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import CalculatorForm from "../components/CalculatorForm.jsx";
import ResultsPanel from "../components/ResultsPanel.jsx";
import FAQ from "../components/FAQ.jsx";
import RelatedTools from "../components/RelatedTools.jsx";
import { calculateQuote, formatMoney2 } from "../PricingEngine.js";
import useSEO from "../useSEO.js";
import { ALLSURFACE_FAQS as FAQS } from "./faqs.js";

// Factors for /calculator. Surface pages pass their own via preset.factors.
const DEFAULT_FACTORS = [
  { title: "Surface type", body: "Roofs and decks carry higher per-sq-ft rates than driveways because they are slower, more delicate or done at height." },
  { title: "Condition", body: "Heavy mildew, oil stains and algae mean more dwell time and chemical — the condition multiplier raises both price and hours." },
  { title: "Access & travel", body: "Long drives, second stories and tight access raise the real job cost. Put travel in the cost inputs so the floor covers it." },
];

const DEFAULT_VALUES = {
  surfaceId: "driveway",
  conditionId: "light",
  area: 800,
  // laborRate is a COST per crew-hour (wages + burden), not a billing rate —
  // the engine divides cost by (1 − margin). $35 matches EstimateBuilder.
  laborRate: 35,
  chemicalCost: 25,
  travelCost: 20,
  marginPct: 45,
  minimumCharge: 150,
};


/**
 * Reusable calculator page. Pass `preset` to lock surface and customize content.
 *  preset = {
 *    surfaceId, title, h1, description, intro, faqs, breadcrumb, lockSurface, surfaceOnly
 *  }
 *
 * Optional render slots (node, or a fn receiving { values, setValues, result }):
 *  heroExtra  — rendered inside the hero, directly under the calculator.
 *  belowHero  — rendered as its own section under the hero (secondary tools + copy).
 */
export default function CalculatorPage({ preset, heroExtra, belowHero }) {
  const initial = preset?.surfaceId
    ? { ...DEFAULT_VALUES, surfaceId: preset.surfaceId, ...(preset.defaults || {}) }
    : DEFAULT_VALUES;

  const [values, setValues] = useState(initial);
  const result = useMemo(() => calculateQuote(values), [values]);
  const slotCtx = { values, setValues, result };

  // Worked-example terms for the "how calculated" block (same math as the engine).
  const noun = preset?.noun || "pressure washing";
  const factors = preset?.factors || DEFAULT_FACTORS;
  const areaNum = Number(values.area) || 0;
  const mm = Number(values.materialMultiplier) || 1;
  const ratePrice = areaNum * result.surface.baseRate * result.condition.multiplier * mm;
  const costFloor = result.totalCost / Math.max(0.05, 1 - (Number(values.marginPct) || 0) / 100);
  const minCharge = Number(values.minimumCharge) || 0;
  const driver = result.recommendedPrice <= minCharge + 0.005 && minCharge > Math.max(ratePrice, costFloor)
    ? "minimum charge"
    : ratePrice >= costFloor ? "rate card" : "cost floor";
  const renderSlot = (slot) => (typeof slot === "function" ? slot(slotCtx) : slot);

  const title = preset?.title || "Pressure Washing Price Calculator: All Surfaces | WashCalc";
  const desc = preset?.description ||
    "Price any pressure washing job — driveway, siding, roof, deck, patio or fence — with the rate card shown. See price per sq ft, labor hours, cost floor and margin.";
  const canonical = preset?.canonical || "https://washcalc.app/calculator";
  const h1 = preset?.h1 || "Pressure Washing Price Calculator";
  const intro = preset?.intro ||
    "Pick a surface, enter the area and your costs, and get the price to quote: the higher of the rate card and your cost floor, never below your minimum. Six surfaces on one form — including patios and fences, which have no dedicated calculator — with every rate behind the number published below.";

  useSEO({
    title, description: desc, canonical,
    breadcrumbs: preset?.breadcrumb || [
      { name: "Home", url: "https://washcalc.app/" },
      { name: "Calculator", url: canonical },
    ],
  });

  return (
    <Layout>
      <section className="wc-section-tight" style={{ paddingTop: 32 }}>
        <div className="wc-container">
          <nav className="wc-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span>/</span>
            {preset ? (
              <>
                <Link to="/calculator">Calculators</Link><span>/</span>
                <span style={{ color: "var(--wc-text)" }}>{preset.h1}</span>
              </>
            ) : (
              <span style={{ color: "var(--wc-text)" }}>Calculator</span>
            )}
          </nav>
          <h1 style={{ fontSize: "clamp(28px,3.4vw,38px)", margin: "0 0 8px", letterSpacing: "-0.01em" }}>{h1}</h1>
          <p style={{ color: "var(--wc-text-muted)", maxWidth: 720, margin: "0 0 28px" }}>{intro}</p>

          <div className="wc-calc-grid">
            <CalculatorForm
              values={values}
              onChange={setValues}
              lockSurface={!!preset?.lockSurface}
              surfaceOnly={preset?.surfaceOnly}
              areaLabel={preset?.areaLabel}
              areaHelp={preset?.areaHelp}
            />
            <ResultsPanel
              result={result}
              values={values}
              onReset={() => setValues(initial)}
            />
          </div>

          {heroExtra && <div className="wc-hero-extra">{renderSlot(heroExtra)}</div>}
        </div>
      </section>

      {/* Page-specific secondary tools + contractor copy */}
      {belowHero && renderSlot(belowHero)}

      {/* How calculated — worked live from the inputs above, so each surface
          page shows its own numbers rather than shared boilerplate. */}
      <section className="wc-section">
        <div className="wc-container">
          <h2 className="wc-section-title">{`How this ${noun} price is calculated`}</h2>
          <p className="wc-section-sub">Worked from the inputs above — change them and these lines update.</p>
          <div className="wc-grid-3">
            <div className="wc-card wc-card-pad">
              <h3 style={{ marginTop: 0 }}>Rate card</h3>
              <p style={{ color: "var(--wc-text-muted)", fontSize: 14.5 }}>
                {areaNum.toLocaleString("en-US")} sq ft × {formatMoney2(result.surface.baseRate)} × {result.condition.multiplier} ({result.condition.label.toLowerCase()})
                {mm !== 1 ? ` × ${mm} (material)` : ""} = <strong>{formatMoney2(ratePrice)}</strong>
              </p>
            </div>
            <div className="wc-card wc-card-pad">
              <h3 style={{ marginTop: 0 }}>Cost floor</h3>
              <p style={{ color: "var(--wc-text-muted)", fontSize: 14.5 }}>
                ({result.hours.toFixed(2)} h × {formatMoney2(Number(values.laborRate) || 0)} + {formatMoney2(Number(values.chemicalCost) || 0)} chemical + {formatMoney2(Number(values.travelCost) || 0)} travel) ÷ (1 − {Number(values.marginPct) || 0}%) = <strong>{formatMoney2(costFloor)}</strong>
              </p>
            </div>
            <div className="wc-card wc-card-pad">
              <h3 style={{ marginTop: 0 }}>Price to quote</h3>
              <p style={{ color: "var(--wc-text-muted)", fontSize: 14.5 }}>
                The highest of the two and your {formatMoney2(minCharge)} minimum: <strong>{formatMoney2(result.recommendedPrice)}</strong>, {`set by the ${driver}.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Factors */}
      <section className="wc-section" style={{ background: "var(--wc-surface-alt)" }}>
        <div className="wc-container">
          <h2 className="wc-section-title">{`What moves a ${noun} price`}</h2>
          <div className="wc-grid-3">
            {factors.map((f) => (
              <div key={f.title} className="wc-card wc-card-pad"><strong>{f.title}</strong><p style={{ color: "var(--wc-text-muted)", margin: "6px 0 0" }}>{f.body}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="wc-section">
        <div className="wc-container" style={{ maxWidth: 820 }}>
          <h2 className="wc-section-title">FAQ</h2>
          <FAQ items={preset?.faqs || FAQS} />
        </div>
      </section>

      {/* Related */}
      <section className="wc-section-tight">
        <div className="wc-container">
          <h2 className="wc-section-title">Related calculators</h2>
          <RelatedTools exclude={canonical.replace(/^https?:\/\/[^/]+/, "")} />
        </div>
      </section>

      {/* Pricing guide back-link */}
      <section className="wc-section-tight">
        <div className="wc-container" style={{ textAlign: "center" }}>
          <p style={{ fontSize: 16, color: "var(--wc-text-muted)", margin: 0 }}>
            👉 <a href="/pressure-washing-pricing-guide">How much to charge for pressure washing</a> — the full method — and the{" "}
            <a href="/pressure-washing-price-per-square-foot">price per square foot for every surface</a>.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="wc-section-tight">
        <div className="wc-container">
          <div className="wc-cta-banner">
            <h3>Save your quotes — coming soon</h3>
            <p>WashCalc Pro: saved quotes, branded PDFs and lead capture for your site.</p>
            <Link to="/" className="wc-btn wc-btn-ghost">Back to home</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
