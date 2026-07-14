import Layout from "../components/Layout.jsx";
import useSEO from "../useSEO.js";

export default function About() {
  useSEO({
    title: "About WashCalc — Who Built It & How Pricing Works",
    description:
      "Who built WashCalc and why: the pricing pain pressure washing contractors face, the two-signal methodology behind every quote, and how to reach us.",
    canonical: "https://washcalc.app/about",
    breadcrumbs: [
      { name: "Home", url: "https://washcalc.app/" },
      { name: "About", url: "https://washcalc.app/about" },
    ],
  });

  return (
    <Layout>
      <article className="wc-section">
        <div className="wc-container" style={{ maxWidth: 820 }}>
          <nav className="wc-breadcrumbs" aria-label="Breadcrumb" style={{ marginBottom: 16 }}>
            <a href="/">Home</a><span>/</span>
            <span style={{ color: "var(--wc-text)" }}>About</span>
          </nav>

          <h1 style={{ fontSize: "clamp(30px,3.6vw,42px)", margin: "0 0 12px", letterSpacing: "-0.01em" }}>
            About WashCalc
          </h1>
          <p style={{ color: "var(--wc-text-muted)", fontSize: 17, margin: "0 0 32px" }}>
            WashCalc is a free pricing tool for pressure washing contractors — built to turn a
            surface, an area, and your real costs into a defensible quote in under a minute.
          </p>

          <h2 style={{ fontSize: 26, marginTop: 8 }}>Why we built it</h2>
          <p>
            Most pressure washing operators price jobs by memory and gut feel. That works until a
            competitor underbids you, a heavy-soil job runs three hours long, or a quote that felt
            fine on paper leaves nothing behind once chemical, fuel, and labor are paid. The pain
            isn’t a lack of effort — it’s the absence of a repeatable system. WashCalc exists to
            replace “what did I charge last time?” with a number you can defend on the sales call and
            still profit from after the truck is packed up.
          </p>

          <h2 style={{ fontSize: 26, marginTop: 32 }}>How the pricing methodology works</h2>
          <p>
            Every WashCalc quote reconciles two independent signals and takes the higher of the two —
            never below your minimum charge. This is the same logic used across every calculator on
            the site.
          </p>
          <ul style={{ paddingLeft: 22, lineHeight: 1.75 }}>
            <li>
              <strong>Rate-based price</strong> — area × a per-surface base rate × a condition
              multiplier (light × 1.0, moderate × 1.2, heavy × 1.5). This is the market-friendly
              anchor a homeowner recognizes: driveways ~$0.22/sq ft, house siding ~$0.30, roofs
              ~$0.50, decks ~$0.38.
            </li>
            <li>
              <strong>Cost-plus price</strong> — (labor + chemical + travel) ÷ (1 − your target
              margin). Labor is derived from a per-surface production rate (sq ft per hour) scaled by
              the same condition factor, so a heavily-soiled surface is estimated to take longer. This
              floor guarantees the job clears your margin no matter what the market rate says.
            </li>
            <li>
              <strong>The recommended price</strong> — the higher of the two signals, then clamped up
              to your minimum charge. That’s the number you send.
            </li>
          </ul>
          <p>
            The model is deliberately transparent — no black box, no “premium” upsell in the math.
            You can read the exact defaults in the{" "}
            <a href="/pressure-washing-pricing-guide">2026 pressure washing pricing guide</a> and put
            them to work in the{" "}
            <a href="/calculator">all-surface calculator</a>.
          </p>

          <h2 style={{ fontSize: 26, marginTop: 32 }}>Who’s behind it</h2>
          <p>
            WashCalc is built and maintained by{" "}
            <a href="https://lamill.io" rel="publisher">Lamill</a> — a studio that builds
            focused, honest tools for small service businesses. The tool grew out of real quoting
            frustration and is kept intentionally small: a fast pricing calculator rather than
            another CRM.
          </p>
          <p>
            Questions, corrections, or a pricing edge case we’re missing? Reach us at{" "}
            <a href="https://lamill.io" rel="publisher">lamill.io</a> — feedback from working
            contractors is what sharpens the defaults.
          </p>

          <div className="wc-cta-banner" style={{ marginTop: 40 }}>
            <h3>Price your next job with confidence</h3>
            <p>Open the WashCalc calculator and get a defensible quote in under a minute.</p>
            <a href="/calculator" className="wc-btn wc-btn-primary">Open the calculator</a>
          </div>
        </div>
      </article>
    </Layout>
  );
}
