import { custom, pipe, transform } from 'valibot';

/**
 * Digit string schema.
 */
export const digitStringSchema = /*#__PURE__*/ custom<`${number}`>(
  (input) => typeof input === 'string' && /^[0-9]+$/.test(input),
  'Input value is not a digit string.',
);

/**
 * Digit string schema with transform to number.
 */
export const digitStringWithTransformNumberSchema = /*#__PURE__*/ pipe(
  digitStringSchema,
  transform((value) => Number(value)),
);

/**
 * Boolean string schema.
 */
export const booleanStringSchema = /*#__PURE__*/ pipe(
  custom<'0' | '1' | 'true' | 'false'>(
    (input) =>
      typeof input === 'string' &&
      (input === '0' || input === '1' || input === 'true' || input === 'false'),
    'Input value is not a boolean string.',
  ),
  transform((value) => value === '1' || value === 'true'),
);
