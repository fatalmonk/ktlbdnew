# Experimental Components Guide

## Overview

The `src/modules/experimental/` directory contains experimental and feature-flagged components that have heavy dependencies (like GSAP). These components are designed to be **dynamically imported** to prevent their dependencies from being included in the main bundle.

## Why Dynamic Import?

Heavy animation libraries like GSAP add significant weight to your bundle:
- **GSAP alone**: ~30-50KB (gzipped)
- **Bundle bloat**: When included in main bundle, all users download it even if not using animated features

By using dynamic imports with `React.lazy()` and `Suspense`, GSAP is only loaded when the component is actually needed, reducing main bundle size.

## Current Experimental Components

### StaggeredMenu
- **Location**: `src/modules/experimental/StaggeredMenu.tsx`
- **Dependencies**: GSAP
- **Purpose**: Advanced menu animation component with staggered panel reveals
- **Exports**:
  - `StaggeredMenu` (component)
  - `StaggeredMenuProps` (interface)
  - `StaggeredMenuItem` (interface)
  - `StaggeredMenuSocialItem` (interface)

## Usage Patterns

### ✅ Recommended: Dynamic Import with React.lazy()

```typescript
import { lazy, Suspense } from 'react';

// Dynamic import - GSAP is NOT included in main bundle
const StaggeredMenu = lazy(() => import('src/modules/experimental/StaggeredMenu'));

export function MyPage() {
  return (
    <Suspense fallback={<div>Loading menu...</div>}>
      <StaggeredMenu
        isFixed={true}
        position="right"
        items={[
          { label: 'Home', ariaLabel: 'Go to home', link: '/' },
          { label: 'About', ariaLabel: 'Go to about', link: '/about' }
        ]}
      />
    </Suspense>
  );
}
```

### ⚠️ Not Recommended: Direct Import

```typescript
// ❌ This includes GSAP in main bundle - avoid!
import StaggeredMenu from 'src/components/animation/StaggeredMenu';
// or
import StaggeredMenu from 'src/modules/experimental/StaggeredMenu';
```

## Implementation Steps

### 1. Import Component Lazily

```typescript
import { lazy, Suspense } from 'react';

const StaggeredMenu = lazy(() => 
  import('src/modules/experimental/StaggeredMenu')
);
```

### 2. Add Suspense Boundary

```typescript
<Suspense fallback={<LoadingFallback />}>
  <StaggeredMenu {...props} />
</Suspense>
```

### 3. Handle Loading State

```typescript
const MenuFallback = () => (
  <div className="animate-pulse bg-gray-200 h-screen" />
);

export function App() {
  return (
    <Suspense fallback={<MenuFallback />}>
      <StaggeredMenu isFixed={true} />
    </Suspense>
  );
}
```

## File Structure

```
src/
├── modules/
│   └── experimental/
│       ├── StaggeredMenu.tsx        # Main component (GSAP-dependent)
│       └── index.ts                 # Exports for module
└── components/
    └── animation/
        ├── StaggeredMenu.tsx        # Re-export (for backward compatibility)
        └── StaggeredMenu/
            └── index.ts             # Re-export (for backward compatibility)
```

## Backward Compatibility

The old import paths still work but are deprecated:

```typescript
// ❌ Deprecated - still works but don't use in new code
import StaggeredMenu from 'src/components/animation/StaggeredMenu';

// ✅ Use this instead (with lazy loading)
const StaggeredMenu = lazy(() => 
  import('src/modules/experimental/StaggeredMenu')
);
```

## Bundle Impact Analysis

### Before Migration (with direct import)
- Main bundle: Includes GSAP (~30-50KB gzipped)
- All users download GSAP regardless of whether they use StaggeredMenu

### After Migration (with dynamic import)
- Main bundle: GSAP excluded ✓
- StaggeredMenu chunk: Created on-demand (~35-55KB gzipped)
- Only downloaded when StaggeredMenu component is rendered

### Expected Savings
- **Main bundle**: -30-50KB (gzipped)
- **User experience**: Faster initial page load
- **Optimal UX**: Only users needing the component download the chunk

## Adding New Experimental Components

1. Create component in `src/modules/experimental/ComponentName.tsx`
2. Export types and component
3. Update `src/modules/experimental/index.ts` with exports
4. Use with dynamic import:

```typescript
const MyComponent = lazy(() => 
  import('src/modules/experimental/MyComponent')
);
```

## Troubleshooting

### Component doesn't render
- Ensure `Suspense` wrapper is present
- Check browser console for import errors
- Verify file path in import statement

### TypeScript errors
- Types are automatically inferred from dynamic import
- For explicit typing:

```typescript
const StaggeredMenu = lazy(() => 
  import('src/modules/experimental/StaggeredMenu').then(m => ({ 
    default: m.default 
  }))
) as React.LazyExoticComponent<React.ComponentType<StaggeredMenuProps>>;
```

### GSAP still in main bundle
- Check all imports using grep: `grep -r "import.*StaggeredMenu" src/`
- Ensure all usages use dynamic imports
- Verify no direct imports in critical path

## Best Practices

1. **Always use dynamic imports** for experimental components
2. **Add appropriate fallback UI** in Suspense boundary
3. **Handle error states** with Error Boundaries
4. **Test lazy loading** in production builds
5. **Monitor bundle size** with build analysis tools
6. **Document why** component is experimental
7. **Plan graduation** path when component becomes stable

## See Also

- [React Documentation: Code Splitting](https://react.dev/reference/react/lazy)
- [React Documentation: Suspense](https://react.dev/reference/react/Suspense)
- [Architecture Guide](./architecture.md)
- [Performance Optimization](./PERFORMANCE_OPTIMIZATION_SUMMARY.md)

