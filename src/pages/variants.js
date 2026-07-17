// Per-surface presets for variant calculator pages.
// Add a new entry + route to publish a new SEO page.

export const DRIVEWAY = {
  surfaceId: "driveway",
  lockSurface: true,
  title: "Driveway Cleaning Cost Calculator — WashCalc",
  description: "Estimate driveway cleaning price per square foot. Get recommended price, labor time and gross profit instantly.",
  canonical: "https://washcalc.app/calculators/driveway",
  h1: "Driveway Cleaning Cost Calculator",
  intro: "Concrete and asphalt driveways usually price between $0.20 and $0.25 per square foot. Adjust condition and your costs to see a defensible quote in seconds.",
  defaults: { area: 900, conditionId: "moderate", marginPct: 50 },
  breadcrumb: [
    { name: "Home", url: "https://washcalc.app/" },
    { name: "Calculators", url: "https://washcalc.app/calculator" },
    { name: "Driveway", url: "https://washcalc.app/calculators/driveway" },
  ],
  faqs: [
    { q: "How much should I charge to pressure wash a driveway?",
      a: "Most pros charge $0.20–$0.25 per square foot. A typical 800–1,000 sq ft residential driveway lands between $160 and $250." },
    { q: "How long does a driveway take to clean?",
      a: "About 450 sq ft per hour with a surface cleaner in moderate condition. Heavy oil staining can add 30–60%." },
    { q: "Should I include sealing in the quote?",
      a: "Sealing is a separate line item. Use WashCalc for the wash, then add sealing as a flat add-on." },
  ],
};

export const ROOF = {
  surfaceId: "roof",
  lockSurface: true,
  title: "Roof Cleaning Cost Calculator — WashCalc",
  description: "Soft-wash roof cleaning calculator. Estimate price, labor time and profit per square foot.",
  canonical: "https://washcalc.app/calculators/roof",
  h1: "Roof Cleaning Cost Calculator",
  intro: "Soft-wash roof cleaning typically prices at $0.40–$0.60 per square foot due to safety, chemical and time. WashCalc accounts for all three.",
  defaults: { area: 1500, conditionId: "moderate", marginPct: 55, chemicalCost: 60 },
  breadcrumb: [
    { name: "Home", url: "https://washcalc.app/" },
    { name: "Calculators", url: "https://washcalc.app/calculator" },
    { name: "Roof", url: "https://washcalc.app/calculators/roof" },
  ],
  faqs: [
    { q: "How much does roof cleaning cost?",
      a: "Soft-wash roof cleaning usually runs $0.40–$0.60 per square foot, or roughly $400–$900 for an average residential roof." },
    { q: "Why is roof cleaning more expensive?",
      a: "Heights, safety equipment, sodium hypochlorite mix and slower production rates make roofs the highest $/sq ft surface." },
  ],
};

export const HOUSE_WASHING = {
  surfaceId: "siding",
  lockSurface: true,
  title: "House Washing Cost Calculator — WashCalc",
  description: "Estimate house washing cost. Vinyl, brick or stucco — get a recommended price, labor time and profit.",
  canonical: "https://washcalc.app/calculators/house-washing",
  h1: "House Washing Cost Calculator",
  intro: "House washing typically prices at $0.25–$0.35 per square foot of siding. Use WashCalc to combine your real labor, chemical and travel cost into a confident quote.",
  defaults: { area: 1800, conditionId: "moderate", marginPct: 50, chemicalCost: 35 },
  breadcrumb: [
    { name: "Home", url: "https://washcalc.app/" },
    { name: "Calculators", url: "https://washcalc.app/calculator" },
    { name: "House washing", url: "https://washcalc.app/calculators/house-washing" },
  ],
  faqs: [
    { q: "How much does house washing cost?",
      a: "Most single-story homes price between $250 and $450; two-story homes $400–$700 depending on siding area and condition." },
    { q: "Soft wash or pressure wash for siding?",
      a: "Soft-wash with a sodium hypochlorite mix is the industry standard for vinyl, stucco and painted surfaces." },
    { q: "What SH mix ratio should I use for house washing?",
      a: "Most operators apply a 1–2% sodium hypochlorite solution at the surface for vinyl and painted siding, stepping up toward 3–4% for heavy mildew. Because 12.5% SH is the common stock, that means diluting roughly 4:1 to 10:1 with water plus a surfactant at about 1–2 oz per gallon. Use the SH dilution calculator on this page to hit an exact target percentage for your tank or downstream injector." },
    { q: "How do I know if a house wash job is actually profitable?",
      a: "Take the quote price and subtract fully-loaded labor (on-site hours plus drive time, times crew size, times your hourly cost), chemical cost, and fuel. The house washing job profitability calculator on this page does this for you and reports gross margin, margin percentage, effective dollars per on-site hour, and your break-even price." },
  ],
};

export const DECK = {
  surfaceId: "deck",
  lockSurface: true,
  title: "Deck Cleaning Cost Calculator — WashCalc",
  description: "Wood and composite deck cleaning calculator. Estimate price, labor time and profit per square foot.",
  canonical: "https://washcalc.app/calculators/deck",
  h1: "Deck Cleaning Cost Calculator",
  intro: "Deck cleaning typically prices at $0.30–$0.45 per square foot. Wood requires more care and lower pressure than composite — set condition accordingly.",
  defaults: { area: 350, conditionId: "moderate", marginPct: 50 },
  breadcrumb: [
    { name: "Home", url: "https://washcalc.app/" },
    { name: "Calculators", url: "https://washcalc.app/calculator" },
    { name: "Deck", url: "https://washcalc.app/calculators/deck" },
  ],
  faqs: [
    { q: "How much does deck cleaning cost?",
      a: "Most decks run $150–$400 to clean depending on size and condition. Sealing or staining is a separate quote." },
    { q: "Can I pressure wash a wood deck?",
      a: "Yes — but use lower pressure (~500–1200 PSI) and a fan tip to avoid splintering. Soft-wash with a brightener is often safer." },
    { q: "What PSI is safe for each decking material?",
      a: "Pressure-treated pine tolerates roughly 500–1,200 PSI with a 25° tip; cedar and redwood are softer and want 500–1,000 PSI with a 40° tip; dense hardwoods like IPE take 1,000–1,500 PSI; composite is the most forgiving at 1,500–2,500 PSI. The deck material selector on this page sets the safe range and warns you when your chosen PSI exceeds it." },
    { q: "How much stain do I need for a deck?",
      a: "Coverage depends on the product: oil-based stains cover about 200–300 sq ft per gallon, water-based 250–350, and solid-color stains around 200. Add railing linear footage (roughly 3–4 sq ft of surface per linear foot for a standard rail) and multiply by the number of coats. The stain and seal coverage calculator on this page does the math and suggests a marked-up price." },
    { q: "How long should a deck dry before sealing?",
      a: "Plan on 24–48 hours of dry time in warm, low-humidity conditions and up to 72 hours in humid or cool weather before applying stain or sealer. The clean-and-seal timeline on this page adjusts the dry window for your climate so you can schedule the return visit accurately." },
  ],
  // HowTo JSON-LD (emitted by prerender.js for /calculators/deck) — the
  // visible CleanAndSealTimeline renders these same steps, so schema and
  // page content match verbatim.
  howTo: {
    name: "How to clean and seal a wood deck",
    description: "The professional three-stage sequence for cleaning and sealing a wood deck, including realistic dry time between stages.",
    steps: [
      { name: "Clean the deck",
        text: "Apply a deck-safe cleaner or brightener and wash at the material-appropriate pressure (500–1,200 PSI for pressure-treated pine, lower for cedar and redwood) with a fan tip. Work with the grain and rinse thoroughly. Budget this as day one of the job." },
      { name: "Let the deck dry",
        text: "Allow the boards to dry completely before any coating goes down — 24–48 hours in warm, dry conditions and up to 72 hours in humid or cool weather. Sealing a damp deck traps moisture and causes early failure, so do not rush this window." },
      { name: "Apply stain or sealer",
        text: "Once the wood reads dry, apply stain or sealer in thin, even coats with the grain, back-brushing to work product into the wood. Coverage runs about 200–350 sq ft per gallon depending on product type. Add coats per the manufacturer's spec and keep foot traffic off until cured." },
    ],
  },
};

// Deck decking materials — recommended PSI range, nozzle, and a rate
// multiplier applied to the calculator's rate-based price. safePsiMax is the
// threshold above which the material selector shows a damage warning.
// TODO(operator): verify PSI ranges and multipliers against your own SOPs.
export const DECK_MATERIALS = [
  { id: "pt-pine",   label: "Pressure-treated pine", psiMin: 500,  psiMax: 1200, safePsiMax: 1500, nozzle: "25° green tip", priceMult: 1.0,  note: "The default. Durable but can furr/splinter if you sit too close." },
  { id: "cedar",     label: "Cedar",                 psiMin: 500,  psiMax: 1000, safePsiMax: 1200, nozzle: "40° white tip", priceMult: 1.05, note: "Soft wood — keep pressure low and the tip moving to avoid gouging." },
  { id: "redwood",   label: "Redwood",               psiMin: 500,  psiMax: 1000, safePsiMax: 1200, nozzle: "40° white tip", priceMult: 1.1,  note: "Soft and premium — brighten rather than blast; damage is costly to fix." },
  { id: "composite", label: "Composite",             psiMin: 1500, psiMax: 2500, safePsiMax: 3100, nozzle: "40° white tip", priceMult: 0.9,  note: "Most forgiving and fastest to clean; follow the board maker's PSI cap." },
  { id: "ipe",       label: "Hardwood / IPE",        psiMin: 1000, psiMax: 1500, safePsiMax: 2000, nozzle: "40° white tip", priceMult: 1.2,  note: "Dense tropical hardwood — slow, careful work and oil finishes." },
];

// FAQPage for the /pressure-washing-pricing-guide pillar page. Rendered
// visibly on the page AND emitted as FAQPage JSON-LD by prerender.js.
export const PRICING_GUIDE_FAQS = [
  { q: "How do I price a pressure washing job?",
    a: "Reconcile two numbers and take the higher one: a market rate price (square footage times a per-surface rate times a condition multiplier) and a cost-plus floor ((labor + chemical + fuel + overhead) ÷ (1 − your target margin)). Never quote below your minimum charge. This keeps a fast quote from becoming a cheap-by-accident quote." },
  { q: "What is the average cost per square foot for pressure washing in 2026?",
    a: "Driveways run about $0.20–$0.25/sq ft, house siding $0.25–$0.35, roofs $0.40–$0.60 (soft wash), wood and composite decks $0.30–$0.45, patios $0.20–$0.30, and fences $0.25–$0.40. Regional market, access, and condition move the real number." },
  { q: "What hourly rate should a pressure washing contractor target?",
    a: "Most solo and small-crew operators aim for $60–$160 in billed revenue per on-site hour after covering fully-loaded cost. Rather than quoting hourly, back into a per-square-foot rate from your cost per hour and production rate — that is what the margin-safe formula does." },
  { q: "What gross margin is healthy for pressure washing?",
    a: "A 40–60% gross margin is the common target for residential work, with roofs and other high-risk surfaces at the top of that band. Set a target margin explicitly and let your calculator enforce it — margin you do not set is margin you do not have." },
  { q: "Should I charge a minimum service fee?",
    a: "Yes. A $150 minimum is industry-standard. A small job carries the same drive, setup, and admin overhead as a large one, so a purely per-square-foot price on a tiny job loses money. Set a floor and let the calculator enforce it." },
];
