import { useLayoutEffect } from 'react';
import { bookScreenNewSearchStore } from './BookScreenNewSearch.state';
import { bookScreenStore } from '../BookScreen.state';

/**
 * @jsx
 */
export function BookScreenNewSearchStateResetter() {
  useLayoutEffect(() => {
    bookScreenNewSearchStore.reset();
  }, []);

  return null;
}
