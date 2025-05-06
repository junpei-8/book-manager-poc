/** @ignore */
type OS = import('@tauri-apps/plugin-os').OsType;

/** @ignore */
type OSType = 'pc' | 'mobile';

declare global {
  interface Window {
    __ENV__:
      | {
          context: 'app';
          app: {
            os: OS;
            osType: OSType;
          };
          browser?: undefined;
        }
      | {
          context: 'browser';
          app?: undefined;
          browser: {
            os: OS | 'unknown';
            osType: OSType | 'unknown';
          };
        }
      | {
          context: 'server';
          app?: undefined;
          browser?: undefined;
        };
  }
}

export {};
