# Production Deployment Guide - Clerk Authentication

This guide covers deploying the marketing site to production with Clerk satellite domain authentication.

## Prerequisites

- [ ] Production Clerk instance configured (same one used by app.kowalah.com)
- [ ] Production Clerk keys (pk_live_... and sk_live_...)
- [ ] DNS configured for www.kowalah.com
- [ ] Vercel project set up for kowalah-marketing

## Step 1: Configure Clerk Satellite Domains

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your **production** application
3. Navigate to **Domains** section
4. Ensure these satellite domains are configured:
   - ✅ `www.kowalah.com` (production marketing site)
   - ✅ `localhost:4321` (development - optional, can remove in production)
5. Verify `app.kowalah.com` is set as the **Primary Domain**

## Step 2: Set Vercel Environment Variables

Go to your Vercel project settings: **Settings → Environment Variables**

### Production Environment Variables:

```bash
# Clerk Authentication - PRODUCTION KEYS
PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...  # Your production publishable key
CLERK_SECRET_KEY=sk_live_...              # Your production secret key

# Satellite Domain Configuration
CLERK_PRIMARY_DOMAIN=app.kowalah.com
CLERK_SIGN_IN_URL=https://app.kowalah.com/sign-in

# Sanity CMS (use existing production tokens)
PUBLIC_SANITY_PROJECT_ID=ig58e610
PUBLIC_SANITY_DATASET=production
SANITY_VIEWER_TOKEN=sk...
SANITY_API_TOKEN=sk...
```

**Important Notes:**
- Use **Production** Clerk keys (pk_live_... and sk_live_...), NOT test keys
- Set environment to **Production** for these variables
- You can also set **Preview** environment variables for staging deployments

## Step 3: Verify Configuration Files

These files are already configured to use environment variables:

### [middleware.ts](src/middleware.ts)
```typescript
// Reads from:
// - CLERK_PRIMARY_DOMAIN
// - CLERK_SIGN_IN_URL
```

### [Header.astro](src/layouts/partials/Header.astro)
```typescript
// Dashboard link built from:
// - CLERK_PRIMARY_DOMAIN
```

### [.env.local](.env.local) (Development only - not deployed)
Contains development/preview deployment URLs

## Step 4: Deploy to Vercel

```bash
# Deploy to production
vercel --prod

# Or let GitHub integration handle deployment
git push origin main
```

## Step 5: Post-Deployment Verification

1. **Visit https://www.kowalah.com**
2. **When NOT logged in:**
   - Should see "Sign In" link
   - Should see "Start Free Trial" button
3. **Click "Sign In":**
   - Should redirect to `https://app.kowalah.com/sign-in`
4. **After signing in on app.kowalah.com:**
   - Return to www.kowalah.com
   - Should see "Go to Dashboard" button instead
5. **Click "Go to Dashboard":**
   - Should navigate to `https://app.kowalah.com/dashboard`

## Troubleshooting

### Issue: "Missing required Clerk satellite configuration" error
**Solution:** Verify `CLERK_PRIMARY_DOMAIN` and `CLERK_SIGN_IN_URL` are set in Vercel environment variables

### Issue: Authentication state not shared
**Solutions:**
1. Verify both sites use the **same** Clerk publishable key
2. Check satellite domain is configured in Clerk Dashboard
3. Ensure both domains use HTTPS (required for cookies)
4. Clear browser cookies and test again

### Issue: Redirects to wrong domain
**Solution:** Check `CLERK_PRIMARY_DOMAIN` and `CLERK_SIGN_IN_URL` values in Vercel settings

## Environment Variable Summary

| Variable | Development Value | Production Value |
|----------|-------------------|------------------|
| `PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_test_...` | `pk_live_...` |
| `CLERK_SECRET_KEY` | `sk_test_...` | `sk_live_...` |
| `CLERK_PRIMARY_DOMAIN` | `kowalah-jlw0b5wsj-kowalah.vercel.app` | `app.kowalah.com` |
| `CLERK_SIGN_IN_URL` | `https://kowalah-jlw0b5wsj-kowalah.vercel.app/sign-in` | `https://app.kowalah.com/sign-in` |

## Security Notes

- ✅ Never commit `.env.local` or `.env.production` to git
- ✅ Always use production Clerk keys for production deployment
- ✅ Satellite domain feature requires a paid Clerk plan for production
- ✅ Both domains must use HTTPS for secure cookie sharing
- ✅ Rotate keys if accidentally exposed

## Support

- [Clerk Satellite Domains Docs](https://clerk.com/docs/advanced-usage/satellite-domains)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
