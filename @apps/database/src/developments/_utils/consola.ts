import consola from 'consola';

/**
 * 文字列で渡されたログレベルを数値に変換する関数。
 *
 * @param   level ログレベルを表す文字列
 *
 * @returns       数値に変換されたログレベル
 */
export function parseConsolaLogLevel(level: string) {
  switch (level.toLowerCase()) {
    case '0':
    case '-999':
    case 'silent':
      return -999;

    case '1':
    case 'error':
      return 0;

    case '2':
    case 'warn':
      return 1;

    case '3':
    case 'normal':
      return 2;

    case '4':
    case 'info':
      return 3;

    case '5':
    case 'debug':
      return 4;

    case '6':
    case 'trace':
      return 5;

    case '7':
    case '+999':
    case 'verbose':
      return +999;

    default:
      throw new Error(`Invalid log level: "${level}"`);
  }
}

/**
 * ログレベルの説明を生成する関数。
 *
 * @returns ログレベルの説明
 */
export function createConsolaLogLevelDescription() {
  return 'Log level. (verbose,trace,debug,info,warn,error,silent)';
}

/**
 * Setup コマンドのログレベルを設定する関数。
 *
 * @param level ログレベルを表す文字列
 */
export function setupConsolaLogLevel(level: string) {
  consola.level = parseConsolaLogLevel(level);
}
