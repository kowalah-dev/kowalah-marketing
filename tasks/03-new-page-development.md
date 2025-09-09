# Phase 3: New Page Development

## Overview
Create new pages and content collections for Kowalah-specific sections that don't exist in the base theme.

## Tasks

### 3.1 Product Section Pages
Create new content collection for the 4 core Kowalah product features, replacing the current navigation structure that incorrectly lists AI leadership capabilities as separate products.

#### 3.1.1 Update Navigation Structure First
- [ ] Update `src/config/menu.json` Product dropdown to reflect 4 core features:
  - Platform Overview → /product
  - Digital Chief AI Officer → /product/digital-caio
  - Expert Requests → /product/expert-requests
  - Kowalah Accelerators → /product/accelerators
  - AI Projects → /product/projects

#### 3.1.2 Create Product Collection Schema
- [ ] Add new `productCollection` to `src/content.config.ts`:
```typescript
const productCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/product" }),
  schema: z.object({
    title: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    hero: z.object({ 
      title: z.string().optional(), 
      content: z.string(),
      image: z.string().optional()
    }),
    features: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string(),
        benefits: z.array(z.string())
      })
    ).optional(),
    capabilities: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string(),
        details: z.array(z.string())
      })
    ).optional(),
    use_cases: z.array(
      z.object({
        title: z.string(),
        scenario: z.string(),
        solution: z.string(),
        outcome: z.string()
      })
    ).optional(),
    cta: z.object({
      title: z.string(),
      content: z.string(),
      button: z.object({
        enable: z.boolean(),
        label: z.string(),
        link: z.string()
      })
    }).optional()
  }),
});
```

#### 3.1.3 Create Product Pages (4 Core Features)
- [ ] **Platform Overview** (`src/content/product/-index.md`):
  - Hero: "Complete Digital Chief AI Officer Platform"
  - Overview of 4 core product features
  - Integration and collaboration capabilities
  - CTA to detailed feature pages

- [ ] **Digital Chief AI Officer** (`src/content/product/digital-caio.md`):
  - 24/7 AI executive guidance and strategic support
  - The 7 AI leadership capabilities as subsections:
    1. AI Strategy & Vision
    2. C-Suite Collaboration
    3. AI Governance & Risk Management
    4. Talent & Capability Building
    5. AI Implementation & Performance
    6. App & Prompt Development
    7. Change Management
  - Chat interface and task assignment
  - Use cases: Strategic planning, board prep, vendor evaluation

- [ ] **Expert Requests** (`src/content/product/expert-requests.md`):
  - Human expert delivery model (not just AI)
  - Types of requests: prompts, GPTs, web apps, training sessions
  - Quota system by pricing tier (12, 24, 36+ per quarter)
  - Turnaround times and quality standards
  - Use cases: Prompt engineering, custom GPT development, team training

- [ ] **Kowalah Accelerators** (`src/content/product/accelerators.md`):
  - Pre-built GPTs and prompt libraries
  - Industry-specific accelerators (finance, healthcare, manufacturing)
  - Role-based tools (CEO, CIO, HR, etc.)
  - Implementation templates and frameworks
  - Use cases: Rapid deployment, proven patterns, best practices

- [ ] **AI Projects** (`src/content/product/projects.md`):
  - Team collaboration and project management features
  - Multi-stakeholder coordination tools
  - Progress tracking and milestone management
  - Initiative planning and resource allocation
  - Use cases: AI rollouts, transformation programs, pilot scaling

#### 3.1.4 Create Product Page Components
- [ ] Create `src/pages/product/[slug].astro` for dynamic product pages
- [ ] Create `src/components/product/ProductHero.astro`
- [ ] Create `src/components/product/FeatureGrid.astro`
- [ ] Create `src/components/product/UseCases.astro`

### 3.2 Solutions Section Pages

#### 3.2.1 Create Solutions Collection Schema
- [ ] Add new `solutionsCollection` to `src/content.config.ts`:
```typescript
const solutionsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/solutions" }),
  schema: z.object({
    title: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    type: z.enum(["industry", "role"]),
    hero: z.object({ 
      title: z.string().optional(), 
      content: z.string(),
      image: z.string().optional()
    }),
    challenges: z.array(
      z.object({
        title: z.string(),
        description: z.string()
      })
    ).optional(),
    solutions: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        benefits: z.array(z.string())
      })
    ).optional(),
    success_metrics: z.array(z.string()).optional(),
    case_study: z.object({
      title: z.string(),
      company: z.string(),
      results: z.array(z.string())
    }).optional()
  }),
});
```

#### 3.2.2 Create Industry Solutions Pages
- [ ] **Solutions Hub** (`src/content/solutions/-index.md`):
  - Overview of industry and role-based solutions
  - Solution finder/navigator
  - Featured case studies

- [ ] **Manufacturing** (`src/content/solutions/manufacturing.md`):
  - Industry challenges: Predictive maintenance, quality control
  - AI solutions for manufacturing processes
  - Case studies and ROI examples

- [ ] **Retail & E-commerce** (`src/content/solutions/retail.md`):
  - Personalization, inventory management
  - Customer service automation
  - Revenue optimization use cases

- [ ] **Financial Services** (`src/content/solutions/finance.md`):
  - Risk assessment, fraud detection
  - Regulatory compliance
  - Customer analytics and insights

- [ ] **Healthcare** (`src/content/solutions/healthcare.md`):
  - Patient care optimization
  - Administrative efficiency
  - Compliance and data security

- [ ] **Professional Services** (`src/content/solutions/professional-services.md`):
  - Document automation
  - Client analytics
  - Proposal generation and optimization

#### 3.2.3 Create Role-Based Solutions Pages
- [ ] **For CEOs** (`src/content/solutions/ceos.md`):
  - Strategic AI leadership
  - Board reporting and communication
  - Competitive positioning
  - Change management at scale

- [ ] **For CIOs** (`src/content/solutions/cios.md`):
  - Technology evaluation and procurement
  - Integration planning
  - Team enablement
  - Security and governance

- [ ] **For CFOs** (`src/content/solutions/cfos.md`):
  - ROI measurement and tracking
  - Budget planning for AI initiatives
  - Financial risk assessment
  - Cost optimization strategies

#### 3.2.4 Create Solutions Page Components
- [ ] Create `src/pages/solutions/[slug].astro`
- [ ] Create `src/components/solutions/SolutionsHero.astro`
- [ ] Create `src/components/solutions/ChallengesSolutions.astro`
- [ ] Create `src/components/solutions/IndustryGrid.astro`
- [ ] Create `src/components/solutions/RoleGrid.astro`

### 3.3 Resource Center Enhancement

#### 3.3.1 Create Resources Collection Schema
- [ ] Add new `resourcesCollection` to `src/content.config.ts`:
```typescript
const resourcesCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/resources" }),
  schema: z.object({
    title: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    type: z.enum(["template", "guide", "tool", "openai"]),
    hero: z.object({ 
      title: z.string().optional(), 
      content: z.string(),
      image: z.string().optional()
    }),
    download: z.object({
      enable: z.boolean(),
      file: z.string().optional(),
      format: z.string().optional()
    }).optional(),
    external_links: z.array(
      z.object({
        title: z.string(),
        url: z.string(),
        description: z.string()
      })
    ).optional()
  }),
});
```

#### 3.3.2 Templates & Tools Section
- [ ] Create downloadable resources section:
  - AI Strategy Templates
  - ROI Calculator
  - Vendor Evaluation Checklists
  - Implementation Frameworks

#### 3.3.3 OpenAI Resource Pages (Under Resources Navigation)
- [ ] **OpenAI Overview** (`src/content/resources/openai-overview.md`):
  - Kowalah's OpenAI expertise and specialization
  - Service offerings specific to OpenAI deployment

- [ ] **OpenAI License Guide** (`src/content/resources/openai-licensing.md`):
  - Team vs Enterprise vs API comparison
  - Cost optimization strategies
  - Decision framework

- [ ] **OpenAI Implementation Roadmap** (`src/content/resources/openai-implementation.md`):
  - Typical project phases and timelines
  - Best practices and pitfalls
  - Success metrics

- [ ] **OpenAI Security & Governance** (`src/content/resources/openai-security.md`):
  - OpenAI-specific compliance considerations
  - Data governance frameworks
  - Security best practices

#### 3.3.4 Documentation Hub
- [ ] Create links to external documentation (docs.kowalah.com)
- [ ] Best practices guides
- [ ] Implementation guides

### 3.4 Page Template Development
- [ ] Create consistent page templates for all new sections
- [ ] Ensure mobile responsiveness
- [ ] Implement proper SEO structure
- [ ] Add internal linking strategy
- [ ] Create consistent CTA patterns

## Completion Criteria
- [ ] All Product capability pages are created and functional
- [ ] Solutions pages for all industries and roles are complete
- [ ] Resource Center with OpenAI guidance and downloadable tools
- [ ] All pages follow consistent design patterns
- [ ] Navigation works seamlessly between sections
- [ ] SEO meta tags are properly configured
- [ ] Mobile experience is optimized

## Dependencies
- Detailed content for each capability and solution
- Industry expertise and use cases
- Customer case studies and testimonials
- Design assets for new sections

## Estimated Time
5-7 days

## Next Phase
Proceed to Sanity integration for dynamic content