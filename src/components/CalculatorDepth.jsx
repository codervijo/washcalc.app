import { Link } from "react-router-dom";
import { SURFACES, CONDITIONS } from "../PricingEngine.js";

/**
 * Depth content for /calculator only.
 *
 * Passed as CalculatorPage's `belowHero` slot from the /calculator route in
 * App.jsx and nowhere else, so /calculators/driveway and /calculators/roof —
 * which render through the same component — are completely unaffected.
 * /calculators/driveway is indexed in Google Search Console and must not
 * change in this phase.
 */
export default function CalculatorDepth() {
  return (
    <>
      {/* ── Rate card ───────────────────────────────────────────────── */}
      <section className="wc-section" id="rate-card">
        <div className="wc-container-narrow">
          <h2 className="wc-section-title">The rate card behind the calculator</h2>
          <p className="wc-section-sub">
            Every default this pressure washing calculator ships with, in one table — so you can
            check the number rather than trust it.
          </p>

          <div className="wc-table-scroll">
            <table className="wc-qt-table">
              <thead>
                <tr>
                  <th>Surface</th>
                  <th>Base rate</th>
                  <th>Production</th>
                  {CONDITIONS.map((c) => <th key={c.id}>{c.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {SURFACES.map((s) => (
                  <tr key={s.id}>
                    <td>{s.label}</td>
                    <td className="wc-qt-rate">${s.baseRate.toFixed(2)}/sq ft</td>
                    <td className="wc-qt-rate">{s.sqftPerHour} sq ft/hr</td>
                    {CONDITIONS.map((c) => (
                      <td key={c.id} className="wc-qt-rate">${(s.baseRate * c.multiplier).toFixed(2)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="wc-qt-note">
            The three right-hand columns are the base rate multiplied by the condition multiplier
            (light ×1.0, moderate ×1.2, heavy ×1.5). Hours use separate time multipliers — ×1.0,
            ×1.25 and ×1.6 — because heavy soiling costs more time than it earns in rate. These are
            WashCalc's default modelling assumptions, not a market survey; tune them to your own
            rate card and your own measured production rates.
          </p>
        </div>
      </section>

      {/* ── Labor rate semantics ────────────────────────────────────── */}
      <section className="wc-section" style={{ background: "var(--wc-surface-alt)" }}>
        <div className="wc-container-narrow">
          <h2 className="wc-section-title">The one input people get wrong</h2>
          <p className="wc-section-sub">
            &ldquo;Your labor rate&rdquo; means your <em>cost</em> per hour, not the rate you bill.
          </p>
          <p>
            The calculator uses that field to work out what the job costs you, and then divides
            that cost by one minus your target margin to produce a price floor. So the number you
            put there should be what an hour of crew time actually costs your business — wages
            plus payroll burden, or your own draw if you run solo — typically somewhere in the
            $25–$55 range for a small operation.
          </p>
          <p>
            Enter your billing rate instead and the arithmetic still runs, but it runs on a cost
            that is roughly double the real one, so the cost-plus floor will win on almost every
            job and quietly push your quotes above market. If you find the calculator recommending
            prices far above the published ranges for a surface, this field is the first place to
            look.
          </p>
          <div className="wc-qt-callout">
            <strong>A quick check.</strong> An 800 sq ft driveway in moderate condition at $35 per
            crew-hour of cost, $25 chemical and $20 travel with a 50% target prices at about $246
            — around $0.31 per square foot, comfortably inside the published $0.20–$0.35 band. The
            same job entered at a $75 labor rate prices at $423, or $0.53 per square foot, which is
            well above what a residential driveway will bear.
          </div>
        </div>
      </section>

      {/* ── Worked examples ─────────────────────────────────────────── */}
      <section className="wc-section" id="examples">
        <div className="wc-container-narrow">
          <h2 className="wc-section-title">Three quick worked examples</h2>
          <p className="wc-section-sub">
            All three at $35 per crew-hour of labor cost, $20 travel, a 50% target margin and a
            $150 minimum. Enter them above and you will get the same numbers.
          </p>

          <div className="wc-qt-example">
            <div className="head">Surface · area · condition → recommended price</div>
            <div className="body">
              <div className="wc-qt-line">
                <span className="lbl">Driveway — 800 sq ft, moderate<small>$25 chemical · 2.2 hrs · $0.31/sq ft · 50% margin</small></span>
                <span className="amt">$246</span>
              </div>
              <div className="wc-qt-line">
                <span className="lbl">Fence — 600 sq ft, moderate<small>$20 chemical · 2.7 hrs · $0.45/sq ft · 50% margin</small></span>
                <span className="amt">$268</span>
              </div>
              <div className="wc-qt-line">
                <span className="lbl">Patio — 500 sq ft, heavy<small>$30 chemical · 2.0 hrs · $0.48/sq ft · 50% margin</small></span>
                <span className="amt">$240</span>
              </div>
            </div>
          </div>

          <p>
            The patio is the instructive one. At 500 square feet it is the smallest job of the
            three, and in heavy condition its rate rises to $0.38 per square foot — yet it still
            prices close to the fence, because heavy soiling adds 60% to the hours while adding
            only 50% to the rate. That gap between the time multiplier and the price multiplier is
            deliberate, and it is why heavily soiled small jobs are the least profitable work most
            operators take.
          </p>
          <p>
            For jobs covering more than one surface, this calculator is the wrong tool — it prices
            a single surface at a time. Use the{" "}
            <Link to="/pressure-washing-estimate-calculator">pressure washing estimate
            calculator</Link>, which takes a line per surface and applies costs, the bundle
            discount and your minimum once across the whole visit.
          </p>
        </div>
      </section>

      {/* ── Cost research links ─────────────────────────────────────── */}
      <section className="wc-section" style={{ background: "var(--wc-surface-alt)" }}>
        <div className="wc-container-narrow">
          <h2 className="wc-section-title">Researching a price rather than calculating one?</h2>
          <p className="wc-section-sub">
            The cost guides cover ranges, factors and DIY-versus-professional for each surface.
          </p>
          <ul className="wc-pillar-links">
            <li>
              <Link to="/driveway-pressure-washing-cost">Driveway pressure washing cost</Link> —
              concrete and asphalt rates, oil staining, and why small driveways cost more per square foot.
            </li>
            <li>
              <Link to="/house-washing-cost">House washing cost</Link> — soft-wash pricing,
              measuring siding area properly, and what a second storey really adds.
            </li>
            <li>
              <Link to="/roof-cleaning-cost">Roof cleaning cost</Link> — why pitch matters more
              than area, and where the DIY case genuinely stops.
            </li>
            <li>
              <Link to="/pressure-washing-quote-template">Pressure washing quote template</Link> —
              turn the number into a firm, fixed-price document you can send.
            </li>
            <li>
              <Link to="/pressure-washing-estimate-template">Pressure washing estimate template</Link> —
              the ranged version, for pricing from photos before you have measured.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
