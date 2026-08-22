import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import useSEO from "../useSEO.js";

// Kept in sync with the FAQPage JSON-LD emitted by prerender.js for
// /quote-tool. If you edit an answer here, edit the matching answer in
// prerender.js (QUOTE_TOOL_FAQS) verbatim.
const FAQS = [
  {
    q: "Is WashCalc's quote tool free?",
    a: "Yes. The calculator is free to use on any device. Saved quotes, branded PDF export, and lead capture are on the roadmap for WashCalc Pro.",
    open: true,
  },
  {
    q: "How much should I charge for power washing in 2026?",
    a: "Most contractors charge $0.15–$0.75 per square foot or $60–$160 per hour, depending on surface, region, and condition. Driveways run about $0.20–$0.35, roofs $0.40–$0.60. Use the formula above to find your own profitable floor, then benchmark against local rates.",
  },
  {
    q: "What's the difference between a pressure wash and a soft wash quote?",
    a: "Soft washing uses low pressure and cleaning solution and is required for siding, roofs, and most painted or delicate surfaces. It usually costs 10–20% more than concrete pressure washing because of chemical cost. Always note the method per line so the customer knows what they're getting.",
  },
  {
    q: "Should I quote per square foot, flat rate, or hourly?",
    a: "Use all three. Per-square-foot for commercial and large flat surfaces, flat-rate for standard residential jobs customers want simple pricing on, and hourly for unusual one-offs. Matching the model to the job is how top operators price higher and still win.",
  },
  {
    q: "What should a power washing estimate include?",
    a: "Your business and contact info, the client's name and service address, a unique estimate number and valid-until date, an itemized line per surface with square footage and method, optional add-ons, and clear terms — payment, deposit, weather reschedule, and exclusions.",
  },
  {
    q: "How fast should I send a quote?",
    a: "Same day, or within 24 hours. Fresh impressions approve faster, and for commercial work the first complete, professional estimate usually wins the contract.",
  },
];

export default function QuoteTool() {
  useSEO({
    title: "Power Washing Quote Tool — Build Profitable Estimates Fast | WashCalc",
    description:
      "A free power washing quote tool built for contractors. Price any job with the per-square-foot formula, itemize a professional estimate, and protect your margin on every quote.",
    canonical: "https://washcalc.app/quote-tool",
  });

  return (
    <Layout>
      {/* ============ HERO ============ */}
      <section className="wc-hero">
        <div className="wc-container">
          <span className="wc-pill">For pressure washing contractors</span>
          <h1>Power Washing Quote Tool</h1>
          <p className="lead">
            Price any pressure washing job in under a minute, itemize a quote your customer
            can read line by line, and protect your margin every time. Built for operators —
            not homeowners hunting for the cheapest bid.
          </p>
          <div className="wc-hero-cta">
            <Link to="/calculator" className="wc-btn wc-btn-primary">Open the free quote tool</Link>
            <a href="#formula" className="wc-btn wc-btn-ghost">See the pricing formula</a>
          </div>
        </div>
      </section>

      <div className="wc-container-narrow">
        {/* ============ TOC ============ */}
        <nav className="wc-qt-toc" aria-label="On this page">
          <strong>On this page</strong>
          <ol>
            <li><a href="#what">What a quote tool actually does</a></li>
            <li><a href="#rates">2026 pressure washing rates</a></li>
            <li><a href="#formula">The margin-safe pricing formula</a></li>
            <li><a href="#example">A worked quote, line by line</a></li>
            <li><a href="#anatomy">What every quote must include</a></li>
            <li><a href="#bundle">Bundling &amp; upsells that close</a></li>
            <li><a href="#commercial">Commercial vs residential</a></li>
            <li><a href="#mistakes">5 quoting mistakes that kill margin</a></li>
            <li><a href="#templates">Copy-and-send templates</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ol>
        </nav>

        {/* ============ WHAT ============ */}
        <section className="wc-qt-section" id="what">
          <h2>What a power washing quote tool actually does</h2>
          <p className="wc-qt-sub">Not a spreadsheet. Not a guess in the driveway. A repeatable pricing system.</p>
          <p>
            Most operators price the first few jobs by feel, then discover months later that
            the "good" jobs barely cleared cost once fuel, chemical, and drive time came out.
            A quote tool fixes that by turning three inputs — surface, area, and condition —
            into a defensible price, then letting you layer in your real costs so the number
            you send is a number you can stand behind on the call.
          </p>
          <p>
            The tool does four things a napkin can't: it applies a per-surface base rate, adjusts
            for how dirty the job is, estimates labor hours from area, and checks the result
            against a cost-plus floor so you never quote below profitability. That last step is
            the difference between staying busy and staying in business.
          </p>
          <div className="wc-qt-callout">
            <strong>Why contractors, not homeowners?</strong> Homeowner calculators spit out a
            single ballpark to help someone budget. A contractor tool has to survive a real job:
            variable costs, condition factors, minimums, and a margin you set. WashCalc is built
            for the second job.
          </div>
        </section>

        {/* ============ RATES ============ */}
        <section className="wc-qt-section" id="rates">
          <h2>2026 pressure washing rates by surface</h2>
          <p className="wc-qt-sub">Benchmark ranges pulled from current national pricing guides. Use them as a sanity check on your own numbers — not as your price.</p>

          <table className="wc-qt-table">
            <thead>
              <tr><th>Surface</th><th>Per sq ft</th><th>Typical job total</th><th>Method</th></tr>
            </thead>
            <tbody>
              <tr><td>Concrete driveway</td><td className="wc-qt-rate">$0.20–$0.35</td><td className="wc-qt-rate">$100–$300</td><td>High pressure + surface cleaner</td></tr>
              <tr><td>House siding</td><td className="wc-qt-rate">$0.15–$0.75</td><td className="wc-qt-rate">$200–$600</td><td>Soft wash (low pressure)</td></tr>
              <tr><td>Wood / composite deck</td><td className="wc-qt-rate">$0.30–$0.60</td><td className="wc-qt-rate">$150–$400</td><td>Low pressure + brightener</td></tr>
              <tr><td>Roof</td><td className="wc-qt-rate">$0.40–$0.60</td><td className="wc-qt-rate">$300–$700</td><td>Soft wash only</td></tr>
              <tr><td>Commercial flatwork</td><td className="wc-qt-rate">$0.10–$0.40</td><td className="wc-qt-rate">Varies by area</td><td>Surface cleaner, volume rate</td></tr>
            </tbody>
          </table>
          <p className="wc-qt-note">Ranges reflect 2026 residential/light-commercial guides (HomeGuide, Angi, HouseCall Pro, industry pricing reports). Regional markets, access, and condition move the real number.</p>

          <h3>What pushes a quote up</h3>
          <p>
            A flat per-square-foot rate is only the starting line. Two-story homes typically run
            30–50% more because of ladder work and added time. Heavy oil or grease staining adds
            roughly $50–$100 in pre-treatment and scrubbing. And almost every operator sets a
            minimum service fee of $100–$150 so a tiny walkway job still covers drive time and
            setup — a single 200&nbsp;sq&nbsp;ft slab at $0.25 would only bill $50, well under
            what it costs to show up.
          </p>

          {/* SVG: per-surface rate chart — CSS-var driven so it inherits the site palette */}
          <svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar chart of average price per square foot by surface: driveway $0.28, house $0.45, deck $0.45, roof $0.50, commercial $0.25" style={{ width: "100%", height: "auto", margin: "18px 0" }}>
            <style>{`
              .wc-qt-chart .bar{fill:var(--wc-primary);} .wc-qt-chart .barlite{fill:var(--wc-primary-dark);}
              .wc-qt-chart .axis{stroke:var(--wc-border);stroke-width:1;}
              .wc-qt-chart .lbl{fill:var(--wc-text-muted);font:600 12px var(--wc-font);}
              .wc-qt-chart .val{fill:var(--wc-text);font:700 12px var(--wc-font);}
              .wc-qt-chart .ttl{fill:var(--wc-text-soft);font:600 11px var(--wc-font);letter-spacing:.04em;text-transform:uppercase;}
            `}</style>
            <g className="wc-qt-chart">
              <text x="0" y="16" className="ttl">Average price per sq ft (mid-range)</text>
              <line className="axis" x1="0" y1="220" x2="640" y2="220" />
              {/* driveway 0.28 */}
              <rect className="bar" x="24" y="128" width="80" height="92" rx="4" />
              <text className="val" x="64" y="120" textAnchor="middle">$0.28</text>
              <text className="lbl" x="64" y="238" textAnchor="middle">Driveway</text>
              {/* house 0.45 */}
              <rect className="bar" x="148" y="72" width="80" height="148" rx="4" />
              <text className="val" x="188" y="64" textAnchor="middle">$0.45</text>
              <text className="lbl" x="188" y="238" textAnchor="middle">House</text>
              {/* deck 0.45 */}
              <rect className="bar" x="272" y="72" width="80" height="148" rx="4" />
              <text className="val" x="312" y="64" textAnchor="middle">$0.45</text>
              <text className="lbl" x="312" y="238" textAnchor="middle">Deck</text>
              {/* roof 0.50 */}
              <rect className="barlite" x="396" y="56" width="80" height="164" rx="4" />
              <text className="val" x="436" y="48" textAnchor="middle">$0.50</text>
              <text className="lbl" x="436" y="238" textAnchor="middle">Roof</text>
              {/* commercial 0.25 */}
              <rect className="bar" x="520" y="138" width="80" height="82" rx="4" />
              <text className="val" x="560" y="130" textAnchor="middle">$0.25</text>
              <text className="lbl" x="560" y="238" textAnchor="middle">Commercial</text>
            </g>
          </svg>
        </section>

        {/* ============ FORMULA ============ */}
        <section className="wc-qt-section" id="formula">
          <h2>The margin-safe pricing formula</h2>
          <p className="wc-qt-sub">This is the math behind every profitable per-square-foot rate. Learn it once and you never underbid again.</p>

          <div className="wc-qt-formula">
            <div className="eq">( <b>Hourly cost</b> + <b>profit target</b> ) ÷ <b>sq ft per hour</b> = <b>your price / sq ft</b></div>
            <small>Your rate should come from what your crew must earn per hour — not from what the competitor down the road charges.</small>
          </div>

          <p>
            Say your fully-loaded cost to run for an hour — labor, fuel, insurance, equipment
            wear, a slice of overhead — is $55. You want $45/hour of profit on top. Your surface
            cleaner covers about 1,000&nbsp;sq&nbsp;ft of concrete per hour. Then:
          </p>
          <div className="wc-qt-formula wc-qt-formula-light">
            <div className="eq">( $55 + $45 ) ÷ 1,000 = <b>$0.10 / sq ft</b> floor</div>
            <small>Never quote concrete below this. Market rate ($0.20–$0.35) is comfortably above it — that gap is your room to compete and still profit.</small>
          </div>
          <div className="wc-qt-callout">
            <strong>The tool's job:</strong> compare your cost-plus floor to the market rate price and
            take the higher of the two. WashCalc does this automatically so a fast quote is never a
            cheap-by-accident quote.
          </div>
        </section>

        {/* ============ WORKED EXAMPLE ============ */}
        <section className="wc-qt-section" id="example">
          <h2>A real quote, built line by line</h2>
          <p className="wc-qt-sub">A bundled residential job — the kind that closes at a higher rate than three separate quotes.</p>

          <div className="wc-qt-example">
            <div className="head">Estimate #2026-0142 · 2,200 sq ft home, moderate soiling</div>
            <div className="body">
              <div className="wc-qt-line">
                <span className="lbl">House exterior — soft wash<small>2,200 sq ft vinyl siding · SH + surfactant · under 500 PSI</small></span>
                <span className="amt">$385</span>
              </div>
              <div className="wc-qt-line">
                <span className="lbl">Driveway — surface clean<small>800 sq ft concrete · 3,000 PSI · light oil pre-treat</small></span>
                <span className="amt">$210</span>
              </div>
              <div className="wc-qt-line">
                <span className="lbl">Walkways &amp; front steps<small>600 sq ft concrete · surface cleaner pass</small></span>
                <span className="amt">$150</span>
              </div>
              <div className="wc-qt-line">
                <span className="lbl">Surface prep &amp; protection<small>Cover outlets, tape fixtures, protect landscaping</small></span>
                <span className="amt">$0 <small className="wc-qt-incl">(incl.)</small></span>
              </div>
              <div className="wc-qt-line discount">
                <span className="lbl">Bundle discount<small>House + flatwork booked together</small></span>
                <span className="amt">−$70</span>
              </div>
              <div className="wc-qt-line total">
                <span className="lbl">Total estimate</span>
                <span className="amt">$675</span>
              </div>
            </div>
          </div>
          <p className="wc-qt-note">
            Optional add-ons quoted separately so the customer chooses without pressure:
            driveway sealing (+$180), gutter brightening (+$95), rust-stain removal (+$60).
            Valid 30 days · weather reschedule at no charge · 50% on completion.
          </p>
          <div className="wc-qt-callout">
            <strong>Why this closes:</strong> the customer sees exactly what each surface costs and
            the method used on it. Itemizing your chemicals and PSI is what justifies a price
            higher than the guy who "just blasts it" — and it protects you in a damage dispute.
          </div>
        </section>

        {/* ============ ANATOMY ============ */}
        <section className="wc-qt-section" id="anatomy">
          <h2>What every professional quote must include</h2>
          <p className="wc-qt-sub">Property managers book the first vendor whose estimate reads complete. Miss these and you look like a hobbyist.</p>

          <div className="wc-qt-anatomy">
            <div className="item"><div className="n">01</div><h4>Business &amp; client details</h4><p>Your name, contact, license/insurance; their name and the exact service address.</p></div>
            <div className="item"><div className="n">02</div><h4>Unique estimate number &amp; date</h4><p>A reference number and a "valid until" date. Keeps you organized and creates urgency.</p></div>
            <div className="item"><div className="n">03</div><h4>Itemized line per surface</h4><p>Square footage, method (pressure vs soft wash), and price for each area — separately.</p></div>
            <div className="item"><div className="n">04</div><h4>Method &amp; chemical notes</h4><p>PSI approach and cleaning solution per surface. Prevents damage disputes and justifies price.</p></div>
            <div className="item"><div className="n">05</div><h4>Optional add-ons</h4><p>Sealing, gutter, rust removal as separate opt-in lines — never buried in the total.</p></div>
            <div className="item"><div className="n">06</div><h4>Terms &amp; policies</h4><p>Payment terms, deposit rule, weather-reschedule policy, and what's explicitly excluded.</p></div>
          </div>

          <div className="wc-qt-callout">
            <strong>Speed wins.</strong> Send the estimate the same day or within 24 hours. Fresh
            impressions approve faster, and for commercial work the first complete, professional
            quote through the door usually gets the contract.
          </div>
        </section>

        {/* ============ BUNDLE ============ */}
        <section className="wc-qt-section" id="bundle">
          <h2>Bundling &amp; upsells that actually close</h2>
          <p className="wc-qt-sub">The operators who price 15–30% higher than competitors and still win are matching the model to the job.</p>
          <p>
            Bundled estimates close at a higher rate than single-service quotes. When you're already
            on site with the rig set up, the marginal cost of the driveway after the house wash is
            mostly time — so a package with individual line items and a modest bundle discount raises
            your ticket while still feeling like a deal to the customer.
          </p>
          <h3>The three upsells with the best margin</h3>
          <p>
            <strong>Sealing</strong> after a driveway or deck clean is the highest-value add — the surface
            is already prepped. <strong>Gutter face brightening</strong> is quick while you're doing the house.
            <strong>Rust or oxidation removal</strong> commands a premium because most operators won't do it.
            Quote all three as optional lines so the customer upgrades themselves.
          </p>
          <div className="wc-qt-callout">
            <strong>Larger job, lower rate — on purpose.</strong> Per-square-foot pricing should drop as
            area grows because your fixed overhead (drive, setup, teardown) spreads across more footage.
            Building that taper into your quotes wins big jobs without giving away margin.
          </div>
        </section>

        {/* ============ COMMERCIAL ============ */}
        <section className="wc-qt-section" id="commercial">
          <h2>Commercial vs residential quoting</h2>
          <p className="wc-qt-sub">Same rig, very different quote.</p>
          <p>
            Residential jobs reward simple, surface-based flat pricing — homeowners want a predictable
            number they don't have to think about. Commercial flatwork runs on volume, so large lots
            price lower per square foot ($0.10–$0.40) but the real money is in the <em>recurring
            contract</em>. Quote the one-time clean, then offer a monthly or quarterly maintenance rate
            at a discount. One storefront becomes twelve visits a year.
          </p>
          <p>
            Commercial clients also expect documentation: proof of liability and workers' comp,
            before/after photos, and a recurring schedule. Build your commercial quote to look like a
            vendor proposal, not a residential receipt.
          </p>
        </section>

        {/* ============ MISTAKES ============ */}
        <section className="wc-qt-section" id="mistakes">
          <h2>5 quoting mistakes that quietly kill margin</h2>
          <p className="wc-qt-sub">Every one of these is a job you technically "won" and actually lost money on.</p>
          <div className="wc-qt-anatomy">
            <div className="item"><div className="n">01</div><h4>No minimum fee</h4><p>Small jobs priced purely per-square-foot never cover drive time. Set a $100–$150 floor.</p></div>
            <div className="item"><div className="n">02</div><h4>Forgetting chemical cost</h4><p>Soft-wash mix, surfactant, degreaser — it's real money that vanishes if you don't log it.</p></div>
            <div className="item"><div className="n">03</div><h4>Ignoring travel</h4><p>A distant job at your normal rate can net less than a closer one. Price the drive in.</p></div>
            <div className="item"><div className="n">04</div><h4>Flat rate on heavy soiling</h4><p>Condition changes labor hours. A caked deck isn't the same job as a fresh one.</p></div>
            <div className="item"><div className="n">05</div><h4>Matching a lowball competitor</h4><p>Price from your cost, not theirs. Justify the gap with method, not apology.</p></div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="wc-qt-section wc-qt-faq" id="faq">
          <h2>Power washing quote tool FAQ</h2>
          <p className="wc-qt-sub">The questions operators ask most.</p>

          {FAQS.map((f) => (
            <details key={f.q} open={f.open || undefined}>
              <summary>{f.q}</summary>
              <div className="a">{f.a}</div>
            </details>
          ))}
        </section>

        {/* ============ TEMPLATES ============ */}
        <section className="wc-qt-section" id="templates">
          <h2>Copy-and-send templates</h2>
          <p className="wc-qt-sub">The pricing is half the job. These are the documents it goes into.</p>
          <p>
            Once the number is right, it has to reach the customer as something that reads
            professional. Which document you reach for depends on one thing — whether you have
            measured the property yourself.
          </p>
          <ul className="wc-pillar-links">
            <li>
              <Link to="/pressure-washing-quote-template">Pressure washing quote template</Link> —
              a firm fixed-price document with scope, method per surface, exclusions, terms and an
              acceptance block. Use it once you have measured.
            </li>
            <li>
              <Link to="/pressure-washing-estimate-template">Pressure washing estimate template</Link> —
              a ranged, preliminary figure with the assumptions stated. Use it when you are pricing
              from photos or a phone description.
            </li>
            <li>
              <Link to="/pressure-washing-estimate-calculator">Pressure washing estimate calculator</Link> —
              builds the multi-surface line prices that go into either document, with the bundle
              discount and your margin floor applied across the whole visit.
            </li>
          </ul>
        </section>

        {/* ============ FINAL CTA ============ */}
        <div className="wc-cta-banner" style={{ margin: "36px 0" }}>
          <h3>Quote your next job in under a minute</h3>
          <p>Surface, area, condition — WashCalc shows price, time, cost, and profit instantly.</p>
          <Link to="/calculator" className="wc-btn wc-btn-ghost">Open the free quote tool</Link>
        </div>
      </div>
    </Layout>
  );
}
