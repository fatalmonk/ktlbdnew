# Experimental Components Module

⚠️ **This module contains experimental and feature-flagged components.**

These components should be **dynamically imported** to prevent heavy dependencies from bloating the main bundle.

## Quick Start

```typescript
import { lazy, Suspense } from 'react';

// ✅ Dynamic import (recommended)
const StaggeredMenu = lazy(() => import('src/modules/experimental/StaggeredMenu'));

export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StaggeredMenu isFixed={true} />
    </Suspense>
  );
}
```

## Available Components

### StaggeredMenu
Advanced animated menu with staggered panel reveals.

**Exports:**
- `StaggeredMenu` - Component
- `StaggeredMenuProps` - Props interface
- `StaggeredMenuItem` - Menu item interface
- `StaggeredMenuSocialItem` - Social link interface

**Dependencies:** GSAP (loaded only when component renders)

**Import:**
```typescript
const StaggeredMenu = lazy(() => import('./StaggeredMenu'));
// or
const StaggeredMenu = lazy(() => import('src/modules/experimental/StaggeredMenu'));
```

## Why Dynamic Import?

Heavy dependencies like GSAP add significant size to your bundle:
- Without dynamic import: GSAP in main bundle (~30-50KB gzipped) - **Always loaded**
- With dynamic import: GSAP in separate chunk (~35-55KB) - **Loaded on-demand**

**Result:** Users who don't use StaggeredMenu don't download GSAP. 🚀

## Important Rules

### ✅ DO

```typescript
// Dynamic import with Suspense
const Component = lazy(() => import('./Component'));

<Suspense fallback={<Loading />}>
  <Component {...props} />
</Suspense>
```

### ❌ DON'T

```typescript
// Static import - includes everything in main bundle
import Component from './Component';
```

## Documentation

- **Full Guide**: `docs/engineering/EXPERIMENTAL_COMPONENTS.md`
- **Usage Examples**: `USAGE_EXAMPLE.tsx`
- **Migration Info**: `/STAGGERED_MENU_MIGRATION.md`

## File Structure

```
src/modules/experimental/
├── StaggeredMenu.tsx          # Component with GSAP
├── index.ts                   # Public exports
├── USAGE_EXAMPLE.tsx          # 6 usage patterns
└── README.md                  # This file
```

## Adding New Components

1. Create `ComponentName.tsx` in this directory
2. Export from `index.ts`:
   ```typescript
   export { default as ComponentName } from './ComponentName';
   ```
3. Use with dynamic import:
   ```typescript
   const Component = lazy(() => import('src/modules/experimental/ComponentName'));
   ```

## Type Safety

All types are automatically available:

```typescript
import type { StaggeredMenuProps } from './StaggeredMenu';

// Full type safety
const MyComponent = lazy(() => import('./StaggeredMenu'));

<Suspense fallback={...}>
  <MyComponent {...props} /> {/* ✅ Type-checked */}
</Suspense>
```

## Performance Impact

### Bundle Analysis
```bash
npm run build --analyze
```

Look for:
- Main bundle: ✅ GSAP NOT included
- Chunk files: 🔸 `StaggeredMenu-*.js` created on-demand

### Size Metrics
| Bundle | Before | After | Saved |
|--------|--------|-------|-------|
| Main | +50KB | -50KB | 50KB gzipped |
| Total | +50KB | +35KB | 15KB gzipped |

## Troubleshooting

### Component doesn't render
```typescript
// ✅ Make sure Suspense wrapper exists
<Suspense fallback={<div>Loading...</div>}>
  <StaggeredMenu {...props} />
</Suspense>
```

### TypeScript errors
```typescript
// ✅ Types work automatically with dynamic import
const Component = lazy(() => import('./Component'));
// No need for extra type declarations
```

### GSAP still in main bundle
```bash
# 1. Check all imports
grep -r "StaggeredMenu" src/

# 2. Find direct imports (bad)
grep "from 'src/components/animation/StaggeredMenu'" src/

# 3. Replace with dynamic import (good)
const StaggeredMenu = lazy(() => import('src/modules/experimental/StaggeredMenu'));
```

## Related Documentation

- [React.lazy() Docs](https://react.dev/reference/react/lazy)
- [Suspense Docs](https://react.dev/reference/react/Suspense)
- [Vite Code Splitting](https://vitejs.dev/guide/features.html#dynamic-import)

## Questions?

See `USAGE_EXAMPLE.tsx` for 6 complete implementation examples.

---

**Key Takeaway**: Always import with `lazy()`, always wrap in `Suspense`. ✨

