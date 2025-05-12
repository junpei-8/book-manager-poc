import { core } from '@packages-codebase/prettier';
import { mergeConfig } from '@packages-codebase/prettier/utils';

/**
 * Prettier configuration.
 */
export default mergeConfig(core, {
  overrides: [
    {
      files: ['src/migrations/**/*'],
      options: { parser: 'ignore' },
    },
  ],
});
