/**
 * 基本的な文字列型の型。
 */
export interface NDLSearchItemTextValue {
  '#text': string;
}

/**
 * 国立国会図書館サーチ API の単一の項目の型。
 */
export type NDLSearchSingleItem<T> = T;

/**
 * 国立国会図書館サーチ API の複数の項目の型。
 */
export type NDLSearchMultipleItem<T> = T | T[];
