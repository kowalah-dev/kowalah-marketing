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
- [x] Verify Sanity integration configuration
  - Check environment variables in `.env.local`
  - Test connection to Sanity project (ig58e610)
  - Create simple test page to verify Sanity data fetching
- [x] Set up basic SEO configuration
  - Update Open Graph meta tags with Kowalah branding
  - Add structured data for organization
  - Configure social media card defaults

### 1.5 Asset Preparation ✅
- [x] Audit existing theme images
  - ✅ Identified 109+ images requiring replacement with Kowalah executive-focused content
  - ✅ Created comprehensive asset requirements list with specific themes and dimensions
- [x] Define AI-generated image specifications for Kowalah brand
  - **Hero Images & Banners:**
    - Homepage hero: 1920x800px, landscape format, PNG/WebP
    - Section banners: 1200x400px, PNG/WebP
    - Page headers: 1200x300px, PNG/WebP
    - Themes: Modern office settings, AI visualization, executive teams, digital transformation
  - **Product Screenshots & Mockups:**
    - **Actual Kowalah Dashboard Screenshots:** 1920x1080px, PNG (captured from app.kowalah.com)
      - Main Digital CAIO interface showing AI conversations
      - Expert Requests dashboard with project status
      - Accelerators library with prebuilt GPTs and prompts
      - Analytics/ROI reporting dashboards
      - Team collaboration features
    - **Device Mockups with Real Screenshots:** 
      - MacBook Pro mockups: 1600x1000px, showing dashboard in realistic laptop frame
      - iPad Pro mockups: 1200x900px, Executive using Kowalah on tablet in boardroom
      - iPhone mockups: 800x600px, Mobile access for executives
      - Multiple screens setup: 2000x1200px, Executive workstation with Kowalah across monitors
    - **Feature Detail Screenshots:**
      - Individual feature screenshots: 1000x750px, PNG with clean backgrounds
      - Before/after workflow comparisons: 1200x800px, showing AI transformation
      - Integration screenshots: 1000x600px, Kowalah connecting to enterprise systems
    - **Interactive Elements:**
      - Animated GIFs: 800x600px, showing AI conversations in action (for web)
      - Video thumbnails: 1280x720px, product demo preview images
  - **Team & Professional Images:**
    - Executive headshots: 400x400px, square, high-quality portraits
    - Team photos: 1200x800px, diverse professional settings
    - Meeting/workshop scenes: 1000x667px, collaborative environments
    - Themes: Professional, diverse, modern office environments, AI-forward companies
  - **Background & Texture Images:**
    - Abstract backgrounds: 1920x1080px, subtle gradients, PNG/WebP
    - Texture overlays: 1200x1200px, repeatable patterns, PNG with transparency
    - Geometric patterns: Scalable SVG, minimalist AI-themed designs
    - Color palette: Kowalah brand colors (#fa26a0 primary, #ae10e3 secondary) with neutral complements
  - **Social Media & Meta Images:**
    - Open Graph images: 1200x630px, PNG/JPG
    - Twitter cards: 1200x675px, PNG/JPG
    - LinkedIn posts: 1200x627px, PNG/JPG
    - Themes: Kowalah branding, value proposition highlights, executive-focused messaging
  - **Case Study & Success Images:**
    - Before/after visualizations: 800x600px, side-by-side comparisons
    - ROI/metrics visualizations: 1000x600px, data-driven graphics
    - Industry-specific scenarios: 1200x800px, sector-relevant contexts
    - Themes: Transformation stories, measurable outcomes, industry contexts (manufacturing, finance, healthcare, etc.)
  - **Technical & Process Images:**
    - AI workflow diagrams: 1000x800px, clear process flows
    - Integration illustrations: 800x600px, system connections
    - Architecture diagrams: 1200x900px, technical but accessible
    - Themes: Clean, professional technical illustrations, enterprise-grade systems
- [x] Set up image optimization
  - ✅ Verified Sharp image optimization is working - build shows 119 images processed
  - ✅ Tested responsive image handling via ImageMod.astro component with proper width/height/format controls
  - ✅ Confirmed WebP conversion for modern browsers (build output shows .webp generation)
- [x] Create image directory structure
  - ✅ `/public/images/heroes/` - Homepage and section hero images
  - ✅ `/public/images/product/` - **NEW: Kowalah product screenshots and mockups**
    - ✅ `/product/screenshots/` - Raw dashboard captures from app.kowalah.com
    - ✅ `/product/mockups/` - Device mockups (MacBook, iPad, iPhone) with real screenshots
    - ✅ `/product/features/` - Individual feature demonstrations
    - ✅ `/product/integrations/` - System integration visuals
    - ✅ `/product/demos/` - Video thumbnails and animated previews
  - ✅ `/public/images/team/` - Team photos and professional headshots
  - ✅ `/public/images/backgrounds/` - Background textures and patterns
  - ✅ `/public/images/case-studies/` - Case study and success story images
  - ✅ `/public/images/technical/` - Process diagrams and technical illustrations
  - ✅ `/public/images/social/` - Social media and meta images
  - ✅ `/public/images/icons/` - Icon sets and small graphics
- [x] Priority Image Replacement List (Based on Audit):
  - **CRITICAL - Homepage Assets:**
    - `/public/images/home/banner.png` - Replace with **Kowalah dashboard in MacBook Pro mockup** showing Digital CAIO conversation
    - `/public/images/home/features/1-4.png` - Replace with **actual Kowalah feature screenshots** (Expert Requests, Accelerators, Analytics, Team features)
    - `/public/images/home/benefits/1-5.png` - Replace with **before/after workflow screenshots** showing AI transformation impact
    - `/public/images/home/offering/1-3.png` - Replace with **executive using Kowalah on iPad in boardroom setting**
  - **Executive Team & Testimonials:**
    - `/public/images/avatar/1-5.png` - Replace with diverse C-suite executive headshots
    - `/public/images/testimonial/` - Need professional executive portraits for testimonials
    - `/public/images/company/image-1-3.png` - Replace casual team photos with executive advisory sessions
    - `/public/images/company/stats.png` & `why.png` - Update with AI transformation metrics
  - **Content & Case Studies:**
    - `/public/images/insights/1-9.png` - Replace with executive thought leadership imagery
    - `/public/images/case/1.png` - Update with professional consultation scene
    - `/public/images/story/` - Need industry-specific transformation stories
  - **Feature & Integration Assets:**
    - `/public/images/features/` - Replace with **actual Kowalah feature screenshots** in professional device mockups
    - `/public/images/integrations/` - Replace with **real Kowalah integration screenshots** showing connections to Slack, Teams, CRM systems
- [x] Prepare content structure
  - ✅ Reviewed existing content collections - well-structured with Zod schemas for 14 collection types
  - ✅ Planned image alt text standards: descriptive, executive-focused (e.g., "CEO using Digital CAIO on tablet in boardroom")
  - ✅ Defined image naming conventions: 
    - Product screenshots: `kowalah-[feature]-[device]-[version].png`
    - Executive imagery: `executive-[role]-[context]-[demographic].jpg`
    - Technical diagrams: `workflow-[process]-diagram.svg`
    - Social media: `og-[page]-kowalah.png`

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