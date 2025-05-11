import { atom, computed } from 'nanostores';
import { server } from '../../../../../utils/server';
import type { NDLBooksItem } from '@apps/server/routes/ndl/books/_schemas/ndl-books.type';
import { bookScreenStore } from '../BookScreen.state';

/** @ignore */
type InputParams = {
  keyword?: string;
  isbn?: string;
};

/**
 * 本の検索に関する状態。
 */
export const bookScreenNewSearchStore = {
  isConfirmed: atom(false),

  isOpenDrawer: atom(false),
  drawerMode: atom<'keyword' | 'isbn' | 'barcode'>('keyword'),

  list: {
    key: atom<string | null>(null),
    data: atom<NDLBooksItem[] | undefined>(),
    error: atom<Error | undefined>(undefined),
    promise: atom<Promise<NDLBooksItem[] | undefined> | null>(null),

    isFetching: atom(false),
    isMoreFetching: atom(false),

    page: atom(0),
    hasNextPage: atom(false),

    input: {
      keyword: atom(''),
      isbn: atom(''),
    },

    reset() {
      this.key.set(null);
      this.data.set(undefined);
      this.error.set(undefined);
      this.promise.set(null);

      this.isFetching.set(false);
      this.isMoreFetching.set(false);

      this.page.set(0);
      this.hasNextPage.set(false);

      this.input.keyword.set('');
      this.input.isbn.set('');
    },

    createProperty() {
      const input = this.input;
      const keyword = input.keyword.get() || void 0;
      const isbn = input.isbn.get() || void 0;

      if (!keyword && !isbn) {
        return null;
      }

      return {
        key: `${keyword}:${isbn}`,
        params: {
          keyword,
          isbn,
        } satisfies InputParams,
      };
    },

    update() {
      const alreadyPromise = this.promise.get();
      if (alreadyPromise) return alreadyPromise;

      const promise = this.fetch();
      promise.finally(() => this.promise.set(null));

      this.promise.set(promise);
      return promise;
    },

    async fetch() {
      try {
        const property = this.createProperty();
        if (!property) throw new Error('Search input properties is unset.');

        const isMoreFetch = this.key.get() === property.key;
        if (isMoreFetch) {
          if (!this.hasNextPage.get()) return;
          this.page.set(this.page.get() + 1);
        }

        this.isFetching.set(true);
        this.isMoreFetching.set(isMoreFetch);

        const perPage = 8;
        this.key.set(property.key);
        const response = await server.api.ndl.books.$get({
          query: {
            keyword: property.params.keyword,
            isbn: property.params.isbn,
            page: isMoreFetch ? (this.page.get() + 1).toString() : '1',
            perPage: perPage.toString(),
          },
        });

        if (!response.ok) {
          throw new Error();
        }

        const result = await response.json();
        this.hasNextPage.set(result.hasNextPage);

        const items = result.items;
        const data = isMoreFetch
          ? [...(this.data.get() || []), ...items]
          : items;

        this.data.set(data);
        return data;

        // ↓ エラーが発生した時の処理
      } catch (error) {
        this.error.set(error as Error);

        // ↓ 処理が終了した時の処理
      } finally {
        this.isFetching.set(false);
        this.isMoreFetching.set(false);
      }
    },
  },
};

/**
 * 本の検索に関する計算状態。
 */
export const bookScreenNewSearchComputedStore = {
  isSelectedData: computed(
    [bookScreenStore.dataset.data, bookScreenNewSearchStore.isConfirmed],
    (data, isConfirmed) => {
      return !!data && isConfirmed;
    },
  ),
};
