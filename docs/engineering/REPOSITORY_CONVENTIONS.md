# Repository Conventions

This document defines the organization rules for the active KTL website repository.

## Source Ownership Rules (`apps/web/src`)

- `modules/<feature>`: feature-owned business UI, feature data shaping, and feature composition.
- `components`: shared, cross-feature, reusable UI primitives and shared layout elements only.
- `pages`: route entry points only; keep pages thin and delegate to feature modules.
- `lib`: framework-agnostic helpers and low-level utilities used by multiple features.
- `hooks`: cross-feature reusable hooks.
- `data`: bundled/static app data imported at build time.

## Boundaries

- Do not place feature-only components in `components`.
- Do not place route-only concerns in shared `components`.
- Prefer imports that clearly reflect ownership:
  - feature-to-shared: `modules/* -> components/*` is allowed.
  - shared-to-feature: `components/* -> modules/*` is not allowed.

## Barrel Export Guidance

- Avoid directory barrels that duplicate sibling component filenames.
- Prefer direct imports from the component file path when a single component is exported.
- Keep barrels only where they provide real aggregation value.

## Route Policy

- Public/production routes belong in `App.tsx` route map.
- Dev-only routes must be gated by `import.meta.env.DEV`.
- Experimental views should not be reachable in production builds.

## RFQ Module Policy

- Maintain a single module entry strategy under `src/modules/rfq`.
- Keep exports and imports explicit (`RFQWizard`, `types`, `validation`, `config`) and avoid duplicate `index.ts`/`index.tsx` shells.
