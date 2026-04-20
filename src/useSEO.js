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
 * useSEO({ title, description, canonical, breadcrumbs:[{name,url}] })
 */
export default function useSEO({ title, description, canonical, breadcrumbs }) {
  useEffect(() => {
    if (title) document.title = title;
    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", "website", "property");
    if (canonical) setCanonical(canonical);

    let bcScript;
    if (breadcrumbs && breadcrumbs.length) {
      bcScript = document.createElement("script");
      bcScript.type = "application/ld+json";
      bcScript.setAttribute("data-wc-bc", "1");
      bcScript.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.name,
          item: b.url,
        })),
      });
      document.head.appendChild(bcScript);
    }
    return () => { if (bcScript) bcScript.remove(); };
  }, [title, description, canonical, JSON.stringify(breadcrumbs || [])]);
}
