import { authStore } from '../../../../../utils/auth';
import { globalNanoQuery } from '../../../../../utils/nanoquery';
import { server } from '../../../../../utils/server';

/**
 * ホームページの本棚リストに関する状態。
 */
export const rootPageHomeBookListsQuery = {
  myBooks: globalNanoQuery(
    ['rootPageHomeBookListsQuery-myBooks', authStore.$userId],
    {
      fetcher: async () => {
        const userId = authStore.$userId.get();
        if (!userId) return undefined;

        const response = await server.api[':userId']['book-collections'].$get({
          param: {
            userId: 'me',
          },
          query: {
            page: '1',
            perPage: '4',
            withoutPagination: 'true',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch my books');
        }

        return response.json();
      },
    },
  ),
};
