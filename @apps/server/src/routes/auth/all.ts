import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { PRIVATE_AUTH_API_ACCESS_ORIGINS } from '../../bases/vars';
import { auth } from '../../utils/auth';

/**
 * Auth all API.
 */
export const authAllApi = new Hono().on(
  ['GET', 'POST'],
  '/auth/*',
  cors({
    origin: PRIVATE_AUTH_API_ACCESS_ORIGINS,
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  }),
  (c) => auth.handler(c.req.raw),
);
