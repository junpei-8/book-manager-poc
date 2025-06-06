import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nowTimestampMsSql } from './_core/date';
import { publicIdSql } from './_core/id';
import { userBookCollectionsTable } from './user-book-collections';
import { usersTable } from './users';

/**
 * User Phrases テーブルの名前。
 */
export const userPhrasesTableName = 'user_phrases';

/**
 * User Phrases テーブル。
 */
export const userPhrasesTable = sqliteTable(userPhrasesTableName, {
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
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),

  /**
   * ブックコレクションID。
   */
  userBookCollectionId: integer('user_book_collection_id')
    .notNull()
    .references(() => userBookCollectionsTable.id, { onDelete: 'cascade' }),

  /**
   * フレーズ内容。
   */
  content: text('content').notNull(),

  /**
   * ページ番号。
   */
  pageNumber: text('page_number'),

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

  /**
   * 削除日時。
   */
  deletedAt: integer('deleted_at', { mode: 'timestamp_ms' }),
});

/**
 * User Phrases テーブルのリレーション。
 */
export const userPhrasesRelations = relations(userPhrasesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [userPhrasesTable.userId],
    references: [usersTable.id],
  }),
  bookCollection: one(userBookCollectionsTable, {
    fields: [userPhrasesTable.userBookCollectionId],
    references: [userBookCollectionsTable.id],
  }),
}));
