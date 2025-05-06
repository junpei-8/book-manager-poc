import { env } from './env';

/**
 * アクセスを許可するオリジン。
 */
export const PRIVATE_AUTH_API_ACCESS_ORIGINS =
  /*#__PURE__*/ env.PRIVATE_AUTH_API_ACCESS_ORIGIN.split(',');
