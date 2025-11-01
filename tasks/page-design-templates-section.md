# Page Design Document: Templates Section

## 1. Page Overview

### Purpose
Create a Templates section within the Resources area that provides downloadable templates and guides to help enterprise buyers evaluate and implement ChatGPT Enterprise. This positions Kowalah as thought leaders in AI adoption while generating inbound leads from companies searching for practical implementation guidance.

### Target Audience
- **Primary:** CEOs and executives at mid-sized companies (1,000-10,000 employees) evaluating ChatGPT Enterprise
- **Secondary:** CIOs, IT Directors, CHROs responsible for AI implementation
- **Supporting:** AI governance leads, change management professionals, L&D teams

### Business Objectives
1. **Thought Leadership:** Establish Kowalah as experts in ChatGPT Enterprise rollout
2. **Lead Generation:** Provide value during evaluation phase (ungated initially)
3. **SEO Positioning:** Rank for searches like "ChatGPT Enterprise policy template", "CAIO job description"
4. **Social Amplification:** Create shareable resources for LinkedIn engagement
5. **Future Gating:** Build library for potential soft email capture later

### User Journey
1. **Discovery:** User finds template via search, LinkedIn share, or Resources menu
2. **Browse:** Lands on templates listing page, sees grid of available templates
3. **Evaluate:** Clicks template card, reads detail page about what's included
4. **Download:** Clicks download button, receives template (Google Docs or PDF)
5. **Engage:** Uses template, shares with colleagues, returns for more resources
6. **Convert:** (Future) Realizes need for expert guidance, contacts Kowalah

### Success Metrics (from Linear issue KOW-172)
- Download count per template
- Time on page for resources section
- LinkedIn shares and engagement
- Email capture rate (when soft gating implemented)
- Traffic to detail pages
- Conversion from template downloads to contact form

---

## 2. Content Architecture Decision

### Decision: **Astro Content Collection**

**Rationale:**
- ✅ **Scalability:** Easy to add new templates by creating markdown files
- ✅ **Consistency:** Each template follows same structure and schema
- ✅ **Type Safety:** Zod validation ensures all required fields present
- ✅ **Dynamic Routing:** Automatic `/resources/templates/[slug]` pages
- ✅ **Flexibility:** Mix of Google Docs links and PDF downloads supported
- ✅ **SEO:** Individual pages for each template = better search indexing

**Pattern to Follow:**
Similar to `solutions` and `insights` collections:
- Collection name: `templates`
- Base path: `src/content/templates/`
- URL pattern: `/resources/templates/[slug]`
- Listing page: `/resources/templates` (static page, reads collection)

**Why NOT Static Page:**
- Multiple templates (5 initially, more over time)
- Each needs own detail page with unique content
- Repetitive structure across all templates
- Would require duplicating page code for each template

**Why NOT Sanity CMS:**
- Simple content structure (no complex blocks)
- No need for non-technical editors (developers creating templates)
- Faster builds with local content
- No external CMS dependency for core resources

---

## 3. Key Messages & Value Propositions

### Overarching Message
*"Practical templates and guides to accelerate your ChatGPT Enterprise evaluation and rollout—created by AI adoption experts."*

### Template-Specific Value Props

**AI Policy Template:**
- "Establish governance framework before ChatGPT Enterprise rollout"
- "Customizable for financial services, manufacturing, professional services"
- "Covers data sharing, security, acceptable use, compliance"

**Chief AI Officer Job Description:**
- "Define the AI leadership role your organization needs"
- "Attract qualified CAIO candidates with clear expectations"
- "Align hiring with strategic AI transformation goals"

**ChatGPT Enterprise Evaluation Guide:**
- "Compare LLM platforms with structured decision framework"
- "Security and compliance checklist for enterprise buyers"
- "Calculate total cost of ownership and ROI"

**Deployment Checklist:**
- "Step-by-step roadmap from planning to production"
- "Technical setup, governance, change management in one place"
- "Track progress with actionable success metrics"

**AI Ambassador Program Template:**
- "Build internal AI champions to drive grassroots adoption"
- "Training program structure and ambassador responsibilities"
- "Measure program effectiveness and ambassador impact"

### Messaging Framework Alignment

From `/docs/context/messaging-framework.md`:
- **Strategic Tone:** Executive-appropriate, authoritative guidance
- **Benefit Focus:** Accelerate evaluation, reduce risk, ensure success
- **Expertise Positioning:** "Created by experts who've guided hundreds of implementations"
- **Action-Oriented:** Templates are actionable, not theoretical

---

## 4. Page Structure & Component Mapping

### Templates Listing Page: `/resources/templates`

**Component Structure:**

```astro
// src/pages/resources/templates.astro (or index.astro)

1. Hero Section
   - H1: "ChatGPT Enterprise Templates & Guides"
   - Subtitle: Value proposition + who templates help
   - Image: Hero showing templates/resources visual
   - Optional: Badge/tag indicating "Free Resources"

2. Introduction/Context Section
   - Brief explanation of why templates matter
   - Who they're designed for (1,000-10,000 employee companies)
   - How to use them (download, customize, implement)

3. Templates Grid
   - Read from templates collection
   - Display cards in 2-3 column grid
   - Each card shows:
     * Icon/thumbnail image
     * Template title
     * Short description (1-2 sentences)
     * Template type badge (Policy, Evaluation, Deployment, etc.)
     * Download format (Google Docs / PDF)
     * Button: "View Details" → links to detail page

4. How to Use Section
   - Steps: Browse → Download → Customize → Implement
   - Icons for each step
   - Brief guidance on adapting templates to organization

5. Social Proof (Optional)
   - Quote from executive who used templates
   - Or: "Join X companies who've downloaded our templates"

6. CTA Section
   - "Need expert guidance beyond templates?"
   - Button: "Talk to AI Adoption Experts"
   - Link to /contact or booking page
```

**Existing Components to Reuse:**
- Hero section pattern (like ServicesHero)
- Grid layout (similar to solutions cards)
- CTA section (standard pattern across site)

---

### Template Detail Page: `/resources/templates/[slug]`

**Component Structure:**

```astro
// src/pages/resources/templates/[slug].astro

1. Hero Section
   - Template title
   - Subtitle: Who it's for + key benefit
   - Template type badge
   - Preview image/icon

2. Template Overview
   - "What's Inside" section
   - Bulleted list of sections/content included
   - Who should use this template
   - When to use it (evaluation phase, pre-deployment, etc.)

3. Key Sections Preview
   - Show what the template covers
   - Example: "AI Policy Template includes:"
     * Acceptable Use Guidelines
     * Data Sharing & Privacy Rules
     * Security Requirements
     * Incident Response Procedures
     * Industry-Specific Compliance

4. Download Section
   - Prominent download button
   - Format indicator (Google Docs or PDF)
   - File size (if PDF)
   - Instructions: "Download, customize, implement"

5. How to Use This Template
   - Step-by-step guidance
   - Example: "1. Download template → 2. Review with legal/compliance → 3. Customize for industry → 4. Share with stakeholders"

6. Related Templates (Optional)
   - "You might also need:"
   - Cards for 2-3 related templates
   - Example: AI Policy → also show Deployment Checklist

7. Support CTA
   - "Need help implementing?"
   - Mention Kowalah's expertise
   - Button: "Talk to Experts" or "Learn About Services"

8. Social Sharing
   - LinkedIn, Twitter share buttons
   - "Share this resource with your network"
```

**SSR-Compatible Pattern:**
Following the pattern from `src/pages/solutions/[slug].astro`:

```typescript
export async function getStaticPaths() {
  const templates = await getCollection("templates");

  return templates.map((template) => ({
    params: { slug: template.id },
    props: { template }
  }));
}

const { slug } = Astro.params;
const { template } = Astro.props;

// SSR fallback
const templateEntry = template || await getEntry("templates", slug as string);

if (!templateEntry) {
  return Astro.redirect("/404");
}
```

---

## 5. Templates Collection Schema

### Zod Schema Definition

```typescript
const templatesCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/templates" }),
  schema: z.object({
    // Basic metadata
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string(),

    // Template categorization
    template_type: z.enum([
      "policy",
      "evaluation",
      "deployment",
      "job-description",
      "program-template"
    ]),
    category: z.string(), // "Governance", "Implementation", "Leadership"

    // Hero section
    hero: z.object({
      title: z.string(),
      subtitle: z.string(),
      image: z.string(),
      badge: z.string().optional() // "Free Template", "Expert Guide"
    }),

    // Template overview
    overview: z.object({
      who_its_for: z.string(),
      when_to_use: z.string(),
      key_benefit: z.string(),
      sections_included: z.array(z.string())
    }),

    // Download information
    download: z.object({
      type: z.enum(["google_docs", "pdf"]),
      url: z.string(), // Google Docs share link OR path to PDF
      file_size: z.string().optional(), // "2.5 MB" for PDFs
      format_notes: z.string().optional() // "Editable Google Doc" or "PDF Download"
    }),

    // How to use section
    how_to_use: z.object({
      title: z.string().optional(),
      steps: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          icon: z.string()
        })
      )
    }),

    // Template details
    details: z.object({
      title: z.string().optional(),
      description: z.string(),
      highlights: z.array(
        z.object({
          title: z.string(),
          content: z.string(),
          icon: z.string()
        })
      )
    }),

    // Related templates (for cross-linking)
    related_templates: z.array(z.string()).optional(), // Array of template slugs

    // CTA section
    cta: z.object({
      title: z.string(),
      content: z.string(),
      button: z.object({
        label: z.string(),
        link: z.string()
      })
    }),

    // Optional future email capture
    email_capture: z.object({
      enabled: z.boolean(),
      title: z.string().optional(),
      subtitle: z.string().optional(),
      button_label: z.string().optional()
    }).optional(),

    // Publishing
    draft: z.boolean().optional(),
    featured: z.boolean().optional() // Show on homepage/resources?
  })
});
```

### Field Explanations

- **template_type:** Enum for filtering/categorization on listing page
- **category:** Display label for grouping templates
- **download.type:** Determines whether to link to Google Docs or serve PDF
- **download.url:** Either Google Docs share link or `/downloads/template-name.pdf`
- **sections_included:** Bulleted list of what's in the template
- **how_to_use.steps:** Step-by-step implementation guidance
- **related_templates:** Slugs for cross-linking (e.g., `["deployment-checklist", "ai-policy"]`)
- **email_capture:** Future-proofing for soft gating feature

---

## 6. Content Requirements by Section

### Templates Listing Page Content

**Hero Section:**
- **Title:** "ChatGPT Enterprise Templates & Guides"
- **Subtitle:** "Practical resources to accelerate your AI evaluation and implementation—created by experts who've guided hundreds of enterprise rollouts."
- **Image:** Hero visual showing professional templates/documents with Kowalah branding

**Introduction:**
- **Content:** Brief paragraph explaining templates are designed for mid-sized enterprises (1,000-10,000 employees) evaluating ChatGPT Enterprise. Free, actionable, customizable for different industries.

**Templates Grid:**
- Auto-generated from collection (read all templates, display cards)
- Sort by: Featured first, then alphabetical or by category

**How to Use:**
- **Step 1:** Browse templates and select what you need
- **Step 2:** Download Google Doc or PDF
- **Step 3:** Customize for your organization and industry
- **Step 4:** Implement with your teams

**CTA:**
- **Title:** "Need Expert Guidance Beyond Templates?"
- **Content:** "Our AI adoption specialists help you navigate the full ChatGPT Enterprise journey—from evaluation to organization-wide rollout."
- **Button:** "Talk to an Expert" → /contact

---

### Individual Template Content (Per Template)

**Template 1: AI Policy Template**

- **Hero:**
  - Title: "AI Policy Template for ChatGPT Enterprise"
  - Subtitle: "Establish governance framework before rollout"
  - Badge: "Policy Template"

- **Overview:**
  - Who: CIOs, Legal, Compliance, Risk Management
  - When: Before ChatGPT Enterprise deployment
  - Benefit: "Create clear guidelines for acceptable use, data sharing, and compliance in under an hour"
  - Sections: Acceptable Use, Data Privacy, Security Requirements, Incident Response, Industry Compliance

- **Download:**
  - Type: Google Docs
  - URL: `[Google Docs share link]`
  - Notes: "Editable template—customize for your organization"

- **How to Use:**
  - Step 1: Review template with legal/compliance team
  - Step 2: Customize acceptable use for your industry
  - Step 3: Add organization-specific security requirements
  - Step 4: Share with stakeholders for feedback
  - Step 5: Publish and communicate to employees

- **Details:**
  - Highlight 1: Industry-specific sections for finance, healthcare, manufacturing
  - Highlight 2: Pre-written policy language saves weeks of drafting
  - Highlight 3: Covers GDPR, SOC 2, HIPAA considerations

**Template 2: Chief AI Officer Job Description**

- **Hero:**
  - Title: "Chief AI Officer Job Description Template"
  - Subtitle: "Define the AI leadership role your organization needs"
  - Badge: "Leadership Template"

- **Overview:**
  - Who: CEOs, Board Members, Talent Acquisition
  - When: Planning to hire AI leadership
  - Benefit: "Attract qualified CAIO candidates with clear role definition and success metrics"
  - Sections: Role Summary, Responsibilities, Success Metrics, Required Experience, Reporting Structure

- **Download:**
  - Type: Google Docs
  - URL: `[Google Docs share link]`
  - Notes: "Customizable for different org sizes and industries"

- **How to Use:**
  - Step 1: Review role responsibilities with executive team
  - Step 2: Adjust success metrics to organizational goals
  - Step 3: Customize experience requirements
  - Step 4: Share with recruiters and hiring managers
  - Step 5: Post to job boards and LinkedIn

- **Details:**
  - Highlight 1: Based on actual CAIO roles at successful AI adopters
  - Highlight 2: Includes KPIs for measuring CAIO effectiveness
  - Highlight 3: Addresses reporting structure and org alignment

**Template 3: ChatGPT Enterprise Evaluation Guide**

- **Hero:**
  - Title: "ChatGPT Enterprise Evaluation Guide"
  - Subtitle: "Structured framework for comparing LLM platforms"
  - Badge: "Evaluation Guide"

- **Overview:**
  - Who: CIOs, IT Directors, Procurement
  - When: Evaluating ChatGPT Enterprise vs. alternatives
  - Benefit: "Make informed platform decisions with security, compliance, and cost analysis"
  - Sections: Feature Comparison, Security Checklist, Cost-Benefit Analysis, Vendor Evaluation, Implementation Timeline

- **Download:**
  - Type: PDF
  - URL: `/downloads/chatgpt-enterprise-evaluation-guide.pdf`
  - File Size: "2.1 MB"
  - Notes: "Comprehensive 15-page evaluation framework"

- **How to Use:**
  - Step 1: Complete security and compliance checklist
  - Step 2: Compare features against requirements
  - Step 3: Calculate TCO for ChatGPT Enterprise
  - Step 4: Evaluate vendor support and SLAs
  - Step 5: Present findings to decision-makers

- **Details:**
  - Highlight 1: Side-by-side comparison with other enterprise LLMs
  - Highlight 2: Security audit questions for vendor evaluation
  - Highlight 3: ROI calculator for ChatGPT Enterprise investment

**Template 4: Deployment Checklist**

- **Hero:**
  - Title: "ChatGPT Enterprise Deployment Checklist"
  - Subtitle: "Step-by-step roadmap from planning to production"
  - Badge: "Deployment Guide"

- **Overview:**
  - Who: Implementation Teams, IT Directors, Change Management
  - When: After purchase decision, before rollout
  - Benefit: "Track every deployment phase with actionable tasks and success criteria"
  - Sections: Pre-Deployment, Technical Setup, Governance, Change Management, Success Metrics

- **Download:**
  - Type: Google Docs
  - URL: `[Google Docs share link]`
  - Notes: "Editable checklist with task assignments"

- **How to Use:**
  - Step 1: Review checklist with deployment team
  - Step 2: Assign tasks to responsible owners
  - Step 3: Complete pre-deployment activities
  - Step 4: Execute technical setup
  - Step 5: Monitor success metrics

- **Details:**
  - Highlight 1: 50+ tasks across deployment lifecycle
  - Highlight 2: Timeline estimates for each phase
  - Highlight 3: Risk mitigation strategies included

**Template 5: AI Ambassador Program Template**

- **Hero:**
  - Title: "AI Ambassador Program Template"
  - Subtitle: "Build internal champions to drive AI adoption"
  - Badge: "Program Template"

- **Overview:**
  - Who: CHROs, L&D Teams, Change Management
  - When: During or before ChatGPT Enterprise rollout
  - Benefit: "Create grassroots adoption with trained AI ambassadors across departments"
  - Sections: Ambassador Selection, Training Program, Responsibilities, Success Tracking, Recognition

- **Download:**
  - Type: Google Docs
  - URL: `[Google Docs share link]`
  - Notes: "Complete program structure and materials"

- **How to Use:**
  - Step 1: Identify ambassador criteria and recruit
  - Step 2: Customize training program for organization
  - Step 3: Define ambassador responsibilities
  - Step 4: Launch program with executive sponsorship
  - Step 5: Track impact and recognize ambassadors

- **Details:**
  - Highlight 1: Ambassador recruitment email templates
  - Highlight 2: Training session agendas and materials
  - Highlight 3: Impact tracking spreadsheet

---

## 7. SEO Strategy & Optimization

### Primary Keywords (by Template)

**AI Policy Template:**
- "ChatGPT Enterprise policy template"
- "AI acceptable use policy"
- "Generative AI governance template"
- "ChatGPT security policy"

**CAIO Job Description:**
- "Chief AI Officer job description"
- "CAIO responsibilities"
- "AI leadership role template"
- "Hire Chief AI Officer"

**Evaluation Guide:**
- "ChatGPT Enterprise evaluation"
- "LLM platform comparison"
- "Enterprise AI evaluation framework"
- "ChatGPT vs other LLMs"

**Deployment Checklist:**
- "ChatGPT Enterprise deployment"
- "AI implementation checklist"
- "Enterprise LLM rollout"
- "ChatGPT deployment guide"

**Ambassador Program:**
- "AI ambassador program"
- "ChatGPT adoption strategy"
- "Internal AI champions"
- "AI change management"

### Meta Descriptions

**Templates Listing Page:**
"Free templates and guides to accelerate ChatGPT Enterprise evaluation and deployment. Created by AI adoption experts for mid-sized enterprises."

**Individual Templates:**
Follow pattern: "[Template Name]: [Key Benefit]. Free [Google Doc/PDF] template for [Target Audience]. Download and customize for your organization."

### URL Structure

- Listing: `/resources/templates`
- Detail: `/resources/templates/[slug]`
  - `/resources/templates/ai-policy-template`
  - `/resources/templates/chief-ai-officer-job-description`
  - `/resources/templates/chatgpt-enterprise-evaluation-guide`
  - `/resources/templates/deployment-checklist`
  - `/resources/templates/ai-ambassador-program`

### Internal Linking

- Link from homepage Resources section
- Link from blog posts about ChatGPT Enterprise
- Cross-link between related templates
- Link from /contact CTA ("See our free templates")
- Link from Solutions pages (role/industry specific)

### Schema Markup

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "ChatGPT Enterprise Templates & Guides",
  "description": "Free templates for evaluating and implementing ChatGPT Enterprise",
  "publisher": {
    "@type": "Organization",
    "name": "Kowalah"
  }
}
```

For individual templates:
```json
{
  "@type": "DigitalDocument",
  "name": "AI Policy Template",
  "description": "Template for ChatGPT Enterprise acceptable use policy",
  "fileFormat": "application/vnd.google-apps.document"
}
```

---

## 8. User Experience & Interaction Design

### Templates Listing Page UX

**Navigation Path:**
1. Main nav → Resources dropdown → "Templates & Guides"
2. Or: Footer → Resources section → Templates
3. Or: Direct link from blog posts/LinkedIn shares

**Card Interaction:**
- Hover: Card elevates slightly, shadow increases
- Badge: Color-coded by category (Policy, Evaluation, etc.)
- Icon: Template type icon (document, checklist, guide)
- Description: 1-2 sentence summary
- Format indicator: Small badge showing "Google Docs" or "PDF"
- CTA: "View Details" button (not "Download" yet—detail page first)

**Filtering (Future):**
- Category filter: Policy, Evaluation, Deployment, Leadership, Program
- Format filter: Google Docs, PDF, All
- Search: Filter templates by keyword

**Mobile Optimization:**
- Single column card layout on mobile
- Large touch targets for buttons
- Simplified descriptions (truncated with "Read more")

---

### Template Detail Page UX

**Download Prominence:**
- Download button above the fold (in hero or immediately after)
- Sticky download button on scroll (mobile)
- Clear format indication ("Download Google Doc" vs "Download PDF")

**Content Hierarchy:**
1. What's in this template (sections included)
2. Who should use it and when
3. How to use it (steps)
4. Download button (repeated)
5. Template highlights/details
6. Related templates
7. Support CTA

**Call-to-Action Strategy:**
- Primary CTA: Download template
- Secondary CTA: Contact for expert help
- Tertiary CTA: View related templates

**Social Sharing:**
- Share buttons prominently placed (top right or bottom)
- Pre-populated LinkedIn post: "Just downloaded the [Template Name] from @Kowalah—great resource for ChatGPT Enterprise evaluation!"
- Track share counts (future)

**Breadcrumbs:**
- Home > Resources > Templates > [Template Name]
- Easy navigation back to listing

---

### Download Flow

**Current (Ungated):**
1. User clicks "Download" button
2. **Google Docs:** Opens in new tab (or prompts "Make a Copy")
3. **PDF:** Direct download (or opens in browser)
4. Success message: "Template downloaded! Check your downloads folder."

**Future Soft Gating (Optional):**
1. User clicks "Download" button
2. Modal appears: "Get this template via email (optional)"
3. Email field + checkbox: "Send me Kowalah AI insights (optional)"
4. User can:
   - Enter email → Receive template via email + download starts
   - Close modal → Download starts immediately (no email required)
5. Email capture integrates with HubSpot (like newsletter page)

---

### Accessibility

- **Alt Text:** Descriptive alt text for template preview images
- **Keyboard Navigation:** All download buttons and links keyboard accessible
- **Screen Readers:** Proper heading hierarchy (H1 → H2 → H3)
- **Color Contrast:** Template type badges meet WCAG AA standards
- **Focus States:** Clear focus indicators on interactive elements

---

## 9. Technical Implementation Notes

### File Structure

```
src/
  content/
    templates/
      ai-policy-template.md
      chief-ai-officer-job-description.md
      chatgpt-enterprise-evaluation-guide.md
      deployment-checklist.md
      ai-ambassador-program.md

  pages/
    resources/
      templates/
        index.astro           # Listing page
        [slug].astro          # Detail pages (dynamic)

public/
  downloads/
    chatgpt-enterprise-evaluation-guide.pdf
    [other PDF templates]

  images/
    templates/
      hero-templates.png
      ai-policy-preview.png
      caio-job-description-preview.png
      evaluation-guide-preview.png
      deployment-checklist-preview.png
      ambassador-program-preview.png
```

### Collection Integration

Add to `src/content.config.ts`:

```typescript
const templatesCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/templates" }),
  schema: z.object({
    // [Schema from Section 5]
  })
});

export const collections = {
  // ... existing collections
  templates: templatesCollection,
};
```

### Dynamic Routing

`src/pages/resources/templates/[slug].astro`:

```typescript
export async function getStaticPaths() {
  const templates = await getCollection("templates");

  return templates.map((template) => ({
    params: { slug: template.id },
    props: { template }
  }));
}

const { slug } = Astro.params;
const { template } = Astro.props;

// SSR fallback
const templateEntry = template || await getEntry("templates", slug as string);

if (!templateEntry) {
  return Astro.redirect("/404");
}
```

### Menu Integration

Update `src/config/menu.json`:

```json
{
  "name": "Resources",
  "hasChildren": true,
  "children": [
    {
      "name": "Blog & Insights",
      "url": "/insights"
    },
    {
      "name": "Templates & Guides",
      "url": "/resources/templates"
    },
    {
      "name": "Recommended Books",
      "url": "/resources/recommended-books"
    },
    {
      "name": "Newsletter",
      "url": "/resources/newsletter"
    },
    {
      "name": "Wednesday Webinars",
      "url": "/resources/wednesday-webinars"
    }
  ]
}
```

### Image Optimization

- **Hero Images:** 1200×600px (WebP format)
- **Template Previews:** 800×600px (card thumbnails)
- **Icons:** SVG from Heroicons (semantic names)
- **Template Type Badges:** CSS-based (no images)

### PDF Handling

- **Storage:** `/public/downloads/` directory
- **File Naming:** Kebab-case, descriptive (e.g., `chatgpt-enterprise-evaluation-guide.pdf`)
- **File Size:** Optimize PDFs (compress images, remove metadata)
- **MIME Type:** Ensure proper `application/pdf` header
- **Download Attribute:** Use `download` attribute on anchor tags

### Google Docs Integration

- **Share Links:** Set to "Anyone with the link can view"
- **Make a Copy:** Instruct users to File → Make a Copy
- **Permissions:** Ensure commenting disabled (view-only)
- **Branding:** Add Kowalah branding to header/footer of docs

---

## 10. Future Enhancements & Considerations

### Phase 2: Soft Email Gating

- **Implementation:** Modal with optional email capture before download
- **Integration:** HubSpot forms API (similar to newsletter page)
- **UX:** "Download now OR receive via email" choice
- **Tracking:** Conversion rate of email captures vs. direct downloads

### Phase 3: Template Categories & Filtering

- **Categories:** Group templates by type (Governance, Evaluation, Implementation)
- **Filters:** Filter listing page by category or format
- **Search:** Full-text search across template titles and descriptions
- **Tags:** Additional taxonomy for cross-cutting themes (Security, Compliance, Change Management)

### Phase 4: Social Proof & Analytics

- **Download Counts:** Display "X downloads" on template cards
- **Testimonials:** Quotes from executives who used templates
- **LinkedIn Integration:** Show recent shares or "Shared by X people"
- **Analytics Dashboard:** Track which templates drive most engagement

### Phase 5: Advanced Templates

- **Interactive Templates:** Notion-style templates or Airtable bases
- **Template Bundles:** "ChatGPT Enterprise Starter Pack" with multiple templates
- **Video Walkthroughs:** Screen recordings showing how to use templates
- **Template Updates:** Versioning system for template revisions

### Phase 6: Community Contributions

- **Template Submissions:** Allow customers to share their customized templates
- **Template Variants:** Industry-specific versions (e.g., "AI Policy for Healthcare")
- **User Reviews:** Ratings and reviews for templates
- **Template Marketplace:** Premium templates or custom creation service

---

## 11. Brand Alignment & Messaging

### Tone & Voice (from Messaging Framework)

- **Professional, not academic:** Templates are practical, not theoretical
- **Authoritative, not prescriptive:** Guide, don't dictate
- **Strategic, not tactical:** Focus on outcomes, not just tasks
- **Empowering, not overwhelming:** Build confidence, reduce complexity

### Kowalah Value Props Integration

- **Immediate Value:** Templates available instantly (vs. hiring consultants)
- **Expert-Created:** Built by AI adoption specialists with hundreds of implementations
- **Customizable:** Adapt to any industry or organization size
- **Actionable:** Not just theory—ready to implement today

### Competitive Positioning

**vs. Generic Templates:**
- Kowalah templates are ChatGPT Enterprise-specific
- Based on real-world implementations, not theory
- Include industry best practices and compliance considerations

**vs. Consulting Firms:**
- Free vs. expensive engagements
- Immediate vs. weeks of project scoping
- Self-serve vs. consultant dependency

**vs. Vendor Documentation:**
- Neutral, unbiased evaluation guidance
- Focuses on organizational readiness, not just product features
- Addresses change management and governance, not just technical setup

### Executive Messaging

**For CEOs:**
- "De-risk your ChatGPT Enterprise investment with proven templates"
- "Accelerate evaluation from months to weeks"
- "Build board confidence with structured governance"

**For CIOs:**
- "Technical and governance frameworks in one place"
- "Security checklist covers compliance requirements"
- "Implementation roadmap based on successful rollouts"

**For CHROs:**
- "Change management templates for workforce transformation"
- "Ambassador program structure drives grassroots adoption"
- "Training resources included"

---

## 12. Success Criteria & Validation

### Pre-Launch Validation

- ✅ All 5 templates created and tested (Google Docs or PDFs)
- ✅ Collection schema defined and validated
- ✅ Listing page displays all templates correctly
- ✅ Detail pages render with proper content hierarchy
- ✅ Download buttons work (Google Docs open, PDFs download)
- ✅ Menu navigation includes Templates link
- ✅ Mobile responsive design tested
- ✅ SEO meta tags and descriptions complete
- ✅ Internal linking from blog/solutions pages
- ✅ Social sharing buttons functional

### Post-Launch Metrics (First 30 Days)

**Engagement:**
- Page views on `/resources/templates`: Target 500+
- Detail page views per template: Target 50+ each
- Average time on page: Target 2+ minutes
- Bounce rate: Target <60%

**Downloads:**
- Total template downloads: Target 200+
- Most popular template identified
- Download-to-view ratio: Target >30%

**SEO:**
- Ranking for primary keywords (e.g., "ChatGPT Enterprise policy template")
- Organic search traffic to templates: Target 100+ sessions
- Backlinks from LinkedIn shares: Target 10+

**Conversions:**
- Contact form submissions referencing templates: Target 5+
- Template downloads → demo requests: Track conversion path
- LinkedIn shares and engagement: Target 50+ shares

### Long-Term Success Indicators

- Templates section becomes top 5 traffic driver
- Templates referenced in sales conversations
- Industry publications link to Kowalah templates
- Template downloads correlate with pipeline growth
- Organic search positions for target keywords (top 10)

---

## Implementation Priority

### Phase 1: MVP (Week 1-2)
1. Create templates collection schema
2. Build listing page (`/resources/templates`)
3. Build detail page template (`/resources/templates/[slug]`)
4. Create first 2 templates:
   - AI Policy Template (Google Docs)
   - ChatGPT Enterprise Evaluation Guide (PDF)
5. Add to menu navigation
6. Basic testing and QA

### Phase 2: Full Launch (Week 3)
1. Create remaining 3 templates:
   - Chief AI Officer Job Description
   - Deployment Checklist
   - AI Ambassador Program
2. Generate hero images and template previews
3. Add internal linking from blog/solutions
4. Set up analytics tracking
5. Launch social media campaign

### Phase 3: Optimization (Week 4+)
1. Monitor analytics and user feedback
2. Optimize based on popular templates
3. Add testimonials or social proof
4. Begin SEO optimization for target keywords
5. Plan future template additions

---

## Questions for User (Before Phase 2)

1. **Google Docs Access:** Do you have a Kowalah Google account for creating and sharing template docs?
2. **PDF Creation:** Should I create placeholder content for PDFs, or will you provide actual PDF files?
3. **Branding:** Should template preview images show actual template content, or conceptual imagery?
4. **Menu Priority:** Should Templates appear above or below Wednesday Webinars in Resources dropdown?
5. **Download Tracking:** Do you want to implement analytics events for tracking downloads?

---

## Conclusion

This design creates a scalable templates section that:
- ✅ Positions Kowalah as ChatGPT Enterprise thought leaders
- ✅ Provides immediate value to target ICP (1,000-10,000 employee companies)
- ✅ Uses flexible collection architecture for easy template additions
- ✅ Supports both Google Docs and PDF download formats
- ✅ Optimized for SEO and social sharing
- ✅ Future-proofs for email capture and advanced features
- ✅ Aligns with Kowalah brand messaging and executive tone

**Next Steps:**
1. User approval of design document
2. Proceed to Phase 2: Create templates collection schema
3. Generate template content files (markdown)
4. Build listing and detail pages
5. Create visual assets (hero images, template previews)
