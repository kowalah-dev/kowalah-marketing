import { clerkMiddleware } from "@clerk/astro/server";

// Clerk authentication middleware
// In production: app.kowalah.com and www.kowalah.com share authentication automatically
// as subdomains of kowalah.com (no satellite configuration needed)
//
// In development: Uses immense-kingfish-84.clerk.accounts.dev
// Requires only: PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY

export const onRequest = clerkMiddleware();
