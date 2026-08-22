import { Link } from "react-router-dom";
import StainSealCoverageCalculator from "./StainSealCoverageCalculator.jsx";
import CleanAndSealTimeline from "./CleanAndSealTimeline.jsx";

// Secondary-tool + copy block rendered below the main deck calculator.
// (The material selector lives in the hero via CalculatorPage's heroExtra slot.)
export default function DeckTools() {
  return (
    <>
      {/* Contractor tools */}
      <section className="wc-section" style={{ background: "var(--wc-surface-alt)" }}>
        <div className="wc-container" style={{ maxWidth: 900 }}>
          <h2 className="wc-section-title">Deck contractor tools</h2>
          <p className="wc-section-sub">
            Size a stain or seal job and schedule the clean-and-seal return visit around real dry time.
          </p>

          <div className="wc-tool-stack">
            <StainSealCoverageCalculator />
            <CleanAndSealTimeline />
          </div>
        </div>
      </section>

      {/* Contractor copy — scaffold. Operator supplies verified prose. */}
      <section className="wc-section">
        <article className="wc-container" style={{ maxWidth: 820 }}>
          <h2 className="wc-section-title" style={{ textAlign: "left" }}>How to price deck cleaning and sealing</h2>
          <p>
            Decks split into two jobs that don't price the same, and the material is what decides
            which one you're on. Wood — pressure-treated pine, cedar, redwood, and dense hardwoods
            like IPE — needs low pressure, careful technique, and often a brightener to even out the
            cleaned surface, so it's slower and more chemical-intensive. Composite is forgiving and
            cleans fast. Price wood decks around $0.35–$0.45 per square foot and composite at
            $0.30–$0.38, and let the <a href="#deck-material">material selector</a> above nudge the
            rate for the extra care a premium or fragile board demands.
          </p>
          <p>
            Read the boards before you quote. Grey, UV-tired wood and lifted grain mean the clean
            will raise fibers and almost certainly wants a brightener and a seal to look finished —
            that's a bigger scope than a maintenance wash on a deck sealed last year. Note railings,
            steps, and lattice separately; they're slow, fiddly square footage that a footprint-only
            measurement misses entirely.
          </p>

          <h3>Matching pressure and nozzle to the material</h3>
          <p>
            Pressure is not a dial you turn to "clean" — it's set by the board. Pressure-treated
            pine handles roughly 800–1,200 PSI with a 25° green tip. Cedar and redwood are soft and
            want only 500–600 PSI with a wider 40° tip; push past that and you furr and gouge wood
            that's expensive to make right. Dense hardwoods like IPE stay at or under 1,500 PSI.
            Composite is the most forgiving — Trex allows up to 3,100 PSI with a 40° fan tip held at
            least eight inches off the surface — but early-generation composite shouldn't be pressure
            washed at all. Whatever the material, keep the wand moving and never drop below a 25° tip.
            The <a href="#deck-material">material selector</a> above sets the safe range for each
            board and flags you the moment your working PSI crosses it.
          </p>

          <h3>Pricing the clean vs the seal</h3>
          <p>
            Cleaning and sealing are two separate quote lines, never one bundled number. The wash is
            priced by area and condition; the seal is priced by gallon and hour. Coverage runs about
            150–250 sq ft per gallon for oil-based stain, 150–200 for water-based, and 200–250 for
            solid — and a second coat covers up to 50% more because the wood is already partly
            saturated. Add railing linear footage at roughly 3–4 sq ft of surface per foot, multiply
            by coats, and you have your gallons. The{" "}
            <a href="#stain-seal">stain &amp; seal coverage calculator</a> above turns that into a
            product cost and a marked-up line price, so the seal earns margin instead of getting
            given away as a "while we're here."
          </p>

          <h3>Scheduling a two-visit clean-and-seal</h3>
          <p>
            A clean-and-seal is a two-visit job, and the dry window between them drives your
            schedule. Sealing a damp deck traps moisture and causes early peeling — the fastest way
            to a warranty callback. Plan on 24–48 hours of dry time in warm, dry weather and up to
            72 hours in humid or cool conditions before any coating goes down; a moisture meter
            reading under 15% is the reliable green light. Build both visits into the quote and tell
            the customer the timeline up front, so the return trip is expected rather than a
            surprise. The <a href="#clean-seal-timeline">clean-and-seal timeline</a> above adjusts
            the dry window for the climate so you can book the seal day accurately instead of hoping.
          </p>

          <h3>Common deck pricing mistakes</h3>
          <p>
            The deck jobs that lose money usually lose it the same few ways. Blasting soft cedar or
            redwood at pine pressure gouges the boards and turns a clean into a repair. Bundling the
            seal into the wash as one number gives away the highest-margin part of the work.
            Measuring only the deck field and ignoring railings, steps, and lattice under-quotes the
            slowest square footage on the job. And under-buying product because you guessed at
            coverage means a mid-job supply run on your own time. Price the material for what it
            actually needs, keep the seal on its own line, count every surface, and let the coverage
            math tell you how much to buy.
          </p>

          <div className="wc-crosslinks">
            <h3>Price the rest of the job</h3>
            <p>
              A deck job often rides along with a full exterior. Size the siding on the{" "}
              <Link to="/calculators/house-washing">house washing cost calculator</Link>, ground
              your per-surface rates in the{" "}
              <Link to="/pressure-washing-pricing-guide">pressure washing pricing guide</Link>,
              then itemize everything into one estimate with the{" "}
              <Link to="/quote-tool">power washing quote tool</Link>.
            </p>
            <p>
              For a multi-surface visit, the{" "}
              <Link to="/pressure-washing-estimate-calculator">pressure washing estimate
              calculator</Link> totals every line at once and holds your margin across the whole
              job. Pricing from photos before you have measured the deck? Send a ranged figure
              with the{" "}
              <Link to="/pressure-washing-estimate-template">estimate template</Link> instead of
              a firm quote.
            </p>
          </div>
        </article>
      </section>
    </>
  );
}
