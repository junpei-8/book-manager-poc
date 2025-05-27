import { userBookCollectionsTable } from '@apps/database/schemas/user-book-collections';
import { vValidator } from '@hono/valibot-validator';
import { count, eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { PRIVATE_AUTH_API_ACCESS_ORIGINS } from '../../../bases/vars';
import { getAuth } from '../../../utils/auth/getter';
import { isMyUserIdParam } from '../../../utils/auth/users/verifier';
import { verifyAuth } from '../../../utils/auth/verifier';
import { db } from '../../../utils/db';
import { ForbiddenError } from '../../../utils/error/forbidden';
import { NotFoundError } from '../../../utils/error/not-found';
import { transformOffsetLimitPaginationParams } from '../../../utils/pagination';
import { userBookCollectionsGetApiSchema } from './get.schema';

/**
 * 利用者の書籍一覧取得 API。
 */
export const userBookCollectionsGetApi = new Hono().get(
  '/:userId/book-collections',
  cors({
    origin: PRIVATE_AUTH_API_ACCESS_ORIGINS,
    allowMethods: ['GET'],
    credentials: true,
  }),
  vValidator('param', userBookCollectionsGetApiSchema.param),
  vValidator('query', userBookCollectionsGetApiSchema.query),
  async (c) => {
    // 認証情報を検証する
    const auth = verifyAuth(await getAuth(c));

    // パラメーターの整理
    const params = c.req.valid('param');
    const queryParams = c.req.valid('query');
    const paginationParams = transformOffsetLimitPaginationParams(queryParams);

    // リクエストパラメーターが自身のユーザーIDでない場合はエラーを返す
    if (!isMyUserIdParam(params.userId)) {
      throw new ForbiddenError();
    }

    // 対象ユーザーのID
    const targetUserId = Number(auth.user.id);
    if (!targetUserId) {
      throw new NotFoundError();
    }

    // 書籍コレクションの取得条件
    const bookCollectionsCondition = eq(
      userBookCollectionsTable.userId,
      targetUserId,
    );

    // eslint-disable-next-line func-style
    const fetchBookCollections = () =>
      db
        .select({
          publicId: userBookCollectionsTable.publicId,
          title: userBookCollectionsTable.title,
          thumbnailUrl: userBookCollectionsTable.thumbnailUrl,
        })
        .from(userBookCollectionsTable)
        .where(bookCollectionsCondition)
        .limit(paginationParams.limit)
        .offset(paginationParams.offset);

    // 書籍コレクションの取得
    const [bookCollections, [bookCollectionsSummary]] =
      queryParams.withoutPagination
        ? [
            await fetchBookCollections(),
            [{ totalCount: 0 }], // ページネーションを無視した場合は、総件数を0とする
          ]
        : await db.batch([
            fetchBookCollections(),
            db
              .select({ totalCount: count() })
              .from(userBookCollectionsTable)
              .where(bookCollectionsCondition),
          ]);

    // レスポンスを返す
    const totalCount = bookCollectionsSummary?.totalCount ?? 0;
    return c.json({
      items: bookCollections,
      totalCount,
      hasNextPage:
        paginationParams.offset + paginationParams.limit < totalCount,
    });
  },
);
