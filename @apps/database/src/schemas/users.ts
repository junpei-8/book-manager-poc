import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nowTimestampMsSql } from './_core/date';
import { publicIdSql } from './_core/id';
import { userAuthAccountsTable } from './user-auth-accounts';
import { userAuthSessionsTable } from './user-auth-sessions';

/**
 * Users テーブルの名前。
 */
export const usersTableName = 'users';

/**
 * Users テーブル。
 */
export const usersTable = sqliteTable(
  usersTableName,
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
     * 名前。
     */
    name: text('name').notNull(),

    /**
     * メールアドレス。
     */
    email: text('email').notNull().unique(),

    /**
     * メールアドレスが確認されているかどうか。
     */
    emailVerified: integer('email_verified', { mode: 'boolean' })
      .notNull()
      .default(false),

    /**
     * 画像。
     */
    image: text('image'),

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
  // NOTE: 現状 id, publicId, email は PK or UQ であるためインデックスを作成する必要がなく name は曖昧検索になることが多いため作成しない
);

/**
 * Users テーブルのリレーション。
 */
export const usersRelations = relations(usersTable, ({ many }) => ({
  sessions: many(userAuthSessionsTable),
  accounts: many(userAuthAccountsTable),
}));
