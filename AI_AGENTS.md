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

### Running builds (agents: read this before invoking pnpm directly)

The parent `../Makefile` enforces `IS_DOCKER=yes` — `make build` /
`make test` run from the host short-circuit with
`"Warning: Not running inside Docker"` and do nothing. Do **not**
fall back to `pnpm build` on the host; that bypasses the workspace
contract.

The sites/ workspace ships a persistent dev container named `sites1`
(image: `sites1:latest`). One container is normally already running.
Find its name with `docker ps` (look for `IMAGE=sites1`) and exec the
build inside it — the host's `sites/` directory is bind-mounted at
`/usr/src/app/` so file changes are immediately visible:

```bash
CONTAINER=$(docker ps --filter ancestor=sites1 --format '{{.Names}}' | head -1)
docker exec "$CONTAINER" sh -c 'cd /usr/src/app/washcalc.app && pnpm build'
```

For an interactive shell inside the container, use `make buildsh`
from the parent dir (runs `dev_container.sh`).

Build = `pnpm build:client && pnpm build:server && node prerender.js`.
The prerender step is what writes per-route `dist/<path>/index.html`
files — without it, only the SPA shell is served and SEO breaks.

### Verifying the prerendered HTML

After build, the prerendered HTML on a single line — use whole-file
matches when grepping:

```bash
grep -oE 'wc-faq-a' dist/index.html | wc -l       # counts matches
grep -c 'wc-faq-a' dist/index.html                # counts lines (misleading: ~1)
```

## Deployment info

Cloudflare Pages. Push to `main` triggers an auto-build via the
`wrangler.jsonc` config; build output is `dist/`. Custom domain
configured via the CF Pages dashboard.

