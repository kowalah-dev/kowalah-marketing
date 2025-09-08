---
description: Processes a copy task list that guides Claude through creating marketing copy for each Sanity block, with user verification at each step
---
# Copy Task List Processing

Guidelines for systematically creating marketing copy based on a copy task list $ARGUMENTS , ensuring quality and brand alignment at each step.

## Task Implementation

- **Approval levels:** Process and present copy at meaningful groupings:
  - **Page-level fields (1.0):** Present entire section for approval (all core fields, navigation, SEO, social)
  - **Content blocks (2.0, 3.0, etc.):** Present complete block for approval (all text, CTAs, images, arrays)
  - **Complex arrays:** If a block has many array items (e.g., 4+ features), can present array for separate approval
- **Completion protocol:**  
  1. When you finish copy for a **sub-field** (e.g., 1.4.1), mark it completed `[x]` internally
  2. When all sub-fields in a **section** are done (e.g., all of 1.4), present for approval
  3. After approval, mark the entire section and all sub-items as completed
  4. Save completed copy in structured format for Sanity implementation
- **Review and refine:** Present grouped copy sections for feedback before marking complete
- **Efficiency note:** Since this is copy content (not code), batch approvals reduce friction while maintaining quality

## Copy Creation Process

1. **For each content block:**
   - Read the copy requirements and guidelines
   - Reference the marketing context files (positioning, website structure)
   - **Data Verification Rules:**
     - Only use statistics, metrics, or claims that appear in `/marketing/context/` files
     - For testimonials: Ask user if they have specific testimonials or use placeholders
     - For stats/numbers: Ask user for specific data or use `[X]` placeholder
     - For customer counts: Ask user or use `[number]` placeholder
     - Never invent company names, person names, or statistics
   - Create copy that fits character limits
   - Ensure alignment with key messages
   - Present to user for review

2. **Copy presentation format:**
   ```
   ### [Section Number] [Section Name]
   
   **[Field Group Name]:**
   - **[Sub-field 1]:** [Your copy here] (X/Y characters)
   - **[Sub-field 2]:** [Your copy here] (X/Y characters)
   
   **[Field Name]:** (X/Y characters)
   [Your copy here]
   
   **[Array Name]:** [if applicable]
   1. **[Item 1 Title]:** [Copy]
      - Description: [Copy] (X/Y chars)
   2. **[Item 2 Title]:** [Copy]
      - Description: [Copy] (X/Y chars)
   
   ---
   Ready to approve this section and proceed? (yes/no)
   ```
   
   **Example for Page Fields:**
   ```
   ### 1.0 Page Document Fields
   
   **Core Page Fields:**
   - **Title:** "CIO Solutions - AI Strategy & Implementation" (56/100 chars)
   - **Slug:** "solutions/cio"
   - **Category:** "solutions"
   
   **Navigation Settings:**
   - **Show in Navigation:** Yes
   - **Navigation Label:** "For CIOs"
   - **Navigation Order:** 2
   - **Navigation Section:** "solutions"
   - **Navigation Description:** "AI strategy expertise for IT leaders" (37/100 chars)
   
   ---
   Ready to approve page fields and proceed to content blocks? (yes/no)
   ```

3. **Save completed copy:**
   - Create two output files:
     - Human-readable: `copy-content-[page-name].md` in `/marketing/generated-content/drafts/`
     - Sanity import: `sanity-import-[page-name].ndjson` in `/marketing/imports/`
   - Build proper Sanity document structure with references

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

### 1. Markdown Output
Create a human-readable file `copy-content-[page-name].md` with this structure:

```markdown
# Approved Copy for [Page Name]

Generated from: copy-tasks-[page-name].md
Date: [Current Date]
Status: [In Progress/Complete]

## [Block 1 Name] - [Purpose]

**[Field Name]:**
[Approved copy]

**[Field Name]:**
[Approved copy]

---

## [Block 2 Name] - [Purpose]

[Continue for all blocks...]

## Implementation Notes
- [Any special considerations for Sanity implementation]
- [Fields that need additional review]
```

### 2. NDJSON Output for Sanity Import
Create `sanity-import-[page-name].ndjson` with proper document structure:

**IMPORTANT: Most content blocks are embedded inline, NOT separate documents!**

```ndjson
{"_id":"drafts.testimonial-[authorName]-[timestamp]","_type":"testimonial","quote":"[Testimonial quote]","author":"[Author name]","role":"[Author role]","company":"[Company name]"}
{"_id":"drafts.faq-[topic]-[timestamp]","_type":"faq","question":"[FAQ question]","answer":"[FAQ answer]","category":"[FAQ category]"}
{"_id":"drafts.page-[pageName]-[timestamp]","_type":"page","title":"[Page Title]","slug":{"_type":"slug","current":"[page-slug]"},"pageBuilder":[{"_type":"primaryHero","_key":"hero-section","title":"Hero - [Page Name]","headline":"[Your approved headline]","subheadline":"[Your approved subheadline]","primaryCta":{"text":"[CTA Text]","url":"https://kowalah.com/[path]"}},{"_type":"featureGrid","_key":"features-section","title":"Features - [Page Name]","sectionTitle":"[Approved section title]","features":[{"_key":"feature-1","title":"[Feature title]","description":"[Feature description]","icon":"[IconName]"}]},{"_type":"testimonialSection","_key":"testimonials-section","title":"Testimonials - [Page Name]","testimonials":[{"_type":"reference","_ref":"drafts.testimonial-[authorName]-[timestamp]"}]},{"_type":"faqSection","_key":"faq-section","title":"FAQs - [Page Name]","faqs":[{"_type":"reference","_ref":"drafts.faq-[topic]-[timestamp]"}]}]}
```

**Document Structure Rules:**
1. **Inline blocks (most content):** Embedded directly in pageBuilder array with `_type` and `_key`
2. **Referenced documents (only testimonials & FAQs):** Created as separate documents and referenced
3. Page document contains the complete content structure in pageBuilder array
4. Referenced document ID format: `drafts.[type]-[identifier]-[timestamp]`
5. All documents start as drafts for safety (prefix with `drafts.`)
6. Include timestamp for uniqueness (e.g., `20250120-143022`)
7. Include all required fields for each block type
8. URLs must be full format: `https://kowalah.com/[path]` not `/[path]`

**Block Types:**
- **Inline (embedded in pageBuilder):** primaryHero, contentSection, featureGrid, featureSection, statsBlock, ctaBlock, etc.
- **Referenced (separate documents):** testimonial, faq

**Draft Workflow:**
- All imported content starts as drafts (not published)
- Drafts can be refined in Sanity Studio
- Add images and adjust content as needed
- Publish only when ready for production

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

## Final Output Summary

When processing is complete, inform the user:
1. Location of markdown file: `/marketing/generated-content/drafts/copy-content-[page-name].md`
2. Location of import file: `/marketing/imports/sanity-import-[page-name].ndjson`
3. Content status: All documents created as drafts (safe for production import)
4. Next step: Use `/import-to-sanity` command to validate and import drafts
5. Refinement: After import, refine content in Sanity Studio and publish when ready