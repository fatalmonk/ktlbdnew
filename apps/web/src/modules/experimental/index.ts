/**
 * Experimental Module
 * 
 * This module contains experimental/feature-flagged components.
 * These components are dynamically imported to prevent heavy dependencies
 * (like GSAP) from being included in the main bundle.
 * 
 * Usage:
 * const StaggeredMenu = lazy(() => import('src/modules/experimental/StaggeredMenu'));
 */

export { default as StaggeredMenu, type StaggeredMenuProps } from './StaggeredMenu';

