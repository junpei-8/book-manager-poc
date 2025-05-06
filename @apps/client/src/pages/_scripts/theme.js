// @ts-check
'use strict';

/**
 * @typedef {'light' | 'dark'}            Theme
 *
 * @typedef {'light' | 'dark' | 'system'} ThemeSetting
 */

{
  /**
   * 値が有効なテーマかどうかを確認する。
   *
   * @param   {any}            value 確認する値
   *
   * @returns {value is Theme}       有効なテーマかどうか
   */
  function isTheme(value) {
    return value === 'light' || value === 'dark';
  }

  /**
   * システムのテーマを取得する。
   *
   * @returns {Theme} システムのテーマ
   */
  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  /**
   * テーマの設定を取得する。
   *
   * @returns {ThemeSetting} テーマの設定
   */
  function getThemeSetting() {
    const savedTheme = localStorage.getItem('theme');
    return isTheme(savedTheme) ? savedTheme : 'system';
  }

  /**
   * テーマの設定を変更する。
   *
   * @param {ThemeSetting} value 設定するテーマ
   */
  function setThemeSetting(value) {
    isTheme(value)
      ? localStorage.setItem('theme', value)
      : localStorage.removeItem('theme');
  }

  /**
   * テーマを取得する。
   *
   * @returns {Theme} テーマ
   */
  function getTheme() {
    const savedTheme = localStorage.getItem('theme');
    return isTheme(savedTheme) ? savedTheme : getSystemTheme();
  }

  /**
   * テーマを設定する。
   *
   * @param {ThemeSetting} value   設定するテーマ
   * @param {Element}      element 設定する要素
   */
  function setTheme(value, element = document.documentElement) {
    const theme = isTheme(value) ? value : getSystemTheme();
    element.classList.toggle('dark', theme === 'dark');
    setThemeSetting(value);
  }

  // テーマを設定する
  setTheme(getTheme());

  /**
   * テーマを操作するためのオブジェクトを代入する。
   */
  window.__THEME__ = {
    value: {
      get: getTheme,
      set: setTheme,
    },
    setting: {
      get: getThemeSetting,
      set: setThemeSetting,
    },
  };

  /**
   * Astro のページ遷移時にテーマを設定する。
   */
  document.addEventListener('astro:before-swap', (event) => {
    setTheme(getTheme(), event.newDocument.documentElement);
  });
}
