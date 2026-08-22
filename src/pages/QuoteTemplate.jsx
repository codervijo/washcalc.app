import SeoPageShell from "../components/SeoPageShell.jsx";
import TemplateBlock from "../components/TemplateBlock.jsx";
import { QUOTE_TEMPLATE } from "./seoPages.js";

const TOC = [
  { id: "template", label: "The template" },
  { id: "fields", label: "Every field explained" },
  { id: "howto", label: "How to write the quote" },
  { id: "example", label: "A filled-in example" },
  { id: "workflow", label: "Sending, following up, closing" },
  { id: "faq", label: "FAQ" },
];

const LINKS = [
  { to: "/pressure-washing-estimate-template", label: "Estimate template", note: "the ranged version, for when you have not measured yet." },
  { to: "/pressure-washing-estimate-calculator", label: "Estimate calculator", note: "produce the line prices this template asks for." },
  { to: "/quote-tool", label: "Power washing quote tool", note: "the pricing formula and quote anatomy in more depth." },
  { to: "/calculator", label: "All-surface calculator", note: "price any single surface before it becomes a line." },
  { to: "/pressure-washing-pricing-guide", label: "Pressure washing pricing guide", note: "how to set the rates that fill these lines." },
  { to: "/calculators/deck", label: "Deck cleaning calculator", note: "material, PSI and stain coverage for a deck line." },
];

const TEMPLATE = `═══════════════════════════════════════════════════════════
  [YOUR BUSINESS NAME]
  [Street address] · [City, State ZIP]
  [Phone] · [Email] · [Website]
  Licence #[NUMBER] · Insured: [CARRIER, POLICY #]
═══════════════════════════════════════════════════════════

                     QUOTE

  Quote number : [YYYY-NNNN]
  Date issued  : [DATE]
  Valid until  : [DATE + 30 DAYS]

───────────────────────────────────────────────────────────
  PREPARED FOR
───────────────────────────────────────────────────────────
  Client       : [CLIENT NAME]
  Service site : [SERVICE ADDRESS]
  Phone        : [CLIENT PHONE]
  Email        : [CLIENT EMAIL]

───────────────────────────────────────────────────────────
  SCOPE OF WORK — FIXED PRICE
───────────────────────────────────────────────────────────

  1. [SURFACE]                                    $[AMOUNT]
     Area    : [N] sq ft (measured [DATE])
     Method  : [Soft wash / pressure wash], [PSI or "under 500 PSI"]
     Solution: [e.g. sodium hypochlorite + surfactant]

  2. [SURFACE]                                    $[AMOUNT]
     Area    : [N] sq ft (measured [DATE])
     Method  : [Soft wash / pressure wash], [PSI]
     Solution: [SOLUTION]

  3. [SURFACE]                                    $[AMOUNT]
     Area    : [N] sq ft (measured [DATE])
     Method  : [Soft wash / pressure wash], [PSI]
     Solution: [SOLUTION]

     Surface preparation & protection            INCLUDED
     Cover outlets and fixtures, pre-wet and rinse
     landscaping, protect furniture and vehicles.

                                    Subtotal    $[AMOUNT]
                       Bundle discount ([N]%)  −$[AMOUNT]
                        ═══════════════════════════════════
                        TOTAL — FIXED PRICE     $[AMOUNT]
                        ═══════════════════════════════════

───────────────────────────────────────────────────────────
  OPTIONAL ADD-ONS — not included above
───────────────────────────────────────────────────────────
  [ ] [Add-on, e.g. driveway sealing]             +$[AMOUNT]
  [ ] [Add-on, e.g. gutter face brightening]      +$[AMOUNT]
  [ ] [Add-on, e.g. rust stain treatment]         +$[AMOUNT]

  Add-ons are priced separately and only performed if
  selected in writing before the scheduled date.

───────────────────────────────────────────────────────────
  NOT INCLUDED — EXCLUSIONS
───────────────────────────────────────────────────────────
  · Interior or inside-pane window cleaning
  · Gutter interiors and downspout clearing
  · Repair of pre-existing damage: loose siding, failed
    caulk, cracked or spalling concrete, rotten timber
  · Stains that may not fully lift: deep-soaked oil, rust,
    artillery fungus, paint transfer, efflorescence
  · Removal of vehicles, heavy furniture or stored items
  · [ANY SITE-SPECIFIC EXCLUSION]

───────────────────────────────────────────────────────────
  TERMS
───────────────────────────────────────────────────────────
  Price        : Fixed. Holds for the scope above, provided
                 site conditions match those observed on
                 [SURVEY DATE].
  Payment      : [e.g. Due in full on completion]
  Deposit      : [e.g. None / $AMOUNT due on acceptance]
  Methods      : [Card, transfer, cheque, cash]
  Access       : Client to provide working water spigot and
                 [110V power / clear vehicle access].
  Weather      : Either party may reschedule for unsafe
                 conditions at no charge. Price and validity
                 date are unaffected by a weather delay.
  Cancellation : [e.g. 24 hours notice, no charge]
  Warranty     : [e.g. 14-day callback on missed areas]
  Variations   : Work outside the scope above is quoted
                 separately and agreed in writing first.

───────────────────────────────────────────────────────────
  ACCEPTANCE
───────────────────────────────────────────────────────────
  I accept this quote and authorise the work described.

  Signature : ______________________  Date : __________
  Print name: ______________________

  Preferred date: ____________  Alternate: ____________

  Questions? [YOUR NAME] · [PHONE] · [EMAIL]
═══════════════════════════════════════════════════════════`;

const FIELDS = [
  ["Quote number", "A unique reference, usually year plus a sequence — 2026-0142. It makes follow-up calls unambiguous, keeps your records searchable, and quietly signals that you have done this more than a handful of times."],
  ["Valid until", "An actual date, not a duration. \"Valid 30 days\" requires the customer to do arithmetic; a printed date creates a deadline they can see. It also protects you from a quote written at this season's chemical and fuel prices being accepted next year."],
  ["Area (measured)", "The square footage and the date you measured it. This is what turns the document from an opinion into a fixed price: if the areas are as measured, the price stands. Naming the measurement date also anchors the site-conditions clause in the terms."],
  ["Method and PSI", "Per line, because it varies per line. \"Soft wash, under 500 PSI\" on siding and \"surface cleaner, 3,000 PSI\" on concrete tells the customer you know the difference — and it is your defence if damage is alleged on a surface you treated correctly."],
  ["Solution", "The chemistry, stated plainly. Customers with pets, planting or a pool will ask, and answering before they ask is worth more than answering well afterwards."],
  ["Bundle discount", "Show it as a line rather than quietly lowering the prices. A visible saving closes better than a lower number with no explanation, and it keeps your per-surface rates intact for the next quote."],
  ["Optional add-ons", "Below the total, with checkboxes, never folded into the main price. Customers upgrade themselves far more readily than they accept a higher headline figure — and an unticked box costs you nothing."],
  ["Exclusions", "The most valuable block on the page. Nearly every dispute in this trade is about what \"clean\" was supposed to mean. Naming the stains that may not fully lift, before the work, converts a potential argument into an expectation you set."],
  ["Access requirements", "Water and power are your responsibility to ask about and the client's to provide. Arriving to find a dead spigot or a driveway full of cars costs you a slot you cannot refill."],
  ["Weather clause", "Rain during a wash rarely matters; freezing conditions, high wind carrying your mix onto a neighbour's car, and lightning do. Agreeing the reschedule policy in advance means a delay never turns into a refund conversation."],
  ["Variations", "One line stating that out-of-scope work is quoted separately and agreed in writing. It is what lets you say yes to \"while you're here, could you just...\" without giving the work away."],
  ["Acceptance block", "A signature, a printed name and a date. This is what makes it a quote rather than an estimate — the customer is accepting a fixed price, and you now have a record that they did."],
];

export default function QuoteTemplate() {
  return (
    <SeoPageShell
      meta={QUOTE_TEMPLATE}
      lead="A quote is a firm offer at a fixed price, and it should read like one. This template is the full document — scope, method per surface, exclusions, terms and an acceptance block — ready to copy, edit in place and send. Below it, every field is explained, and there is a worked example filled in with real numbers."
      toc={TOC}
      links={LINKS}
    >
      {/* ── Template ────────────────────────────────────────────────── */}
      <section className="wc-qt-section" id="template">
        <h2>The pressure washing quote template</h2>
        <p className="wc-qt-sub">
          Edit any field directly in the box, then copy it into your email, invoicing tool or
          document editor. Nothing is sent anywhere — the text stays in your browser.
        </p>

        <TemplateBlock
          label="Pressure washing quote — fixed price"
          template={TEMPLATE}
          note="Everything in [SQUARE BRACKETS] is yours to replace. The exclusions and terms blocks are the parts worth keeping close to as written — they are what the document is for."
        />

        <div className="wc-qt-callout">
          <strong>Quote or estimate?</strong> Use this document when you have measured the
          surfaces yourself and can commit to the price. If you are pricing from photographs, a
          phone description or a listing square footage, send a ranged estimate instead — the{" "}
          <a href="/pressure-washing-estimate-template">estimate template</a> is built for exactly
          that, and using the wrong one is how contractors end up bound to a price they never
          verified.
        </div>
      </section>

      {/* ── Fields ──────────────────────────────────────────────────── */}
      <section className="wc-qt-section" id="fields">
        <h2>Every field explained</h2>
        <p className="wc-qt-sub">
          What each block is for, and what it costs you when it is missing.
        </p>
        <div className="wc-fielddef">
          {FIELDS.map(([name, text]) => (
            <div key={name}>
              <code>{name}</code>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HowTo (visible counterpart to HowTo JSON-LD) ─────────────── */}
      <section className="wc-qt-section" id="howto">
        <h2>How to write a pressure washing quote</h2>
        <p className="wc-qt-sub">
          Seven steps from a measured property to a document a customer can accept.
        </p>
        <ol className="wc-steps">
          {QUOTE_TEMPLATE.howTo.steps.map((s) => (
            <li key={s.name}>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <p>
          Steps two and three are the ones a calculator does for you. The{" "}
          <a href="/pressure-washing-estimate-calculator">estimate calculator</a> prices every
          surface line, applies the bundle discount, holds your margin floor and enforces your
          minimum in one pass — which means the numbers you paste into the template have already
          been checked against your costs.
        </p>
      </section>

      {/* ── Worked example ──────────────────────────────────────────── */}
      <section className="wc-qt-section" id="example">
        <h2>A filled-in example</h2>
        <p className="wc-qt-sub">
          The same template with a real job in it — a single-storey home with a driveway and a
          patio, priced at the WashCalc default model.
        </p>

        <div className="wc-qt-example">
          <div className="head">Quote 2026-0142 · issued 14 May 2026 · valid until 13 June 2026</div>
          <div className="body">
            <div className="wc-qt-line">
              <span className="lbl">1. House siding — soft wash<small>1,800 sq ft vinyl, measured 12 May · sodium hypochlorite + surfactant, under 500 PSI</small></span>
              <span className="amt">$648</span>
            </div>
            <div className="wc-qt-line">
              <span className="lbl">2. Driveway — surface clean<small>800 sq ft concrete, measured 12 May · 3,000 PSI surface cleaner, degreaser pre-treat</small></span>
              <span className="amt">$211</span>
            </div>
            <div className="wc-qt-line">
              <span className="lbl">3. Patio — surface clean<small>400 sq ft concrete, measured 12 May · 3,000 PSI surface cleaner</small></span>
              <span className="amt">$100</span>
            </div>
            <div className="wc-qt-line">
              <span className="lbl">Surface preparation &amp; protection<small>Outlets covered, landscaping pre-wet and rinsed, vehicles protected</small></span>
              <span className="amt">$0 <small className="wc-qt-incl">(incl.)</small></span>
            </div>
            <div className="wc-qt-line">
              <span className="lbl">Subtotal</span><span className="amt">$959</span>
            </div>
            <div className="wc-qt-line discount">
              <span className="lbl">Bundle discount (10%)<small>Siding and flatwork booked as one visit</small></span>
              <span className="amt">−$96</span>
            </div>
            <div className="wc-qt-line total">
              <span className="lbl">Total — fixed price</span><span className="amt">$863</span>
            </div>
          </div>
        </div>

        <p className="wc-qt-note">
          Optional add-ons quoted separately: driveway sealing +$180, gutter face brightening
          +$95, rust stain treatment +$60. Payment due in full on completion · no deposit ·
          weather reschedule at no charge · 14-day callback on missed areas.
        </p>

        <p>
          The line prices come straight from the estimate calculator: 1,800 sq ft of siding in
          moderate condition at the default $0.30 rate is $648, the 800 sq ft driveway is $211,
          the 400 sq ft patio in light condition is $100. Behind the customer-facing document, the
          job carries about 9.7 hours of production time and roughly $408 of cost, so the accepted
          price of $863 leaves a gross margin near 53%.
        </p>
        <p>
          Notice what is on the quote and what is not. The customer sees areas, methods,
          solutions, prices and a visible discount. They do not see the hours, the cost, the
          margin or the cost-plus floor. Those are the numbers that told you $863 was safe to
          offer — and volunteering them turns a conversation about the work into a negotiation
          about your business.
        </p>
      </section>

      {/* ── Workflow ────────────────────────────────────────────────── */}
      <section className="wc-qt-section" id="workflow">
        <h2>Sending, following up, closing</h2>
        <p className="wc-qt-sub">The document is half of it. This is the other half.</p>
        <p>
          <strong>Send it the same day.</strong> Within twenty-four hours at the outside. The
          quote that arrives while the conversation is still fresh converts substantially better
          than a more polished one sent four days later, and on commercial work the first
          complete, professional document through the door frequently takes the contract before
          anyone else has written theirs.
        </p>
        <p>
          <strong>Send it as a PDF.</strong> A plain-text quote in the body of an email reads as
          provisional and reformats unpredictably on a phone. Paste this template into a document,
          export to PDF, and attach it with two or three sentences of covering email. The email is
          where you sound human; the attachment is where you sound established.
        </p>
        <p>
          <strong>Follow up twice, then stop.</strong> A short message at three or four days and
          another a few days before the validity date expires. The second one writes itself
          because the expiry gives you a reason to make contact that is not "just checking in".
          Beyond two follow-ups you are training yourself to chase work that is not coming.
        </p>
        <p>
          <strong>Reissue rather than amend.</strong> If the customer adds a surface or changes
          the scope, produce a new quote with a revision suffix — 2026-0142-R1 — rather than
          editing the original. It keeps the record clean, and if there is ever a disagreement
          about what was agreed, having one document per version rather than one document that
          quietly changed is worth the extra minute.
        </p>
        <p>
          <strong>Keep the accepted copy.</strong> The signed acceptance, the measured areas and
          the exclusions list are what you will reach for in the rare case something goes wrong.
          They are also the reference for next year's quote on the same property, which is
          faster and more accurate than measuring it again.
        </p>
      </section>
    </SeoPageShell>
  );
}
