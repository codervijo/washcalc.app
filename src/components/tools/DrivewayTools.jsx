import { Link } from "react-router-dom";

// Contractor copy rendered below the main driveway calculator on
// /calculators/driveway (CalculatorPage belowHero slot, set in
// DrivewayPage.jsx). The area tool itself lives in the hero via heroExtra.
// Every dollar figure is calculateQuote() output for the stated inputs —
// the calculator's driveway defaults unless a line says otherwise. Area
// crossovers were found by stepping the engine 1 sq ft at a time.
export default function DrivewayTools() {
  return (
    <>
      <section className="wc-section">
        <article className="wc-container" style={{ maxWidth: 820 }}>
          <h2 className="wc-section-title" style={{ textAlign: "left" }}>Measuring a driveway for the calculator</h2>
          <p>
            The calculator prices square feet, so the quote is only as good as the measurement.
            The common mistake is not a bad tape reading — it is measuring the obvious rectangle and
            stopping. A driveway is usually a slab plus pieces that are easy to forget: the flare
            where it widens to meet the street, a parking pad or turnaround beside the garage, and
            the walkway to the front door that the customer assumes is included.
          </p>
          <p>
            Measure each piece on its own and add them up. Rectangles are length times width. A
            flare is two triangles, so take the extra width at the street, multiply by how far back
            the widening runs, and halve it. Stop at the garage door — the garage floor is a
            separate surface with its own access and drainage. The{" "}
            <a href="#driveway-area">driveway area tool</a> above does the arithmetic and drops the
            total into the calculator.
          </p>

          <h3>What a slab-only measurement costs</h3>
          <p>
            A 20 × 45 ft slab in moderate condition, with the calculator's default costs, prices at
            $241. Add the pieces that were always going to be cleaned — a flare from 20 to 30 ft over
            the last 6 ft (30 sq ft) and a 4 × 30 ft walkway (120 sq ft) — and the same job is
            1,050 sq ft at <strong>$277</strong>. Quoting the slab alone leaves $36 on the driveway,
            and you find out when the walkway is the last thing you wash.
          </p>

          <h2 className="wc-section-title" style={{ textAlign: "left", marginTop: 40 }}>Which number is setting your price</h2>
          <p>
            The result panel shows one recommended price, but three different rules can produce
            it: your minimum charge, the cost-plus floor (job cost divided by one minus your target
            margin), or the rate card (area × $0.22 × condition). Whichever is highest wins. On
            driveways the winner changes with size, and knowing which one you are looking at tells
            you what will and will not move the number.
          </p>
          <p>
            At the calculator's driveway defaults — light condition, $35 per crew-hour of labor
            cost, $25 chemical, $20 travel, a 45% target margin and a $150 minimum:
          </p>
          <div className="wc-table-scroll">
            <table className="wc-qt-table">
              <thead>
                <tr><th>Driveway area</th><th>Recommended price</th><th>Per sq ft</th><th>Set by</th></tr>
              </thead>
              <tbody>
                <tr><td>400 sq ft</td><td className="wc-qt-rate">$150</td><td>$0.38</td><td>Minimum charge</td></tr>
                <tr><td>600 sq ft</td><td className="wc-qt-rate">$167</td><td>$0.28</td><td>Cost-plus floor</td></tr>
                <tr><td>900 sq ft</td><td className="wc-qt-rate">$209</td><td>$0.23</td><td>Cost-plus floor</td></tr>
                <tr><td>1,200 sq ft</td><td className="wc-qt-rate">$264</td><td>$0.22</td><td>Rate card</td></tr>
                <tr><td>1,600 sq ft</td><td className="wc-qt-rate">$352</td><td>$0.22</td><td>Rate card</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            With these inputs the minimum governs below about 480 sq ft, the cost-plus floor from
            there to about 1,040 sq ft, and the rate card above that. Dirtier driveways hand over
            sooner, because condition adds hours as well as rate: in moderate condition the
            handovers fall at about 390 and 940 sq ft, and in heavy at about 300 and 790. Change
            your labor cost, travel or margin and the boundaries move — the panel always reflects
            your own numbers.
          </p>

          <h3>Why cutting margin does not always cut the price</h3>
          <p>
            The practical consequence shows up when you discount to win a job. On a 700 sq ft
            driveway the cost-plus floor is in charge, so dropping your target margin from 45% to
            35% takes the price from $181 to <strong>$154</strong> — at which point the rate card
            ($0.22 × 700) catches it and it cannot fall further. On a 1,300 sq ft driveway the rate
            card was already in charge: the price is <strong>$286</strong> at 45% and still $286
            at 35%, with an effective margin of about 49% either way.
          </p>
          <p>
            So on large driveways a margin cut is a non-event, and the only levers are the rate
            card and condition. On mid-size driveways it is a real discount, coming straight out
            of gross profit — $27 on that 700 sq ft job — while the hours and costs stay exactly
            the same. On small driveways nothing moves until you lower the minimum, which is
            usually the wrong lever: add the walkway or the patio instead and let the area carry
            the call-out.
          </p>

          <h2 className="wc-section-title" style={{ textAlign: "left", marginTop: 40 }}>Concrete, asphalt and pavers on one rate</h2>
          <p>
            The calculator carries one driveway rate. Plain broom-finish concrete is the job it
            describes. For anything that cleans slower, step the condition up rather than inventing
            a separate rate: it raises the rate-based price and the hours together, which is what
            slower work actually costs. Asphalt, exposed aggregate and stamped concrete usually
            belong one condition level higher than the dirt alone would suggest.
          </p>
          <p>
            Pavers need one more decision before you quote. Cleaning between the units can wash
            out the joint sand, and whether you replace it is a scope question, not a pricing
            nuance. If re-sanding or sealing is part of the job, price it as its own line after the
            wash; if it is not, say so on the quote so the customer is not expecting it.
          </p>
        </article>
      </section>

      <section className="wc-section-tight">
        <div className="wc-container" style={{ maxWidth: 820 }}>
          <div className="wc-crosslinks">
            <h3>Before you send the driveway number</h3>
            <p>
              For published 2026 rates, rust and runoff, and what homeowners compare you against,
              read the{" "}
              <Link to="/driveway-pressure-washing-cost">driveway pressure washing cost guide</Link>.
              If the visit includes siding, a patio or a deck, total the lines with the{" "}
              <Link to="/pressure-washing-estimate-calculator">pressure washing estimate
              calculator</Link>. Send a firm price on the{" "}
              <Link to="/pressure-washing-quote-template">quote template</Link>, or a ranged one
              on the <Link to="/pressure-washing-estimate-template">estimate template</Link> when
              you have only seen photos.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
