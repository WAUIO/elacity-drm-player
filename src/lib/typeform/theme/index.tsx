import React, { FC, PropsWithChildren } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import defaultTheme from '@mui/material/styles/defaultTheme';

interface ThemeProviderProps {}
export const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>> = ({
  children,
}: PropsWithChildren<ThemeProviderProps>) => (
  <MuiThemeProvider theme={defaultTheme}>
    {children}
  </MuiThemeProvider>
);
