# Page Design Guide

Reference for Phase 1: Creating Webpage Design Documents

## Content Architecture Decision Framework

### Pattern 1: Static Pages with Markdown Content Files
**When to Use:**
- ✅ Single, unique pages (product overviews, company pages, landing pages)
- ✅ Content that doesn't share a schema with other pages
- ✅ Pages where each one has unique sections and requirements

**Implementation:**
- File Location: `src/content/[category]/[page-name].md`
- Page Creation: `src/pages/[category]/[page-name].astro` (static)
- Content Access: Custom `getMarkdownData()` utility
- Schema Validation: None (flexible frontmatter structure)

### Pattern 2: Collections for Similar Content Types
**When to Use:**
- ✅ Multiple content items sharing the same schema
- ✅ Need dynamic routing with `[slug].astro`
- ✅ Content that benefits from consistent structure

**Implementation:**
- File Location: `src/content/[collection]/[item-name].md`
- Collection Definition: Must be defined in `src/content.config.ts`
- Page Creation: `src/pages/[collection]/[slug].astro` (dynamic)
- Content Access: Astro's `getCollection()` and `getEntry()`
- Schema Validation: Strict Zod validation

### Pattern 3: Sanity CMS (For Dynamic Content)
**When to Use:**
- ✅ Content updates frequently (weekly/monthly)
- ✅ Rich media management is needed
- ✅ Multiple editors need access

## Clarifying Questions

Key areas to explore before creating design document:
- **Page Objective:** Primary goal and visitor actions
- **Target Audience:** Primary audience, pain points, needs
- **Key Messages:** 2-3 most important messages
- **Content Requirements:** Specific content elements needed
- **Page Architecture:** Flow and component sequence
- **User Journey:** Entry points, key actions, exit points
- **SEO Focus:** Primary keywords and search terms
- **CTAs:** Primary and secondary calls-to-action
- **Trust Elements:** Proof points, testimonials, credentials

## Design Document Structure

1. **Page Overview** - Name, URL, strategy, objective, audience, journey position
2. **Content Architecture Decision** - Rationale for pattern chosen
3. **Key Messages** - Value proposition, supporting messages, differentiators
4. **Page Structure & Components** - Sections, theme components, schema fields
5. **Content Requirements by Section** - Purpose, type, elements, scope
6. **SEO Requirements** - Keywords, meta tags, headings, structured data
7. **User Experience Flow** - Entry points, key actions, exit points
8. **Calls-to-Action** - Primary and secondary CTAs
9. **Trust & Social Proof** - Testimonials, certifications, statistics
10. **Technical Implementation** - Schema updates, component modifications
11. **Content Creation Notes** - Tone, format, media requirements

## Available Astro Content Collections

### Current Collections (from `src/content.config.ts`)

**1. homepage** - Homepage content structure
- Hero with title, content, image, buttons, customer logos
- Feature sections with badge, content, description, images
- Transformation (before/after organizational and individual)
- Program depth categories
- Offerings with points and images
- Benefits with points
- Service components with multi-currency pricing

**2. solutions** - Industry and role-based solution pages
- Solution type: "role" or "industry"
- Solution category: "ceos", "cios", "manufacturing", "healthcare", etc.
- Hero with title, content, image, background_image, buttons
- Challenges section with items (title, description, icon, category)
- Solution with title, content, image, points
- Benefits with title, subtitle, points (with optional metrics)
- Social proof: testimonials and case studies
- Implementation with approach ("executive", "industry", "technical") and steps
- Optional: regulatory (for industries), executive_focus (for roles), services_highlight
- CTA with title, content, optional background_image, button

**3. company** - About, team, careers, values
- Hero, about section with stats and trusted partners
- Story section with subtitle, content, image
- Slider (array of strings)
- Why section with badge, reason, content, points
- Optional mission section
- Optional job listings section
- FAQ section

**4. pricing** - Pricing tiers and comparison
- Hero with title, content, optional background_image
- Service components with multi-currency pricing (USD, EUR, GBP)
- Investment examples by organization size
- ROI reality check section
- Decision guide with scenarios
- Compare section with plans and features
- FAQ section

**5. insights** - Blog posts and articles
- Title, meta_title, description
- Date, image, categories, author
- Optional hero section
- Draft flag

**6. case** - Case studies
- Title, meta_title, description
- Date, image, stats array
- Optional hero section
- Draft flag

**7. contact** - Contact forms and information
- Info object with title, content, contacts array
- Each contact has title, icon, details_1, details_2

**8. faq** - Frequently asked questions
- Title, meta_title, description
- FAQs array with question and answer

**9. pages** - General pages (legal, terms, etc.)
- Title, meta_title, description
- Update date, draft flag

**10. integrations** - Integration pages
- Integrations array with name, subtitle, logo, type, button

**11. reviews** - Customer reviews
- Reviews array with name, designation, avatar, company, review

**12. career** - Career opportunities
- Hero, about section with stats
- Slider with review objects
- Each slider item has name, designation, avatar, company, review, stats

**13. sections** - Reusable page sections
- Enable flag, title, subtitle
- Optional testimonials or reviews arrays
- Optional image, description, button

**14. webinars** - Wednesday Webinars schedule
- Webinars array with id, title, date, displayDate, time
- Status ("upcoming" or "completed")
- Registration/recording links, description, topics, structure

**15. changelog** - Product updates and changes
- Title, meta_title, description, content

### Site Menu Structure (from `src/config/menu.json`)

**Main Navigation:**
1. **Services** (dropdown)
   - Services Overview → `/services`
   - ChatGPT Enterprise Deployment → `/services/chatgpt-enterprise-deployment`
   - ChatGPT Change Enablement → `/services/chatgpt-change-enablement`
   - ChatGPT Training → `/services/chatgpt-training`
   - Expert Requests → `/services/expert-requests`
   - AI Accelerators → `/services/accelerators`
   - AI Advisory Platform → `/services/ai-advisory-platform`
   - Services FAQ → `/services/faq`

2. **Solutions** (dropdown)
   - For CEOs → `/solutions/for-ceos`
   - For CIOs → `/solutions/for-cios`

3. **Resources** (dropdown)
   - Blog & Insights → `/insights`
   - Videos → `/resources/videos`
   - Wednesday Webinars → `/resources/wednesday-webinars`
   - Recommended Books → `/resources/recommended-books`
   - Documentation → `https://docs.kowalah.com` (external)

4. **Pricing** → `/pricing`

5. **Company** → `/company`

**Footer Navigation:**
- NAVIGATION: Services, Solutions, Pricing
- RESOURCES: Insights, Videos, Wednesday Webinars, Recommended Books, Documentation
- COMPANY: About Us, Contact, Terms & Conditions, Privacy Policy

### Common Schema Patterns

**Hero Pattern** (used in solutions, company, pricing, career):
```yaml
hero:
  title: "Page title"
  content: "Subtitle or description"
  image: "/images/..."
  background_image: "/images/..." # optional
  button:
    - enable: true
      label: "CTA Text"
      link: "/destination"
```

**Benefits Pattern** (used in homepage, solutions):
```yaml
benefits:
  title: "Section title"
  subtitle: "Section subtitle"
  points:
    - title: "Benefit title"
      content: "Benefit description"
      image: "/images/..."
      metric: "Optional metric" # for solutions
```

**Multi-Currency Pricing Pattern** (pricing, homepage service components):
```yaml
pricing:
  USD:
    prefix: "$"
    amount: "1,000"
    suffix: "/month"
    detail: "per user"
  EUR:
    prefix: "€"
    amount: "900"
    suffix: "/mois"
    detail: "par utilisateur"
  GBP:
    prefix: "£"
    amount: "800"
    suffix: "/month"
    detail: "per user"
```

**Social Proof Pattern** (solutions):
```yaml
social_proof:
  testimonials:
    - name: "Executive Name"
      title: "Title"
      company: "Company"
      industry: "Industry"
      quote: "Testimonial text"
      image: "/images/..."
      proof_type: "role_peer" # or "industry_peer", "case_study"
  case_studies: # optional array
    - title: "Case Study Title"
      company: "Company"
      challenge: "Challenge description"
      solution: "Solution description"
      results: ["Result 1", "Result 2"]
```

### Available Theme Components

From SyncMaster theme:
- **Hero sections** - Various styles with backgrounds, images, CTAs
- **Feature grids** - 2, 3, or 4 column layouts
- **Benefits sections** - Image + content layouts
- **Pricing tables** - Tiered pricing with feature comparisons
- **Testimonials** - Slider and grid layouts
- **CTAs** - Gradient backgrounds, image backgrounds
- **FAQ accordions** - Expandable Q&A sections
- **Contact forms** - Lead generation forms
- **Stats counters** - Animated number displays
- **Partner logos** - Trusted by sections
- **Video embeds** - YouTube integration

## Context Files to Reference

- `/docs/product-overview.md` - Product details, ICP, personas
- `/docs/context/positioning-canvas.md` - Brand positioning
- `/docs/context/messaging-framework.md` - MKT1 messaging
- `src/content.config.ts` - Existing schemas
- `src/content/homepage/-index.md` - Reference content structure

## Output

Save as: `tasks/page-design-[page-name].md`
