# Agent guidance (Cursor / Claude / automation)

## Repository

- **Monorepo:** npm workspaces. The Vite + React app is **`apps/web/`**.
- **Install and CI commands** run from the **repository root**: `npm ci`, `npm run dev`, `npm run lint`, `npm run typecheck`, `npm run test:run`, `npm run format:check`, `npm run build`.
- **Environment:** Copy `apps/web/.env.example` → `apps/web/.env.local`. Client variables use the **`VITE_`** prefix (see template).
- **Pre-commit:** Husky runs **lint-staged** (ESLint + Prettier on staged files under `apps/web/` and selected docs).

## API routes (Vercel)

- **`GET /api/health`** — lightweight JSON health check (`{ ok, service, time }`).
- **`GET /api/vercel/status`** — optional Vercel API connectivity (requires `VERCEL_TOKEN` server-side).

## Observability

- **Browser:** `apps/web/src/lib/observability.ts` — structured `console` logs and optional **Datadog RUM** when `VITE_DD_*` vars are set (`apps/web/src/datadog.ts`).
- **Errors:** Global handlers in `main.tsx`; React errors go through `ErrorBoundary` → `reportError`.

## Docs

- Root **`README.md`**, **`CONTRIBUTING.md`**, **`docs/engineering/DEVELOPER_GUIDE.md`**, **`docs/engineering/CLAUDE.md`**.

## Noise for scanners

- Generated dirs are gitignored: `apps/web/coverage/`, `apps/web/playwright-report/`, `test-results/`. ESLint and Prettier ignore these paths.
