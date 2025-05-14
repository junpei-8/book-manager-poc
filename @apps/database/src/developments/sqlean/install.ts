// import { $ } from 'bun';
// import { defineCommand, runMain } from 'citty';
// import { consola } from 'consola';
// import {
//   createConsolaLogLevelDescription,
//   setupConsolaLogLevel,
// } from '../../developments/_utils/consola';

// /**
//  * GitHub API を使って最新リリースのバージョンを取得する関数。
//  *
//  * @param   repositoryName Github のリポジトリ名
//  *
//  * @returns                最新のバージョン番号
//  */
// async function fetchGithubLatestVersion(repositoryName: string) {
//   const apiUrl = `https://api.github.com/repos/${repositoryName}/releases/latest`;
//   consola.debug(
//     `Fetching latest "${repositoryName}" version from ${apiUrl} ...`,
//   );

//   const response = await fetch(apiUrl);
//   if (!response.ok) {
//     throw new Error(`Failed to fetch latest version: ${response.statusText}`);
//   }

//   const data = (await response.json()) as { tag_name?: string } | undefined;
//   let version = data?.tag_name;
//   if (!version) {
//     throw new Error('Failed to fetch latest version: tag_name is undefined');
//   }

//   // 先頭に "v" がある場合は除去（例: "v0.27.1" → "0.27.1"）
//   version = version.startsWith('v') ? version.substring(1) : version;
//   consola.debug(`Latest version fetched: ${version}`);

//   return version;
// }

// /**
//  * 実行環境に応じた名前を返す関数。
//  *
//  * @returns 実行環境に応じた名前
//  */
// function getRuntimeName() {
//   const { platform, arch } = process;

//   switch (platform) {
//     case 'win32':
//       return 'win-x64';

//     case 'linux':
//       return arch === 'arm64' //
//         ? 'linux-arm64'
//         : 'linux-x86';

//     case 'darwin':
//       return arch === 'arm64' //
//         ? 'macos-arm64'
//         : 'macos-x86';
//   }

//   throw new Error(`Unsupported platform: ${platform} (${arch})`);
// }

// /**
//  * SQLean のダウンロードと展開を行う関数。
//  *
//  * @param options                        オプション
//  * @param options.output                 展開先のディレクトリ
//  * @param options.override               展開先のディレクトリを上書きするかどうか
//  * @param options.githubRepoName         Github のリポジトリ名
//  * @param options.githubDownloadFilename Github のダウンロードするファイル名
//  */
// async function installSqlean({
//   output,
//   override = false,
//   githubRepoName = 'nalgeon/sqlean',
//   githubDownloadFilename = 'sqlean',
// }: {
//   output: string;
//   override?: boolean;
//   githubRepoName?: string;
//   githubDownloadFilename?: string;
// }) {
//   const outputDir = output.replace(/^file:/, '');
//   consola.info(`Installing SQLean to ${outputDir} ...`);

//   // 展開先のディレクトリが空ではない場合は処理をスキップする。
//   if (!override) {
//     if (await $`ls -1 ${outputDir}`.nothrow().text()) {
//       consola.info(`SQLean already installed in ${outputDir}.`);
//       return;
//     }
//   }

//   // 最新バージョンを取得
//   const version = await fetchGithubLatestVersion(githubRepoName);
//   const downloadFilename = `${githubDownloadFilename}-${getRuntimeName()}`;
//   const downloadFile = `${downloadFilename}.zip`;

//   // GitHub のリリースページからダウンロード URL を生成
//   const baseUrl = `https://github.com/${githubRepoName}/releases/download/${version}`;
//   const downloadUrl = `${baseUrl}/${downloadFile}`;

//   // curl を使ってダウンロード
//   consola.debug(`Downloading SQLean from ${downloadUrl} ...`);
//   await $`mkdir -p ${outputDir}`;
//   await $`curl -L -o ${outputDir}/${downloadFile} "${downloadUrl}"`.quiet();

//   // unzip を使って展開
//   consola.debug(`Extracting ${outputDir}/${downloadFile} ...`);
//   await $`unzip -o ${outputDir}/${downloadFile} -d ${outputDir}`.quiet();
//   await $`rm ${outputDir}/${downloadFile}`;

//   consola.success('SQLean installed successfully!');
// }

// /**
//  * コマンドを定義する。
//  */
// const command = defineCommand({
//   meta: {
//     name: 'sqlean-setup',
//     description: 'Setup SQLean.',
//   },
//   args: {
//     'log-level': {
//       type: 'string',
//       default: 'info',
//       description: createConsolaLogLevelDescription(),
//     },
//     output: {
//       type: 'string',
//       alias: 'o',
//       description: 'Output directory.',
//       required: true,
//     },
//     override: {
//       type: 'boolean',
//       default: false,
//       description: 'Override the output directory.',
//     },
//     'github-repo-name': {
//       type: 'string',
//       description: 'Github repository name.',
//       default: 'nalgeon/sqlean',
//     },
//     'github-download-filename': {
//       type: 'string',
//       description: 'Github download filename.',
//       default: 'sqlean',
//     },
//   },
//   async run({ args }) {
//     // ログの設定
//     if (args['log-level']) {
//       setupConsolaLogLevel(args['log-level']);
//     }

//     // sqlean のインストールを実行する
//     await installSqlean({
//       output: args.output,
//       override: args['override'],
//       githubRepoName: args['github-repo-name'],
//       githubDownloadFilename: args['github-download-filename'],
//     });
//   },
// });

// /**
//  * コマンドを実行する。
//  */
// await runMain(command);
