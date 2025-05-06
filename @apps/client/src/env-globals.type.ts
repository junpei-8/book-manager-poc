/**
 * Tauri.
 */
declare global {
  interface Window {
    __TAURI__?: {
      os: typeof import('@tauri-apps/plugin-os');
    };
  }
}

export {};
