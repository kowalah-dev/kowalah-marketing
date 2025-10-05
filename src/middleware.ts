import { clerkMiddleware } from "@clerk/astro/server";

// Satellite domain configuration - environment-aware
// This marketing site reads auth from the primary domain (Next.js app)
// Environment variables:
// - CLERK_PRIMARY_DOMAIN: The domain where users authenticate (e.g., app.kowalah.com)
// - CLERK_SIGN_IN_URL: Full URL to sign-in page

const primaryDomain = import.meta.env.CLERK_PRIMARY_DOMAIN;
const signInUrl = import.meta.env.CLERK_SIGN_IN_URL;

if (!primaryDomain || !signInUrl) {
  throw new Error(
    "Missing required Clerk satellite configuration. Please set CLERK_PRIMARY_DOMAIN and CLERK_SIGN_IN_URL environment variables."
  );
}

export const onRequest = clerkMiddleware({
  isSatellite: true,
  domain: primaryDomain,
  signInUrl: signInUrl,
});
