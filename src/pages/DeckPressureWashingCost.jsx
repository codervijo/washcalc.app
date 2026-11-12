import SeoPageShell from "../components/SeoPageShell.jsx";
import { DECK_COST, exampleQuote, EXAMPLE_COSTS } from "./seoPages.js";
import { DECK_MATERIALS } from "./variants.js";
import { surface, rateRange, productionRate, DECK_PUBLISHED, SOURCES, RENTAL_PER_DAY, PUBLISHED } from "../rates.js";
import { formatMoney2, formatHours } from "../PricingEngine.js";

const TOC = [
  { id: "cost", label: "What deck pressure washing costs" },
  { id: "material", label: "Wood versus composite" },
  { id: "factors", label: "What moves a deck price" },
  { id: "examples", label: "Worked examples" },
  { id: "stain", label: "Cleaning before staining or sealing" },
  { id: "diy", label: "DIY versus hiring it out" },
  { id: "faq", label: "FAQ" },
];

const LINKS = [
  { to: "/calculators/deck", label: "Deck cleaning calculator", note: "price a deck with your own costs, plus the material selector and stain coverage tools." },
  { to: "/pressure-washing-price-per-square-foot", label: "Price per square foot by surface", note: "how deck rates compare with concrete, siding and roofs." },
  { to: "/pressure-washing-estimate-calculator", label: "Estimate calculator", note: "deck plus patio plus siding, totalled as one visit." },
  { to: "/house-washing-cost", label: "House washing cost", note: "the job most often booked with a deck clean." },
  { to: "/driveway-pressure-washing-cost", label: "Driveway pressure washing cost", note: "the flatwork end of the price range." },
  { to: "/pressure-washing-pricing-guide", label: "How much to charge for pressure washing", note: "the method behind every number on this page." },
];

const HGR = SOURCES.homeguideResidential;
const HCP = SOURCES.housecallPro;
const deck = surface("deck");
const usd = (n) => `$${n.toFixed(2)}`;
const mat = (id) => DECK_MATERIALS.find((m) => m.id === id);

// Engine-computed, same inputs as the FAQ (EXAMPLE_COSTS in seoPages.js).
const EXAMPLES = [
  { label: "Small landing", area: 200, conditionId: "light" },
  { label: "Typical deck, light mildew", area: 600, conditionId: "light" },
  { label: "Same deck, moderate (graying, mildew)", area: 600, conditionId: "moderate" },
  { label: "Same deck, heavy (black mildew, years untouched)", area: 600, conditionId: "heavy" },
  { label: "Large deck", area: 1000, conditionId: "light" },
].map((e) => ({ ...e, r: exampleQuote("deck", e.area, { conditionId: e.conditionId }) }));

const small = EXAMPLES[0].r;
const underbidPrice = 200 * DECK_PUBLISHED.typicalPerSqFt;

export default function DeckPressureWashingCost() {
  return (
    <SeoPageShell
      meta={DECK_COST}
      lead={`Pressure washing a deck typically costs $${DECK_PUBLISHED.job[0]}–$${DECK_PUBLISHED.job[1]}, or about $${DECK_PUBLISHED.typicalPerSqFt.toFixed(2)} per square foot (${HGR.name}, ${HGR.date}); ${HCP.name} puts decks at $${DECK_PUBLISHED.hcpJob[0]}–$${DECK_PUBLISHED.hcpJob[1]}. Cleaning plus staining and sealing runs $${DECK_PUBLISHED.washStainSeal[0].toFixed(2)}–$${DECK_PUBLISHED.washStainSeal[1].toFixed(2)} per square foot. Small decks cost more per foot because a minimum charge covers the trip; railings, stairs and lattice should be priced on top.`}
      toc={TOC}
      links={LINKS}
    >
      <section className="wc-qt-section" id="cost">
        <h2>What deck pressure washing costs</h2>
        <p className="wc-qt-sub">Published ranges and the WashCalc rate card, labelled so you know which is which.</p>
        <div className="wc-table-scroll">
          <table className="wc-qt-table">
            <thead><tr><th>Measure</th><th>Range</th><th>Source</th></tr></thead>
            <tbody>
              <tr><td>Typical deck, cleaning only</td><td className="wc-qt-rate">${DECK_PUBLISHED.job[0]}–${DECK_PUBLISHED.job[1]}</td><td className="wc-regional-src">{HGR.name}, {HGR.date}</td></tr>
              <tr><td>Typical deck, cleaning only</td><td className="wc-qt-rate">${DECK_PUBLISHED.hcpJob[0]}–${DECK_PUBLISHED.hcpJob[1]}</td><td className="wc-regional-src">{HCP.name}, {HCP.date}</td></tr>
              <tr><td>Average per square foot</td><td className="wc-qt-rate">≈ {usd(DECK_PUBLISHED.typicalPerSqFt)} / sq ft</td><td className="wc-regional-src">{HGR.name}</td></tr>
              <tr><td>Published deck range</td><td className="wc-qt-rate">{rateRange(PUBLISHED.deck.perSqFt)} / sq ft</td><td className="wc-regional-src">{PUBLISHED.deck.source}</td></tr>
              <tr><td>Clean + stain + seal</td><td className="wc-qt-rate">{rateRange(DECK_PUBLISHED.washStainSeal)} / sq ft</td><td className="wc-regional-src">{HGR.name}</td></tr>
              <tr><td>Lattice</td><td className="wc-qt-rate">{rateRange(DECK_PUBLISHED.lattice)} / sq ft</td><td className="wc-regional-src">{HGR.name}</td></tr>
              <tr><td>Underside of deck</td><td className="wc-qt-rate">{usd(DECK_PUBLISHED.underside)} / sq ft</td><td className="wc-regional-src">{HGR.name}</td></tr>
              <tr><td>WashCalc rate card — wood</td><td className="wc-qt-rate">{rateRange(deck.wood)} / sq ft</td><td className="wc-regional-src">WashCalc model</td></tr>
              <tr><td>WashCalc rate card — composite</td><td className="wc-qt-rate">{rateRange(deck.composite)} / sq ft</td><td className="wc-regional-src">WashCalc model</td></tr>
            </tbody>
          </table>
        </div>
        <p className="wc-qt-note">
          Sources: <a href={HGR.url} rel="nofollow noopener" target="_blank">{HGR.name}, “{HGR.title}”</a> ({HGR.date});{" "}
          <a href={HCP.url} rel="nofollow noopener" target="_blank">{HCP.name}, “{HCP.title}”</a> ({HCP.date}).
          WashCalc rate-card figures are modelling assumptions, not survey data.
        </p>
        <p>
          For a homeowner, the honest short answer is that a typical backyard deck costs a
          couple of hundred dollars to clean. For a contractor, the more useful answer is that
          the per-foot rate is only half the quote. Decks carry more hidden time than any other
          residential surface — railings, balusters, stair treads and risers, lattice skirting,
          furniture to move — and those parts are where deck jobs lose money.
        </p>
      </section>

      <section className="wc-qt-section" id="material">
        <h2>Wood versus composite</h2>
        <p>
          The board material changes the method more than it changes the price. Softwoods mark
          and fuzz under too much pressure; composite doesn't, but it has its own manufacturer
          limits. The pressures below come from the sourced material table behind the{" "}
          <a href="/calculators/deck">deck calculator's material selector</a>.
        </p>
        <div className="wc-table-scroll">
          <table className="wc-qt-table">
            <thead><tr><th>Material</th><th>Working PSI</th><th>Tip</th></tr></thead>
            <tbody>
              {["pt-pine", "cedar", "redwood", "composite", "ipe"].map((id) => {
                const m = mat(id);
                return <tr key={id}><td>{m.label}</td><td className="wc-qt-rate">{m.psiMin.toLocaleString("en-US")}–{m.psiMax.toLocaleString("en-US")}</td><td>{m.nozzle}</td></tr>;
              })}
            </tbody>
          </table>
        </div>
        <p className="wc-qt-note">PSI sources: Decks.com, Pristine Clean, RMFP; composite limit from the Trex care guide.</p>
        <p>
          Cedar and redwood are the slow ones: low pressure, a wide tip and a cleaner doing most
          of the work. That time is why WashCalc's wood band ({rateRange(deck.wood)}) sits above
          composite ({rateRange(deck.composite)}). Composite goes faster, but mildew in the
          embossed grain still needs a cleaner and dwell time, so a neglected composite deck
          prices like wood.
        </p>
      </section>

      <section className="wc-qt-section" id="factors">
        <h2>What moves a deck price</h2>
        <div className="wc-qt-anatomy">
          <div className="item"><div className="n">01</div><h4>Condition</h4><p>Light dirt, graying or black mildew. On the engine below, moving one 600 sq ft deck from light to heavy lifts the price by {Math.round((EXAMPLES[3].r.recommendedPrice / EXAMPLES[1].r.recommendedPrice - 1) * 100)}%, because heavy work is slower as well as dirtier.</p></div>
          <div className="item"><div className="n">02</div><h4>Railings and stairs</h4><p>Small in area, large in time. Measure their surface or time them separately; never fold them into the deck's square footage at the deck rate.</p></div>
          <div className="item"><div className="n">03</div><h4>Lattice and underside</h4><p>Published at {rateRange(DECK_PUBLISHED.lattice)} and {usd(DECK_PUBLISHED.underside)} per sq ft — a separate line, not an extra.</p></div>
          <div className="item"><div className="n">04</div><h4>Height and access</h4><p>A second-storey deck means ladders or working from below, and furniture and planters add setup time on every job.</p></div>
          <div className="item"><div className="n">05</div><h4>What comes next</h4><p>A deck being stained afterwards needs a brightener and full dry-down; price the prep the stain needs, not just a rinse.</p></div>
        </div>
      </section>

      <section className="wc-qt-section" id="examples">
        <h2>Worked examples</h2>
        <p className="wc-qt-sub">
          Computed by the WashCalc pricing engine at ${EXAMPLE_COSTS.laborRate}/crew-hour labor cost,
          ${EXAMPLE_COSTS.chemicalCost} chemical, ${EXAMPLE_COSTS.travelCost} travel, a {EXAMPLE_COSTS.marginPct}% target margin
          and a ${EXAMPLE_COSTS.minimumCharge} minimum. Enter the same inputs in the{" "}
          <a href="/calculators/deck">deck calculator</a> to reproduce them.
        </p>
        <div className="wc-table-scroll">
          <table className="wc-qt-table">
            <thead><tr><th>Job</th><th>Area</th><th>Hours</th><th>Price</th><th>Per sq ft</th></tr></thead>
            <tbody>
              {EXAMPLES.map((e) => (
                <tr key={e.label}>
                  <td>{e.label}</td><td>{e.area.toLocaleString("en-US")} sq ft</td><td>{formatHours(e.r.hours)}</td>
                  <td className="wc-qt-rate">{formatMoney2(e.r.recommendedPrice)}</td><td>{formatMoney2(e.r.pricePerSqFt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Production is about {productionRate("deck")} sq ft per hour in light condition and{" "}
          {productionRate("deck", "heavy")} in heavy on WashCalc's default model — slower than
          flatwork because wood is cleaned with low pressure and care. On the mid-size decks the
          cost-plus floor sets the price; on the 1,000 sq ft deck the rate card takes over.
        </p>
        <h3>The failure case: pricing a small deck by the foot</h3>
        <p>
          Quote a 200 sq ft landing at the published ${DECK_PUBLISHED.typicalPerSqFt.toFixed(2)}{" "}
          average and you get {formatMoney2(underbidPrice)}. The same job costs{" "}
          {formatMoney2(small.totalCost)} to deliver at these inputs — the trip, setup and{" "}
          {formatHours(small.hours)} of work. Per-square-foot pricing only works once the job
          is big enough to carry its fixed costs; below that, the minimum charge
          ({formatMoney2(small.recommendedPrice)} here) is the price.
        </p>
      </section>

      <section className="wc-qt-section" id="stain">
        <h2>Cleaning before staining or sealing</h2>
        <p>
          Most deck cleans are the first half of a refinish. Cleaning, staining and sealing
          together publish at {rateRange(DECK_PUBLISHED.washStainSeal)} per square foot — from about
          1½ to over 4 times the ${DECK_PUBLISHED.typicalPerSqFt.toFixed(2)} cleaning-only average,
          because stain is product plus a second visit. Quote the
          two as separate lines. The wood has to dry fully before it takes stain, so they are
          rarely the same day, and separate lines let the customer accept the clean now and the
          stain later without you re-pricing the job.
        </p>
        <p>
          The <a href="/calculators/deck">deck calculator</a> includes a stain and sealer coverage
          tool and a clean-and-seal timeline for planning the second visit.
        </p>
      </section>

      <section className="wc-qt-section" id="diy">
        <h2>DIY versus hiring it out</h2>
        <p>
          A pressure washer rents for about ${RENTAL_PER_DAY[0]}–${RENTAL_PER_DAY[1]} a day
          ({HGR.name}), so on cost alone a homeowner with a small deck can come out ahead doing
          it themselves. The risk is the wood. A rental machine, a narrow tip and too little
          distance will raise the grain or etch lines into cedar in seconds, and the fix is
          sanding the whole deck. Composite is more forgiving, but its manufacturers set
          pressure and tip limits.
        </p>
        <p>
          For contractors, that is the pitch: the homeowner is paying for the result and for not
          damaging a deck that costs far more to replace than to clean.
        </p>
      </section>
    </SeoPageShell>
  );
}
