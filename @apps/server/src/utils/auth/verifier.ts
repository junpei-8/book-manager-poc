import { UnauthorizedError } from '../error/unauthorized';
import { type Auth } from './types';

/**
 * Verify auth.
 *
 * @param   auth Auth session
 *
 * @returns      User
 */
export function verifyAuth(auth: Auth | null) {
  if (!auth) {
    throw new UnauthorizedError();
  }

  return auth;
}
