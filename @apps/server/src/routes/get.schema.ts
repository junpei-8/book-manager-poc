import { object, optional, string } from 'valibot';
import { defineValidationSchema } from '../schemas/validation';

/**
 * Root get query schema.
 */
export const rootGetApiSchema = defineValidationSchema({
  query: object({
    name: optional(string()),
  }),
});
