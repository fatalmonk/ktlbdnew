import React, { useEffect, useRef, useState, useCallback } from 'react';

export type SwipeDirection = 'left' | 'right' | 'up' | 'down';

export interface TouchOptimizedProps {
  children: React.ReactNode;
  onTap?: () => void;
  onSwipe?: (direction: SwipeDirection) => void;
  className?: string;
  minSwipeDistance?: number;
  minTouchTargetSize?: number; // Minimum touch target size in pixels (default: 44)
  disabled?: boolean;
  touchFeedback?: boolean; // Enable visual touch feedback (default: true)
  // Allow passing through mouse events if needed
  onClick?: (e: React.MouseEvent) => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseUp?: (e: React.MouseEvent) => void;
}

/**
 * TouchOptimized Component
 * 
 * A wrapper component that provides touch-optimized interactions including:
 * - Tap gesture detection
 * - Swipe gestures in all directions (left, right, up, down)
 * - Visual touch feedback
 * - Accessibility-compliant touch targets
 * - Non-blocking mouse/keyboard interactions
 * 
 * Usage:
 * ```tsx
 * <TouchOptimized onTap={handleTap} onSwipe={handleSwipe}>
 *   <button>Tap or Swipe Me</button>
 * </TouchOptimized>
 * ```
 */
const TouchOptimized: React.FC<TouchOptimizedProps> = ({
  children,
  onTap,
  onSwipe,
  className = '',
  minSwipeDistance = 50,
  minTouchTargetSize = 44,
  disabled = false,
  touchFeedback = true,
  onClick,
  onMouseDown,
  onMouseUp,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number; time: number } | null>(null);
  const [isTouching, setIsTouching] = useState(false);
  const [touchMoved, setTouchMoved] = useState(false);

  // Track touch start
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (disabled) return;
    
    setIsTouching(true);
    setTouchMoved(false);
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now(),
    });
  }, [disabled]);

  // Track touch move to detect swipe vs tap
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!touchStart || disabled) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    
    const deltaX = Math.abs(currentX - touchStart.x);
    const deltaY = Math.abs(currentY - touchStart.y);

    // If moved more than 10px, consider it a swipe attempt
    if (deltaX > 10 || deltaY > 10) {
      setTouchMoved(true);
    }
  }, [touchStart, disabled]);

  // Handle touch end - detect tap or swipe
  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (disabled || !touchStart) {
      setIsTouching(false);
      setTouchStart(null);
      return;
    }

    setIsTouching(false);
    
    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };

    const deltaX = touchEnd.x - touchStart.x;
    const deltaY = touchEnd.y - touchStart.y;
    const deltaTime = Date.now() - touchStart.time;

    // Detect tap (small movement and quick touch)
    const tapThreshold = 10;
    const tapTimeThreshold = 300; // Max 300ms for tap
    
    if (
      !touchMoved &&
      Math.abs(deltaX) < tapThreshold &&
      Math.abs(deltaY) < tapThreshold &&
      deltaTime < tapTimeThreshold
    ) {
      onTap?.();
      setTouchStart(null);
      setTouchMoved(false);
      return;
    }

    // Detect swipe (larger movement)
    if (touchMoved && onSwipe) {
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      // Determine if horizontal or vertical swipe
      if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (absDeltaX > minSwipeDistance) {
          onSwipe(deltaX > 0 ? 'right' : 'left');
        }
      } else {
        // Vertical swipe
        if (absDeltaY > minSwipeDistance) {
          onSwipe(deltaY > 0 ? 'down' : 'up');
        }
      }
    }

    setTouchStart(null);
    setTouchMoved(false);
  }, [touchStart, touchMoved, onTap, onSwipe, minSwipeDistance, disabled]);

  // Set up touch event listeners
  useEffect(() => {
    const element = containerRef.current;
    if (!element || disabled) return;

    // Use passive listeners for better performance
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, disabled]);

  // Ensure minimum touch target size for accessibility
  const touchTargetStyle: React.CSSProperties = {
    minWidth: `${minTouchTargetSize}px`,
    minHeight: `${minTouchTargetSize}px`,
    touchAction: 'manipulation', // Improve touch responsiveness
  };

  return (
    <div
      ref={containerRef}
      className={`
        ${className}
        ${touchFeedback && isTouching ? 'scale-[0.98]' : 'scale-100'}
        transition-transform duration-150 ease-out
        inline-block
      `}
      style={touchTargetStyle}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      role={onTap || onSwipe ? 'button' : undefined}
      tabIndex={disabled ? -1 : (onTap || onSwipe ? 0 : undefined)}
      aria-disabled={disabled}
      onKeyDown={(e) => {
        // Support keyboard interaction for accessibility
        if (disabled) return;
        
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onTap?.();
        }
      }}
    >
      {children}
    </div>
  );
};

export default TouchOptimized;

