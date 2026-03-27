# Repository Organization Baseline (2026-03-28)

This document captures the pre-cleanup baseline for structure, routes, dependencies, and unused-candidate inventory before applying reorganization changes.

## 1) Repository Structure Baseline

- `apps/web`: production React + Vite application.
- `docs`: engineering/product/seo/deployment documentation.
- `scripts`: utility scripts (data ingestion, one-off operations).
- `ops`: deployment scripts.
- `archive`: legacy deployment/history artifacts.
- Root workspace management via `package.json` and `tsconfig.base.json`.

## 2) Route Graph Baseline (`apps/web/src/App.tsx`)

### Main routes
- `/`
- `/products`, `/products/denims`, `/products/knitwear`, `/products/swimwear`, `/products/kids`
- `/contact`
- `/company/our-story`, `/company/leadership`, `/company/governance`, `/company/sustainability`
- `/facilities/rmg`, `/facilities/washing`, `/facilities/tech`, `/facilities/agro`, `/facilities/shipping`
- `/work-with-us/buyers`, `/work-with-us/vendors`, `/work-with-us/careers`
- `/newsroom/press`, `/newsroom/stories`, `/newsroom/stories/:slug`, `/newsroom/psi`, `/newsroom/media-kit`
- `/investors`, `/investors/overview`, `/investors/stock`, `/investors/reports/quarterly`, `/investors/reports/annual`, `/investors/reports/psi`, `/investors/contacts`
- `/case-studies`, `/case-studies/:slug`
- `/certifications`
- `/sustainability`
- `/rfq`

### Dev/test routes currently in router
- `/test/animation`
- `/test/responsive-hooks`
- `/test/metrics`

## 3) Dependency Baseline (`apps/web/package.json`)

### Runtime libraries
- React, React DOM, React Router
- Framer Motion + Motion
- GSAP
- UI helpers: `clsx`, `tailwind-merge`, `tw-animate-css`
- Additional libraries present: `@react-spring/web`, `@react-three/drei`, `@react-three/fiber`, `react-use`, `class-variance-authority`

### Tooling
- Vite, TypeScript, ESLint, Vitest, Playwright, Tailwind/PostCSS
- `sharp`, `terser`, `web-vitals`

## 4) Unused/Redundant Candidate Inventory

Confidence levels:
- `high`: static reference checks indicate safe removal candidate
- `medium`: likely unused but requires product/route verification
- `low`: keep, monitor, or needs runtime/manual validation

### High-confidence candidates (pre-change)

#### Dependencies
- `@react-spring/web` (no source imports found)
- `@react-three/drei` (no source imports found)
- `@react-three/fiber` (no source imports found)
- `react-use` (no source imports found)
- `class-variance-authority` (no `cva` usage found)
- `web-vitals` (declared but not used in app source)

#### Source files/components
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
- `apps/web/src/pages/newsroom/stories/index.tsx` (not used by router)
- `apps/web/src/hooks/index.ts`

### Medium-confidence candidates (verify before removal)
- `apps/web/src/modules/experimental/*` and deprecated re-export shims under `components/animation/StaggeredMenu/*` (experiment may be intentionally preserved).
- Dev/test pages and routes under `apps/web/src/pages/test/*` if these are not meant for production.
- Root script aliases (`dev:web`, `build:web`, etc.) in root `package.json` (redundant, but may be kept for convenience).

### Low-confidence / policy candidates
- `archive/*` historical artifacts (organizational decision: keep read-only in-repo vs move externally).
- `apps/web/public/data/*` versus `apps/web/src/data/*` ownership (requires explicit governance policy).

## 5) Validation Gates For Cleanup

Run after each removal/restructure batch:
- `npm run lint --workspace=apps/web`
- `npm run typecheck --workspace=apps/web`
- `npm run test:run --workspace=apps/web`
- `npm run build --workspace=apps/web`

## 6) Execution Notes

- Remove only high-confidence items first.
- Keep medium/low items until ownership or production intent is explicitly documented.
- Preserve archive and docs unless policy changes are completed in governance phase.
