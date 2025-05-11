/** @jsxImportSource react */

import { useEffect, useLayoutEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@libs/shadcn/lib/utils';
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
        'pointer-events-none fixed top-3.5 right-4 z-50 opacity-0 fade-transition',
        isLoading ? 'animate-spin opacity-100' : null,
      )}
      aria-hidden="true"
    >
      <Loader2 size={size} color={color} />
    </div>
  );
}

function setupLoadingIndicator(setIsLoaded: (isLoaded: boolean) => void) {
  function beforePreparation() {
    setIsLoaded(true);
  }
  function beforeSwap() {
    setIsLoaded(false);
  }

  document.addEventListener('astro:before-preparation', beforePreparation);
  document.addEventListener('astro:before-swap', beforeSwap);

  return () => {
    document.removeEventListener('astro:before-preparation', beforePreparation);
    document.removeEventListener('astro:before-swap', beforeSwap);
  };
}
