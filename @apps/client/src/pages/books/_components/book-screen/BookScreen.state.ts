import { atom } from 'nanostores';
import type { NDLBooksItem } from '@apps/server/routes/ndl/books/_schemas/ndl-books.type';

/**
 * BookViewer の状態。
 */
export const bookScreenStore = {
  mode: atom<'new' | 'view'>('new'),

  // ###########
  // ## State ##
  // ###########

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
  },

  // ############
  // ## Action ##
  // ############

  setDataFromNDLSearchItem(ndlBooksItem: NDLBooksItem) {
    this.dataset.data.set({
      providerType: 'ndl_open_search',
      ...ndlBooksItem,
    });
  },
};
