/**
 * Mobile Performance Utilities
 *
 * Device detection and performance optimization utilities for mobile devices.
 * Used to conditionally disable or reduce complex animations and effects
 * on mobile and low-end devices.
 */

interface NetworkInformation {
  effectiveType?: '2g' | '3g' | '4g' | 'slow-2g';
}

/**
 * Check if the current device is a mobile device
 * @returns true if device is mobile (smartphone or tablet)
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;

  // Check for touch capability (more reliable than UA)
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Check user agent for mobile devices
  const userAgent =
    navigator.userAgent || navigator.vendor || (window as { opera?: string }).opera || '';
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );

  // Check screen width (fallback)
  const isSmallScreen = window.innerWidth <= 768;

  return hasTouch && (isMobileUA || isSmallScreen);
}

/**
 * Check if the current device is a low-end device
 * @returns true if device has limited hardware capabilities
 */
export function isLowEndDevice(): boolean {
  if (typeof window === 'undefined') return false;

  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 1;

  // Check memory (if available - not all browsers support this)
  const memory =
    ('deviceMemory' in navigator
      ? (navigator as { deviceMemory?: number }).deviceMemory
      : undefined) || 4;

  // Check connection speed (if available)
  const connection =
    ('connection' in navigator
      ? (navigator as { connection?: NetworkInformation }).connection
      : undefined) ||
    ('mozConnection' in navigator
      ? (navigator as { mozConnection?: NetworkInformation }).mozConnection
      : undefined) ||
    ('webkitConnection' in navigator
      ? (navigator as { webkitConnection?: NetworkInformation }).webkitConnection
      : undefined);
  const isSlowConnection =
    connection && (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g');

  return cores <= 2 || memory <= 2 || isSlowConnection || false;
}

/**
 * Get optimized animation configuration based on device capabilities
 * @returns Configuration object with optimization flags
 */
export function getOptimizedAnimationConfig() {
  const isMobile = isMobileDevice();
  const isLowEnd = isLowEndDevice();

  return {
    enableParallax: !isMobile, // Disable parallax on mobile
    enable3DTransforms: !isLowEnd, // Disable 3D transforms on low-end devices
    enableComplexAnimations: !isLowEnd, // Simplify animations on low-end devices
    particleCount: isLowEnd ? 20 : isMobile ? 50 : 100, // Reduce particle count
    animationDuration: isLowEnd ? 0.2 : 0.5, // Faster animations on low-end
    enableTilt: !isMobile, // Disable tilt effects on mobile
    enableHoverEffects: !isMobile, // Disable hover-only effects on mobile
  };
}

/**
 * Get device performance tier
 * @returns 'high' | 'medium' | 'low'
 */
export function getDevicePerformanceTier(): 'high' | 'medium' | 'low' {
  if (typeof window === 'undefined') return 'medium';

  const isLowEnd = isLowEndDevice();
  const isMobile = isMobileDevice();

  if (isLowEnd) return 'low';
  if (isMobile) return 'medium';
  return 'high';
}
