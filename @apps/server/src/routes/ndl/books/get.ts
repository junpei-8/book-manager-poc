import { vValidator } from '@hono/valibot-validator';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { PRIVATE_AUTH_API_ACCESS_ORIGINS } from '../../../bases/vars';
import { getAuth, verifyAuth } from '../../../utils/auth';
import { ValidationError } from '../../../utils/error/validation';
import { extractResultStatusByNDLResultV2_0 } from '../../../utils/ndl/2_0/property';
import { fetchNDLOpenSearchV2_0 } from '../../../utils/ndl/2_0/search';
import { extractNDLBooksItemsByNDLResultV2_0 } from './_utils/ndl-books';
import { ndlBooksGetApiSchema } from './get.schema';

/**
 * NDL 書籍検索 API。
 */
export const ndlBooksGetApi = new Hono().get(
  '/ndl/books',
  cors({
    origin: PRIVATE_AUTH_API_ACCESS_ORIGINS,
    allowMethods: ['GET'],
    credentials: true,
  }),
  vValidator('query', ndlBooksGetApiSchema.query),
  async (c) => {
    // 認証済みユーザーのみ
    verifyAuth(await getAuth(c));

    const { keyword, isbn, page = 1, perPage = 8 } = c.req.valid('query');

    const pageNumber = Number(page);
    if (isNaN(pageNumber)) {
      throw new ValidationError({ message: 'Invalid page' });
    }

    const perPageNumber = Number(perPage);
    if (isNaN(perPageNumber)) {
      throw new ValidationError({ message: 'Invalid perPage' });
    }

    const ndlResult = await fetchNDLOpenSearchV2_0({
      any: keyword,
      isbn,
      idx: (pageNumber - 1) * perPageNumber + 1,
      cnt: perPageNumber,
    });

    const ndlItems = extractNDLBooksItemsByNDLResultV2_0(ndlResult);
    const ndlStatus = extractResultStatusByNDLResultV2_0(ndlResult);

    return c.json({
      items: ndlItems,
      totalCount: ndlStatus.totalCount,
      hasNextPage: ndlStatus.hasNextPage,
    });
  },
);
