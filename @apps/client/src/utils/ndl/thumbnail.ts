/**
 * 国立国会図書館のサムネイルの URL を作成する。
 *
 * @param   isbnOrJPECode ISBN または JP-e コード
 *
 * @returns               国立国会図書館のサムネイルの URL
 *
 * @see {@link https://ndlsearch.ndl.go.jp/help/api/thumbnail | Document}
 */
export function createNDLThumbnailUrl(isbnOrJPECode: string) {
  return `https://iss.ndl.go.jp/thumbnail/${isbnOrJPECode}`;
}
