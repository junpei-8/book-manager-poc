/** @ignore */
type Theme = 'light' | 'dark';

/** @ignore */
type ThemeSetting = 'light' | 'dark' | 'system';

declare global {
  interface Window {
    __THEME__: {
      value: {
        get: () => Theme;
        set: (value: ThemeSetting, element?: Element) => void;
      };
      setting: {
        get: () => ThemeSetting;
        set: (value: ThemeSetting) => void;
      };
    };
  }
}

export {};
