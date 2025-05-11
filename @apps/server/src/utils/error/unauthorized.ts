import { HTTPException } from 'hono/http-exception';

/**
 * Unauthorized error.
 */
export class UnauthorizedError extends HTTPException {
  constructor(
    props: {
      code?: string;
      message?: string;
      cause?: unknown;
    } = {},
  ) {
    const status = 401;
    const {
      code = 'UNAUTHORIZED',
      message = 'Unauthorized',
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
          headers: {
            Authenticate: 'error="invalid_token"',
          },
        },
      ),
    });
  }
}
