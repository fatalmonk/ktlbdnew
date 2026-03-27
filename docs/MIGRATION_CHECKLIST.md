# Repository Reorganization - Migration Checklist

This document tracks the migration from the old repository structure to the new organized structure.

## Completed Migrations

### 1. Top-Level Structure
- ✅ Created `apps/` directory for applications
- ✅ Created `ops/` directory for operations and deployment
- ✅ Created `data/` directory for raw data files
- ✅ Created `archive/` subdirectories for assets and deployments

### 2. Application Code
- ✅ Moved `Version01/project/` → `apps/web/`
- ✅ Updated root `package.json` to use npm workspaces
- ✅ Updated root `vercel.json` with new paths
- ✅ Created shared `tsconfig.base.json` at root
- ✅ Updated `apps/web/tsconfig.*.json` to extend base config
- ✅ Removed `.next` reference from clean script (Vite project)

### 3. Assets Organization
- ✅ Organized `apps/web/public/assets/` with subdirectories:
  - `hero/` - Hero images (except main hero.jpg at root)
  - `logos/` - Logo assets
  - `partners/` - Partner assets
- ✅ Moved legacy assets to `archive/assets/celebpink/`
- ✅ Created manifest for archived assets

### 4. Documentation Reorganization
- ✅ Moved `docs/prd/` → `docs/product/`
- ✅ Moved `docs/architecture/` → `docs/engineering/`
- ✅ Moved developer guides to `docs/engineering/`
- ✅ Moved UX/UI docs to `docs/product/`
- ✅ Moved content docs to `docs/research/`
- ✅ Moved stories to `docs/product/`
- ✅ Updated `docs/README.md` with new structure
- ✅ Moved `apps/web/HERO_IMAGES_GUIDE.md` → `docs/engineering/assets.md`
- ✅ Moved `apps/web/CLAUDE.md` → `docs/engineering/`
- ✅ Moved `apps/web/TESTING.md` → `docs/engineering/`

### 5. Scripts and Data
- ✅ Moved `scripts/archive/` → `scripts/data-ingest/`
- ✅ Created `scripts/README.md`
- ✅ Moved scraped data to `data/raw/celebpink/`
- ✅ Moved deployment scripts to `ops/deployment/hostinger/`

### 6. Archive Organization
- ✅ Moved `Version01/deployments/hostinger/` → `archive/deployments/`
- ✅ Moved `archive/celebpink_assets/` → `archive/assets/celebpink/`
- ✅ Created `archive/assets/celebpink/manifest.json`
- ✅ Updated `archive/README.md`

### 7. Configuration Updates
- ✅ Updated root `package.json` with workspace scripts
- ✅ Updated root `vercel.json` paths
- ✅ Updated `apps/web/package.json` clean script
- ✅ Created shared TypeScript configuration

### 8. Documentation Updates
- ✅ Updated root `README.md` with new structure
- ✅ Updated `apps/web/README.md` with new doc paths
- ✅ Updated `docs/README.md` with new organization

## Path Changes Reference

### Application
- `Version01/project/` → `apps/web/`

### Documentation
- `docs/prd/` → `docs/product/`
- `docs/architecture/` → `docs/engineering/`
- `docs/UX-UI-Enhancement/` → `docs/product/`
- `docs/stories/` → `docs/product/`
- `docs/content/` → `docs/research/`
- `apps/web/HERO_IMAGES_GUIDE.md` → `docs/engineering/assets.md`
- `apps/web/CLAUDE.md` → `docs/engineering/CLAUDE.md`
- `apps/web/TESTING.md` → `docs/engineering/TESTING.md`

### Scripts
- `scripts/archive/` → `scripts/data-ingest/`
- `docs/deployment/scripts/deploy-hostinger.sh` → `ops/deployment/hostinger/`
- `apps/web/deploy.sh` → `ops/deployment/`

### Data
- `archive/celebpink_assets/data/*.json` → `data/raw/celebpink/`

### Archive
- `Version01/deployments/hostinger/` → `archive/deployments/`
- `archive/celebpink_assets/images/` → `archive/assets/celebpink/images/`
- `archive/celebpink_assets/logos/` → `archive/assets/celebpink/logos/`

## Next Steps (If Needed)

1. Update any CI/CD pipelines that reference old paths
2. Update any external documentation or wikis
3. Verify all asset imports still work correctly
4. Test build and deployment processes
5. Remove old `Version01/` directory after verification (if desired)

## Notes

- The main hero image (`hero.jpg`) remains at `apps/web/public/assets/hero.jpg` for backward compatibility
- Other hero images are organized in `apps/web/public/assets/hero/`
- All TypeScript configs now extend the shared base config
- npm workspaces are configured for future monorepo expansion

