// import path from 'node:path';
// import sqlite3 from 'better-sqlite3';
// import { defineCommand, runMain } from 'citty';
// import { parse } from 'valibot';
// import { envSchema } from '../../environments/server';
// import {
//   createConsolaLogLevelDescription,
//   setupConsolaLogLevel,
// } from '../_utils/consola';

// /**
//  * SQLite拡張機能をロードする関数。
//  *
//  * @param props           パラメーター
//  * @param props.db        データベースのクライアント
//  * @param props.extension ロードする拡張機能のパス
//  */
// async function loadExtension({
//   db,
//   extension,
// }: {
//   db: ReturnType<typeof sqlite3>;
//   extension: string;
// }) {
//   // 拡張機能をロードする
//   await db.loadExtension(extension);
// }

// /**
//  * SQLite拡張機能をロードするコマンド。
//  */
// const command = defineCommand({
//   meta: {
//     name: 'load',
//     description: 'Load SQLite extensions.',
//   },
//   args: {
//     'log-level': {
//       type: 'string',
//       default: 'info',
//       description: createConsolaLogLevelDescription(),
//     },
//     extension: {
//       type: 'string',
//       description: 'Path to the extension file.',
//       required: true,
//     },
//   },
//   async run({ args }) {
//     // ログの設定
//     if (args['log-level']) {
//       setupConsolaLogLevel(args['log-level']);
//     }

//     // サーバー環境変数をパースする
//     const env = parse(envSchema, process.env);

//     // データベースの接続 URL を作成する
//     const connectionUrl = path.resolve(
//       process.cwd(),
//       env.PRIVATE_TURSO_CONNECTION_URL.replace('file:', ''),
//     );

//     // データベースのクライアントを作成する
//     const db = sqlite3(connectionUrl);

//     // 拡張機能のパスを絶対パスに変換する
//     const extensions = args.extension
//       .split(',')
//       .map((extension) => path.resolve(process.cwd(), extension));

//     // 拡張機能をロードする
//     for (const extension of extensions) {
//       await loadExtension({ db, extension });
//     }
//   },
// });

// /**
//  * コマンドを実行する。
//  */
// await runMain(command);
