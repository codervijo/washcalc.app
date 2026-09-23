import RoofCostLinks from "../RoofCostLinks.jsx";

// Contractor copy rendered below the main roof calculator on /calculators/roof
// (CalculatorPage belowHero slot, set in App.jsx). The pitch tool itself lives
// in the hero via heroExtra. Worked-example figures are calculateQuote()
// output for the stated inputs; soft-wash guidance is ARMA's; the pitch
// classification is OSHA's.
export default function RoofTools() {
  return (
    <>
      <section className="wc-section">
        <article className="wc-container" style={{ maxWidth: 820 }}>
          <h2 className="wc-section-title" style={{ textAlign: "left" }}>Pricing a roof from the ground</h2>
          <p>
            The calculator above prices square feet of roof surface, and that is the number
            people most often get wrong before they have entered anything. What you can measure
            from the ground is the footprint — the outline of the roof seen from above, eaves
            included. The surface you actually clean is larger, because every foot of horizontal
            run becomes a longer sloped rafter. The steeper the pitch, the bigger the gap, and
            quoting from the footprint quietly discounts every steep roof you sell.
          </p>
          <p>
            The correction is a single multiplier: the slope length per foot of run, which is the
            square root of rise squared plus twelve squared, divided by twelve. A 4/12 roof is
            about 5% larger than its footprint, a 6/12 about 12%, and a 10/12 about 30%. The{" "}
            <a href="#roof-pitch">roof area from pitch</a> tool does the arithmetic and drops the
            result straight into the calculator. Read the pitch with a level and tape on a gable
            end or from a ladder at the eave, or take it from the plans if you have them.
          </p>

          <h3>Same footprint, three pitches</h3>
          <p>
            A 1,300 sq ft footprint in moderate condition, priced at $35 per crew-hour of labor
            cost, $60 of chemical, $20 of travel and a 55% target margin:
          </p>
          <div className="wc-qt-example">
            <div className="head">Pitch · roof surface area → recommended price</div>
            <div className="body">
              <div className="wc-qt-line">
                <span className="lbl">4/12 — 1,370 sq ft<small>pitch factor ×1.054 · about 6.9 hrs · $0.60/sq ft</small></span>
                <span className="amt">$822</span>
              </div>
              <div className="wc-qt-line">
                <span className="lbl">6/12 — 1,453 sq ft<small>pitch factor ×1.118 · about 7.3 hrs · $0.60/sq ft</small></span>
                <span className="amt">$872</span>
              </div>
              <div className="wc-qt-line">
                <span className="lbl">10/12 — 1,692 sq ft<small>pitch factor ×1.302 · about 8.5 hrs · $0.60/sq ft</small></span>
                <span className="amt">$1,015</span>
              </div>
            </div>
          </div>
          <p>
            Priced off the footprint alone, all three would have gone out at $780. On the 10/12
            roof that is $235 of work you would have done for free — before you account for the
            fact that steep work is also slower and riskier per square foot.
          </p>

          <h3>Steep roofs cost more than their area</h3>
          <p>
            The pitch factor corrects the area. It does not correct the pace. The calculator's
            hours scale with square footage and condition only, so it has no way to know that a
            steep roof means harnesses, anchors and a crew that moves carefully rather than
            quickly. OSHA draws the line at 4 in 12: anything steeper is a steep roof under 29 CFR
            1926.500(b), and the fall protection that comes with it is time and equipment that
            belongs in the price. Put it there deliberately — by stepping the condition up, by
            raising your labor cost for that job, or as a separate access line on the quote — so
            it does not come out of your margin by default.
          </p>

          <h3>Soft wash, not pressure</h3>
          <div className="wc-qt-callout">
            <strong>What the shingle makers say.</strong> The Asphalt Roofing Manufacturers
            Association's algae bulletin tells owners not to use a power washer, brush or broom on
            asphalt shingles, and to avoid scrubbing, which loosens granules. Its example solution
            is one part household chlorine bleach to one part water, left on for 15 to 20 minutes
            and then rinsed off with a gentle spray — and it notes that shingle makers' own mixing
            directions vary and that other chemicals should not be used without the
            manufacturer's approval.{" "}
            <a href="https://www.asphaltroofing.org/algae-discoloration-of-roofs/" rel="noopener" target="_blank">
              ARMA — Algae Discoloration of Roofs
            </a>
          </div>
          <p>
            That is the reason roof work is priced as chemical-and-dwell rather than
            pressure-and-passes. Chemical is a real per-job cost here — log it in the chemical
            field for each roof rather than absorbing it into overhead — and ARMA's own warning
            about protecting the building and surrounding landscape is the landscaping pre-wet and
            post-rinse time that belongs in your hours. The same bulletin is also the sentence to
            put in front of a homeowner who asks why you will not just blast the roof clean.
          </p>
        </article>
      </section>

      <RoofCostLinks />
    </>
  );
}
