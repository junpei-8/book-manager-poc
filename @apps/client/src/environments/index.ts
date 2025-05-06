import { type AstroUserConfig } from 'astro';

/**
 * 環境変数のスキーマ。
 */
export default {
  PUBLIC_API_BASE_URL: {
    type: 'string',
    context: 'client',
    access: 'public',
  },
  PUBLIC_API_BASE_PATH: {
    type: 'string',
    context: 'client',
    access: 'public',
  },
  PUBLIC_AUTH_API_BASE_URL: {
    type: 'string',
    context: 'client',
    access: 'public',
  },
  PUBLIC_AUTH_API_BASE_PATH: {
    type: 'string',
    context: 'client',
    access: 'public',
  },
} satisfies NonNullable<AstroUserConfig['env']>['schema'];
