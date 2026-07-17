import { useState } from "react";
import { DECK } from "../../pages/variants.js";

// Clean-and-seal timeline for /calculators/deck. Renders the three HowTo steps
// (Clean → Dry → Seal) verbatim from DECK.howTo so the visible copy matches the
// HowTo JSON-LD emitted by prerender.js. The dry window adjusts for climate.

const CLIMATES = [
  { id: "dry", label: "Warm & dry", dryHours: 24 },
  { id: "avg", label: "Average", dryHours: 48 },
  { id: "humid", label: "Humid / cool", dryHours: 72 },
];

const STEPS = DECK.howTo.steps; // [Clean, Dry, Seal]

export default function CleanAndSealTimeline() {
  const [climateId, setClimateId] = useState("avg");
  const climate = CLIMATES.find((c) => c.id === climateId) || CLIMATES[1];
  const dryDays = Math.ceil(climate.dryHours / 24);
  const sealDay = 1 + dryDays; // clean = day 1

  const nodes = [
    { key: "clean", title: STEPS[0].name, when: "Day 1", text: STEPS[0].text },
    { key: "dry", title: STEPS[1].name, when: `${climate.dryHours} hrs`, text: STEPS[1].text },
    { key: "seal", title: STEPS[2].name, when: `Day ${sealDay}`, text: STEPS[2].text },
  ];

  return (
    <div className="wc-tool" id="clean-seal-timeline">
      <div className="wc-tool-head">
        <h3 className="wc-tool-title">{DECK.howTo.name}</h3>
        <p className="wc-tool-sub">
          A two-visit job: clean, let the wood dry, then return to seal. Dry time drives the schedule.
        </p>
      </div>

      <div className="wc-field" style={{ maxWidth: 360 }}>
        <label className="wc-label">Climate / humidity</label>
        <div className="wc-segment" role="radiogroup" aria-label="Climate">
          {CLIMATES.map((c) => (
            <button key={c.id} type="button" role="radio" aria-checked={climateId === c.id}
              className={climateId === c.id ? "active" : ""} onClick={() => setClimateId(c.id)}>
              {c.label}
            </button>
          ))}
        </div>
        <span className="wc-help">Adjusts the dry window between cleaning and sealing.</span>
      </div>

      <ol className="wc-timeline">
        {nodes.map((node, i) => (
          <li key={node.key} className={`wc-timeline-node wc-timeline-${node.key}`}>
            <div className="wc-timeline-marker" aria-hidden="true">{i + 1}</div>
            <div className="wc-timeline-body">
              <div className="wc-timeline-when">{node.when}</div>
              <h4 className="wc-timeline-title">{node.title}</h4>
              <p className="wc-timeline-text">{node.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="wc-tool-note">
        Sealing a deck before it is fully dry traps moisture and causes early peeling. When in
        doubt, wait — or use a moisture meter and seal under 15%.
      </p>
    </div>
  );
}
