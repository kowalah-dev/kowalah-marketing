---
description: Creates Astro Content Collection files with proper schema validation for the Kowalah marketing website, working directly from page design documents or manual specifications
---
# Command: Create Astro Content (Enhanced)

## Goal

To create properly formatted content files for the Kowalah marketing website directly from page design documents or manual specifications, automatically determining whether to create static pages (with markdown content files) or dynamic collections based on content requirements and architectural best practices.

## Command Syntax

### Direct Design-to-Content (Recommended)
```bash
/create-astro-content [design-document-path]
```
**Example:** `/create-astro-content tasks/page-design-digital-caio.md`  
*Collection name and page name extracted automatically from design document*

### Manual Content Creation  
```bash
/create-astro-content [collection-name] [page-name] --manual
```
**Example:** `/create-astro-content product ai-strategy --manual`

### Advanced Options
```bash
/create-astro-content [design-document-path] --with-review
```
**`--with-review`** - Pause for approval at each major section before proceeding  
**Example:** `/create-astro-content tasks/page-design-digital-caio.md --with-review`

## Content Architecture Decision Framework

### **CRITICAL: Choose the Right Pattern**

Before creating any content, determine the correct architectural approach:

### **Pattern 1: Static Pages with Markdown Content Files**

**When to Use:**
- ✅ Single, unique pages (product overviews, company pages, landing pages)
- ✅ Content that doesn't share a schema with other pages
- ✅ Pages where each one has unique sections and requirements
- ✅ Content that changes infrequently

**Implementation:**
- **File Location:** `src/content/[category]/[page-name].md`
- **Page Creation:** `src/pages/[category]/[page-name].astro` (static)
- **Content Access:** Custom `getMarkdownData()` utility
- **Schema Validation:** None (flexible frontmatter structure)

**Examples:**
- `/product/accelerators` → `src/content/product/accelerators.md`
- `/product/expert-requests` → `src/content/product/expert-requests.md`
- `/company/about` → `src/content/company/about.md`

### **Pattern 2: Collections for Similar Content Types**

**When to Use:**
- ✅ Multiple content items sharing the same schema
- ✅ Need dynamic routing with `[slug].astro`
- ✅ Content that benefits from consistent structure
- ✅ Blog posts, case studies, individual accelerator pages

**Implementation:**
- **File Location:** `src/content/[collection]/[item-name].md`
- **Collection Definition:** Must be defined in `src/content.config.ts`
- **Page Creation:** `src/pages/[collection]/[slug].astro` (dynamic)
- **Content Access:** Astro's `getCollection()` and `getEntry()`
- **Schema Validation:** Strict Zod validation

**Examples:**
- Blog posts: `src/content/blog/post-1.md` with `[slug].astro`
- Case studies: `src/content/case-studies/company-a.md` with `[slug].astro`
- Team members: `src/content/team/john-doe.md` with `[slug].astro`

### **Decision Criteria**

**Choose Static Pages When:**
- Each page has unique content structure
- No shared schema across pages
- Content doesn't need dynamic routing
- Simple content management needs

**Choose Collections When:**
- Multiple items share the same schema
- Need dynamic routing with slugs
- Want type safety and validation
- Content benefits from consistent structure

### **Anti-Patterns to Avoid**
- ❌ Using collections for single overview pages
- ❌ Forcing schema constraints on unique pages
- ❌ Creating collections with only one item
- ❌ Mixing inconsistent styling between pages

## Content Collections Available

**Existing Collections:**
- `homepage` - Homepage content with hero, features, offerings, benefits, pricing
- `features` - Feature pages with grids and detailed sections  
- `pricing` - Pricing tiers with comparison tables
- `company` - About, team, careers, values
- `contact` - Contact forms and information
- `faq` - Frequently asked questions
- `pages` - General pages (legal, terms, etc.)
- `product` - Product showcase pages with flexible schema supporting hero, capabilities, use cases, competitive advantages, how-it-works with YouTube video support, featured_showcase carousel, integrations, social proof, and conversion sections

**New Collections to Create:**
- `solutions` - Industry and role-based solution pages
- `openai` - OpenAI-specific content and guidance

## Enhanced Process Flow

### For Design Document Input
1. **Read Design Document:** Parse page design document for content strategy and requirements
2. **Architectural Decision:** Determine if this should be a static page or collection using decision framework
3. **Static Page Path:** If static page, use custom markdown utility; if collection, analyze schema
4. **Map Requirements:** Map design requirements to appropriate content structure
5. **Generate Content:** Create all content sections based on design specifications and chosen architecture
6. **Quality Validation:** Apply brand alignment, SEO, and technical validation
7. **Create File:** Generate properly formatted content with correct implementation pattern
8. **Generate Image Creation Document:** Create comprehensive visual asset roadmap with AI prompts and specifications
9. **Provide Implementation:** Show exact file path, architecture choice rationale, and next steps

### For Manual Input
1. **Receive Content Request:** User specifies collection type and page details
2. **Read Schema:** Examine `src/content.config.ts` to understand field requirements
3. **Check Existing Content:** Review similar content files for structure reference
4. **Generate Content File:** Create properly formatted markdown with frontmatter
5. **Validate Schema:** Ensure all required fields are present and correctly typed
6. **Provide File Location:** Show exact path and filename for the content

## Design Document Analysis

When working with design documents, the AI must:
- **Parse Content Strategy:** Determine if Astro Collection or Sanity CMS from design doc
- **Extract Key Messages:** Identify primary value propositions, target audience, and objectives
- **Map Content Sections:** Align design sections with schema fields (hero, capabilities, use_cases, etc.)
- **Identify Visual Assets:** Note image requirements, dimensions, and alt text needs
- **Apply Brand Context:** Reference messaging framework and positioning canvas for consistency
- **Validate SEO Requirements:** Extract keywords, meta descriptions, and content structure needs

## Schema Understanding

Before creating content, always:
- Read the specific collection schema from `src/content.config.ts`
- Understand required vs optional fields
- Note field types (string, number, array, object, boolean)
- Check validation rules and constraints
- Review nested object structures
- **For productCollection:** Note hero (required), all other sections optional
- **Map design requirements to exact schema field names** - never use generic field names

## Content File Structure

All Astro Content Collection files follow this pattern:

```markdown
---
# Frontmatter (YAML)
title: "Page Title"
meta_title: "SEO Title (max 60 chars)"
description: "Meta description for SEO (max 160 chars)"

# Collection-specific fields based on schema
hero:
  title: "Hero Title"
  content: "Hero content"
  # ... other hero fields

# Arrays and objects as defined in schema
features:
  - title: "Feature 1"
    description: "Feature description"
  - title: "Feature 2"
    description: "Feature description"
---

# Optional markdown content below frontmatter
# This content can be accessed via the .render() method in Astro components
```

## Quality Validation Framework

### Technical Validation
Before creating the file, verify:
- [ ] Collection exists in `src/content.config.ts`
- [ ] All required fields are included
- [ ] Field types match schema (string, number, array, object)
- [ ] Nested objects have required sub-fields
- [ ] Arrays contain properly structured items
- [ ] File path follows collection directory structure
- [ ] Filename uses kebab-case convention
- [ ] YAML syntax is correct with proper indentation
- [ ] **Icon validation:** Run `ls src/icons/ | sed 's/\.svg$//'` and verify ALL icon references exist
- [ ] **No Heroicons:** Confirm no Heroicon names (e.g., ChartBarIcon, UserIcon) are used
- [ ] **Image path format:** ALL image paths start with forward slash (`/images/...`, NOT `images/...`)
- [ ] **No YAML comments:** All comments removed from frontmatter to prevent parsing errors

### Content Quality Validation
Before finalizing content, ensure:
- [ ] **Brand Alignment:** Copy aligns with Kowalah positioning and messaging framework
- [ ] **Executive Tone:** Professional, strategic, authoritative voice for target audience
- [ ] **Benefit Focus:** Emphasizes strategic outcomes over technical features
- [ ] **SEO Optimization:** Keywords naturally integrated, meta tags optimized
- [ ] **Action-Oriented CTAs:** Clear, compelling calls-to-action
- [ ] **Character Limits:** All text fields respect UI constraints
- [ ] **Data Integrity:** No invented statistics, testimonials, or company names
- [ ] **Mobile-Friendly:** Content structure works on mobile devices

### Brand Messaging Validation
Content must align with Kowalah framework:
- [ ] **Target Audience:** CEOs at mid-sized enterprises (1,000-10,000 employees)
- [ ] **Value Proposition:** Digital CAIO vs. expensive human hire or consultants
- [ ] **Key Benefits:** Immediate availability, 24/7 access, collective intelligence, zero turnover
- [ ] **Competitive Position:** Superior to human hires, consultants, and DIY approaches
- [ ] **Tone Requirements:** Executive-appropriate, confidence without arrogance

## Output Format

### For Design Document Input
```
## Astro Content File Created from Design Document

**Source Design:** [design-document-path]
**Collection:** [collectionName]
**File Location:** `src/content/[collection]/[filename].md`
**Schema Reference:** `[collectionName]Collection` in src/content.config.ts

### Design Analysis Summary:
✅ Content strategy identified ([Astro Collection/Sanity CMS])
✅ Schema fields mapped to design requirements
✅ Key messages and value propositions extracted
✅ Visual asset requirements noted
✅ SEO requirements integrated

### Content Quality Validation:
✅ All required schema fields included
✅ Brand messaging alignment verified
✅ Executive tone and positioning maintained
✅ Action-oriented CTAs included
✅ Character limits respected
✅ No invented data or testimonials

### Implementation Steps:
1. Create file at: `src/content/[collection]/[filename].md`
2. Add the generated content (shown below)  
3. Create image creation document at: `tasks/image-creation-[page-name].md`
4. Test with `npm run dev` to verify schema validation
5. Navigate to page to test rendering
6. Work through image creation document to generate all visual assets
7. Add completed image assets to organized `/public/images/` directories
8. Commit changes when content and images are complete

### Generated Content:
```markdown
[Complete markdown content with properly structured YAML frontmatter]
```

### Image Creation Document:
**File:** `tasks/image-creation-[page-name].md`
**Purpose:** Comprehensive roadmap for creating all visual assets

**Document includes:**
- Prioritized image creation list with dimensions and specifications
- AI generation prompts including dimensions for executive/business scenes using brand guidelines
- Resource template designs with specific content requirements
- Platform screenshot specifications for UI/dashboard captures
- Brand guidelines reference with color codes and style requirements
- Implementation checklist organized by priority and creation method

**Benefits:**
- Systematic approach to visual asset creation
- Consistent brand application across all images
- Clear AI prompts that produce executive-appropriate imagery
- Organized workflow from high-priority hero images to enhancement assets

### Next Steps:
- Review content against original design document
- **Work through image creation document systematically:**
  - Start with Priority 1 images (hero section, essential visuals)
  - Generate AI images using provided prompts and brand guidelines
  - Create resource template designs with professional formatting
  - Capture platform screenshots for UI demonstrations
- Test page rendering and responsiveness with placeholder images
- Optimize completed images for web performance (WebP format)
- Consider adding structured data for SEO
```

### For Manual Input
```
## Astro Content File Created

**Collection:** [collectionName]
**File Location:** `src/content/[collection]/[filename].md`
**Schema Reference:** `[collectionName]Collection` in src/content.config.ts

### Content Structure Validation:
✅ All required fields included
✅ Field types match schema
✅ Nested objects properly structured
✅ Arrays contain valid items
✅ File path is correct

### Implementation Steps:
1. Create file at: `src/content/[collection]/[filename].md`
2. Add the generated content (shown below)
3. Test with `npm run dev` to verify schema validation
4. Navigate to page to test rendering
5. Commit changes when content is validated

### Generated Content:
```markdown
[Generated markdown content with proper frontmatter]
```
```

## Content Guidelines

### Frontmatter Best Practices:
- Use consistent YAML formatting with proper indentation
- Quote strings that contain special characters or colons
- Use arrays for lists: `[item1, item2, item3]`
- Structure nested objects with proper indentation
- Include all required fields per schema

### Naming Conventions:
- **Files:** Use kebab-case (e.g., `ai-strategy.md`, `pricing-enterprise.md`)
- **Collections:** Use singular forms (e.g., `product`, not `products`)
- **Field Names:** Follow existing schema field names exactly
- **URLs/Slugs:** Use descriptive, SEO-friendly paths

### Content Quality:
- Write clear, benefit-focused copy aligned with Kowalah messaging
- Keep meta descriptions under 160 characters
- Use action-oriented CTAs
- Include relevant keywords naturally
- Ensure mobile-friendly content structure

## Error Handling

Common errors and solutions:

**Schema Validation Errors:**
- Missing required field → Add field to frontmatter
- Wrong field type → Check schema for correct type (string vs array)
- Invalid nested structure → Review object schema definition

**File Structure Errors:**
- Wrong directory → Use correct collection directory
- Invalid filename → Use kebab-case without spaces
- Missing extension → Ensure `.md` file extension

**Content Errors:**
- YAML syntax errors → Check indentation and quotes
- Array formatting → Use proper YAML array syntax
- Object structure → Match nested object requirements

## Integration with Existing Components

Ensure content works with existing theme components:
- Hero sections should provide required fields for Hero components
- Feature arrays should match FeatureGrid component expectations
- CTA objects should include text and URL for Button components
- **Image paths should follow organized directory structure in `/public/images/`**

### Image Directory Organization
Follow the existing structure in `/public/images/`:
- **Product pages:** `/public/images/product/`
  - `mockups/` - Hero product screenshots and interface mockups
  - `screenshots/` - Demo screenshots and UI captures
  - `features/` - Feature-specific images and icons
  - `demos/` - How-it-works demonstration images
- **Homepage:** `/public/images/home/`
- **Features:** `/public/images/features/`
- **Heroes:** `/public/images/heroes/`
- **Team:** `/public/images/team/`
- **Case Studies:** `/public/images/case-studies/`

### Standardized Image Dimensions
Use these four standardized dimensions for all new images to ensure consistency and performance:

**1. Square Format: 800×800 pixels**
- **Usage:** Profile images, icons, social media, general purpose
- **Display size:** Usually 400×400 or smaller
- **Aspect ratio:** 1:1
- **Examples:** Avatar images, testimonial photos, company logos

**2. Wide Horizontal: 800×200 pixels**
- **Usage:** Banner-style images, overlays, header graphics
- **Display size:** Usually 400×100 to 512×141  
- **Aspect ratio:** 4:1 (wide and thin)
- **Examples:** C-suite collaboration overlays, banner graphics

**3. Standard Landscape: 800×450 pixels**
- **Usage:** Feature cards, blog images, general content images
- **Display size:** Usually 400×225 to 600×400
- **Aspect ratio:** 16:9 (standard video/screen ratio)
- **Examples:** Product screenshots, feature illustrations, case study images

**4. Portrait Format: 400×600 pixels**
- **Usage:** Book covers, mobile-first content, tall cards
- **Display size:** Usually 300×450 or 400×600
- **Aspect ratio:** 2:3 (portrait orientation)
- **Examples:** Book covers, mobile layouts, tall feature cards

### Image Path Examples
- Hero screenshot: `"/images/product/mockups/digital-caio-hero-interface.png"`
- Demo screenshots: `"/images/product/screenshots/dashboard-overview.png"`
- Feature images: `"/images/product/features/capability-icon.png"`

**⚠️ CRITICAL: Image Path Format**
- **ALWAYS start image paths with a forward slash:** `/images/...`
- **NEVER use relative paths:** `images/...` (missing leading slash)
- **Correct format:** `"/images/solutions/hero-image.png"`
- **Incorrect format:** `"images/solutions/hero-image.png"`

## Icon System Integration

### Available Icon Validation

**CRITICAL:** Always check available icons before using in content:

**Step 1: Check Available Icons**
```bash
ls src/icons/
```

**CRITICAL: Always verify available icons before use:**
```bash
ls src/icons/ | sed 's/\.svg$//' | sort
```

**Currently Available Icons (verify before use):**
- `auto`, `bulb`, `bullseye`, `case`, `check`, `cloud`, `compass`
- `cpu`, `cross`, `dirt`, `doller`, `euro`, `graph`, `help`
- `history`, `location_pin`, `location`, `mail`, `minus`, `monitor`  
- `phone`, `profile`, `right`, `rocket`, `speed`, `task`
- `tick`, `time`, `up`, `upward`

**⚠️ WARNING:** Icon list may change. Always run the command above to get current icons.

**Step 2: Map Capabilities to Available Icons**
For AI leadership capabilities, use ONLY verified available icons:
- **Strategy/Analytics:** `graph`, `bullseye`, `compass` ✅
- **Leadership/People:** `profile`, `help`, `task` ✅  
- **Technology/Systems:** `cpu`, `monitor`, `cloud` ✅
- **Innovation/Growth:** `bulb`, `rocket`, `up`, `upward` ✅
- **Performance/Success:** `tick`, `check`, `speed` ✅
- **Business/Financial:** `doller`, `euro`, `case` ✅
- **Communication:** `mail`, `phone` ✅
- **Time/Process:** `time`, `history`, `auto` ✅
- **Location/Direction:** `location`, `location_pin`, `right` ✅

**Step 3: Content Icon Usage**
```yaml
capabilities:
  - title: "AI Strategy & Vision"
    icon: "graph"  # ✅ Available icon
    # NOT: icon: "ChartBarIcon"  # ❌ Non-existent
```

### YAML Frontmatter Best Practices

**CRITICAL YAML Rules:**
1. **NO COMMENTS:** Never use `#` comments in frontmatter - they break Astro parsing
2. **Clean Structure:** Pure YAML data only, no explanatory text
3. **Proper Indentation:** Use 2-space indentation consistently
4. **Quote Strings:** Quote strings with special characters or colons

**✅ CORRECT Format:**
```yaml
---
title: "Your Digital Chief AI Officer"  
meta_title: "Digital Chief AI Officer | Executive AI Leadership"
description: "Get executive-level AI guidance without the expensive hire."

hero:
  title: "Your AI executive advisor is ready"
  subtitle: "Get executive-level AI leadership expertise"

capabilities:
  - title: "AI Strategy & Vision"
    icon: "graph"
    description: "Develop comprehensive AI strategies."
---
```

**❌ INCORRECT Format:**
```yaml
---
# Digital Chief AI Officer - Astro Collection Content  ← BREAKS PARSING
title: "Your Digital Chief AI Officer"

# Hero section (required)  ← BREAKS PARSING
hero:
  title: "Your AI executive advisor is ready"
---
```

## AI Processing Instructions

When processing content creation requests, the AI must follow this workflow:

### For Design Document Input
1. **Read and Parse Design Document**
   - **Extract Collection and Page Names:** Parse `Collection/Schema` and `URL Path` from design document
   - **Identify Content Strategy:** Determine Astro Collection vs Sanity CMS from design document  
   - **Extract Key Messages:** Identify target audience, value propositions, and page objectives
   - **Note Requirements:** Visual asset specifications, SEO requirements, and conversion goals
   - **Understand User Journey:** Page flow, CTAs, and success metrics

2. **Architectural Decision and Analysis**
   - **Apply Decision Framework:** Use the criteria above to determine static page vs collection
   - **For Static Pages:** Use custom markdown utility and flexible frontmatter structure
   - **For Collections:** Read specific collection schema from `src/content.config.ts`
   - Map design sections to appropriate content structure (flexible for static, schema-bound for collections)
   - **If Collection:** Identify required vs optional fields, nested structures, and array requirements
   - **MANDATORY: Verify available icons:** Run `ls src/icons/` and strip `.svg` extensions to get valid icon names
   - **Map icon requirements:** Assign ONLY verified icon names from the actual directory listing
   - **Icon validation:** Cross-reference every icon used in content against the verified list

3. **Content Generation with Brand Alignment**
   - Reference `/docs/context/messaging-framework.md` for tone and positioning
   - Apply executive-level messaging appropriate for target audience
   - Ensure benefits focus over feature descriptions
   - Create action-oriented CTAs that drive conversion
   - Integrate SEO keywords naturally throughout content

4. **Quality Validation Before Output**
   - Verify all required schema fields are included
   - Check character limits and formatting constraints
   - Ensure no invented statistics, testimonials, or data
   - Validate brand messaging alignment
   - Confirm mobile-friendly content structure

5. **Generate Complete Content File**
   - **Create clean YAML frontmatter:** No comments, proper indentation, valid syntax
   - **Use validated icons only:** Reference existing icons from `src/icons/` directory  
   - Include all content sections from design requirements
   - **Use organized image directory paths with leading slashes** (/images/product/mockups/, /images/product/screenshots/, etc.)
   - Provide visual asset specifications with correct directory structure
   - Deliver implementation-ready markdown file

6. **Create Image Creation Document**
   - **Generate comprehensive visual asset roadmap:** Extract all image references from content
   - **Categorize by creation method:** AI-generated, platform screenshots, template designs
   - **Provide detailed AI prompts:** Use executive visual style guide for consistent branding
   - **Include specifications:** Dimensions, file paths, and organized directory structure
   - **Prioritize by importance:** Hero images first, supporting visuals second, enhancements third
   - **Create actionable checklist:** Phase-based implementation with clear completion criteria

### For Manual Input
1. **Receive User Specifications**
2. **Read Collection Schema** from `src/content.config.ts`
3. **Check Existing Content** in same collection for reference patterns
4. **Generate Content** following schema requirements
5. **Apply Quality Validation** using established framework
6. **Create Final File** with proper structure and validation

### Data Integrity Requirements
**CRITICAL:** Only use verified information from context files or user input
- **Statistics/Metrics:** Check context files first, use placeholders like `[X%]` when unavailable
- **Testimonials:** Ask user for specific testimonials, use `[Customer testimonial]` placeholders
- **Claims:** Avoid inventing timeframes, results, or customer counts
- **Examples:** Use `[Specific metric]`, `[Customer Name]`, `[Company Name]` as placeholders

## Context Files to Reference

### Required Context Files
- `src/content.config.ts` - Schema definitions and field requirements
- `src/icons/` directory - Available icon names for content references
- `/docs/context/messaging-framework.md` - Brand messaging and persona guidelines
- `/docs/context/positioning-canvas.md` - Competitive positioning and value props
- `/docs/product-overview.md` - Product details, features, and pricing
- `/docs/context/executive-visual-style-guide.md` - Visual and content style requirements

### Optional Reference Files
- `src/content/[collection]/-index.md` - Existing collection examples
- Design document (when provided) - Page-specific requirements and specifications

## Error Prevention and Quality Assurance

### Common Errors to Avoid
- **Schema Mismatches:** Using generic field names instead of exact schema fields
- **Missing Required Fields:** Not including all required schema fields
- **YAML Syntax Errors:** Incorrect indentation or formatting
- **YAML Comments:** Comments in frontmatter (use `#`) break Astro parsing - NEVER include
- **Invalid Icons:** Using non-existent icon names instead of checking `src/icons/` directory first
- **Heroicon References:** Using Heroicon names (e.g., "ChartBarIcon") instead of local icon names
- **Brand Inconsistency:** Content that doesn't align with Kowalah positioning
- **Data Fabrication:** Inventing statistics, testimonials, or company information
- **Poor Mobile Experience:** Content that doesn't work well on mobile devices

### Image Creation Document Feature

### Overview
The enhanced Create Astro Content command now automatically generates a comprehensive image creation document alongside each content file. This systematic approach ensures no visual assets are missed and provides clear guidance for creating professional, brand-consistent imagery using standardized dimensions.

### How It Works
1. **Automatic Extraction:** AI analyzes the generated content file and extracts all image references
2. **Standardized Dimensions:** All images use the four standardized dimension formats (800×800, 800×200, 800×450, 400×600)
3. **Categorization:** Images are sorted by creation method (AI-generated, screenshots, templates)
4. **Prioritization:** Critical hero images come first, supporting visuals second, enhancements third
5. **Detailed Specifications:** Each image includes standardized dimensions, file paths, and creation guidance
6. **AI Prompt Generation:** Executive-appropriate prompts using brand visual guidelines with exact dimensions
7. **Implementation Checklist:** Phase-based workflow with completion tracking

### Document Structure
- **Priority 1:** Essential images (hero sections, critical visuals) - typically 800×450 or 800×200
- **Priority 2:** Supporting content (resource previews, section imagery) - typically 800×450 or 800×800
- **Priority 3:** Enhancement visuals (optional improvements) - any of the four standard formats
- **Standardized Specifications:** All images use one of four approved dimension formats
- **Brand Guidelines:** Color codes, style requirements, quality standards
- **Implementation Checklist:** Organized workflow for systematic completion

### Benefits
- **No Missing Assets:** Comprehensive extraction ensures complete visual coverage
- **Dimension Consistency:** All images use standardized formats for predictable scaling
- **Brand Consistency:** Detailed prompts and guidelines maintain professional standards
- **Efficient Workflow:** Prioritized approach focuses on high-impact visuals first
- **Performance Optimization:** Standardized dimensions enable better caching and optimization
- **Quality Control:** Specifications ensure proper dimensions and formats
- **Reusable Process:** Standardized approach scales across all content creation

## Success Criteria
- Content maps exactly to design document requirements
- All schema fields properly populated and validated
- Brand messaging aligns with Kowalah framework
- Executive tone appropriate for target audience
- SEO optimization naturally integrated
- **Image creation document provides complete visual asset roadmap**
- Implementation-ready files with clear next steps