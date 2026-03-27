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
 * Enhanced Image component with WebP support and responsive variants
 *
 * Features:
 * - Automatic WebP detection and conversion with JPEG fallback
 * - Responsive image loading with mobile/tablet/desktop variants
 * - Proper srcset and sizes attributes for optimal loading
 * - Priority loading for above-the-fold images
 * - Improved Intersection Observer-based lazy loading
 * - Robust fallback chain (WebP → JPEG → error state)
 * - Support for both optimized and simple image loading
 * - Aspect ratio containers to prevent CLS (Cumulative Layout Shift)
 */
const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  eager = false,
  priority = false,
  sizes,
  width,
  height,
  fit = 'cover',
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  // For priority/eager images, set isInView immediately to start loading
  const [isInView, setIsInView] = useState(eager || priority);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Determine if this is an optimized image (from assets directory)
  // Vite-processed image URLs (imported images) should be used directly, not as optimized
  const isOptimizedImage = (imageSrc: string): boolean => {
    if (!imageSrc) return false;
    
    // Vite-processed URLs (imported images) should NOT be treated as optimized
    // They can be:
    // - /assets/images/hero/hero-main@1x.webp (dev/prod with full path)
    // - /assets/hero-main@1x-abc123.webp (prod with hash)
    // - /src/assets/images/hero/hero-main@1x.webp (dev with src prefix)
    // - Any path containing /assets/images/ (Vite-processed imports)
    const isViteProcessed = 
      imageSrc.includes('/assets/images/') || // Contains /assets/images/ anywhere
      /^\/assets\/[^/]+-[a-f0-9]+\.(jpg|jpeg|png|webp|avif)$/i.test(imageSrc) || // Hashed filename in /assets/
      /^\/src\/assets\//.test(imageSrc); // Dev mode with /src prefix
    
    if (isViteProcessed) return false;
    
    // Only treat as optimized if it's a simple path reference to /assets-optimized/ or ./assets-optimized/
    // that's meant to use the optimized responsive variants
    const assetsPattern = /\/?\.?assets-optimized\//;
    return assetsPattern.test(imageSrc) && !imageSrc.startsWith('http');
  };

  // Extract filename without extension for optimized images
  const getImagePath = (imagePath: string): string => {
    // Normalize path - handle both /assets/ and ./assets/
    const normalizedPath = imagePath.replace(/^\.\//, '/').replace(/^\/?/, '/');
    
    // Remove /assets/ prefix - use start anchor to avoid partial matches
    const pathWithoutAssets = normalizedPath.replace(/^\/assets\//, '');
    
    // Remove file extension
    const pathWithoutExt = pathWithoutAssets.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '');
    
    // Return without leading slash (will be added in generateSrcSet)
    return pathWithoutExt;
  };

  // Build absolute path for simple images
  const getAbsoluteSrc = (imageSrc: string): string => {
    if (!imageSrc) return '';
    if (imageSrc.startsWith('http://') || imageSrc.startsWith('https://')) return imageSrc;
    
    // Vite-processed URLs (imported images) already have the correct path - use as-is
    // They can be:
    // - /assets/images/hero/hero-main@1x.webp (dev/prod)
    // - /assets/hero-main@1x-abc123.webp (prod with hash)
    // - /src/assets/images/hero/hero-main@1x.webp (dev with src prefix)
    // - Any path containing /assets/images/ (Vite-processed imports)
    if (imageSrc.includes('/assets/images/') || 
        imageSrc.startsWith('/assets/') || 
        imageSrc.startsWith('/src/assets/')) {
      return imageSrc;
    }
    
    // Handle relative paths
    if (imageSrc.startsWith('./assets/')) {
      return `/${imageSrc.replace(/^\.\//, '')}`;
    }
    
    // Default: assume it's a simple filename and prepend /assets/
    return `/assets/${imageSrc}`;
  };

  const optimized = isOptimizedImage(src);
  const imagePath = optimized ? getImagePath(src) : '';
  // Always resolve absolute src, even for optimized images (needed for fallback)
  const absoluteSrc = getAbsoluteSrc(src);

  // Generate srcSet for optimized responsive images
  // Matches the pattern from optimize-images.js: {name}-mobile.webp, {name}-tablet.webp, {name}-desktop.webp
  // The script also creates optimized JPEG fallbacks in assets-optimized/ with the same naming pattern
  const generateSrcSet = (basePath: string) => {
    // Ensure single leading slash - basePath should not have leading slash
    const normalizedPath = basePath.replace(/^\/+/, ''); // Remove any leading slashes
    const baseUrl = `/assets-optimized/${normalizedPath}`;
    
    // Generate WebP srcSet with responsive variants (primary format)
    const webpSrcSet = [
      `${baseUrl}-mobile.webp 640w`,
      `${baseUrl}-tablet.webp 1024w`,
      `${baseUrl}-desktop.webp 1920w`,
      `${baseUrl}.webp 2400w`
    ].join(', ');

    // Single optimized JPEG fallback (optimize-images.js creates one optimized JPEG per image)
    // No responsive variants for JPEG, just use the single optimized file
    const jpegFallback = `${baseUrl}.jpg`;
    // Also try original path if optimized fallback fails
    const originalFallback = absoluteSrc;

    return {
      webp: webpSrcSet,
      jpegFallback,
      originalFallback
    };
  };

  const srcSet = optimized ? generateSrcSet(imagePath) : null;

  // Generate intelligent default sizes if not provided
  const getDefaultSizes = (): string => {
    if (sizes) return sizes;
    
    // Default responsive sizes based on common viewport breakpoints
    return '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, (max-width: 1920px) 100vw, 2400px';
  };

  const finalSizes = getDefaultSizes();

  // Enhanced Intersection Observer for lazy loading
  useEffect(() => {
    if (eager || priority) {
      setIsInView(true);
      return;
    }

    if (!containerRef.current && !imgRef.current) return;

    // Use containerRef if available (picture), otherwise use imgRef
    const targetElement = containerRef.current || imgRef.current;
    if (!targetElement) return;

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
        rootMargin: '100px', // Start loading 100px before image enters viewport
        threshold: 0.01,
      }
    );

    observer.observe(targetElement);

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
  if (!optimized) {
    if (hasError || !absoluteSrc) {
      return null;
    }

    // Check if this is a Vite-processed URL (imported image)
    // Vite-processed URLs should be used directly without generating variants
    // They can be:
    // - /assets/images/hero/hero-main@1x.webp (dev/prod with full path)
    // - /assets/hero-main@1x-abc123.webp (prod with hash)
    // - /src/assets/images/hero/hero-main@1x.webp (dev with src prefix)
    // - Any path containing /assets/images/ (Vite-processed imports)
    const isViteProcessed = (
      absoluteSrc.includes('/assets/images/') || // Contains /assets/images/ anywhere
      /^\/assets\/[^/]+-[a-f0-9]+\.(jpg|jpeg|png|webp|avif|svg)$/i.test(absoluteSrc) || // Hashed filename
      /^\/src\/assets\//.test(absoluteSrc) // Dev mode with /src prefix
    ) && /\.(jpg|jpeg|png|webp|avif|svg)$/i.test(absoluteSrc) &&
      !absoluteSrc.includes('/assets-optimized/');

    // For Vite-processed images, use directly without variants
    if (isViteProcessed) {
      const img = (
        <img
          ref={imgRef}
          src={absoluteSrc}
          alt={alt}
          className={`${className} ${fit === 'contain' ? 'object-contain' : 'object-cover'}`}
          width={width}
          height={height}
          loading={priority || eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchpriority={priority ? 'high' : 'low'}
          onLoad={handleLoad}
          onError={handleError}
          sizes={finalSizes}
        />
      );

      // If explicit dimensions provided, wrap with aspect ratio container
      if (width && height) {
        const aspectRatio = typeof width === 'number' && typeof height === 'number'
          ? `${width}/${height}`
          : 'auto';
        return (
          <div 
            ref={containerRef}
            className={`${containerClassName} ${aspectRatio !== 'auto' ? `aspect-[${aspectRatio}]` : ''}`}
            style={aspectRatio === 'auto' ? { width, height } : undefined}
          >
            {img}
          </div>
        );
      }

      return img;
    }

    // For non-optimized images, create picture with AVIF/WebP sources if possible
    const getImageVariants = (imageSrc: string) => {
      const basePath = imageSrc.replace(/\.(jpg|jpeg|png|webp)$/i, '');
      return {
        avif: `${basePath}.avif`,
        webp: imageSrc.match(/\.(jpg|jpeg|png)$/i) ? `${basePath}.webp` : imageSrc,
        original: imageSrc
      };
    };

    const variants = getImageVariants(absoluteSrc);
    const img = (
      <picture>
        <source
          type="image/avif"
          srcSet={variants.avif}
        />
        <source
          type="image/webp"
          srcSet={variants.webp}
        />
        <img
          ref={imgRef}
          src={variants.original}
          alt={alt}
          className={`${className} ${fit === 'contain' ? 'object-contain' : 'object-cover'}`}
          width={width}
          height={height}
          loading={priority || eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchpriority={priority ? 'high' : 'low'}
          onLoad={handleLoad}
          onError={handleError}
          sizes={finalSizes}
        />
      </picture>
    );

    // If explicit dimensions provided, wrap with aspect ratio container
    if (width && height) {
      const aspectRatio = typeof width === 'number' && typeof height === 'number'
        ? `${width}/${height}`
        : 'auto';
      return (
        <div 
          ref={containerRef}
          className={`${containerClassName} ${aspectRatio !== 'auto' ? `aspect-[${aspectRatio}]` : ''}`}
          style={aspectRatio === 'auto' ? { width, height } : undefined}
        >
          {img}
        </div>
      );
    }

    return img;
  }

  // For priority/eager images, always render immediately
  const shouldRender = isInView || priority || eager;

  // Optimized image rendering (with AVIF and WebP support and responsive variants)
  // Wrap in relative container for proper positioning of placeholder/error states
  const pictureWrapper = (
    <div ref={containerRef} className={`${containerClassName} relative`}>
      <picture className={`${className} block`}>
        {/* AVIF source with responsive sizes - best format */}
        {shouldRender && srcSet && (
          <source
            type="image/avif"
            srcSet={srcSet.webp.replace(/\.webp/g, '.avif')}
            sizes={finalSizes}
          />
        )}
        {/* WebP source with responsive sizes - fallback format */}
        {shouldRender && srcSet && (
          <source
            type="image/webp"
            srcSet={srcSet.webp}
            sizes={finalSizes}
          />
        )}

        {/* Fallback img element - optimized JPEG or original for browsers without AVIF/WebP support */}
        {shouldRender && (
          <img
            ref={imgRef}
            src={srcSet ? srcSet.jpegFallback : absoluteSrc}
            alt={alt}
            loading={eager || priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchpriority={priority ? 'high' : 'low'}
            onLoad={handleLoad}
            onError={(e) => {
              // Try original source as last resort
              const imgElement = e.currentTarget;
              const currentSrc = imgElement.src;
              
              if (srcSet && srcSet.originalFallback && currentSrc !== srcSet.originalFallback) {
                console.log(`[Image] Fallback 1: Trying original path: ${srcSet.originalFallback}`);
                imgElement.src = srcSet.originalFallback;
                return;
              }
              // If no srcSet or originalFallback failed, try absoluteSrc
              if (absoluteSrc && currentSrc !== absoluteSrc) {
                console.log(`[Image] Fallback 2: Trying absoluteSrc: ${absoluteSrc}`);
                imgElement.src = absoluteSrc;
                return;
              }
              console.error(`[Image] All fallbacks failed for: ${src}`);
              handleError();
            }}
            className={`
              ${className}
              transition-opacity duration-500
              ${isLoaded ? 'opacity-100' : 'opacity-0'}
              ${fit === 'contain' ? 'object-contain' : 'object-cover'}
              w-full h-full
              relative z-10
            `}
            style={{
              filter: isLoaded ? 'none' : 'blur(10px)',
            }}
            width={width}
            height={height}
            sizes={srcSet ? finalSizes : undefined}
          />
        )}
      </picture>

      {/* Loading placeholder - shows while image loads */}
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-neutral-200 animate-pulse z-0"
          style={{ 
            minHeight: height ? (typeof height === 'number' ? `${height}px` : height) : '200px',
          }}
          aria-hidden="true"
        />
      )}

      {/* Error fallback */}
      {hasError && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-neutral-100 text-neutral-400 z-0"
          style={{ 
            minHeight: height ? (typeof height === 'number' ? `${height}px` : height) : '200px',
          }}
          role="img"
          aria-label={alt || 'Image not available'}
        >
          <span>Image not available</span>
        </div>
      )}
    </div>
  );

  // If dimensions provided, ensure proper aspect ratio
  if (width && height) {
    const aspectRatio = typeof width === 'number' && typeof height === 'number'
      ? `${width}/${height}`
      : undefined;
    
    return (
      <div className={aspectRatio ? `aspect-[${aspectRatio}]` : ''}>
        {pictureWrapper}
      </div>
    );
  }

  return pictureWrapper;
};

export default Image;
