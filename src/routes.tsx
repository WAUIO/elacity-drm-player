/* eslint-disable implicit-arrow-linebreak */
import React, { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { baseURL } from '@elacity-js/lib';
import { Spinner } from '@elacity-js/uikit';
import Layout from './layouts';
import ErrorPage from './views/Error';

const Loadable =
  <T, >(Component: React.ComponentType<T>) =>
    (props: T) =>
      (
        <Suspense fallback={<Spinner.Splash />}>
          <Component {...props} />
        </Suspense>
      );

// Views
const View = {
  Home: Loadable(lazy(() => import('./views/Explore'))),
  Mint: Loadable(lazy(() => import('./views/CreateForm'))),
  Player: Loadable(lazy(() => import('./views/View'))),
  TypeformView: Loadable(lazy(() => import('./views/TypeformView'))),
};

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
        element: <View.Home />,
      },
      {
        path: 'new',
        element: <Navigate to={baseURL('/create')} replace />,
      },
      {
        path: 'view/:id',
        element: <View.Player />,
      },
    ],
  },
  {
    path: baseURL(),
    element: <Layout.Create />,
    children: [
      {
        path: 'create',
        element: <View.TypeformView />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage code="404" message="Page not found" />,
  },
];
