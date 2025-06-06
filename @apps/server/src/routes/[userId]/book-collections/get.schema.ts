import { object, optional, string } from 'valibot';
import { booleanStringSchema } from '../../../schemas/primitive/string';
import { paginationSchema } from '../../../schemas/ref/pagination';
import { defineValidationSchema } from '../../../schemas/validation';

/**
 * User book collections get API query schema.
 */
export const userBookCollectionsGetApiSchema = defineValidationSchema({
  param: object({
    userId: string(),
  }),
  query: object({
    ...paginationSchema.entries,
    withoutPagination: optional(booleanStringSchema),
  }),
});
