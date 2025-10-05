# Quick Reference - SSR & Dynamic Pages

## ⚡ Creating a New Dynamic Page

### Template (Copy & Paste)
```astro
---
import Base from "@/layouts/Base.astro";
import { getEntry, getCollection } from "astro:content";

export async function getStaticPaths() {
  const items = await getCollection("your-collection");
  return items.map((item) => ({
    params: { slug: item.id },
    props: { item },
  }));
}

// SSR-compatible pattern (REQUIRED)
const { slug } = Astro.params;
const { item } = Astro.props;
const itemEntry = item || await getEntry("your-collection", slug as string);

if (!itemEntry) {
  return Astro.redirect("/404");
}

const { title, description } = itemEntry.data;
---

<Base {title} {description}>
  <!-- Your content -->
</Base>
```

## 🔑 Key Patterns

### Dynamic Page Checklist
- [ ] Extract param: `const { slug } = Astro.params;`
- [ ] Get props: `const { item } = Astro.props;`
- [ ] Add fallback: `item || await getEntry(...)`
- [ ] Validate: `if (!itemEntry) return Astro.redirect("/404");`
- [ ] Safe access: `const { title } = itemEntry.data;`

### Authentication UI
```astro
---
import { SignedIn, SignedOut } from "@clerk/astro/components";
---

<SignedOut>
  <!-- Show when NOT logged in -->
  <a href="/sign-in">Sign In</a>
</SignedOut>

<SignedIn>
  <!-- Show when logged in -->
  <a href="/dashboard">Go to Dashboard</a>
</SignedIn>
```

## 📝 Common Tasks

### Add Environment Variable
1. Add to `.env.local` for development
2. Add to Vercel for production
3. Access via `import.meta.env.VARIABLE_NAME`

### Test Dynamic Page
1. Start dev server: `npm run dev`
2. Visit URL directly: `http://localhost:4321/your-page/slug`
3. Check for errors in console
4. Verify 404 redirect for invalid slugs

## 🚨 Common Errors & Fixes

### "Cannot read properties of undefined (reading 'data')"
**Fix:** Add SSR fallback pattern
```astro
// ❌ Wrong
const { item } = Astro.props;
const { title } = item.data;

// ✅ Correct
const { item } = Astro.props;
const itemEntry = item || await getEntry("collection", slug);
if (!itemEntry) return Astro.redirect("/404");
const { title } = itemEntry.data;
```

### "getStaticPaths() ignored" warning
**Fix:** This is normal in SSR mode - no action needed

### Page works in dev, fails in production
**Fix:** Check Vercel environment variables match `.env.local`

## 📚 Documentation Links

- **Full Pattern Guide:** [docs/ssr-dynamic-pages-pattern.md](./ssr-dynamic-pages-pattern.md)
- **Migration Summary:** [docs/SSR-MIGRATION-SUMMARY.md](./SSR-MIGRATION-SUMMARY.md)
- **Clerk Setup:** [CLERK-SETUP-SUMMARY.md](./CLERK-SETUP-SUMMARY.md)
- **Deployment:** [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Project Overview:** [CLAUDE.md](../CLAUDE.md)

## 🔧 Environment Variables

### Development (.env.local)
```bash
PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_PRIMARY_DOMAIN=kowalah-preview.vercel.app
CLERK_SIGN_IN_URL=https://kowalah-preview.vercel.app/sign-in
```

### Production (Vercel)
```bash
PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
CLERK_PRIMARY_DOMAIN=app.kowalah.com
CLERK_SIGN_IN_URL=https://app.kowalah.com/sign-in
```

## 🎯 File Locations

| File | Purpose |
|------|---------|
| `src/middleware.ts` | Clerk satellite config |
| `astro.config.mjs` | SSR mode, Node adapter |
| `src/layouts/partials/Header.astro` | Auth UI (SignedIn/Out) |
| `.env.local` | Development environment vars |
| `src/pages/[param].astro` | Dynamic page template |

## ⚙️ Commands

```bash
npm run dev      # Start SSR dev server
npm run build    # Build for production (Node.js)
npm run preview  # Preview production build
npm run check    # Type checking
```

## 🚀 Deployment Checklist

- [ ] Update Vercel environment variables (production Clerk keys)
- [ ] Set `CLERK_PRIMARY_DOMAIN=app.kowalah.com`
- [ ] Set `CLERK_SIGN_IN_URL=https://app.kowalah.com/sign-in`
- [ ] Verify satellite domain in Clerk Dashboard
- [ ] Test authentication flow on production
- [ ] Check all dynamic pages work correctly
