import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nowTimestampMsSql } from './_core/date';
import { publicIdSql } from './_core/id';
import { usersTable } from './users';

/**
 * User Accounts テーブルの名前。
 */
export const userAuthAccountsTableName = 'user_auth_accounts';

/**
 * User Accounts テーブル。
 */
export const userAuthAccountsTable = sqliteTable(
  userAuthAccountsTableName,
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
    userId: text('user_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),

    /**
     * アカウントID。
     */
    accountId: text('account_id').notNull(),

    /**
     * プロバイダーID。
     */
    providerId: text('provider_id').notNull(),

    /**
     * アクセストークン。
     */
    accessToken: text('access_token'),

    /**
     * リフレッシュトークン。
     */
    refreshToken: text('refresh_token'),

    /**
     * アクセストークンの有効期限。
     */
    accessTokenExpiresAt: integer('access_token_expires_at', {
      mode: 'timestamp_ms',
    }),

    /**
     * リフレッシュトークンの有効期限。
     */
    refreshTokenExpiresAt: integer('refresh_token_expires_at', {
      mode: 'timestamp_ms',
    }),

    /**
     * スコープ。
     */
    scope: text('scope'),

    /**
     * IDトークン。
     */
    idToken: text('id_token'),

    /**
     * パスワード。
     */
    password: text('password'),

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
  // NOTE: 現状 id, publicId, userId は PK or UQ であるためインデックスを作成する必要がない
);

/**
 * ユーザーアカウントのリレーション。
 */
export const userAuthAccountsRelations = relations(
  userAuthAccountsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [userAuthAccountsTable.userId],
      references: [usersTable.id],
    }),
  }),
);
