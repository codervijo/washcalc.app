import { useMemo, useState } from "react";
import { formatMoney, formatMoney2 } from "../../PricingEngine.js";

// House washing job profitability calculator. Takes a finished quote and the
// real costs behind it and reports whether the job actually made money.
// `chemCostFromSH` (optional) is the batch chem cost reported by the SH
// dilution calculator above; the "Use SH mix cost" button pulls it in.

function n(v, d = 0) {
  const x = Number(v);
  return Number.isFinite(x) && x >= 0 ? x : d;
}

export default function JobProfitabilityCalculator({ chemCostFromSH }) {
  const [quote, setQuote] = useState(400);
  const [sqft, setSqft] = useState(1800);
  const [driveMin, setDriveMin] = useState(30);
  const [onSiteHrs, setOnSiteHrs] = useState(2.5);
  const [crew, setCrew] = useState(1);
  const [laborCostHr, setLaborCostHr] = useState(25);
  const [chemCost, setChemCost] = useState(35);
  const [fuelCost, setFuelCost] = useState(15);

  const r = useMemo(() => {
    const price = n(quote);
    const site = n(onSiteHrs);
    const drive = n(driveMin) / 60;
    const crewN = Math.max(1, n(crew, 1));
    const laborCost = (site + drive) * crewN * n(laborCostHr);
    const totalCost = laborCost + n(chemCost) + n(fuelCost);
    const grossMargin = price - totalCost;
    const marginPct = price > 0 ? (grossMargin / price) * 100 : 0;
    const revPerHr = site > 0 ? price / site : 0;
    const profitPerHr = site > 0 ? grossMargin / site : 0;
    const perSqft = n(sqft) > 0 ? price / n(sqft) : 0;
    return { price, laborCost, totalCost, grossMargin, marginPct, revPerHr, profitPerHr, perSqft, breakEven: totalCost };
  }, [quote, sqft, driveMin, onSiteHrs, crew, laborCostHr, chemCost, fuelCost]);

  const marginClass = r.marginPct >= 45 ? "good" : r.marginPct >= 30 ? "ok" : "bad";
  const hasSH = typeof chemCostFromSH === "number" && chemCostFromSH > 0;

  return (
    <div className="wc-tool" id="job-profitability">
      <div className="wc-tool-head">
        <h3 className="wc-tool-title">House washing job profitability calculator</h3>
        <p className="wc-tool-sub">
          Enter the quote and your real costs to see the margin, the effective hourly, and your break-even.
        </p>
      </div>

      <div className="wc-form-row">
        <div className="wc-field">
          <label className="wc-label" htmlFor="jp-quote">Quote price</label>
          <div className="wc-input-prefix">
            <span className="wc-prefix">$</span>
            <input id="jp-quote" className="wc-input" type="number" min="0" value={quote} onChange={(e) => setQuote(e.target.value)} />
          </div>
        </div>
        <div className="wc-field">
          <label className="wc-label" htmlFor="jp-sqft">Siding area (sq ft)</label>
          <input id="jp-sqft" className="wc-input" type="number" min="0" value={sqft} onChange={(e) => setSqft(e.target.value)} />
        </div>
      </div>

      <div className="wc-form-row">
        <div className="wc-field">
          <label className="wc-label" htmlFor="jp-drive">Drive time (min, round trip)</label>
          <input id="jp-drive" className="wc-input" type="number" min="0" value={driveMin} onChange={(e) => setDriveMin(e.target.value)} />
        </div>
        <div className="wc-field">
          <label className="wc-label" htmlFor="jp-onsite">On-site hours</label>
          <input id="jp-onsite" className="wc-input" type="number" min="0" step="0.25" value={onSiteHrs} onChange={(e) => setOnSiteHrs(e.target.value)} />
        </div>
      </div>

      <div className="wc-form-row">
        <div className="wc-field">
          <label className="wc-label" htmlFor="jp-crew">Crew size</label>
          <input id="jp-crew" className="wc-input" type="number" min="1" value={crew} onChange={(e) => setCrew(e.target.value)} />
        </div>
        <div className="wc-field">
          <label className="wc-label" htmlFor="jp-labor">Labor cost / hour (per person)</label>
          <div className="wc-input-prefix">
            <span className="wc-prefix">$</span>
            <input id="jp-labor" className="wc-input" type="number" min="0" value={laborCostHr} onChange={(e) => setLaborCostHr(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="wc-form-row">
        <div className="wc-field">
          <label className="wc-label" htmlFor="jp-chem">Chemical cost</label>
          <div className="wc-input-prefix">
            <span className="wc-prefix">$</span>
            <input id="jp-chem" className="wc-input" type="number" min="0" value={chemCost} onChange={(e) => setChemCost(e.target.value)} />
          </div>
          {hasSH && (
            <button type="button" className="wc-linkbtn" onClick={() => setChemCost(Number(chemCostFromSH.toFixed(2)))}>
              ↑ Use SH mix cost ({formatMoney2(chemCostFromSH)})
            </button>
          )}
        </div>
        <div className="wc-field">
          <label className="wc-label" htmlFor="jp-fuel">Fuel cost</label>
          <div className="wc-input-prefix">
            <span className="wc-prefix">$</span>
            <input id="jp-fuel" className="wc-input" type="number" min="0" value={fuelCost} onChange={(e) => setFuelCost(e.target.value)} />
          </div>
        </div>
      </div>

      <div className={`wc-tool-out wc-tool-out-hero margin-${marginClass}`} aria-live="polite">
        <div className="wc-out wc-out-lg">
          <span className="wc-out-lbl">Gross margin</span>
          <span className="wc-out-val">{formatMoney(r.grossMargin)}</span>
        </div>
        <div className="wc-out wc-out-lg">
          <span className="wc-out-lbl">Margin %</span>
          <span className="wc-out-val">{r.marginPct.toFixed(0)}%</span>
        </div>
        <div className="wc-out">
          <span className="wc-out-lbl">Effective $/hr on site</span>
          <span className="wc-out-val">{formatMoney(r.revPerHr)}</span>
        </div>
        <div className="wc-out">
          <span className="wc-out-lbl">Break-even price</span>
          <span className="wc-out-val">{formatMoney(r.breakEven)}</span>
        </div>
        <div className="wc-out">
          <span className="wc-out-lbl">Profit $/hr on site</span>
          <span className="wc-out-val">{formatMoney(r.profitPerHr)}</span>
        </div>
        <div className="wc-out">
          <span className="wc-out-lbl">Achieved $/sq ft</span>
          <span className="wc-out-val">${r.perSqft.toFixed(2)}</span>
        </div>
      </div>

      <p className="wc-tool-note">
        Break-even is your total cost — quote below it and you pay to work. Drive time is
        counted as unbilled labor because it is: it costs crew wages and fuel with no revenue.
      </p>
    </div>
  );
}
