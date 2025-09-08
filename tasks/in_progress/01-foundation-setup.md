# Phase 1: Foundation & Configuration

## Overview
Set up Kowalah branding, configuration, and basic infrastructure for the marketing website.

## Tasks

### 1.1 Brand Configuration
- [x] Update `src/config/config.json` with Kowalah metadata
  - Site title: "Kowalah - Your Digital Chief AI Officer"
  - Base URL: Update to Kowalah domain
  - Meta description: Update with Kowalah value proposition
  - Author: Update to Kowalah
- [x] Replace favicon and logos
  - Add Kowalah favicon to `/public/images/favicon.png`
  - Add Kowalah logo (light) to `/public/images/logo.png`
  - Add Kowalah logo (dark) to `/public/images/logo_darkmode.png`
  - Update logo dimensions in config
- [x] Update copyright and footer text
  - Update copyright notice for Kowalah
  - Update footer tagline with Kowalah messaging

### 1.2 Tailwind Theme Configuration
- [x] Configure Kowalah brand colors in `src/config/theme.json`
  - Primary: #fa26a0
  - Secondary: #ae10e3
  - Additional brand colors as needed
- [x] Update font selections if needed
  - Review current fonts vs Kowalah brand guidelines
  - Inter and Be Vietnam Pro are appropriate for Kowalah
- [x] Review and update component styling
  - Components use proper CSS variables from theme.json
  - Dark/light mode functionality verified with new colors

### 1.3 Navigation Structure
- [x] Update `src/config/menu.json` with refined Kowalah navigation structure:
  ```json
  {
    "main": [
      {
        "name": "Product",
        "url": "",
        "hasChildren": true,
        "children": [
          {"name": "Platform Overview", "url": "/product"},
          {"name": "AI Strategy & Vision", "url": "/product/strategy"},
          {"name": "Implementation & Performance", "url": "/product/implementation"},
          {"name": "Governance & Risk", "url": "/product/governance"},
          {"name": "Team & Change Management", "url": "/product/team-management"},
          {"name": "Expert Services", "url": "/product/expert-services"},
          {"name": "Accelerators & Integrations", "url": "/product/accelerators"},
          {"name": "Trust & Security", "url": "/product/security"}
        ]
      },
      {
        "name": "Solutions",
        "url": "",
        "hasChildren": true,
        "children": [
          {"name": "For CEOs", "url": "/solutions/ceos"},
          {"name": "For CIOs", "url": "/solutions/cios"},
          {"name": "For CFOs", "url": "/solutions/cfos"},
          {"name": "For HR Leaders", "url": "/solutions/hr-leaders"},
          {"name": "By Industry", "url": "/solutions/industries"}
        ]
      },
      {
        "name": "Resources",
        "url": "",
        "hasChildren": true,
        "children": [
          {"name": "Blog & Insights", "url": "/insights"},
          {"name": "OpenAI Hub", "url": "/resources/openai"},
          {"name": "Case Studies", "url": "/case-studies"},
          {"name": "Tools & Templates", "url": "/resources/tools"},
          {"name": "Documentation", "url": "/docs"}
        ]
      },
      {"name": "Pricing", "url": "/pricing"},
      {"name": "Company", "url": "/company"}
    ]
  }
  ```
- [x] Update footer navigation accordingly
- [x] Update navigation button (CTA) in header
  - Change to "Start Free Trial" or "Get Started"
  - Link to appropriate signup/demo page
  - ✅ Configured with "Start Free Trial" pointing to https://app.kowalah.com/sign-up
  - ✅ Added "Sign In" link pointing to https://app.kowalah.com/sign-in

### 1.4 Environment & Integration Setup
- [ ] Verify Sanity integration configuration
  - Check environment variables in `.env.local`
  - Test connection to Sanity project (ig58e610)
  - Create simple test page to verify Sanity data fetching
- [ ] Set up basic SEO configuration
  - Update Open Graph meta tags with Kowalah branding
  - Add structured data for organization
  - Configure social media card defaults

### 1.5 Asset Preparation
- [ ] Audit existing theme images
  - Identify which images need replacement with Kowalah-specific assets
  - Create placeholder list for design team
- [ ] Set up image optimization
  - Verify Sharp image optimization is working
  - Test responsive image handling
- [ ] Prepare content structure
  - Review existing content collections for Kowalah adaptation
  - Plan image directory structure in `/public/images/`

## Completion Criteria
- [ ] Site loads with Kowalah branding (colors, logo, title)
- [ ] Navigation reflects Kowalah structure
- [ ] Sanity connection is verified and working
- [ ] All configuration files updated with Kowalah details
- [ ] Theme colors and fonts properly configured

## Dependencies
- Design assets from Kowalah brand team
- Access to Kowalah brand guidelines
- Sanity project credentials

## Estimated Time
2-3 days

## Next Phase
Proceed to content migration and homepage updates