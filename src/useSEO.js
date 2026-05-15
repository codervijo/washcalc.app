import { useEffect } from "react";

function setMeta(name, content, attr = "name") {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}
function setCanonical(href) {
  if (!href) return;
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * useSEO({ title, description, canonical })
 *
 * BreadcrumbList / FAQPage / SoftwareApplication JSON-LD and the
 * canonical/og/twitter tags are emitted at build time by prerender.js,
 * so Googlebot sees them in the initial HTML. This hook only keeps
 * the document head in sync during client-side route changes — the
 * `breadcrumbs` arg is accepted (for backward compat) but unused.
 */
export default function useSEO({ title, description, canonical }) {
  useEffect(() => {
    if (title) document.title = title;
    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", "website", "property");
    if (canonical) setCanonical(canonical);
  }, [title, description, canonical]);
}
