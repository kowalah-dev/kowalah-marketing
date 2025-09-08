# Phase 1: Foundation & Configuration

## Overview
Set up Kowalah branding, configuration, and basic infrastructure for the marketing website.

## Tasks

### 1.1 Brand Configuration
- [ ] Update `src/config/config.json` with Kowalah metadata
  - Site title: "Kowalah - Your Digital Chief AI Officer"
  - Base URL: Update to Kowalah domain
  - Meta description: Update with Kowalah value proposition
  - Author: Update to Kowalah
- [ ] Replace favicon and logos
  - Add Kowalah favicon to `/public/images/favicon.png`
  - Add Kowalah logo (light) to `/public/images/logo.svg`
  - Add Kowalah logo (dark) to `/public/images/logo_darkmode.svg`
  - Update logo dimensions in config
- [ ] Update copyright and footer text
  - Update copyright notice for Kowalah
  - Update footer tagline with Kowalah messaging

### 1.2 Tailwind Theme Configuration
- [ ] Configure Kowalah brand colors in `src/config/theme.json`
  - Primary: #fa26a0
  - Secondary: #ae10e3
  - Additional brand colors as needed
- [ ] Update font selections if needed
  - Review current fonts vs Kowalah brand guidelines
  - Update font configurations if different fonts needed
- [ ] Review and update component styling
  - Ensure components use proper CSS variables
  - Test dark/light mode with new colors

### 1.3 Navigation Structure
- [ ] Update `src/config/menu.json` with Kowalah navigation structure:
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
          {"name": "Expert Services", "url": "/product/expert-services"}
        ]
      },
      {
        "name": "Solutions",
        "url": "",
        "hasChildren": true,
        "children": [
          {"name": "By Industry", "url": "/solutions/industries"},
          {"name": "For CEOs", "url": "/solutions/ceos"},
          {"name": "For CIOs", "url": "/solutions/cios"},
          {"name": "For CFOs", "url": "/solutions/cfos"}
        ]
      },
      {
        "name": "OpenAI",
        "url": "",
        "hasChildren": true,
        "children": [
          {"name": "OpenAI Overview", "url": "/openai"},
          {"name": "License Guide", "url": "/openai/licensing"},
          {"name": "Implementation Roadmap", "url": "/openai/implementation"},
          {"name": "Security & Governance", "url": "/openai/security"}
        ]
      },
      {"name": "Pricing", "url": "/pricing"},
      {"name": "Resources", "url": "/insights"},
      {"name": "Company", "url": "/company"}
    ]
  }
  ```
- [ ] Update footer navigation accordingly
- [ ] Update navigation button (CTA) in header
  - Change to "Start Free Trial" or "Get Started"
  - Link to appropriate signup/demo page

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