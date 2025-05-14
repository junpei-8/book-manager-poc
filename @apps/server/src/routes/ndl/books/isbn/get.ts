import { vValidator } from '@hono/valibot-validator';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { PRIVATE_AUTH_API_ACCESS_ORIGINS } from '../../../../bases/vars';
import { getAuth, verifyAuth } from '../../../../utils/auth';
import { NotFoundError } from '../../../../utils/error/not-found';
import { fetchNDLOpenSearchV2_0 } from '../../../../utils/ndl/2_0/search';
import { extractNDLBooksItemsByNDLResultV2_0 } from '../_utils/ndl-books';
import { ndlBooksIsbnGetApiSchema } from './get.schema';

/**
 * ISBN を元に国立国会図書館の検索 API を実行します。
 */
export const ndlBooksIsbnGetApi = new Hono().get(
  '/ndl/books/isbn',
  cors({
    origin: PRIVATE_AUTH_API_ACCESS_ORIGINS,
    allowMethods: ['GET'],
    credentials: true,
  }),
  vValidator('query', ndlBooksIsbnGetApiSchema.query),
  async (c) => {
    // 認証済みユーザーのみ
    verifyAuth(await getAuth(c));

    const { value } = c.req.valid('query');
    const ndlResult = await fetchNDLOpenSearchV2_0({
      isbn: value,
      cnt: 1,
    });

    const ndlItems = extractNDLBooksItemsByNDLResultV2_0(ndlResult);
    const item = ndlItems[0];

    // 見つからない場合はエラーを返す
    if (!item) {
      throw new NotFoundError();
    }

    return c.json({ item });
  },
);
