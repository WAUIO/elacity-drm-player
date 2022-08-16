import React from 'react';
import type { FC, PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, AppSettingsProvider } from '@elacity-js/uikit';
import { JsonLocalStorage } from '@elacity-js/lib';
import { SnackbarProvider } from 'notistack';
import { Provider as ReduxProvider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import Web3Provider from './lib/web3/Provider';
import { ConnectorProvider } from './lib/web3/ConnectorContext';
import { store } from './state/store';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppProviderProps {}

const AppProvider: FC<PropsWithChildren<AppProviderProps>> = ({
  children,
}: PropsWithChildren<AppProviderProps>) => (
  <HelmetProvider>
    <Web3Provider>
      <ReduxProvider store={store}>
        <AppSettingsProvider
          appName="Elacity Media"
          logo={{
            primary: '/static/elacity/bella.png',
            alt: '/static/elacity/full_logo_[theme].png',
          }}
          storage={
            new JsonLocalStorage('__wbp_settings', {
              defaultValue: {
                theme: 'light',
              },
            })
          }
          links={{
            documentation: 'https://docs.ela.city/drm',
            socials: [
              { provider: 'twitter', url: 'https://twitter.com/Elacityofficial' },
              { provider: 'discord', url: 'https://discord.gg/bh2FKFhbZJ' },
              { provider: 'telegram', url: 'https://t.me/elacity' },
            ],
          }}
        >
          <ThemeProvider customization={{}}>
            <SnackbarProvider anchorOrigin={{ horizontal: 'center', vertical: 'top' }} autoHideDuration={5000}>
              <ConnectorProvider redirectTo="/create">
                <BrowserRouter>
                  {children}
                </BrowserRouter>
              </ConnectorProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </AppSettingsProvider>
      </ReduxProvider>
    </Web3Provider>
  </HelmetProvider>
);

export default AppProvider;
