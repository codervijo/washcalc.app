// Regional house-washing pricing benchmarks.
//
// NOTE ON DATA: verified per-metro median $/sq ft figures for individual cities
// are NOT published anywhere as comparable data (aggregators report $/linear ft,
// $/sq ft, and flat ranges via different methods). So this is a CITED national
// baseline plus documented regional ADJUSTMENT tiers — not invented per-city
// medians. The $/sq ft tier column is derived (national range × the cited
// adjustment) and marked with * as illustrative, not a survey figure.
//
// Sources (2026):
//   • National ranges + avg job — HomeGuide, Angi
//   • Regional +20–50% urban / −10–20% Southeast-rural — Angi, Cajun Soft Wash
//   • Pacific NW ~+40% (labor + heavy algae) — NJM Roof Cleaners

const LAST_UPDATED = "2026-07-17";

const NATIONAL = [
  { metric: "Soft wash (siding)", range: "$0.25–$0.75 / sq ft", source: "HomeGuide / Angi" },
  { metric: "Pressure wash", range: "$0.15–$0.50 / sq ft", source: "HomeGuide / Angi" },
  { metric: "Typical whole-house job", range: "$100–$711 (avg ≈ $311)", source: "Angi" },
];

const TIERS = [
  { tier: "High-cost urban", metros: "New York, San Francisco, Boston", adj: "+20% to +50%", perSqFt: "≈ $0.30–$1.10", source: "Angi" },
  { tier: "Pacific NW", metros: "Portland, Seattle (labor + heavy algae)", adj: "≈ +40%", perSqFt: "≈ $0.35–$1.05", source: "NJM Roof Cleaners" },
  { tier: "Mid-market metros", metros: "Most US metros", adj: "≈ national", perSqFt: "$0.25–$0.75", source: "HomeGuide" },
  { tier: "Southeast & rural", metros: "Southeast US, rural areas", adj: "−10% to −20%", perSqFt: "≈ $0.20–$0.70", source: "Cajun Soft Wash" },
];

export default function RegionalPricingTable() {
  return (
    <div className="wc-tool" id="regional-pricing">
      <div className="wc-tool-head">
        <h3 className="wc-tool-title">Regional house washing price benchmarks</h3>
        <p className="wc-tool-sub">
          Published per-city medians don't exist as comparable data. This is a national baseline
          plus documented regional adjustments — a sanity check, never your quote.
        </p>
      </div>

      <div className="wc-table-scroll">
        <table className="wc-qt-table wc-regional-table">
          <caption className="wc-regional-cap">National baseline (2026)</caption>
          <thead>
            <tr><th>Service</th><th>Typical rate</th><th>Source</th></tr>
          </thead>
          <tbody>
            {NATIONAL.map((r) => (
              <tr key={r.metric}>
                <td>{r.metric}</td>
                <td className="wc-qt-rate">{r.range}</td>
                <td className="wc-regional-src">{r.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="wc-table-scroll" style={{ marginTop: 16 }}>
        <table className="wc-qt-table wc-regional-table">
          <caption className="wc-regional-cap">Regional adjustment vs national</caption>
          <thead>
            <tr>
              <th>Market tier</th>
              <th>Example markets</th>
              <th>Adjustment</th>
              <th>Soft-wash $/sq ft*</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {TIERS.map((r) => (
              <tr key={r.tier}>
                <td>{r.tier}</td>
                <td>{r.metros}</td>
                <td className="wc-qt-rate">{r.adj}</td>
                <td className="wc-qt-rate">{r.perSqFt}</td>
                <td className="wc-regional-src">{r.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="wc-tool-note">
        *Derived from the national range × the cited regional adjustment — illustrative, not a
        per-city survey. Last updated: <strong>{LAST_UPDATED}</strong>. Regional figures are
        benchmarks; always price from your own cost and the specific job's condition and access.
      </p>
    </div>
  );
}
