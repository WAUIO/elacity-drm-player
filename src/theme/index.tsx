import React from 'react';
import type { FC, PropsWithChildren } from 'react';
import { deepmerge } from '@mui/utils';
import {
  createTheme,
  ThemeOptions,
  Theme,
  responsiveFontSizes,
  ThemeProvider as MuiProvider,
} from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ThemeValue, IUserPreferences } from '../types/user';
import useAppSettings from '../hooks/useAppSettings';
import componentsOverrides from './overrides';
import { commonOptions } from './common';
import darkTheme from './dark';
import lightTheme from './light';

const themes: Record<ThemeValue, ThemeOptions> = {
  light: lightTheme,
  dark: darkTheme,
};

const createThemeWith = (config: IUserPreferences = {}): Theme => {
  const userOptions = themes[config.theme || 'light'];

  const theme = createTheme(deepmerge(deepmerge({ direction: config.direction || 'ltr' }, commonOptions), userOptions));

  theme.components = componentsOverrides(theme);

  return responsiveFontSizes(theme);
};

export default createThemeWith;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ThemeProvider: FC<PropsWithChildren<any>> = ({ children }: PropsWithChildren<any>) => {
  const { values } = useAppSettings();
  const theme: Theme = React.useMemo(
    () => createThemeWith(values), [values.theme]
  );

  return (
    <MuiProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiProvider>
  );
};
