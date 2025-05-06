/// <reference types="../.astro/types.d.ts" />

/**
 * App Locals.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace App {
  interface Locals {
    user: import('better-auth').User | null;
    session: import('better-auth').Session | null;
  }
}

/**
 * Astro HTML JSX.
 */
declare namespace astroHTML.JSX {
  type Tags = keyof DefinedIntrinsicElements;

  type Attributes<Tag extends keyof DefinedIntrinsicElements | null = null> =
    IntrinsicAttributes &
      (Tag extends null ? {} : DefinedIntrinsicElements[NonNullable<Tag>]);
}
