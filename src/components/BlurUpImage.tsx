import React, { useState, useEffect, useRef } from 'react';

interface BlurUpImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholderSrc?: string;
  containerClassName?: string;
  aspectRatioClass?: string;
  priority?: boolean;
  fallbackSrc?: string;
}

/**
 * BlurUpImage Component
 *
 * Implements progressive blur-up image loading with zero Cumulative Layout Shift (CLS):
 * - Displays a blurred, warm-tinted low-fidelity placeholder immediately.
 * - Defers loading until near viewport using IntersectionObserver (rootMargin: 200px).
 * - Smoothly cross-fades full-resolution image upon completion (700ms ease-out).
 * - Optimized for mobile devices on 3G / slower cellular connections.
 */
export const BlurUpImage: React.FC<BlurUpImageProps> = ({
  src,
  alt,
  placeholderSrc,
  className = '',
  containerClassName = '',
  aspectRatioClass = '',
  priority = false,
  fallbackSrc,
  ...restProps
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px 0px', // Pre-fetch 200px before scrolling into view
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  // Default subtle SVG placeholder if no custom placeholder is provided
  const defaultPlaceholderSvg = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 30" width="100%" height="100%">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1E293B"/>
          <stop offset="50%" stop-color="#F59E0B" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#0F172A"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
    </svg>`
  )}`;

  const activePlaceholder = placeholderSrc || defaultPlaceholderSvg;
  const activeSrc = hasError && fallbackSrc ? fallbackSrc : src;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${aspectRatioClass} ${containerClassName}`}
    >
      {/* 1. Low-Quality Blur-Up Placeholder */}
      <img
        src={activePlaceholder}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-cover filter blur-lg scale-105 transform transition-opacity duration-700 ease-out select-none pointer-events-none ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* 2. Shimmer Skeleton Animation while loading on slow connections */}
      {!isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent animate-pulse pointer-events-none"
        />
      )}

      {/* 3. Full-Resolution Image (rendered only when in or near viewport) */}
      {isInView && (
        <img
          src={activeSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            if (!hasError && fallbackSrc) {
              setHasError(true);
            } else {
              setIsLoaded(true);
            }
          }}
          className={`w-full h-full object-cover transition-all duration-700 ease-out transform ${
            isLoaded
              ? 'opacity-100 filter-none scale-100'
              : 'opacity-0 filter blur-sm scale-[1.02]'
          } ${className}`}
          {...restProps}
        />
      )}
    </div>
  );
};
