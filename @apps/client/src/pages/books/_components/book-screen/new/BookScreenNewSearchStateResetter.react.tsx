import { useLayoutEffect } from 'react';
import { bookScreenNewSearchStore } from './BookScreenNewSearch.state';

/**
 * @jsx
 */
export function BookScreenNewSearchStateResetter() {
  useLayoutEffect(() => {
    bookScreenNewSearchStore.reset();
  }, []);

  return null;
}
