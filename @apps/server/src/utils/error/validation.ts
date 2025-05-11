import { HTTPException } from 'hono/http-exception';

/**
 * バリデーションエラー。
 */
export class ValidationError extends HTTPException {
  constructor(
    props: {
      code?: string;
      message?: string;
      cause?: unknown;
    } = {},
  ) {
    const status = 400;
    const {
      code = 'VALIDATION_ERROR',
      message = 'Validation Error',
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
