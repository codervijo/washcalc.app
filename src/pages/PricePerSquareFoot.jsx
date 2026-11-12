import SeoPageShell from "../components/SeoPageShell.jsx";
import { PER_SQFT, exampleQuote, EXAMPLE_COSTS } from "./seoPages.js";
import { SURFACES, PER_SQFT_BY_MATERIAL, SOURCES, HOURLY, rateRange, base, productionRate } from "../rates.js";
import { formatMoney2 } from "../PricingEngine.js";

const TOC = [
  { id: "by-surface", label: "Price per square foot by surface" },
  { id: "curve", label: "Why the rate drops as jobs grow" },
  { id: "quote", label: "Turning a rate into a quote" },
  { id: "measure", label: "Measuring square footage" },
  { id: "wrong-unit", label: "When per-square-foot is the wrong unit" },
  { id: "faq", label: "FAQ" },
];

const LINKS = [
  { to: "/calculator", label: "Pressure washing price calculator", note: "every surface on one form, with the rate card shown." },
  { to: "/pressure-washing-pricing-guide", label: "How much to charge for pressure washing", note: "the full pricing method, from cost floor to final quote." },
  { to: "/commercial-pressure-washing-pricing", label: "Commercial pressure washing pricing", note: "per-space, per-foot and contract rates for commercial sites." },
  { to: "/driveway-pressure-washing-cost", label: "Driveway pressure washing cost", note: "concrete rates in depth, with worked examples." },
  { to: "/house-washing-cost", label: "House washing cost", note: "soft-wash siding rates and measuring a house properly." },
  { to: "/deck-pressure-washing-cost", label: "Deck pressure washing cost", note: "wood and composite, railings and stain add-ons." },
  { to: "/roof-cleaning-cost", label: "Soft wash roof cleaning cost", note: "the highest per-foot rate in residential work." },
];

const HCP = SOURCES.housecallPro;
const HGR = SOURCES.homeguideResidential;
const cents = (n) => `$${n.toFixed(2)}`;

// Which of the engine's three signals set the price.
function driver(r, area) {
  const rate = area * r.surface.baseRate * r.condition.multiplier;
  if (r.recommendedPrice === EXAMPLE_COSTS.minimumCharge && rate < EXAMPLE_COSTS.minimumCharge) return "Minimum charge";
  return rate >= r.recommendedPrice - 0.005 ? "Rate card" : "Cost-plus floor";
}
const CURVE = [150, 300, 500, 800, 1200, 2000, 3000].map((area) => {
  const r = exampleQuote("driveway", area);
  return { area, r, by: driver(r, area) };
});
const tiny = exampleQuote("patio", 150);

export default function PricePerSquareFoot() {
  return (
    <SeoPageShell
      meta={PER_SQFT}
      lead={`Most residential pressure washing is priced at $0.10–$0.50 per square foot, with wood and roofs higher — concrete runs $0.20–$0.40, vinyl siding $0.20–$0.50 and roofs $0.50–$1.00 (${HCP.name}, ${HCP.date}). HomeGuide puts the overall average near $0.40. The rate isn't fixed: small jobs cost more per foot because a minimum charge covers the trip, and large ones settle at the surface rate.`}
      toc={TOC}
      links={LINKS}
    >
      <section className="wc-qt-section" id="by-surface">
        <h2>Price per square foot by surface</h2>
        <p className="wc-qt-sub">Published ranges by material, next to the WashCalc rate card. Labelled so they're never mixed up.</p>
        <div className="wc-table-scroll">
          <table className="wc-qt-table">
            <thead><tr><th>Surface</th><th>Published range / sq ft</th></tr></thead>
            <tbody>
              {PER_SQFT_BY_MATERIAL.map((m) => (
                <tr key={m.material}><td>{m.material}</td><td className="wc-qt-rate">{rateRange([m.lo, m.hi])}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="wc-qt-note">
          Source: <a href={HCP.url} rel="nofollow noopener" target="_blank">{HCP.name}, “{HCP.title}”</a> ({HCP.date}),
          which combines its own price-book data with third-party estimates.
        </p>
        <div className="wc-table-scroll" style={{ marginTop: 16 }}>
          <table className="wc-qt-table">
            <thead><tr><th>Surface</th><th>WashCalc band / sq ft</th><th>Base rate</th><th>Production, light</th></tr></thead>
            <tbody>
              {SURFACES.map((s) => (
                <tr key={s.id}>
                  <td>{s.label}</td><td className="wc-qt-rate">{rateRange(s.band)}</td>
                  <td>{base(s.id)}</td><td>≈ {productionRate(s.id)} sq ft/hr</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="wc-qt-note">
          WashCalc figures are the site's modelling assumptions — the rate card the calculators
          use — not survey data. Replace them with your own once you have job history.
        </p>
        <p>
          Two patterns hold across every source. Flat, open surfaces a surface cleaner can run
          across — driveways, patios, walks — sit at the bottom. Surfaces that need low pressure,
          chemistry, height or detail work — wood, stucco, roofs — sit at the top. Commercial
          flatwork goes lower again, from $0.10, because large areas spread fixed costs thin; see{" "}
          <a href="/commercial-pressure-washing-pricing">commercial pressure washing pricing</a>.
        </p>
      </section>

      <section className="wc-qt-section" id="curve">
        <h2>Why the rate drops as jobs grow</h2>
        <p>
          A per-square-foot rate looks like a straight line, but real quotes aren't. The table
          below runs one driveway through the WashCalc engine at increasing sizes, with the same
          costs every time: ${EXAMPLE_COSTS.laborRate}/crew-hour labor cost, ${EXAMPLE_COSTS.chemicalCost} chemical,
          ${EXAMPLE_COSTS.travelCost} travel, {EXAMPLE_COSTS.marginPct}% target margin and a ${EXAMPLE_COSTS.minimumCharge} minimum.
        </p>
        <div className="wc-table-scroll">
          <table className="wc-qt-table">
            <thead><tr><th>Driveway</th><th>Price</th><th>Per sq ft</th><th>What sets it</th></tr></thead>
            <tbody>
              {CURVE.map((c) => (
                <tr key={c.area}>
                  <td>{c.area.toLocaleString("en-US")} sq ft</td>
                  <td className="wc-qt-rate">{formatMoney2(c.r.recommendedPrice)}</td>
                  <td>{formatMoney2(c.r.pricePerSqFt)}</td>
                  <td>{c.by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Three regimes show up. Below a few hundred square feet the minimum charge is the price,
          and the per-foot figure is high because the job is mostly fixed cost. In the middle the
          cost-plus floor — what the job costs you, divided by one minus your margin — sets the
          number. Past roughly a thousand square feet the rate card takes over and the per-foot
          price flattens at the surface's base rate of {base("driveway")}.
        </p>
        <p>
          That is why published per-foot ranges are wide, and why “what do you charge per square
          foot?” is an incomplete question. The honest answer is a rate, a minimum and a floor.
        </p>
      </section>

      <section className="wc-qt-section" id="quote">
        <h2>Turning a per-square-foot rate into a quote</h2>
        <ol>
          <li><strong>Measure the surface you will clean</strong>, not the lot or the floor plan (see below).</li>
          <li><strong>Apply the surface rate and a condition adjustment.</strong> Heavier soiling means more chemical and slower production — WashCalc uses ×1.2 for moderate and ×1.5 for heavy.</li>
          <li><strong>Work out your cost floor:</strong> crew-hours × labor cost + chemical + travel, divided by (1 − target margin).</li>
          <li><strong>Quote the highest</strong> of the rate price, the floor and your minimum charge.</li>
        </ol>
        <p>
          The <a href="/calculator">pressure washing price calculator</a> runs all four steps at once
          for any surface and shows which number won.
        </p>
        <h3>The failure case: a tiny job at the per-foot rate</h3>
        <p>
          A 150 sq ft patio at the bottom of the published concrete range ($0.20) is a $30 quote.
          At the inputs above, that patio costs {formatMoney2(tiny.totalCost)} to deliver once the
          trip and setup are counted, and the engine prices it at {formatMoney2(tiny.recommendedPrice)} —
          the minimum. Quoting the per-foot rate on small jobs is the single most common way new
          operators lose money.
        </p>
      </section>

      <section className="wc-qt-section" id="measure">
        <h2>Measuring square footage by surface</h2>
        <div className="wc-qt-anatomy">
          <div className="item"><div className="n">01</div><h4>Driveways and patios</h4><p>Length × width for each rectangle, plus the flare at the street (extra width × depth ÷ 2). Add walks only if they're in scope.</p></div>
          <div className="item"><div className="n">02</div><h4>Siding</h4><p>Perimeter × wall height, plus each gable (width × gable height ÷ 2). Leave windows in. Floor area is the wrong number.</p></div>
          <div className="item"><div className="n">03</div><h4>Roofs</h4><p>Roof surface, not footprint: footprint × the pitch factor. The <a href="/calculators/roof">roof cleaning cost calculator</a> converts footprint and pitch for you.</p></div>
          <div className="item"><div className="n">04</div><h4>Decks</h4><p>Deck surface at the deck rate; railings, stairs and lattice measured or timed separately.</p></div>
          <div className="item"><div className="n">05</div><h4>Fences</h4><p>Length × height per side. Say on the quote whether you're cleaning one side or both — it doubles the area.</p></div>
        </div>
      </section>

      <section className="wc-qt-section" id="wrong-unit">
        <h2>When per-square-foot is the wrong unit</h2>
        <p>
          Area works when effort scales with area. It doesn't on detailed, mixed or awkward work:
          a porch with columns and spindles, a loading dock with equipment, a house with heavy
          landscaping against the walls. Bill those by the hour from your own cost per crew-hour.
          Published residential hourly rates run ${HOURLY.homeguideResidential[0]}–${HOURLY.homeguideResidential[1]} per hour
          ({HGR.name}, {HGR.date}); {HCP.name} puts residential at ${HOURLY.hcpResidential[0]}–${HOURLY.hcpResidential[1]} per crew member.
        </p>
        <p>
          Parking lots are usually priced per space rather than per foot, and gutters by the
          linear foot or as a flat add-on. Use the unit the customer can check, and keep your cost
          floor underneath it either way.
        </p>
      </section>
    </SeoPageShell>
  );
}
