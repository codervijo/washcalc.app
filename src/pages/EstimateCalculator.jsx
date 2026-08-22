import SeoPageShell from "../components/SeoPageShell.jsx";
import EstimateBuilder from "../components/tools/EstimateBuilder.jsx";
import { ESTIMATE_CALCULATOR } from "./seoPages.js";

const TOC = [
  { id: "builder", label: "Build the estimate" },
  { id: "method", label: "How the estimate is calculated" },
  { id: "reading", label: "Reading the output" },
  { id: "examples", label: "Three worked estimates" },
  { id: "sending", label: "Turning the number into a sent estimate" },
  { id: "faq", label: "FAQ" },
];

const LINKS = [
  { to: "/calculator", label: "All-surface calculator", note: "price a single surface when a customer asks about one item." },
  { to: "/pressure-washing-estimate-template", label: "Estimate template", note: "drop these numbers into a ranged document you can send." },
  { to: "/pressure-washing-quote-template", label: "Quote template", note: "once you have measured, convert the estimate into a firm quote." },
  { to: "/quote-tool", label: "Power washing quote tool", note: "the itemizing and terms side of building an estimate." },
  { to: "/pressure-washing-pricing-guide", label: "Pressure washing pricing guide", note: "the full 2026 pricing method this calculator implements." },
  { to: "/calculators/deck", label: "Deck cleaning calculator", note: "material selector and stain coverage for the deck line." },
];

export default function EstimateCalculator() {
  return (
    <SeoPageShell
      meta={ESTIMATE_CALCULATOR}
      lead="Most jobs are not one surface. This calculator builds the estimate for the whole visit — add a line for the driveway, the siding, the deck and the walkways, then let it total the hours, apply your costs once, take the bundle discount and hold your margin floor. It is the number you send, not the number you quote off the top of your head."
      toc={TOC}
      links={LINKS}
    >
      <section className="wc-qt-section" id="builder">
        <EstimateBuilder />
      </section>

      {/* ── Methodology ─────────────────────────────────────────────── */}
      <section className="wc-qt-section" id="method">
        <h2>How the estimate is calculated</h2>
        <p className="wc-qt-sub">
          Four stages, in order. Nothing is hidden — you can reproduce every figure on paper.
        </p>

        <h3>Stage 1 — price each surface line</h3>
        <p>
          Every line is priced independently as <strong>area × surface rate × condition
          multiplier</strong>. The surface rate is the per-square-foot anchor your local market
          recognizes; the condition multiplier is how much harder this particular surface is than
          a clean one. WashCalc ships with light at ×1.0, moderate at ×1.2 and heavy at ×1.5. A
          1,800 sq ft wall of vinyl siding at the default $0.30 rate in moderate condition is
          therefore 1,800 × 0.30 × 1.2 = $648.
        </p>
        <p>
          Labor time is calculated on the same line from a production rate in square feet per
          hour, scaled by a separate time multiplier — heavy soiling takes 60% longer, not 50%
          more money. That distinction matters: the price multiplier and the time multiplier are
          different numbers because a dirty surface costs you more hours than it earns you
          dollars, which is precisely why heavy-condition work needs watching.
        </p>

        <h3>Stage 2 — apply the bundle discount</h3>
        <p>
          The surface lines are summed, then the bundle discount comes off that subtotal. The
          discount only applies when there is more than one line, because there is nothing to
          bundle otherwise. The reason it is defensible rather than a giveaway is structural:
          your drive, setup, hose runs and teardown are paid once whether you clean one surface
          or four, so the second and third surface genuinely cost you less to deliver than the
          first did.
        </p>

        <h3>Stage 3 — build the cost-plus floor</h3>
        <p>
          Separately, the calculator adds up what the visit actually costs you: total labor
          hours × your cost per crew-hour, plus chemical and travel for the whole job. That
          total is divided by one minus your target margin to produce the lowest price that
          still delivers the margin you asked for. At a $373 job cost and a 50% target, the floor
          is $373 ÷ 0.5 = $746.
        </p>

        <h3>Stage 4 — take the highest of three numbers</h3>
        <div className="wc-qt-formula">
          <div className="eq">
            Estimate = max( <b>bundled rate price</b>, <b>cost-plus floor</b>, <b>job minimum</b> )
          </div>
          <small>
            Whichever is largest wins. That is the whole safety mechanism — a fast estimate can
            never become a cheap-by-accident estimate.
          </small>
        </div>
        <p>
          The calculator names which of the three set your price, under the recommended figure.
          That single label is the most useful output on the page, because each answer tells you
          something different about the job — and what to do about it.
        </p>
      </section>

      {/* ── Reading the output ──────────────────────────────────────── */}
      <section className="wc-qt-section" id="reading">
        <h2>Reading the output</h2>
        <p className="wc-qt-sub">What each number is telling you, and the decision it should drive.</p>

        <table className="wc-qt-table">
          <thead>
            <tr><th>Output</th><th>What it means</th><th>What to do with it</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Recommended estimate</td>
              <td>The highest of the three signals.</td>
              <td>The number you send, before any deliberate strategic discount.</td>
            </tr>
            <tr>
              <td>Set by</td>
              <td>Which signal won.</td>
              <td>See the three cases below — each means something different.</td>
            </tr>
            <tr>
              <td>On-site hours</td>
              <td>Total production time across all lines, excluding drive.</td>
              <td>Schedule with it. If it exceeds a working day, split the visit.</td>
            </tr>
            <tr>
              <td>Effective margin</td>
              <td>Gross margin after the bundle discount.</td>
              <td>If it drifted well below target, the discount is too deep.</td>
            </tr>
            <tr>
              <td>Revenue per on-site hour</td>
              <td>Estimate ÷ production hours.</td>
              <td>The single best cross-job comparator you have.</td>
            </tr>
            <tr>
              <td>Blended $/sq ft</td>
              <td>Estimate ÷ total area across all surfaces.</td>
              <td>Sanity-check against published ranges before sending.</td>
            </tr>
          </tbody>
        </table>

        <h3>If &ldquo;Bundled surface rates&rdquo; set the price</h3>
        <p>
          This is the healthy, ordinary case: the market rate for the work is comfortably above
          what the job costs you, so your margin is better than your target and the price is one
          the customer will recognize as normal. Send it. If this is what you see on almost every
          job, your rates are well calibrated to your costs.
        </p>

        <h3>If &ldquo;Your margin floor&rdquo; set the price</h3>
        <p>
          The job costs more to deliver than the market rate would pay for, so the calculator
          raised the price to protect your margin. Usually the cause is heavy condition on a
          slow surface, a long-hours job, or a labor cost that has crept up since you last set
          your rates. Before sending, check the estimate against the blended $/sq ft figure — if
          it is far above published ranges the customer may balk, and the real answer is either
          to walk away or to accept a thinner margin knowingly rather than by accident.
        </p>

        <h3>If &ldquo;Your job minimum&rdquo; set the price</h3>
        <p>
          The job is too small for square-foot pricing to cover showing up. This is the correct
          outcome, not a bug. The productive response is to see whether anything else on the
          property can be added to the visit — a walkway, a patio, the front steps — because the
          marginal cost of another twenty minutes while the rig is already set up is trivial and
          it converts a break-even call-out into a real job.
        </p>
      </section>

      {/* ── Worked examples ─────────────────────────────────────────── */}
      <section className="wc-qt-section" id="examples">
        <h2>Three worked estimates</h2>
        <p className="wc-qt-sub">
          Each figure below is produced by the calculator above from the stated inputs — enter
          them yourself and you will get the same numbers. One example per pricing signal.
        </p>

        <h3>Example 1 — a standard residential bundle</h3>
        <p>
          A single-storey home with a two-car driveway and a small patio. Inputs: driveway 800 sq
          ft moderate, siding 1,800 sq ft moderate, patio 400 sq ft light, labor cost $35 per
          crew-hour, $45 chemical, $25 travel, 50% target margin, $150 minimum, 10% bundle
          discount.
        </p>
        <div className="wc-qt-example">
          <div className="head">Example 1 · three surfaces · set by bundled surface rates</div>
          <div className="body">
            <div className="wc-qt-line"><span className="lbl">Driveway — 800 sq ft, moderate<small>2.2 hrs · $0.26/sq ft</small></span><span className="amt">$211</span></div>
            <div className="wc-qt-line"><span className="lbl">House siding — 1,800 sq ft, moderate<small>6.4 hrs · $0.36/sq ft</small></span><span className="amt">$648</span></div>
            <div className="wc-qt-line"><span className="lbl">Patio — 400 sq ft, light<small>1.0 hr · $0.25/sq ft</small></span><span className="amt">$100</span></div>
            <div className="wc-qt-line"><span className="lbl">Subtotal</span><span className="amt">$959</span></div>
            <div className="wc-qt-line discount"><span className="lbl">Bundle discount (10%)</span><span className="amt">−$96</span></div>
            <div className="wc-qt-line total"><span className="lbl">Recommended estimate</span><span className="amt">$863</span></div>
          </div>
        </div>
        <p>
          Job cost is $408 (9.7 hours at $35, plus chemical and travel), so the cost-plus floor
          sits at $816 — just under the discounted rate price. The rate signal wins by a narrow
          margin, which is exactly what a well-calibrated rate card looks like. Effective margin
          lands at 53%, revenue per on-site hour at $89, blended rate at $0.29 per sq ft. That
          blended figure is comfortably inside published residential ranges, so the estimate will
          not raise an eyebrow.
        </p>

        <h3>Example 2 — a small job that hits the minimum</h3>
        <p>
          A short single-width driveway, lightly soiled, nothing else on the property. Inputs:
          driveway 300 sq ft light, $35 labor cost, $10 chemical, $15 travel, 50% margin, $150
          minimum.
        </p>
        <div className="wc-qt-example">
          <div className="head">Example 2 · one surface · set by the job minimum</div>
          <div className="body">
            <div className="wc-qt-line"><span className="lbl">Driveway — 300 sq ft, light<small>0.7 hrs · $0.22/sq ft</small></span><span className="amt">$66</span></div>
            <div className="wc-qt-line"><span className="lbl">Cost-plus floor at 50% margin</span><span className="amt">$97</span></div>
            <div className="wc-qt-line total"><span className="lbl">Recommended estimate (minimum applies)</span><span className="amt">$150</span></div>
          </div>
        </div>
        <p>
          The rate price of $66 and even the cost-plus floor of $97 are both below the $150
          minimum, so the minimum sets the price. Sending $66 for this job would mean driving
          out, setting up and packing down for less than the cost of the visit. The right move
          before sending is a single question to the customer: is there a walkway, patio or set
          of steps you would like done at the same time? Adding a 400 sq ft patio to this visit
          takes about an hour and moves the estimate well clear of the floor.
        </p>

        <h3>Example 3 — heavy conditions, margin floor wins</h3>
        <p>
          A neglected two-storey property: a badly streaked roof and heavily soiled siding, quoted
          by a two-person crew. Inputs: roof 2,000 sq ft heavy, siding 2,200 sq ft heavy, $45 labor
          cost per crew-hour, $110 chemical, $40 travel, 55% target margin, 15% bundle discount.
        </p>
        <div className="wc-qt-example">
          <div className="head">Example 3 · two surfaces · set by the margin floor</div>
          <div className="body">
            <div className="wc-qt-line"><span className="lbl">Roof — 2,000 sq ft, heavy<small>12.8 hrs · $0.75/sq ft</small></span><span className="amt">$1,500</span></div>
            <div className="wc-qt-line"><span className="lbl">House siding — 2,200 sq ft, heavy<small>10.1 hrs · $0.45/sq ft</small></span><span className="amt">$990</span></div>
            <div className="wc-qt-line"><span className="lbl">Subtotal</span><span className="amt">$2,490</span></div>
            <div className="wc-qt-line discount"><span className="lbl">Bundle discount (15%)</span><span className="amt">−$374</span></div>
            <div className="wc-qt-line"><span className="lbl">Discounted rate price</span><span className="amt">$2,117</span></div>
            <div className="wc-qt-line total"><span className="lbl">Recommended estimate (margin floor)</span><span className="amt">$2,619</span></div>
          </div>
        </div>
        <p>
          Nearly 23 hours of production time at $45 per crew-hour is $1,029 of labor, and with
          chemical and travel the visit costs $1,179 to deliver. At a 55% target that demands
          $2,619 — some $500 above what the discounted rate price would have charged. This is the
          floor doing its job. It is also a signal worth reading: a 15% bundle discount on a
          heavy, high-risk, multi-day job was too generous, and the honest fix is to reduce the
          discount rather than to accept a thinner margin on the most demanding work you take.
        </p>
      </section>

      {/* ── Workflow ────────────────────────────────────────────────── */}
      <section className="wc-qt-section" id="sending">
        <h2>Turning the number into a sent estimate</h2>
        <p className="wc-qt-sub">
          The calculator produces a defensible figure. Four things turn that figure into a
          document that wins work.
        </p>
        <p>
          <strong>Keep the lines, drop the internals.</strong> Send the per-surface prices and the
          bundle discount — customers respond well to seeing what each area costs and where their
          saving came from. Do not send your labor cost, your margin or the cost-plus floor. Those
          are your numbers, and volunteering them turns a price conversation into a negotiation
          about your business.
        </p>
        <p>
          <strong>Say which method each surface gets.</strong> A line reading &ldquo;house siding,
          1,800 sq ft, soft wash with sodium hypochlorite and surfactant under 500 PSI&rdquo; is
          worth more than the same line without the method, because it is the visible difference
          between you and the operator who will point a turbo nozzle at the same wall for less
          money.
        </p>
        <p>
          <strong>Decide whether it is an estimate or a quote.</strong> If you measured the
          surfaces yourself, this is a firm price and belongs in a quote with acceptance terms.
          If you priced it from photos or a description, present it as a range with your
          assumptions stated. The two documents do different jobs and the difference is not
          cosmetic.
        </p>
        <p>
          <strong>Send it the same day.</strong> Nothing else on this page moves your close rate
          as much. The estimate that arrives while the conversation is fresh wins work that the
          more carefully formatted one, sent four days later, does not.
        </p>
      </section>
    </SeoPageShell>
  );
}
