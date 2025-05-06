import { parseArgs } from 'node:util';
import { cloudflare } from '@cloudflare/vite-plugin';
import cloudflareBuild from '@hono/vite-build/cloudflare-workers';
import { defineConfig } from 'vite';

/**
 * コマンドライン引数。
 */
const { values: args } = parseArgs({
  strict: false,
  options: {
    port: {
      type: 'string',
      default: '5173',
    },
  },
});

/**
 * 開発ポート。
 */
const DEV_PORT = Number(args.port);

/**
 * Vite の設定。
 */
export default defineConfig(({ command }) => ({
  plugins: [
    ...(command === 'serve'
      ? [
          /**
           * @see {@link https://www.npmjs.com/package/@cloudflare/vite-plugin | Document}
           */
          cloudflare(),
        ]
      : [
          /**
           * @see {@link https://www.npmjs.com/package/@hono/vite-build | Document}
           */
          cloudflareBuild(),
        ]),
  ],

  server: {
    port: DEV_PORT,
  },

  build: {
    rollupOptions: {
      external: [/^cloudflare:.*$/],
    },
  },
}));
