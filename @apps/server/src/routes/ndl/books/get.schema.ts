import { object, optional, string } from 'valibot';
import { defineValidationSchema } from '../../../schemas/validation';

/**
 * Root get query schema.
 */
export const ndlBooksGetApiSchema = defineValidationSchema({
  query: object({
    // Params
    keyword: optional(string()),
    isbn: optional(string()),

    // Pagination
    page: optional(string()),
    perPage: optional(string()),
  }),
});
