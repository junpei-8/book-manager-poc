import { createDBClient, type DBClient } from '@apps/database';
import { env } from '..//bases/env';

/**
 * Database client.
 */
export const db: DBClient = createDBClient({
  url: env.PRIVATE_DATABASE_URL,
  authToken: env.PRIVATE_DATABASE_AUTH_TOKEN,
});
