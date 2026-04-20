import { Link } from "react-router-dom";
import { formatMoney } from "../PricingEngine.js";

export default function Hero() {
  return (
    <section className="wc-hero">
      <div className="wc-container wc-hero-grid">
        <div>
          <span className="wc-pill">For pressure washing pros</span>
          <h1>Quote pressure washing jobs in seconds — and protect your profit.</h1>
          <p className="lead">
            Pressure washing pricing calculator for faster, more profitable quotes.
          </p>
          <div className="wc-hero-cta">
            <Link to="/calculator" className="wc-btn wc-btn-primary">Use Calculator</Link>
            <a href="#how" className="wc-btn wc-btn-ghost">See How It Works</a>
          </div>
        </div>

        <div className="wc-card wc-card-lg" style={{ padding: 22 }}>
          <div className="wc-result-headline">Sample quote · Driveway</div>
          <div className="wc-result-price">{formatMoney(245)} <span className="wc-result-sub">· $0.27/sq ft</span></div>
          <div className="wc-result-list">
            <div className="wc-result-row"><span className="wc-k">Area</span><span className="wc-v">900 sq ft · Moderate</span></div>
            <div className="wc-result-row"><span className="wc-k">Time</span><span className="wc-v">~2.5 hrs</span></div>
            <div className="wc-result-row"><span className="wc-k">Job cost</span><span className="wc-v">$118</span></div>
            <div className="wc-result-row wc-profit"><span className="wc-k">Profit</span><span className="wc-v">$127 (52%)</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
