import { atom } from 'nanostores';
import { extractBasicPropertiesByNDLItem } from '../../../../utils/ndl/property';
import { type NDLSearchItem } from '../../../../utils/ndl/search.type';

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
      | {
          providerId: string;
          providerType: string;
          title: string;
          authors: string | null;
          categories: string | null;
          thumbnailUrl: string | null;
          publishedDates: string | null;
        }
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

  setDataFromNDLSearchItem(ndlSearchItem: NDLSearchItem) {
    const properties = extractBasicPropertiesByNDLItem(ndlSearchItem);

    const title = properties.title;
    const providerId = properties.providerId;
    if (!title || !providerId) {
      return;
    }

    this.dataset.data.set({
      ...properties,
      title,
      providerId,
      providerType: 'ndl_open_search',
    });
  },
};
