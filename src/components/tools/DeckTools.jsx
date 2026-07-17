import { Link } from "react-router-dom";
import StainSealCoverageCalculator from "./StainSealCoverageCalculator.jsx";
import CleanAndSealTimeline from "./CleanAndSealTimeline.jsx";

// Secondary-tool + copy block rendered below the main deck calculator.
// (The material selector lives in the hero via CalculatorPage's heroExtra slot.)
export default function DeckTools() {
  return (
    <>
      {/* Contractor tools */}
      <section className="wc-section" style={{ background: "var(--wc-surface-alt)" }}>
        <div className="wc-container" style={{ maxWidth: 900 }}>
          <h2 className="wc-section-title">Deck contractor tools</h2>
          <p className="wc-section-sub">
            Size a stain or seal job and schedule the clean-and-seal return visit around real dry time.
          </p>

          <div className="wc-tool-stack">
            <StainSealCoverageCalculator />
            <CleanAndSealTimeline />
          </div>
        </div>
      </section>

      {/* Contractor copy — scaffold. Operator supplies verified prose. */}
      <section className="wc-section">
        <article className="wc-container" style={{ maxWidth: 820 }}>
          <h2 className="wc-section-title" style={{ textAlign: "left" }}>How to price deck cleaning and sealing</h2>
          <p className="wc-copy-todo">
            [COPY PLACEHOLDER — ~250 words. Contractor-facing: wood vs composite, why material
            drives both method and price, reading board condition and grey/UV damage.]
          </p>

          <h3>Matching pressure and nozzle to the material</h3>
          <p className="wc-copy-todo">
            [COPY PLACEHOLDER — ~200 words. PSI ranges per material, fan tips, keeping the wand
            moving, brighteners. Reference the material selector and its PSI warning above.]
          </p>

          <h3>Pricing the clean vs the seal</h3>
          <p className="wc-copy-todo">
            [COPY PLACEHOLDER — ~200 words. Why cleaning and sealing are separate quote lines,
            gallons-per-coat math, marking up product. Reference the stain &amp; seal calculator.]
          </p>

          <h3>Scheduling a two-visit clean-and-seal</h3>
          <p className="wc-copy-todo">
            [COPY PLACEHOLDER — ~200 words. Dry-time by climate, moisture meters, why rushing the
            seal fails, communicating the two-visit timeline to the customer.]
          </p>

          <h3>Common deck pricing mistakes</h3>
          <p className="wc-copy-todo">
            [COPY PLACEHOLDER — ~200 words. Blasting soft wood, bundling seal into the wash,
            ignoring railing footage, under-buying product. Contractor-only framing.]
          </p>

          <div className="wc-crosslinks">
            <h3>Price the rest of the job</h3>
            <p>
              A deck job often rides along with a full exterior. Size the siding on the{" "}
              <Link to="/calculators/house-washing">house washing cost calculator</Link>, ground
              your per-surface rates in the{" "}
              <Link to="/pressure-washing-pricing-guide">pressure washing pricing guide</Link>,
              then itemize everything into one estimate with the{" "}
              <Link to="/quote-tool">power washing quote tool</Link>.
            </p>
          </div>
        </article>
      </section>
    </>
  );
}
