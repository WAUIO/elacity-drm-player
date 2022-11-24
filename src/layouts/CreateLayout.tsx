import React from 'react';
import { Theme, alpha } from '@mui/material/styles';
import { DefaultLayout, DefaultFooter } from '@elacity-js/uikit';

// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
interface MainLayoutProps {}

// Outlet is set in @elacity-js/uikit/DefaultLayout
// @todo: define navbar, sidebar if needed
const MainLayout: React.FC<MainLayoutProps> = () => (
  <DefaultLayout
    Footer={
      () => (
        <DefaultFooter
          sx={{
            width: 'calc(100vw - 32px)',
            position: 'absolute',
            background: (t: Theme) => alpha(t.palette.background.default, 0.8),
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
            mb: 0,
            zIndex: 1,
          }}
        />
      )
    }
  />
);

export default MainLayout;
