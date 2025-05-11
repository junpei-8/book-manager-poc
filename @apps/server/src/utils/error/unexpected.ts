import { HTTPException } from 'hono/http-exception';

/**
 * Unexpected error.
 */
export class UnexpectedError extends HTTPException {
  constructor(
    props: {
      code?: string;
      message?: string;
      cause?: unknown;
    } = {},
  ) {
    const status = 500;
    const {
      code = 'UNEXPECTED',
      message = 'Unexpected error',
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
