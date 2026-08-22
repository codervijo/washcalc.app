// Phase 1.B SEO page metadata — titles, descriptions, canonicals,
// breadcrumbs and FAQ sets for the six new search-demand pages.
//
// This module is imported by BOTH the JSX page components and prerender.js,
// so it must stay JSX-free (same contract as variants.js). FAQ answers here
// are rendered verbatim on the page AND emitted as FAQPage JSON-LD — if you
// edit an answer, it changes both at once, which is exactly what Google
// wants (schema must match visible text).

const ORIGIN = "https://washcalc.app";
const crumb = (name, path) => ({ name, url: `${ORIGIN}${path}` });
const HOME = crumb("Home", "/");

/* ─────────────────────────────────────────────────────────────────────────
   1. /pressure-washing-estimate-calculator
   Target: "pressure washing estimate calculator"
   Distinct from /calculator: builds a WHOLE-JOB estimate from multiple
   surface lines rather than pricing one surface.
   ───────────────────────────────────────────────────────────────────── */
export const ESTIMATE_CALCULATOR = {
  path: "/pressure-washing-estimate-calculator",
  title: "Pressure Washing Estimate Calculator — Multi-Surface Job Totals | WashCalc",
  description:
    "Build a complete pressure washing estimate from multiple surfaces. Add driveway, siding, deck and roof lines, apply a bundle discount and minimum, and see job price, hours, cost and margin.",
  canonical: `${ORIGIN}/pressure-washing-estimate-calculator`,
  h1: "Pressure Washing Estimate Calculator",
  breadcrumbs: [HOME, crumb("Pressure Washing Estimate Calculator", "/pressure-washing-estimate-calculator")],
  faqs: [
    {
      q: "What is the difference between this and the single-surface calculator?",
      a: "The all-surface calculator prices one surface at a time and is the fastest way to answer 'what should this driveway cost?'. This estimate calculator prices a whole visit: you add a line for every surface you will clean, and it totals labor hours, chemical and travel once at the job level rather than per line. Use the single-surface tool when a customer asks about one item, and this one when you are building the estimate you actually send.",
    },
    {
      q: "How does the bundle discount work?",
      a: "The discount is applied to the sum of the surface lines before travel and the minimum charge are considered. It exists because your fixed costs — drive, setup, teardown — are paid once no matter how many surfaces you clean, so the second and third surface genuinely cost you less to deliver. The calculator shows the pre-discount subtotal and the discount as separate lines so you can put both on the customer's estimate; a visible discount closes better than a quietly lower price.",
    },
    {
      q: "Why did my estimate come out higher than the sum of the lines?",
      a: "Two things can raise it. Travel is added after the lines are totalled, and the job minimum is a floor applied last — if the discounted total plus travel still falls under your minimum, the minimum wins. A small single-surface visit is the usual cause. That is the tool working correctly: a 200 sq ft walkway at $0.22 bills $44, which does not cover showing up.",
    },
    {
      q: "Should I show the customer the per-line prices?",
      a: "Yes. Itemized estimates close at a higher rate than a single lump sum because the customer can see what each surface costs and what method it gets. It also protects you: if they want to cut the price, they remove a line rather than asking you to discount the whole job, and your margin per remaining line is untouched.",
    },
    {
      q: "What margin should I set for a multi-surface job?",
      a: "The same target you use per surface — commonly 40–60% gross for residential work — but check the margin figure after the bundle discount, not before. A 15% bundle discount on a job priced at 45% margin lands you near 35%, which may be fine to win a large visit and may not be. The calculator recomputes effective margin after the discount so you can see the trade before you send it.",
    },
    {
      q: "Can I use this for commercial jobs?",
      a: "You can, with one adjustment: commercial flatwork prices lower per square foot than residential because production rates climb with area. Lower the per-line rate rather than leaning on the bundle discount, and drop the minimum charge, which is largely a residential concept. Build a separate commercial rate card instead of discounting your residential one across the board.",
    },
  ],
};

/* ─────────────────────────────────────────────────────────────────────────
   2. /roof-cleaning-cost — cost guide (research intent)
   Deliberately carries no calculator form; /calculators/roof is the tool.
   ───────────────────────────────────────────────────────────────────── */
export const ROOF_COST = {
  path: "/roof-cleaning-cost",
  title: "Roof Cleaning Cost (2026) — What to Charge and Why | WashCalc",
  description:
    "What roof cleaning costs in 2026: soft-wash price per square foot, what drives the number up, how contractors price pitch and access, worked examples, and DIY versus professional.",
  canonical: `${ORIGIN}/roof-cleaning-cost`,
  h1: "Roof Cleaning Cost",
  breadcrumbs: [HOME, crumb("Roof Cleaning Cost", "/roof-cleaning-cost")],
  faqs: [
    {
      q: "How much does roof cleaning cost?",
      a: "Published 2026 guides put soft-wash roof cleaning at roughly $0.40–$0.60 per square foot, with a typical residential job landing around $300–$700 (HomeGuide, Angi). A 1,500 sq ft roof in moderate condition sits near the middle of that band. Steep pitch, difficult access, a second storey or heavy black-streak coverage push a job toward and past the top of it.",
    },
    {
      q: "Why is roof cleaning more expensive per square foot than a driveway?",
      a: "Three reasons, and none of them are the cleaning itself. Production rate is far lower because you are working carefully at height rather than walking a surface cleaner across flat concrete. Chemical cost is materially higher — a sodium hypochlorite mix with surfactant runs roughly $40–$80 on an average roof. And the risk profile is different: fall protection, ladder time, insurance and equipment wear are real costs that only show up on a roof invoice.",
    },
    {
      q: "Is roof cleaning priced per square foot or per job?",
      a: "Most contractors calculate per square foot internally and present a flat job price to the homeowner. The per-square-foot rate is what keeps you honest across jobs of different sizes; the flat number is what the customer wants to hear. Quoting an hourly rate for roof work is rare and usually a mistake, because it caps your upside on the exact jobs where your skill saves the most time.",
    },
    {
      q: "Does roof pitch change the price?",
      a: "Yes, and it is one of the largest single factors. A low-slope roof you can walk is straightforward. Once pitch requires roof anchors, harnesses or working entirely from ladders and extension wands, both the hours and the risk climb sharply. Many operators handle this with a pitch surcharge or a condition step-up rather than a separate line, but it has to land in the price somewhere.",
    },
    {
      q: "Should a roof ever be pressure washed instead of soft washed?",
      a: "Not an asphalt shingle roof. High pressure lifts and strips the granules that give shingles their service life, and it will void most manufacturer warranties. Soft washing — low pressure plus a sodium hypochlorite solution that kills the algae — is the standard method, and it is what the ARMA and shingle manufacturers direct. Tile and metal tolerate more, but the chemistry still does the work, not the pressure.",
    },
    {
      q: "Is DIY roof cleaning worth it?",
      a: "For most homeowners, no — and this is one of the few cases where a contractor can say that honestly. The chemical handling is manageable, but working on a wet, sloped, chemically-slick roof is where the injuries happen, and shingle damage from a rented pressure washer is expensive and permanent. The realistic DIY saving is a few hundred dollars against a genuine fall risk and a warranty you may void.",
    },
    {
      q: "How often does a roof need cleaning?",
      a: "Typically every two to four years, driven by climate rather than the calendar. Shaded, humid and north-facing roofs grow gloeocapsa magma — the black streaking — much faster than sunny, dry, well-ventilated ones. Contractors in the Pacific Northwest and the Southeast see far shorter cycles than those in arid markets, which is worth knowing before you build a maintenance-plan offer around a national average.",
    },
  ],
};

/* ─────────────────────────────────────────────────────────────────────────
   3. /driveway-pressure-washing-cost — cost guide
   ───────────────────────────────────────────────────────────────────── */
export const DRIVEWAY_COST = {
  path: "/driveway-pressure-washing-cost",
  title: "Driveway Pressure Washing Cost (2026) — Rates, Factors & Examples | WashCalc",
  description:
    "Driveway pressure washing cost in 2026: price per square foot for concrete and asphalt, what oil stains and aggregate do to the number, worked pricing examples, and when a minimum charge applies.",
  canonical: `${ORIGIN}/driveway-pressure-washing-cost`,
  h1: "Driveway Pressure Washing Cost",
  breadcrumbs: [HOME, crumb("Driveway Pressure Washing Cost", "/driveway-pressure-washing-cost")],
  faqs: [
    {
      q: "How much does it cost to pressure wash a driveway?",
      a: "Published 2026 ranges put concrete driveway cleaning at roughly $0.20–$0.35 per square foot, with a typical residential job at about $100–$300 (HomeGuide, Angi). A standard two-car driveway of 600–900 sq ft in moderate condition therefore lands in the low-to-mid hundreds. Below roughly $150 most operators apply a minimum charge instead of the square-foot rate.",
    },
    {
      q: "Why do small driveways cost more per square foot?",
      a: "Because the costs that do not scale — driving there, unrolling hose, setting up, packing down, invoicing — are identical on a 300 sq ft slab and a 1,200 sq ft driveway. Spread across less area, they consume a larger share of the price. This is the entire reason minimum charges exist, and why a per-square-foot rate quoted on a tiny job is a rate that loses money.",
    },
    {
      q: "Does an oil stain change the price?",
      a: "It changes the labor, so it should change the price. Oil and transmission fluid need a degreaser, dwell time and often a second pass or hot water, none of which the surface cleaner does on its own. Most operators either step the condition up a band or add a stain-treatment line. Be explicit with the customer that heavily-soaked older stains lighten rather than vanish — set that expectation in the estimate, not after the job.",
    },
    {
      q: "Is asphalt cleaned differently from concrete?",
      a: "Yes, and it matters to your pricing. Asphalt is a bound aggregate that erodes under the pressure concrete shrugs off, so it wants lower pressure, a wider fan and more chemical-led cleaning. That is slower work for a similar-looking result, which is why some operators price asphalt at the upper end of their range or decline it entirely rather than explain a gouged driveway.",
    },
    {
      q: "Does the price include sealing?",
      a: "It should not. Sealing is a separate service with its own material cost, its own labor and its own dry-time window, and burying it inside a wash price hides both. Quote the wash, then offer sealing as an optional line. It is the highest-margin upsell on a driveway job precisely because the surface is already clean and prepped while you are standing there.",
    },
    {
      q: "How long does a driveway take to clean?",
      a: "With a 16–20 inch surface cleaner, a working figure is around 450 sq ft per hour in moderate condition — the WashCalc default. Light soiling runs faster; heavy soiling, exposed aggregate, a stamped or pebbled finish, or oil treatment can cut the rate by 30–60%. Time the first few jobs against your own gear rather than trusting any published rate, including ours.",
    },
    {
      q: "Can a homeowner pressure wash their own driveway?",
      a: "Concrete is genuinely the most forgiving surface to DIY, so this is a fair question to answer straight. A rented machine and a day of work will get a driveway visibly cleaner. What separates it from a professional result is the surface cleaner attachment, which is what prevents the zebra striping a wand leaves, plus the pre-treatment that lifts organic staining instead of blasting the top layer of concrete off.",
    },
  ],
};

/* ─────────────────────────────────────────────────────────────────────────
   4. /house-washing-cost — cost guide
   ───────────────────────────────────────────────────────────────────── */
export const HOUSE_COST = {
  path: "/house-washing-cost",
  title: "House Washing Cost (2026) — Soft Wash Pricing by Siding & Storey | WashCalc",
  description:
    "House washing cost in 2026: soft-wash price per square foot, how vinyl, stucco and brick differ, what a second storey adds, worked examples, and how contractors build the number.",
  canonical: `${ORIGIN}/house-washing-cost`,
  h1: "House Washing Cost",
  breadcrumbs: [HOME, crumb("House Washing Cost", "/house-washing-cost")],
  faqs: [
    {
      q: "How much does house washing cost?",
      a: "Angi reports whole-house exterior cleaning spanning roughly $100–$711 with an average near $311, and HomeGuide puts soft washing at about $0.25–$0.75 per square foot against $0.15–$0.50 for straight pressure washing. In practice a single-storey home commonly lands in the mid hundreds and a two-storey home meaningfully above that. The spread is wide because siding area, storey count and regional labor move the number more than anything the contractor chooses.",
    },
    {
      q: "How do contractors measure siding area?",
      a: "Not by the home's floor area, which is the mistake that produces underpriced quotes. Siding area is the wall surface you actually clean: perimeter multiplied by wall height, per storey, before subtracting large openings. A 2,000 sq ft two-storey home can carry well over 2,000 sq ft of siding once both levels are counted, which is why quoting from the listing square footage systematically loses money.",
    },
    {
      q: "Why does a second storey cost more?",
      a: "Reach. Ground-floor siding is fast work with a downstream injector and a wand. Above that you are on ladders, or using extension wands and telescoping poles that are slower, heavier and harder to control, and the rinse has to be managed so it does not streak what you have already cleaned. Many operators carry a explicit two-storey uplift because the extra time is real and predictable rather than a judgement call.",
    },
    {
      q: "Does siding material change the price?",
      a: "It changes method and speed more than rate. Vinyl and painted surfaces are the standard soft-wash case: low pressure, sodium hypochlorite, surfactant. Stucco is porous and absorbent, so it wants a gentler mix and careful rinsing. Unpainted brick tolerates more but holds efflorescence that plain SH will not touch. Painted brick and cedar behave like paint — treat them as delicate. Price the slower materials at the top of your band.",
    },
    {
      q: "What is the difference between house washing and power washing?",
      a: "House washing on siding is soft washing: the chemistry kills the mould and algae and low pressure rinses it away. Power or pressure washing relies on force, which on vinyl drives water behind the panels and on painted surfaces strips the finish. If a quote you are competing against promises to pressure wash siding, that is a genuine technical difference you can explain to the customer rather than a price you need to match.",
    },
    {
      q: "How often should a house be washed?",
      a: "Annually is the common recommendation, and it is what makes house washing the strongest recurring-revenue service in residential exterior cleaning. Humid, shaded and heavily-treed lots need it more often; dry, sunny, exposed ones less. Selling the annual cycle at the point of the first wash is worth more than any single upsell on the job.",
    },
    {
      q: "Should I offer a lower price for a repeat annual customer?",
      a: "A modest one, and for the right reason. A maintained house is genuinely faster to wash — a year of growth comes off quicker than three years of it — so a repeat discount can reflect a real cost saving rather than eroded margin. Check the actual hours on the second visit before you commit to a standing rate, because the saving is smaller on north-facing and shaded walls than you would expect.",
    },
  ],
};

/* ─────────────────────────────────────────────────────────────────────────
   5. /pressure-washing-quote-template — FIRM fixed-price offer document
   ───────────────────────────────────────────────────────────────────── */
export const QUOTE_TEMPLATE = {
  path: "/pressure-washing-quote-template",
  title: "Pressure Washing Quote Template — Free, Copyable & Explained | WashCalc",
  description:
    "A free pressure washing quote template you can copy and fill in. Firm fixed-price format with acceptance terms, a fully worked example, and every field explained line by line.",
  canonical: `${ORIGIN}/pressure-washing-quote-template`,
  h1: "Pressure Washing Quote Template",
  breadcrumbs: [HOME, crumb("Pressure Washing Quote Template", "/pressure-washing-quote-template")],
  faqs: [
    {
      q: "What is the difference between a quote and an estimate?",
      a: "A quote is a firm offer: a fixed price the customer can accept, which binds you to deliver at that number. An estimate is a considered approximation, given with stated assumptions, that can move if the job turns out different. Use a quote when you have seen the property and measured it. Use an estimate when you are pricing from photos, a phone description or an unverified square footage.",
    },
    {
      q: "Is a pressure washing quote legally binding?",
      a: "In general a quote that is accepted by the customer forms a contract at that price, which is exactly why the wording matters. The protection is not to hedge the number but to define the scope precisely: what surfaces, what area, what method, what is excluded, and what happens if conditions turn out materially different from what you were shown. This template puts all of that in writing. Contract law varies by state and country, so treat this as trade practice, not legal advice.",
    },
    {
      q: "How long should a quote stay valid?",
      a: "Thirty days is the trade standard and it does two useful things. It gives the customer a real reason to decide rather than sitting on it, and it protects you from a quote written at last season's chemical and fuel prices being accepted six months later. Put the expiry date on the document as a date, not as 'valid 30 days' — a date creates urgency in a way a duration does not.",
    },
    {
      q: "Should I ask for a deposit?",
      a: "For standard residential work most operators do not, and payment on completion keeps the sale friction-free. Take a deposit when the job requires you to buy materials up front — sealing and staining are the usual cases — when it is a large multi-day commercial booking, or when a customer's history warrants it. If you do take one, state the amount, when it is due, and whether it is refundable, in the quote itself.",
    },
    {
      q: "What should I exclude from a pressure washing quote?",
      a: "Everything you are not going to do, explicitly. Common exclusions are interior window cleaning, gutter interiors, repairs to already-damaged or loose surfaces, rust and paint-transfer stains that will not fully lift, and moving heavy furniture or vehicles. An exclusions block is not defensive small print — it is the single cheapest way to prevent a dispute about what 'clean' was supposed to mean.",
    },
    {
      q: "How do I handle weather cancellations?",
      a: "State the policy in the quote so it is agreed before it is needed. The standard is that either party may reschedule for weather at no charge, with the price and the validity date unaffected by the delay. Rain during a wash is largely irrelevant to the result; freezing conditions, high wind that carries your soft-wash mix onto a neighbour's car, and lightning are the genuine stoppers.",
    },
  ],
  // HowTo JSON-LD — mirrors the visible "How to write a pressure washing
  // quote" section on the page, step for step.
  howTo: {
    name: "How to write a pressure washing quote",
    description:
      "The seven steps professional pressure washing contractors follow to turn a measured job into a firm, fixed-price quote a customer can accept.",
    steps: [
      { name: "Measure the job", text: "Measure each surface you will clean and record the areas separately — driveway, walkways, siding by storey, deck, roof. Estimates built on the home's listing square footage rather than actual cleaned area are the most common cause of an underpriced quote." },
      { name: "Price each surface", text: "Apply your per-square-foot rate for each surface and adjust it for condition. Reconcile that market rate against your cost-plus floor — labor, chemical, fuel and overhead divided by one minus your target margin — and take whichever number is higher." },
      { name: "Add travel and apply your minimum", text: "Add a travel line for jobs outside your tight service radius, then check the total against your minimum charge. If the job falls below the minimum, the minimum is the price. A small job carries the same drive and setup overhead as a large one." },
      { name: "Itemize the line items", text: "Write one line per surface showing the area, the method — pressure wash or soft wash — and the price. Itemizing is what justifies a higher price than a competitor who offers a single lump sum, and it lets a price-sensitive customer remove a line instead of asking you to discount everything." },
      { name: "List optional add-ons separately", text: "Put sealing, gutter face brightening, rust removal and any other upsell on their own opt-in lines with their own prices, below the total. Never fold them into the main number. Customers upgrade themselves far more readily than they accept a higher headline price." },
      { name: "Write the terms and exclusions", text: "State the payment terms, deposit rule if any, the weather-reschedule policy, and an explicit list of what the quote does not cover. This is the block that prevents disputes about scope after the work is done." },
      { name: "Number it, date it and send it same day", text: "Give the quote a unique reference number and a specific valid-until date, then send it the same day or within twenty-four hours. Fresh impressions convert fastest, and on commercial work the first complete, professional document through the door frequently wins the contract." },
    ],
  },
};

/* ─────────────────────────────────────────────────────────────────────────
   6. /pressure-washing-estimate-template — PRELIMINARY ranged document
   ───────────────────────────────────────────────────────────────────── */
export const ESTIMATE_TEMPLATE = {
  path: "/pressure-washing-estimate-template",
  title: "Pressure Washing Estimate Template — Ranged Format & Example | WashCalc",
  description:
    "A free pressure washing estimate template built for pricing before you have measured. Ranged format with stated assumptions, a worked example, and how to convert it into a firm quote.",
  canonical: `${ORIGIN}/pressure-washing-estimate-template`,
  h1: "Pressure Washing Estimate Template",
  breadcrumbs: [HOME, crumb("Pressure Washing Estimate Template", "/pressure-washing-estimate-template")],
  faqs: [
    {
      q: "When should I send an estimate instead of a quote?",
      a: "Send an estimate whenever you have not personally verified the job. Pricing from photos a customer texted you, from a phone description, from a listing square footage, or from a site you have only seen from the street are all estimate situations. The moment you have measured the surfaces yourself, switch to a firm quote — an estimate used where a quote belongs reads as indecision and loses work.",
    },
    {
      q: "How wide should the range be?",
      a: "Wide enough to be honest, narrow enough to be useful. Around 15–25% between the low and high figure is typical for a job you understand but have not measured. If your honest range is wider than that, the real problem is a missing piece of information — usually siding area, storey count or how bad the staining actually is — and the fix is asking one question, not widening the band further.",
    },
    {
      q: "Do I have to honour the low end of the range?",
      a: "You have to honour the assumptions you printed. If the job matches what you stated — the area, the storey count, the condition — the customer will reasonably expect a price near the low end, so only publish a low figure you would genuinely accept. If the job comes in worse than the stated assumptions, the assumptions block is what lets you price above the range without it feeling like a bait and switch.",
    },
    {
      q: "What assumptions should I always list?",
      a: "The measurements you have used and where they came from, the condition band you have assumed, the storey count, water and power access on site, and anything you have not been able to see. Listing the source of a number matters as much as the number: 'siding area estimated from photos, not measured' tells the customer exactly what changes if it turns out different, and does it before there is a disagreement.",
    },
    {
      q: "How do I turn an estimate into a quote?",
      a: "Visit, measure, and reissue. Keep the same reference number with a revision suffix so the paper trail is obvious, replace the range with a single fixed price, replace the assumptions block with the measured areas, and add the acceptance terms. Doing this on site while you are standing in the driveway is the highest-converting moment in the whole sequence — the customer has already accepted the range in principle.",
    },
    {
      q: "Should an estimate include the terms and exclusions?",
      a: "Include the exclusions, keep the acceptance terms short. Exclusions do real work at the estimate stage because they shape what the customer expects the job to be. Full payment and acceptance terms belong on the quote, where there is a fixed price to accept — putting a signature block on a ranged document invites someone to accept the low end of a number you have not verified.",
    },
  ],
};

export const SEO_PAGES = [
  ESTIMATE_CALCULATOR,
  ROOF_COST,
  DRIVEWAY_COST,
  HOUSE_COST,
  QUOTE_TEMPLATE,
  ESTIMATE_TEMPLATE,
];
