import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="wc-footer">
      <div className="wc-container wc-footer-inner">
        <div>
          © {new Date().getFullYear()} WashCalc · washcalc.app — Pricing tools for pressure washing pros.
        </div>
        <div className="wc-footer-links">
          <Link to="/calculator">Calculator</Link>
          <Link to="/calculators/driveway">Driveway</Link>
          <Link to="/calculators/roof">Roof</Link>
          <Link to="/calculators/house-washing">House washing</Link>
          <Link to="/calculators/deck">Deck</Link>
        </div>
      </div>
    </footer>
  );
}
