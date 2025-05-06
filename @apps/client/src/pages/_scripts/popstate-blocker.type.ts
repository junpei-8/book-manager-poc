declare global {
  interface Window {
    __POPSTATE_BLOCKER__: {
      once: () => void;
    };
  }
}

export {};
