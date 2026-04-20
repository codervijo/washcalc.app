import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import CalculatorForm from "../components/CalculatorForm.jsx";
import ResultsPanel from "../components/ResultsPanel.jsx";
import FAQ from "../components/FAQ.jsx";
import RelatedTools from "../components/RelatedTools.jsx";
import { calculateQuote } from "../PricingEngine.js";
import useSEO from "../useSEO.js";

const DEFAULT_VALUES = {
  surfaceId: "driveway",
  conditionId: "moderate",
  area: 800,
  laborRate: 75,
  chemicalCost: 25,
  travelCost: 20,
  marginPct: 50,
  minimumCharge: 150,
};

const FAQS = [
  { q: "What's a fair price per square foot for pressure washing?",
    a: "Driveways usually run $0.20–$0.25/sq ft, house siding $0.25–$0.35, roofs $0.40–$0.60, decks $0.30–$0.45, patios $0.20–$0.30 and fences $0.25–$0.40." },
  { q: "How is labor time estimated?",
    a: "Each surface has a productivity rate in sq ft per hour. We multiply by a condition factor — heavy soil takes 60% longer than light." },
  { q: "Why does the price sometimes jump?",
    a: "WashCalc enforces your target margin. If your costs (labor, chemical, travel) exceed the rate-based price, we raise the price to protect profit." },
];

/**
 * Reusable calculator page. Pass `preset` to lock surface and customize content.
 *  preset = {
 *    surfaceId, title, h1, description, intro, faqs, breadcrumb, lockSurface, surfaceOnly
 *  }
 */
export default function CalculatorPage({ preset }) {
  const initial = preset?.surfaceId
    ? { ...DEFAULT_VALUES, surfaceId: preset.surfaceId, ...(preset.defaults || {}) }
    : DEFAULT_VALUES;

  const [values, setValues] = useState(initial);
  const result = useMemo(() => calculateQuote(values), [values]);

  const title = preset?.title || "Pressure Washing Cost Calculator — WashCalc";
  const desc = preset?.description ||
    "Free pressure washing cost calculator. Estimate job price, labor time, cost and profit for driveways, roofs, house washing, decks and more.";
  const canonical = preset?.canonical || "https://www.washcalc.app/calculator";
  const h1 = preset?.h1 || "Pressure Washing Cost Calculator";
  const intro = preset?.intro ||
    "Estimate price, labor time and gross profit for any pressure washing job. Adjust your costs and target margin — WashCalc keeps every quote profitable.";

  useSEO({
    title, description: desc, canonical,
    breadcrumbs: preset?.breadcrumb || [
      { name: "Home", url: "https://www.washcalc.app/" },
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
            />
            <ResultsPanel
              result={result}
              values={values}
              onReset={() => setValues(initial)}
            />
          </div>
        </div>
      </section>

      {/* How calculated */}
      <section className="wc-section">
        <div className="wc-container">
          <h2 className="wc-section-title">How this price is calculated</h2>
          <p className="wc-section-sub">A transparent two-signal model so you can defend the number to your customer.</p>
          <div className="wc-grid-3">
            <div className="wc-card wc-card-pad">
              <h3 style={{ marginTop: 0 }}>Rate-based price</h3>
              <p style={{ color: "var(--wc-text-muted)", fontSize: 14.5 }}>Area × surface rate × condition multiplier. This is your market-friendly anchor.</p>
            </div>
            <div className="wc-card wc-card-pad">
              <h3 style={{ marginTop: 0 }}>Cost-plus price</h3>
              <p style={{ color: "var(--wc-text-muted)", fontSize: 14.5 }}>(Labor + chemical + travel) ÷ (1 − target margin). Protects your profit.</p>
            </div>
            <div className="wc-card wc-card-pad">
              <h3 style={{ marginTop: 0 }}>The recommended price</h3>
              <p style={{ color: "var(--wc-text-muted)", fontSize: 14.5 }}>The higher of the two — and never below your minimum charge.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Factors */}
      <section className="wc-section" style={{ background: "var(--wc-surface-alt)" }}>
        <div className="wc-container">
          <h2 className="wc-section-title">Factors that affect job price</h2>
          <div className="wc-grid-3">
            <div className="wc-card wc-card-pad"><strong>Surface type</strong><p style={{ color: "var(--wc-text-muted)", margin: "6px 0 0" }}>Roofs and decks command higher per-sq-ft rates than driveways.</p></div>
            <div className="wc-card wc-card-pad"><strong>Condition</strong><p style={{ color: "var(--wc-text-muted)", margin: "6px 0 0" }}>Heavy mildew, oil stains and algae mean more dwell time and chemical.</p></div>
            <div className="wc-card wc-card-pad"><strong>Access & travel</strong><p style={{ color: "var(--wc-text-muted)", margin: "6px 0 0" }}>Long drives, second stories and tight access raise the real job cost.</p></div>
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
          <RelatedTools exclude={canonical.replace("https://washcalc.app", "")} />
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
