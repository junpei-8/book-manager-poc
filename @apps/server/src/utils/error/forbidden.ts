import { HTTPException } from 'hono/http-exception';

/**
 * Forbidden error.
 */
export class ForbiddenError extends HTTPException {
  constructor(
    props: {
      code?: string;
      message?: string;
      cause?: unknown;
    } = {},
  ) {
    const status = 403;
    const {
      code = 'FORBIDDEN',
      message = 'Forbidden',
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
