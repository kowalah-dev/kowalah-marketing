import { clerkMiddleware } from "@clerk/astro/server";

// Satellite domain configuration - environment-aware
// This marketing site reads auth from the primary domain (Next.js app)
// Environment variables:
// - CLERK_PRIMARY_DOMAIN: The domain where users authenticate (e.g., app.kowalah.com)
// - CLERK_SIGN_IN_URL: Full URL to sign-in page

const primaryDomain = import.meta.env.CLERK_PRIMARY_DOMAIN;
const signInUrl = import.meta.env.CLERK_SIGN_IN_URL;

// For satellite domain configuration
const clerkConfig = primaryDomain && signInUrl
  ? {
      isSatellite: true,
      domain: primaryDomain,
      signInUrl: signInUrl,
    }
  : {
      // Default configuration when satellite variables not set
      // This allows the site to function without Clerk auth
    };

export const onRequest = clerkMiddleware(clerkConfig);
