import { type ValidationTargets } from 'hono';
import { type BaseIssue, type BaseSchema } from 'valibot';

/**
 * Validation schema.
 */
export type ValidationSchema = {
  [key in keyof ValidationTargets]?: BaseSchema<
    unknown,
    unknown,
    BaseIssue<unknown>
  >;
};

/**
 * Define validation schema.
 *
 * @param   schema Validation schema.
 *
 * @returns        Validation schema.
 */
export function defineValidationSchema<Schema extends ValidationSchema>(
  schema: Schema,
) {
  return schema;
}
