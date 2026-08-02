import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  /** Kept for call-site compatibility; the reveal itself is always a plain opacity/translateY transition now. */
  animationClass?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  stagger?: boolean;
  staggerDelay?: number;
  parallax?: boolean;
  parallaxSpeed?: number;
}

export const useScrollAnimation = (
  options: UseScrollAnimationOptions = {}
) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    delay = 0,
    duration = 500,
    distance = 16,
    stagger = false,
    staggerDelay = 80,
    parallax = false,
    parallaxSpeed = 0.5
  } = options;

  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // Intersection Observer for visibility — fires once, then gets out of the way.
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // On mobile, show immediately and skip observer to avoid hidden content
    if (isMobile) {
      setIsVisible(true);
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutId = setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [threshold, rootMargin, delay, isMobile]);

  // Parallax effect
  useEffect(() => {
    if (!parallax || isMobile || !elementRef.current) return;

    const handleScroll = () => {
      const element = elementRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const speed = parallaxSpeed;
      const yPos = -(rect.top * speed);
      setParallaxOffset(yPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [parallax, parallaxSpeed]);

  const visibleNow = isVisible || isMobile;

  // A plain CSS transition, driven entirely through inline styles rather than
  // utility classes. Inline styles always win the cascade, so this can never
  // collide with a card's own `transition-*`/hover classes or with a keyframe
  // animation — that collision (transition and animation both fighting over
  // opacity/transform) is what caused the earlier stutter.
  const getStyle = (index?: number): React.CSSProperties => {
    const itemDelay = stagger && index !== undefined ? index * staggerDelay : 0;
    if (parallax) {
      return { transform: `translateY(${parallaxOffset}px)` };
    }
    return {
      opacity: visibleNow ? 1 : 0,
      transform: visibleNow ? 'translateY(0)' : `translateY(${distance}px)`,
      transition: visibleNow
        ? `opacity ${duration}ms ease-out ${itemDelay}ms, transform ${duration}ms ease-out ${itemDelay}ms`
        : 'none',
    };
  };

  return {
    ref: elementRef,
    // No className is needed for the reveal itself anymore; kept as an empty
    // string so existing `${anim.className}` interpolations stay harmless.
    className: '',
    getClassName: () => '',
    style: getStyle(),
    getStyle,
    isVisible
  };
};

// Hook for staggered animations
export const useStaggeredAnimation = (
  itemCount: number,
  options: UseScrollAnimationOptions = {}
) => {
  const animation = useScrollAnimation({ ...options, stagger: true });

  const getItemProps = (index: number) => ({
    className: '',
    style: animation.getStyle(index)
  });

  return {
    containerRef: animation.ref,
    containerClassName: '',
    getItemProps,
    isVisible: animation.isVisible
  };
};
