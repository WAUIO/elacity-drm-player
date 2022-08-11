import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

if (process.env.REACT_APP_SENTRY_DSN) {
  console.log('Enabling sentry metrics...');
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}
