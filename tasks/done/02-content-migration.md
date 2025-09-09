# Phase 2: Content Migration & Updates

## Overview
Update existing Astro Content Collections with Kowalah-specific content, leveraging the existing robust schema structure.

## Tasks

### 2.1 Homepage Content Update
- [x] Update `src/content/homepage/-index.md` with Kowalah content:
  - **Hero Section**:
    - Title: "Your Digital Chief AI Officer" or similar value prop
    - Content: Kowalah positioning statement
    - CTA buttons: "Start Free Trial", "See How It Works"
    - Customer logos: Replace with Kowalah client logos
    - Customer note: Update with Kowalah testimonial stats
  - **Feature Section**:
    - Title: "Complete AI Leadership Platform"
    - Features array: Replace with Kowalah's 7 core capabilities:
      1. AI Strategy & Vision
      2. C-Suite Collaboration  
      3. AI Governance & Risk Management
      4. Talent & Capability Building
      5. AI Implementation & Performance
      6. App & Prompt Development
      7. Change Management
  - **Offering Section**: Update with Kowalah value propositions
  - **Benefits Section**: Update with Kowalah benefits messaging
  - **Plan Section**: Update with Kowalah pricing tiers (Free, Individual, Digital, Essential, Executive, Enterprise)

### 2.2 Pricing Page Content Update
- [x] Update `src/content/pricing/-index.md`:
  - **Hero Section**: Update with pricing page messaging
  - **Pricing Cards**: Update with Kowalah's 6 pricing tiers:
    - Free (£0): 10 messages, basic access
    - Individual (£59/month): Single user, unlimited chat
    - Kowalah Digital (£2,000/month): Up to 10 users, team collaboration
    - Kowalah Essential (£12,500/month): + 12 Expert Requests/quarter
    - Kowalah Executive (£25,000/month): Complete integration, 24 Expert Requests
    - Kowalah Enterprise (£50,000+/month): Multi-unit, 36+ Expert Requests
  - **Feature Comparison**: Update comparison table with Kowalah features
  - **FAQ Section**: Update with pricing-specific FAQs

### 2.3 Company Page Content Update
- [x] Update `src/content/company/-index.md`:
  - **Hero Section**: Kowalah company story and mission
  - **About Section**: 
    - Company story and values
    - Stats: Update with Kowalah metrics (if available)
    - Trusted partners: AI/tech partners and integrations
  - **Why Section**: Why choose Kowalah over alternatives
  - **Team Slider**: Add Kowalah team member photos and bios
  - **Jobs Section**: Career opportunities at Kowalah

### 2.4 Features/Product Page Content Update
- [x] Update `src/content/features/-index.md`:
  - **Hero Section**: "Complete Digital CAIO Platform"
  - **Features Array**: Detail each of the 7 core capabilities
    - Each with specific value props, use cases, and CTAs
  - **Conversion Section**: Feature-to-benefit conversion messaging

### 2.5 FAQ Content Update
- [x] **Integrated with Sanity CMS** (instead of updating markdown):
  - ✅ Added FAQ queries to `/src/lib/sanity.ts`
  - ✅ Updated `/src/pages/faq.astro` to fetch from Sanity
  - ✅ Modified `FaqAccordion.astro` to handle Portable Text
  - ✅ Now displays 15+ Kowalah-specific FAQs from Sanity including:
    - "What is a Digital Chief AI Officer?"
    - "How is this different from hiring a human CAIO?"  
    - "What exactly are accelerators?"
    - "How do I know if my organization is ready for AI?"
    - And many more with rich text formatting
  - ✅ Marketing team can now update FAQs without code changes

### 2.6 Contact Page Content Update
- [x] Update `src/content/contact/-index.md`:
  - ✅ **Contact Info**: Updated with Kowalah contact details (Business, Support, Partnerships)
  - ✅ **Contact Form**: Customized for executive lead generation with AI-focused service options
  - ✅ **Professional Messaging**: Updated title and description for executive audience
  - ✅ **Support Channels**: Added appropriate contact methods (hello@, support@, partners@kowalah.com)
  - ✅ **Form Integration**: Set up Formspree endpoint for form submissions

### 2.7 Legal Pages Update
- [x] **Integrated with Sanity CMS** (instead of updating markdown):
  - ✅ Updated `/src/pages/privacy-policy.astro` to fetch from Sanity
  - ✅ Updated `/src/pages/terms-and-conditions.astro` to fetch from Sanity
  - ✅ Created `/src/pages/data-processing-agreement.astro` for DPA content
  - ✅ Removed old markdown files: `src/content/pages/privacy-policy.md`, `src/content/pages/terms-and-conditions.md`
  - ✅ Added proper error handling and fallback messaging
  - ✅ Marketing team can now update legal content without code deployments
  - ✅ Added proper document metadata (effective dates, last updated)
  - ✅ Includes contact information for legal inquiries

### 2.75 Blog/Insights Sanity CMS Integration
- [x] **Complete blog system migration to Sanity CMS**:
  - ✅ Enhanced blog listing with 4-column responsive grid layout (1→2→3→4 columns)
  - ✅ Updated `/src/lib/sanity.ts` with comprehensive blog post queries
  - ✅ Implemented dual-source content support (Sanity + content collections fallback)
  - ✅ Created sectioned content rendering system supporting 4 section types:
    - **Text Sections**: Rich text with PortableText (H2-H4, lists, links)
    - **Image Sections**: Images with alt text, captions, and size options
    - **Video Sections**: YouTube embeds with aspect ratios and start times
    - **Table Sections**: Structured tables with styling options
  - ✅ Built `SectionRenderer.astro` component for modular content rendering
  - ✅ Updated `PostSingle.astro` to support both legacy PortableText and new sections
  - ✅ Enhanced `BlogCard.astro` with proper Sanity image handling and metadata
  - ✅ Updated static path generation in `[single].astro` for dual-source routing
  - ✅ Maintained backward compatibility with existing content collections
  - ✅ Proper image optimization using Sanity CDN with `urlFor` helper

### 2.8 Review and Integration Pages
- [ ] Update `src/content/reviews/-index.md`:
  - Add customer testimonials and reviews
  - Focus on executive-level testimonials (CEOs, CIOs)
  - Include metrics and outcomes where possible
- [ ] Update `src/content/integrations/-index.md`:
  - List key integrations: Slack, Teams, Email, Calendar
  - Enterprise integrations: CRM, ERP systems
  - API and custom integrations

### 2.9 Content Quality Assurance
- [ ] Review all updated content for:
  - Brand voice consistency
  - SEO optimization (title tags, meta descriptions)
  - Internal linking opportunities
  - Call-to-action effectiveness
  - Mobile readability

## Content Sources
- Use content from `docs/product-overview.md`
- Use messaging framework from `docs/context/messaging-framework.md`
- Use positioning from `docs/context/positioning-canvas.md`
- Existing Kowalah website (www.kowalah.com) for reference

## Completion Criteria
- [ ] All static pages reflect Kowalah brand and messaging
- [ ] Pricing tiers accurately represent Kowalah pricing model
- [ ] Company story and team information is current
- [ ] FAQs address common Kowalah-specific questions
- [ ] Legal pages are compliant and current
- [ ] All pages have proper SEO meta tags

## Dependencies
- Kowalah brand messaging guidelines
- Current pricing information
- Team photos and bios
- Customer testimonials and case studies
- Legal documents (privacy policy, terms)

## Estimated Time
4-5 days

## Next Phase
Proceed to new page development for Product and Solutions sections