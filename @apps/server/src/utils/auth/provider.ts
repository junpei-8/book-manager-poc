import { userAuthAccountsTable } from '@apps/database/schemas/user-auth-accounts';
import { userAuthSessionsTable } from '@apps/database/schemas/user-auth-sessions';
import { userAuthVerificationsTable } from '@apps/database/schemas/user-auth-verifications';
import { usersTable } from '@apps/database/schemas/users';
import { betterAuth as betterAuthProvider } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { env } from '../../bases/env';
import { PRIVATE_AUTH_API_ACCESS_ORIGINS } from '../../bases/vars';
import { db } from '../db';

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
      account: userAuthAccountsTable,
      session: userAuthSessionsTable,
      verification: userAuthVerificationsTable,
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
      clientId: env.PRIVATE_GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: env.PRIVATE_GOOGLE_OAUTH_CLIENT_SECRET,
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
