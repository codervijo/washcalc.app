import { useMemo, useState } from "react";

// Roof pitch → true roof area. Sits under the main calculator on
// /calculators/roof (CalculatorPage heroExtra slot) and pushes the result into
// the calculator's area field on request.
//
// Everything here is geometry or a published definition — no pricing
// assumptions:
//  • Pitch factor = √(rise² + 12²) / 12 — the slope length per foot of run.
//  • Roofing square = 100 sq ft of roof surface (trade standard unit).
//  • Low-slope ≤ 4 in 12, steep > 4 in 12 — OSHA 29 CFR 1926.500(b).

function n(v, d = 0) {
  const x = Number(v);
  return Number.isFinite(x) && x >= 0 ? x : d;
}

export const PITCHES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12];

export function pitchFactor(rise) {
  return Math.sqrt(rise * rise + 144) / 12;
}

export default function RoofPitchTool({ values, setValues }) {
  const [footprint, setFootprint] = useState(1300);
  const [rise, setRise] = useState(6);

  const r = useMemo(() => {
    const fp = n(footprint);
    const factor = pitchFactor(rise);
    const area = Math.round(fp * factor);
    const degrees = (Math.atan(rise / 12) * 180) / Math.PI;
    return { factor, area, squares: area / 100, degrees, steep: rise > 4 };
  }, [footprint, rise]);

  return (
    <div className="wc-tool wc-tool-inhero" id="roof-pitch">
      <div className="wc-tool-head">
        <h3 className="wc-tool-title">Roof area from pitch</h3>
        <p className="wc-tool-sub">
          Measure the footprint from the ground, pick the pitch, and get the true surface area
          to price — a sloped roof is always larger than the ground it covers.
        </p>
      </div>

      <div className="wc-form-row">
        <div className="wc-field">
          <label className="wc-label" htmlFor="roof-footprint">Footprint incl. overhangs (sq ft)</label>
          <input id="roof-footprint" className="wc-input" type="number" min="0" step="50"
            value={footprint} onChange={(e) => setFootprint(e.target.value)} />
          <span className="wc-help">Length × width of the roof outline seen from above, eaves included.</span>
        </div>
        <div className="wc-field">
          <label className="wc-label" htmlFor="roof-pitch-sel">Pitch (rise in 12)</label>
          <select id="roof-pitch-sel" className="wc-input" value={rise}
            onChange={(e) => setRise(Number(e.target.value))}>
            {PITCHES.map((p) => <option key={p} value={p}>{p}/12</option>)}
          </select>
          <span className="wc-help">Inches of rise per 12 inches of horizontal run.</span>
        </div>
      </div>

      <div className="wc-material-specs">
        <div className="wc-out"><span className="wc-out-lbl">Pitch factor</span><span className="wc-out-val">×{r.factor.toFixed(3)}</span></div>
        <div className="wc-out"><span className="wc-out-lbl">Roof surface area</span><span className="wc-out-val">{r.area.toLocaleString("en-US")} sq ft</span></div>
        <div className="wc-out"><span className="wc-out-lbl">Roofing squares</span><span className="wc-out-val">{r.squares.toFixed(1)}</span></div>
      </div>

      <p className="wc-tool-note">
        {rise}/12 is about {r.degrees.toFixed(1)}° and counts as a{" "}
        <strong>{r.steep ? "steep roof" : "low-slope roof"}</strong> under OSHA 29 CFR 1926.500(b)
        (low-slope is 4 in 12 or less).{" "}
        {r.steep
          ? "Plan and price for the fall protection steep-roof work requires."
          : "Low-slope still has fall-protection requirements at the edges — check what applies to your crew."}
      </p>

      <button type="button" className="wc-btn wc-btn-primary" style={{ marginTop: 12 }}
        onClick={() => setValues({ ...values, area: r.area })}>
        Use {r.area.toLocaleString("en-US")} sq ft in the calculator
      </button>
    </div>
  );
}
