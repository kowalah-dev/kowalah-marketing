# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Kowalah's marketing website - Kowalah is a digital chief AI officer helping companies of between 1,000 and 10,000 employees to accelerate AI adoption across their organization.

Our Kowalah repositories consist of these - all within the kowalah-dev Github organisation

- kowalah-marketing (this repo) Our Marketing website hosted on the www. subdomain
- kowalah - Our primary application, where our users interact with the product, hosted at the app. subdomain.
- kowalah-admin - Our internal admin interface where our employees manage and create users and update the product. Hosted at the admin. subdomain.
- docs - Our documentation site, built with Mintlify, hosted at docs. subdomain.

## Development Commands

### Core Commands
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (static site generation)
- `npm run preview` - Preview production build locally
- `npm run check` - Run Astro's built-in type and error checking
- `npm run format` - Format code using Prettier

### Package Manager
- Uses `yarn@1.22.22` as the specified package manager
- Lock file: `package-lock.json` (npm) is present, but yarn is preferred per packageManager field

## Architecture & Technology Stack

### Core Technologies
- **Framework:** Astro 5.5.4 with React integration
- **Styling:** TailwindCSS 4.0.15 with custom plugins and utilities
- **Content Management:** Astro's Content Collections API with Zod validation
- **Package Manager:** Yarn 1.22.22 (specified in packageManager field)
- **TypeScript:** Full TypeScript support with strict configuration

### Site Configuration
- **Base URL:** https://syncmaster-astro.vercel.app/
- **Site Title:** SyncMaster
- **Theme:** System-based dark/light mode with sticky header disabled
- **Search:** Enabled site-wide search functionality

### Content Architecture
Uses Astro's Content Collections with comprehensive Zod schemas for:
- **Homepage:** Hero sections, features, benefits, pricing plans
- **Insights:** Blog posts with categories, authors, and dates
- **Case Studies:** Portfolio items with stats and hero sections  
- **Company:** About page with stats, team slider, job listings
- **Pricing:** Plans with monthly/yearly toggle and feature comparison
- **Contact:** Contact forms and company information
- **Features:** Product feature showcases
- **Integrations:** Third-party integration listings
- **FAQ:** Frequently asked questions
- **Changelog:** Product updates and version history

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
- **Icons:** React Icons library for consistent iconography
- **Video:** React Lite YouTube Embed for performance

### Content Features
- **Markdown processing:** Remark plugins for table of contents and collapsible sections
- **Syntax highlighting:** Shiki with "one-dark-pro" theme
- **RSS feeds:** Auto-generated RSS for blog content
- **Sitemap:** Automatic sitemap generation
- **SEO:** Comprehensive meta tags and Open Graph support

### Development Workflow
1. Content is managed through markdown files in `/src/content/`
2. Each content type has a strict Zod schema for validation
3. Components are organized by purpose (layouts, shortcodes, partials)
4. Styles follow a modular approach with utilities and components
5. TypeScript ensures type safety across the entire project

## Performance & Production
- **Image optimization:** Sharp for image processing and optimization
- **Static generation:** Full static site generation for optimal performance
- **CDN ready:** Optimized for deployment on Vercel and other static hosts
- **Bundle optimization:** Vite-powered build system for efficient bundling