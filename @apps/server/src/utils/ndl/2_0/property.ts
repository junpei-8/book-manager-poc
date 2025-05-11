import { ensureArray } from '../../array';
import {
  type NDLOpenSearchItemTextValueV2_0,
  type NDLOpenSearchItemV2_0,
  type NDLOpenSearchResultV2_0,
} from './search';
import { createNDLThumbnailUrlV2_0 } from './thumbnail';

/**
 * 国立国会図書館の検索 API の結果から、国立国会図書館の ID を取得します。
 *
 * @param   ndlItem 国立国会図書館の検索 API の結果
 *
 * @returns         国立国会図書館の ID
 */
export function extractProviderIdByNDLItemV2_0(ndlItem: NDLOpenSearchItemV2_0) {
  const links = [
    ...(ndlItem['link'] ? ensureArray(ndlItem['link']) : []),
    ...(ndlItem['guid'] ? ensureArray(ndlItem['guid']) : []),
  ];

  const linkLength = links.length;
  if (linkLength === 0) return null;

  const ndlUrlRegex = /^https:\/\/ndlsearch\.ndl\.go\.jp\/books\/([A-Z0-9-]+)$/;

  for (let i = 0; i < linkLength; i++) {
    const link = links[i];
    if (!link) continue;

    const text = link['#text'];
    if (!text) continue;

    const match = text.match(ndlUrlRegex);
    if (match && match[1]) return match[1];
  }

  return null;
}

/**
 * 国立国会図書館の検索 API の結果から、ISBN を取得します。
 *
 * @param   ndlItem 国立国会図書館の検索 API の結果
 *
 * @returns         ISBN
 */
export function extractISBNByNDLItemV2_0(ndlItem: NDLOpenSearchItemV2_0) {
  const identifier = ndlItem['dc:identifier'];
  if (!identifier) return null;

  const ids = ensureArray(identifier);
  const idLength = ids.length;
  if (idLength === 0) return null;

  for (let i = 0; i < idLength; i++) {
    const id = ids[i];
    if (!id) continue;

    const type = id['@xsi:type'];
    if (!type || type !== 'dcndl:ISBN') continue;

    const value = id['#text'];
    if (!value) continue;

    return value;
  }

  return null;
}

/**
 * 国立国会図書館の検索 API の結果から、JP-e コードを取得します。
 *
 * @param   ndlItem 国立国会図書館の検索 API の結果
 *
 * @returns         JP-e コード
 */
export function extractJPECodeByNDLItemV2_0(ndlItem: NDLOpenSearchItemV2_0) {
  const ref = ndlItem['rdfs:seeAlso'];
  if (!ref) return null;

  const refs = ensureArray(ref);
  const refLength = refs.length;
  if (refLength === 0) return null;

  const jpeUrlRegex =
    /^https:\/\/www\.books\.or\.jp\/book-details\/([a-zA-Z0-9]{20})$/;

  for (let i = 0; i < refLength; i++) {
    const ref = refs[i];
    if (!ref) continue;

    const resource = ref['@rdf:resource'];
    if (!resource) continue;

    const match = resource.match(jpeUrlRegex);
    if (match && match[1]) return match[1];
  }

  return null;
}

/**
 * 国立国会図書館の検索 API の結果から、タイトルを取得します。
 *
 * @param   ndlItem 国立国会図書館の検索 API の結果
 *
 * @returns         タイトル
 */
export function extractTitleByNDLItemV2_0(ndlItem: NDLOpenSearchItemV2_0) {
  const dcTitle = ndlItem['dc:title'];
  if (dcTitle) {
    const dcTitles = ensureArray(dcTitle);
    const title = dcTitles.find((v) => v && v['#text']);
    if (title) return title['#text'];
  }

  const subTitle = ndlItem['title'];
  if (subTitle) {
    const titles = ensureArray(subTitle);
    const title = titles.find((v) => v && v['#text']);
    if (title) return title['#text'];
  }

  return null;
}

/**
 * 国立国会図書館の検索 API の結果から、著者を取得します。
 *
 * @param   ndlItem 国立国会図書館の検索 API の結果
 *
 * @returns         著者（複数の場合はカンマ区切り）
 */
export function extractAuthorsByNDLItemV2_0(ndlItem: NDLOpenSearchItemV2_0) {
  function extract(texts: NDLOpenSearchItemTextValueV2_0[]) {
    return (
      texts
        .filter((v) => v && v['#text'])
        .map((v) => {
          const text = v['#text'].trim();
          return text.replace(/\s*,\s*/g, ' ');
        })
        .join(', ') || null
    );
  }

  const dcCreator = ndlItem['dc:creator'];
  if (dcCreator) {
    const dcCreators = ensureArray(dcCreator);
    const creator = extract(dcCreators);
    if (creator) return creator;
  }

  const subAuthor = ndlItem['author'];
  if (subAuthor) {
    const authors = ensureArray(subAuthor);
    const author = extract(authors);
    if (author) return author;
  }

  return null;
}

/**
 * 国立国会図書館の検索 API の結果から、カテゴリを取得します。
 *
 * @param   ndlItem 国立国会図書館の検索 API の結果
 *
 * @returns         カテゴリ（複数の場合はカンマ区切り）
 */
export function extractCategoriesByNDLItemV2_0(ndlItem: NDLOpenSearchItemV2_0) {
  const category = ndlItem['category'];
  if (!category) return null;

  const categories = ensureArray(category);
  return (
    categories
      .filter((v) => v && v['#text'])
      .map((v) => v['#text'])
      .join(', ') || null
  );
}

/**
 * 国立国会図書館の検索 API の結果から、出版日を取得します。
 *
 * @param   ndlItem 国立国会図書館の検索 API の結果
 *
 * @returns         出版日（複数の場合はカンマ区切り）
 */
export function extractPublishedDatesByNDLItemV2_0(
  ndlItem: NDLOpenSearchItemV2_0,
) {
  const pubDate = ndlItem['pubDate'];
  if (!pubDate) return null;

  const dates = ensureArray(pubDate);
  return (
    dates
      .filter((v) => v && v['#text'])
      .map((v) => v['#text'])
      .join(', ') || null
  );
}

/**
 * 国立国会図書館の検索 API の結果から、サムネイル URL を取得します。
 *
 * @param   ndlItem 国立国会図書館の検索 API の結果
 *
 * @returns         サムネイル URL
 */
export function extractNDLThumbnailUrlByNDLItemV2_0(
  ndlItem: NDLOpenSearchItemV2_0,
) {
  const jpeCode = extractJPECodeByNDLItemV2_0(ndlItem)?.trim();
  if (jpeCode) {
    const _jpeCode = jpeCode.trim();
    if (_jpeCode) return createNDLThumbnailUrlV2_0(_jpeCode);
  }

  const isbn = extractISBNByNDLItemV2_0(ndlItem);
  if (isbn) {
    const _isbn = isbn.trim().replaceAll('-', '');
    if (_isbn) return createNDLThumbnailUrlV2_0(_isbn);
  }

  return null;
}

/**
 * 国立国会図書館の検索 API の結果から、書籍の基本情報を取得します。
 *
 * @param   ndlItem 国立国会図書館の検索 API の結果
 *
 * @returns         書籍の基本情報
 */
export function extractBasicPropertiesByNDLItemV2_0(
  ndlItem: NDLOpenSearchItemV2_0,
) {
  return {
    providerId: extractProviderIdByNDLItemV2_0(ndlItem),
    title: extractTitleByNDLItemV2_0(ndlItem),
    authors: extractAuthorsByNDLItemV2_0(ndlItem),
    categories: extractCategoriesByNDLItemV2_0(ndlItem),
    publishedDates: extractPublishedDatesByNDLItemV2_0(ndlItem),
    thumbnailUrl: extractNDLThumbnailUrlByNDLItemV2_0(ndlItem),
  };
}

/**
 * 国立国会図書館の検索 API の結果から、取得情報を取得します。
 *
 * @param   ndlResult 国立国会図書館の検索 API の結果
 *
 * @returns           取得情報
 */
export function extractResultStatusByNDLResultV2_0(
  ndlResult: NDLOpenSearchResultV2_0,
) {
  const count = Number(ndlResult['openSearch:itemsPerPage']['#text']) || 0;
  const startIndex = Number(ndlResult['openSearch:startIndex']['#text']) || 0;
  const totalCount = Number(ndlResult['openSearch:totalResults']['#text']) || 0;

  return {
    count,
    startIndex,
    totalCount,
    hasNextPage: startIndex + count < totalCount,
  };
}
