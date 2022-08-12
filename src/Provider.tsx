import React from 'react';
import type { FC, PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider, AppSettingsProvider } from '@elacity-js/uikit';
import { JsonLocalStorage } from '@elacity-js/lib';
import { store } from './state/store';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppProviderProps {}

const AppProvider: FC<PropsWithChildren<AppProviderProps>> = ({
  children,
}: PropsWithChildren<AppProviderProps>) => (
  <HelmetProvider>
    <ReduxProvider store={store}>
      <AppSettingsProvider storage={new JsonLocalStorage('__wbp_settings')}>
        <BrowserRouter basename="/">
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </BrowserRouter>
      </AppSettingsProvider>
    </ReduxProvider>
  </HelmetProvider>
);

export default AppProvider;
