# CLAUDE.md — washcalc.app

Per-project orientation for Claude. Read this first when picking up
work on this site. Index of conventions, deferred decisions, and
non-features that aren't obvious from the code or git history.

## Project

washcalc.app is a free pressure-washing pricing site for contractors —
surface calculators, a multi-surface estimate builder, cost guides and
quote/estimate templates. Stack: React + Vite + pnpm with build-time
prerendering, on Cloudflare Pages; `Makefile` forwards to the sites/
workspace and the central builder. Full orientation: `AI_AGENTS.md`.

## Commands

```bash
# Build / dev (forwards to the parent Makefile)
make deps           # install deps via the central builder
make dev            # local dev server
make build          # production build → dist/

# Test (per-stack — adjust as needed)
make test           # if a test suite is wired in

# Deploy
git push            # Cloudflare Pages auto-builds on push to main
```

## Conventions

  - Build path: this project's `Makefile` → `../Makefile` (parent
    workspace) → `~/work/projects/builder/` (central builder).
  - Stack: pnpm-only. No `package-lock.json` / `bun.lockb` / `yarn.lock`.
  - Deploy: Cloudflare Pages via `wrangler.jsonc`. No `_redirects`
    SPA fallback (uses CF's `not_found_handling` instead).
  - **Canonical host: non-www apex `https://washcalc.app`.** Every
    canonical, breadcrumb, sitemap URL, and OG tag uses the bare apex —
    never `www.`. A live `www → apex` 308 redirect enforces it. This was
    a deliberate reversal *away* from www on 2026-07-13 (see
    `docs/growth.md`); do not re-introduce www canonicals.

## Heading hygiene

**Before adding any section, subsection, or heading to a Markdown
file, output the file's current heading outline first:**

```bash
grep -nE '^#+ ' path/to/file.md
```

Then confirm — in the chat — that the planned new heading's:

1. **Depth** (`#`, `##`, `###`, …) is the intended depth, not
   accidentally one level too shallow.
2. **Label** doesn't collide with existing headings — no duplicate
   `## 1. <title>`, no `### N.X` subsection labels that look like
   `vN.X` phase identifiers.

Only after that confirmation, write.

Applies especially to long-lived docs: `docs/prd.md`, `AI_AGENTS.md`,
`docs/architecture.md`, `docs/CLAUDE.md`.

**Why:** structural drift is invisible in any single editing session
— it only becomes obvious in the aggregate, by which time the doc is
hard to fix. The pre-edit outline ritual catches collisions and depth
mistakes at the point of writing, not at quarterly cleanup time.

## Deferred decisions

Things deliberately *not* shipped. Append entries with rationale so
future Claude sessions don't re-propose them.

- **Footer / homepage links to the Phase 1.B pages** — deferred (2026-08-21).
  `Header`/`Footer`/`Layout`/`RelatedTools` render on indexed pages; adding
  links there changes indexed content. Needs an explicit operator OK.
- **`DEFAULT_VALUES.laborRate = 75`** — left as is (2026-08-21). The engine
  treats it as a *cost*, so $75 inflates prices, but the default is shared
  with the indexed `/calculators/driveway`. Options in `docs/prd.md § Phase
  1.B → Open item for operator decision`.
- **City / location pSEO pages** — out of scope for Phase 1.B; listed under
  Phase 2 in `docs/prd.md`, not scheduled.
- **HowTo / FAQ rich-result tracking** — dropped (2026-09-22). Google no
  longer shows these for this site type; schema stays, it just isn't a KPI.

