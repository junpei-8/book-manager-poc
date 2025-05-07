import { XMLParser } from 'fast-xml-parser';
import {
  type NDLSearchParamsV2_0,
  type NDLSearchResponseV2_0,
  type NDLSearchResultV2_0,
} from './types/search-v2_0.type';

/**
 * 国立国会図書館の検索 API のバージョン。
 */
export type SearchNDLVersion = '2.0';

/**
 * 国立国会図書館の検索 API を使用する。
 *
 * @param   params          検索パラメータ。
 * @param   options         オプション。
 * @param   options.version 国立国会図書館の検索 API のバージョン。
 *
 * @returns                 検索結果。（総件数と本などの情報の配列）
 *
 * @see {@link https://ndlsearch.ndl.go.jp/file/help/api/specifications/ndlsearch_api_20250326.pdf | Document (PDF) / 12 page}
 */
export async function searchNDL<Version extends SearchNDLVersion = '2.0'>(
  params: Version extends '2.0' ? NDLSearchParamsV2_0 : never,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options?: { version: Version },
) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value != null && value !== '') query.set(key, value.toString());
  }

  const NDL_API_ENDPOINT = 'https://iss.ndl.go.jp/api/opensearch';
  const url = `${NDL_API_ENDPOINT}?${query.toString()}`;
  const response = await fetch(url, {
    headers: { Accept: 'application/atom+xml' },
  });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const xmlText = await response.text();
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@',
    alwaysCreateTextNode: true,
    parseTagValue: false,
    parseAttributeValue: false,
  });

  const parsed = parser.parse(xmlText) as NDLSearchResponseV2_0;
  const channel = parsed?.rss?.channel;
  if (!channel) {
    throw new Error('Invalid response');
  }

  return channel as Version extends '2.0' ? NDLSearchResultV2_0 : never;
}

/**
 * 国立国会図書館の検索 API の結果をフォーマットします。
 *
 * @param   result 国立国会図書館の検索 API の結果。
 *
 * @returns        フォーマットされた結果。
 */
export function formatNDLSearchResult(result: NDLSearchResultV2_0) {
  result.item = Array.isArray(result.item)
    ? result.item
    : ([result.item] as unknown as (typeof result)['item']);

  return result;
}
