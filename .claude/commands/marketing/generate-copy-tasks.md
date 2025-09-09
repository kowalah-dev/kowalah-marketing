---
description: Guides Claude through the creation of a detailed copy task list based on an existing Webpage Design Document for Astro Content Collections or Sanity content
---
# Command: Generating Copy Tasks from a Webpage Design Document (Astro + Sanity Hybrid)

## Goal

To guide an AI assistant in creating a detailed copy task list in Markdown format based on an existing Webpage Design Document. The task list should specify exactly what content is needed for Astro Content Collection fields or Sanity schemas to build the page.

## Output

- **Format:** Markdown (`.md`)
- **Location:** `/tasks/` (for project planning)
- **Filename:** `copy-tasks-[page-name].md` (e.g., `copy-tasks-ai-strategy.md`)

## Process

1. **Determine Content Strategy:** Identify if this is an Astro Collection page or Sanity-powered page from the design document.
2. **Read Schema Structure:** Use the Read tool to examine `src/content.config.ts` for Astro Collections or relevant Sanity schemas.
3. **Receive Page Design Reference:** The user points the AI to a specific webpage design document here @$ARGUMENTS
4. **Analyze Page Design:** The AI reads and analyzes the content requirements, user journey, and key messages from the specified design document.
5. **Map Content to Schema:** For each content section in the page design, identify the corresponding Astro Collection fields or Sanity schema fields.
6. **Phase 1: Generate Content Structure:** Based on the page design analysis and schema structure, create the file and list all content sections needed for the page in order. Present these to the user. Inform the user: "I have identified the content structure needed for this page. Ready to generate the detailed copy requirements? Respond with 'Go' to proceed."
7. **Wait for Confirmation:** Pause and wait for the user to respond with "Go".
8. **Phase 2: Generate Detailed Copy Tasks:** Once the user confirms, create specific copy tasks for each content section, detailing exactly what text is needed based on actual schema field requirements and validation rules.
9. **Include Context References:** Reference relevant marketing context files for consistency.
10. **Generate Final Output:** Combine the page-level requirements, content structure, detailed copy tasks, and guidelines into the final Markdown structure.
11. **Save Task List:** Save the generated document in the `/tasks/` directory.

## Output Format

The generated task list _must_ follow this structure:

```markdown
# Copy Tasks for [Page Name]

## Context References

- Product Overview: `/docs/product-overview.md`
- Positioning Canvas: `/docs/context/positioning-canvas.md`  
- Messaging Framework: `/docs/context/messaging-framework.md`
- Website Structure: `/docs/context/website-structure.md`
- Astro Content Schema: `src/content.config.ts`
- [Collection Name] Reference: `src/content/[collection]/-index.md` (for existing examples)

## Page Overview

[Brief summary from the webpage design document including primary objective and target audience]

## Content Strategy

**Content Type:** [Astro Collection | Sanity CMS]
**Collection/Schema:** `[collectionName]` | `[sanitySchema]`
**File Location:** `src/content/[collection]/[file].md` | Sanity Studio

## Page-Level Requirements

### 1.0 Frontmatter/Meta Fields

**Collection Schema:** `[collectionName]Collection` in `src/content.config.ts`

#### Core Page Fields  
- [ ] **1.1 title:** [Page title - frontmatter field]
  - **Field Type:** z.string().optional()
  - **Purpose:** Main page title and H1
  - **Guidelines:** [Character limit and messaging guidelines]

- [ ] **1.2 meta_title:** [SEO title - frontmatter field]  
  - **Field Type:** z.string().optional()
  - **Purpose:** HTML <title> tag for SEO
  - **Guidelines:** Max 60 characters, include primary keyword

- [ ] **1.3 description:** [Meta description - frontmatter field]
  - **Field Type:** z.string().optional()  
  - **Purpose:** HTML meta description for SEO
  - **Guidelines:** Max 160 characters, compelling summary

## Content Structure Required

[List of content sections in order of appearance on page with section numbers]

## Detailed Copy Tasks  

### 2.0 [Section Name] - [Section Purpose]

**Schema Field:** `[exactFieldName]` in collection schema
**Content Type:** [z.string() | z.object() | z.array() | etc.]

#### Main Content
- [ ] **2.1 [Exact Schema Field]:** [Specific copy needed]
  - **Field Type:** [z.string() | z.object() | etc.]
  - **Required:** [Yes/No based on schema]
  - **Character Limit:** [From validation rules if any]
  - **Purpose:** [Why this content is needed]
  - **Guidelines:** [Tone, style, key points to include]
  - **Example:** "[Sample copy if helpful]"

#### Object/Array Fields (if applicable)
- [ ] **2.2 [Object/Array Field Name]:** [Description of nested content needed]
  - [ ] **2.2.1 [Nested Field 1]:** [Specific requirement]
    - **Field Type:** [schema type]
    - **Guidelines:** [Content guidelines]
  - [ ] **2.2.2 [Nested Field 2]:** [Specific requirement]
    - **Field Type:** [schema type]  
    - **Guidelines:** [Content guidelines]

#### Array Fields (if applicable)
- [ ] **2.3 [Array Field Name]:** [Number of items needed]
  - [ ] **2.3.1 Item 1:**
    - **Title:** [Requirement with character limit]
    - **Description:** [Requirement with character limit]
    - **Icon:** [Icon selection requirement]
  - [ ] **2.3.2 Item 2:**
    - [Same structure as above]

#### Visual Assets
- [ ] **2.4 Image Requirements:**
  - [ ] **2.4.1 [Image Type]:** [Specific image needed]
    - **Dimensions:** [e.g., 1200x750px (16:10 aspect ratio)]
    - **Alt Text:** [Descriptive alt text needed]
    - **Purpose:** [Why this image supports the message]
    - **Image Source:** [Product screenshot/AI generated/Stock photo]
    - **AI Generation Prompt:** [If AI generated, include complete prompt]

- [ ] **2.5 Icon Requirements:**
  - [ ] **2.5.1 [Icon Purpose]:** [Specific icon needed]
    - **Icon Name:** [e.g., "BoltIcon", "UserGroupIcon"]
    - **Category:** [e.g., "Performance & Speed", "Communication & Social"]
    - **Purpose:** [Why this icon supports the message]

#### Key Messages
- [Message 1 from page design doc]
- [Message 2]

---

### 3.0 [Next Block Type] - [Section Purpose]

[Same numbered structure as above, continuing with 3.1, 3.2, etc.]

## Copy Guidelines

### Tone and Voice
- [Specific guidelines from brand/positioning docs]

### SEO Considerations
- Primary Keywords: [from page design doc]
- Include in: [where keywords should appear]

### Approval Checklist
- [ ] All copy aligns with positioning canvas
- [ ] Character limits are respected
- [ ] CTAs are action-oriented and clear
- [ ] Technical jargon is minimized/explained
- [ ] Benefits are emphasized over features
- [ ] Social proof elements are included where specified

## Notes for Content Creation
- [Any special considerations]
- [Dependencies or requirements]
```

## Sanity Schema Integration

**IMPORTANT:** Always read the actual Sanity block schema files from `/sanity/kowalah/schemaTypes/blocks/` to get exact field requirements. Do not rely on generic assumptions.

**Schema Analysis Required:**
- Read `src/content.config.ts` for Astro Collection schemas (e.g., productCollection)
- For Sanity: Read the specific `.ts` file for each block type used in the page design
- Extract exact field names, types, and validation rules
- Note required vs optional fields
- Identify nested objects (like capabilities arrays, use_cases arrays, CTA objects)
- Check character limits from validation rules
- For product collection: Note YouTube video support in how_it_works.demo section

**Common Validation Patterns:**

**Sanity CMS:**
- `headlineValidation`: max 100 characters
- `subheadlineValidation`: max 200 characters 
- `buttonTextValidation`: max 30 characters
- Feature titles: typically max 50 characters
- Feature descriptions: typically max 200 characters
- Stats validation: 2-4 items
- Feature grid validation: 2-8 items

**Astro Collections (Product Collection):**
- All sections optional except `hero` (required)
- `capabilities`: Array of capability objects (title, icon, description, details[], value_proposition)
- `use_cases`: Array of use case objects (scenario, solution, outcome)
- `how_it_works.demo`: Supports screenshots, YouTube video, or both
- `competitive_advantage.advantages`: Array of advantage objects (point, description)
- YouTube video fields: youtube_id (required), title/poster/start_time (optional)

**URL Requirements:**
- All URL fields need full URLs with protocol (e.g., "https://kowalah.com/signup")
- Do not use relative paths like "/signup"

**Nested Structure Examples:**
- `featureGrid.features[]` - Array of feature objects with title, description, icon
- `ctaBlock.urgency` - Object with `enabled: true`, then `text` and `style` fields
- `ctaBlock.socialProof` - Object with `enabled: true`, then `text` and optional `customerCount`
- `primaryCta` and `secondaryCta` - Shared CTA objects with text and URL
- `contentSection` - Uses `contentBlocks` array with paragraph objects containing `content` field
- `testimonialSection` - Requires references to separate testimonial documents, not inline data

## Interaction Model

The process requires a pause after identifying content blocks to get user confirmation ("Go") before generating detailed copy requirements. This ensures the component structure aligns with expectations before detailing copy needs.

## Final Instructions

1. **Always start by examining Astro Content Collections** using Read tool on `src/content.config.ts` to understand available schemas
2. **Read the webpage design document thoroughly** to understand content strategy and requirements
3. **Identify content approach** from design doc (Astro Collection vs Sanity CMS)
4. **For Astro Collections:**
   - Read the specific collection schema to understand exact field requirements
   - Check existing content files for reference (e.g., `src/content/homepage/-index.md`)
   - Map design requirements to exact schema fields using actual field names
   - Account for nested field structures (objects, arrays, validation rules)
5. **For Sanity content:**
   - Reference Sanity schema structure for dynamic content types
   - Focus on simplified content approach (not complex page builder blocks)
6. **Map design requirements to exact schema fields** - use actual field names, not generic descriptions
7. **Include all validation constraints** from schema files (character limits, required fields, array min/max)
8. Use `/docs/context/messaging-framework.md` for persona-specific messaging and benefits
9. Use `/docs/context/positioning-canvas.md` for brand voice, tone, and competitive positioning
10. Provide clear guidelines that align with Kowalah messaging framework
11. Consider the user journey and page objectives when crafting copy tasks
12. Include examples where helpful to guide the content creator
13. Ensure SEO requirements from the design doc are incorporated
14. **Focus on Astro frontmatter structure** for static pages (title, meta_title, description)
15. **For complex object/array fields**, specify exact number needed and structure for each item
16. **Include image requirements** with dimensions and alt text for any visual assets needed
17. Use proven messaging building blocks from the framework for consistent brand voice
18. Eliminate jargon and focus on clear, benefit-driven copy
19. Focus on revenue growth and specific outcomes rather than generic benefits
20. **For Astro Collections**, ensure content maps to existing theme component expectations
21. **Consider mobile-first content** structure and readability
22. **Plan for internationalization** if applicable (content length considerations)
23. **Include content validation checklist** to ensure all requirements are met
24. **Reference existing collection content** for formatting and structure guidance
25. **Specify file naming conventions** and directory structure for content organization