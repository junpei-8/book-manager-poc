import { sql } from 'drizzle-orm';

/**
 * UUID を生成する SQL 式。
 */
export const uuidSql = sql`(upper(replace(uuid(), '-', '')))`;
