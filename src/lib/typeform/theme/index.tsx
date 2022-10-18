import React, { PropsWithChildren } from 'react';
import { ThemeProvider as ElacityThemeProvider } from '@elacity-js/uikit';
import componentsOverrides from './overrides';

const commonCustomization = {
  components: componentsOverrides,
  typography: {},
  shape: {
    borderRadius: 4,
  },
};

export const ThemeProvider = ({ children }: PropsWithChildren) => (
  <ElacityThemeProvider
    customization={{
      light: { ...commonCustomization },
      dark: { ...commonCustomization },
    }}
  >
    {children}
  </ElacityThemeProvider>
);
