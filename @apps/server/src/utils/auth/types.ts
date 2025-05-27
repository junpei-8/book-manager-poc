import { type getAuth } from './getter';

/**
 * Auth type.
 */
export type Auth = NonNullable<Awaited<ReturnType<typeof getAuth>>>;
