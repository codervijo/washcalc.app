import { Link } from "react-router-dom";

// Guides & templates — sitewide crawl paths to every cost guide, template
// and the estimate calculator (v1.E; lifts the 2026-08-21 footer deferral).
const GUIDES = [
  { to: "/pressure-washing-pricing-guide", label: "How much to charge" },
  { to: "/pressure-washing-price-per-square-foot", label: "Price per square foot" },
  { to: "/commercial-pressure-washing-pricing", label: "Commercial pricing" },
  { to: "/driveway-pressure-washing-cost", label: "Driveway cost" },
  { to: "/house-washing-cost", label: "House washing cost" },
  { to: "/roof-cleaning-cost", label: "Roof cleaning cost" },
  { to: "/deck-pressure-washing-cost", label: "Deck cost" },
  { to: "/pressure-washing-estimate-calculator", label: "Estimate calculator" },
  { to: "/pressure-washing-quote-template", label: "Quote template" },
  { to: "/pressure-washing-estimate-template", label: "Estimate template" },
];

export default function Footer() {
  return (
    <footer className="wc-footer">
      <div className="wc-container wc-footer-inner">
        <div>
          © {new Date().getFullYear()} WashCalc · washcalc.app — Pricing tools for pressure washing pros.
        </div>
        <nav className="wc-footer-links" aria-label="Calculators">
          <Link to="/calculator">Price calculator</Link>
          <Link to="/calculators/driveway">Driveway</Link>
          <Link to="/calculators/roof">Roof</Link>
          <Link to="/calculators/house-washing">House washing</Link>
          <Link to="/calculators/deck">Deck</Link>
          <Link to="/quote-tool">Quote tool</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>
      <div className="wc-container wc-footer-guides">
        <h2 className="wc-footer-heading">Guides &amp; templates</h2>
        <nav className="wc-footer-links" aria-label="Guides and templates">
          {GUIDES.map((g) => <Link key={g.to} to={g.to}>{g.label}</Link>)}
        </nav>
      </div>
    </footer>
  );
}
