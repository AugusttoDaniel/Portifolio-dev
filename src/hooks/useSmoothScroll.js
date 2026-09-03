import { useEffect, useRef } from 'react';

const EASE = 0.1;

export function useSmoothScroll() {
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef(null);
  const animatingRef = useRef(false);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isCoarsePointer || prefersReducedMotion) return;

    const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;

    targetRef.current = window.scrollY;
    currentRef.current = window.scrollY;

    const animate = () => {
      const diff = targetRef.current - currentRef.current;
      if (Math.abs(diff) < 0.5) {
        currentRef.current = targetRef.current;
        window.scrollTo(0, currentRef.current);
        animatingRef.current = false;
        return;
      }
      currentRef.current += diff * EASE;
      window.scrollTo(0, currentRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };

    const onWheel = (e) => {
      if (e.ctrlKey) return;
      e.preventDefault();
      targetRef.current = Math.min(Math.max(targetRef.current + e.deltaY, 0), maxScroll());
      if (!animatingRef.current) {
        animatingRef.current = true;
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const syncTarget = () => {
      if (!animatingRef.current) {
        targetRef.current = window.scrollY;
        currentRef.current = window.scrollY;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', syncTarget, { passive: true });
    window.addEventListener('resize', syncTarget);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', syncTarget);
      window.removeEventListener('resize', syncTarget);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);
}
