# Repository Cleanup Removal Report (2026-03-28)

This report summarizes what was removed during the professional organization pass and how it was validated.

## Removed Dependencies (`apps/web/package.json`)

- `@react-spring/web`
- `@react-three/drei`
- `@react-three/fiber`
- `class-variance-authority`
- `react-use`
- `web-vitals` (unused declaration in source)

## Removed Source Files (high-confidence unused)

- `apps/web/src/lib/navigation.ts`
- `apps/web/src/modules/home/components/ProductFilterSection.tsx`
- `apps/web/src/components/features/Search.tsx`
- `apps/web/src/components/features/Search/index.ts`
- `apps/web/src/components/ui/SkeletonProductCard/SkeletonProductCard.tsx`
- `apps/web/src/components/ui/SkeletonProductCard/index.ts`
- `apps/web/src/components/skeletons/HeroSkeleton.tsx`
- `apps/web/src/components/hero/KTLHero.tsx`
- `apps/web/src/components/hero/KTLHero/index.ts`
- `apps/web/src/components/hero/HeroVideo.tsx`
- `apps/web/src/components/hero/HeroVideo/index.ts`
- `apps/web/src/components/features/LogoLoop.tsx`
- `apps/web/src/components/features/LogoLoop/index.ts`
- `apps/web/src/components/animation/StaggeredReveal/StaggeredReveal.tsx`
- `apps/web/src/components/animation/StaggeredReveal/index.ts`
- `apps/web/src/components/animation/ScrollReveal/ScrollReveal.tsx`
- `apps/web/src/components/animation/ScrollReveal/index.ts`
- `apps/web/src/components/animation/CountUp/CountUp.tsx`
- `apps/web/src/components/animation/CountUp/index.ts`
- `apps/web/src/components/shared/StarBorder/StarBorder.tsx`
- `apps/web/src/components/shared/StarBorder/index.ts`
- `apps/web/src/components/metrics/MetricsDashboard.example.tsx`
- `apps/web/src/pages/newsroom/stories/index.tsx`
- `apps/web/src/hooks/index.ts`

## Removed Redundant Barrel/Entry Files

- `apps/web/src/modules/rfq/index.tsx` (duplicate module entry)
- `apps/web/src/components/features/BlogCard/index.ts`
- `apps/web/src/components/features/ContactForm/index.ts`
- `apps/web/src/components/features/GoogleMapsLocator/index.ts`
- `apps/web/src/components/features/GoogleBusinessWidget/index.ts`

## Additional Structural/Tooling Changes

- Updated stale Vite manual chunk checks in `apps/web/vite.config.ts`.
- Updated `apps/web/src/components/skeletons/index.ts` to remove deleted export.
- Added route hardening in `apps/web/src/App.tsx` so test routes render only in dev.
- Added baseline and governance documentation:
  - `docs/engineering/REPO_ORGANIZATION_BASELINE_2026-03-28.md`
  - `docs/engineering/REPOSITORY_CONVENTIONS.md`
  - `docs/engineering/DATA_AND_ARCHIVE_GOVERNANCE.md`
- Added CI workflow:
  - `.github/workflows/ci.yml`
- Added env contract:
  - `apps/web/.env.example`
  - typed env in `apps/web/src/vite-env.d.ts`
- Fixed root script recursion by removing self-recursive install scripts from root `package.json`.

## Validation Results

- `npm run lint --workspace=apps/web`: pass (warnings only, no errors)
- `npm run typecheck --workspace=apps/web`: pass
- `npm run test:run --workspace=apps/web`: pass
- `npm run build --workspace=apps/web`: pass

## Notes

- `apps/web/public/sitemap.xml` is now generated automatically on `build` via `prebuild`.
- Existing lint warnings were left as non-blocking to avoid broad functional refactors beyond the cleanup scope.
