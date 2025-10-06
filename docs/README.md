# Documentation Index

## 📋 Table of Contents

### Getting Started
- **[Quick Reference](./QUICK-REFERENCE.md)** - Start here! Quick patterns and common tasks
- **[CLAUDE.md](../CLAUDE.md)** - Complete project overview and architecture

### SSR & Dynamic Pages (IMPORTANT)
- **[SSR Dynamic Pages Pattern](./ssr-dynamic-pages-pattern.md)** - ⭐ **REQUIRED for all dynamic pages**
- **[SSR Migration Summary](./SSR-MIGRATION-SUMMARY.md)** - What changed and why

### Authentication & Deployment
- **[Clerk Setup Summary](./CLERK-SETUP-SUMMARY.md)** - Complete authentication configuration
- **[Deployment Guide](./DEPLOYMENT.md)** - Production deployment steps
- **[Production Environment Template](../.env.production.example)** - Environment variable template

### Content & Branding
- **[Product Overview](./product-overview.md)** - Kowalah value proposition and target market
- **[Messaging Framework](./context/messaging-framework.md)** - How we communicate about Kowalah
- **[Positioning Canvas](./context/positioning-canvas.md)** - Competitive positioning
- **[Visual Style Guide](./context/visual-style-guide.md)** - Image and visual appearance guidelines
- **[Sanity Integration](./sanity-integration.md)** - CMS content management

## 🚀 Quick Start Guides

### For Creating New Pages

1. **Static Page** (no dynamic routing):
   - Create `.astro` file in `src/pages/`
   - No special SSR pattern needed
   - Can use props directly

2. **Dynamic Page** (with `[param]`):
   - **Read:** [SSR Dynamic Pages Pattern](./ssr-dynamic-pages-pattern.md)
   - **Copy template** from Quick Reference
   - **Follow checklist** - fallback pattern is REQUIRED

### For Deployment

1. **Development:**
   - Set variables in `.env.local`
   - Use test Clerk keys (`pk_test_...`)
   - Run `npm run dev`

2. **Production:**
   - Follow [Deployment Guide](./DEPLOYMENT.md)
   - Set production Clerk keys in Vercel
   - Update domain environment variables

## 🔍 Find What You Need

### "How do I...?"

| Task | Documentation |
|------|---------------|
| Create a dynamic page | [SSR Pattern](./ssr-dynamic-pages-pattern.md) |
| Add authentication UI | [Quick Reference](./QUICK-REFERENCE.md#authentication-ui) |
| Deploy to production | [Deployment Guide](./DEPLOYMENT.md) |
| Fix "undefined.data" error | [Quick Reference](./QUICK-REFERENCE.md#common-errors--fixes) |
| Understand SSR changes | [SSR Migration](./SSR-MIGRATION-SUMMARY.md) |
| Configure Clerk | [Clerk Setup](./CLERK-SETUP-SUMMARY.md) |
| Style content | [Visual Style Guide](./context/visual-style-guide.md) |
| Write messaging | [Messaging Framework](./context/messaging-framework.md) |

### "What is...?"

| Concept | Documentation |
|---------|---------------|
| SSR Mode | [SSR Migration Summary](./SSR-MIGRATION-SUMMARY.md) |
| Clerk Satellite Domain | [Clerk Setup](./CLERK-SETUP-SUMMARY.md) |
| Dynamic Page Pattern | [SSR Pattern](./ssr-dynamic-pages-pattern.md) |
| Kowalah Value Prop | [Product Overview](./product-overview.md) |
| Project Architecture | [CLAUDE.md](../CLAUDE.md) |

### "Where is...?"

| File/Feature | Location |
|--------------|----------|
| Authentication config | `src/middleware.ts` |
| Auth UI components | `src/layouts/partials/Header.astro` |
| SSR configuration | `astro.config.mjs` |
| Environment variables | `.env.local` (dev), Vercel (prod) |
| Dynamic page examples | `src/pages/solutions/[slug].astro` |
| Content collections | `src/content/` |

## 🎯 By Role

### Developers
1. [CLAUDE.md](../CLAUDE.md) - Project architecture
2. [SSR Pattern](./ssr-dynamic-pages-pattern.md) - Dynamic pages
3. [Quick Reference](./QUICK-REFERENCE.md) - Common tasks
4. [Deployment Guide](./DEPLOYMENT.md) - Production setup

### Content Creators
1. [Visual Style Guide](./context/visual-style-guide.md) - Image guidelines
2. [Messaging Framework](./context/messaging-framework.md) - Copy guidelines
3. [Sanity Integration](./sanity-integration.md) - CMS usage
4. [Product Overview](./product-overview.md) - Product knowledge

### DevOps/Deployment
1. [Deployment Guide](./DEPLOYMENT.md) - Deployment steps
2. [Clerk Setup](./CLERK-SETUP-SUMMARY.md) - Auth configuration
3. [Environment Template](../.env.production.example) - Required variables
4. [SSR Migration](./SSR-MIGRATION-SUMMARY.md) - Architecture changes

## 📝 Recent Changes

### October 2025 - SSR Migration
- ✅ Migrated from Static to SSR for Clerk authentication
- ✅ Updated all dynamic pages with SSR-compatible pattern
- ✅ Added comprehensive documentation
- ✅ Created quick reference guides

**Impact:** All new dynamic pages MUST use the SSR pattern documented in [ssr-dynamic-pages-pattern.md](./ssr-dynamic-pages-pattern.md)

## 🆘 Troubleshooting

### Common Issues
1. **"undefined.data" error** → [Quick Reference - Common Errors](./QUICK-REFERENCE.md#common-errors--fixes)
2. **Auth not working** → [Clerk Setup - Troubleshooting](./CLERK-SETUP-SUMMARY.md#troubleshooting)
3. **Production deployment fails** → [Deployment Guide - Troubleshooting](./DEPLOYMENT.md#troubleshooting)
4. **Dynamic page 404** → [SSR Pattern - Troubleshooting](./ssr-dynamic-pages-pattern.md#troubleshooting)

### Getting Help
1. Check [Quick Reference](./QUICK-REFERENCE.md) for common patterns
2. Review error-specific documentation above
3. Search documentation for keywords
4. Check example pages in `src/pages/`

## 🔗 External Resources

- [Astro Documentation](https://docs.astro.build)
- [Clerk Documentation](https://clerk.com/docs)
- [Vercel Deployment](https://vercel.com/docs)
- [Heroicons](https://heroicons.com) - Icon library
- [Syncmaster Theme](https://docs.themefisher.com/syncmaster-astro)

---

**Last Updated:** 5th October 2025
**Maintained By:** Kowalah Development Team
