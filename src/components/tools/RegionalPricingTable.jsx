// Regional house-washing pricing table.
//
// TODO(operator): replace the stubbed rows below with VERIFIED figures and
// per-row sources, then update LAST_UPDATED. Values are intentionally null so
// the page never ships unverified numbers — nulls render as "—".
//
// Row shape: { metro, medianPerSqFt, oneStory, twoStory, source }
//   medianPerSqFt — median $/sq ft of siding
//   oneStory / twoStory — typical whole-job price
//   source — attribution string for the figure (required for E-E-A-T)

const LAST_UPDATED = "TODO — pending verified data";

const REGIONAL_PRICING = [
  { metro: "New York, NY",       medianPerSqFt: null, oneStory: null, twoStory: null, source: "TODO" },
  { metro: "Los Angeles, CA",    medianPerSqFt: null, oneStory: null, twoStory: null, source: "TODO" },
  { metro: "Chicago, IL",        medianPerSqFt: null, oneStory: null, twoStory: null, source: "TODO" },
  { metro: "Houston, TX",        medianPerSqFt: null, oneStory: null, twoStory: null, source: "TODO" },
  { metro: "Phoenix, AZ",        medianPerSqFt: null, oneStory: null, twoStory: null, source: "TODO" },
  { metro: "Philadelphia, PA",   medianPerSqFt: null, oneStory: null, twoStory: null, source: "TODO" },
  { metro: "San Antonio, TX",    medianPerSqFt: null, oneStory: null, twoStory: null, source: "TODO" },
  { metro: "San Diego, CA",      medianPerSqFt: null, oneStory: null, twoStory: null, source: "TODO" },
  { metro: "Dallas, TX",         medianPerSqFt: null, oneStory: null, twoStory: null, source: "TODO" },
  { metro: "Austin, TX",         medianPerSqFt: null, oneStory: null, twoStory: null, source: "TODO" },
  { metro: "Jacksonville, FL",   medianPerSqFt: null, oneStory: null, twoStory: null, source: "TODO" },
  { metro: "Charlotte, NC",      medianPerSqFt: null, oneStory: null, twoStory: null, source: "TODO" },
  { metro: "Columbus, OH",       medianPerSqFt: null, oneStory: null, twoStory: null, source: "TODO" },
  { metro: "Atlanta, GA",        medianPerSqFt: null, oneStory: null, twoStory: null, source: "TODO" },
  { metro: "Denver, CO",         medianPerSqFt: null, oneStory: null, twoStory: null, source: "TODO" },
  { metro: "Nashville, TN",      medianPerSqFt: null, oneStory: null, twoStory: null, source: "TODO" },
  { metro: "Tampa, FL",          medianPerSqFt: null, oneStory: null, twoStory: null, source: "TODO" },
  { metro: "Seattle, WA",        medianPerSqFt: null, oneStory: null, twoStory: null, source: "TODO" },
];

const cell = (v, prefix = "") => (v == null ? "—" : `${prefix}${v}`);

export default function RegionalPricingTable() {
  const stubbed = REGIONAL_PRICING.every((r) => r.medianPerSqFt == null);

  return (
    <div className="wc-tool" id="regional-pricing">
      <div className="wc-tool-head">
        <h3 className="wc-tool-title">House washing prices by US metro</h3>
        <p className="wc-tool-sub">
          Median $/sq ft of siding and typical whole-job prices for one- and two-story homes.
        </p>
      </div>

      {stubbed && (
        <p className="wc-copy-todo">
          [PLACEHOLDER DATA] These rows are stubbed — figures are withheld until verified
          numbers and sources are supplied. Do not deploy with placeholder values.
        </p>
      )}

      <div className="wc-table-scroll">
        <table className="wc-qt-table wc-regional-table">
          <thead>
            <tr>
              <th>Metro area</th>
              <th>Median $/sq ft</th>
              <th>Typical 1-story</th>
              <th>Typical 2-story</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {REGIONAL_PRICING.map((r) => (
              <tr key={r.metro}>
                <td>{r.metro}</td>
                <td className="wc-qt-rate">{cell(r.medianPerSqFt, "$")}</td>
                <td className="wc-qt-rate">{cell(r.oneStory, "$")}</td>
                <td className="wc-qt-rate">{cell(r.twoStory, "$")}</td>
                <td className="wc-regional-src">{r.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="wc-tool-note">
        Last updated: <strong>{LAST_UPDATED}</strong>. Regional figures are benchmarks, not
        quotes — always price from your own cost and the specific job's condition and access.
      </p>
    </div>
  );
}
