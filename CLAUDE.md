# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Kowalah's marketing website - Kowalah is an Enterprise AI Impact Partner that delivers rapid business value through AI Impact Sprints, then scales AI transformation across organizations of 1,000-10,000 employees in non-tech industries.

Our Kowalah repositories consist of these - all within the kowalah-dev Github organisation

- kowalah-marketing (this repo) Our Marketing website hosted on the www. subdomain
- kowalah - Our primary application, where our users interact with the product, hosted at the app. subdomain.
- kowalah-admin - Our internal admin interface where our employees manage and create users and update the product. Hosted at the admin. subdomain.
- kowalah-docs - Our documentation site, built with Mintlify, hosted at docs. subdomain.

## Kowalah Strategy

We have a strategy directory at

~/Documents/KowalahReserved/strategy

Use this to find our latest corporate-strategy and go-to-market documentation

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
- @.claude/product-marketing-context.md is the **source of truth** for Kowalah's positioning, value proposition, and target market
- @docs/content-strategy.md defines content pillars, priority topics, topic cluster map, and content calendar
- ~/Documents/KowalahReserved/strategy/go-to-market explains how we communicate about Kowalah
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
- **Homepage:** Hero sections, service overview, value propositions, pricing tiers
- **Insights:** AI implementation, adoption, and industry transformation content (primarily from Sanity CMS)
- **Case Studies:** AI implementation success stories and ROI metrics
- **Company:** Kowalah story, team, AI expertise, and career opportunities
- **Pricing:** Service tiers (Free, Individual, Digital, Essential, Executive, Enterprise)
- **Contact:** Lead generation forms for executive prospects
- **Features:** Core AI service capabilities showcase
- **Integrations:** Enterprise system connections (Slack, Teams, CRM, ERP)
- **Platforms:** AI platform pages (Claude/Anthropic, ChatGPT/OpenAI) with capabilities, partnership, and implementation sections
- **FAQ:** AI Impact Sprints, Expert Requests, and service questions
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

### Markdown in Components
Service page components receive text strings that may contain inline markdown (links, bold, italic). Any component that renders descriptive text (subtitles, descriptions, list items) must:
1. Import `markdownify` from `@/lib/utils/textConverter`
2. Use `set:html={markdownify(text)}` instead of plain `{text}` interpolation
3. Add link styling classes for clickable links: `[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-secondary [&_a]:transition-colors`

Plain `{text}` escapes HTML and renders markdown syntax as literal text. See `ServicesHero.astro` for the reference pattern.

### Development Workflow
1. Content is managed through markdown files in `/src/content/` with Kowalah-specific schemas
2. Each content type has a strict Zod schema for validation
3. Components are organized by purpose (layouts, shortcodes, partials)
4. Styles follow a modular approach with utilities and components
5. TypeScript ensures type safety across the entire project
6. Content migration follows phased approach: Foundation → Content → Pages → Integration → Testing

## Kowalah Content Migration Status


### Brand Guidelines
- **Executive-level messaging:** Professional, strategic, authoritative tone
- **Positioning:** Enterprise AI Impact Partner, Sprint-first methodology, services + platform model
- **Competitive positioning:** vs. big consultancies (strategy decks, not results), AI training companies (enthusiasm without execution), DIY/IT-led rollouts (no change enablement), human CAIO hiring (cost, time, single perspective)
- **Key differentiators:** Sprint-first (working solutions in weeks, not months), embedded approach (build alongside your people), proof points before scale, Expert Requests prevent the Enthusiasm Gap, multi-platform expertise (Claude, ChatGPT, Gemini), AI-native delivery model
- **Key terms:** AI Impact Sprint, Expert Requests, Change Enablement, Accelerators, AI Ambassadors, Ground Game, Enthusiasm Gap, Digital CAIO (platform feature name, not company positioning)

### Writing Style
- **Punctuation:** Use commas instead of em-dashes (—) for parenthetical phrases and clause breaks
- **Clarity:** Keep sentences direct and scannable for busy executives
- **Stage-agnostic:** Don't assume the reader has already tried training, rolled out Copilot, or failed at AI adoption
- **Positive framing:** Position what Kowalah does, not what competitors do wrong
- **CTAs:** Use low-commitment language ("Book a Conversation") rather than product-specific asks ("Book AI Impact Sprint")

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