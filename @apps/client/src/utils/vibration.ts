import { toArray } from 'es-toolkit/compat';
import { env, isClient } from './env';

/**
 * バイブレーションのトークン。
 */
export type VibrationToken =
  | 'very-short'
  | 'short'
  | 'medium'
  | 'long'
  | 'very-long';

/**
 * ブラウザのバイブレーションがサポートされているかどうか。
 */
export const isSupportedBrowserVibration =
  /*#__PURE__*/ isClient && typeof window.navigator.vibrate !== 'undefined';

/**
 * バイブレーションのトークンを数値に変換する。
 *
 * @param   token バイブレーションのトークン
 *
 * @returns       バイブレーションの数値
 */
export function convertVibrateTokenToNumber(token: VibrationToken) {
  switch (token) {
    case 'very-short':
      return 100;

    case 'short':
      return 200;

    case 'medium':
      return 300;

    case 'long':
      return 400;

    case 'very-long':
      return 500;
  }
}

/**
 * バイブレーションのオプション。
 */
export type VibrateOptions = {
  /**
   * ブラウザの Vibration API がサポートされていない場合は Checkbox を用いたバイブレーションを実行する。
   */
  polyfillBrowser?: boolean;
};

/**
 * バイブレーションを実行する。
 *
 * @param pattern バイブレーションのパターン
 */
export function vibrate(
  pattern: VibratePattern | VibrationToken | VibrationToken[] = ['short'],
  options?: VibrateOptions,
) {
  if (!isClient) return;
  executeVibration(toArray(pattern).map(convertVibrateTokenToNumber), options);
}

/**
 * 環境ごとにバイブレーションを実行する
 *
 * @param   patterns バイブレーションのパターン
 *
 * @returns          バイブレーションの実行結果
 */
export function executeVibration(patterns: number[], options?: VibrateOptions) {
  if (!isClient) return false;

  switch (env.context) {
    case 'app': // TODO: 後々 Tauri API を使った実装が必要
    case 'browser':
      // ブラウザの場合は navigator.vibrate を使用
      return isSupportedBrowserVibration
        ? window.navigator.vibrate(patterns)
        : options?.polyfillBrowser !== false && executeVibrationWithCheckbox();

    default:
      return false;
  }
}

/**
 * バイブレーション用のチェックボックスをクリックする。
 *
 * @returns バイブレーション用のチェックボックス
 */
export function executeVibrationWithCheckbox() {
  const checkbox = document.getElementById('vibration-checkbox');
  return checkbox ? (checkbox.click(), true) : false;
}
