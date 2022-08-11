import React from 'react';
import { Outlet } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
interface DefaultLayoutProps {}

const DefaultLayout: React.FC<DefaultLayoutProps> = () => (
  <div className="DefaultLayout">
    <Outlet />
  </div>
);

export default DefaultLayout;
