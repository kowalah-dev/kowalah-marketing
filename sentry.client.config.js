import * as Sentry from "@sentry/astro";

Sentry.init({
  dsn: "https://03e3509c5345dc8b0eeb8c0306291acf@o4510170091094016.ingest.de.sentry.io/4510329516458064",

  // Set environment (auto-detected from NODE_ENV or Vercel environment)
  environment: import.meta.env.MODE,

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/astro/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,

  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/.*\.kowalah\.com/],

  // Capture Replay for 10% of all sessions,
  // plus 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
