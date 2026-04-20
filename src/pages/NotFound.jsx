import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";

export default function NotFound() {
  return (
    <Layout>
      <section className="wc-section" style={{ textAlign: "center" }}>
        <div className="wc-container" style={{ maxWidth: 560 }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>404</div>
          <h1 style={{ fontSize: "clamp(24px,3.5vw,36px)", margin: "0 0 12px" }}>
            Page not found
          </h1>
          <p style={{ color: "var(--wc-text-muted)", marginBottom: 32 }}>
            That URL doesn't exist on WashCalc. Try one of these instead:
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/" className="wc-btn wc-btn-primary">Home</Link>
            <Link to="/calculator" className="wc-btn wc-btn-ghost">Calculator</Link>
            <Link to="/calculators/driveway" className="wc-btn wc-btn-ghost">Driveway</Link>
            <Link to="/calculators/roof" className="wc-btn wc-btn-ghost">Roof</Link>
            <Link to="/calculators/house-washing" className="wc-btn wc-btn-ghost">House washing</Link>
            <Link to="/calculators/deck" className="wc-btn wc-btn-ghost">Deck</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
