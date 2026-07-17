import { useEffect, useMemo, useState } from "react";
import { formatMoney2 } from "../../PricingEngine.js";

// Sodium hypochlorite (SH) dilution calculator for soft washing.
// Two modes:
//  • Batch  — mix a fixed tank to a target surface %.
//  • Downstream — a downstream injector draws stock at a fixed ratio; solve
//    for the effective % that actually lands on the siding.
//
// `onChemCost(cost)` (optional) reports the batch chemical cost up so the job
// profitability calculator can auto-pull it.

function n(v, d = 0) {
  const x = Number(v);
  return Number.isFinite(x) && x >= 0 ? x : d;
}

const STOCKS = [
  { id: "10", label: "10% (pool)", pct: 10 },
  { id: "12.5", label: "12.5% (pro)", pct: 12.5 },
];

export default function SHDilutionCalculator({ onChemCost }) {
  const [mode, setMode] = useState("batch");
  const [targetPct, setTargetPct] = useState(2);
  const [stockPct, setStockPct] = useState(12.5);
  const [tankGal, setTankGal] = useState(50);
  const [surfOzPerGal, setSurfOzPerGal] = useState(2);
  const [ratio, setRatio] = useState(10); // downstream draw ratio X:1
  const [shPricePerGal, setShPricePerGal] = useState(3.5);
  const [surfPricePerOz, setSurfPricePerOz] = useState(0.35);

  const batch = useMemo(() => {
    const t = n(tankGal);
    const stock = n(stockPct, 12.5) || 12.5;
    const target = Math.min(stock, n(targetPct));
    const shGal = stock > 0 ? t * (target / stock) : 0;
    const waterGal = Math.max(0, t - shGal);
    const surfOz = t * n(surfOzPerGal);
    const chemCost = shGal * n(shPricePerGal) + surfOz * n(surfPricePerOz);
    return { shGal, waterGal, surfOz, chemCost, target };
  }, [tankGal, stockPct, targetPct, surfOzPerGal, shPricePerGal, surfPricePerOz]);

  const downstream = useMemo(() => {
    const stock = n(stockPct, 12.5) || 12.5;
    const r = n(ratio);
    const appliedPct = stock / (r + 1);
    const stockShare = 1 / (r + 1); // gallons of stock per gallon of finished mix
    return { appliedPct, stockShare };
  }, [stockPct, ratio]);

  // Report batch chem cost up (only meaningful per-job in batch mode).
  useEffect(() => {
    if (onChemCost && mode === "batch") onChemCost(batch.chemCost);
  }, [onChemCost, mode, batch.chemCost]);

  return (
    <div className="wc-tool" id="sh-dilution">
      <div className="wc-tool-head">
        <h3 className="wc-tool-title">SH dilution calculator</h3>
        <p className="wc-tool-sub">
          Mix sodium hypochlorite to an exact surface percentage for soft washing siding.
        </p>
      </div>

      <div className="wc-segment wc-segment-full" role="radiogroup" aria-label="Dilution mode">
        <button type="button" role="radio" aria-checked={mode === "batch"}
          className={mode === "batch" ? "active" : ""} onClick={() => setMode("batch")}>
          Batch (tank mix)
        </button>
        <button type="button" role="radio" aria-checked={mode === "downstream"}
          className={mode === "downstream" ? "active" : ""} onClick={() => setMode("downstream")}>
          Downstream injector ratio
        </button>
      </div>

      <div className="wc-form-row">
        <div className="wc-field">
          <label className="wc-label" htmlFor="sh-stock">Starting SH %</label>
          <div className="wc-segment" role="radiogroup" aria-label="Stock strength">
            {STOCKS.map((s) => (
              <button key={s.id} type="button" role="radio" aria-checked={stockPct === s.pct}
                className={stockPct === s.pct ? "active" : ""} onClick={() => setStockPct(s.pct)}>
                {s.label}
              </button>
            ))}
          </div>
          <span className="wc-help">Strength of the drum you're mixing from.</span>
        </div>

        {mode === "batch" ? (
          <div className="wc-field">
            <label className="wc-label" htmlFor="sh-target">Target SH % at surface</label>
            <input id="sh-target" className="wc-input" type="number" min="0" step="0.5"
              value={targetPct} onChange={(e) => setTargetPct(e.target.value)} />
            <span className="wc-help">1–2% vinyl, 3–4% heavy mildew.</span>
          </div>
        ) : (
          <div className="wc-field">
            <label className="wc-label" htmlFor="sh-ratio">Injector draw ratio (X : 1)</label>
            <input id="sh-ratio" className="wc-input" type="number" min="0" step="1"
              value={ratio} onChange={(e) => setRatio(e.target.value)} />
            <span className="wc-help">Water parts drawn per 1 part stock (e.g. 10 for 10:1).</span>
          </div>
        )}
      </div>

      {mode === "batch" && (
        <>
          <div className="wc-form-row">
            <div className="wc-field">
              <label className="wc-label" htmlFor="sh-tank">Tank size (gal)</label>
              <input id="sh-tank" className="wc-input" type="number" min="0"
                value={tankGal} onChange={(e) => setTankGal(e.target.value)} />
            </div>
            <div className="wc-field">
              <label className="wc-label" htmlFor="sh-surf">Surfactant (oz / gal)</label>
              <input id="sh-surf" className="wc-input" type="number" min="0" step="0.5"
                value={surfOzPerGal} onChange={(e) => setSurfOzPerGal(e.target.value)} />
            </div>
          </div>
          <div className="wc-form-row">
            <div className="wc-field">
              <label className="wc-label" htmlFor="sh-price">SH price / gal</label>
              <div className="wc-input-prefix">
                <span className="wc-prefix">$</span>
                <input id="sh-price" className="wc-input" type="number" min="0" step="0.25"
                  value={shPricePerGal} onChange={(e) => setShPricePerGal(e.target.value)} />
              </div>
            </div>
            <div className="wc-field">
              <label className="wc-label" htmlFor="surf-price">Surfactant price / oz</label>
              <div className="wc-input-prefix">
                <span className="wc-prefix">$</span>
                <input id="surf-price" className="wc-input" type="number" min="0" step="0.05"
                  value={surfPricePerOz} onChange={(e) => setSurfPricePerOz(e.target.value)} />
              </div>
            </div>
          </div>
        </>
      )}

      {mode === "downstream" && (
        <div className="wc-field">
          <label className="wc-label" htmlFor="sh-surf-ds">Surfactant (oz / gal of stock)</label>
          <input id="sh-surf-ds" className="wc-input" type="number" min="0" step="0.5"
            value={surfOzPerGal} onChange={(e) => setSurfOzPerGal(e.target.value)} />
          <span className="wc-help">Added to the stock jug before it's drawn.</span>
        </div>
      )}

      <div className="wc-tool-out" aria-live="polite">
        {mode === "batch" ? (
          <>
            <div className="wc-out"><span className="wc-out-lbl">Gallons SH stock</span><span className="wc-out-val">{batch.shGal.toFixed(2)} gal</span></div>
            <div className="wc-out"><span className="wc-out-lbl">Gallons water</span><span className="wc-out-val">{batch.waterGal.toFixed(2)} gal</span></div>
            <div className="wc-out"><span className="wc-out-lbl">Ounces surfactant</span><span className="wc-out-val">{batch.surfOz.toFixed(1)} oz</span></div>
            <div className="wc-out"><span className="wc-out-lbl">Estimated chem cost</span><span className="wc-out-val">{formatMoney2(batch.chemCost)}</span></div>
          </>
        ) : (
          <>
            <div className="wc-out"><span className="wc-out-lbl">Effective % at surface</span><span className="wc-out-val">{downstream.appliedPct.toFixed(2)}%</span></div>
            <div className="wc-out"><span className="wc-out-lbl">Stock share of finished mix</span><span className="wc-out-val">{(downstream.stockShare * 100).toFixed(1)}%</span></div>
            <div className="wc-out"><span className="wc-out-lbl">Ratio (water : stock)</span><span className="wc-out-val">{n(ratio)} : 1</span></div>
          </>
        )}
      </div>

      <p className="wc-tool-note">
        Downstream injector draw ratios vary by tip GPM and hose length — verify your rig's
        real ratio with a bucket test. Always wet landscaping before and after applying SH.
      </p>
    </div>
  );
}
