import { HTTPException } from 'hono/http-exception';

/**
 * Not found error.
 */
export class NotFoundError extends HTTPException {
  constructor(
    props: {
      code?: string;
      message?: string;
      cause?: unknown;
    } = {},
  ) {
    const status = 404;
    const {
      code = 'NOT_FOUND',
      message = 'Not found',
      cause, //
    } = props;

    super(status, {
      cause,
      res: new Response(
        JSON.stringify({
          code,
          message,
        }),
        {
          status,
        },
      ),
    });
  }
}
