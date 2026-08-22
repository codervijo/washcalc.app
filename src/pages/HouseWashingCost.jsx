import SeoPageShell from "../components/SeoPageShell.jsx";
import { HOUSE_COST } from "./seoPages.js";

const TOC = [
  { id: "cost", label: "What house washing costs" },
  { id: "measuring", label: "Measuring siding area" },
  { id: "factors", label: "Siding material and storey count" },
  { id: "examples", label: "Worked examples" },
  { id: "diy", label: "DIY versus professional" },
  { id: "faq", label: "FAQ" },
];

const LINKS = [
  { to: "/calculators/house-washing", label: "House washing calculator", note: "price a specific home, with SH dilution and job-profit tools." },
  { to: "/roof-cleaning-cost", label: "Roof cleaning cost", note: "the natural companion sale on the same visit." },
  { to: "/driveway-pressure-washing-cost", label: "Driveway pressure washing cost", note: "the other half of most residential bundles." },
  { to: "/pressure-washing-estimate-calculator", label: "Estimate calculator", note: "total a house-plus-driveway visit as one estimate." },
  { to: "/pressure-washing-quote-template", label: "Quote template", note: "the firm document to send once you have measured." },
  { to: "/pressure-washing-pricing-guide", label: "Pressure washing pricing guide", note: "the full 2026 method behind these rates." },
];

export default function HouseWashingCost() {
  return (
    <SeoPageShell
      meta={HOUSE_COST}
      lead="House washing is the most repeatable service in residential exterior cleaning and the one where quotes vary most wildly. Almost all of that variance traces to a single thing: how the siding area was measured. This guide covers 2026 pricing, how to measure a home properly, what siding material and storey count really cost, and three worked examples."
      toc={TOC}
      links={LINKS}
    >
      {/* ── Cost ────────────────────────────────────────────────────── */}
      <section className="wc-qt-section" id="cost">
        <h2>What house washing costs in 2026</h2>
        <p className="wc-qt-sub">Published national benchmarks. Regional labor markets move these more than any other surface.</p>

        <div className="wc-table-scroll">
          <table className="wc-qt-table">
            <thead>
              <tr><th>Measure</th><th>Typical 2026 range</th><th>Source</th></tr>
            </thead>
            <tbody>
              <tr><td>Soft washing</td><td className="wc-qt-rate">$0.25–$0.75 / sq ft</td><td className="wc-regional-src">HomeGuide</td></tr>
              <tr><td>Pressure washing</td><td className="wc-qt-rate">$0.15–$0.50 / sq ft</td><td className="wc-regional-src">HomeGuide</td></tr>
              <tr><td>Whole-house job</td><td className="wc-qt-rate">$100–$711 (avg ≈ $311)</td><td className="wc-regional-src">Angi</td></tr>
              <tr><td>High-cost urban markets</td><td className="wc-qt-rate">+20% to +50%</td><td className="wc-regional-src">Angi</td></tr>
              <tr><td>Southeast &amp; rural markets</td><td className="wc-qt-rate">−10% to −20%</td><td className="wc-regional-src">Cajun Soft Wash</td></tr>
            </tbody>
          </table>
        </div>
        <p className="wc-qt-note">
          The regional rows are documented adjustments against the national baseline, not
          per-metro survey figures — comparable per-city medians are not published. The house
          washing calculator carries a fuller regional benchmark table.
        </p>

        <p>
          The $100 to $711 spread reported by Angi is not measurement noise. It is the honest
          range across a service that covers a small single-storey bungalow with 900 square feet
          of vinyl and a large two-storey home with 3,000 square feet of stucco and difficult
          access. The average of roughly $311 describes a typical single-storey house, and it is
          a reasonable anchor for exactly that.
        </p>
        <p>
          Two houses of the same advertised floor area can carry very different siding areas, and
          that is where most quoting error originates. Everything else on this page is downstream
          of measuring the walls correctly.
        </p>
      </section>

      {/* ── Measuring ───────────────────────────────────────────────── */}
      <section className="wc-qt-section" id="measuring">
        <h2>Measuring siding area properly</h2>
        <p className="wc-qt-sub">
          The single highest-leverage skill in house wash pricing, and the one most often skipped.
        </p>
        <p>
          Siding area is not floor area. It is the wall surface you will actually clean: the
          perimeter of the building multiplied by the wall height, counted per storey. A home
          advertised at 2,000 square feet of living space spread over two floors has a footprint
          of roughly 1,000 square feet — but the walls around that footprint, at two storeys of
          height, add up to considerably more than 2,000 square feet of siding.
        </p>

        <div className="wc-qt-formula wc-qt-formula-light">
          <div className="eq">
            <b>perimeter</b> × <b>wall height per storey</b> × <b>number of storeys</b> = siding area
          </div>
          <small>
            Pace the perimeter, count roughly 8–10 feet of wall height per storey, and only
            subtract genuinely large openings such as garage doors and picture windows.
          </small>
        </div>

        <p>
          Do not deduct ordinary windows and doors. You still have to clean around them, work more
          carefully near them, and the time you save on the glass you lose on the trim. Deducting
          them systematically underprices the job while making the estimate look more precise than
          it is.
        </p>
        <p>
          Gables, dormers and bay windows add area that a simple perimeter calculation misses
          entirely, and they add disproportionate time because they are awkward to reach. A
          practical approach is to price the rectangular walls by formula and add a flat allowance
          per gable or dormer, tuned from your own jobs.
        </p>
        <p>
          If you are quoting from photographs rather than standing at the property, this is
          precisely the situation where you send an estimate with your assumptions stated rather
          than a firm quote — because the number you cannot verify is the one that determines the
          price.
        </p>
      </section>

      {/* ── Factors ─────────────────────────────────────────────────── */}
      <section className="wc-qt-section" id="factors">
        <h2>Siding material and storey count</h2>
        <p className="wc-qt-sub">Material changes method and pace. Storey count changes everything else.</p>

        <div className="wc-table-scroll">
          <table className="wc-qt-table">
            <thead>
              <tr><th>Siding</th><th>Method</th><th>Pricing note</th></tr>
            </thead>
            <tbody>
              <tr><td>Vinyl</td><td>Soft wash, low pressure</td><td>The standard case and the fastest. Never high pressure — water driven behind the panels stays there.</td></tr>
              <tr><td>Painted wood</td><td>Soft wash, gentle mix</td><td>Treat as paint. Chalking and flaking need to be identified and excluded before you start.</td></tr>
              <tr><td>Stucco</td><td>Soft wash, careful rinse</td><td>Porous and absorbent. Slower rinsing, higher risk of streaking. Price at the top of your band.</td></tr>
              <tr><td>Unpainted brick</td><td>Soft wash, tolerates more</td><td>Efflorescence will not lift with sodium hypochlorite alone — exclude it or price a separate treatment.</td></tr>
              <tr><td>Painted brick</td><td>Soft wash, gentle mix</td><td>Behaves like paint, not brick. Cheap paint jobs come off under pressure.</td></tr>
              <tr><td>Fiber cement</td><td>Soft wash</td><td>Durable and predictable. Watch the caulk lines and butt joints.</td></tr>
            </tbody>
          </table>
        </div>

        <p>
          Across all of these the constant is method: on siding, the chemistry does the cleaning
          and the water only rinses. A soft wash uses a sodium hypochlorite solution with a
          surfactant to kill mould and algae at the wall and carry it away at low pressure. That
          is a genuine technical distinction from pressure washing, and it is worth stating in
          your quote — when you are being compared against someone promising to pressure wash
          vinyl, you are not competing on price, you are competing on whether the job is done
          correctly.
        </p>
        <p>
          Storey count is the largest cost step in house washing. Ground-floor siding is quick
          work with a downstream injector and a wand from the lawn. Everything above it involves
          ladders, or extension wands and telescoping poles that are heavier, slower and harder
          to aim, with the added constraint that rinse has to run downward over walls you have
          already cleaned or you will streak them. Many operators carry an explicit two-storey
          uplift rather than treating it as a judgement call, because the extra time is both real
          and predictable.
        </p>
        <p>
          Access is the quiet multiplier alongside it. Mature planting beds against the walls,
          narrow side alleys, fenced pool enclosures and steep grade all add setup time before any
          cleaning begins, and all of them are invisible in a photograph.
        </p>
      </section>

      {/* ── Examples ────────────────────────────────────────────────── */}
      <section className="wc-qt-section" id="examples">
        <h2>Worked examples</h2>
        <p className="wc-qt-sub">
          Three homes priced with the WashCalc default model — $0.30 per square foot base rate at
          350 sq ft per hour, with a 50% target margin.
        </p>

        <h3>A small single-storey home, lightly soiled</h3>
        <p>
          1,400 sq ft of vinyl siding, light condition, $35 per crew-hour of labor cost, $25 of
          chemical, $20 travel. The model returns <strong>$420</strong> at $0.30 per square foot,
          across roughly 4 hours. Job cost is near $185, giving a margin around 56%.
        </p>
        <p>
          This sits above Angi's $311 average, and the reason is worth naming: the average
          describes all house washes including the small and simple ones, while this figure
          protects a 50% margin at a realistic production rate. If your local market will not
          bear $420 for this house, the lever to pull is your cost base, not your margin.
        </p>

        <h3>A typical single-storey home with real growth</h3>
        <p>
          1,800 sq ft of siding, moderate condition, $35 of chemical. The model returns
          <strong> $648</strong> at an effective $0.36 per square foot, across about 6.4 hours,
          with job cost near $280 and margin around 57%.
        </p>
        <p>
          The condition multiplier is doing visible work: the same wall in light condition would
          price at $540. That $108 difference is not padding. Established growth on shaded north
          walls needs a stronger mix and a longer dwell, and the calculator adds an extra 1.3
          hours of production time to match.
        </p>

        <h3>A two-storey home, two-person crew</h3>
        <p>
          2,800 sq ft of siding, moderate condition, a two-person crew at $45 per crew-hour, $50
          of chemical, $25 travel. The model returns <strong>$1,050</strong> at $0.38 per square
          foot, across roughly 10 hours of production time, with job cost near $525 at a 50%
          margin.
        </p>
        <p>
          This is where measuring properly pays for itself. Quoting this home from its listed
          floor area — call it 2,000 square feet — would have produced a price near $720 for a job
          that costs $525 to deliver, cutting the margin from 50% to about 27% on the most
          physically demanding residential work available. The house did not change. Only the
          measurement did.
        </p>

        <div className="wc-cta-banner" style={{ marginTop: 28 }}>
          <h3>Price a specific house wash</h3>
          <p>Siding area, condition and your own costs — plus SH dilution and job profitability tools.</p>
          <a href="/calculators/house-washing" className="wc-btn wc-btn-primary">Open the house washing calculator</a>
        </div>
      </section>

      {/* ── DIY ─────────────────────────────────────────────────────── */}
      <section className="wc-qt-section" id="diy">
        <h2>DIY versus professional</h2>
        <p className="wc-qt-sub">The ground floor is approachable. Above it, the calculation changes.</p>
        <p>
          Washing the ground-floor walls of a single-storey home is within reach for a careful
          homeowner. A garden sprayer, a correctly diluted sodium hypochlorite solution with a
          surfactant, sufficient dwell time and a gentle rinse from a garden hose will clean vinyl
          siding properly. The chemistry is what matters, and it does not require professional
          equipment.
        </p>
        <p>
          Two mistakes account for most DIY damage. The first is reaching for pressure. A
          pressure washer aimed at lap siding drives water up behind the panels, where it sits
          against the sheathing and does not dry — and on painted surfaces it strips the finish
          outright. The second is neglecting the plants. Sodium hypochlorite kills vegetation, so
          beds need pre-wetting before the solution goes on and thorough rinsing after, and on a
          heavily planted property that is a genuine share of the job.
        </p>
        <p>
          The line is height. Once you are washing above the ground floor you are on a ladder with
          a hose that pulls, working over surfaces made slick by the solution, holding an
          extension wand that gets heavy quickly. That is the point where the saving stops being
          worth it, and it is also the point where results start to suffer — streaking from
          uneven rinse is the usual outcome, and it is more visible than the dirt was.
        </p>
        <p>
          There is also a maintenance argument that applies to neither difficulty nor risk. House
          washing works best on an annual cycle, because a year of growth comes off far more
          easily than three years of it. A property kept on that schedule is cheaper to maintain
          per visit than one washed occasionally, whoever does the work.
        </p>
      </section>
    </SeoPageShell>
  );
}
