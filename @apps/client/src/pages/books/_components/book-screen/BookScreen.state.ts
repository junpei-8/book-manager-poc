import { atom } from 'nanostores';
import type { NDLBooksItem } from '@apps/server/routes/ndl/books/_schemas/ndl-books.type';

/**
 * BookViewer の状態。
 */
export const bookScreenStore = {
  mode: atom<'new' | 'view'>('new'),

  dataset: {
    data: atom<
      | (NDLBooksItem & {
          providerType: 'ndl_open_search';
        })
      | null
      | undefined
    >(null),
    error: atom<Error | null>(null),
    isFetching: atom(false),
    hasFetched: atom(false),
    isLoading: atom(false),
    hasLoaded: atom(false),

    setDataFromNDLSearchItem(ndlBooksItem: NDLBooksItem) {
      this.data.set({
        providerType: 'ndl_open_search',
        ...ndlBooksItem,
      });
    },
  },

  /**
   * コンテンツの表示領域の割合 (0-1)
   */
  contentIntersectionRatio: atom(0),

  reset() {
    this.dataset.data.set(null);
    this.dataset.error.set(null);
    this.dataset.isFetching.set(false);
    this.dataset.hasFetched.set(false);
    this.dataset.isLoading.set(false);
    this.dataset.hasLoaded.set(false);
    this.contentIntersectionRatio.set(0);
  },
};
