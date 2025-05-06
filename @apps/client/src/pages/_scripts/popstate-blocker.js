// @ts-check
'use strict';

{
  /**
   * popstate イベントをブロックするかどうかのフラグ.
   */
  let blocker = false;

  /**
   * popstate イベントを操作するためのグローバルオブジェクト。
   */
  window.__POPSTATE_BLOCKER__ = {
    once: () => (blocker = true),
  };

  /**
   * popstate イベントのリスナー。
   */
  addEventListener('popstate', (event) => {
    if (blocker) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      setTimeout(() => (blocker = false));
    }
  });
}
