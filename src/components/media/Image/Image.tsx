import React, { useState, useEffect, useRef } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  eager?: boolean;
  priority?: boolean;
  sizes?: string;
  width?: number | string;
  height?: number | string;
  fit?: 'cover' | 'contain';
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Unified Image component combining features from OptimizedImage, ResponsiveImage, and ImageX
 *
 * Features:
 * - Automatic WebP conversion with JPEG fallback
 * - Responsive image loading based on viewport
 * - Lazy loading with Intersection Observer
 * - Loading blur effect and error handling
 * - Support for both optimized and simple image loading
 * - Aspect ratio containers to prevent CLS
 */
const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  eager = false,
  priority = false,
  sizes = '100vw',
  width,
  height,
  fit = 'cover',
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(eager || priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Determine if this is an optimized image (has WebP variants)
  const isOptimizedImage = src.includes('/assets/') && !src.includes('http');

  // Extract filename without extension for optimized images
  const getImagePath = (imagePath: string) => {
    const pathWithoutAssets = imagePath.replace('/assets/', '');
    const pathWithoutExt = pathWithoutAssets.replace(/\.(jpg|jpeg|png|gif)$/i, '');
    return pathWithoutExt;
  };

  // Build absolute path for simple images
  const getAbsoluteSrc = (imageSrc: string) => {
    if (!imageSrc) return '';
    if (imageSrc.startsWith('http://') || imageSrc.startsWith('https://')) return imageSrc;
    if (imageSrc.startsWith('./assets/') || imageSrc.startsWith('/assets/')) return imageSrc;
    return `./assets/${imageSrc}`;
  };

  const imagePath = isOptimizedImage ? getImagePath(src) : '';
  const absoluteSrc = !isOptimizedImage ? getAbsoluteSrc(src) : src;

  // Generate srcSet for optimized responsive images
  const srcSet = isOptimizedImage ? {
    webp: `
      /assets-optimized/${imagePath}-mobile.webp 640w,
      /assets-optimized/${imagePath}-tablet.webp 1024w,
      /assets-optimized/${imagePath}-desktop.webp 1920w,
      /assets-optimized/${imagePath}.webp 2400w
    `,
    fallback: `/assets${src.replace('/assets', '')}`
  } : null;

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
        rootMargin: '50px',
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
    onError?.();
    console.warn(`Failed to load image: ${src}`);
  };

  // Simple image rendering (non-optimized)
  if (!isOptimizedImage) {
    if (hasError || !absoluteSrc) {
      return null;
    }

    const img = (
      <img
        ref={imgRef}
        src={absoluteSrc}
        alt={alt}
        className={`${className} ${fit === 'contain' ? 'object-contain' : 'object-cover'}`}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={handleLoad}
        onError={handleError}
        sizes={sizes}
      />
    );

    // If explicit dimensions provided, wrap with aspect ratio container
    if (width && height) {
      const aspectRatio = `${width}/${height}`;
      return (
        <div className={`${containerClassName} aspect-[${aspectRatio}]`}>
          {img}
        </div>
      );
    }

    return img;
  }

  // Optimized image rendering (with WebP support)
  return (
    <picture ref={imgRef} className={className}>
      {isInView && !hasError && srcSet && (
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
              ${fit === 'contain' ? 'object-contain' : 'object-cover'}
            `}
            style={{
              filter: isLoaded ? 'none' : 'blur(10px)',
            }}
            width={width}
            height={height}
            sizes={sizes}
          />
        </>
      )}

      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div
          className={`${className} bg-gray-200 animate-pulse`}
          style={{ minHeight: height ? `${height}px` : '200px' }}
        />
      )}

      {/* Error fallback */}
      {hasError && (
        <div
          className={`${className} bg-gray-100 flex items-center justify-center text-gray-400`}
          style={{ minHeight: height ? `${height}px` : '200px' }}
        >
          <span>Image not available</span>
        </div>
      )}
    </picture>
  );
};

export default Image;
