import { SURFACES } from "../PricingEngine.js";

export default function SurfaceSelector({ value, onChange, only }) {
  const list = only ? SURFACES.filter((s) => only.includes(s.id)) : SURFACES;
  return (
    <div className="wc-surfaces" role="radiogroup" aria-label="Surface type">
      {list.map((s) => (
        <button
          key={s.id}
          type="button"
          role="radio"
          aria-checked={value === s.id}
          className={"wc-surface-btn" + (value === s.id ? " active" : "")}
          onClick={() => onChange(s.id)}
        >
          <span className="wc-surface-emoji" aria-hidden="true">{s.emoji}</span>
          {s.label}
        </button>
      ))}
    </div>
  );
}
