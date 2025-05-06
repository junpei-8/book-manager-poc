import { $ } from 'bun';
import { defineCommand, runMain } from 'citty';
import {
  createConsolaLogLevelDescription,
  setupConsolaLogLevel,
} from '../_utils/consola';

/**
 * マイグレーションを実行する関数
 */
async function migrationUp() {
  await $`bun drizzle-kit migrate`;
}

/**
 * マイグレーションを実行するコマンド。
 */
const command = defineCommand({
  meta: {
    name: 'up',
    description: 'Run the migrations.',
  },
  args: {
    'log-level': {
      type: 'string',
      default: 'info',
      description: createConsolaLogLevelDescription(),
    },
  },
  async run({ args }) {
    // ログの設定
    if (args['log-level']) {
      setupConsolaLogLevel(args['log-level']);
    }

    // マイグレーションを実行する
    await migrationUp();
  },
});

/**
 * コマンドを実行する。
 */
await runMain(command);
