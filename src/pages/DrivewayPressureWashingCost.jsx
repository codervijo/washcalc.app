import SeoPageShell from "../components/SeoPageShell.jsx";
import { DRIVEWAY_COST } from "./seoPages.js";

const TOC = [
  { id: "cost", label: "What driveway washing costs" },
  { id: "factors", label: "What moves the price" },
  { id: "methods", label: "Pricing models and the minimum" },
  { id: "examples", label: "Worked examples" },
  { id: "diy", label: "DIY versus professional" },
  { id: "faq", label: "FAQ" },
];

const LINKS = [
  { to: "/calculator", label: "All-surface calculator", note: "price a driveway with your own costs and margin." },
  { to: "/pressure-washing-estimate-calculator", label: "Estimate calculator", note: "add walkways and a patio to the same visit and total it." },
  { to: "/house-washing-cost", label: "House washing cost", note: "the surface most often bundled with a driveway clean." },
  { to: "/roof-cleaning-cost", label: "Roof cleaning cost", note: "the high-margin surface at the other end of the range." },
  { to: "/pressure-washing-estimate-template", label: "Estimate template", note: "send a ranged figure when you have only seen photos." },
  { to: "/pressure-washing-pricing-guide", label: "Pressure washing pricing guide", note: "where driveway rates sit in the full 2026 picture." },
];

export default function DrivewayPressureWashingCost() {
  return (
    <SeoPageShell
      meta={DRIVEWAY_COST}
      lead="Driveways are the highest-volume job in residential pressure washing and the easiest one to underprice. This guide covers 2026 rates for concrete and asphalt, the factors that genuinely change the number, why small driveways cost more per square foot, and three worked examples built with a real pricing model."
      toc={TOC}
      links={LINKS}
    >
      {/* ── Cost ────────────────────────────────────────────────────── */}
      <section className="wc-qt-section" id="cost">
        <h2>What driveway pressure washing costs in 2026</h2>
        <p className="wc-qt-sub">
          Published benchmark ranges, plus the WashCalc model assumptions used later on this
          page. Both are labelled so you know which is which.
        </p>

        <div className="wc-table-scroll">
          <table className="wc-qt-table">
            <thead>
              <tr><th>Measure</th><th>Typical 2026 range</th><th>Source</th></tr>
            </thead>
            <tbody>
              <tr><td>Concrete driveway cleaning</td><td className="wc-qt-rate">$0.20–$0.35 / sq ft</td><td className="wc-regional-src">HomeGuide, Angi</td></tr>
              <tr><td>Typical residential job</td><td className="wc-qt-rate">$100–$300</td><td className="wc-regional-src">HomeGuide, Angi</td></tr>
              <tr><td>Minimum service charge</td><td className="wc-qt-rate">$100–$150</td><td className="wc-regional-src">Common trade practice</td></tr>
              <tr><td>Production rate, surface cleaner</td><td className="wc-qt-rate">≈ 450 sq ft / hr</td><td className="wc-regional-src">WashCalc default model</td></tr>
            </tbody>
          </table>
        </div>
        <p className="wc-qt-note">
          The production rate is WashCalc's default modelling assumption for a 16–20 inch surface
          cleaner in moderate condition, not a measured industry figure. Time your own first jobs
          and replace it.
        </p>

        <p>
          For most homeowners the practical answer is that a standard two-car driveway costs
          somewhere in the low-to-mid hundreds. A 600 to 900 square foot slab in ordinary
          condition is the common case, and at published rates that lands between roughly $120
          and $300 depending on the market and how dirty it actually is.
        </p>
        <p>
          Driveways are also the surface where the gap between a cheap quote and a good one is
          smallest in dollars and largest in result. The difference between $180 and $240 on the
          same driveway usually comes down to whether the operator is running a proper surface
          cleaner and pre-treating organic staining, or waving a wand and leaving stripes. That
          is worth understanding from either side of the quote.
        </p>
      </section>

      {/* ── Factors ─────────────────────────────────────────────────── */}
      <section className="wc-qt-section" id="factors">
        <h2>What moves the price</h2>
        <p className="wc-qt-sub">Area sets the baseline. These are what actually move it.</p>

        <div className="wc-qt-anatomy">
          <div className="item"><div className="n">01</div><h4>Total area</h4><p>The starting point, and the only factor most quotes account for. Single-width, two-car and long rural driveways are very different jobs.</p></div>
          <div className="item"><div className="n">02</div><h4>Oil and grease staining</h4><p>Needs degreaser, dwell time and often a second pass. The most common cause of a job running long.</p></div>
          <div className="item"><div className="n">03</div><h4>Surface finish</h4><p>Smooth broom-finish concrete cleans fast. Exposed aggregate, stamped and pebbled finishes hold soil in every recess and slow the pass rate sharply.</p></div>
          <div className="item"><div className="n">04</div><h4>Organic growth</h4><p>Moss, algae and lichen on a shaded or north-facing driveway need chemical treatment, not just pressure. Blasting them off without pre-treatment leaves roots and they return within months.</p></div>
          <div className="item"><div className="n">05</div><h4>Material</h4><p>Asphalt erodes under pressure that concrete ignores, so it wants lower pressure and more chemistry — slower work for a similar result.</p></div>
          <div className="item"><div className="n">06</div><h4>Slope and drainage</h4><p>A steep driveway carries runoff and slurry into the street or a neighbour's property. Managing that is time, and sometimes a reclamation requirement.</p></div>
        </div>

        <p>
          Rust deserves its own mention because it is the stain most likely to cause an argument.
          Rust from irrigation water, fertiliser or a parked trailer does not respond to pressure
          or to sodium hypochlorite — it needs an oxalic or similar acid treatment, which is a
          separate product, a separate process and a separate line on the quote. Promising a
          clean driveway without excluding or separately pricing rust is how a satisfied customer
          becomes an unhappy one on the day.
        </p>
        <p>
          The other factor rarely priced is what the driveway drains into. Slurry from a pressure
          wash carries whatever was on the concrete, and in some jurisdictions and most commercial
          settings letting that run to a storm drain is not permitted. Residential work usually
          escapes this; if you are moving toward commercial flatwork, water reclamation is a real
          cost that has to appear in the rate.
        </p>
      </section>

      {/* ── Methods ─────────────────────────────────────────────────── */}
      <section className="wc-qt-section" id="methods">
        <h2>Pricing models and why the minimum exists</h2>
        <p className="wc-qt-sub">
          Per square foot is how the number is built. The minimum charge is what stops it being
          wrong on small jobs.
        </p>
        <p>
          Driveways are the clearest case for square-foot pricing. The surface is flat, the
          production rate is predictable, and area genuinely correlates with time in a way it
          does not on a roof or a fence. Multiply area by your rate, adjust for condition, and
          you have a number that holds up across jobs.
        </p>
        <p>
          It breaks down at the bottom of the size range, and it breaks down hard. The costs that
          do not scale with area — driving to the property, unrolling and rerolling hose, setting
          up and packing down, the invoice and the follow-up — are identical whether the slab is
          300 square feet or 1,200. On a large driveway those fixed costs are a small share of the
          price. On a small one they are most of it.
        </p>

        <div className="wc-qt-formula wc-qt-formula-light">
          <div className="eq">300 sq ft × $0.22 = <b>$66</b> — for a call-out that costs more than that to make</div>
          <small>
            This is why a $100–$150 minimum is standard practice rather than an upsell. Below the
            minimum, square-foot pricing is a formula for losing money politely.
          </small>
        </div>

        <p>
          The productive response to a job under the minimum is not to decline it but to widen it.
          Walkways, front steps, a patio, a pool surround, the garage apron — all of it is fast
          work while the rig is already set up and the hose is already run. Adding a second small
          surface typically costs you under an hour and takes the visit from marginal to
          genuinely worthwhile.
        </p>
        <p>
          Hourly pricing has almost no place on driveways. The work is too predictable to justify
          it, and it penalises the operator with the better surface cleaner — the person who
          finishes in ninety minutes what a wand would take four hours to do worse.
        </p>
      </section>

      {/* ── Examples ────────────────────────────────────────────────── */}
      <section className="wc-qt-section" id="examples">
        <h2>Worked examples</h2>
        <p className="wc-qt-sub">
          Three driveways priced with the WashCalc default model, at $35 per crew-hour of labor
          cost, $20 travel, a 50% target margin and a $150 minimum.
        </p>

        <h3>A small, lightly soiled driveway</h3>
        <p>
          600 sq ft, light condition, $10 of chemical. The model returns <strong>$153</strong> at
          about $0.26 per square foot, across roughly 1.3 hours of production time. Job cost is
          near $77, so margin sits right at the 50% target.
        </p>
        <p>
          Notice how close this lands to the $150 minimum. A slightly smaller driveway, or the
          same one in a market where you charge $0.20, would fall under it — and the minimum
          would take over. Jobs in this size band are exactly where adding the front walkway
          turns a marginal call-out into a reasonable one.
        </p>

        <h3>A standard two-car driveway</h3>
        <p>
          900 sq ft, moderate condition, $15 of chemical. The model returns <strong>$245</strong>,
          about $0.27 per square foot, over roughly 2.5 hours. Job cost is near $123 and the
          margin holds at 50%.
        </p>
        <p>
          This is the archetypal residential driveway job and it sits comfortably inside the
          $100–$300 published range. It is also the job most likely to be underbid: an operator
          working without a model, quoting from memory of the last driveway, will often land at
          $180 without noticing that this one is dirtier and 300 square feet larger than that one.
        </p>

        <h3>A long driveway with oil staining</h3>
        <p>
          1,400 sq ft, heavy condition, $35 of chemical to cover degreaser. The model returns
          <strong> $462</strong>, about $0.33 per square foot, across roughly 5 hours. Job cost is
          near $229 and the margin stays at target.
        </p>
        <p>
          The heavy condition band is carrying real weight here: it raises the rate by 50% and the
          hours by 60%, which is the correct asymmetry. Degreasing and second passes cost more
          time than they earn in rate, which is precisely why heavy-condition work needs to be
          priced deliberately rather than absorbed. Before sending a number like this, tell the
          customer plainly that older soaked-in oil lightens rather than disappears. Setting that
          expectation in the estimate costs nothing; discovering the disagreement on the day
          costs the job.
        </p>

        <div className="wc-cta-banner" style={{ marginTop: 28 }}>
          <h3>Price your own driveway job</h3>
          <p>Enter area, condition, your costs and your margin — the calculator runs the same model.</p>
          <a href="/calculator" className="wc-btn wc-btn-primary">Open the calculator</a>
        </div>
      </section>

      {/* ── DIY ─────────────────────────────────────────────────────── */}
      <section className="wc-qt-section" id="diy">
        <h2>DIY versus professional</h2>
        <p className="wc-qt-sub">Concrete is the most DIY-friendly surface there is, so this is a fair fight.</p>
        <p>
          A homeowner with a rented machine and a free Saturday will get a driveway meaningfully
          cleaner than it was. Concrete tolerates pressure, the consequences of a mistake are
          cosmetic rather than structural, and there is no height, no chemistry that will kill the
          garden and no warranty to void. Of all the surfaces covered on this site, this is the
          one where doing it yourself is genuinely reasonable.
        </p>
        <p>
          Three things separate that from a professional result. The first is the surface cleaner
          attachment — a rotating bar under a shroud that covers a consistent width at a consistent
          distance. It is why a professional finish has no stripes; a handheld wand cleans in arcs
          and leaves the zebra pattern that becomes obvious as the concrete dries. The second is
          pre-treatment: organic staining lifts with chemistry, and blasting it off without
          treating it removes the surface layer of concrete along with the algae. The third is
          simply flow rate, since a consumer machine at 1.5 gallons per minute will take several
          times longer than a commercial unit at 4.
        </p>
        <p>
          The practical calculation is time against money. A rental plus chemicals runs a
          meaningful fraction of a professional quote for a mid-size driveway, and the job takes
          most of a day rather than the two to three hours it takes someone with the right gear.
          For a small, lightly soiled slab that maths can favour DIY. For a large driveway, heavy
          organic growth, oil staining, or a surface you would rather not risk marking, it stops
          favouring it quickly.
        </p>
      </section>
    </SeoPageShell>
  );
}
