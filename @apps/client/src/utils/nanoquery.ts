import { nanoquery } from '@nanostores/query';

/**
 * グローバルな nanoquery 。
 */
export const [globalNanoQuery, globalNanoMutator] = nanoquery({
  dedupeTime: Infinity,
  cacheLifetime: Infinity,
  revalidateInterval: Infinity,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
});
