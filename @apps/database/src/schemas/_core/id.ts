import { sql } from 'drizzle-orm';

/**
 * 24文字の ID を生成する SQL 式。
 */
export const publicIdSql = sql`(upper(substr(hex(cast((julianday('now') - 2440587.5) * 86400000 as integer)) || '000000000000', 1, 12) || substr(hex(randomblob(6)), 1, 12)))`;
