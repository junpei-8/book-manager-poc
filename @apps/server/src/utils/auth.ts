import { userAccountsTable } from '@apps/database/schemas/user-accounts';
import { userSessionsTable } from '@apps/database/schemas/user-sessions';
import { userVerificationsTable } from '@apps/database/schemas/user-verifications';
import { usersTable } from '@apps/database/schemas/users';
import { betterAuth as betterAuthProvider } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { type Context } from 'hono';
import { env } from '../bases/env';
import { PRIVATE_AUTH_API_ACCESS_ORIGINS } from '../bases/vars';
import { db } from './db';
import { ForbiddenError } from './error/forbidden';
import { UnauthorizedError } from './error/unauthorized';

/**
 * Auth provider with Better Auth and Drizzle.
 */
export const auth = betterAuthProvider({
  // ##############
  // ## Settings ##
  // ##############

  basePath: '/api/auth',
  baseURL: env.PRIVATE_AUTH_API_BASE_URL,
  secret: env.PRIVATE_AUTH_API_SECRET_KEY,
  trustedOrigins: PRIVATE_AUTH_API_ACCESS_ORIGINS,

  // ############
  // ## Models ##
  // ############

  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema: {
      user: usersTable,
      account: userAccountsTable,
      session: userSessionsTable,
      verification: userVerificationsTable,
    },
  }),

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 600,
    },
  },

  // ######################
  // ## Social Providers ##
  // ######################

  socialProviders: {
    google: {
      clientId: env.PRIVATE_GOOGLE_OAUTH_CLIENT_ID as string,
      clientSecret: env.PRIVATE_GOOGLE_OAUTH_CLIENT_SECRET as string,
    },
  },

  // #######################
  // ## Advanced Settings ##
  // #######################

  advanced: {
    defaultCookieAttributes: {
      secure: true,
      httpOnly: true,
      sameSite: 'none',
      partitioned: true,
    },
    database: {
      generateId: false,
    },
  },
}) as ReturnType<typeof betterAuthProvider>;

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

/**
 * Verify auth.
 *
 * @param   auth Auth session
 *
 * @returns      User
 */
export function verifyAuth(auth: Awaited<ReturnType<typeof getAuth>>) {
  if (!auth) {
    throw new UnauthorizedError();
  }

  if (!auth.user) {
    throw new ForbiddenError();
  }

  return auth;
}
