import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Hero from "../components/Hero.jsx";
import FAQ from "../components/FAQ.jsx";
import RelatedTools from "../components/RelatedTools.jsx";
import useSEO from "../useSEO.js";

const BENEFITS = [
  { icon: "⚡", title: "Quote faster", body: "Build a defensible price in under a minute — even on your phone in the truck." },
  { icon: "💰", title: "Protect profit", body: "Cost-plus margin logic guarantees every quote covers labor, chemical and travel." },
  { icon: "⏱️", title: "Estimate labor", body: "Hours are estimated from area and condition — no more eyeballing job time." },
  { icon: "🧴", title: "Account for chemical", body: "Soft-wash mix, surfactants, degreasers — log them so they don't eat your margin." },
  { icon: "🚚", title: "Include travel", body: "Don't forget the drive. Add travel cost so distant jobs still pencil out." },
  { icon: "🪪", title: "Look professional", body: "Send clean, consistent numbers customers trust on the first call." },
];

const FAQS = [
  { q: "How much should I charge for pressure washing?",
    a: "Most operators land between $0.20 and $0.60 per square foot depending on surface and condition. Driveways are usually $0.20–$0.25/sq ft, roofs $0.40–$0.60/sq ft. WashCalc combines a per-surface base rate with your real labor, chemical and travel cost so you never quote below profitability." },
  { q: "How does WashCalc estimate labor time?",
    a: "Each surface has a typical productivity rate in square feet per hour. We multiply by a condition factor (light, moderate, heavy) so a heavily-soiled deck takes longer than a fresh one." },
  { q: "What is a healthy gross margin for pressure washing?",
    a: "40–60% gross margin is a common target for solo and small-crew operators. WashCalc lets you set a target margin and protects it automatically." },
  { q: "Does this replace a CRM or invoicing tool?",
    a: "No — WashCalc is a focused pricing tool. Saved quotes, PDF export and lead capture are on the roadmap." },
  { q: "Can I use this on mobile?",
    a: "Yes. The calculator is fully responsive — use it on the truck, on the lawn, or at the kitchen table." },
];

export default function Landing() {
  useSEO({
    title: "Free Pressure Washing Cost Calculator — WashCalc",
    description: "Pressure washing pricing calculator for faster, more profitable quotes.",
    canonical: "https://www.washcalc.app/",
  });

  return (
    <Layout>
      <Hero />

      {/* Popular calculators — plain anchor links for crawlability */}
      <section className="wc-section-tight" style={{ background: "#fff", borderBottom: "1px solid var(--wc-border)" }}>
        <div className="wc-container">
          <h2 className="wc-section-title">Popular Calculators</h2>
          <p className="wc-section-sub">Jump straight to the tool you need.</p>
          <div className="wc-grid-4">
            <a href="/calculators/driveway" className="wc-card wc-card-pad" style={{ display: "block", color: "inherit" }}>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>Driveway Cleaning Calculator</div>
              <div style={{ color: "var(--wc-text-muted)", fontSize: 14.5 }}>
                Concrete or asphalt driveway pricing at $0.20–$0.25 per square foot.
              </div>
            </a>
            <a href="/calculators/house-washing" className="wc-card wc-card-pad" style={{ display: "block", color: "inherit" }}>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>House Washing Calculator</div>
              <div style={{ color: "var(--wc-text-muted)", fontSize: 14.5 }}>
                Vinyl, brick or stucco siding pricing at $0.25–$0.35 per square foot.
              </div>
            </a>
            <a href="/calculators/roof" className="wc-card wc-card-pad" style={{ display: "block", color: "inherit" }}>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>Roof Cleaning Calculator</div>
              <div style={{ color: "var(--wc-text-muted)", fontSize: 14.5 }}>
                Soft-wash roof pricing at $0.40–$0.60 per square foot.
              </div>
            </a>
            <a href="/calculators/deck" className="wc-card wc-card-pad" style={{ display: "block", color: "inherit" }}>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>Deck Cleaning Calculator</div>
              <div style={{ color: "var(--wc-text-muted)", fontSize: 14.5 }}>
                Wood and composite deck pricing at $0.30–$0.45 per square foot.
              </div>
            </a>
          </div>
          <p style={{ textAlign: "center", marginTop: 18, fontSize: 14.5, color: "var(--wc-text-muted)" }}>
            Pricing a mixed job? Use the <a href="/calculator">all-surface pressure washing calculator</a>.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="wc-section">
        <div className="wc-container">
          <h2 className="wc-section-title">Built for pressure washing operators</h2>
          <p className="wc-section-sub">Niche tools beat generic spreadsheets. Quote like a pro in seconds.</p>
          <div className="wc-grid-3">
            {BENEFITS.map((b) => (
              <div key={b.title} className="wc-card wc-card-pad">
                <div className="wc-benefit-icon" aria-hidden="true">{b.icon}</div>
                <h3 style={{ margin: "0 0 6px", fontSize: 17 }}>{b.title}</h3>
                <p style={{ margin: 0, color: "var(--wc-text-muted)", fontSize: 14.5 }}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator preview */}
      <section className="wc-section" style={{ background: "#fff", borderTop: "1px solid var(--wc-border)", borderBottom: "1px solid var(--wc-border)" }}>
        <div className="wc-container">
          <h2 className="wc-section-title">See your number before you send the quote</h2>
          <p className="wc-section-sub">Enter the surface, area and your costs. WashCalc shows recommended price, time, cost and gross profit instantly.</p>
          <div style={{ textAlign: "center" }}>
            <Link to="/calculator" className="wc-btn wc-btn-primary">Open the calculator</Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="wc-section">
        <div className="wc-container">
          <h2 className="wc-section-title">How pricing works</h2>
          <p className="wc-section-sub">A transparent, two-signal pricing model — clear enough to defend on a sales call.</p>
          <div className="wc-grid-3">
            <div className="wc-card wc-card-pad">
              <div className="wc-benefit-icon">1</div>
              <h3 style={{ marginTop: 0 }}>Surface base rate</h3>
              <p style={{ color: "var(--wc-text-muted)", fontSize: 14.5 }}>Each surface has a typical $/sq ft. Driveway ~$0.22, roof ~$0.50, deck ~$0.38.</p>
            </div>
            <div className="wc-card wc-card-pad">
              <div className="wc-benefit-icon">2</div>
              <h3 style={{ marginTop: 0 }}>Condition multiplier</h3>
              <p style={{ color: "var(--wc-text-muted)", fontSize: 14.5 }}>Light × 1.0, moderate × 1.2, heavy × 1.5 — affects price and labor time.</p>
            </div>
            <div className="wc-card wc-card-pad">
              <div className="wc-benefit-icon">3</div>
              <h3 style={{ marginTop: 0 }}>Margin protection</h3>
              <p style={{ color: "var(--wc-text-muted)", fontSize: 14.5 }}>We compare a cost-plus price to the rate price and pick the higher of the two.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="wc-section" style={{ background: "var(--wc-surface-alt)" }}>
        <div className="wc-container" style={{ maxWidth: 820 }}>
          <h2 className="wc-section-title">Frequently asked questions</h2>
          <p className="wc-section-sub">Pricing questions we hear from operators every week.</p>
          <FAQ items={FAQS} />
        </div>
      </section>

      {/* Related tools */}
      <section className="wc-section">
        <div className="wc-container">
          <h2 className="wc-section-title">Specialized calculators</h2>
          <p className="wc-section-sub">Pre-tuned defaults per surface type.</p>
          <RelatedTools />
        </div>
      </section>

      {/* CTA */}
      <section className="wc-section-tight">
        <div className="wc-container">
          <div className="wc-cta-banner">
            <h3>Save quotes & send PDFs — coming soon</h3>
            <p>WashCalc Pro will let you save quotes, export branded PDFs and capture leads from your site.</p>
            <Link to="/calculator" className="wc-btn wc-btn-ghost">Try the free calculator</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
