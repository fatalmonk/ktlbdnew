import { useViewportHeight } from '../hooks/useResponsive';

/**
 * ViewportHeightInit Component
 *
 * Initializes the viewport height fix globally by calling useViewportHeight.
 * This component should be placed high in the component tree (e.g., in App.tsx)
 * to ensure the --vh CSS custom property is set early.
 *
 * The hook automatically:
 * - Sets --vh CSS custom property for mobile viewport height calculations
 * - Handles Visual Viewport API for mobile browsers
 * - Updates on resize, orientation change, and browser UI show/hide
 */
const ViewportHeightInit: React.FC = () => {
  // Initialize viewport height hook - this sets the --vh CSS variable
  useViewportHeight({ includeMobileFix: true });

  // This component doesn't render anything
  return null;
};

export default ViewportHeightInit;
