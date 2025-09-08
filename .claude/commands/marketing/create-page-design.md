---
description: Guides Claude to create a detailed webpage design document for Kowalah marketing website pages using Astro Content Collections and selective Sanity integration.
---
# Command: Creating a Webpage Design Document (Astro + Sanity Hybrid)

## Goal

To guide an AI assistant in creating a detailed Webpage Design Document in Markdown format for Kowalah marketing website pages. The document should capture the page's objectives, target audience, content requirements, and design considerations using our hybrid approach of Astro Content Collections for static pages and Sanity for dynamic content.

## Hybrid Content Strategy

**Astro Content Collections (Static Pages):**
- Homepage, Product pages, Solutions, Pricing, Company, Legal
- Leverages existing SyncMaster theme components
- Version-controlled content with type-safe schemas
- Optimal for SEO and performance

**Sanity CMS (Dynamic Content):**
- Blog posts, Case studies, Team members, Press releases
- Easy updates without deployments
- Rich media management

## Process

1. **Receive Initial Request:** The user provides a brief description of the webpage they want to create.
2. **Ask Clarifying Questions:** Before writing the document, the AI *must* ask clarifying questions to understand the page's purpose, audience, content needs, and preferred page architecture.
3. **Determine Content Strategy:** Identify whether this should be an Astro Collection page (static) or Sanity-powered page (dynamic).
4. **Discover Available Components:** Use the Read tool to examine existing Astro Content Collections in `src/content.config.ts` and available theme components.
5. **Design Page Architecture:** Select appropriate content structure and components based on user needs and best practices.
6. **Generate Webpage Design Document:** Based on the initial request, user answers, and architecture decisions, generate a comprehensive webpage design document.
7. **Save Document:** Save the generated document as `page-[page-name].md` inside the `/tasks/` directory.

## Available Astro Content Collections & Components

**Existing Collections (from SyncMaster theme):**
- `homepage` - Hero, features, offerings, benefits, pricing plans
- `features` - Feature showcase with grids and detailed sections  
- `pricing` - Pricing tiers with comparison tables
- `company` - About, team, careers, values
- `contact` - Contact forms and information
- `faq` - Frequently asked questions
- `pages` - General pages (legal, terms, etc.)

**New Collections to Create:**
- `product` - AI capability pages (Strategy, Implementation, Governance, etc.)
- `solutions` - Industry and role-based solution pages
- `openai` - OpenAI-specific content and guidance

**Available Theme Components:**
- Hero sections (various styles)
- Feature grids and showcases
- Benefits and value proposition sections
- Pricing tables and comparisons
- Testimonials and social proof
- Call-to-action blocks
- FAQ accordions
- Contact forms

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
   - Content strategy (Astro Collection vs Sanity)
   - Primary objective
   - Target audience description
   - Position in user journey

2. **Content Architecture Decision**
   - Rationale for Astro Collection or Sanity approach
   - Collection type (if Astro) or content type (if Sanity)
   - Schema considerations and customizations needed

3. **Key Messages**
   - Primary value proposition
   - 2-3 supporting messages
   - Competitive differentiators
   - Messaging framework alignment

4. **Page Structure & Components**
   - Content sections in order of appearance
   - Theme components to leverage
   - Custom components needed
   - Content schema fields required
   - Mobile/responsive considerations

5. **Content Requirements by Section**
   - For each page section, specify:
     - Section purpose and key message
     - Content type (text, images, data)
     - Required content elements
     - Approximate content length/scope
     - Schema field mapping

6. **SEO Requirements**
   - Primary keywords
   - Meta title and description
   - H1 and key headings structure
   - Structured data needs

7. **User Experience Flow**
   - Entry points (how users arrive)
   - Key actions on page
   - Exit points (where users should go next)
   - Navigation integration

8. **Calls-to-Action**
   - Primary CTA (text, placement, destination)
   - Secondary CTAs
   - Micro-conversions to track

9. **Trust & Social Proof**
   - Testimonials/case studies needed
   - Certifications/badges
   - Statistics or proof points
   - Integration with dynamic content (if applicable)

10. **Technical Implementation**
    - Astro Collection schema updates needed
    - Component modifications required
    - Performance considerations
    - Integration requirements

11. **Content Creation Notes**
    - Tone and voice guidelines
    - Content collection format
    - Image/media requirements
    - Schema validation requirements

## Context Files to Reference

The AI should reference these files when available:
- `/docs/product-overview.md` - For comprehensive product details, ICP, personas, and competitive positioning
- `/docs/context/positioning-canvas.md` - For brand positioning and messaging
- `/docs/context/messaging-framework.md` - For MKT1 messaging building blocks and persona-specific content
- `/docs/context/website-structure.md` - For site architecture and navigation
- `src/content.config.ts` - For existing Astro Collection schemas and structure
- `src/content/homepage/-index.md` - For reference homepage content structure

## Output

* **Format:** Markdown (`.md`)
* **Location:** `/tasks/` (for project planning) or `/docs/` (for reference)
* **Filename:** `page-design-[page-name].md` (e.g., `page-design-pricing.md`, `page-design-ai-strategy.md`)

## Final Instructions

1. **Always start by examining existing Astro Collections** using the Read tool to check `src/content.config.ts` and understand current schema structure
2. **Ask clarifying questions** before creating the document, including content strategy preferences (Astro vs Sanity)
3. **Determine content approach**: Decide whether page should use Astro Collections (static) or Sanity (dynamic) based on update frequency and content type
4. **Reference context files** for accurate product details, messaging, and brand guidelines
5. **Use existing theme components** where possible rather than custom development
6. **Map content to schema fields** - align content requirements with Astro Collection schemas or propose schema modifications
7. **Focus on hybrid architecture** - leverage Astro Collections for performance while identifying any dynamic content needs
8. **Consider mobile-first** responsive design in component selection
9. **Align with Kowalah messaging** using the established framework and positioning
10. **Plan for scalability** - consider how page fits into overall site architecture
11. **Include technical considerations** - schema updates, component modifications, integration needs
12. **Specify performance requirements** - ensure approach supports Lighthouse >90 goals
13. **Plan for SEO optimization** - meta tags, structured data, keyword integration
14. **Consider user journey** - how page fits into conversion funnel
15. **Do NOT create actual content** - focus on design and architecture planning only

## Content Strategy Decision Tree

**Use Astro Collections when:**
- Content changes infrequently (quarterly or less)
- SEO performance is critical
- Content is primarily text-based
- Version control is important
- Examples: Product pages, Pricing, Company info

**Use Sanity when:**
- Content updates frequently (weekly/monthly)
- Rich media management is needed
- Multiple editors need access
- Content has complex relationships
- Examples: Blog posts, Case studies, Team profiles, Press releases