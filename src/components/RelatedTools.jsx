import { Link } from "react-router-dom";

const ALL = [
  { to: "/calculators/driveway",       label: "Driveway Cleaning Calculator", emoji: "🚗" },
  { to: "/calculators/roof",           label: "Roof Cleaning Calculator",     emoji: "🏚️" },
  { to: "/calculators/house-washing",  label: "House Washing Calculator",     emoji: "🏠" },
  { to: "/calculators/deck",           label: "Deck Cleaning Calculator",     emoji: "🪵" },
  { to: "/calculator",                 label: "All-Surface Calculator",       emoji: "🧮" },
];

export default function RelatedTools({ exclude }) {
  const items = ALL.filter((i) => i.to !== exclude);
  return (
    <div className="wc-grid-4">
      {items.slice(0, 4).map((it) => (
        <Link key={it.to} to={it.to} className="wc-card wc-card-pad" style={{ display: "block", color: "inherit" }}>
          <div className="wc-benefit-icon">{it.emoji}</div>
          <div style={{ fontWeight: 700 }}>{it.label}</div>
          <div style={{ color: "var(--wc-text-soft)", fontSize: 13, marginTop: 4 }}>
            Open calculator →
          </div>
        </Link>
      ))}
    </div>
  );
}
