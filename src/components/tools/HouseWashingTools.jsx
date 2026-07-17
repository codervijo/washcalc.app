import { useState } from "react";
import { Link } from "react-router-dom";
import SHDilutionCalculator from "./SHDilutionCalculator.jsx";
import JobProfitabilityCalculator from "./JobProfitabilityCalculator.jsx";
import RegionalPricingTable from "./RegionalPricingTable.jsx";

// Secondary-tool + copy block rendered below the main house-washing calculator.
// Holds the shared chem cost so the profitability tool can auto-pull the SH
// dilution calculator's batch cost.
export default function HouseWashingTools() {
  const [chemCostFromSH, setChemCostFromSH] = useState(null);

  return (
    <>
      {/* Contractor tools */}
      <section className="wc-section" style={{ background: "var(--wc-surface-alt)" }}>
        <div className="wc-container" style={{ maxWidth: 900 }}>
          <h2 className="wc-section-title">House washing contractor tools</h2>
          <p className="wc-section-sub">
            Mix your soft-wash solution, check a job's real margin, and benchmark against your
            metro — without leaving the page.
          </p>

          <div className="wc-tool-stack">
            <SHDilutionCalculator onChemCost={setChemCostFromSH} />
            <JobProfitabilityCalculator chemCostFromSH={chemCostFromSH} />
            <RegionalPricingTable />
          </div>
        </div>
      </section>

      {/* Contractor copy — scaffold. Operator supplies verified prose. */}
      <section className="wc-section">
        <article className="wc-container" style={{ maxWidth: 820 }}>
          <h2 className="wc-section-title" style={{ textAlign: "left" }}>How to price a house wash for profit</h2>
          <p className="wc-copy-todo">
            [COPY PLACEHOLDER — ~250 words. Contractor-facing: soft-wash method, why siding
            is a recurring annual service, how to walk and measure a home, reading condition.]
          </p>

          <h3>Soft washing vs pressure washing siding</h3>
          <p className="wc-copy-todo">
            [COPY PLACEHOLDER — ~200 words. SH mix strategy for vinyl / stucco / painted brick,
            surfactant, dwell time, rinsing, landscape protection. Reference the SH dilution
            calculator above.]
          </p>

          <h3>Estimating labor and chemical cost</h3>
          <p className="wc-copy-todo">
            [COPY PLACEHOLDER — ~200 words. Production rates (300–400 sq ft/hr of siding), how
            two-story adds ladder time, tying chem cost back to the SH mix, feeding the job
            profitability calculator.]
          </p>

          <h3>One-story vs two-story pricing</h3>
          <p className="wc-copy-todo">
            [COPY PLACEHOLDER — ~200 words. Why two-story runs 30–50% higher, access and safety
            overhead, using the regional table as a sanity check, not a quote.]
          </p>

          <h3>Common house-washing pricing mistakes</h3>
          <p className="wc-copy-todo">
            [COPY PLACEHOLDER — ~200 words. Under-mixing SH, forgetting travel, no minimum,
            quoting from memory. Keep contractor-only framing — no homeowner "is it worth it".]
          </p>

          <div className="wc-crosslinks">
            <h3>Keep pricing tight across surfaces</h3>
            <p>
              House washing rarely goes out alone. When you bundle it with wood care, run the
              numbers on the{" "}
              <Link to="/calculators/deck">deck cleaning cost calculator</Link>, and for a full
              breakdown of per-surface rates read the{" "}
              <Link to="/pressure-washing-pricing-guide">pressure washing pricing guide</Link>.
              Ready to send it? Build the itemized estimate with the{" "}
              <Link to="/quote-tool">power washing quote tool</Link>.
            </p>
          </div>
        </article>
      </section>
    </>
  );
}
