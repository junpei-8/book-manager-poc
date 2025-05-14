import { ensureArray } from '../../../../utils/array';
import { extractBasicPropertiesByNDLItemV2_0 } from '../../../../utils/ndl/2_0/property';
import { type NDLOpenSearchResultV2_0 } from '../../../../utils/ndl/2_0/search';
import { type NDLBooksItem } from '../_schemas/ndl-books.type';

/**
 * 国立国会図書館の検索 API の結果から、書籍の基本情報を取得します。
 *
 * @param   ndlResult 国立国会図書館の検索 API の結果
 *
 * @returns           書籍の基本情報
 */
export function extractNDLBooksItemsByNDLResultV2_0(
  ndlResult: NDLOpenSearchResultV2_0,
) {
  const items = ndlResult.item ? ensureArray(ndlResult.item) : [];
  const result: NDLBooksItem[] = [];

  for (let i = 0, length = items.length; i < length; i++) {
    const item = items[i];
    if (!item) continue;

    const properties = extractBasicPropertiesByNDLItemV2_0(item);
    if (!properties.title || !properties.providerId) {
      continue;
    }

    result.push({
      ...properties,
      providerId: properties.providerId,
      title: properties.title,
      authors: properties.authors?.split(',') || [],
      categories: properties.categories?.split(',') || [],
      publishedDates: properties.publishedDates?.split(',') || [],
      thumbnailUrl: properties.thumbnailUrl || undefined,
    });
  }

  return result;
}
