import { vValidator } from '@hono/valibot-validator';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { PRIVATE_AUTH_API_ACCESS_ORIGINS } from '../bases/vars';
import { rootGetApiSchema } from './get.schema';

/**
 * Root get API.
 */
export const rootGetApi = new Hono().post(
  '/',
  cors({
    origin: PRIVATE_AUTH_API_ACCESS_ORIGINS,
    allowMethods: ['GET'],
    credentials: true,
  }),
  vValidator('query', rootGetApiSchema.query),
  (c) => {
    const { name } = c.req.valid('query');
    return c.json({
      message: `Hello ${name || 'World'}`,
    });
  },
);
