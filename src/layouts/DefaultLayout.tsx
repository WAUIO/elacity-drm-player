import React from 'react';
import { DefaultLayout } from '@elacity-js/uikit';

// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
interface MainLayoutProps {}

// Outlet is set in @elacity-js/uikit/DefaultLayout
// @todo: define navbar, sidebar if needed
const MainLayout: React.FC<MainLayoutProps> = () => (
  <DefaultLayout />
);

export default MainLayout;
