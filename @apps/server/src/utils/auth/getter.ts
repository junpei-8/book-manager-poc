import { type Context } from 'hono';
import { auth } from './provider';

/**
 * Get auth.
 *
 * @param   context Context
 *
 * @returns         Auth session
 */
export function getAuth(context: Context) {
  return auth.api.getSession({ headers: context.req.raw.headers });
}
