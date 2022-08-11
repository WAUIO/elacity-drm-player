import React from 'react';
import type { FC, PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { AppSettingsProvider } from './contexts/AppSettingsContext';
import { store } from './state/store';
import { ThemeProvider } from './theme';
import { LocalJsonStorage } from './lib/storage';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppProviderProps {}

const AppProvider: FC<PropsWithChildren<AppProviderProps>> = ({
  children,
}: PropsWithChildren<AppProviderProps>) => (
  <HelmetProvider>
    <ReduxProvider store={store}>
      <AppSettingsProvider store={new LocalJsonStorage('__cra_settings')}>
        <BrowserRouter>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </BrowserRouter>
      </AppSettingsProvider>
    </ReduxProvider>
  </HelmetProvider>
);

export default AppProvider;
