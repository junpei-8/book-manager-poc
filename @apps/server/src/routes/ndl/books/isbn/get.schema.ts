import { object, string } from 'valibot';
import { defineValidationSchema } from '../../../../schemas/validation';

/**
 * ISBN取得APIのクエリスキーマ
 */
export const ndlBooksIsbnGetApiSchema = defineValidationSchema({
  query: object({
    value: string(),
  }),
});
