/** @jsxImportSource react */

import { useHydration } from '../../../../../hooks/hydrate';
import { bookScreenStore } from '../BookScreen.state';
import { useLayoutEffect, useRef } from 'react';
/**
 * @jsx
 */
export function BookScreenViewIntersectionRatioObserver() {
  const hasHydrated = useHydration();
  const elementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!elementRef.current || !hasHydrated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        bookScreenStore.contentIntersectionRatio.set(entry.intersectionRatio);
      },
      { threshold: Array.from({ length: 61 }, (_, i) => i / 60) },
    );

    observer.observe(elementRef.current);
    return () => {
      observer.disconnect();
      elementRef.current = null;
      bookScreenStore.contentIntersectionRatio.set(0);
    };
  }, [hasHydrated]);

  return (
    <div
      ref={elementRef}
      className="pointer-events-none absolute inset-0 z-[-1] size-full opacity-0"
    />
  );
}
