import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nowTimestampMsSql } from './core/date';
import { uuidSql } from './core/uuid';

/**
 * User Verifications テーブルの名前。
 */
export const userVerificationsTableName = 'user_verifications';

/**
 * User Verifications テーブル。
 */
export const userVerificationsTable = sqliteTable(userVerificationsTableName, {
  /**
   * 主キー。
   */
  id: integer('id').primaryKey(),

  /**
   * ID。
   */
  publicId: text('public_id').notNull().unique().default(uuidSql),

  /**
   * 識別子。
   */
  identifier: text('identifier').notNull(),

  /**
   * 値。
   */
  value: text('value').notNull(),

  /**
   * 有効期限。
   */
  expiresAt: integer('expires_at', { mode: 'timestamp_ms' }).notNull(),

  /**
   * 作成日時。
   */
  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .notNull()
    .default(nowTimestampMsSql),

  /**
   * 更新日時。
   */
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .notNull()
    .default(nowTimestampMsSql),
});
