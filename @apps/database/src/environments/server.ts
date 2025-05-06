import { object, string } from 'valibot';

/**
 * 環境変数のスキーマ。
 */
export const envSchema = object({
  PRIVATE_TURSO_CONNECTION_URL: string(),
  PRIVATE_TURSO_AUTH_TOKEN: string(),
});
