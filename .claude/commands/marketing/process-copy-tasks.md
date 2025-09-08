---
description: Processes a copy task list that guides Claude through creating marketing content for Astro Collections or Sanity CMS, with user verification at each step
---
# Copy Task List Processing (Astro + Sanity Hybrid)

Guidelines for systematically creating marketing content based on a copy task list $ARGUMENTS, ensuring quality and brand alignment for both Astro Content Collections and Sanity CMS content.

## Content Strategy Identification

First, determine content strategy from the copy task list:
- **Astro Collection:** Static pages (homepage, product, solutions, pricing, company)
- **Sanity CMS:** Dynamic content (blog posts, case studies, team members)

## Task Implementation

**For Astro Collections:**
- **Frontmatter fields (1.0):** Present all meta fields for approval (title, meta_title, description)
- **Content sections (2.0, 3.0, etc.):** Present complete content section (hero, features, benefits, etc.)
- **Complex objects/arrays:** Present as logical groups with proper YAML structure

**For Sanity Content:**
- **Document fields:** Present core document fields (title, slug, excerpt, etc.)
- **Rich content:** Present body content in sections for approval
- **Media requirements:** Note image and asset needs

**Completion Protocol:**
1. Create content for entire **section** (e.g., all frontmatter fields, complete hero object)
2. Present section with proper formatting (YAML for Astro, structured content for Sanity)
3. Get user approval before moving to next section
4. Save in appropriate format (markdown file or Sanity-ready structure)

## Copy Creation Process

### For Astro Collections:

1. **For each content section:**
   - Read the schema field requirements from copy task list
   - Reference context files for messaging and positioning
   - Create properly structured YAML content
   - Ensure field types match schema (string, array, object)
   - Validate required vs optional fields
   - Present formatted frontmatter section for approval

### For Sanity Content:

1. **For each content block:**
   - Read document schema requirements
   - Create rich text content using Portable Text structure
   - Plan image and media requirements
   - Structure content for easy Sanity Studio entry
   - Present content sections for approval

### Data Verification Rules (Both Types):
- Only use statistics, metrics, or claims from `/docs/context/` files
- For testimonials: Ask user for specific testimonials or use placeholders
- For stats/numbers: Ask user for data or use `[X]` placeholder
- Never invent company names, person names, or statistics

## Content Presentation Format

### For Astro Collections:

Present content as properly formatted YAML frontmatter:

```
### [Section Number] [Section Name]

**YAML Structure:**
```yaml
# Frontmatter section
title: "Page Title Here"
meta_title: "SEO Title (45/60 chars)"
description: "Meta description for SEO (142/160 chars)"

# Content section (example: hero object)
hero:
  title: "Hero Title"
  content: "Hero description text"
  button:
    - enable: true
      label: "Get Started"
      link: "/signup"

# Array section (example: features)
features:
  - title: "Feature 1"
    description: "Feature description"
    icon: "BoltIcon"
  - title: "Feature 2" 
    description: "Feature description"
    icon: "UserGroupIcon"
```

**Character Counts:**
- Title: X/Y characters
- Description: X/Y characters
- Each feature title: X/Y characters

---
Ready to approve this YAML section? (yes/no)
```

### For Sanity Content:

Present content in structured format for Sanity Studio entry:

```
### [Section Number] [Document Type]

**Document Fields:**
- **Title:** "Blog Post Title" (45/100 chars)
- **Slug:** "blog-post-slug"
- **Excerpt:** "Brief summary for listings" (85/200 chars)
- **Categories:** ["AI Strategy", "Implementation"]

**Rich Text Content:**
[Structured content blocks with headings, paragraphs, lists]

**Media Requirements:**
- Featured Image: 1200x630px, alt text: "Description"
- Gallery Images: [list any additional images needed]

---
Ready to approve this content structure? (yes/no)
```

## Save Completed Content

### For Astro Collections:
- Create complete markdown file: `src/content/[collection]/[page-name].md`
- Include all approved frontmatter in proper YAML format
- Validate against collection schema requirements

### For Sanity Content:
- Create content structure document for manual entry in Sanity Studio
- Provide clear field mapping and content organization
- Include media upload requirements and specifications

## Task List Maintenance

1. **Update the copy task list as you work:**
   - Mark fields as completed (`[x]`) after user approval
   - Note any deviations or adjustments made
   - Track character counts for validation

2. **Maintain quality standards:**
   - Verify copy against positioning canvas
   - Ensure SEO keywords are naturally included
   - Check all CTAs are action-oriented
   - Confirm character limits are met

## Data Integrity Guidelines

**CRITICAL: Only use verified information from context files or user input**

1. **Statistics and Metrics:**
   - Check `/marketing/context/` files for any existing data
   - If specific numbers needed, ask: "Do you have specific statistics for [metric]? If not, I'll use placeholder text."
   - Use placeholders like: `[X%]`, `[number]`, `[metric]` when data unavailable
   - Never invent percentages, growth rates, or customer counts

2. **Testimonials:**
   - Ask: "Do you have specific testimonials from customers? Please provide names, roles, companies, and quotes."
   - If none provided, use: `[Customer Name]`, `[Role]`, `[Company Name]`, `[Testimonial quote to be added]`
   - Never create fictional people or companies

3. **Specific Claims:**
   - Time frames: Use `[timeframe]` instead of making up "6 weeks" or "30 days"
   - Results: Use `[result metric]` instead of "85% improvement"
   - Customer counts: Use `[number]+ customers` instead of "500+ customers"

4. **Example Placeholder Usage:**
   ```
   Stats Block:
   - Number: "[X]+"
   - Label: "Organizations Transformed"
   - Description: "[Specific metric to be added]"

   Testimonial:
   - Quote: "[Testimonial from customer about specific benefit]"
   - Author: "[Customer Name]"
   - Role: "[Title], [Company Name]"
   ```

## AI Instructions

When processing copy task lists, the AI must:

1. Review the copy task list shared by the user here: @$ARGUMENTS
2. Process copy in logical groupings based on numbered hierarchy:
   - **Section 1.0 (Page Fields):** Complete ALL sub-sections (1.1-1.6) before presenting
   - **Content Blocks (2.0, 3.0, etc.):** Complete entire block including all sub-items
   - **Complex Arrays:** Can present separately if 4+ items
3. For each section/block:
   - Read ALL field requirements within that section
   - Reference `/marketing/context/` files for brand voice and positioning
   - **Before creating copy with specific data:**
     - Check context files for verified information
     - Ask user for specific stats/testimonials if needed
     - Use placeholders for unverified data
   - Create copy for ALL fields in the section
   - Present the complete section with character counts
   - Wait for user approval of the entire section
4. Marking completion:
   - Internally track completion of sub-items as you work
   - After user approves a section, mark ALL items in that section as `[x]`
   - Update the task list file with batch completions
5. Save all approved copy in both formats:
   - Markdown for human review
   - NDJSON for Sanity import
6. Build Sanity documents with:
   - Unique IDs using format: `[blockType]-[pageName]-[section]`
   - Proper _type matching Sanity schema
   - All required fields populated
7. Follow this sequence strictly:
   - Create ALL copy for section → Present complete section → Get approval → Save → Mark ALL items complete → Move to next section
8. If user requests changes:
   - Revise the specific items mentioned
   - Re-present the entire section for approval
   - Only mark complete after final approval of full section

## Output Structure

### For Astro Collections:

Create a complete markdown file at `src/content/[collection]/[page-name].md`:

```markdown
---
# All frontmatter content goes here in YAML format
title: "Page Title"
meta_title: "SEO Title"
description: "Meta description"

# Content sections as objects/arrays per schema
hero:
  title: "Hero Title"
  content: "Hero content"
  button:
    - enable: true
      label: "Get Started"
      link: "/signup"

features:
  - title: "Feature 1"
    description: "Feature description"
    icon: "BoltIcon"
  - title: "Feature 2"
    description: "Feature description"
    icon: "UserGroupIcon"

# Continue for all schema sections...
---

# Optional markdown content below frontmatter
# This content is accessible via .render() method
```

### For Sanity Content:

Create content guide for manual Sanity Studio entry:

```markdown
# Sanity Content Guide: [Content Name]

## Document Type: [documentType]

### Required Fields:
- **Title:** [Approved title]
- **Slug:** [approved-slug]
- **Excerpt:** [Approved excerpt]

### Rich Text Content:
[Structured content with headings, paragraphs, lists]

### Media Requirements:
- **Featured Image:** [specifications and alt text]
- **Additional Images:** [list and specifications]

### Implementation Steps:
1. Open Sanity Studio
2. Create new [document type] document
3. Fill in provided content structure
4. Upload required media assets
5. Save as draft and preview
6. Publish when approved
```

## Quality Checklist

Before marking any copy as complete, verify:
- [ ] Fits within character limits
- [ ] Aligns with brand positioning
- [ ] Includes relevant keywords naturally
- [ ] Uses appropriate tone and voice
- [ ] CTAs are clear and action-oriented
- [ ] No technical jargon (unless explained)
- [ ] Benefits emphasized over features
- [ ] Consistent with other page copy
- [ ] **All statistics/metrics are from context files or marked as placeholders**
- [ ] **No invented company names, person names, or testimonials**
- [ ] **User has been asked for specific data when needed**

## Important Notes

- Always reference the original webpage design document for context
- Keep copy conversational and focused on user benefits
- If character limits are challenging, prioritize key messages
- Suggest alternatives if requirements conflict
- Document any decisions or trade-offs made
- Generate valid JSON for NDJSON output (each line must be valid JSON)
- Test NDJSON validity before saving
- Include timestamp in both output files for versioning
- All documents are created as drafts for safety
- Use current timestamp format: YYYYMMDD-HHMMSS (e.g., 20250120-143022)
- Ensure all `_ref` values in page document match the draft block IDs exactly

## AI Processing Instructions

When processing copy task lists, the AI must:

1. **Identify Content Strategy:** Determine if this is Astro Collection or Sanity content from the task list
2. **Read Schema Requirements:** 
   - For Astro: Check `src/content.config.ts` for collection schema
   - For Sanity: Review simplified content structure requirements
3. **Process in Logical Sections:**
   - **Frontmatter/Document Fields (1.0):** Complete all meta fields before presenting
   - **Content Sections (2.0, 3.0, etc.):** Complete entire section before presenting
   - **Complex Objects/Arrays:** Present as cohesive YAML or content structures
4. **For Each Section:**
   - Create content matching exact schema field requirements
   - Reference `/docs/context/` files for messaging and positioning
   - Validate data claims and use placeholders when needed
   - Present complete section with proper formatting
   - Wait for user approval before proceeding
5. **Format Output:**
   - **Astro Collections:** Valid YAML frontmatter structure
   - **Sanity Content:** Clear content guide for manual entry
6. **Save Final Content:** Provide complete, implementation-ready content

## Final Output Summary

### For Astro Collections:
1. **File Location:** `src/content/[collection]/[page-name].md`
2. **Content Status:** Ready for development implementation
3. **Next Steps:** 
   - Create file at specified location
   - Test with `npm run dev` for schema validation
   - Commit to version control when validated

### For Sanity Content:
1. **Content Guide:** Structured guide for Sanity Studio entry
2. **Content Status:** Ready for content team implementation
3. **Next Steps:**
   - Open Sanity Studio
   - Create document using provided structure
   - Upload media assets as specified
   - Save as draft, preview, and publish when ready

## Quality Validation

Before completing any content, verify:
- [ ] **Schema Compliance:** All required fields present and correctly typed
- [ ] **Brand Alignment:** Messaging consistent with Kowalah positioning
- [ ] **Content Quality:** Clear, benefit-focused copy with appropriate tone
- [ ] **Technical Accuracy:** No invented statistics or unverified claims
- [ ] **SEO Optimization:** Meta tags, keywords, and structure optimized
- [ ] **Implementation Ready:** Content formatted for direct use in target system