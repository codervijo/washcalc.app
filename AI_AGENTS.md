# AI Agent Context — washcalc.app

## What this project is
A web application for wash calculations. (Fill in a 1-2 sentence description of what this project does.)

## Stack
<infer from files once added: language, frameworks, key dependencies>

## Project structure
- `docs/` — project documentation and planning

## How to run
<fill in once build tooling is added>

## Key conventions
- <any patterns you notice in the code>

## Out of scope / don't touch
- <leave blank for user to fill>

## Versioning

This project follows the two-level versioning convention canonical
to the portfolio (see `sites/portfolio/AI_AGENTS.md` for the full
statement):

- **`vN`** — major capability tier (SemVer-MAJOR semantics).
- **`vN.X`** — phase letter within a tier (A, B, C, …) for
  internal slicing.
- **`vN.X.Y`** — numeric sub-phase for follow-up work that lands
  after `vN.X` shipped.

Track current phase + completed work in `docs/prd.md`.

## Building info

This project's `Makefile` forwards every target to `../Makefile`
(the sites/ workspace) which delegates per-stack work to the central
builder at `~/work/projects/builder/`. Common: `make deps`, `make dev`,
`make build`. Don't duplicate build logic per-site.

## Deployment info

Cloudflare Pages. Push to `main` triggers an auto-build via the
`wrangler.jsonc` config; build output is `dist/`. Custom domain
configured via the CF Pages dashboard.

