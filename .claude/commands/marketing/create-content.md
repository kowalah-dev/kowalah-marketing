---
description: Manages content creation for the hybrid Astro + Sanity marketing website
---
# Command: Create Content (Astro + Sanity Hybrid)

## Goal

To guide content creation for the Kowalah marketing website using our hybrid approach: Astro Content Collections for static pages and Sanity CMS for dynamic content. This command helps determine the right approach and provides validation for both content types.

## Content Strategy Decision

**Astro Content Collections** (Static Pages):
- Homepage, Product pages, Solutions, Pricing, Company, Legal
- Content rarely changes (monthly/quarterly updates)
- Version-controlled, developer-managed
- Optimal SEO and performance

**Sanity CMS** (Dynamic Content):
- Blog posts, Case studies, Team members, Press releases
- Content changes frequently (weekly/monthly)
- Editor-managed, no deployment needed
- Rich media management

## Process

### For Astro Collection Content:

1. **Receive Content Request:** User specifies page type and content location
2. **Validate Schema:** Check existing collection schema in `src/content.config.ts`
3. **Validate Content:** Verify markdown frontmatter matches schema
4. **Show Content Preview:** Display how content will render
5. **Provide File Instructions:** Show exact file location and format

### For Sanity Content:

1. **Receive Content Data:** User provides content or references copy tasks
2. **Validate Schema:** Check against simplified Sanity content types  
3. **Format for Import:** Convert to appropriate Sanity document format
4. **Show Summary:** Display content structure and fields
5. **Provide Import Instructions:** Give exact steps for Sanity Studio

## Validation Steps

### For Astro Content Collections:

1. **Schema Validation:**
   - Read `src/content.config.ts` to understand collection schema
   - Verify content file exists at expected path: `src/content/[collection]/[file].md`
   - Check frontmatter fields match Zod schema requirements
   - Validate required vs optional fields

2. **Content Validation:**
   - Verify YAML frontmatter is valid
   - Check field types match schema (string, number, array, object)
   - Validate array items have correct structure
   - Ensure nested objects have required fields

3. **File Structure Validation:**
   - Confirm file is in correct collection directory
   - Check filename follows naming conventions  
   - Verify markdown content structure
   - Validate image paths and assets exist

### For Sanity Content:

1. **Content Type Validation:**
   - Determine appropriate Sanity document type (blogPost, caseStudy, person)
   - Verify content structure matches simplified schema approach
   - Check required fields for content type

2. **Data Validation:**
   - Validate rich text content (Portable Text format)
   - Check image references and upload requirements
   - Verify external links and internal references
   - Validate slug uniqueness and format

3. **Import Readiness:**
   - Format content for Sanity import or manual entry
   - Provide clear field mapping
   - Include any asset upload requirements

## Output Format

### For Astro Content Collections:

```
## Astro Content Validation Report

**Content Type:** Astro Collection
**Collection:** [collectionName]
**File Location:** `src/content/[collection]/[filename].md`
**Status:** ✅ Valid / ❌ Invalid

### Content Structure:
- Collection Schema: [collectionName]Collection in src/content.config.ts
- Required Fields: [list of required fields]
- Optional Fields: [list of optional fields]

### Validation Results:
✅ Frontmatter matches schema requirements
✅ All required fields are present
✅ Field types are correct (string, number, array, object)
✅ Nested objects have required fields
✅ File location is correct

### Implementation Steps:
1. Create file at: `src/content/[collection]/[filename].md`
2. Add content with proper frontmatter
3. Test with `npm run dev` to verify schema validation
4. Commit changes to version control
```

### For Sanity Content:

```
## Sanity Content Validation Report

**Content Type:** Sanity CMS
**Document Type:** [blogPost | caseStudy | person]
**Status:** ✅ Valid / ❌ Invalid

### Content Structure:
- Document Type: [sanityDocumentType]
- Required Fields: [list of required fields]
- Rich Text: [Portable Text blocks]
- Assets: [images, files to upload]

### Validation Results:
✅ Content structure matches simplified schema
✅ All required fields present
✅ Rich text properly formatted
✅ Asset references are valid
✅ Slug format is correct

### Implementation Steps:
1. Open Sanity Studio at [studio URL]
2. Create new [document type] document
3. Fill in provided content structure
4. Upload any required assets
5. Save as draft and preview
6. Publish when ready
```

## Error Handling

### For Astro Collections:
- **Invalid YAML:** Show syntax errors and line numbers
- **Schema Mismatch:** List fields that don't match Zod schema
- **Missing Required Fields:** Identify required fields not present
- **Type Errors:** Show expected vs actual field types

### For Sanity Content:
- **Missing Required Fields:** List required fields not provided
- **Invalid Rich Text:** Show Portable Text formatting issues
- **Asset Problems:** Identify missing images or invalid references
- **Slug Conflicts:** Note if slug already exists



## Important Notes

### Content Strategy Guidelines:

**Choose Astro Collections when:**
- Content updates infrequently (monthly/quarterly)
- SEO performance is critical
- Version control of content is important
- Content is primarily text-based with simple media

**Choose Sanity CMS when:**
- Content updates frequently (weekly/monthly)
- Rich media management is needed
- Multiple non-technical editors need access
- Content has complex relationships

### File Organization:

**Astro Collections:**
- Static pages: `src/content/[collection]/[slug].md`
- Follow naming conventions: kebab-case for files
- Use `-index.md` for collection root pages
- Keep related content in same collection directory

**Sanity Content:**
- Dynamic content managed in Sanity Studio
- Use descriptive slugs for URLs
- Organize with categories/tags
- Plan for content relationships (authors, categories)

## Final Instructions

### For Astro Collections:
1. **Always validate against schema** using `src/content.config.ts`
2. **Check existing content** for formatting examples
3. **Test locally** with `npm run dev` before committing
4. **Verify frontmatter** matches exact schema field names
5. **Use proper YAML syntax** for arrays and objects
6. **Include all required fields** per schema validation
7. **Follow consistent naming** conventions for files and directories

### For Sanity Content:
1. **Use simplified content structure** - no complex page builders
2. **Focus on content-first approach** with Portable Text
3. **Plan asset management** - images, documents, videos
4. **Consider content relationships** - authors, categories, tags
5. **Use draft workflow** - create, preview, then publish
6. **Validate required fields** before publishing
7. **Test preview functionality** to ensure proper rendering

### General Guidelines:
8. **Reference messaging framework** for consistent brand voice
9. **Consider mobile-first** content structure
10. **Plan for SEO** with proper meta tags and keywords
11. **Include accessibility** considerations (alt text, headings)
12. **Test content rendering** across different screen sizes
13. **Validate all links** and asset references
14. **Follow brand guidelines** for tone, style, and formatting