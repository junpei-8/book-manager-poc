import { relations } from 'drizzle-orm';
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';
import { nowTimestampMsSql } from './_core/date';
import { publicIdSql } from './_core/id';
import { userPhrasesTable } from './user-phrases';
import { usersTable } from './users';

/**
 * User Book Collections テーブルの名前。
 */
export const userBookCollectionsTableName = 'user_book_collections';

/**
 * User Book Collections テーブル。
 */
export const userBookCollectionsTable = sqliteTable(
  userBookCollectionsTableName,
  {
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
     * プロバイダーID。
     */
    providerId: text('provider_id').notNull(),

    /**
     * プロバイダータイプ。
     */
    providerType: text('provider_type').notNull(),

    /**
     * タイトル。
     */
    title: text('title').notNull(),

    /**
     * 著者。
     */
    authors: text('authors'),

    /**
     * カテゴリー。
     */
    categories: text('categories'),

    /**
     * サムネイルURL。
     */
    thumbnailUrl: text('thumbnail_url'),

    /**
     * 出版日。
     */
    publishedDates: text('published_dates'),

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
  },
  (table) => {
    const name = userBookCollectionsTableName;
    return [
      // プロバイダーIDとプロバイダータイプの組み合わせでユニーク制約を設定
      uniqueIndex(`${name}_provider_id_and_provider_type_unique_index`).on(
        table.providerId,
        table.providerType,
      ),
    ];
  },
);

/**
 * User Book Collections テーブルのリレーション。
 */
export const userBookCollectionsRelations = relations(
  userBookCollectionsTable,
  ({ one, many }) => ({
    user: one(usersTable, {
      fields: [userBookCollectionsTable.userId],
      references: [usersTable.id],
    }),
    phrases: many(userPhrasesTable),
  }),
);
