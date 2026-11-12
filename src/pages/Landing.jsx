import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Hero from "../components/Hero.jsx";
import FAQ from "../components/FAQ.jsx";
import RelatedTools from "../components/RelatedTools.jsx";
import useSEO from "../useSEO.js";
import { LANDING_FAQS as FAQS } from "./faqs.js";
import { band, base } from "../rates.js";

const BENEFITS = [
  { icon: "⚡", title: "Quote faster", body: "Build a defensible price in under a minute — even on your phone in the truck." },
  { icon: "💰", title: "Protect profit", body: "Cost-plus margin logic guarantees every quote covers labor, chemical and travel." },
  { icon: "⏱️", title: "Estimate labor", body: "Hours are estimated from area and condition — no more eyeballing job time." },
  { icon: "🧴", title: "Account for chemical", body: "Soft-wash mix, surfactants, degreasers — log them so they don't eat your margin." },
  { icon: "🚚", title: "Include travel", body: "Don't forget the drive. Add travel cost so distant jobs still pencil out." },
  { icon: "🪪", title: "Look professional", body: "Send clean, consistent numbers customers trust on the first call." },
];


export default function Landing() {
  useSEO({
    title: "Pressure Washing Calculator App: Free Estimate & Quote Tool",
    description: "Free pressure washing cost calculator for contractors. Estimate job price, labor and chemical cost, and send a quote that protects your profit.",
    canonical: "https://washcalc.app/",
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
                Concrete or asphalt driveway pricing at {band("driveway")} per square foot.
              </div>
            </a>
            <a href="/calculators/house-washing" className="wc-card wc-card-pad" style={{ display: "block", color: "inherit" }}>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>House Washing Calculator</div>
              <div style={{ color: "var(--wc-text-muted)", fontSize: 14.5 }}>
                Vinyl, brick or stucco siding pricing at {band("siding")} per square foot of siding.
              </div>
            </a>
            <a href="/calculators/roof" className="wc-card wc-card-pad" style={{ display: "block", color: "inherit" }}>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>Roof Cleaning Calculator</div>
              <div style={{ color: "var(--wc-text-muted)", fontSize: 14.5 }}>
                Soft-wash roof pricing at {band("roof")} per square foot.
              </div>
            </a>
            <a href="/calculators/deck" className="wc-card wc-card-pad" style={{ display: "block", color: "inherit" }}>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>Deck Cleaning Calculator</div>
              <div style={{ color: "var(--wc-text-muted)", fontSize: 14.5 }}>
                Wood and composite deck pricing at {band("deck")} per square foot.
              </div>
            </a>
          </div>
          <p style={{ textAlign: "center", marginTop: 18, fontSize: 14.5, color: "var(--wc-text-muted)" }}>
            Pricing a mixed job? Use the <a href="/calculator">pressure washing price calculator</a>.
            {" "}Building a full estimate? See the <a href="/quote-tool">power washing quote tool</a>.
            {" "}Rates shown are WashCalc's rate card; published national ranges are in
            the <a href="/pressure-washing-pricing-guide">pricing guide</a>.
          </p>
        </div>
      </section>

      {/* Pricing guides — contextual links into the cost guides and templates */}
      <section className="wc-section-tight">
        <div className="wc-container">
          <h2 className="wc-section-title">Pricing guides for contractors</h2>
          <p className="wc-section-sub">What to charge, surface by surface — with sourced ranges and worked examples.</p>
          <ul className="wc-pillar-links" style={{ maxWidth: 860, margin: "0 auto" }}>
            <li><a href="/pressure-washing-pricing-guide">How much to charge for pressure washing</a> — the cost floor, rates, minimums and hourly pricing in one method.</li>
            <li><a href="/pressure-washing-price-per-square-foot">Pressure washing price per square foot</a> — published rates by surface, and why small jobs cost more per foot.</li>
            <li><a href="/commercial-pressure-washing-pricing">Commercial pressure washing pricing</a> — parking lots per space, dumpster pads, building exteriors and monthly contracts.</li>
            <li><a href="/driveway-pressure-washing-cost">Driveway pressure washing cost</a>, <a href="/house-washing-cost">house washing cost</a>, <a href="/roof-cleaning-cost">soft wash roof cleaning cost</a> and <a href="/deck-pressure-washing-cost">deck pressure washing cost</a> — one guide per surface.</li>
            <li><a href="/pressure-washing-estimate-calculator">Multi-surface estimate calculator</a> — total a whole visit, with a bundle discount and your minimum.</li>
            <li><a href="/pressure-washing-quote-template">Pressure washing quote template</a> and <a href="/pressure-washing-estimate-template">estimate template</a> — copy, fill in and send.</li>
          </ul>
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
              <p style={{ color: "var(--wc-text-muted)", fontSize: 14.5 }}>Each surface has a typical $/sq ft. Driveway ~{base("driveway")}, roof ~{base("roof")}, deck ~{base("deck")}.</p>
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
