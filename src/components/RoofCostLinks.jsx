import { Link } from "react-router-dom";

/**
 * Cross-link block for /calculators/roof only, passed as that route's
 * `belowHero` slot in App.jsx. Kept out of CalculatorPage so the indexed
 * /calculators/driveway route, which shares that component, is unaffected.
 */
export default function RoofCostLinks() {
  return (
    <section className="wc-section-tight">
      <div className="wc-container" style={{ maxWidth: 820 }}>
        <div className="wc-crosslinks">
          <h3>Before you send the roof number</h3>
          <p>
            Roofs price on pitch and access far more than on area, and the calculator above
            cannot see either. The{" "}
            <Link to="/roof-cleaning-cost">roof cleaning cost guide</Link> covers what actually
            moves the price, with worked examples at light, moderate and heavy condition. Roof
            work rarely sells alone — size the walls on the{" "}
            <Link to="/house-washing-cost">house washing cost guide</Link>, total the visit with
            the{" "}
            <Link to="/pressure-washing-estimate-calculator">pressure washing estimate
            calculator</Link>, and send it on the{" "}
            <Link to="/pressure-washing-quote-template">quote template</Link>, whose exclusions
            block matters more on roofs than on any other surface.
          </p>
        </div>
      </div>
    </section>
  );
}
