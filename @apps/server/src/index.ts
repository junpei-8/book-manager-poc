import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { userBookCollectionsGetApi } from './routes/[userId]/book-collections/get';
import { authAllApi } from './routes/auth/all';
import { ndlBooksGetApi } from './routes/ndl/books/get';
import { ndlBooksIsbnGetApi } from './routes/ndl/books/isbn/get';

/**
 * Create a new Hono app.
 */
const app = new Hono()
  .use('*', logger())
  .route('/api', authAllApi)
  .route('/api', userBookCollectionsGetApi)
  .route('/api', ndlBooksGetApi)
  .route('/api', ndlBooksIsbnGetApi);

/**
 * Export the Hono app.
 */
export default app;
