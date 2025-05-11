/**
 * NDL 書籍情報。
 */
export interface NDLBooksItem {
  providerId: string;
  title: string;
  authors: string[];
  categories: string[];
  publishedDates: string[];
  thumbnailUrl?: string;
}
