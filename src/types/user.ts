export type ThemeValue = 'light' | 'dark';

export interface IUserPreferences {
  theme?: ThemeValue;
  direction?: 'ltr' | 'rtl';
  lang?: string;
}
