/**
 * Whether the code is not running on the server.
 */
export const isClient = typeof window !== 'undefined';

/**
 * 環境変数
 */
export const env: typeof window.__ENV__ = isClient
  ? window.__ENV__
  : { context: 'server' };
