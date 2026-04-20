import SurfaceSelector from "./SurfaceSelector.jsx";
import { CONDITIONS } from "../PricingEngine.js";

export default function CalculatorForm({ values, onChange, lockSurface, surfaceOnly }) {
  const set = (k) => (e) => onChange({ ...values, [k]: e.target.value });
  const setVal = (k, v) => onChange({ ...values, [k]: v });

  return (
    <div className="wc-card wc-card-pad wc-card-lg">
      {!lockSurface && (
        <div className="wc-field">
          <label className="wc-label">Surface type</label>
          <SurfaceSelector
            value={values.surfaceId}
            onChange={(v) => setVal("surfaceId", v)}
            only={surfaceOnly}
          />
        </div>
      )}

      <div className="wc-form-row">
        <div className="wc-field">
          <label className="wc-label" htmlFor="area">Area (square feet)</label>
          <input
            id="area" className="wc-input" type="number" min="0" inputMode="decimal"
            value={values.area} onChange={set("area")} placeholder="e.g. 800"
          />
          <span className="wc-help">Total square footage to clean.</span>
        </div>

        <div className="wc-field">
          <label className="wc-label">Condition</label>
          <div className="wc-segment" role="radiogroup" aria-label="Condition">
            {CONDITIONS.map((c) => (
              <button
                key={c.id} type="button" role="radio"
                aria-checked={values.conditionId === c.id}
                className={values.conditionId === c.id ? "active" : ""}
                onClick={() => setVal("conditionId", c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
          <span className="wc-help">Heavier soil takes more time and chemical.</span>
        </div>
      </div>

      <div className="wc-form-row">
        <div className="wc-field">
          <label className="wc-label" htmlFor="laborRate">Labor rate / hour</label>
          <div className="wc-input-prefix">
            <span className="wc-prefix">$</span>
            <input id="laborRate" className="wc-input" type="number" min="0" value={values.laborRate} onChange={set("laborRate")} />
          </div>
        </div>
        <div className="wc-field">
          <label className="wc-label" htmlFor="chemicalCost">Chemical cost</label>
          <div className="wc-input-prefix">
            <span className="wc-prefix">$</span>
            <input id="chemicalCost" className="wc-input" type="number" min="0" value={values.chemicalCost} onChange={set("chemicalCost")} />
          </div>
        </div>
      </div>

      <div className="wc-form-row">
        <div className="wc-field">
          <label className="wc-label" htmlFor="travelCost">Travel cost</label>
          <div className="wc-input-prefix">
            <span className="wc-prefix">$</span>
            <input id="travelCost" className="wc-input" type="number" min="0" value={values.travelCost} onChange={set("travelCost")} />
          </div>
        </div>
        <div className="wc-field">
          <label className="wc-label" htmlFor="marginPct">Target margin (%)</label>
          <input id="marginPct" className="wc-input" type="number" min="0" max="95" value={values.marginPct} onChange={set("marginPct")} />
        </div>
      </div>

      <div className="wc-field">
        <label className="wc-label" htmlFor="minimumCharge">Minimum charge (optional)</label>
        <div className="wc-input-prefix">
          <span className="wc-prefix">$</span>
          <input id="minimumCharge" className="wc-input" type="number" min="0" value={values.minimumCharge} onChange={set("minimumCharge")} placeholder="e.g. 150" />
        </div>
        <span className="wc-help">Quote will never go below this amount.</span>
      </div>
    </div>
  );
}
