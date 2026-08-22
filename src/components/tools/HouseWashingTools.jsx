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
          <p>
            House washing is the highest-frequency repeat service in residential exterior cleaning
            — most homeowners want it done annually, which makes a clean, defensible price the base
            of a recurring book of work rather than a one-off. In most markets siding prices between
            $0.25 and $0.35 per square foot of wall area, putting a typical single-story home at
            $250–$450 and a two-story at $400–$700. Those bands are your market anchor, not your
            quote: the number you send should come from reconciling that rate against your real
            cost per job.
          </p>
          <p>
            Price from the wall, not the footprint. Walk the house and estimate siding square
            footage — perimeter times wall height, minus nothing for windows on a first pass — then
            read condition honestly. A north wall furred with green algae is a different job from a
            lightly-dusted south wall, and it changes both your mix strength and your dwell time.
            Set a hard minimum charge (a $150 floor is standard) so a small ranch or a detached
            garage still covers the drive, setup, and mixing time that every job carries regardless
            of size.
          </p>

          <h3>Soft washing vs pressure washing siding</h3>
          <p>
            Siding is a soft-wash surface, not a pressure surface. Vinyl, stucco, painted wood, and
            painted brick all get a low-pressure application of a sodium hypochlorite solution with
            a surfactant — never a high-pressure tip, which drives water behind the siding and
            strips paint. Aim for roughly 1–1.5% SH at the wall for maintenance washes, stepping up
            toward 3–4% only for heavy shaded algae. From 12.5% stock, a downstream injector at
            about 10:1 lands just under 1% at the surface; a batch mix lets you dial an exact
            percentage in the tank. Add a surfactant at 1–2 oz per gallon so the solution clings
            and dwells instead of running off dry. Wet the landscaping before and after, let the
            mix dwell, then rinse. The <a href="#sh-dilution">SH dilution calculator</a> above sizes
            the exact gallons and surfactant for your tank or injector.
          </p>

          <h3>Estimating labor and chemical cost</h3>
          <p>
            Production on siding runs roughly 300–400 square feet of wall per hour in moderate
            condition, slower on cut-up two-story elevations with a lot of trim and ladder work.
            Multiply your estimated on-site hours by crew size and your fully-loaded hourly cost to
            get labor, then add the chemical cost from your mix and the fuel for the round trip.
            Chemical is real money that quietly disappears if you track it by the quarter instead of
            by the job — the SH dilution calculator reports the cost of the exact batch you mixed so
            you can carry it straight into the{" "}
            <a href="#job-profitability">job profitability calculator</a> and see whether the quote
            actually cleared your margin, not just your gut.
          </p>

          <h3>One-story vs two-story pricing</h3>
          <p>
            Two-story homes typically price 30–50% above a single-story of the same footprint, and
            the gap is not arbitrary. Second-story elevations mean ladder repositioning, more time
            per square foot, and real safety overhead — the extra minutes and the extra risk are
            both costs you should be paid for. Don't discount them to win a bid; a two-story wash
            that prices like a ranch is a job you technically won and financially lost. Use the{" "}
            <a href="#regional-pricing">regional pricing table</a> as a sanity check against your
            market once verified figures are in place — it tells you whether your number is in the
            right neighborhood, but it is never the quote itself. The quote comes from your cost and
            the specific home's access and condition.
          </p>

          <h3>Common house-washing pricing mistakes</h3>
          <p>
            The mistakes that erode margin on house washing are habits, not arithmetic. Under-mixing
            SH to save chemical means a callback and a re-wash — the most expensive way to clean a
            house twice. Forgetting to price the drive turns a distant $300 job into a break-even
            afternoon once unbilled windshield time and fuel come out. Skipping a minimum charge
            lets small jobs eat the same setup overhead as large ones with none of the revenue. And
            quoting from memory ignores that this house is not the last house — condition, siding
            type, and access all move the number. Mix to a measured percentage, price the drive,
            hold your minimum, and let the tools do the math on every job instead of every third one.
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
            <p>
              Researching what the job should cost rather than pricing one? The{" "}
              <Link to="/house-washing-cost">house washing cost guide</Link> covers measuring
              siding area properly, what a second storey adds, and how material changes the
              method. For a visit covering siding plus flatwork, total it in one pass with the{" "}
              <Link to="/pressure-washing-estimate-calculator">pressure washing estimate
              calculator</Link>, then send it on the{" "}
              <Link to="/pressure-washing-quote-template">quote template</Link>.
            </p>
          </div>
        </article>
      </section>
    </>
  );
}
