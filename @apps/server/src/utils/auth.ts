import {
  userAccountsTable,
  userAccountsTableName,
} from '@apps/database/schemas/user-accounts';
import {
  userSessionsTable,
  userSessionsTableName,
} from '@apps/database/schemas/user-sessions';
import {
  userVerificationsTable,
  userVerificationsTableName,
} from '@apps/database/schemas/user-verifications';
import { usersTable, usersTableName } from '@apps/database/schemas/users';
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

  user: { modelName: usersTableName },
  account: { modelName: userAccountsTableName },
  session: { modelName: userSessionsTableName },
  verification: { modelName: userVerificationsTableName },

  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema: {
      [usersTableName]: usersTable,
      [userAccountsTableName]: userAccountsTable,
      [userSessionsTableName]: userSessionsTable,
      [userVerificationsTableName]: userVerificationsTable,
    },
  }),

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
      httpOnly: false,
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
