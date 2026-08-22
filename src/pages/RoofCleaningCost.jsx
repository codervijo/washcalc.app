import SeoPageShell from "../components/SeoPageShell.jsx";
import { ROOF_COST } from "./seoPages.js";

const TOC = [
  { id: "cost", label: "What roof cleaning costs" },
  { id: "factors", label: "What moves the price" },
  { id: "methods", label: "How contractors price roofs" },
  { id: "examples", label: "Worked examples" },
  { id: "diy", label: "DIY versus professional" },
  { id: "faq", label: "FAQ" },
];

const LINKS = [
  { to: "/calculators/roof", label: "Roof cleaning cost calculator", note: "put your own numbers in and get a price for a specific roof." },
  { to: "/house-washing-cost", label: "House washing cost", note: "roofs and siding are usually sold together — price the pair." },
  { to: "/pressure-washing-estimate-calculator", label: "Estimate calculator", note: "build a roof-plus-siding visit as one multi-line estimate." },
  { to: "/pressure-washing-quote-template", label: "Quote template", note: "the exclusions wording that matters most on roof work." },
  { to: "/pressure-washing-pricing-guide", label: "Pressure washing pricing guide", note: "how roof rates fit the wider 2026 pricing picture." },
];

export default function RoofCleaningCost() {
  return (
    <SeoPageShell
      meta={ROOF_COST}
      lead="Roof cleaning carries the highest price per square foot in residential exterior work and the highest risk behind it. This guide covers what the job costs in 2026, the factors that move the number, how contractors actually build the price, and where the honest line sits between doing it yourself and hiring it out."
      toc={TOC}
      links={LINKS}
    >
      {/* ── Cost ────────────────────────────────────────────────────── */}
      <section className="wc-qt-section" id="cost">
        <h2>What roof cleaning costs in 2026</h2>
        <p className="wc-qt-sub">
          Benchmark ranges from published national pricing guides. Treat them as a sanity check
          on a number you built yourself — never as the number.
        </p>

        <div className="wc-table-scroll">
          <table className="wc-qt-table">
            <thead>
              <tr><th>Measure</th><th>Typical 2026 range</th><th>Source</th></tr>
            </thead>
            <tbody>
              <tr><td>Soft-wash roof cleaning</td><td className="wc-qt-rate">$0.40–$0.60 / sq ft</td><td className="wc-regional-src">HomeGuide, Angi</td></tr>
              <tr><td>Typical residential job</td><td className="wc-qt-rate">$300–$700</td><td className="wc-regional-src">HomeGuide, Angi</td></tr>
              <tr><td>Chemical cost per average roof</td><td className="wc-qt-rate">$40–$80</td><td className="wc-regional-src">WashCalc contractor guidance</td></tr>
              <tr><td>Target gross margin</td><td className="wc-qt-rate">55%+</td><td className="wc-regional-src">WashCalc default model</td></tr>
            </tbody>
          </table>
        </div>
        <p className="wc-qt-note">
          Ranges reflect national residential guides and will not match every regional market.
          The chemical and margin rows are WashCalc's own contractor guidance, not survey data —
          they are starting assumptions to tune against your own numbers.
        </p>

        <p>
          The wide spread is not vagueness. A roof is one of the few surfaces where two jobs of
          identical square footage can legitimately differ in price by a factor of two, because
          the square footage is genuinely the least important input. A single-storey ranch with a
          4/12 pitch, clear ground access on all sides and two years of light streaking is
          straightforward work. A three-storey house with a 10/12 pitch, landscaping tight to the
          walls and a decade of established gloeocapsa magma is a different job that happens to
          have a similar area.
        </p>
        <p>
          If you are a homeowner reading a quote, that is why comparing two roof prices on
          dollars per square foot alone is misleading. If you are a contractor writing one, it is
          why a rate card alone will not price roofs correctly — the condition and access
          adjustments do more work here than on any other surface you sell.
        </p>
      </section>

      {/* ── Factors ─────────────────────────────────────────────────── */}
      <section className="wc-qt-section" id="factors">
        <h2>What moves the price</h2>
        <p className="wc-qt-sub">In rough order of how much each one actually changes the number.</p>

        <div className="wc-qt-anatomy">
          <div className="item"><div className="n">01</div><h4>Pitch</h4><p>Walkable versus rope-and-harness is the single biggest cost step. Steep work is slower, needs fall protection, and carries insurance weight.</p></div>
          <div className="item"><div className="n">02</div><h4>Storey count &amp; access</h4><p>Ground-level reach is fast. Three storeys, tight side alleys or landscaping against the walls all add setup time before any cleaning starts.</p></div>
          <div className="item"><div className="n">03</div><h4>Algae severity</h4><p>Light streaking needs one pass. Heavy established growth needs a stronger mix, longer dwell and often a second application.</p></div>
          <div className="item"><div className="n">04</div><h4>Roof material</h4><p>Asphalt shingle is the standard case. Tile is fragile underfoot, cedar shake needs a gentler mix, and metal demands rinse discipline to avoid streaking.</p></div>
          <div className="item"><div className="n">05</div><h4>Landscaping exposure</h4><p>Beds, ornamentals and lawn under the drip line all need pre-wetting, tarping and post-rinsing. That is real time nobody quotes for on their first job.</p></div>
          <div className="item"><div className="n">06</div><h4>Gutter and fascia condition</h4><p>Streaked gutter faces are visible from the ground and will be judged as part of your work whether or not they were in the quote.</p></div>
        </div>

        <p>
          Pitch deserves a note of its own because it is where inexperienced quoting goes wrong.
          A roof you can walk lets you work steadily with an extension wand and see what you are
          doing. Once the pitch forces harnesses and anchors, or pushes you onto ladders and
          poles for the entire job, the hours can double on the same area — and the risk you are
          carrying changes character entirely. Whether you handle that as a pitch surcharge, a
          condition step-up or a separate access line matters far less than the fact that it
          lands in the price at all.
        </p>
        <p>
          Landscaping is the factor most often missed. Sodium hypochlorite kills plants, so
          pre-wetting beds, tarping ornamentals and rinsing everything down afterwards is not
          optional care — it is part of the job. On a heavily planted property that can add an
          hour before you start and another after you finish, on top of work that already has the
          lowest production rate of any surface you clean.
        </p>
      </section>

      {/* ── Methods ─────────────────────────────────────────────────── */}
      <section className="wc-qt-section" id="methods">
        <h2>How contractors price roofs</h2>
        <p className="wc-qt-sub">Three pricing models, and when each is the right one.</p>

        <h3>Per square foot — the internal method</h3>
        <p>
          Almost every operator calculates per square foot behind the scenes, because it is the
          only model that stays consistent across roofs of different sizes. The rate is applied
          to the roof area, then adjusted for condition. WashCalc's default model uses $0.50 per
          square foot at a production rate of 250 sq ft per hour, with condition multipliers of
          ×1.0 light, ×1.2 moderate and ×1.5 heavy applied to the rate, and separate time
          multipliers applied to the hours.
        </p>

        <h3>Flat job price — the customer-facing method</h3>
        <p>
          What you present is a single number. Homeowners do not want to audit a square-foot
          calculation, and offering one invites a debate about your measurements rather than
          about the work. Calculate per square foot, then present flat. The exception is
          commercial and property-management work, where the buyer often does want the rate
          shown because they are comparing across a portfolio.
        </p>

        <h3>Hourly — almost never</h3>
        <p>
          Hourly pricing is rare on roofs and usually a mistake. It caps your earnings on exactly
          the jobs where experience and good equipment save the most time, and it invites the
          customer to watch the clock on work that should be paced for safety rather than speed.
          The one place it earns its keep is genuinely unpredictable remediation — an unusual
          contamination, a roof nobody can assess from the ground — where a fixed price would be
          a guess.
        </p>

        <div className="wc-qt-callout">
          <strong>The floor underneath all three.</strong> Whichever model you present, check the
          result against your cost-plus floor: total job cost divided by one minus your target
          margin. On roofs, where target margins run higher than other surfaces because of the
          risk, that floor catches underpriced jobs the rate card alone would let through.
        </div>
      </section>

      {/* ── Examples ────────────────────────────────────────────────── */}
      <section className="wc-qt-section" id="examples">
        <h2>Worked examples</h2>
        <p className="wc-qt-sub">
          Three roofs priced with the WashCalc default model. Every figure is reproducible in the
          roof calculator from the inputs shown.
        </p>

        <h3>A straightforward single-storey roof</h3>
        <p>
          1,200 sq ft, light streaking, walkable pitch, clear access. At $35 per crew-hour of
          labor cost, $60 of chemical and $25 of travel, with a 55% target margin, the model
          returns <strong>$600</strong> — exactly $0.50 per square foot, sitting mid-range against
          published guides. Production time is about 4.8 hours, job cost lands near $253, and the
          gross margin comes out around 58%.
        </p>
        <p>
          This is the job the published ranges describe. If your own number for a roof like this
          is far below $600, check whether you have accounted for the chemical properly and
          whether your production rate assumption survives contact with a real roof.
        </p>

        <h3>An average roof with real algae</h3>
        <p>
          1,500 sq ft, moderate streaking, $70 of chemical, same labor and travel. The condition
          multiplier takes the effective rate to $0.60 per square foot and the price to
          <strong> $900</strong>, with about 7.5 hours of production time. Note that the price is
          above the $300–$700 headline range from the national guides — and that is the model
          being right rather than wrong. Those headline ranges describe typical roofs; this one is
          both larger than typical and genuinely dirtier, and it takes half again as long as the
          first example.
        </p>

        <h3>A neglected two-storey roof</h3>
        <p>
          2,400 sq ft, heavy established growth, a two-person crew at $45 per crew-hour, $95 of
          chemical and $35 of travel at a 55% target. The model returns <strong>$1,825</strong>,
          about $0.76 per square foot, across roughly 15.4 hours of production time. Job cost is
          near $821, leaving margin right at target.
        </p>
        <p>
          A price like this needs to be sold, not just sent. The itemization is what does it:
          state the area, the method, the second application, the landscaping protection and the
          number of on-site hours. A homeowner who has been quoted $700 by someone working from
          a rate card and a glance from the street will otherwise have no way to understand the
          difference — and the operator quoting $700 will lose money on the job.
        </p>

        <div className="wc-cta-banner" style={{ marginTop: 28 }}>
          <h3>Price a specific roof</h3>
          <p>Enter the area, condition and your own costs — the calculator runs the same model used above.</p>
          <a href="/calculators/roof" className="wc-btn wc-btn-primary">Open the roof cleaning calculator</a>
        </div>
      </section>

      {/* ── DIY ─────────────────────────────────────────────────────── */}
      <section className="wc-qt-section" id="diy">
        <h2>DIY versus professional</h2>
        <p className="wc-qt-sub">The honest version, including where the DIY case is real.</p>
        <p>
          The chemistry is not the hard part. A sodium hypochlorite and surfactant mix is
          straightforward, the materials are available, and the theory takes ten minutes to
          understand. If roof cleaning were done at ground level, it would be a reasonable
          weekend job for a careful homeowner.
        </p>
        <p>
          It is not done at ground level, and that is the whole argument. The work happens on a
          sloped surface that becomes slick the moment the solution goes down, usually while
          handling a hose that pulls against you and moving a ladder repeatedly. Roof falls are
          not a marginal risk; they are the reason professional operators carry the insurance
          they do. Against that, the realistic saving is a few hundred dollars on a typical
          residential roof.
        </p>
        <p>
          The second argument is quieter and costs more. Reaching for a pressure washer instead
          of a soft-wash setup strips the granules that give asphalt shingles their service life,
          and it will void most manufacturer warranties. The damage does not look dramatic on the
          day — it shows up as shortened roof life several years later, long after the connection
          to one afternoon's work has been forgotten.
        </p>
        <p>
          Where DIY genuinely makes sense: a single-storey, low-pitch, walkable roof with light
          streaking, on a dry day, with proper fall protection and a pump sprayer rather than a
          pressure washer. That job is manageable. A steep roof, a second storey, heavy
          established growth, or working alone are each individually good reasons to hire it out.
        </p>
      </section>
    </SeoPageShell>
  );
}
