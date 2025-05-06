import { useSyncExternalStore } from 'react';

/** @ignore */
function noopForHydration() {
  // eslint-disable-next-line jsdoc/require-jsdoc
  return () => {};
}

/**
 * @example
 *
 * ```tsx
 * const hasHydrated = useHydration();
 * ```
 *
 * @returns A boolean value indicating whether the component is hydrated.
 */
export function useHydration() {
  return useSyncExternalStore(
    noopForHydration,
    () => true,
    () => false,
  );
}
