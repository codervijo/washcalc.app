import Layout from "../components/Layout.jsx";
import useSEO from "../useSEO.js";

export default function PricingGuide() {
  useSEO({
    title: "Pressure Washing Pricing Guide (2026) — WashCalc",
    description:
      "How to price pressure washing jobs in 2026. Average cost per square foot, pricing by surface (deck, roof, driveway), labor and chemical costs, plus common mistakes to avoid.",
    canonical: "https://www.washcalc.app/pressure-washing-pricing-guide",
    breadcrumbs: [
      { name: "Home", url: "https://www.washcalc.app/" },
      { name: "Pressure Washing Pricing Guide", url: "https://www.washcalc.app/pressure-washing-pricing-guide" },
    ],
  });

  return (
    <Layout>
      <article className="wc-section">
        <div className="wc-container" style={{ maxWidth: 820 }}>
          <nav className="wc-breadcrumbs" aria-label="Breadcrumb" style={{ marginBottom: 16 }}>
            <a href="/">Home</a><span>/</span>
            <span style={{ color: "var(--wc-text)" }}>Pressure Washing Pricing Guide</span>
          </nav>

          <h1 style={{ fontSize: "clamp(30px,3.6vw,42px)", margin: "0 0 12px", letterSpacing: "-0.01em" }}>
            Pressure Washing Pricing Guide (2026)
          </h1>
          <p style={{ color: "var(--wc-text-muted)", fontSize: 17, margin: "0 0 32px" }}>
            A complete walkthrough of how professional pressure washing contractors price jobs in 2026 — what to charge per square foot, how to estimate labor, what surfaces command a premium, and the costly mistakes that quietly destroy margin.
          </p>

          <h2 style={{ fontSize: 26, marginTop: 8 }}>How to price pressure washing jobs</h2>
          <p>
            Most pressure washing contractors learn pricing the hard way: a competitor underbids them, a hard job runs four hours longer than expected, a customer is shocked by the number, or worst of all, the quote felt good on paper but didn’t leave anything behind once chemical, fuel, and labor were paid. The point of a pricing system is to make those outcomes rare. A defensible quote starts from two numbers and reconciles them — a market-friendly rate price based on square footage, and a cost-plus floor that protects your margin no matter what.
          </p>
          <p>
            The rate price is what your local market expects. It’s the number a homeowner will recognize, the one they can compare against the lawn-care company’s flyer or a neighbor’s last invoice. The cost-plus price is what your business actually needs to pay labor, chemical, fuel, and overhead and still leave a healthy margin. Whichever number is higher becomes your quote — never lower than your minimum charge. If you take only one idea from this guide, take that one. It will keep you out of the trap of pricing by gut feel and into a discipline you can defend on a sales call.
          </p>
          <p>
            The fastest way to apply this in the field is to use the{" "}
            <a href="/calculator">WashCalc all-surface calculator</a> — it runs both calculations
            in parallel and shows you the recommended quote, the labor hours, and the gross profit
            instantly. If you’re pricing a specific surface type, use one of the dedicated tools
            below for tuned defaults.
          </p>

          <h2 style={{ fontSize: 26, marginTop: 32 }}>Average cost per square foot</h2>
          <p>
            Across the U.S. in 2026, pressure washing prices land in a fairly narrow band per square foot, and most variation comes from <em>surface type</em> and <em>condition</em>. Here is the range you can quote against without raising eyebrows in the residential market:
          </p>
          <ul style={{ paddingLeft: 22, lineHeight: 1.75 }}>
            <li><strong>Driveway (concrete or asphalt):</strong> $0.20–$0.25 per sq ft</li>
            <li><strong>House siding (vinyl, stucco, painted):</strong> $0.25–$0.35 per sq ft</li>
            <li><strong>Roof (soft-wash):</strong> $0.40–$0.60 per sq ft</li>
            <li><strong>Wood or composite deck:</strong> $0.30–$0.45 per sq ft</li>
            <li><strong>Patio or pool deck:</strong> $0.20–$0.30 per sq ft</li>
            <li><strong>Wood or vinyl fence:</strong> $0.25–$0.40 per sq ft</li>
          </ul>
          <p>
            Those numbers are starting points, not gospel. A heavily-soiled surface multiplies labor time. A second-story roof multiplies the safety overhead. A long drive multiplies your fuel and unbillable hours. The job of a pricing system is to translate those multipliers into dollars rather than guess at them. WashCalc bakes a condition multiplier (light × 1.0, moderate × 1.2, heavy × 1.5) directly into both the rate and labor estimates so you stop eyeballing.
          </p>
          <p>
            One more useful anchor: in most markets, a typical 800–1,000 sq ft residential driveway prices between $160 and $250. A typical 1,800–2,200 sq ft single-story house wash lands at $250–$450. A typical 1,500 sq ft soft-wash roof clean lands at $600–$900. If your number lands far outside those bands, double-check before you send the quote.
          </p>
          <p>
            A note on commercial and HOA work: per-square-foot rates drop sharply at scale because production rates climb, but minimum charges become irrelevant. A 12,000 sq ft commercial parking lot might price at $0.10–$0.14 per sq ft — half the residential rate — yet still produce far better hourly economics because setup, drive, and admin overhead are amortized across one big number. If you start moving into commercial work, build a separate rate card with its own production rates, chemical mix, and travel assumptions; do not just discount your residential pricing across the board.
          </p>

          <h2 style={{ fontSize: 26, marginTop: 32 }}>Pricing by surface (driveway, house, roof, deck)</h2>

          <h3 style={{ fontSize: 20, marginTop: 24 }}>Driveways</h3>
          <p>
            Driveways are the volume product of residential pressure washing — high frequency, low complexity, modest margin. Production rates with a good 16–20 inch surface cleaner run around 450 sq ft per hour in moderate condition. Heavy oil staining, road grime from a long downhill driveway, or a pebbled aggregate finish can drop that rate by 30–60%. Chemical cost is usually low: a degreaser pretreatment and a post-rinse is enough for most jobs. Price between $0.20 and $0.25 per sq ft, with a hard minimum charge of $150 to cover travel and setup. The{" "}
            <a href="/calculators/driveway">driveway cleaning cost calculator</a>{" "}
            ships with these defaults pre-set.
          </p>

          <h3 style={{ fontSize: 20, marginTop: 24 }}>House washing</h3>
          <p>
            House washing is the highest-frequency repeat service in residential pressure washing — most homeowners want it done annually, which makes it a strong base of recurring work. The technique depends entirely on the siding: vinyl, painted wood, stucco and painted brick all get a soft-wash with a sodium hypochlorite mix (never a high-pressure tip), while unpainted brick and stone can take more pressure. Production rates run around 300–400 sq ft of siding per hour. Price between $0.25 and $0.35 per sq ft of siding — a typical single-story home lands at $250–$450 and a two-story home at $400–$700. Use the{" "}
            <a href="/calculators/house-washing">house washing cost calculator</a>{" "}
            to dial in vinyl, brick or stucco quickly.
          </p>

          <h3 style={{ fontSize: 20, marginTop: 24 }}>Roofs</h3>
          <p>
            Roofs are the highest-margin surface in residential pressure washing — and the highest-risk. The work is done with a low-pressure soft-wash system using a sodium hypochlorite mix, never with a high-pressure tip that would lift shingles or void warranties. The price reflects both the chemical cost (12.5% sodium hypochlorite plus surfactant runs $40–$80 per average roof) and the safety overhead of working at height. Quote between $0.40 and $0.60 per sq ft, with a higher target margin (55%+) than other surfaces because the risk and the equipment depreciation are real costs you’ll regret ignoring.
          </p>

          <h3 style={{ fontSize: 20, marginTop: 24 }}>Decks</h3>
          <p>
            Decks split into two categories that don’t price the same. Wood decks need lower pressure (500–1,200 PSI), a fan tip, and often a brightener to even out the cleaned surface — that’s slower work and more chemical. Composite decks are forgiving and clean fast. Price wood decks at $0.35–$0.45 per sq ft and composite at $0.30–$0.38 per sq ft. If the customer asks for sealing or staining, that’s a separate line item priced by gallon and hour, not bundled into the wash.
          </p>

          <h2 style={{ fontSize: 26, marginTop: 32 }}>Common mistakes</h2>
          <p>
            The biggest pricing mistakes are not arithmetic errors. They are habits — small shortcuts that quietly compound until a contractor wonders why a busy season ended in a bank balance that didn’t match the work.
          </p>
          <ul style={{ paddingLeft: 22, lineHeight: 1.75 }}>
            <li>
              <strong>Forgetting travel.</strong> A 45-minute round trip on a $200 job is an hour of unbilled labor plus fuel. Add a travel line to every quote outside your tight service radius — even a flat $20–$40 makes the math honest.
            </li>
            <li>
              <strong>Ignoring chemical cost.</strong> Sodium hypochlorite, surfactants, degreasers, and brighteners are not free. On a roof clean they can be 15–25% of the job cost. Track them per job, not per quarter.
            </li>
            <li>
              <strong>Quoting from memory.</strong> The last driveway is not this driveway. Condition, slope, access, and stains all change the labor estimate. Use a tool, not a vibe.
            </li>
            <li>
              <strong>No minimum charge.</strong> A $80 small-job quote eats the same setup, drive, and admin overhead as a $400 job. A $150 minimum is industry-standard and protects your worst hours.
            </li>
            <li>
              <strong>Margin by accident.</strong> If you don’t set a target margin, you don’t have one. Pick a number — 40%, 50%, 55% — and let your calculator enforce it for you.
            </li>
            <li>
              <strong>Same price every season.</strong> Chemical prices, labor rates, and fuel all moved in 2025–2026. Re-tune your rates twice a year. Two minutes of work prevents a year of slow margin erosion.
            </li>
          </ul>

          <h2 style={{ fontSize: 26, marginTop: 32 }}>Use the calculators</h2>
          <p>
            Reading a pricing guide is half the work. The other half is having a fast, defensible number ready when a customer is on the phone or standing in front of you in the driveway. WashCalc was built to put that number on screen in under 60 seconds — even on your phone in the truck — and it’s free to use.
          </p>
          <ul style={{ paddingLeft: 22, lineHeight: 1.75 }}>
            <li>
              <a href="/calculator">All-surface pressure washing calculator</a> — start here if you’re quoting a mixed job or a less common surface.
            </li>
            <li>
              <a href="/calculators/driveway">Driveway cleaning cost calculator</a> — tuned for concrete and asphalt driveways.
            </li>
            <li>
              <a href="/calculators/house-washing">House washing cost calculator</a> — tuned for vinyl, brick and stucco siding.
            </li>
            <li>
              <a href="/calculators/roof">Roof cleaning cost calculator</a> — tuned for soft-wash roof pricing with realistic chemical defaults.
            </li>
            <li>
              <a href="/calculators/deck">Deck cleaning cost calculator</a> — tuned for wood and composite deck pricing.
            </li>
          </ul>
          <p style={{ marginTop: 24 }}>
            Quote faster, protect margin, and stop leaving money on the table. The calculators do the math — your job is to send the number.
          </p>

          <div className="wc-cta-banner" style={{ marginTop: 40 }}>
            <h3>Ready to price your next job?</h3>
            <p>Open the WashCalc calculator and get a defensible quote in under a minute.</p>
            <a href="/calculator" className="wc-btn wc-btn-primary">Open the calculator</a>
          </div>
        </div>
      </article>
    </Layout>
  );
}
