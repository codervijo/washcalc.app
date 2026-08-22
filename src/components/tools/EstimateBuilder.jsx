import { useMemo, useState } from "react";
import {
  SURFACES,
  CONDITIONS,
  calculateQuote,
  formatMoney,
  formatMoney2,
  formatHours,
} from "../../PricingEngine.js";

/**
 * Whole-job estimate builder.
 *
 * This is what separates /pressure-washing-estimate-calculator from the
 * single-surface /calculator: you add one line per surface and the tool
 * totals the visit — hours, cost, bundle discount, job minimum and margin
 * are all reconciled once at the job level rather than per line.
 *
 * The per-line maths is NOT reimplemented here. Each line is priced by
 * calculateQuote() with the cost inputs zeroed, which returns exactly the
 * engine's rate-based price and labor hours for that surface. Costs and the
 * margin floor are then applied once across the whole job, mirroring the
 * engine's two-signal model at job scale.
 */

function n(v, d = 0) {
  const x = Number(v);
  return Number.isFinite(x) && x >= 0 ? x : d;
}

const START_LINES = [
  { id: 1, surfaceId: "driveway", conditionId: "moderate", area: 800 },
  { id: 2, surfaceId: "siding", conditionId: "moderate", area: 1800 },
];

export default function EstimateBuilder() {
  const [lines, setLines] = useState(START_LINES);
  const [nextId, setNextId] = useState(3);

  const [laborRate, setLaborRate] = useState(35);
  const [chemicalCost, setChemicalCost] = useState(45);
  const [travelCost, setTravelCost] = useState(25);
  const [marginPct, setMarginPct] = useState(50);
  const [minimumCharge, setMinimumCharge] = useState(150);
  const [bundlePct, setBundlePct] = useState(10);

  function updateLine(id, patch) {
    setLines((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  }
  function addLine() {
    setLines((ls) => [...ls, { id: nextId, surfaceId: "deck", conditionId: "moderate", area: 300 }]);
    setNextId((i) => i + 1);
  }
  function removeLine(id) {
    setLines((ls) => (ls.length > 1 ? ls.filter((l) => l.id !== id) : ls));
  }

  const r = useMemo(() => {
    // Per-line: reuse the engine with costs zeroed so we get its rate-based
    // price and hours, never a second copy of the formula.
    const priced = lines.map((l) => {
      const q = calculateQuote({
        surfaceId: l.surfaceId,
        conditionId: l.conditionId,
        area: n(l.area),
        laborRate: 0, chemicalCost: 0, travelCost: 0,
        marginPct: 0, minimumCharge: 0,
      });
      return {
        ...l,
        label: q.surface.label,
        conditionLabel: q.condition.label,
        hours: q.hours,
        price: q.recommendedPrice,
        perSqFt: q.pricePerSqFt,
      };
    });

    const lineSubtotal = priced.reduce((s, l) => s + l.price, 0);
    const totalHours = priced.reduce((s, l) => s + l.hours, 0);
    const totalArea = priced.reduce((s, l) => s + n(l.area), 0);

    const discountPct = Math.min(50, n(bundlePct));
    const discount = priced.length > 1 ? lineSubtotal * (discountPct / 100) : 0;
    const afterDiscount = lineSubtotal - discount;

    const laborCost = totalHours * n(laborRate);
    const totalCost = laborCost + n(chemicalCost) + n(travelCost);
    const denom = Math.max(0.05, 1 - Math.min(95, n(marginPct, 40)) / 100);
    const costPlusPrice = totalCost / denom;
    const minCharge = n(minimumCharge);

    const recommended = Math.max(afterDiscount, costPlusPrice, minCharge);
    const grossProfit = recommended - totalCost;
    const effectiveMargin = recommended > 0 ? (grossProfit / recommended) * 100 : 0;
    const perSqFt = totalArea > 0 ? recommended / totalArea : 0;
    const perHour = totalHours > 0 ? recommended / totalHours : 0;

    // Which signal set the price? Surfaced so the number is explainable.
    let driver = "Bundled surface rates";
    if (recommended === minCharge && minCharge > afterDiscount && minCharge > costPlusPrice) driver = "Your job minimum";
    else if (costPlusPrice > afterDiscount) driver = "Your margin floor";

    return {
      priced, lineSubtotal, discount, discountPct, afterDiscount, totalHours, totalArea,
      laborCost, totalCost, costPlusPrice, recommended, grossProfit, effectiveMargin,
      perSqFt, perHour, driver,
    };
  }, [lines, laborRate, chemicalCost, travelCost, marginPct, minimumCharge, bundlePct]);

  return (
    <div className="wc-tool wc-tool-inhero" id="estimate-builder">
      <div className="wc-tool-head">
        <h2 className="wc-tool-title">Build a multi-surface estimate</h2>
        <p className="wc-tool-sub">
          Add a line for every surface on the visit. Costs, the bundle discount and your
          minimum are applied once across the whole job.
        </p>
      </div>

      {/* ── Surface lines ────────────────────────────────────────────── */}
      <div className="wc-eb-lines">
        <div className="wc-eb-head" aria-hidden="true">
          <span>Surface</span><span>Area (sq ft)</span><span>Condition</span><span>Line price</span><span />
        </div>

        {r.priced.map((l) => (
          <div className="wc-eb-line" key={l.id}>
            <div className="wc-field">
              <label className="wc-label wc-eb-mlabel" htmlFor={`eb-s-${l.id}`}>Surface</label>
              <select
                id={`eb-s-${l.id}`}
                className="wc-input"
                value={l.surfaceId}
                onChange={(e) => updateLine(l.id, { surfaceId: e.target.value })}
              >
                {SURFACES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>

            <div className="wc-field">
              <label className="wc-label wc-eb-mlabel" htmlFor={`eb-a-${l.id}`}>Area (sq ft)</label>
              <input
                id={`eb-a-${l.id}`}
                className="wc-input"
                type="number" min="0" step="10"
                value={l.area}
                onChange={(e) => updateLine(l.id, { area: e.target.value })}
              />
            </div>

            <div className="wc-field">
              <label className="wc-label wc-eb-mlabel" htmlFor={`eb-c-${l.id}`}>Condition</label>
              <select
                id={`eb-c-${l.id}`}
                className="wc-input"
                value={l.conditionId}
                onChange={(e) => updateLine(l.id, { conditionId: e.target.value })}
              >
                {CONDITIONS.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>

            <div className="wc-eb-price">
              <span className="wc-eb-amt">{formatMoney(l.price)}</span>
              <small>{formatHours(l.hours)} · ${l.perSqFt.toFixed(2)}/sq ft</small>
            </div>

            <button
              type="button"
              className="wc-eb-remove"
              onClick={() => removeLine(l.id)}
              disabled={r.priced.length < 2}
              aria-label={`Remove ${l.label} line`}
              title={r.priced.length < 2 ? "An estimate needs at least one line" : "Remove this line"}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <button type="button" className="wc-btn wc-btn-ghost wc-eb-add" onClick={addLine}>
        + Add another surface
      </button>

      {/* ── Job-level inputs ─────────────────────────────────────────── */}
      <h3 className="wc-eb-subhead">Job-level inputs</h3>
      <p className="wc-eb-subnote">
        These are paid once per visit, not once per surface — which is exactly why a
        multi-surface job earns more per hour than three separate call-outs.
      </p>

      <div className="wc-form-row">
        <div className="wc-field">
          <label className="wc-label" htmlFor="eb-labor">Your labor cost / crew-hour</label>
          <div className="wc-input-prefix">
            <span className="wc-prefix">$</span>
            <input id="eb-labor" className="wc-input" type="number" min="0" value={laborRate}
              onChange={(e) => setLaborRate(e.target.value)} />
          </div>
          <p className="wc-help">
            What an hour <em>costs</em> you — wage plus burden — not what you bill. Enter a
            billing rate here and the margin floor will drive every estimate.
          </p>
        </div>
        <div className="wc-field">
          <label className="wc-label" htmlFor="eb-chem">Chemical cost (whole job)</label>
          <div className="wc-input-prefix">
            <span className="wc-prefix">$</span>
            <input id="eb-chem" className="wc-input" type="number" min="0" value={chemicalCost}
              onChange={(e) => setChemicalCost(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="wc-form-row">
        <div className="wc-field">
          <label className="wc-label" htmlFor="eb-travel">Travel &amp; fuel cost</label>
          <div className="wc-input-prefix">
            <span className="wc-prefix">$</span>
            <input id="eb-travel" className="wc-input" type="number" min="0" value={travelCost}
              onChange={(e) => setTravelCost(e.target.value)} />
          </div>
        </div>
        <div className="wc-field">
          <label className="wc-label" htmlFor="eb-min">Job minimum charge</label>
          <div className="wc-input-prefix">
            <span className="wc-prefix">$</span>
            <input id="eb-min" className="wc-input" type="number" min="0" value={minimumCharge}
              onChange={(e) => setMinimumCharge(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="wc-form-row">
        <div className="wc-field">
          <label className="wc-label" htmlFor="eb-margin">Target gross margin ({marginPct}%)</label>
          <input id="eb-margin" className="wc-input" type="range" min="0" max="80" step="5"
            value={marginPct} onChange={(e) => setMarginPct(e.target.value)} />
          <p className="wc-help">The floor your estimate may never fall below.</p>
        </div>
        <div className="wc-field">
          <label className="wc-label" htmlFor="eb-bundle">Bundle discount ({bundlePct}%)</label>
          <input id="eb-bundle" className="wc-input" type="range" min="0" max="30" step="1"
            value={bundlePct} onChange={(e) => setBundlePct(e.target.value)} />
          <p className="wc-help">
            {r.priced.length > 1
              ? "Applied to the surface lines before costs and the minimum."
              : "Add a second surface for the bundle discount to apply."}
          </p>
        </div>
      </div>

      {/* ── Estimate summary ─────────────────────────────────────────── */}
      <div className="wc-eb-summary" aria-live="polite">
        <div className="wc-eb-sumrow">
          <span>Surface lines subtotal</span><span>{formatMoney(r.lineSubtotal)}</span>
        </div>
        {r.discount > 0 && (
          <div className="wc-eb-sumrow wc-eb-discount">
            <span>Bundle discount ({r.discountPct}%)</span><span>−{formatMoney(r.discount)}</span>
          </div>
        )}
        <div className="wc-eb-sumrow">
          <span>Cost-plus floor at {marginPct}% margin</span><span>{formatMoney(r.costPlusPrice)}</span>
        </div>
        <div className="wc-eb-sumrow wc-eb-total">
          <span>Recommended estimate</span><span>{formatMoney(r.recommended)}</span>
        </div>
        <p className="wc-eb-driver">
          Set by: <strong>{r.driver}</strong>
        </p>
      </div>

      <div className="wc-tool-out">
        <div className="wc-out"><span className="wc-out-lbl">On-site hours</span><span className="wc-out-val">{formatHours(r.totalHours)}</span></div>
        <div className="wc-out"><span className="wc-out-lbl">Total job cost</span><span className="wc-out-val">{formatMoney(r.totalCost)}</span></div>
        <div className="wc-out"><span className="wc-out-lbl">Gross profit</span><span className="wc-out-val">{formatMoney(r.grossProfit)}</span></div>
        <div className="wc-out"><span className="wc-out-lbl">Effective margin</span><span className="wc-out-val">{r.effectiveMargin.toFixed(0)}%</span></div>
        <div className="wc-out"><span className="wc-out-lbl">Revenue per on-site hour</span><span className="wc-out-val">{formatMoney(r.perHour)}</span></div>
        <div className="wc-out"><span className="wc-out-lbl">Blended $/sq ft</span><span className="wc-out-val">{formatMoney2(r.perSqFt)}</span></div>
      </div>

      <p className="wc-tool-note">
        Labor cost is {formatMoney2(laborRate)}/hr × {formatHours(r.totalHours)} = {formatMoney(r.laborCost)},
        plus {formatMoney(n(chemicalCost))} chemical and {formatMoney(n(travelCost))} travel.
        Surface rates and production rates are the WashCalc default model — a starting point to
        tune against your own rate card, not a market survey.
      </p>
    </div>
  );
}
