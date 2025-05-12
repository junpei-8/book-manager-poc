/** @jsxImportSource react */

import { useLayoutEffect, useRef } from 'react';
import { useHydration } from '../../../../../hooks/hydrate';
import { bookScreenStore } from '../BookScreen.state';

/**
 * @jsx
 */
export function BookScreenViewIntersectionRatioObserver() {
  const hasHydrated = useHydration();
  const elementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!elementRef.current || !hasHydrated) return;
    bookScreenStore.contentIntersectionRatio.set(0);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        bookScreenStore.contentIntersectionRatio.set(
          1 - entry.intersectionRatio,
        );
      },
      { threshold: Array.from({ length: 61 }, (_, i) => i / 60) },
    );

    observer.observe(elementRef.current); /** @ignore */
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
