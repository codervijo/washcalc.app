import { useMemo, useState } from "react";

// Driveway area from measurements. Sits under the main calculator on
// /calculators/driveway (CalculatorPage heroExtra slot) and pushes the total
// into the calculator's area field on request.
//
// Geometry only — no pricing assumptions:
//  • Slab, pad and walkway are rectangles: length × width.
//  • A street flare widens the slab symmetrically, so it is two right
//    triangles: (street width − slab width) × flare depth ÷ 2.

function n(v, d = 0) {
  const x = Number(v);
  return Number.isFinite(x) && x >= 0 ? x : d;
}

export function flareArea(slabWidth, streetWidth, depth) {
  return Math.max(0, n(streetWidth) - n(slabWidth)) * n(depth) / 2;
}

export default function DrivewayAreaTool({ values, setValues }) {
  const [m, setM] = useState({
    slabLen: 45, slabWid: 20,
    streetWid: 30, flareDepth: 6,
    padLen: 0, padWid: 0,
    walkLen: 30, walkWid: 4,
  });
  const set = (k) => (e) => setM({ ...m, [k]: e.target.value });

  const r = useMemo(() => {
    const slab = n(m.slabLen) * n(m.slabWid);
    const flare = flareArea(m.slabWid, m.streetWid, m.flareDepth);
    const pad = n(m.padLen) * n(m.padWid);
    const walk = n(m.walkLen) * n(m.walkWid);
    const total = Math.round(slab + flare + pad + walk);
    return { slab, flare, pad, walk, total, missed: total - Math.round(slab) };
  }, [m]);

  const field = (id, label, key, help) => (
    <div className="wc-field">
      <label className="wc-label" htmlFor={id}>{label}</label>
      <input id={id} className="wc-input" type="number" min="0" step="1"
        value={m[key]} onChange={set(key)} />
      {help && <span className="wc-help">{help}</span>}
    </div>
  );

  return (
    <div className="wc-tool wc-tool-inhero" id="driveway-area">
      <div className="wc-tool-head">
        <h3 className="wc-tool-title">Driveway area from measurements</h3>
        <p className="wc-tool-sub">
          Measure the driveway in pieces — slab, street flare, parking pad, walkway — and get the
          square footage you will actually clean. Set any piece to 0 to leave it out.
        </p>
      </div>

      <div className="wc-form-row">
        {field("dw-slab-len", "Slab length (ft)", "slabLen", "Garage door or house edge to where the flare starts.")}
        {field("dw-slab-wid", "Slab width (ft)", "slabWid")}
      </div>
      <div className="wc-form-row">
        {field("dw-street-wid", "Width at the street (ft)", "streetWid", "Same as slab width if there is no flare.")}
        {field("dw-flare-depth", "Flare depth (ft)", "flareDepth", "How far back from the curb the widening runs.")}
      </div>
      <div className="wc-form-row">
        {field("dw-pad-len", "Parking pad / turnaround length (ft)", "padLen")}
        {field("dw-pad-wid", "Parking pad / turnaround width (ft)", "padWid")}
      </div>
      <div className="wc-form-row">
        {field("dw-walk-len", "Walkway length (ft)", "walkLen")}
        {field("dw-walk-wid", "Walkway width (ft)", "walkWid")}
      </div>

      <div className="wc-material-specs">
        <div className="wc-out"><span className="wc-out-lbl">Slab</span><span className="wc-out-val">{Math.round(r.slab).toLocaleString("en-US")} sq ft</span></div>
        <div className="wc-out"><span className="wc-out-lbl">Flare + pad + walkway</span><span className="wc-out-val">{Math.round(r.flare + r.pad + r.walk).toLocaleString("en-US")} sq ft</span></div>
        <div className="wc-out"><span className="wc-out-lbl">Total to price</span><span className="wc-out-val">{r.total.toLocaleString("en-US")} sq ft</span></div>
      </div>

      {r.missed > 0 && (
        <p className="wc-tool-note">
          A slab-only measurement would miss {r.missed.toLocaleString("en-US")} sq ft
          ({Math.round((r.missed / Math.max(1, r.total)) * 100)}% of the job) — area you will
          clean either way.
        </p>
      )}

      <button type="button" className="wc-btn wc-btn-primary" style={{ marginTop: 12 }}
        onClick={() => setValues({ ...values, area: r.total })}>
        Use {r.total.toLocaleString("en-US")} sq ft in the calculator
      </button>
    </div>
  );
}
