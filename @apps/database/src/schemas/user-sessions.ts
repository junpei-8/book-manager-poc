import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nowTimestampMsSql } from './core/date';
import { publicIdSql } from './core/id';
import { usersTable } from './users';

/**
 * User Sessions テーブルの名前。
 */
export const userSessionsTableName = 'user_sessions';

/**
 * User Sessions テーブル。
 */
export const userSessionsTable = sqliteTable(userSessionsTableName, {
  /**
   * 主キー。
   */
  id: integer('id').primaryKey(),

  /**
   * 公開ID。
   */
  publicId: text('public_id').notNull().unique().default(publicIdSql),

  /**
   * ユーザーID。
   */
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),

  /**
   * トークン。
   */
  token: text('token').notNull(),

  /**
   * 有効期限。
   */
  expiresAt: integer('expires_at', { mode: 'timestamp_ms' }).notNull(),

  /**
   * IPアドレス。
   */
  ipAddress: text('ip_address'),

  /**
   * ユーザーエージェント。
   */
  userAgent: text('user_agent'),

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

/**
 * ユーザーセッションのリレーション。
 */
export const userSessionsRelations = relations(
  userSessionsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [userSessionsTable.userId],
      references: [usersTable.id],
    }),
  }),
);
