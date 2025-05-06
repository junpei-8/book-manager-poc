import { pipe, regex, string, union } from 'valibot';

/**
 * ISBN-10 形式の文字列スキーマ ・9桁の数字＋末尾が数字またはX
 */
export const isbn10Schema = /*#__PURE__*/ pipe(
  string('入力値が文字列ではありません。'),
  regex(
    /^[0-9]{9}[0-9X]$/,
    'ISBN‑10 は 9桁の数字＋末尾が数字かX（大文字）である必要があります。',
  ),
);

/**
 * ISBN-13 形式の文字列スキーマ ・”978” または “979” で始まり、続く10桁は数字
 */
export const isbn13Schema = /*#__PURE__*/ pipe(
  string('入力値が文字列ではありません。'),
  regex(
    /^(?:978|979)[0-9]{10}$/,
    'ISBN‑13 は 978 または 979 で始まり、続く10桁は数字である必要があります。',
  ),
);

/**
 * ISBN-10 or ISBN-13 のいずれかを受け入れるスキーマ
 */
export const isbnSchema = /*#__PURE__*/ union(
  [isbn10Schema, isbn13Schema],
  '有効な ISBN‑10 もしくは ISBN‑13 を入力してください。',
);
