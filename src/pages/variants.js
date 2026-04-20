// Per-surface presets for variant calculator pages.
// Add a new entry + route to publish a new SEO page.

export const DRIVEWAY = {
  surfaceId: "driveway",
  lockSurface: true,
  title: "Driveway Cleaning Cost Calculator — WashCalc",
  description: "Estimate driveway cleaning price per square foot. Get recommended price, labor time and gross profit instantly.",
  canonical: "https://www.washcalc.app/calculators/driveway",
  h1: "Driveway Cleaning Cost Calculator",
  intro: "Concrete and asphalt driveways usually price between $0.20 and $0.25 per square foot. Adjust condition and your costs to see a defensible quote in seconds.",
  defaults: { area: 900, conditionId: "moderate", marginPct: 50 },
  breadcrumb: [
    { name: "Home", url: "https://www.washcalc.app/" },
    { name: "Calculators", url: "https://www.washcalc.app/calculator" },
    { name: "Driveway", url: "https://www.washcalc.app/calculators/driveway" },
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
  canonical: "https://www.washcalc.app/calculators/roof",
  h1: "Roof Cleaning Cost Calculator",
  intro: "Soft-wash roof cleaning typically prices at $0.40–$0.60 per square foot due to safety, chemical and time. WashCalc accounts for all three.",
  defaults: { area: 1500, conditionId: "moderate", marginPct: 55, chemicalCost: 60 },
  breadcrumb: [
    { name: "Home", url: "https://www.washcalc.app/" },
    { name: "Calculators", url: "https://www.washcalc.app/calculator" },
    { name: "Roof", url: "https://www.washcalc.app/calculators/roof" },
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
  canonical: "https://www.washcalc.app/calculators/house-washing",
  h1: "House Washing Cost Calculator",
  intro: "House washing typically prices at $0.25–$0.35 per square foot of siding. Use WashCalc to combine your real labor, chemical and travel cost into a confident quote.",
  defaults: { area: 1800, conditionId: "moderate", marginPct: 50, chemicalCost: 35 },
  breadcrumb: [
    { name: "Home", url: "https://www.washcalc.app/" },
    { name: "Calculators", url: "https://www.washcalc.app/calculator" },
    { name: "House washing", url: "https://www.washcalc.app/calculators/house-washing" },
  ],
  faqs: [
    { q: "How much does house washing cost?",
      a: "Most single-story homes price between $250 and $450; two-story homes $400–$700 depending on siding area and condition." },
    { q: "Soft wash or pressure wash for siding?",
      a: "Soft-wash with a sodium hypochlorite mix is the industry standard for vinyl, stucco and painted surfaces." },
  ],
};

export const DECK = {
  surfaceId: "deck",
  lockSurface: true,
  title: "Deck Cleaning Cost Calculator — WashCalc",
  description: "Wood and composite deck cleaning calculator. Estimate price, labor time and profit per square foot.",
  canonical: "https://www.washcalc.app/calculators/deck",
  h1: "Deck Cleaning Cost Calculator",
  intro: "Deck cleaning typically prices at $0.30–$0.45 per square foot. Wood requires more care and lower pressure than composite — set condition accordingly.",
  defaults: { area: 350, conditionId: "moderate", marginPct: 50 },
  breadcrumb: [
    { name: "Home", url: "https://www.washcalc.app/" },
    { name: "Calculators", url: "https://www.washcalc.app/calculator" },
    { name: "Deck", url: "https://www.washcalc.app/calculators/deck" },
  ],
  faqs: [
    { q: "How much does deck cleaning cost?",
      a: "Most decks run $150–$400 to clean depending on size and condition. Sealing or staining is a separate quote." },
    { q: "Can I pressure wash a wood deck?",
      a: "Yes — but use lower pressure (~500–1200 PSI) and a fan tip to avoid splintering. Soft-wash with a brightener is often safer." },
  ],
};
