/**
 * 配列に変換する。
 *
 * @param   value 変換する値。
 *
 * @returns       配列。
 */
export function ensureArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}
