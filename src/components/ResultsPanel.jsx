import { useState } from "react";
import { formatMoney, formatMoney2, formatHours } from "../PricingEngine.js";

export default function ResultsPanel({ result, values, onReset }) {
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(""), 1800);
  };

  const copyQuote = async () => {
    const lines = [
      `WashCalc — ${result.surface.label} quote`,
      `Area: ${values.area || 0} sq ft (${result.condition.label})`,
      `Estimated time: ${formatHours(result.hours)}`,
      `Estimated cost: ${formatMoney2(result.totalCost)}`,
      `Recommended price: ${formatMoney(result.recommendedPrice)}`,
      `Gross profit: ${formatMoney(result.grossProfit)} (${result.effectiveMargin.toFixed(0)}%)`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(lines);
      showToast("Quote copied to clipboard");
    } catch {
      showToast("Could not copy");
    }
  };

  return (
    <aside className="wc-results">
      <div className="wc-results-card" aria-live="polite">
        <div className="wc-result-headline">Recommended price</div>
        <div className="wc-result-price">
          {formatMoney(result.recommendedPrice)}
          <span className="wc-result-sub">
            {result.pricePerSqFt > 0 ? `· ${formatMoney2(result.pricePerSqFt)}/sq ft` : ""}
          </span>
        </div>

        <div className="wc-result-list">
          <div className="wc-result-row">
            <span className="wc-k">Estimated time</span>
            <span className="wc-v">{formatHours(result.hours)}</span>
          </div>
          <div className="wc-result-row">
            <span className="wc-k">Job cost</span>
            <span className="wc-v">{formatMoney2(result.totalCost)}</span>
          </div>
          <div className="wc-result-row wc-profit">
            <span className="wc-k">Gross profit</span>
            <span className="wc-v">{formatMoney(result.grossProfit)} ({result.effectiveMargin.toFixed(0)}%)</span>
          </div>
          <div className="wc-result-row">
            <span className="wc-k">Surface</span>
            <span className="wc-v">{result.surface.label} · {result.condition.label}</span>
          </div>
        </div>

        <div className="wc-result-actions">
          <button className="wc-btn wc-btn-primary" onClick={copyQuote}>Copy Quote</button>
          <button className="wc-btn wc-btn-ghost" onClick={onReset}>Reset</button>
          <button className="wc-btn wc-btn-ghost" onClick={() => showToast("Save Quote — coming soon")}>Save Quote</button>
          <button className="wc-btn wc-btn-ghost" onClick={() => showToast("PDF export — coming soon")}>Download PDF</button>
        </div>
      </div>

      {toast && <div className="wc-toast" role="status">{toast}</div>}
    </aside>
  );
}
