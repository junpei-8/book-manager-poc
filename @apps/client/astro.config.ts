import { parseArgs } from 'node:util';
import react from '@astrojs/react';
import compress from '@playform/compress';
import tailwindcss from '@tailwindcss/vite';
import compressor from 'astro-compressor';
import { defineConfig } from 'astro/config';
import envSchema from './src/environments';

/**
 * コマンドライン引数。
 */
const { values: args } = parseArgs({
  strict: false,
  options: {
    port: {
      type: 'string',
      default: '4321',
    },
  },
});

/**
 * 開発ポート。
 */
const DEV_PORT = Number(args.port);

/**
 * 開発プロキシ URL。
 */
const DEV_PROXY_URL = process.env.DEV_API_PROXY_URL;

/**
 * 開発プロキシパス。
 */
const DEV_PROXY_PATH = process.env.DEV_API_PROXY_PATH;

/**
 * Tauri の開発ホスト。
 */
const DEV_TAURI_HOST = process.env.TAURI_DEV_HOST;

/**
 * @see {@link https://astro.build/config | Astro Configuration}
 */
export default defineConfig({
  integrations: [
    /**
     * @see {@link https://docs.astro.build/guides/integrations-guide/react | Astro React Integration}
     */
    react(),

    /**
     * @see {@link https://www.npmjs.com/package/@playform/compress | Compress}
     */
    compress({
      HTML: true,
      CSS: true,
      JavaScript: true,
      Image: true,
      SVG: true,
      JSON: true,
      Logger: 1,
    }),

    /**
     * @see {@link https://www.npmjs.com/package/astro-compressor | Astro Compressor}
     */
    compressor({
      gzip: false,
    }),
  ],

  server: {
    port: DEV_PORT,
  },

  env: {
    schema: envSchema,
  },

  vite: {
    plugins: [
      /**
       * @see {@link https://tailwindcss.com/docs/guides/astro | Tailwind CSS for Astro}
       */
      tailwindcss(),
    ],
    server: {
      port: DEV_PORT,
      host: DEV_TAURI_HOST,
      hmr: DEV_TAURI_HOST
        ? {
            protocol: 'ws',
            port: DEV_PORT + 1,
            host: DEV_TAURI_HOST,
          }
        : undefined,
      proxy: {
        ...(DEV_PROXY_URL && DEV_PROXY_PATH
          ? {
              [DEV_PROXY_PATH]: {
                target: DEV_PROXY_URL,
                changeOrigin: true,
                secure: false,
              },
            }
          : {}),
      },
      watch: {
        ignored: ['**/src-tauri/**'],
      },
    },
    build: {
      assetsInlineLimit: 0,
      minify: 'terser',
      terserOptions: {
        compress: {
          passes: 2,
        },
      },
    },
  },
});
