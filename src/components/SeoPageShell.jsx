import { Link } from "react-router-dom";
import Layout from "./Layout.jsx";
import useSEO from "../useSEO.js";

/**
 * Structural shell for the Phase 1.B SEO pages.
 *
 * Deliberately carries NO prose of its own — every word on these pages is
 * written per page so nothing is duplicated across them. This component only
 * supplies the chrome: layout, breadcrumbs, H1, lead paragraph, an optional
 * table of contents, the FAQ block and the cross-link cluster.
 *
 * `meta` is one of the objects exported by ../pages/seoPages.js, so the
 * visible FAQ text and the FAQPage JSON-LD emitted by prerender.js come from
 * the same source and cannot drift apart.
 */
export default function SeoPageShell({ meta, lead, toc, children, links }) {
  useSEO({ title: meta.title, description: meta.description, canonical: meta.canonical });

  return (
    <Layout>
      <article className="wc-section">
        <div className="wc-container-narrow">
          <nav className="wc-breadcrumbs" aria-label="Breadcrumb" style={{ marginBottom: 16 }}>
            <a href="/">Home</a><span>/</span>
            <span style={{ color: "var(--wc-text)" }}>{meta.h1}</span>
          </nav>

          <h1 style={{ fontSize: "clamp(30px,3.6vw,42px)", margin: "0 0 12px", letterSpacing: "-0.01em" }}>
            {meta.h1}
          </h1>
          <p style={{ color: "var(--wc-text-muted)", fontSize: 17, margin: "0 0 28px" }}>{lead}</p>

          {toc && toc.length > 0 && (
            <nav className="wc-qt-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                {toc.map((t) => (
                  <li key={t.id}><a href={`#${t.id}`}>{t.label}</a></li>
                ))}
              </ol>
            </nav>
          )}

          {children}

          <section className="wc-qt-section wc-qt-faq" id="faq">
            <h2>Frequently asked questions</h2>
            {meta.faqs.map((f, i) => (
              <details key={f.q} open={i === 0 || undefined}>
                <summary>{f.q}</summary>
                <div className="a">{f.a}</div>
              </details>
            ))}
          </section>

          {links && links.length > 0 && (
            <section className="wc-qt-section" id="related" style={{ borderBottom: "none" }}>
              <h2>Where to go next</h2>
              <p className="wc-qt-sub">The tools and guides that pair with this page.</p>
              <ul className="wc-pillar-links">
                {links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to}>{l.label}</Link> — {l.note}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>
    </Layout>
  );
}
