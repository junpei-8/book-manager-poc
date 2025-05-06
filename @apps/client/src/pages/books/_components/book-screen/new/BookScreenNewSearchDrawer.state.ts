import { atom } from 'nanostores';
import { ensureArray } from '../../../../../utils/array';
import { extractResultStatusByNDLResult } from '../../../../../utils/ndl/property';
import { searchNDL } from '../../../../../utils/ndl/search';
import {
  type NDLSearchItem,
  type NDLSearchParams,
} from '../../../../../utils/ndl/search.type';

/**
 * 本を検索するための状態。
 */
export const bookScreenNewSearchDrawerStore = {
  isOpen: atom(false),
  mode: atom<'keyword' | 'isbn' | 'barcode'>('keyword'),

  list: {
    data: atom<NDLSearchItem[] | undefined>(),
    error: atom<Error | undefined>(undefined),
    isFetching: atom(false),
    isMoreFetching: atom(false),
    hasNextPage: atom(false),

    input: {
      any: atom(''),
      isbn: atom(''),
    },
    dataState: {
      page: 0,
      dataKey: null as string | null,
      promise: null as Promise<NDLSearchItem[] | undefined> | null,
    },

    reset() {
      this.data.set(undefined);
      this.error.set(undefined);
      this.isFetching.set(false);
      this.isMoreFetching.set(false);
      this.hasNextPage.set(false);
      this.input.any.set('');
      this.input.isbn.set('');
      this.dataState.dataKey = null;
      this.dataState.page = 0;
    },

    createProperty() {
      const input = this.input;
      const any = input.any.get() || void 0;
      const isbn = input.isbn.get() || void 0;

      if (!any && !isbn) {
        return null;
      }

      return {
        key: `${any}:${isbn}`,
        params: {
          any,
          isbn,
        },
      };
    },

    update() {
      if (this.dataState.promise) {
        return this.dataState.promise;
      }

      const property = this.createProperty();
      if (!property) return;

      const isMoreFetch = this.dataState.dataKey === property.key;
      if (isMoreFetch) {
        if (!this.hasNextPage.get()) return;
        this.dataState.page += 1;
      }

      this.isFetching.set(true);
      this.isMoreFetching.set(isMoreFetch);

      this.dataState.promise = this.fetch({
        key: property.key,
        params: property.params,
        more: isMoreFetch,
      });

      return this.dataState.promise;
    },

    async fetch(props: {
      key: string;
      params: NDLSearchParams;
      more?: boolean;
    }) {
      try {
        const { key, params, more = false } = props;
        const perPage = 8;

        this.dataState.dataKey = key;
        const result = await searchNDL({
          ...params,
          idx: more ? this.dataState.page * perPage + 1 : 1,
          cnt: perPage,
        });

        const status = extractResultStatusByNDLResult(result);
        this.hasNextPage.set(status.hasNextPage);

        const items = result.item ? ensureArray(result.item) : [];
        const data = more ? [...(this.data.get() || []), ...items] : items;

        this.data.set(data);
        return data;
      } catch (error) {
        this.error.set(error as Error);
      } finally {
        this.dataState.promise = null;
        this.isFetching.set(false);
        this.isMoreFetching.set(false);
      }
    },
  },
};
