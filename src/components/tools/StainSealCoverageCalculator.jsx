import { useMemo, useState } from "react";
import { formatMoney, formatMoney2 } from "../../PricingEngine.js";

// Deck stain / seal coverage calculator. Estimates gallons needed for the deck
// field plus railings across N coats, then the product cost and a marked-up
// line price for the quote.

function n(v, d = 0) {
  const x = Number(v);
  return Number.isFinite(x) && x >= 0 ? x : d;
}

// Coverage (sq ft per gallon) by product type — conservative first-coat values
// from published semi-transparent/solid ranges (deckstainhelp.com): oil-based
// 150–250, water-based 150–200, solid 200–250. A second coat covers ~50% more
// because the wood is already partly saturated. Tune to the product lines you
// carry (spec sheets vary by brand).
const PRODUCTS = [
  { id: "oil", label: "Oil-based", coverage: 200 },
  { id: "water", label: "Water-based", coverage: 200 },
  { id: "solid", label: "Solid color", coverage: 225 },
];

const RAILING_SQFT_PER_LF = 3.5; // both faces + cap of a standard rail

export default function StainSealCoverageCalculator() {
  const [deckSqft, setDeckSqft] = useState(350);
  const [railingLf, setRailingLf] = useState(60);
  const [coats, setCoats] = useState(2);
  const [productId, setProductId] = useState("oil");
  const [pricePerGal, setPricePerGal] = useState(45);
  const [markupPct, setMarkupPct] = useState(40);

  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];

  const r = useMemo(() => {
    const railingSqft = n(railingLf) * RAILING_SQFT_PER_LF;
    const totalSqft = n(deckSqft) + railingSqft;
    const coatsN = Math.max(1, n(coats, 1));
    const exactGal = product.coverage > 0 ? (totalSqft * coatsN) / product.coverage : 0;
    const buyGal = Math.ceil(exactGal); // you buy whole gallons
    const productCost = buyGal * n(pricePerGal);
    const linePrice = productCost * (1 + n(markupPct) / 100);
    return { railingSqft, totalSqft, exactGal, buyGal, productCost, linePrice };
  }, [deckSqft, railingLf, coats, product, pricePerGal, markupPct]);

  return (
    <div className="wc-tool" id="stain-seal">
      <div className="wc-tool-head">
        <h3 className="wc-tool-title">Stain &amp; seal coverage calculator</h3>
        <p className="wc-tool-sub">
          Gallons, product cost, and a marked-up line price for staining or sealing a deck.
        </p>
      </div>

      <div className="wc-form-row">
        <div className="wc-field">
          <label className="wc-label" htmlFor="ss-sqft">Deck area (sq ft)</label>
          <input id="ss-sqft" className="wc-input" type="number" min="0" value={deckSqft} onChange={(e) => setDeckSqft(e.target.value)} />
        </div>
        <div className="wc-field">
          <label className="wc-label" htmlFor="ss-railing">Railing (linear ft)</label>
          <input id="ss-railing" className="wc-input" type="number" min="0" value={railingLf} onChange={(e) => setRailingLf(e.target.value)} />
          <span className="wc-help">Counted at ~{RAILING_SQFT_PER_LF} sq ft of surface per linear foot.</span>
        </div>
      </div>

      <div className="wc-form-row">
        <div className="wc-field">
          <label className="wc-label" htmlFor="ss-coats">Coats</label>
          <input id="ss-coats" className="wc-input" type="number" min="1" value={coats} onChange={(e) => setCoats(e.target.value)} />
        </div>
        <div className="wc-field">
          <label className="wc-label">Product type</label>
          <div className="wc-segment" role="radiogroup" aria-label="Product type">
            {PRODUCTS.map((p) => (
              <button key={p.id} type="button" role="radio" aria-checked={productId === p.id}
                className={productId === p.id ? "active" : ""} onClick={() => setProductId(p.id)}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="wc-form-row">
        <div className="wc-field">
          <label className="wc-label" htmlFor="ss-price">Product price / gal</label>
          <div className="wc-input-prefix">
            <span className="wc-prefix">$</span>
            <input id="ss-price" className="wc-input" type="number" min="0" value={pricePerGal} onChange={(e) => setPricePerGal(e.target.value)} />
          </div>
        </div>
        <div className="wc-field">
          <label className="wc-label" htmlFor="ss-markup">Suggested markup (%)</label>
          <input id="ss-markup" className="wc-input" type="number" min="0" value={markupPct} onChange={(e) => setMarkupPct(e.target.value)} />
        </div>
      </div>

      <div className="wc-tool-out" aria-live="polite">
        <div className="wc-out"><span className="wc-out-lbl">Gallons needed</span><span className="wc-out-val">{r.exactGal.toFixed(2)} gal</span></div>
        <div className="wc-out"><span className="wc-out-lbl">Gallons to buy</span><span className="wc-out-val">{r.buyGal} gal</span></div>
        <div className="wc-out"><span className="wc-out-lbl">Product cost</span><span className="wc-out-val">{formatMoney2(r.productCost)}</span></div>
        <div className="wc-out"><span className="wc-out-lbl">Suggested line price</span><span className="wc-out-val">{formatMoney(r.linePrice)}</span></div>
      </div>

      <p className="wc-tool-note">
        Coverage assumes {product.label.toLowerCase()} at ~{product.coverage} sq ft/gal — rough,
        weathered wood drinks more on the first coat. Stain and seal is a separate quote line from
        the wash, priced by gallon and hour.
      </p>
    </div>
  );
}
