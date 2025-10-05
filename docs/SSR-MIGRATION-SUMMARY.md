# SSR Migration Summary

## Overview

The Kowalah marketing site has been migrated from **Static Site Generation (SSG)** to **Server-Side Rendering (SSR)** to enable Clerk authentication and cross-domain session sharing with the main application.

## What Changed

### Before: Static Site Generation
```javascript
// astro.config.mjs
export default defineConfig({
  // No output specified = static by default
  integrations: [react(), sitemap(), mdx()],
});
```
- Pages pre-generated at build time
- Deployed as static HTML files
- No server-side processing
- `getStaticPaths()` props always available

### After: Server-Side Rendering
```javascript
// astro.config.mjs
export default defineConfig({
  output: "server", // SSR mode
  adapter: node({ mode: "standalone" }),
  experimental: { session: true },
  integrations: [
    react(),
    clerk(), // Authentication integration
    sitemap(),
    mdx(),
  ],
});
```
- Pages rendered on-demand per request
- Requires Node.js server
- Server-side authentication checks
- `getStaticPaths()` ignored in SSR mode

## Why SSR Was Required

### Clerk Authentication Needs
1. **Session Management:** Clerk requires server-side session storage
2. **Cookie Handling:** Secure cross-domain cookie sharing needs server processing
3. **Auth State Checking:** `<SignedIn>` and `<SignedOut>` components need server-side rendering
4. **Satellite Domain:** Marketing site reads auth state from primary domain server-side

### User Experience Benefits
- **Seamless Authentication:** Users sign in once, recognized everywhere
- **Conditional UI:** Show "Go to Dashboard" vs "Sign In" based on real auth state
- **No Client-Side Flicker:** Auth state determined server-side, no loading states

## Required Code Pattern Changes

### Dynamic Pages Pattern (CRITICAL)

**Old Pattern (Static Only):**
```astro
---
export async function getStaticPaths() {
  const items = await getCollection("items");
  return items.map(item => ({
    params: { slug: item.id },
    props: { item }
  }));
}

const { item } = Astro.props;
const { title } = item.data; // ❌ Fails in SSR - item is undefined
---
```

**New Pattern (SSR Compatible):**
```astro
---
export async function getStaticPaths() {
  const items = await getCollection("items");
  return items.map(item => ({
    params: { slug: item.id },
    props: { item }
  }));
}

const { slug } = Astro.params;
const { item } = Astro.props;

// ✅ Fallback for SSR mode
const itemEntry = item || await getEntry("items", slug as string);

if (!itemEntry) {
  return Astro.redirect("/404");
}

const { title } = itemEntry.data; // ✅ Safe - itemEntry validated
---
```

## Files Updated for SSR Compatibility

### Configuration Files
1. **[astro.config.mjs](../astro.config.mjs)** - Added SSR mode, Node adapter, Clerk integration
2. **[src/middleware.ts](../src/middleware.ts)** - Clerk satellite domain configuration
3. **[.env.local](../.env.local)** - Environment variables for Clerk

### Dynamic Page Routes (Updated)
1. **[src/pages/solutions/[slug].astro](../src/pages/solutions/[slug].astro)** - Solutions pages (CEO, CIO)
2. **[src/pages/[regular].astro](../src/pages/[regular].astro)** - General content pages
3. **[src/pages/insights/[single].astro](../src/pages/insights/[single].astro)** - Blog/insights posts
4. **[src/pages/resources/recommended-books/[single].astro](../src/pages/resources/recommended-books/[single].astro)** - Book pages

### UI Components (Updated)
1. **[src/layouts/partials/Header.astro](../src/layouts/partials/Header.astro)** - Added `<SignedIn>` / `<SignedOut>` conditional rendering

## Documentation Updates

### New Documentation
- **[CLERK-SETUP-SUMMARY.md](./CLERK-SETUP-SUMMARY.md)** - Complete Clerk authentication setup
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment guide
- **[docs/ssr-dynamic-pages-pattern.md](./ssr-dynamic-pages-pattern.md)** - SSR pattern reference
- **[.env.production.example](../.env.production.example)** - Production environment template
- **This file** - SSR migration summary

### Updated Documentation
- **[CLAUDE.md](../CLAUDE.md)** - Updated architecture section, added SSR patterns, authentication setup

## Development Workflow Changes

### Local Development
```bash
# Before: Static site
npm run dev   # Static dev server
npm run build # Generated static HTML

# After: SSR site
npm run dev   # SSR dev server with Clerk
npm run build # Builds Node.js server bundle
```

### Environment Variables Required
```bash
# Development (.env.local)
PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_PRIMARY_DOMAIN=kowalah-jlw0b5wsj-kowalah.vercel.app
CLERK_SIGN_IN_URL=https://kowalah-jlw0b5wsj-kowalah.vercel.app/sign-in

# Production (Vercel environment variables)
PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
CLERK_PRIMARY_DOMAIN=app.kowalah.com
CLERK_SIGN_IN_URL=https://app.kowalah.com/sign-in
```

### Deployment Changes

**Before (Static):**
- Deploy anywhere: GitHub Pages, Netlify, S3, CDN
- No server required
- Zero configuration

**After (SSR):**
- Deploy to Node.js hosts: Vercel, Netlify, Railway, etc.
- Requires server runtime
- Environment variables configuration needed

## Testing Checklist

When creating or updating pages:

- [ ] Does the page use dynamic routing (`[param].astro`)?
- [ ] If yes, does it include the SSR fallback pattern?
- [ ] Does it validate `itemEntry` exists before accessing `.data`?
- [ ] Does it redirect to `/404` for missing content?
- [ ] Have you tested it in development (SSR mode)?
- [ ] Does it work when accessing the URL directly (not just from links)?

## Future Page Creation

### For All New Dynamic Pages
1. **Use the template** from [docs/ssr-dynamic-pages-pattern.md](./ssr-dynamic-pages-pattern.md)
2. **Always include SSR fallback:** `item || await getEntry(...)`
3. **Validate before accessing:** Check `itemEntry` exists
4. **Test directly:** Access URLs directly, not just via navigation

### For Static Pages
Static pages (no `[param]` in filename) work without changes:
- Homepage, About, Contact, etc.
- No special SSR pattern needed
- Can directly access Astro.props if passed from parent

## Troubleshooting

### "Cannot read properties of undefined (reading 'data')"
**Cause:** Missing SSR fallback in dynamic page
**Fix:** Add `item || await getEntry(...)` pattern

### Authentication not working
**Cause:** Environment variables not set
**Fix:** Check `.env.local` has all required Clerk variables

### Page works in dev but fails in production
**Cause:** Different environment variables
**Fix:** Set production Clerk keys in Vercel environment variables

### "getStaticPaths() ignored" warning
**Cause:** Normal in SSR mode - informational only
**Fix:** No action needed - `getStaticPaths()` kept for type inference

## Benefits Achieved

✅ **Seamless Authentication** - Users sign in once, recognized across all Kowalah domains
✅ **Better UX** - Conditional UI based on real auth state, no client-side flickering
✅ **Secure Sessions** - Server-side session management with Clerk
✅ **Future-Proof** - Pattern supports both static builds and SSR rendering
✅ **Maintainable** - Clear pattern for all dynamic pages

## Related Documentation

- [Clerk Setup](./CLERK-SETUP-SUMMARY.md) - Authentication configuration
- [Deployment Guide](./DEPLOYMENT.md) - Production deployment
- [SSR Pattern](./ssr-dynamic-pages-pattern.md) - Dynamic page template
- [CLAUDE.md](../CLAUDE.md) - Project overview
