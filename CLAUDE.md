# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Kowalah's marketing website - Kowalah is a digital chief AI officer helping companies of between 1,000 and 10,000 employees to accelerate AI adoption across their organization.

Our Kowalah repositories consist of these - all within the kowalah-dev Github organisation

- kowalah-marketing (this repo) Our Marketing website hosted on the www. subdomain
- kowalah - Our primary application, where our users interact with the product, hosted at the app. subdomain.
- kowalah-admin - Our internal admin interface where our employees manage and create users and update the product. Hosted at the admin. subdomain.
- docs - Our documentation site, built with Mintlify, hosted at docs. subdomain.

## Important Documentation

### Framework & Architecture
- Astro MCP Server - use this to get implementation and configuration guidance on the Astro web framework
- Syncmaster Astro Theme docs - from Themefisher (original template foundation) https://docs.themefisher.com/syncmaster-astro
- @docs/ssr-dynamic-pages-pattern.md - **REQUIRED pattern for all dynamic pages** (SSR compatibility)
- @docs/SSR-MIGRATION-SUMMARY.md - SSR migration overview and changes

### Authentication & Deployment
- @docs/CLERK-SETUP-SUMMARY.md - Complete Clerk authentication setup and configuration
- @docs/DEPLOYMENT.md - Production deployment guide with environment variables
- @.env.production.example - Production environment variable template

### Content & Branding
- @docs/product-overview.md provides detailed overview of the Kowalah application, value proposition and target market
- @docs/context/messaging-framework.md explains how we communicate aobout Kowalah
- @docs/context/positioning-canvas.md explains how we position Kowalah against competing solutions
- @docs/context/visual-style-guide.md provides our image and visual appearance (human-centered transformation focus)
- @docs/sanity-integration.md explains how our Astro project pulls content from our Sanity CMS

## Development Commands

### Core Commands
- `npm run dev` - Start development server with hot reload (SSR mode)
- `npm run build` - Build for production (server-side rendering with Node.js)
- `npm run preview` - Preview production build locally
- `npm run check` - Run Astro's built-in type and error checking
- `npm run format` - Format code using Prettier

**Note:** Site uses SSR mode (not static generation) for Clerk authentication. Requires Node.js hosting (Vercel, Netlify, etc.).

### Package Manager
- Uses `yarn@1.22.22` as the specified package manager
- Lock file: `package-lock.json` (npm) is present, but yarn is preferred per packageManager field

## Architecture & Technology Stack

### Core Technologies
- **Framework:** Astro 5.5.4 with React integration
- **Rendering Mode:** Server-side rendering (SSR) with Node.js adapter for Clerk authentication
- **Authentication:** Clerk satellite domain configuration for cross-domain session sharing with main app
- **Styling:** TailwindCSS 4.0.15 with custom plugins and utilities
- **Icons:** Heroicons (@heroicons/react) - 300+ professional icons with automatic color inheritance
- **Content Management:** Astro's Content Collections API with Zod validation
- **Package Manager:** Yarn 1.22.22 (specified in packageManager field)
- **TypeScript:** Full TypeScript support with strict configuration

### Site Configuration
- **Base URL:** https://www.kowalah.com/
- **Site Title:** Kowalah
- **Theme:** System-based dark/light mode with sticky header disabled
- **Search:** Enabled site-wide search functionality

### Content Architecture
Uses Astro's Content Collections with comprehensive Zod schemas for:
- **Homepage:** Hero sections with Digital CAIO positioning, 7 core AI capabilities, value propositions, pricing tiers
- **Insights:** AI leadership and industry transformation content
- **Case Studies:** AI implementation success stories and ROI metrics
- **Company:** Kowalah story, team, AI expertise, and career opportunities
- **Pricing:** Digital AI Leadership plans (Free, Individual, Digital, Essential, Executive, Enterprise)
- **Contact:** Lead generation forms for executive prospects
- **Features:** 7 core AI leadership capabilities showcase
- **Integrations:** Enterprise system connections (Slack, Teams, CRM, ERP)
- **FAQ:** Digital Chief AI Officer and Expert Requests questions
- **Reviews:** Executive testimonials and organizational outcomes

### Project Structure
```
/src/
  /config/         # Site configuration (config.json, theme.json, menu.json)
  /content/        # Content collections (markdown/MDX files)
  /layouts/        # Astro layouts and components
    /components/   # Reusable React/Astro components
    /partials/     # Header, footer, and layout partials
    /shortcodes/   # MDX shortcode components (Button, Accordion, etc.)
  /styles/         # CSS files (main.css, utilities, animations, etc.)
  /hooks/          # React hooks (useTheme.ts)
  /icons/          # SVG icon assets
```

### Auto-Import Configuration
Astro is configured to auto-import commonly used shortcode components:
- Button, Accordion, Notice, Video, Youtube
- Tabs, Tab components for interactive content
- Changelog component for version updates

### Path Aliases
TypeScript path mapping configured for:
- `@/components/*` → `./src/layouts/components/*`
- `@/shortcodes/*` → `./src/layouts/shortcodes/*` 
- `@/helpers/*` → `./src/layouts/helpers/*`
- `@/partials/*` → `./src/layouts/partials/*`
- `@/*` → `./src/*`

### Styling System
- **TailwindCSS 4.0.15** with custom plugins
- **Custom plugins:** Bootstrap-style grid system, theme utilities
- **Typography:** @tailwindcss/typography for rich text content
- **Forms:** @tailwindcss/forms for consistent form styling
- **Dark Mode:** System preference detection with manual override

### React Integration
- **React 19.0.0** with React DOM
- **Interactive components:** Sliders (Swiper), counters, theme toggles
- **Video:** React Lite YouTube Embed for performance

### Icon System
- **Primary:** Heroicons (@heroicons/react) - 300+ professional SVG icons
- **Browse:** [heroicons.com](https://heroicons.com) for available icons
- **Integration:** React components with automatic `currentColor` support
- **Usage Pattern:** Import icons and map to semantic names in content
- **Legacy:** Custom SVG icons in `/src/icons/` for brand-specific needs only

**Example Implementation:**
```astro
---
import { LightBulbIcon, RocketLaunchIcon } from '@heroicons/react/24/solid';

const iconMap = {
  'bulb': LightBulbIcon,
  'rocket': RocketLaunchIcon
};
---

<Icon Component={iconMap[data.icon]} className="w-8 h-8 text-white" />
```

### Content Features
- **Markdown processing:** Remark plugins for table of contents and collapsible sections
- **Syntax highlighting:** Shiki with "one-dark-pro" theme
- **RSS feeds:** Auto-generated RSS for blog content
- **Sitemap:** Automatic sitemap generation
- **SEO:** Comprehensive meta tags and Open Graph support

### Development Workflow
1. Content is managed through markdown files in `/src/content/` with Kowalah-specific schemas
2. Each content type has a strict Zod schema for validation
3. Components are organized by purpose (layouts, shortcodes, partials)
4. Styles follow a modular approach with utilities and components
5. TypeScript ensures type safety across the entire project
6. Content migration follows phased approach: Foundation → Content → Pages → Integration → Testing

## Kowalah Content Migration Status

### Completed Phases
- ✅ **Phase 1:** Foundation setup with Kowalah branding and infrastructure
- ✅ **Task 2.1:** Homepage content updated with Digital CAIO positioning

### Current Content Strategy
- **Target Audience:** CEOs at mid-sized enterprises (1,000-10,000 employees)  
- **Value Proposition:** Digital Chief AI Officer platform vs. hiring human CAIO
- **Core Capabilities:** 7 AI leadership domains (Strategy, C-Suite, Governance, Talent, Implementation, Development, Change)
- **Pricing Model:** 6 tiers from Free (£0) to Enterprise (£50,000+/month)

### Brand Guidelines
- **Executive-level messaging:** Professional, strategic, authoritative tone
- **Competitive positioning:** vs. human CAIO hiring, consultants, DIY approaches
- **Key differentiators:** Immediate availability, 24/7 access, collective intelligence, zero turnover risk

## Performance & Production
- **Image optimization:** Sharp for image processing and optimization
- **Server-side rendering:** SSR mode for Clerk authentication and dynamic content
- **Deployment:** Optimized for Vercel with Node.js adapter
- **Bundle optimization:** Vite-powered build system for efficient bundling
- **Authentication Setup:** See @docs/CLERK-SETUP-SUMMARY.md and @docs/DEPLOYMENT.md for Clerk configuration

## Authentication & SSR Implementation

### Clerk Satellite Domain Setup
This site operates as a **Clerk satellite domain**, sharing authentication sessions with the main application (app.kowalah.com):

- **Authentication Provider:** Clerk (same instance as main app)
- **Session Sharing:** Cross-domain cookie-based authentication
- **User Experience:** Users sign in once on main app, recognized across all domains
- **Configuration:** Environment-driven setup via middleware (see @src/middleware.ts)

### SSR-Compatible Dynamic Pages Pattern

**IMPORTANT:** All dynamic pages (using `[param]` syntax) must support SSR mode. Use this pattern:

```astro
---
import { getEntry } from "astro:content";

export async function getStaticPaths() {
  const items = await getCollection("collection-name");

  return items.map((item) => ({
    params: { slug: item.id },
    props: { item },
  }));
}

// SSR-compatible data fetching
const { slug } = Astro.params;
const { item } = Astro.props;

// Fallback for SSR mode - fetch item if not in props
const itemEntry = item || await getEntry("collection-name", slug as string);

if (!itemEntry) {
  return Astro.redirect("/404");
}

const { title, description, /* other fields */ } = itemEntry.data;
---
```

**Why this pattern is required:**
- In SSR mode, `getStaticPaths()` is ignored (pages rendered on-demand)
- Props from `getStaticPaths()` are undefined in SSR requests
- Fallback to `getEntry()` ensures data is fetched when props are missing
- Provides 404 redirect when content doesn't exist

**Examples of SSR-compatible pages:**
- @src/pages/solutions/[slug].astro
- @src/pages/[regular].astro
- @src/pages/insights/[single].astro
- @src/pages/resources/recommended-books/[single].astro

### Environment Variables for Authentication

Development and production use different environment variables (see @.env.local for dev, @DEPLOYMENT.md for prod):

```bash
# Clerk Keys
PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_... # or pk_live_... for production
CLERK_SECRET_KEY=sk_test_...            # or sk_live_... for production

# Satellite Configuration (read by middleware)
CLERK_PRIMARY_DOMAIN=app.kowalah.com    # Where users authenticate
CLERK_SIGN_IN_URL=https://app.kowalah.com/sign-in
```

**Configuration Files:**
- @src/middleware.ts - Clerk satellite domain configuration
- @src/layouts/partials/Header.astro - Conditional auth UI (SignedIn/SignedOut)
- @astro.config.mjs - SSR mode, Node adapter, experimental session support