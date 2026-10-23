import React, { useEffect, useRef, useState } from 'react';

interface FadeInUpSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Milliseconds delay
  threshold?: number;
  rootMargin?: string;
  as?: React.ElementType;
  id?: string;
}

/**
 * FadeInUpSection Component
 *
 * Implements a subtle, elegant 'fade-in-up' entrance animation using Intersection Observer:
 * - Triggers once when the section enters the viewport (rootMargin: '0px 0px -50px 0px').
 * - Professional 700ms cubic ease-out transition (opacity: 0 -> 1, translateY: 24px -> 0).
 * - Fully respects accessibility settings (prefers-reduced-motion).
 * - Disconnects observer once triggered to ensure zero runtime overhead.
 */
export const FadeInUpSection: React.FC<FadeInUpSectionProps> = ({
  children,
  className = '',
  delay = 0,
  threshold = 0.08,
  rootMargin = '0px 0px -50px 0px',
  as: Component = 'div',
  id,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for prefers-reduced-motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            const timer = setTimeout(() => {
              setIsVisible(true);
            }, delay);
            observer.disconnect();
            return () => clearTimeout(timer);
          } else {
            setIsVisible(true);
            observer.disconnect();
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [delay, threshold, rootMargin]);

  return (
    <Component
      id={id}
      ref={elementRef}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6 pointer-events-none'
      } ${className}`}
    >
      {children}
    </Component>
  );
};
