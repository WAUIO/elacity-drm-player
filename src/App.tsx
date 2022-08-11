import React from 'react';
import { useRoutes } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { styled } from '@mui/material/styles';
import routes from './routes';
import ErrorPage from './views/Error';
import './App.css';

const BodyWrapper = styled('div')(() => ({
  '@global': {
    body: {
      backgroundColor: '#FF0000',
    },
  },
}));

const App = () => {
  const content = useRoutes(routes);

  return <BodyWrapper>{content}</BodyWrapper>;
};

const ErrFallback: React.FC = (props) => (
  <>
    <ErrorPage message="An unknown error occured, please reload" />
    {JSON.stringify(props)}
  </>
);

export default Sentry.withErrorBoundary(App, {
  fallback: <ErrFallback />,
  onError: (e: Error) => console.error(e),
});
