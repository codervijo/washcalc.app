import SeoPageShell from "../components/SeoPageShell.jsx";
import TemplateBlock from "../components/TemplateBlock.jsx";
import { ESTIMATE_TEMPLATE } from "./seoPages.js";

const TOC = [
  { id: "template", label: "The template" },
  { id: "difference", label: "Estimate or quote?" },
  { id: "fields", label: "Every field explained" },
  { id: "range", label: "Setting the range honestly" },
  { id: "example", label: "A filled-in example" },
  { id: "convert", label: "Converting it into a quote" },
  { id: "faq", label: "FAQ" },
];

const LINKS = [
  { to: "/pressure-washing-quote-template", label: "Quote template", note: "the firm fixed-price version, for once you have measured." },
  { to: "/pressure-washing-estimate-calculator", label: "Estimate calculator", note: "build the low and high figures this template asks for." },
  { to: "/house-washing-cost", label: "House washing cost", note: "why siding area is the number you most often cannot verify." },
  { to: "/driveway-pressure-washing-cost", label: "Driveway pressure washing cost", note: "the flatwork ranges to sanity-check against." },
  { to: "/quote-tool", label: "Power washing quote tool", note: "pricing formula, quote anatomy and common mistakes." },
  { to: "/pressure-washing-pricing-guide", label: "Pressure washing pricing guide", note: "the rate card behind every figure you put in the range." },
];

const TEMPLATE = `═══════════════════════════════════════════════════════════
  [YOUR BUSINESS NAME]
  [Phone] · [Email] · [Website]
  Licence #[NUMBER] · Insured: [CARRIER, POLICY #]
═══════════════════════════════════════════════════════════

                  PRELIMINARY ESTIMATE
        Not a fixed quote — see assumptions below

  Estimate number : [YYYY-NNNN]
  Date issued     : [DATE]
  Indicative until: [DATE + 30 DAYS]
  Prepared from   : [Photos supplied / phone description /
                    street view / listing details]

───────────────────────────────────────────────────────────
  PREPARED FOR
───────────────────────────────────────────────────────────
  Client       : [CLIENT NAME]
  Service site : [SERVICE ADDRESS]
  Contact      : [PHONE] · [EMAIL]

───────────────────────────────────────────────────────────
  ESTIMATED SCOPE
───────────────────────────────────────────────────────────

  1. [SURFACE]                          $[LOW] – $[HIGH]
     Est. area : ~[N] sq ft  (NOT MEASURED — see assumptions)
     Method    : [Soft wash / pressure wash]
     Condition : [Light / moderate / heavy], from [photos]

  2. [SURFACE]                          $[LOW] – $[HIGH]
     Est. area : ~[N] sq ft  (NOT MEASURED)
     Method    : [Soft wash / pressure wash]
     Condition : [Light / moderate / heavy]

  3. [SURFACE]                          $[LOW] – $[HIGH]
     Est. area : ~[N] sq ft  (NOT MEASURED)
     Method    : [Soft wash / pressure wash]
     Condition : [Light / moderate / heavy]

                        ═══════════════════════════════════
                        ESTIMATED TOTAL  $[LOW] – $[HIGH]
                        ═══════════════════════════════════

  Likely landing point, if the assumptions below hold:
                                         approx. $[MID]

───────────────────────────────────────────────────────────
  ASSUMPTIONS THIS ESTIMATE DEPENDS ON
───────────────────────────────────────────────────────────
  These are what the figures are based on. If any turn out
  differently on site, the price changes — and I will tell
  you before starting, not after.

  · Areas above are estimated from [SOURCE], not measured.
  · [N] storey(s). Two-storey work adds ladder and pole time.
  · Condition assessed as [LEVEL] from [photos/description].
  · Standard access: vehicle can reach [LOCATION], beds and
    planting are not tight against the walls.
  · Working water spigot and [110V power] available on site.
  · Surfaces are sound — no loose siding, failed caulk,
    spalling concrete or rotten timber.
  · No [rust / artillery fungus / paint transfer / oil]
    beyond what is visible in the material supplied.

───────────────────────────────────────────────────────────
  WHAT WOULD MOVE THE PRICE
───────────────────────────────────────────────────────────
  Toward the LOW end : areas smaller than estimated, lighter
                       soiling, easy access, single storey.
  Toward the HIGH end: larger areas, heavier growth, tight
                       access, extensive landscaping to
                       protect, second storey, gables or
                       dormers.
  Above the range    : [rust, deep oil, artillery fungus,
                       damaged surfaces, restricted water] —
                       re-quoted before any work begins.

───────────────────────────────────────────────────────────
  NOT INCLUDED
───────────────────────────────────────────────────────────
  · Interior or inside-pane window cleaning
  · Gutter interiors and downspout clearing
  · Repair of pre-existing damage
  · Stains that may not fully lift: deep-soaked oil, rust,
    artillery fungus, paint transfer, efflorescence
  · Sealing, staining or coating of any surface
  · [ANY SITE-SPECIFIC EXCLUSION]

───────────────────────────────────────────────────────────
  NEXT STEP
───────────────────────────────────────────────────────────
  This is an indicative figure, not an offer to contract.
  To confirm a fixed price I will [visit and measure /
  need the following details: ______________________].

  A firm written quote follows the site visit, normally
  same day. No obligation, no charge for the visit.

  [YOUR NAME] · [PHONE] · [EMAIL]
═══════════════════════════════════════════════════════════`;

const FIELDS = [
  ["Estimate number", "Same sequence you use for quotes, so the paper trail survives conversion. When this becomes a firm quote, keep the number and add a revision suffix rather than starting a new one — the customer can then see it is the same job."],
  ["Prepared from", "Where your information came from: photographs, a phone call, street view, a listing. This one line does most of the work of the whole document. It tells the customer, without any defensiveness, exactly how provisional the figure is."],
  ["Indicative until", "A date, as on a quote, but labelled to make clear it is the figure that expires and not an offer that lapses. Chemical and fuel prices move; an indicative number from last season is not one you want held against you."],
  ["Est. area — NOT MEASURED", "Flagged in capitals on every line, deliberately. Area is almost always the number you could not verify, and it is the one that drives the price. Marking it is what allows you to reprice on site without the conversation feeling like a bait and switch."],
  ["Range per line", "Low and high per surface rather than one total range. It shows the customer which part of the job carries the uncertainty — usually the siding, rarely the driveway — and it makes the total range look considered rather than hedged."],
  ["Likely landing point", "A single mid figure alongside the range. Customers anchor to something whether you offer one or not, so offering it is better than letting them anchor to the bottom of your range by default."],
  ["Assumptions block", "The heart of the document. Every figure above rests on these, and they are written as plain statements a non-specialist can check. If one turns out wrong on site, the price change is explained before you arrive at it rather than after."],
  ["What would move the price", "Directional, in the customer's language. It sets the expectation that the number can go either way — which, importantly, includes down. An estimate that can only rise reads as a negotiating position."],
  ["Above the range", "A short list of the specific findings that would take the job out of the estimate entirely, with an explicit promise to re-quote before starting. This is the clause that prevents the worst conversation in the trade: a surprise price discovered mid-job."],
  ["Not included", "Exclusions matter as much here as on a quote, because they shape what the customer pictures. Sealing and staining are worth naming explicitly — customers routinely assume a deck clean includes the finish."],
  ["Next step", "One clear action, and an explicit statement that the site visit is free and carries no obligation. The purpose of an estimate is to earn the visit; the visit is where the job is actually won."],
  ["No signature block", "Deliberately absent. A ranged figure with a signature line invites someone to accept the low end of a number you have never verified. Acceptance belongs on the quote, once there is a fixed price to accept."],
];

export default function EstimateTemplate() {
  return (
    <SeoPageShell
      meta={ESTIMATE_TEMPLATE}
      lead="Not every job starts with a site visit. When a customer sends three photos and asks roughly what it would cost, you need a document that gives a genuinely useful figure without binding you to a price you have not verified. This is that document — a ranged estimate with the assumptions stated plainly, plus the field-by-field reasoning and a worked example."
      toc={TOC}
      links={LINKS}
    >
      {/* ── Template ────────────────────────────────────────────────── */}
      <section className="wc-qt-section" id="template">
        <h2>The pressure washing estimate template</h2>
        <p className="wc-qt-sub">
          Editable in place, then copy it wherever you write. Nothing leaves your browser.
        </p>

        <TemplateBlock
          label="Pressure washing estimate — ranged, preliminary"
          template={TEMPLATE}
          note="Replace anything in [SQUARE BRACKETS]. Keep the assumptions and 'what would move the price' blocks close to as written — they are the reason this document can be honest and still useful."
        />
      </section>

      {/* ── Difference ──────────────────────────────────────────────── */}
      <section className="wc-qt-section" id="difference">
        <h2>Estimate or quote?</h2>
        <p className="wc-qt-sub">
          Two different documents doing two different jobs. Using the wrong one is expensive in
          both directions.
        </p>

        <div className="wc-table-scroll">
          <table className="wc-qt-table">
            <thead>
              <tr><th></th><th>Estimate</th><th>Quote</th></tr>
            </thead>
            <tbody>
              <tr><td>Price</td><td>A range, plus a likely landing point</td><td>One fixed figure</td></tr>
              <tr><td>Basis</td><td>Photos, description, street view</td><td>Surfaces you measured yourself</td></tr>
              <tr><td>Binding</td><td>No — indicative only</td><td>Yes, once accepted</td></tr>
              <tr><td>Areas</td><td>Estimated, flagged as unmeasured</td><td>Measured, with the date</td></tr>
              <tr><td>Carries</td><td>An assumptions block</td><td>An acceptance and signature block</td></tr>
              <tr><td>Purpose</td><td>Earn the site visit</td><td>Win the job</td></tr>
            </tbody>
          </table>
        </div>

        <p>
          Sending an estimate where a quote belongs costs you conversions. If you have stood on
          the driveway with a tape measure, a range reads as indecision — the customer wonders
          what you are unsure about and often waits for someone who sounds certain.
        </p>
        <p>
          Sending a quote where an estimate belongs costs you money. A fixed price built on a
          siding area you guessed from a photograph is a price you are bound to when the house
          turns out to have a second storey at the back, or gables the front elevation did not
          show. The{" "}
          <a href="/pressure-washing-quote-template">quote template</a> is the right document the
          moment you have measured — and not one minute before.
        </p>
      </section>

      {/* ── Fields ──────────────────────────────────────────────────── */}
      <section className="wc-qt-section" id="fields">
        <h2>Every field explained</h2>
        <p className="wc-qt-sub">Including one field that is deliberately absent.</p>
        <div className="wc-fielddef">
          {FIELDS.map(([name, text]) => (
            <div key={name}>
              <code>{name}</code>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Range ───────────────────────────────────────────────────── */}
      <section className="wc-qt-section" id="range">
        <h2>Setting the range honestly</h2>
        <p className="wc-qt-sub">
          Wide enough to be true, narrow enough to be worth sending.
        </p>
        <p>
          A range of roughly 15 to 25% between the low and high figure is the workable band for a
          job you understand but have not measured. Under 15% you are effectively quoting, and you
          will get caught by the property that turns out larger than the photographs suggested.
          Over 25% the number stops being useful — a customer told a job costs between $400 and
          $900 has learned almost nothing and will ask someone else.
        </p>
        <p>
          When your honest range is wider than 25%, the cause is almost never genuine
          unpredictability. It is a specific missing fact, and it is usually one of three: how
          much siding there actually is, whether there is a second storey at the back, or how bad
          the staining really is. The fix is one question, not a wider band. Asking "is the rear
          elevation also two storeys, and could you send a photo of the shadiest wall?" converts a
          useless range into a tight one in a single message.
        </p>

        <div className="wc-qt-callout">
          <strong>Build the ends, do not guess them.</strong> Run your low case and your high case
          through the{" "}
          <a href="/pressure-washing-estimate-calculator">estimate calculator</a> — same surfaces,
          different area and condition assumptions — and use the two results as the ends of your
          range. Both figures then carry your real costs and hold your margin, which a
          guessed range does not.
        </div>
        <p>
          Only publish a low figure you would genuinely be happy to accept. Customers hear the
          bottom of a range, and if the job matches the assumptions you printed, they will
          reasonably expect to pay near it. The high end is protected by the assumptions block;
          the low end is protected by nothing except your judgement in choosing it.
        </p>
      </section>

      {/* ── Example ─────────────────────────────────────────────────── */}
      <section className="wc-qt-section" id="example">
        <h2>A filled-in example</h2>
        <p className="wc-qt-sub">
          A customer sends four photos of a house and a driveway and asks for a ballpark. Here is
          what goes back.
        </p>

        <div className="wc-qt-example">
          <div className="head">Estimate 2026-0188 · prepared from photos supplied 6 May 2026 · indicative until 5 June</div>
          <div className="body">
            <div className="wc-qt-line">
              <span className="lbl">1. House siding — soft wash<small>~1,600–2,000 sq ft vinyl, NOT MEASURED · moderate growth on the north wall</small></span>
              <span className="amt">$540 – $720</span>
            </div>
            <div className="wc-qt-line">
              <span className="lbl">2. Driveway — surface clean<small>~700–900 sq ft concrete, NOT MEASURED · moderate soiling, no visible oil</small></span>
              <span className="amt">$185 – $245</span>
            </div>
            <div className="wc-qt-line total">
              <span className="lbl">Estimated total</span><span className="amt">$725 – $965</span>
            </div>
            <div className="wc-qt-line">
              <span className="lbl">Likely landing point, if assumptions hold<small>After a 10% bundle discount on a two-surface visit</small></span>
              <span className="amt">approx. $760</span>
            </div>
          </div>
        </div>

        <p className="wc-qt-note">
          Assumptions stated: single storey throughout; areas estimated from photographs, not
          measured; condition assessed as moderate; standard access with no tight planting;
          working spigot on site. Not included: sealing, gutter interiors, rust or deep-soaked
          oil treatment.
        </p>

        <p>
          The two ends come from running the same two surfaces through the calculator twice.
          The low case uses 1,600 sq ft of siding and a 700 sq ft driveway; the high case uses
          2,000 and 900. Both are priced in moderate condition at the default rates, and both
          carry the same labor, chemical and travel costs — so the range is $240 wide, about
          25% of the low figure, and every point inside it holds the target margin.
        </p>
        <p>
          The landing point of roughly $760 is the low-to-middle case with the 10% bundle
          discount applied, which is where a job matching the stated assumptions genuinely
          lands. Offering it costs nothing in flexibility — the range and the assumptions are
          still doing their work — and it gives the customer the single number they were
          actually asking for when they sent the photos.
        </p>
      </section>

      {/* ── Convert ─────────────────────────────────────────────────── */}
      <section className="wc-qt-section" id="convert">
        <h2>Converting it into a quote</h2>
        <p className="wc-qt-sub">
          The estimate earns the visit. The visit is where the job is won.
        </p>
        <p>
          Treat the estimate as a booking tool. Its purpose is not to win the work outright but to
          be close enough, and honest enough, that the customer agrees to a free site visit. Once
          you are standing on the property with a tape measure, the conversion rate on that visit
          is far higher than anything you can achieve over email — the customer has already
          accepted your range in principle, and you are now the person who turned up.
        </p>
        <p>
          Measure every surface and write the areas down with the date. Check the assumptions you
          printed, one by one, and note any that were wrong — that list is what justifies any
          movement from the estimate. Then produce the firm quote: same reference number with a
          revision suffix, the range replaced by a single fixed price, the assumptions block
          replaced by measured areas, and an acceptance block added.
        </p>
        <p>
          Do it on site if you can. A quote handed over or emailed while you are still in the
          driveway converts better than one that arrives two days later, and it costs you nothing
          but the few minutes it takes to put the measured numbers into the calculator on your
          phone.
        </p>
        <p>
          If the measurements come in materially above what you assumed, say so plainly and point
          at the assumption that changed: the rear elevation is two storeys, the siding is 2,400
          square feet rather than the 1,800 the photographs suggested. Customers accept a price
          movement they can trace to a stated assumption. What they do not accept — reasonably —
          is a number that simply got bigger between the email and the visit.
        </p>
      </section>
    </SeoPageShell>
  );
}
