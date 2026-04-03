# Data and Archive Governance

This policy prevents drift between runtime data, source data, and historical artifacts.

## Data Ownership

### `apps/web/src/data`

- Source-of-truth for data imported directly by application code.
- Use for typed, bundled data needed at build/runtime in React modules.
- Changes should be reviewed as application code changes.

### `apps/web/public/data`

- Source-of-truth for runtime-fetched static assets/data served as files.
- Use for data that must be accessible by URL (e.g. markdown, downloadable JSON).
- Treat as deployment assets, not type-safe app module data.

## Rules to Prevent Drift

- A dataset should have one canonical location: either `src/data` or `public/data`.
- If transformation is needed, generate derived files from one canonical source via scripts.
- Document generated artifacts and avoid manual edits to generated output.

## Generated Files

- `apps/web/public/sitemap.xml` is automation-owned (via `generate-sitemap`).
- `apps/web/dist` is build output and should not be manually edited.

## Archive Policy (`archive/`)

- `archive/` is read-only historical material.
- No active application code should import from `archive/`.
- Do not patch old deployment artifacts to apply current fixes.
- If archive size becomes burdensome, move immutable snapshots to external artifact storage and keep references in docs.

## Review Checklist

- Does the change introduce a second source for the same dataset?
- Is this data meant to be imported (`src/data`) or fetched by URL (`public/data`)?
- Is any generated file being edited manually?
- Is any active code path depending on archived artifacts?
