import { core } from '@packages-codebase/prettier';
import { mergeConfig } from '@packages-codebase/prettier/utils';

/**
 * Prettier configuration.
 */
export default mergeConfig(
  core,
  {
    overrides: [
      {
        files: ['*.animation.json'],
        options: { parser: 'ignore' },
      },
    ],
  },
  {
    /**
     * Load the Tailwind plugin.
     */
    plugins: ['prettier-plugin-tailwindcss'],

    /**
     * @see {@link https://github.com/tailwindlabs/prettier-plugin-tailwindcss?tab=readme-ov-file#specifying-your-tailwind-javascript-config-path | Document}
     */
    tailwindStylesheet: './src/styles/tailwind.css',
  },
);
