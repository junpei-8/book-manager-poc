// @ts-check
'use strict';

{
  const env = (window.__ENV__ ||= /** @type {any} */ ({}));
  const app = /** @type {NonNullable<typeof window.__TAURI__>} */ (
    window.__TAURI__
  );

  /**
   * @param   {any} os オペレーティングシステム
   *
   * @returns {any}    オペレーティングシステムの種類
   */
  function getOsType(os) {
    return os === 'ios' || os === 'android'
      ? 'mobile'
      : os === 'macos' || os === 'windows' || os === 'linux'
        ? 'pc'
        : 'unknown';
  }

  // App environment.
  const isApp = !!app;
  if (isApp) {
    const os = app.os.type();
    const osType = getOsType(os);

    env.context = 'app';
    env.app = { os, osType };

    // ↓ Browser environment.
  } else {
    const ua = navigator.userAgent.toLowerCase();
    const os = /iphone|ipad|ipod/.test(ua)
      ? 'ios'
      : /android/.test(ua)
        ? 'android'
        : /mac|ppc/.test(ua)
          ? 'macos'
          : /win/.test(ua)
            ? 'windows'
            : /linux/.test(ua)
              ? 'linux'
              : 'unknown';
    const osType = getOsType(os);

    env.context = 'browser';
    env.browser = { os, osType };
  }

  /**
   * 環境属性を設定する。
   *
   * @param {typeof window.__ENV__} env     環境
   * @param {HTMLElement}           element 設定する要素
   */
  function setEnvAttributes(env, element = document.documentElement) {
    const htmlDataset = element.dataset;
    htmlDataset.context = env.context;

    const app = env.app;
    if (app) {
      htmlDataset['os'] = `app:${app.os}`;
      htmlDataset['osType'] = `app:${app.osType}`;
    }

    const browser = env.browser;
    if (browser) {
      htmlDataset['os'] = `browser:${browser.os}`;
      htmlDataset['osType'] = `browser:${browser.osType}`;
    }
  }

  // 環境属性を設定する
  setEnvAttributes(env);

  /**
   * Astro のページ遷移時に環境属性を設定する。
   */
  document.addEventListener('astro:before-swap', (event) => {
    setEnvAttributes(env, event.newDocument.documentElement);
  });
}
