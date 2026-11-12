import SeoPageShell from "../components/SeoPageShell.jsx";
import { COMMERCIAL_PRICING } from "./seoPages.js";
import { COMMERCIAL, SOURCES, HOURLY, PUBLISHED, band } from "../rates.js";

const TOC = [
  { id: "rates", label: "Commercial pressure washing rates" },
  { id: "why-lower", label: "Why commercial prices lower per square foot" },
  { id: "units", label: "Choosing the pricing unit" },
  { id: "floor", label: "Check every bid against your cost floor" },
  { id: "examples", label: "Worked examples" },
  { id: "contracts", label: "Recurring contracts" },
  { id: "runoff", label: "Wastewater and site rules" },
  { id: "faq", label: "FAQ" },
];

const LINKS = [
  { to: "/pressure-washing-price-per-square-foot", label: "Price per square foot by surface", note: "the residential rate table, for mixed residential and commercial work." },
  { to: "/pressure-washing-estimate-calculator", label: "Estimate calculator", note: "total a multi-surface site — walks, pads, walls — as one visit." },
  { to: "/quote-tool", label: "Power washing quote tool", note: "itemize the bid the property manager will actually read." },
  { to: "/pressure-washing-quote-template", label: "Quote template", note: "fixed-price document with scope, exclusions and acceptance." },
  { to: "/pressure-washing-pricing-guide", label: "How much to charge for pressure washing", note: "the full method behind the cost floor used here." },
  { to: "/calculator", label: "Pressure washing price calculator", note: "price a single surface with your own costs and margin." },
];

const HG = SOURCES.homeguideCommercial;
const HCP = SOURCES.housecallPro;
const money = (n) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

// Worked-example arithmetic. Published ranges come from rates.js (HomeGuide);
// crew hours and costs are illustrative inputs, labelled as such on the page.
const LOT_SPACES = 120;
const lot = COMMERCIAL.bySurface.find((s) => s.perSpace);
const pad = COMMERCIAL.bySurface.find((s) => s.surface === "Dumpster pads");
const walk = COMMERCIAL.bySurface.find((s) => s.surface === "Sidewalks & walkways");

const LOT = { crew: 2, hours: 6, labor: 35, chem: 60, travel: 40, margin: 0.45 };
const lotCost = LOT.crew * LOT.hours * LOT.labor + LOT.chem + LOT.travel;
const lotFloor = lotCost / (1 - LOT.margin);

const PAD_SQFT = 12 * 20;

const PLAZA_SQFT = 15000;
const residentialDriveway = 0.22; // WashCalc driveway base rate, used only to show the mistake

export default function CommercialPressureWashingPricing() {
  return (
    <SeoPageShell
      meta={COMMERCIAL_PRICING}
      lead={`Commercial pressure washing is priced at $0.10–$0.35 per square foot for basic flatwork and walls and $0.40–$1.00 for grease, graffiti and heavy staining, according to ${HG.name}'s ${HG.date} cost guide. Parking lots are usually priced per space, at $8–$20. Most contractors bid larger sites as a flat fee or a monthly contract, then check that number against what the job costs them to deliver.`}
      toc={TOC}
      links={LINKS}
    >
      <section className="wc-qt-section" id="rates">
        <h2>Commercial pressure washing rates</h2>
        <p className="wc-qt-sub">
          National ranges as published by {HG.name} ({HG.date}). They are the market's number,
          not your floor — use them to sanity-check a bid, not to set it.
        </p>
        <div className="wc-table-scroll">
          <table className="wc-qt-table">
            <thead><tr><th>Job type</th><th>Published range</th><th>Typical use</th></tr></thead>
            <tbody>
              {COMMERCIAL.byJob.map((r) => (
                <tr key={r.job}><td>{r.job}</td><td className="wc-qt-rate">{r.price}</td><td>{r.uses}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="wc-table-scroll" style={{ marginTop: 16 }}>
          <table className="wc-qt-table">
            <thead><tr><th>Surface</th><th>Published range</th></tr></thead>
            <tbody>
              {COMMERCIAL.bySurface.map((r) => (
                <tr key={r.surface}><td>{r.surface}</td><td className="wc-qt-rate">{r.price}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="wc-qt-note">
          Source: <a href={HG.url} rel="nofollow noopener" target="_blank">{HG.name}, “{HG.title}”</a>, {HG.date}.
          {" "}{HCP.name}'s {HCP.date} pricing guide publishes the same basic ($0.10–$0.35) and
          intensive ($0.40–$1.00) bands and puts commercial hourly work at ${HOURLY.hcpCommercial[0]}–${HOURLY.hcpCommercial[1]} per hour.
        </p>
        <p>
          The spread inside each band is mostly soil and access, not region. A clean storefront
          walk on a weekly schedule sits at the bottom; a drive-thru lane with years of grease,
          or gum-covered entries at a busy shopping center, sits at the top. Building exteriors
          have the widest band ($0.15–$0.90) because the same square foot can be a ground-level
          soft wash or a third-floor wall that needs a lift.
        </p>
      </section>

      <section className="wc-qt-section" id="why-lower">
        <h2>Why commercial prices lower per square foot than residential</h2>
        <p>
          Residential driveways price at {band("driveway")} per square foot on WashCalc's rate card
          and published residential ranges run higher still. Commercial basic work starts at $0.10.
          That isn't because commercial work is easier — it is because the fixed part of the job
          is spread across far more area.
        </p>
        <p>
          Every visit costs the same to start: the drive, unloading, setting up hoses and the
          surface cleaner, and packing up. On an 800 sq ft driveway those fixed costs are a large
          share of the price, which is why residential work carries a minimum charge. On a 20,000
          sq ft plaza they are a rounding error, and a large surface cleaner on open, flat concrete
          runs at its best production rate for hours at a time. Property managers also buy on
          price across several bids, which pushes the per-foot number toward the bottom of the band.
        </p>
        <p>
          The trap is assuming the low per-foot rate applies to everything on a commercial site.
          It doesn't. Dumpster pads ($0.75–$1.00) and grease-stained drive-thrus are among the most
          expensive square feet in the trade, because they need degreaser, hot water or long dwell
          times, and they are small. Price them as their own lines.
        </p>
      </section>

      <section className="wc-qt-section" id="units">
        <h2>Choosing the pricing unit</h2>
        <p className="wc-qt-sub">Match the unit to how the customer measures the property.</p>
        <div className="wc-qt-anatomy">
          <div className="item"><div className="n">01</div><h4>Per square foot</h4><p>Sidewalks, plazas, garages and walls — anything you can measure from a site plan or satellite view. It keeps multi-site bids consistent.</p></div>
          <div className="item"><div className="n">02</div><h4>Per parking space</h4><p>Surface lots. Managers know their space count and compare bids on it. Count spaces before the walk-through.</p></div>
          <div className="item"><div className="n">03</div><h4>Per hour</h4><p>Mixed or hard-to-reach work — loading docks, equipment pads, detailed entries — where area says little about effort.</p></div>
          <div className="item"><div className="n">04</div><h4>Flat fee</h4><p>Small, well-defined jobs. Published flat fees are $200–$500 for areas under 2,000 sq ft and $600–$3,000+ for large properties.</p></div>
          <div className="item"><div className="n">05</div><h4>Monthly contract</h4><p>Restaurants, retail and property managers who want a schedule. Published contracts run $100–$600 per month.</p></div>
        </div>
      </section>

      <section className="wc-qt-section" id="floor">
        <h2>Check every bid against your cost floor</h2>
        <p>
          The published rate tells you what the market will accept. It doesn't tell you whether
          the job makes money for you. That comes from your own numbers:
        </p>
        <p style={{ fontFamily: "var(--wc-mono, monospace)", background: "var(--wc-surface-alt)", padding: "12px 14px", borderRadius: 8 }}>
          floor price = (crew-hours × labor cost per hour + chemical + travel + equipment wear) ÷ (1 − target margin)
        </p>
        <p>
          Labor cost here means what an hour of your crew costs you — wages plus payroll burden —
          not what you bill. If the published per-space or per-foot figure lands under your floor,
          the job is either priced below the market's band for its condition, or your crew is
          slower on this kind of work than the market assumes. Both are worth knowing before you
          sign a twelve-month contract.
        </p>
      </section>

      <section className="wc-qt-section" id="examples">
        <h2>Worked examples</h2>
        <p className="wc-qt-sub">
          Published ranges are from {HG.name}. Crew hours and costs are <strong>illustrative
          inputs</strong>, not survey data — replace them with your own times.
        </p>

        <h3>A {LOT_SPACES}-space retail lot</h3>
        <p>
          At the published {lot.price}, {LOT_SPACES} spaces bid between {money(LOT_SPACES * lot.lo)} and {money(LOT_SPACES * lot.hi)}.
          Suppose your two-person crew needs {LOT.hours} hours on site at a ${LOT.labor} hourly
          labor cost each, with ${LOT.chem} of chemical and ${LOT.travel} of travel. Cost is{" "}
          {LOT.crew} × {LOT.hours} × ${LOT.labor} + ${LOT.chem} + ${LOT.travel} = {money(lotCost)}.
          At a {Math.round(LOT.margin * 100)}% margin the floor is {money(lotCost)} ÷ {1 - LOT.margin} = {money(lotFloor)} —
          about ${(lotFloor / LOT_SPACES).toFixed(2)} a space. So $8 a space only just clears the
          floor on this crew's timing — one slow hour turns it into a loss — while a bid around
          $10–$12 a space leaves room and still sits inside the published band.
        </p>

        <h3>A dumpster pad as an add-on</h3>
        <p>
          A 12 × 20 ft pad is {PAD_SQFT} sq ft. At the published {pad.price} it prices at{" "}
          {money(PAD_SQFT * pad.lo)}–{money(PAD_SQFT * pad.hi)} — at or under the bottom of the
          published $200–$500 flat fee for small areas, before you count the drive. That is why
          pads sell best as a line on a site that's already booked, or as a monthly contract item,
          rather than as a one-off trip.
        </p>

        <h3>The failure case: pricing a plaza like a driveway</h3>
        <p>
          A {PLAZA_SQFT.toLocaleString("en-US")} sq ft plaza walkway priced at a residential driveway
          rate of ${residentialDriveway.toFixed(2)} per square foot comes to {money(PLAZA_SQFT * residentialDriveway)}.
          The published basic band for sidewalks is {walk.price}, which puts the same job between{" "}
          {money(PLAZA_SQFT * walk.lo)} and {money(PLAZA_SQFT * walk.hi)}. The residential rate isn't
          absurd here — it sits inside the band — but it was chosen for the wrong reason. On a
          clean, open plaza it can lose the bid to someone pricing from production; on a gum- and
          grease-heavy entry it leaves money behind. Price from the site's condition and your
          crew-hours, then compare with the band.
        </p>
      </section>

      <section className="wc-qt-section" id="contracts">
        <h2>Recurring contracts</h2>
        <p>
          Recurring work is where commercial pressure washing pays: predictable routes, no
          per-job selling, and a site you already know. Published monthly contracts run
          $100–$600 per month ({HG.name}). Build the number from the bottom up:
        </p>
        <ol>
          <li>Price one visit from your cost floor and the published band.</li>
          <li>Multiply by the visit frequency the site actually needs — weekly for a drive-thru, monthly or quarterly for most storefronts.</li>
          <li>Discount for the scheduling certainty, not by habit. A visit on a fixed route costs you less to deliver than a one-off.</li>
          <li>Write the scope per visit — which areas, what time of day, what counts as a stain you will treat — so “monthly cleaning” can't grow without the price.</li>
        </ol>
        <p>
          After-hours work is common on retail and restaurant sites so the lot is empty. If a
          contract requires it, price the crew-hours at what night work actually costs you.
        </p>
      </section>

      <section className="wc-qt-section" id="runoff">
        <h2>Wastewater and site rules</h2>
        <p>
          Commercial sites are where washwater rules bite. Many municipalities restrict what can
          enter a storm drain, and grease or degreaser runoff from a restaurant pad is exactly
          what those rules target. Check your local stormwater requirements before quoting,
          and if a site needs drain covers, berms or water recovery, those are real costs —
          equipment, time and disposal — that belong in the bid, not in your margin.
        </p>
        <p>
          The same goes for insurance and access. Lifts for upper-storey walls, traffic control
          in an active lot and certificates of insurance naming the property manager are standard
          commercial asks. Price them on the bid as lines the manager can see.
        </p>
      </section>

      <p className="wc-qt-note">
        Residential rates for comparison: published residential ranges sit higher per square foot —
        driveways at ${PUBLISHED.driveway.perSqFt[0].toFixed(2)}–${PUBLISHED.driveway.perSqFt[1].toFixed(2)} ({PUBLISHED.driveway.source}).
        See the <a href="/pressure-washing-price-per-square-foot">price-per-square-foot reference</a> for every surface.
      </p>
    </SeoPageShell>
  );
}
