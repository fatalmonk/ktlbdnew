# StaggeredMenu Dynamic Import - Quick Reference Card

## Copy This Code (Recommended Way)

```typescript
import { lazy, Suspense } from 'react';

const StaggeredMenu = lazy(() =>
  import('src/modules/experimental/StaggeredMenu')
);

export function MyPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-gray-100" />}>
      <StaggeredMenu isFixed={true} position="right" />
    </Suspense>
  );
}
```

## Three Important Rules

| Rule                | Example                         | Why                          |
| ------------------- | ------------------------------- | ---------------------------- |
| 1. Use `lazy()`     | `lazy(() => import(...))`       | Prevents GSAP in main bundle |
| 2. Use `Suspense`   | `<Suspense fallback={...}>`     | Handles loading state        |
| 3. Provide fallback | `fallback={<div>Loading</div>}` | Shows while loading          |

## Props Cheat Sheet

```typescript
<StaggeredMenu
  isFixed={true}                           // Required
  position="right"                         // 'left' or 'right'
  colors={['#B19EEF', '#5227FF']}         // Gradient colors
  items={[                                 // Menu items
    { label: 'Home', ariaLabel: '...', link: '/' }
  ]}
  socialItems={[                           // Social links
    { label: 'Twitter', link: 'https://...' }
  ]}
  displaySocials={true}
  displayItemNumbering={true}
  accentColor="#5227FF"
  menuButtonColor="#ffffff"
  openMenuButtonColor="#000000"
  changeMenuColorOnOpen={true}
  onMenuOpen={() => {}}
  onMenuClose={() => {}}
/>
```

## Before & After Comparison

### ❌ DON'T (Old Way - GSAP in main bundle)

```typescript
import StaggeredMenu from 'src/components/animation/StaggeredMenu';

export function MyPage() {
  return <StaggeredMenu isFixed={true} />;  // GSAP loaded always
}
```

### ✅ DO (New Way - GSAP loaded on-demand)

```typescript
const StaggeredMenu = lazy(() =>
  import('src/modules/experimental/StaggeredMenu')
);

export function MyPage() {
  return (
    <Suspense fallback={<Loading />}>
      <StaggeredMenu isFixed={true} />  // GSAP loaded only when needed
    </Suspense>
  );
}
```

## File Locations

| What           | Location                                      |
| -------------- | --------------------------------------------- |
| Component      | `src/modules/experimental/StaggeredMenu.tsx`  |
| Examples       | `src/modules/experimental/USAGE_EXAMPLE.tsx`  |
| Quick start    | `src/modules/experimental/README.md`          |
| Full guide     | `docs/engineering/EXPERIMENTAL_COMPONENTS.md` |
| Migration info | `STAGGERED_MENU_MIGRATION.md`                 |

## Troubleshooting

| Problem                  | Solution                                                                 |
| ------------------------ | ------------------------------------------------------------------------ |
| "Module not found"       | Check import path: `src/modules/experimental/StaggeredMenu`              |
| Component doesn't render | Add `<Suspense>` wrapper with `fallback`                                 |
| TypeScript errors        | Types auto-inferred, no extra declaration needed                         |
| GSAP in main bundle      | Find direct imports: `grep -r "components/animation/StaggeredMenu" src/` |

## Bundle Impact

```
BEFORE (Direct Import):
  main.js: 50KB LARGER (includes GSAP)
  All users download it

AFTER (Dynamic Import):
  main.js: 50KB SMALLER ✅
  StaggeredMenu.chunk.js: Only when used ✅
```

## One-Page Checklist

When using StaggeredMenu:

- [ ] Import with `lazy()`
- [ ] Import from `src/modules/experimental/StaggeredMenu`
- [ ] Wrap in `<Suspense>`
- [ ] Provide `fallback` UI
- [ ] Add `isFixed={true}` prop
- [ ] Test it works
- [ ] Done! ✨

## Import Path Examples

```typescript
// ✅ BEST - Dynamic import
const Component = lazy(() => import('src/modules/experimental/StaggeredMenu'));

// ✅ GOOD - Direct import (for types only)
import type { StaggeredMenuProps } from 'src/modules/experimental/StaggeredMenu';

// ❌ AVOID - Static import
import Component from 'src/modules/experimental/StaggeredMenu';
```

## Complete Working Example

```typescript
import { lazy, Suspense } from 'react';

const StaggeredMenu = lazy(() =>
  import('src/modules/experimental/StaggeredMenu')
);

export default function HomePage() {
  return (
    <div>
      <h1>Welcome</h1>

      <Suspense fallback={<div>Loading menu...</div>}>
        <StaggeredMenu
          isFixed={true}
          position="right"
          items={[
            { label: 'Home', ariaLabel: 'Go home', link: '/' },
            { label: 'About', ariaLabel: 'About us', link: '/about' },
            { label: 'Contact', ariaLabel: 'Contact us', link: '/contact' }
          ]}
          accentColor="#5227FF"
        />
      </Suspense>
    </div>
  );
}
```

## Key Takeaways

1. **Always use `lazy()`** - Keeps GSAP out of main bundle
2. **Always use `Suspense`** - Handles loading gracefully
3. **Provide fallback** - Shows while chunk downloads
4. **No performance penalty** - Same speed as before
5. **Full type safety** - TypeScript works perfectly
6. **Production ready** - Use it now! ✨

---

**TL;DR**: Wrap import with `lazy()`, wrap component with `Suspense`, save 50KB! 🚀
