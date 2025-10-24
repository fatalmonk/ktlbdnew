import React, { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
  sizes?: string;
  priority?: boolean;
  onLoad?: () => void;
}

/**
 * OptimizedImage component with lazy loading and WebP support
 *
 * Features:
 * - Automatic WebP conversion with JPEG fallback
 * - Responsive image loading based on viewport
 * - Lazy loading with Intersection Observer
 * - Loading blur effect
 * - Error handling
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  eager = false,
  sizes = '100vw',
  priority = false,
  onLoad,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(eager || priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Extract filename without extension
  const getImagePath = (imagePath: string) => {
    // Remove /assets/ prefix and file extension
    const pathWithoutAssets = imagePath.replace('/assets/', '');
    const pathWithoutExt = pathWithoutAssets.replace(/\.(jpg|jpeg|png|gif)$/i, '');
    return pathWithoutExt;
  };

  const imagePath = getImagePath(src);

  // Generate srcSet for responsive images
  const srcSet = {
    webp: `
      /assets-optimized/${imagePath}-mobile.webp 640w,
      /assets-optimized/${imagePath}-tablet.webp 1024w,
      /assets-optimized/${imagePath}-desktop.webp 1920w,
      /assets-optimized/${imagePath}.webp 2400w
    `,
    fallback: `
      /assets${src.replace('/assets', '')}`
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (eager || priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [eager, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    console.warn(`Failed to load image: ${src}`);
  };

  return (
    <picture ref={imgRef} className={className}>
      {isInView && !hasError && (
        <>
          {/* WebP source with responsive sizes */}
          <source
            type="image/webp"
            srcSet={srcSet.webp}
            sizes={sizes}
          />

          {/* Fallback image */}
          <img
            src={srcSet.fallback}
            alt={alt}
            loading={eager || priority ? 'eager' : 'lazy'}
            onLoad={handleLoad}
            onError={handleError}
            className={`
              ${className}
              transition-opacity duration-500
              ${isLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            style={{
              filter: isLoaded ? 'none' : 'blur(10px)',
            }}
          />
        </>
      )}

      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div
          className={`${className} bg-gray-200 animate-pulse`}
          style={{ minHeight: '200px' }}
        />
      )}

      {/* Error fallback */}
      {hasError && (
        <div
          className={`${className} bg-gray-100 flex items-center justify-center text-gray-400`}
          style={{ minHeight: '200px' }}
        >
          <span>Image not available</span>
        </div>
      )}
    </picture>
  );
};

export default OptimizedImage;
