import { useState } from "react";
import { DECK_MATERIALS } from "../../pages/variants.js";

// Deck material selector — sits under the main calculator on /calculators/deck.
// Picking a material sets a recommended PSI range and nozzle, and pushes a
// price multiplier into the calculator's rate-based price. A user-set PSI that
// exceeds the material's safe maximum raises a damage warning.

function n(v, d = 0) {
  const x = Number(v);
  return Number.isFinite(x) && x >= 0 ? x : d;
}

export default function DeckMaterialSelector({ values, setValues }) {
  const [materialId, setMaterialId] = useState("pt-pine");
  const mat = DECK_MATERIALS.find((m) => m.id === materialId) || DECK_MATERIALS[0];
  const [psi, setPsi] = useState(mat.psiMax);

  function pickMaterial(m) {
    setMaterialId(m.id);
    setPsi(m.psiMax);
    setValues({ ...values, materialMultiplier: m.priceMult });
  }

  const overSafe = n(psi) > mat.safePsiMax;

  return (
    <div className="wc-tool wc-tool-inhero" id="deck-material">
      <div className="wc-tool-head">
        <h3 className="wc-tool-title">Decking material</h3>
        <p className="wc-tool-sub">
          Sets the recommended PSI, nozzle, and a price adjustment on the quote above.
        </p>
      </div>

      <div className="wc-material-grid" role="radiogroup" aria-label="Decking material">
        {DECK_MATERIALS.map((m) => (
          <button
            key={m.id} type="button" role="radio" aria-checked={materialId === m.id}
            className={`wc-material-btn${materialId === m.id ? " active" : ""}`}
            onClick={() => pickMaterial(m)}
          >
            <span className="wc-material-name">{m.label}</span>
            <span className="wc-material-mult">{m.priceMult === 1 ? "base rate" : `${m.priceMult}× rate`}</span>
          </button>
        ))}
      </div>

      <div className="wc-material-specs">
        <div className="wc-out"><span className="wc-out-lbl">Recommended PSI</span><span className="wc-out-val">{mat.psiMin}–{mat.psiMax}</span></div>
        <div className="wc-out"><span className="wc-out-lbl">Recommended nozzle</span><span className="wc-out-val">{mat.nozzle}</span></div>
        <div className="wc-out"><span className="wc-out-lbl">Safe PSI ceiling</span><span className="wc-out-val">{mat.safePsiMax}</span></div>
      </div>

      <div className="wc-field" style={{ marginTop: 14 }}>
        <label className="wc-label" htmlFor="deck-psi">Your working PSI</label>
        <input id="deck-psi" className="wc-input" type="number" min="0" step="100"
          value={psi} onChange={(e) => setPsi(e.target.value)} />
        <span className="wc-help">{mat.note}</span>
      </div>

      {overSafe && (
        <p className="wc-warn-box" role="alert">
          ⚠ {n(psi)} PSI exceeds the safe ceiling ({mat.safePsiMax} PSI) for {mat.label.toLowerCase()}.
          This risks furring, gouging, or splintering — drop the pressure or back the wand off the boards.
        </p>
      )}
    </div>
  );
}
