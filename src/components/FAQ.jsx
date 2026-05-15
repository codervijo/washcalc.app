import { useState } from "react";

// FAQPage JSON-LD is emitted at build time by prerender.js (so Googlebot
// sees it in the initial HTML). This component now only renders the UI.
export default function FAQ({ items }) {
  const [open, setOpen] = useState(0);

  return (
    <div>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div className="wc-faq-item" key={i}>
            <button
              className="wc-faq-q"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span>{it.q}</span>
              <span aria-hidden="true">{isOpen ? "–" : "+"}</span>
            </button>
            <div className="wc-faq-a" hidden={!isOpen}>{it.a}</div>
          </div>
        );
      })}
    </div>
  );
}
