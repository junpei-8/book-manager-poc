import { defineCommand, runMain } from 'citty';
import consola from 'consola';
import { sql } from 'drizzle-orm';
import { retry } from 'es-toolkit';
import { parse } from 'valibot';
import { envSchema } from '../../environments/server';
import { createDBClient, type DBClient } from '../../index';
import {
  createConsolaLogLevelDescription,
  setupConsolaLogLevel,
} from '../_utils/consola';

/**
 * データベースのヘルスチェックを行う関数。
 *
 * @param props         パラメーター
 * @param props.db      データベースのクライアント
 * @param props.retries 最大リトライ回数
 * @param props.delay   リトライ間隔（ミリ秒）
 * @param props.timeout 初期タイムアウト時間（ミリ秒）
 */
async function healthCheck({
  db,
  retries,
  timeout = 800,
  delay = 3200,
}: {
  db: DBClient;
  retries?: number;
  delay?: number;
  timeout?: number;
}) {
  if (timeout) {
    await new Promise((resolve) => setTimeout(resolve, timeout));
  }

  await retry(
    () =>
      db
        .run(sql`SELECT 1`)
        .then(() => consola.success('Health check passed.'))
        .catch((err) => {
          consola.debug(`Health check failed: `, err);
          throw err;
        }),
    {
      retries,
      delay,
    },
  );
}

/**
 * データベースのヘルスチェックを行うコマンド。
 */
const command = defineCommand({
  meta: {
    name: 'wait',
    description: 'Wait for the database to be ready.',
  },
  args: {
    'log-level': {
      type: 'string',
      default: 'info',
      description: createConsolaLogLevelDescription(),
    },
    retries: {
      type: 'string',
      description: 'Retries for the health check.',
    },
    timeout: {
      type: 'string',
      description: 'Timeout for the health check.',
    },
    delay: {
      type: 'string',
      description: 'Delay for the health check.',
    },
  },
  async run({ args }) {
    // ログの設定
    if (args['log-level']) {
      setupConsolaLogLevel(args['log-level']);
    }

    // サーバー環境変数をパースする
    const env = parse(envSchema, process.env);

    // データベースのクライアントを作成する
    const db = createDBClient({
      url: env.PRIVATE_TURSO_CONNECTION_URL,
      authToken: env.PRIVATE_TURSO_AUTH_TOKEN,
    });

    // データベースの接続チェックを行う
    await healthCheck({
      db,
      delay: Number(args.delay) || void 0,
      timeout: Number(args.timeout) || void 0,
      retries: Number(args.retries) || void 0,
    });
  },
});

/**
 * コマンドを実行する。
 */
await runMain(command);
