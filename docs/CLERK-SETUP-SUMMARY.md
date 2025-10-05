# Clerk Authentication Setup Summary

## ✅ What Was Implemented

Successfully configured Clerk satellite domain authentication to share user sessions between:
- **Marketing Site (Astro)**: www.kowalah.com (this repo)
- **Main App (Next.js)**: app.kowalah.com (primary authentication domain)

## Current Configuration (Development)

### Environment Variables ([.env.local](.env.local))
```bash
# Clerk Keys (Development)
PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Satellite Configuration (Development)
CLERK_PRIMARY_DOMAIN=kowalah-jlw0b5wsj-kowalah.vercel.app
CLERK_SIGN_IN_URL=https://kowalah-jlw0b5wsj-kowalah.vercel.app/sign-in
```

### Key Files Modified

1. **[astro.config.mjs](astro.config.mjs)** - Added:
   - SSR mode (`output: "server"`)
   - Node adapter for server-side rendering
   - Clerk integration
   - Experimental session support

2. **[src/middleware.ts](src/middleware.ts)** - Configured:
   - Clerk satellite domain settings
   - Environment-aware configuration
   - Error handling for missing variables

3. **[src/layouts/partials/Header.astro](src/layouts/partials/Header.astro)** - Added:
   - `<SignedIn>` and `<SignedOut>` components
   - Conditional navigation based on auth state
   - Styled "Go to Dashboard" button with gradient

## User Experience

### When User is NOT Authenticated
- **Shows**: "Sign In" link + "Start Free Trial" button
- **Clicking "Sign In"**: Redirects to Vercel app sign-in page
- **After signing in**: Returns to marketing site, now authenticated

### When User IS Authenticated
- **Shows**: "Go to Dashboard" button (gradient styled with arrow icon)
- **Clicking button**: Navigates to dashboard in main app
- **Visual**: Pink-to-purple gradient, hover effects

## Clerk Dashboard Configuration

### Development
- **Satellite Domain**: `localhost:4321`
- **Primary Domain**: Points to Vercel preview deployment

### Production (To Configure)
- **Satellite Domain**: `www.kowalah.com` ✅ (already added)
- **Primary Domain**: `app.kowalah.com`

## Production Deployment Checklist

When deploying to production, follow [DEPLOYMENT.md](DEPLOYMENT.md):

- [ ] Get production Clerk keys (pk_live_... and sk_live_...)
- [ ] Set Vercel environment variables:
  - `PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...`
  - `CLERK_SECRET_KEY=sk_live_...`
  - `CLERK_PRIMARY_DOMAIN=app.kowalah.com`
  - `CLERK_SIGN_IN_URL=https://app.kowalah.com/sign-in`
- [ ] Verify satellite domain configured in Clerk Dashboard
- [ ] Deploy to Vercel
- [ ] Test authentication flow on production

## How It Works

1. **Satellite Domain Pattern**: Marketing site reads authentication state from main app
2. **Cookie Sharing**: Clerk manages cross-domain session cookies securely
3. **Sign-In Flow**:
   - User clicks "Sign In" on marketing site
   - Redirects to main app (primary domain) for authentication
   - After signing in, returns to marketing site
   - Marketing site now recognizes authenticated state
4. **Session Persistence**: Once authenticated, user sees "Go to Dashboard" across all visits

## Technical Architecture

```
┌─────────────────────────┐
│  www.kowalah.com        │
│  (Astro - Satellite)    │
│  - Reads auth state     │
│  - Shows conditional UI │
└────────────┬────────────┘
             │
             │ Reads session from
             ▼
┌─────────────────────────┐
│  app.kowalah.com        │
│  (Next.js - Primary)    │
│  - Owns authentication  │
│  - Manages sessions     │
└─────────────────────────┘
```

## Environment Variables Reference

| Variable | Purpose | Development Value | Production Value |
|----------|---------|-------------------|------------------|
| `PUBLIC_CLERK_PUBLISHABLE_KEY` | Client-side Clerk key | `pk_test_...` | `pk_live_...` |
| `CLERK_SECRET_KEY` | Server-side Clerk key | `sk_test_...` | `sk_live_...` |
| `CLERK_PRIMARY_DOMAIN` | Main app domain | Vercel preview URL | `app.kowalah.com` |
| `CLERK_SIGN_IN_URL` | Where to redirect for auth | Vercel preview sign-in | `https://app.kowalah.com/sign-in` |

## Testing Locally

1. **Start dev server**: `npm run dev`
2. **Visit**: http://localhost:4321
3. **When logged out**: See "Sign In" + "Start Free Trial"
4. **Click "Sign In"**: Redirects to Vercel app
5. **After signing in**: Return to localhost:4321, see "Go to Dashboard"

## Important Notes

- ✅ Satellite domain feature requires **paid Clerk plan** for production
- ✅ Both domains must use **HTTPS** for secure cookie sharing
- ✅ Use same Clerk instance for both marketing site and main app
- ✅ Environment variables configured in [middleware.ts](src/middleware.ts) for flexibility
- ✅ Dashboard link auto-updates based on environment

## Support Resources

- [Clerk Satellite Domains Documentation](https://clerk.com/docs/advanced-usage/satellite-domains)
- [Clerk Astro SDK Documentation](https://clerk.com/docs/quickstarts/astro)
- [Deployment Guide](DEPLOYMENT.md)
- [Production Environment Template](.env.production.example)
