import { type Server } from '@apps/server';
import { PUBLIC_API_BASE_URL } from 'astro:env/client';
import { hc } from 'hono/client';

/**
 * Server client.
 */
export const server = /*#__PURE__*/ hc<Server>(PUBLIC_API_BASE_URL, {
  fetch: ((input, init) =>
    fetch(input, {
      ...init,
      credentials: 'include',
    })) satisfies typeof fetch,
});
