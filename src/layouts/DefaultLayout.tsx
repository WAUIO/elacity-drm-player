import React from 'react';
import { Outlet } from 'react-router-dom';
import { DefaultWrapper } from '@elacity-js/uikit';

// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
interface DefaultLayoutProps {}

const DefaultLayout: React.FC<DefaultLayoutProps> = () => (
  <DefaultWrapper>
    <Outlet />
  </DefaultWrapper>
);

export default DefaultLayout;
