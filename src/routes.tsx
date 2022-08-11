/* eslint-disable implicit-arrow-linebreak */
import React, { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { baseURL } from '@elacity-js/lib';
import Spinner from './components/Logo';
import Layout from './layouts';
import ErrorPage from './views/Error';

const Loadable =
  <T, >(Component: React.ComponentType<T>) =>
    (props: T) =>
      (
        <Suspense fallback={<Spinner />}>
          <Component {...props} />
        </Suspense>
      );

// Home
const Home = Loadable(lazy(() => import('./views/Empty')));
const Mint = Loadable(lazy(() => import('./views/Empty')));
const PlayerView = Loadable(lazy(() => import('./views/Empty')));

export default [
  // default layout (with padding)
  {
    path: baseURL(),
    element: <Layout.Default />,
    children: [
      {
        path: '',
        element: <Navigate to={baseURL('/explore')} replace />,
      },
      {
        path: 'explore',
        element: <Home />,
      },
      {
        path: 'new',
        element: <Mint />,
      },
      {
        path: 'view/:id',
        element: <PlayerView />,
      },
    ],
  },

  // other layouts
  {
    path: '*',
    element: <ErrorPage code="404" message="Page not found" />,
  },
];
