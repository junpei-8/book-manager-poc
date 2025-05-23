/** @jsxImportSource react */

import { cn } from '@libs/shadcn/lib/utils';
import { Loader2Icon } from 'lucide-react';
import { useLayoutEffect, useState } from 'react';
import { useHydration } from '../../hooks/hydrate';

/**
 * @jsx
 */
export interface LoadingIndicatorProps {
  /**
   * The spinner color. Can be any valid CSS property.
   *
   * @default 'var(--ring)'
   */
  color?: string;

  /**
   * The spinner size. Can be any valid CSS property.
   *
   * @default '24px'
   */
  size?: string;
}

/**
 * @jsx
 */
export function LoadingIndicator({
  color = 'var(--ring)',
  size = '24px',
}: LoadingIndicatorProps) {
  const hasHydrated = useHydration();
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    if (!hasHydrated) return;
    return setupLoadingIndicator(setIsLoading);
  }, [hasHydrated]);

  return (
    <div
      className={cn(
        'pointer-events-none fixed bottom-4 left-4 z-50 opacity-0 fade-transition md:top-4 md:right-4 md:bottom-[unset] md:left-[unset]',
        isLoading ? 'animate-spin opacity-100' : null,
      )}
      aria-hidden="true"
    >
      <Loader2Icon size={size} color={color} strokeWidth={2} />
    </div>
  );
}

/** @ignore */
function setupLoadingIndicator(setIsLoaded: (isLoaded: boolean) => void) {
  function beforePreparation() {
    setIsLoaded(true);
  }
  function beforeSwap() {
    setIsLoaded(false);
  }

  document.addEventListener('astro:before-preparation', beforePreparation);
  document.addEventListener('astro:before-swap', beforeSwap);

  /** @ignore */
  return () => {
    document.removeEventListener('astro:before-preparation', beforePreparation);
    document.removeEventListener('astro:before-swap', beforeSwap);
  };
}
