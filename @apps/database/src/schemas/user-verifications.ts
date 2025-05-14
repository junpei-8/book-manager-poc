import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nowTimestampMsSql } from './core/date';
import { publicIdSql } from './core/id';

/**
 * User Verifications テーブルの名前。
 */
export const userVerificationsTableName = 'user_verifications';

/**
 * User Verifications テーブル。
 */
export const userVerificationsTable = sqliteTable(
  userVerificationsTableName,
  {
    /**
     * 主キー。
     */
    id: integer('id').primaryKey(),

    /**
     * ID。
     */
    publicId: text('public_id').notNull().unique().default(publicIdSql),

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
    updatedAt: integer('updated_at', { mode: 'timestamp_ms' }),
  },
  (table) => {
    const name = userVerificationsTableName;
    return [
      // 識別子でのルックアップを高速化するためのインデックス
      index(`${name}_identifier_index`).on(table.identifier),

      // 有効期限切れのレコードを効率的に検索するためのインデックス
      index(`${name}_expires_at_index`).on(table.expiresAt),
    ];
  },
);
