---
description: Guides Claude to create a detailed webpage design document for marketing website pages based on user requirements.
---
# Command: Creating a Webpage Design Document

## Goal

To guide an AI assistant in creating a detailed Webpage Design Document in Markdown format for marketing website pages. The document should capture the page's objectives, target audience, content requirements, and design considerations to guide both content creation and development.

## Process


1. **Receive Initial Request:** The user provides a brief description of the webpage they want to create.
2. **Ask Clarifying Questions:** Before writing the document, the AI *must* ask clarifying questions to understand the page's purpose, audience, content needs, and preferred page architecture.
3. **Discover Available Blocks:** Use the LS tool to read `/sanity/kowalah/schemaTypes/blocks/` directory to see current available Sanity block types.
4. **Design Page Architecture:** Select appropriate Sanity blocks and define their sequence based on user needs and best practices.
5. **Generate Webpage Design Document:** Based on the initial request, user answers, and block architecture, generate a comprehensive webpage design document using the structure outlined below.
6. **Save Document:** Save the generated document as `page-[page-name].md` inside the `/marketing/webpage-descriptions/` directory.

## Available Sanity Block Types & Usage Guide

**Hero Sections:**
- `primaryHero` - Main page headers with strong call-to-action for homepage, product pages, landing pages. Use for high-impact openings.
- `simpleHero` - Simplified hero variant for secondary pages or content-focused layouts.
- `headerSection` - Section headers and introductory content for mid-page divisions.

**Content & Features:**
- `featureGrid` - Showcase capabilities, services, or benefits in a grid layout. Perfect for 3-6 key features.
- `featureSection` - Single feature showcase with text content and image in alternating layouts. Use for detailed explanations.
- `contentSection` - General content blocks with text and media for flexible content needs.
- `twoColumnContent` - Two-column layout sections for comparisons or structured content.
- `richContent` - Flexible rich text content blocks for detailed text content.

**Social Proof & Trust:**
- `testimonialSection` - Customer testimonials and quotes to build credibility.
- `clientLogoGrid` - Customer/partner logo displays for brand association.
- `statsBlock` - Highlight key metrics and achievements - company stats, client results, industry impact.
- `teamSection` - Team member profiles for building personal connections.

**Modern Layouts:**
- `bentoGrid` - Modern grid layout for features/benefits with visual appeal.

**Conversion & Engagement:**
- `ctaBlock` - Drive specific user actions throughout pages to guide user journey.
- `pricingSection` - Pricing tables and plans for conversion-focused pages.
- `faqSection` - Frequently asked questions to address objections.
- `contactSection` - Contact forms and information for lead generation.
- `newsletterSection` - Email signup and newsletters for ongoing engagement.

## Clarifying Questions (Examples)

The AI should adapt its questions based on the request, but here are key areas to explore:

* **Page Objective:** "What is the primary goal of this page? What action do you want visitors to take?"
* **Target Audience:** "Who is the primary audience for this page? What are their pain points or needs?"
* **Key Messages:** "What are the 2-3 most important messages this page should communicate?"
* **Content Requirements:** "What specific content elements do you need? Reference the available Sanity blocks above."
* **Page Architecture:** "How should the page flow? Which blocks would work best in sequence?"
* **User Journey:** "Where are visitors coming from? Where should they go next?"
* **SEO Focus:** "What are the primary keywords or search terms for this page?"
* **Competitive Positioning:** "How should this page differentiate from competitors?"
* **Call-to-Actions (CTAs):** "What are the primary and secondary CTAs for this page?"
* **Trust Elements:** "What proof points, testimonials, or credentials should be included?"
* **Visual Style:** "Are there any specific visual requirements or brand guidelines to follow?"

## Webpage Design Document Structure

The generated document should include the following sections:

1. **Page Overview**
   - Page name and URL path
   - Primary objective
   - Target audience description
   - Position in user journey

2. **Key Messages**
   - Primary value proposition
   - 2-3 supporting messages
   - Competitive differentiators

3. **Page Architecture**
   - Recommended sequence of Sanity blocks (e.g., primaryHero → featureGrid → 3x featureSection → statsBlock → testimonialSection → ctaBlock)
   - Flow and transitions between sections
   - Mobile/responsive considerations for block order
   - Visual hierarchy and user attention flow

4. **Block-by-Block Content Requirements**
   - For each selected Sanity block, specify:
     - Block type and purpose
     - Key message for this section
     - Required content elements
     - Approximate content length/scope
     - Integration with surrounding blocks

5. **SEO Requirements**
   - Primary keywords
   - Meta title and description
   - H1 and key headings structure

6. **User Experience Flow**
   - Entry points (how users arrive)
   - Key actions on page
   - Exit points (where users should go next)

7. **Calls-to-Action**
   - Primary CTA (text, placement, destination)
   - Secondary CTAs
   - Micro-conversions to track

8. **Trust & Social Proof**
   - Testimonials/case studies needed
   - Certifications/badges
   - Statistics or proof points

9. **Technical Considerations**
   - Required integrations (forms, analytics, etc.)
   - Performance requirements
   - Mobile considerations

10. **Success Metrics**
   - How success will be measured
   - Key performance indicators

11. **Content Creation Notes**
    - Tone and voice guidelines
    - Any specific copy requirements
    - Image/media requirements

## Context Files to Reference

The AI should reference these files when available:
- `/docs/product-overview.md` - For comprehensive product details, ICP, personas, and competitive positioning
- `/marketing/context/positioning-canvas.md` - For brand positioning and messaging
- `/marketing/context/messaging-framework.md` - For MKT1 messaging building blocks and persona-specific content
- `/marketing/context/brand-guidelines.md` - For brand voice, writing standards, and tone guidelines
- `/marketing/context/website-structure.md` - For site architecture and navigation
- Any existing brand or style guides in `/marketing/context/`

## Output

* **Format:** Markdown (`.md`)
* **Location:** `/marketing/webpage-descriptions/`
* **Filename:** `page-[page-name].md` (e.g., `page-pricing.md`, `page-about-us.md`)

## Final Instructions

1. Always start by discovering available Sanity blocks using the LS tool to read `/sanity/kowalah/schemaTypes/blocks/`
2. Ask clarifying questions before creating the document, including architecture preferences
3. Reference `/docs/product-overview.md` for accurate product details, ICP, and competitive positioning
4. Reference existing marketing context files for consistency
5. Use `/marketing/context/messaging-framework.md` for persona-specific messaging and proven building blocks
6. Use `/marketing/context/brand-guidelines.md` for brand voice and content structure standards
7. **Design Page Architecture First** - Select appropriate Sanity blocks and define their sequence as a primary deliverable
8. Focus on business objectives and user needs, not implementation details
9. Ensure all content aligns with the brand positioning and MKT1 framework
10. Include specific content requirements mapped to selected Sanity blocks
11. Consider which messaging building blocks and use cases apply to the page
12. Specify revenue/growth benefits and Expert Requests integration per brand guidelines
13. Align page objectives with the ideal customer profile and personas from product overview
14. **Provide Block Selection Rationale** - Explain why specific blocks were chosen and how they work together
15. Do NOT start creating the actual page content - only the design document