---
description: Creates Astro Content Collection files with proper schema validation for the Kowalah marketing website
---
# Command: Create Astro Content

## Goal

To guide the creation of properly formatted Astro Content Collection files for the Kowalah marketing website, ensuring they match the existing schema structure and follow best practices.

## Content Collections Available

**Existing Collections:**
- `homepage` - Homepage content with hero, features, offerings, benefits, pricing
- `features` - Feature pages with grids and detailed sections  
- `pricing` - Pricing tiers with comparison tables
- `company` - About, team, careers, values
- `contact` - Contact forms and information
- `faq` - Frequently asked questions
- `pages` - General pages (legal, terms, etc.)

**New Collections to Create:**
- `product` - AI capability pages (Strategy, Implementation, Governance, etc.)
- `solutions` - Industry and role-based solution pages
- `openai` - OpenAI-specific content and guidance

## Process

1. **Receive Content Request:** User specifies collection type and page details
2. **Read Schema:** Examine `src/content.config.ts` to understand field requirements
3. **Check Existing Content:** Review similar content files for structure reference
4. **Generate Content File:** Create properly formatted markdown with frontmatter
5. **Validate Schema:** Ensure all required fields are present and correctly typed
6. **Provide File Location:** Show exact path and filename for the content

## Schema Understanding

Before creating content, always:
- Read the specific collection schema from `src/content.config.ts`
- Understand required vs optional fields
- Note field types (string, number, array, object, boolean)
- Check validation rules and constraints
- Review nested object structures

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

## Validation Checklist

Before creating the file, verify:
- [ ] Collection exists in `src/content.config.ts`
- [ ] All required fields are included
- [ ] Field types match schema (string, number, array, object)
- [ ] Nested objects have required sub-fields
- [ ] Arrays contain properly structured items
- [ ] File path follows collection directory structure
- [ ] Filename uses kebab-case convention

## Output Format

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
- Image paths should reference files in `/public/images/`

## Final Instructions

1. **Always read the collection schema first** from `src/content.config.ts`
2. **Check existing content files** in the same collection for reference
3. **Use exact field names** from schema definitions
4. **Validate YAML syntax** with proper indentation and quotes
5. **Include all required fields** and mark optional fields clearly
6. **Follow Kowalah messaging guidelines** from context files
7. **Test locally** with `npm run dev` before confirming creation
8. **Provide clear file path** and implementation instructions
9. **Reference existing components** that will render this content
10. **Consider SEO** with proper meta tags and structured data

## Context Files to Reference

- `src/content.config.ts` - Schema definitions
- `src/content/[collection]/-index.md` - Collection examples
- `/docs/context/messaging-framework.md` - Messaging guidelines
- `/docs/context/positioning-canvas.md` - Brand positioning
- `/docs/product-overview.md` - Product details and features