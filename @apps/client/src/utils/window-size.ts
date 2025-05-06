import { atom } from 'nanostores';
import { isClient } from './env';

/**
 * The store for the window size.
 */
export const windowSize = /*#__PURE__*/ (() => {
  /**
   * Breakpoints.
   */
  const breakpoints = [
    {
      name: 'sm',
      value: 640,
    },
    {
      name: 'md',
      value: 768,
    },
    {
      name: 'lg',
      value: 1024,
    },
    {
      name: 'xl',
      value: 1280,
    },
    {
      name: '2xl',
      value: 1536,
    },
  ] as const;

  /**
   * The store for the window size.
   */
  const store = {
    width: atom(0),
    height: atom(0),
    /* eslint-disable jsdoc/multiline-blocks */
    breakpoint: {
      /** 640px */
      sm: atom(false),
      /** 768px */
      md: atom(false),
      /** 1024px */
      lg: atom(false),
      /** 1280px */
      xl: atom(false),
      /** 1536px */
      '2xl': atom(false),
    },
    /* eslint-enable jsdoc/multiline-blocks */
  };

  /**
   * Updates the store with the current window size.
   */
  function update() {
    store.width.set(window.innerWidth);
    store.height.set(window.innerHeight);
    for (const { name, value } of breakpoints) {
      store.breakpoint[name].set(window.innerWidth >= value);
    }
  }

  /**
   * Subscribes to the window resize event and updates the store with the current window size.
   */
  if (isClient) {
    update();
    window.addEventListener('resize', update);
  }

  return {
    store,
    update,
  };
})();
