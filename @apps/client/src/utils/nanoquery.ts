import { nanoquery, type FetcherStore } from '@nanostores/query';

/**
 * グローバルな nanoquery インスタンス。
 */
export const [globalNanoQuery, globalNanoMutator] = /*#__PURE__*/ nanoquery({
  dedupeTime: Infinity,
  cacheLifetime: Infinity,
  revalidateInterval: Infinity,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
});

/**
 * グローバルな nanoquery インスタンスの型。
 */
export type NanoQuery = FetcherStore<any, any>;

/**
 * nanoquery のクエリ結果の型。
 */
export type NanoQueryResult<T extends NanoQuery = NanoQuery> = ReturnType<
  T['get']
>;

/**
 * 読み込みが完了している場合に true を返す。
 *
 * @param   queryResult nanoquery のクエリ結果
 *
 * @returns             ロードが完了しているかどうか
 */
export function hasNanoQueryLoaded(
  queryResult: ReturnType<ReturnType<typeof globalNanoQuery>['get']>,
) {
  return queryResult.data !== undefined || queryResult.error !== undefined;
}

/**
 * クエリ結果に読み込み状態を付与する。
 *
 * @param   queryResult nanoqueryのクエリ結果
 *
 * @returns             読み込み状態を含む拡張されたクエリ結果
 */
export function withNanoQueryLoadedState<
  Q extends ReturnType<ReturnType<typeof globalNanoQuery>['get']>,
>(queryResult: Q) {
  return {
    ...queryResult,
    hasLoaded: hasNanoQueryLoaded(queryResult),
  };
}
