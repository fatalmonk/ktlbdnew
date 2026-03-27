/**
 * StaggeredMenu Usage Examples
 * 
 * This file demonstrates the recommended ways to use the StaggeredMenu component
 * with dynamic imports to prevent GSAP from being included in the main bundle.
 */

import { Suspense, lazy } from 'react';

// ✅ RECOMMENDED: Dynamic import to avoid GSAP in main bundle
const StaggeredMenu = lazy(() => import('./StaggeredMenu'));

/**
 * Example 1: Basic Usage with Loading Fallback
 */
export function BasicExample() {
  return (
    <Suspense fallback={<div className="bg-neutral-100 h-screen animate-pulse" />}>
      <StaggeredMenu
        isFixed={true}
        position="right"
        items={[
          { label: 'Home', ariaLabel: 'Navigate to home', link: '/' },
          { label: 'About', ariaLabel: 'Navigate to about', link: '/about' },
          { label: 'Contact', ariaLabel: 'Navigate to contact', link: '/contact' }
        ]}
      />
    </Suspense>
  );
}

/**
 * Example 2: With Custom Colors and Social Links
 */
export function AdvancedExample() {
  return (
    <Suspense fallback={<MenuLoadingState />}>
      <StaggeredMenu
        isFixed={true}
        position="right"
        colors={['#B19EEF', '#5227FF', '#FF6B9D']}
        items={[
          { label: 'Home', ariaLabel: 'Navigate to home', link: '/' },
          { label: 'About', ariaLabel: 'Navigate to about', link: '/about' },
          { label: 'Services', ariaLabel: 'Navigate to services', link: '/services' },
          { label: 'Contact', ariaLabel: 'Navigate to contact', link: '/contact' }
        ]}
        socialItems={[
          { label: 'Twitter', link: 'https://twitter.com' },
          { label: 'LinkedIn', link: 'https://linkedin.com' },
          { label: 'GitHub', link: 'https://github.com' }
        ]}
        displaySocials={true}
        displayItemNumbering={true}
        accentColor="#5227FF"
        menuButtonColor="#ffffff"
        openMenuButtonColor="#000000"
        changeMenuColorOnOpen={true}
        onMenuOpen={() => console.log('Menu opened')}
        onMenuClose={() => console.log('Menu closed')}
      />
    </Suspense>
  );
}

/**
 * Example 3: Left-Positioned Menu with Callbacks
 */
export function LeftAlignedExample() {
  const handleMenuOpen = () => {
    // Lock body scroll or other side effects
    document.body.style.overflow = 'hidden';
  };

  const handleMenuClose = () => {
    // Unlock body scroll
    document.body.style.overflow = 'auto';
  };

  return (
    <Suspense fallback={<MenuLoadingState />}>
      <StaggeredMenu
        isFixed={true}
        position="left"
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        items={[
          { label: 'Products', ariaLabel: 'View products', link: '/products' },
          { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
          { label: 'Blog', ariaLabel: 'Read our blog', link: '/blog' },
          { label: 'Contact', ariaLabel: 'Contact us', link: '/contact' }
        ]}
        displayItemNumbering={false}
        accentColor="#e94560"
        onMenuOpen={handleMenuOpen}
        onMenuClose={handleMenuClose}
      />
    </Suspense>
  );
}

/**
 * Example 4: Conditional Rendering
 */
export function ConditionalExample({ showMenu = true }: { showMenu?: boolean }) {
  if (!showMenu) {
    return null;
  }

  return (
    <Suspense fallback={<MenuLoadingState />}>
      <StaggeredMenu
        isFixed={true}
        position="right"
        items={[
          { label: 'Home', ariaLabel: 'Navigate to home', link: '/' },
          { label: 'Services', ariaLabel: 'Navigate to services', link: '/services' }
        ]}
      />
    </Suspense>
  );
}

/**
 * Example 5: Custom Loading State Component
 */
function MenuLoadingState() {
  return (
    <div className="fixed top-0 right-0 h-screen w-1/3 bg-gradient-to-l from-gray-100 to-gray-50 animate-pulse flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-8 h-8 border-4 border-neutral-300 border-t-gray-600 rounded-full animate-spin" />
        <p className="text-neutral-600 mt-4">Loading menu...</p>
      </div>
    </div>
  );
}

/**
 * Example 6: With Error Boundary (for production)
 */
import { Component, ReactNode } from 'react';

class MenuErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Menu failed to load:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed top-0 right-0 h-screen w-1/3 bg-neutral-100 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 font-semibold">Failed to load menu</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export function ProductionExample() {
  return (
    <MenuErrorBoundary>
      <Suspense fallback={<MenuLoadingState />}>
        <StaggeredMenu
          isFixed={true}
          position="right"
          items={[
            { label: 'Home', ariaLabel: 'Navigate to home', link: '/' },
            { label: 'Products', ariaLabel: 'View products', link: '/products' },
            { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
            { label: 'Contact', ariaLabel: 'Contact us', link: '/contact' }
          ]}
        />
      </Suspense>
    </MenuErrorBoundary>
  );
}

/**
 * KEY POINTS TO REMEMBER:
 * 
 * 1. Always import with lazy() and dynamic import():
 *    const StaggeredMenu = lazy(() => import('./StaggeredMenu'));
 * 
 * 2. Always wrap in Suspense boundary:
 *    <Suspense fallback={<Fallback />}>
 *      <StaggeredMenu {...props} />
 *    </Suspense>
 * 
 * 3. Provide meaningful loading fallback UI
 * 
 * 4. Optionally wrap with Error Boundary for production
 * 
 * 5. This prevents GSAP from being in the main bundle
 *    - Main bundle size reduced by ~30-50KB (gzipped)
 *    - GSAP only loaded when StaggeredMenu is used
 *    - Better performance for users not using this component
 * 
 * 6. For TypeScript, types are auto-inferred from dynamic import
 */

