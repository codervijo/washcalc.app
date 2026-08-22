import { useState } from "react";

/**
 * An editable, copyable document template.
 *
 * The template text lives in a <textarea>, which means two things that both
 * matter here: the contractor can edit every field in place before copying,
 * and the full text ships inside the prerendered HTML as the textarea's child
 * node — so a crawler reads the whole template without executing JavaScript.
 *
 * Clipboard access is touched only inside the click handler, never at module
 * or render scope, so this component is safe under SSR prerendering.
 */
export default function TemplateBlock({ label, template, note }) {
  const [text, setText] = useState(template);
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const el = document.getElementById("wc-tpl-body");
        el?.select();
        document.execCommand("copy");
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="wc-tpl">
      <div className="wc-tpl-bar">
        <strong>{label}</strong>
        <div className="wc-tpl-actions">
          <button type="button" className="wc-tpl-btn" onClick={() => { setText(template); setCopied(false); }}>
            Reset
          </button>
          <button type="button" className={`wc-tpl-btn${copied ? " is-done" : ""}`} onClick={copy}>
            {copied ? "Copied ✓" : "Copy template"}
          </button>
        </div>
      </div>
      <textarea
        id="wc-tpl-body"
        className="wc-tpl-body"
        value={text}
        spellCheck="false"
        aria-label={label}
        onChange={(e) => setText(e.target.value)}
      />
      {note && <p className="wc-tpl-note">{note}</p>}
    </div>
  );
}
