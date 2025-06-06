import { object } from 'valibot';
import { digitStringWithTransformNumberSchema } from '../primitive/string';

/**
 * Pagination schema.
 */
export const paginationSchema = /*#__PURE__*/ object({
  page: digitStringWithTransformNumberSchema,
  perPage: digitStringWithTransformNumberSchema,
});
