import * as Sentry from "@sentry/astro";

Sentry.init({
  dsn: "https://03e3509c5345dc8b0eeb8c0306291acf@o4510170091094016.ingest.de.sentry.io/4510329516458064",

  // Set environment (auto-detected from NODE_ENV or Vercel environment)
  environment: process.env.NODE_ENV || "development",

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/astro/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  // Exclude clerk.kowalah.com to prevent CORS issues with Clerk authentication
  tracePropagationTargets: [
    "localhost",
    /^https:\/\/www\.kowalah\.com/,
    /^https:\/\/api\.kowalah\.com/,
    /^https:\/\/app\.kowalah\.com/,
  ],
});
