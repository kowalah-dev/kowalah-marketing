---
description: Guides Claude through the creation of a detailed copy task list based on an existing Webpage Design Document and Sanity block requirements
---
# Command: Generating Copy Tasks from a Webpage Design Document

## Goal

To guide an AI assistant in creating a detailed, component-by-component copy task list in Markdown format based on an existing Webpage Design Document. The task list should specify exactly what copy is needed for each Sanity block to build the page.

## Output

- **Format:** Markdown (`.md`)
- **Location:** `/marketing/webpage-descriptions/`
- **Filename:** `copy-tasks-[page-name].md` (e.g., `copy-tasks-page-pricing.md`)

## Process

1. **Discover Sanity Block Schemas:** Use the LS tool to read `/sanity/kowalah/schemaTypes/blocks/` directory to see available block types.
2. **Receive Page Design Reference:** The user points the AI to a specific webpage design document here @$ARGUMENTS
3. **Analyze Page Design:** The AI reads and analyzes the content requirements, user journey, and key messages from the specified design document.
4. **Read Block Schemas:** For each block type used in the page design, read the corresponding schema file to understand exact field names, validation rules, and requirements.
5. **Phase 1: Generate Component List:** Based on the page design analysis and Sanity block schemas, create the file and list all content blocks needed for the page in order. Present these to the user. Inform the user: "I have identified the content blocks needed for this page. Ready to generate the detailed copy requirements? Respond with 'Go' to proceed."
6. **Wait for Confirmation:** Pause and wait for the user to respond with "Go".
7. **Phase 2: Generate Detailed Copy Tasks:** Once the user confirms, create specific copy tasks for each content block, detailing exactly what text is needed based on actual Sanity schema field requirements and validation rules.
8. **Include Context References:** Reference relevant marketing context files for consistency.
9. **Generate Final Output:** Combine the page-level requirements, component list, detailed copy tasks, and guidelines into the final Markdown structure.
10. **Save Task List:** Save the generated document in the `/marketing/webpage-descriptions/` directory.

## Output Format

The generated task list _must_ follow this structure:

```markdown
# Copy Tasks for [Page Name]

## Context References

- Positioning Canvas: `/marketing/context/positioning-canvas.md`
- Messaging Framework: `/marketing/context/messaging-framework.md`
- Brand Guidelines: `/marketing/context/brand-guidelines.md`
- Website Structure: `/marketing/context/website-structure.md`
- Style Guide: `/marketing/context/style-guide.md`
- Image Dimensions: `/marketing/context/image-dimensions.md`
- Available Icons: `/lib/icons/heroicons-registry.ts`
- Visual Style Guide: `/marketing/context/visual-style-guide.md`
- [Any other relevant context files]

## Page Overview

[Brief summary from the webpage design document including primary objective and target audience]

## Page-Level Copy Requirements

### 1.0 Page Document Fields

**Document Type:** `page`
**Schema File:** `/sanity/kowalah/schemaTypes/page.ts`

#### Core Page Fields
- [ ] **1.1 Title:** [Page title requirement with max 100 characters]
- [ ] **1.2 Slug:** [URL slug requirement with format guidance]
- [ ] **1.3 Category:** [Select from available categories]
- [ ] **1.4 Navigation Settings:**
  - [ ] **1.4.1 Show in Navigation:** [Yes/No]
  - [ ] **1.4.2 Navigation Label:** [If different from title]
  - [ ] **1.4.3 Navigation Order:** [Numeric priority]
  - [ ] **1.4.4 Navigation Section:** [product/solutions/openai/resources/company/main]
  - [ ] **1.4.5 Navigation Description:** [Brief description for dropdown]

#### SEO & Social Fields
- [ ] **1.5 SEO Settings:**
  - [ ] **1.5.1 Meta Title:** [SEO title - max 60 characters]
  - [ ] **1.5.2 Meta Description:** [SEO description - max 160 characters]
  - [ ] **1.5.3 Focus Keyword:** [Primary keyword to optimize for]
  - [ ] **1.5.4 Additional Keywords:** [Array of secondary keywords - max 10]
  - [ ] **1.5.5 Canonical URL:** [If different from default]

- [ ] **1.6 Social Media Settings:**
  - [ ] **1.6.1 OG Image:** [Social sharing image - 1200x630px]
  - [ ] **1.6.2 OG Title:** [Social media title - max 70 characters]
  - [ ] **1.6.3 OG Description:** [Social media description - max 200 characters]
  - [ ] **1.6.4 Twitter Card Type:** [summary_large_image recommended]

## Content Blocks Required

[List of Sanity blocks in order of appearance on page with block numbers]

## Detailed Copy Tasks

### 2.0 [Block Type Name] - [Section Purpose]

**Block Type:** `[sanityBlockType]`
**Schema File:** `/sanity/kowalah/schemaTypes/blocks/[blockType].ts`

#### Internal Reference
- [ ] **2.1 title:** [Internal reference name for this block]
  - **Field Type:** string
  - **Required:** Yes
  - **Purpose:** Internal CMS identification only
  - **Example:** "Hero - [Page Name]"

#### Text Content
- [ ] **2.2 [Exact Sanity Field Name]:** [Specific copy needed]
  - **Field Type:** [string/text/array/etc. from schema]
  - **Required:** [Yes/No based on schema validation]
  - **Character Limit:** [Exact limit from validation rules]
  - **Purpose:** [Why this copy is needed]
  - **Guidelines:** [Tone, style, key points to include]
  - **Example:** "[Sample copy if helpful]"

- [ ] **2.2 [Next Exact Field Name]:** [Specific copy needed]
  - [Same structure as above]

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
- Read the specific `.ts` file for each block type used in the page design
- Extract exact field names, types, and validation rules
- Note required vs optional fields
- Identify nested objects (like features arrays, CTA objects)
- Check character limits from validation rules

**Common Validation Patterns:**
- `headlineValidation`: max 100 characters
- `subheadlineValidation`: max 200 characters 
- `buttonTextValidation`: max 30 characters
- Feature titles: typically max 50 characters
- Feature descriptions: typically max 200 characters
- Stats validation: 2-4 items
- Feature grid validation: 2-8 items

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

1. **Always start by discovering available Sanity blocks** using LS tool on `/sanity/kowalah/schemaTypes/blocks/`
2. **Read the webpage design document thoroughly** to understand required blocks
3. **Read the page.ts schema** to understand page-level fields (title, slug, navigation, SEO)
4. **Read each relevant Sanity block schema file** to understand exact field requirements, validation rules, and nested structures
5. **Map design requirements to exact schema fields** - use actual field names, not generic descriptions
6. **Account for nested field structures** like feature arrays, CTA objects, urgency/social proof elements
7. **Include all validation constraints** from schema files (character limits, required fields, array min/max)
8. Use `/marketing/context/messaging-framework.md` for persona-specific messaging and benefits
8. Use `/marketing/context/brand-guidelines.md` for brand voice, tone, and writing standards
9. Use `/marketing/context/style-guide.md` for proper word counts and character limits
10. Provide clear guidelines that align with brand positioning and MKT1 framework
11. Consider the user journey and page objectives when crafting copy tasks
12. Include examples where helpful to guide the copywriter
13. Ensure SEO requirements from the design doc are incorporated
14. Reference `/marketing/context/visual-style-guide.md` for image dimensions and visual style requirements
15. Reference `/lib/icons/heroicons-registry.ts` for available icon options and categories
16. Include image requirements with dimensions, alt text, and AI generation prompts for each block that needs visuals
17. Specify icon requirements with exact icon names from the curated registry
18. **For AI-generated images, include complete ChatGPT prompts using the visual style guide template**
19. **Specify image source type (product screenshot, AI generated, stock photo) for each image requirement**
20. Use proven messaging building blocks from the framework for consistent brand voice
21. Eliminate jargon and weasel words per brand guidelines (no "leverage," "seamlessly," etc.)
22. Focus on revenue growth and specific outcomes rather than generic benefits
23. Follow content structure best practices from the style guide for optimal flow
24. **For array fields (features, stats, testimonials), specify exact number needed and structure for each item**
25. **For object fields (CTAs, urgency, social proof), detail all sub-fields that need content**