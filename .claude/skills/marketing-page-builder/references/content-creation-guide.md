# Content Creation Guide

Reference for Phase 2: Creating Astro Content Files

## Content Architecture Patterns

### **CRITICAL DISTINCTION: Static Pages vs Collections**

### Pattern 1: Static Pages (Hardcoded in .astro file)
**When to Use:**
- Single, unique pages with custom structure
- Content hardcoded directly in the Astro component
- No separate content file needed
- Can optionally import dynamic data from collections when needed

**Implementation:**
- **File Location:** `src/pages/[category]/[page-name].astro`
- **Content Method:** Content is written directly in the .astro file as JSX/HTML
- **NO separate .md file for the page itself**
- **NO schema validation on page content** - write whatever HTML/JSX you need
- **Can import from collections:** Use `getEntry()` or `getCollection()` for dynamic data
- **Example pages:** Custom landing pages, unique layouts, one-off designs

**Hybrid Pattern - Static Page + Collection Data:**
Many static pages import dynamic data from collections. Example: Wednesday Webinars page
- Page structure hardcoded in `pageData` object
- Dynamic webinar list imported from `webinars` collection
- Best of both worlds: custom layout + dynamic content

**Example Static Page Structure:**
```astro
---
// src/pages/services/custom-page.astro
import Base from "@/layouts/Base.astro";
import Hero from "@/components/Hero.astro";
---

<Base title="Custom Page" description="Unique page">
  <Hero
    title="Hardcoded Hero Title"
    content="This content is written directly in the .astro file"
  />

  <section class="section">
    <div class="container">
      <h2>Hardcoded Section</h2>
      <p>All content here is directly in the .astro component</p>
    </div>
  </section>
</Base>
```

**Example Hybrid Static Page (with collection data):**
```astro
---
// src/pages/resources/wednesday-webinars.astro
import Base from "@/layouts/Base.astro";
import Hero from "@/components/Hero.astro";
import { getEntry } from "astro:content";

// Import dynamic data from collection
const schedule = await getEntry("webinars", "schedule");
const allWebinars = schedule?.data.webinars || [];

// Filter upcoming webinars
const upcomingWebinars = allWebinars.filter(w =>
  new Date(w.date) >= new Date() && w.status === "upcoming"
);

// Page structure and content hardcoded here
const pageData = {
  title: "Wednesday Webinars",
  hero: {
    title: "Wednesday Webinars",
    subtitle: "Every Wednesday at 3PM GMT...",
    background_image: "/images/webinars/hero.png"
  },
  why_attend: {
    title: "Why Business Leaders Attend",
    benefits: [
      {
        title: "Business Applications",
        icon: "briefcase",
        content: "Focus on sales, marketing, team collaboration..."
      }
      // More benefits hardcoded here
    ]
  },
  faq: [
    {
      question: "Who should attend?",
      answer: "Business leaders at organizations..."
    }
    // More FAQs hardcoded here
  ]
};
---

<Base title={pageData.title}>
  <!-- Hardcoded hero -->
  <Hero {...pageData.hero} />

  <!-- Dynamic upcoming webinars from collection -->
  <section class="section">
    {upcomingWebinars.map((webinar) => (
      <WebinarCard webinar={webinar} />
    ))}
  </section>

  <!-- Hardcoded benefits section -->
  <section class="section">
    {pageData.why_attend.benefits.map((benefit) => (
      <BenefitCard {...benefit} />
    ))}
  </section>

  <!-- Hardcoded FAQ section -->
  <section class="section">
    {pageData.faq.map((item) => (
      <Accordion title={item.question}>
        <p>{item.answer}</p>
      </Accordion>
    ))}
  </section>
</Base>
```

### Pattern 2: Collections (Separate .md content files)
**When to Use:**
- Multiple items sharing the same schema
- Content stored in separate .md files with YAML frontmatter
- Need dynamic routing with `[slug].astro`

**Implementation:**
- **Content File Location:** `src/content/[collection]/[item-name].md`
- **Page Template:** `src/pages/[collection]/[slug].astro` (dynamic route)
- **Collection Definition:** Must be defined in `src/content.config.ts`
- **Content Access:** Import using Astro's `getCollection()` and `getEntry()`
- **Strict Zod validation** on content files
- **Example collections:** solutions, insights, case studies, platforms

**Example Collection Setup:**

**1. Content File** (`src/content/solutions/for-ceos.md`):
```markdown
---
title: "Solutions for CEOs"
meta_title: "Digital CAIO for CEOs"
description: "Executive AI leadership for CEOs"
solution_type: "role"
solution_category: "ceos"

hero:
  title: "AI Leadership for CEOs"
  content: "Strategic guidance..."
  image: "/images/heroes/ceo.png"
  button:
    - enable: true
      label: "Get Started"
      link: "/contact"

challenges:
  title: "CEO Challenges"
  subtitle: "Common obstacles..."
  items:
    - title: "Board Pressure"
      description: "Need to show AI progress"
      icon: "chart"
---
```

**2. Dynamic Page Template** (`src/pages/solutions/[slug].astro`):
```astro
---
import { getEntry, getCollection } from "astro:content";

// For static generation - provide all possible paths
export async function getStaticPaths() {
  const solutions = await getCollection("solutions");
  return solutions.map((solution) => ({
    params: { slug: solution.id },
    props: { solution },
  }));
}

// Get the specific solution
const { slug } = Astro.params;
const { solution } = Astro.props;
const solutionEntry = solution || await getEntry("solutions", slug);

// Extract data from frontmatter
const { title, hero, challenges, benefits } = solutionEntry.data;
---

<Base title={title}>
  <Hero {...hero} />
  <ChallengesSection {...challenges} />
  <BenefitsSection {...benefits} />
</Base>
```

## Process Flow

### For Static Pages
1. **Read Design Document** - Understand unique page requirements
2. **Create .astro file** - Write directly in `src/pages/[category]/[page-name].astro`
3. **Hardcode content** - Write JSX/HTML directly in the component
4. **Import components** - Use existing theme components as needed
5. **No content file created** - Everything is in the .astro file

### For Collections
1. **Read Design Document** - Parse content strategy and requirements
2. **Verify schema exists** - Check `src/content.config.ts` for collection definition
3. **Create content file** - Generate `src/content/[collection]/[filename].md`
4. **Add YAML frontmatter** - Populate schema fields with content
5. **Quality Validation** - Brand alignment, SEO, technical checks
6. **Ensure dynamic route exists** - Verify `src/pages/[collection]/[slug].astro` is set up

## Collection Content File Structure

**For collections only** - this is a separate .md file:

```markdown
---
title: "Page Title"
meta_title: "SEO Title (max 60 chars)"
description: "Meta description for SEO (max 160 chars)"

hero:
  title: "Hero Title"
  content: "Hero content"

features:
  - title: "Feature 1"
    icon: "chart"
    description: "Feature description"
---
```

## Static Page Content Structure

**For static pages** - content is in the .astro file itself:

```astro
---
import Base from "@/layouts/Base.astro";
const title = "Page Title";
const description = "Page description";
---

<Base title={title} meta_title="SEO Title" description={description}>
  <!-- Content is written directly here as JSX/HTML -->
  <section class="hero">
    <h1>Hero Title</h1>
    <p>Hero content written directly in the component</p>
  </section>

  <section class="features">
    <h2>Features</h2>
    <div class="feature">
      <h3>Feature 1</h3>
      <p>Feature description</p>
    </div>
  </section>
</Base>
```

## Quality Validation Framework

### Technical Validation - For Collections
- [ ] Collection exists in `src/content.config.ts`
- [ ] All required schema fields included
- [ ] Field types match schema (string, number, array, object)
- [ ] Content file path: `src/content/[collection]/[filename].md`
- [ ] Dynamic route exists: `src/pages/[collection]/[slug].astro`
- [ ] Filename uses kebab-case convention
- [ ] YAML syntax correct with proper indentation
- [ ] **No YAML comments:** Remove all `#` comments (breaks Astro parsing)
- [ ] **Icon naming:** Semantic names from Heroicons (heroicons.com)
- [ ] **Image paths:** ALL start with forward slash (`/images/...`)

### Technical Validation - For Static Pages
- [ ] .astro file created at: `src/pages/[category]/[page-name].astro`
- [ ] Base layout imported and used
- [ ] Page metadata (title, description) provided
- [ ] Filename uses kebab-case convention
- [ ] Content is hardcoded in the .astro file (not in separate .md)
- [ ] **Icon naming:** Use Heroicons components directly in JSX
- [ ] **Image paths:** ALL start with forward slash (`/images/...`)
- [ ] Components imported and used correctly

### Content Quality Validation
- [ ] Brand alignment with Kowalah positioning
- [ ] Executive tone: professional, strategic, authoritative
- [ ] Benefit focus over technical features
- [ ] SEO optimization naturally integrated
- [ ] Action-oriented CTAs
- [ ] Character limits respected
- [ ] No invented statistics or testimonials
- [ ] Mobile-friendly content structure

### Brand Messaging Validation
- [ ] Target audience: CEOs at mid-sized enterprises (1,000-10,000 employees)
- [ ] Value proposition: Digital CAIO vs. expensive human hire
- [ ] Key benefits: Immediate availability, 24/7 access, collective intelligence
- [ ] Competitive position: Superior to human hires, consultants, DIY
- [ ] Tone: Executive-appropriate confidence without arrogance

## Icon System Integration

**Primary System:** Heroicons (@heroicons/react) - 300+ professional icons
- Browse available icons at [heroicons.com](https://heroicons.com)
- Use semantic names: `chart`, `users`, `rocket`, `lightbulb`, `shield-check`
- Automatic `currentColor` support for styling

**Common Icon Mappings:**
- Strategy/Analytics: `chart`, `target`, `compass`, `lightbulb`
- Leadership/People: `users`, `user`, `academic-cap`, `briefcase`
- Technology/Systems: `cpu`, `server`, `cloud`, `cog`
- Innovation/Growth: `lightbulb`, `rocket`, `sparkles`, `arrow-trending-up`

## Image Directory Organization

Follow organized structure in `/public/images/`:
- **Product pages:** `/public/images/product/` (mockups/, screenshots/, features/, demos/)
- **Platforms:** `/public/images/platforms/` (logos, hero images, overview images per platform)
- **Homepage:** `/public/images/home/`
- **Features:** `/public/images/features/`
- **Heroes:** `/public/images/heroes/`

### Standardized Image Dimensions
- **Square:** 800×800px (profile images, icons, general purpose)
- **Wide Horizontal:** 800×200px (banners, overlays, headers)
- **Standard Landscape:** 800×450px (feature cards, blog images, content)
- **Portrait:** 400×600px (book covers, mobile-first, tall cards)

## YAML Frontmatter Best Practices

**CRITICAL Rules:**
1. **NO COMMENTS** - Never use `#` comments (breaks Astro parsing)
2. **Clean Structure** - Pure YAML data only
3. **Proper Indentation** - 2-space indentation consistently
4. **Quote Strings** - Quote strings with special characters or colons

## Context Files to Reference

**Required:**
- `src/content.config.ts` - Schema definitions
- `~/Documents/KowalahReserved/strategy/go-to-market` - Brand positioning and messaging
- `/docs/product-overview.md` - Product details
- `/docs/context/executive-visual-style-guide.md` - Visual style

**Optional:**
- `src/content/[collection]/-index.md` - Existing collection examples
- Design document - Page-specific requirements

## Output Format

### For Collections
**Primary Output:** `src/content/[collection]/[filename].md`
- Markdown file with YAML frontmatter
- All schema fields populated
- Ready to be imported by dynamic route

**Also generates:** `tasks/image-creation-[page-name].md`
- Prioritized image creation list with dimensions
- AI generation prompts with brand guidelines
- Resource template designs
- Implementation checklist organized by priority

### For Static Pages
**Primary Output:** `src/pages/[category]/[page-name].astro`
- Complete Astro component file
- Content hardcoded in JSX/HTML
- NO separate .md content file

**Also generates:** `tasks/image-creation-[page-name].md`
- Prioritized image creation list with dimensions
- AI generation prompts with brand guidelines
- Resource template designs
- Implementation checklist organized by priority

### Decision Guide: Which Pattern to Use?

**Use Static Page (.astro with hardcoded content) when:**
- Page is completely unique (no other pages like it)
- Complex custom layout needed
- One-off landing page or special campaign
- Example: `/services/special-offer`, `/about/our-story`, `/resources/wednesday-webinars`

**Use Hybrid Static Page (hardcoded + collection import) when:**
- Unique page structure BUT needs some dynamic data
- Page layout is custom, but parts of content change frequently
- Want custom design with dynamic lists/feeds
- Example: Wednesday Webinars (custom page + dynamic webinar list), Resources page (custom layout + dynamic blog feed)

**Use Collection (.md content file) when:**
- Multiple pages share same structure
- Need to create more pages of same type in future
- Want schema validation and type safety
- All content managed outside the .astro file
- Example: Multiple solution pages, blog posts, case studies

**Key Decision Factors:**
1. **How many similar pages?** One = static, many = collection
2. **Need dynamic data?** Yes = hybrid or collection, no = pure static
3. **Custom layout?** Complex custom = static/hybrid, standard = collection
4. **Content frequency?** Changes often = collection, rarely = static
