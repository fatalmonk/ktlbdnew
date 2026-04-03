import React, { useState, useEffect } from 'react';
import {
  useMediaQuery,
  useBreakpoint,
  useViewportHeight,
  useResponsive,
} from '../../hooks/useResponsive';

/**
 * Component to safely read CSS custom property value (client-side only)
 */
const ViewportHeightCSSValue: React.FC = () => {
  const [vhValue, setVhValue] = useState<string>('Loading...');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const value =
        getComputedStyle(document.documentElement).getPropertyValue('--vh') || 'Not set';
      setVhValue(value);

      // Update on resize
      const updateVh = () => {
        const newValue =
          getComputedStyle(document.documentElement).getPropertyValue('--vh') || 'Not set';
        setVhValue(newValue);
      };

      window.addEventListener('resize', updateVh);
      return () => window.removeEventListener('resize', updateVh);
    }
  }, []);

  return <>{vhValue}</>;
};

/**
 * Test Component for Story 4.2 - Responsive Hooks
 *
 * This component demonstrates and tests all responsive hooks:
 * - useMediaQuery
 * - useBreakpoint
 * - useViewportHeight
 * - useResponsive
 */
const ResponsiveHooksTest: React.FC = () => {
  // Test useMediaQuery
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  // Test useBreakpoint
  const breakpointInfo = useBreakpoint();

  // Test useViewportHeight
  const viewportHeight = useViewportHeight();

  // Test useResponsive (combined)
  const responsiveInfo = useResponsive();

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-6">Responsive Hooks Test (Story 4.2)</h2>

      {/* useMediaQuery Tests */}
      <section className="mb-6 p-4 bg-neutral-50 rounded">
        <h3 className="text-lg font-semibold mb-3">useMediaQuery Tests</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${isDesktop ? 'bg-green-500' : 'bg-red-500'}`} />
            <span>Desktop (≥1024px): {isDesktop ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${isTablet ? 'bg-green-500' : 'bg-red-500'}`} />
            <span>Tablet (768-1023px): {isTablet ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${prefersDark ? 'bg-green-500' : 'bg-red-500'}`}
            />
            <span>Prefers Dark Mode: {prefersDark ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${prefersReducedMotion ? 'bg-green-500' : 'bg-red-500'}`}
            />
            <span>Prefers Reduced Motion: {prefersReducedMotion ? 'Yes' : 'No'}</span>
          </div>
        </div>
      </section>

      {/* useBreakpoint Tests */}
      <section className="mb-6 p-4 bg-blue-50 rounded">
        <h3 className="text-lg font-semibold mb-3">useBreakpoint Tests</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <div>
            <strong>Current:</strong>{' '}
            <span className="text-blue-600">{breakpointInfo.breakpoint}</span>
          </div>
          <div>
            <strong>XS:</strong> {breakpointInfo.isXs ? '✓' : '✗'}
          </div>
          <div>
            <strong>SM:</strong> {breakpointInfo.isSm ? '✓' : '✗'}
          </div>
          <div>
            <strong>MD:</strong> {breakpointInfo.isMd ? '✓' : '✗'}
          </div>
          <div>
            <strong>LG:</strong> {breakpointInfo.isLg ? '✓' : '✗'}
          </div>
          <div>
            <strong>XL:</strong> {breakpointInfo.isXl ? '✓' : '✗'}
          </div>
          <div>
            <strong>Mobile:</strong> {breakpointInfo.isMobile ? '✓' : '✗'}
          </div>
          <div>
            <strong>Desktop:</strong> {breakpointInfo.isDesktop ? '✓' : '✗'}
          </div>
          <div>
            <strong>Tablet:</strong> {breakpointInfo.isTablet ? '✓' : '✗'}
          </div>
        </div>
      </section>

      {/* useViewportHeight Tests */}
      <section className="mb-6 p-4 bg-green-50 rounded">
        <h3 className="text-lg font-semibold mb-3">useViewportHeight Tests</h3>
        <div className="space-y-2 text-sm">
          <div>
            <strong>Viewport Height:</strong>{' '}
            <span className="text-green-600">{viewportHeight}px</span>
          </div>
          <div>
            <strong>CSS --vh value:</strong>{' '}
            <span className="text-green-600 font-mono">
              <ViewportHeightCSSValue />
            </span>
          </div>
          <div className="mt-4 p-3 bg-white rounded border border-green-200">
            <p className="text-xs text-neutral-600 mb-2">
              Test CSS usage:{' '}
              <code className="bg-neutral-100 px-1 rounded">
                height: calc(var(--vh, 1vh) * 100)
              </code>
            </p>
            <div
              className="bg-green-500 text-white p-2 rounded text-center"
              style={{ height: 'calc(var(--vh, 1vh) * 20)' }}
            >
              This box height = 20vh (uses --vh custom property)
            </div>
          </div>
        </div>
      </section>

      {/* useResponsive Tests */}
      <section className="mb-6 p-4 bg-purple-50 rounded">
        <h3 className="text-lg font-semibold mb-3">useResponsive (Combined) Tests</h3>
        <div className="space-y-2 text-sm">
          <div>
            <strong>Breakpoint:</strong>{' '}
            <span className="text-purple-600">{responsiveInfo.breakpoint}</span>
          </div>
          <div>
            <strong>Is Mobile:</strong> {responsiveInfo.isMobile ? '✓' : '✗'}
          </div>
          <div>
            <strong>Viewport Height:</strong>{' '}
            <span className="text-purple-600">{responsiveInfo.viewportHeight}px</span>
          </div>
          <div>
            <strong>Matches (min-width: 768px):</strong>{' '}
            {responsiveInfo.matches('(min-width: 768px)') ? '✓' : '✗'}
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section className="p-4 bg-yellow-50 rounded border border-yellow-200">
        <h3 className="text-lg font-semibold mb-2">Testing Instructions</h3>
        <ul className="text-sm space-y-1 list-disc list-inside text-neutral-700">
          <li>Resize the browser window to test breakpoint changes</li>
          <li>Check mobile viewport height by resizing or using device emulation</li>
          <li>Verify CSS --vh property is set in DevTools (Elements → :root → --vh)</li>
          <li>Test on actual mobile device to verify Visual Viewport API support</li>
          <li>Check browser console for any errors or warnings</li>
        </ul>
      </section>
    </div>
  );
};

export default ResponsiveHooksTest;
