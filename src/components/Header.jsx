import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const loc = useLocation();
  const is = (p) => loc.pathname === p;
  return (
    <header className="wc-header">
      <div className="wc-header-inner">
        <Link to="/" className="wc-logo" aria-label="WashCalc home">
          <span className="wc-logo-mark" aria-hidden="true" />
          WashCalc
        </Link>
        <nav className="wc-nav" aria-label="Primary">
          <Link to="/calculator" style={is("/calculator") ? { color: "var(--wc-text)" } : null}>Calculator</Link>
          <Link to="/calculators/driveway">Driveway</Link>
          <Link to="/calculators/roof">Roof</Link>
          <Link to="/calculators/house-washing">House</Link>
          <Link to="/calculators/deck">Deck</Link>
          <Link to="/calculator" className="wc-btn wc-btn-primary" style={{ padding: "8px 14px" }}>
            Use Calculator
          </Link>
        </nav>
      </div>
    </header>
  );
}
