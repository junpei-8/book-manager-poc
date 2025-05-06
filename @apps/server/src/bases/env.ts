import { env as cloudflareEnv } from 'cloudflare:workers';
import { object, optional, parse, picklist, string } from 'valibot';

/**
 * 環境変数のスキーマ。
 */
export const envSchema = object({
  // 環境
  ENV: picklist(['development', 'staging', 'production']),
  DEV_PORT: optional(string()),

  // 認証サーバーの設定
  PRIVATE_AUTH_API_BASE_URL: string(),
  PRIVATE_AUTH_API_SECRET_KEY: string(),
  PRIVATE_AUTH_API_ACCESS_ORIGIN: string(),

  // データベース接続情報
  PRIVATE_DATABASE_URL: string(),
  PRIVATE_DATABASE_AUTH_TOKEN: string(),

  // Google OAuth 情報
  PRIVATE_GOOGLE_OAUTH_CLIENT_ID: string(),
  PRIVATE_GOOGLE_OAUTH_CLIENT_SECRET: string(),
});

/**
 * 環境変数。
 */
export const env = parse(envSchema, cloudflareEnv);
