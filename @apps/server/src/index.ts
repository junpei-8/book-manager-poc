import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { authAllApi } from './routes/auth/all';
import { rootGetApi } from './routes/get';

/**
 * Create a new Hono app.
 */
const app = new Hono()
  .use('*', logger())
  .route('/api', authAllApi)
  .route('/api', rootGetApi);

/**
 * Export the Hono app.
 */
export default app;
