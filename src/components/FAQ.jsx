import { useState, useEffect } from "react";

export default function FAQ({ items, withSchema = true }) {
  const [open, setOpen] = useState(0);

  useEffect(() => {
    if (!withSchema) return;
    const data = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      })),
    };
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.text = JSON.stringify(data);
    s.setAttribute("data-wc-faq", "1");
    document.head.appendChild(s);
    return () => { s.remove(); };
  }, [items, withSchema]);

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
