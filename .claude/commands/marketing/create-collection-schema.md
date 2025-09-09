---
description: Creates Astro Content Collection schema definitions based on existing page design documents, with collaborative validation before implementation
---
# Command: Create Collection Schema

## Goal

To guide an AI assistant in creating properly structured Astro Content Collection schema definitions in `src/content.config.ts` based on existing webpage design documents. The process includes collaborative validation to ensure the schema matches the intended page structure and content requirements.

## Process

1. **Receive Schema Request:** User specifies the page design document to use as the basis for schema creation
2. **Read Design Document:** Analyze the webpage design document from `/tasks/page-design-[name].md`
3. **Examine Existing Schema Structure:** Read `src/content.config.ts` to understand current patterns and naming conventions
4. **Design Schema Architecture:** Create collection schema based on page requirements and existing theme component expectations
5. **Phase 1: Present Schema Design:** Show the proposed schema structure and get user validation
6. **Wait for Confirmation:** Pause for user approval with "Go" response
7. **Phase 2: Implement Schema:** Add the collection definition to `src/content.config.ts` and update exports
8. **Create Directory Structure:** Create the corresponding content directory if needed
9. **Validation Test:** Verify schema works with Astro's type system

## Input Requirements

- **Arguments:** Reference to existing page design document (e.g., `digital-caio` for `/tasks/page-design-digital-caio.md`)
- **Prerequisites:** Page design document must exist in `/tasks/` directory
- **Context Files:** Access to existing Astro content collections and theme component structure

## Schema Design Principles

### Astro Collection Best Practices
- Use Zod schema validation with appropriate types
- Follow existing naming conventions from other collections
- Include optional metadata fields (title, meta_title, description)
- Structure complex content as nested objects or arrays
- Align with SyncMaster theme component expectations

### Content Strategy Alignment
- **Static Pages:** Use Astro Collections for infrequently changing content
- **SEO Optimization:** Include proper meta fields and structured data support
- **Component Mapping:** Ensure schema fields map to existing theme components
- **Type Safety:** Leverage Zod validation for content integrity

### Schema Structure Patterns
Based on existing collections, follow these patterns:
- **Hero sections:** `hero: z.object({ title, content, image?, button? })`
- **Feature arrays:** `features: z.array(z.object({ title, description, icon, benefits }))`
- **Use cases:** `use_cases: z.array(z.object({ title, scenario, solution, outcome }))`
- **CTA sections:** `conversion: z.object({ title, subtitle, button })`

## Phase 1: Schema Design Presentation

Present the proposed schema structure in this format:

```markdown
## Proposed Collection Schema for [Collection Name]

### Collection Overview
- **Collection Name:** `[collectionName]`
- **Base Directory:** `src/content/[collection]/`
- **Use Case:** [Brief description of what this collection handles]
- **Pages:** [List of pages this collection will support]

### Schema Structure Analysis
Based on the page design document, I've identified these content sections:

1. **[Section Name]** → `[schemaField]: z.[type]()`
2. **[Section Name]** → `[schemaField]: z.[type]()`
3. **[Additional sections...]**

### Proposed Zod Schema
```typescript
const [collectionName]Collection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/[collection]" }),
  schema: z.object({
    // Core metadata
    title: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    
    // Page sections based on design document
    [field]: z.[type](),
    [field]: z.[type](),
    // ... additional fields
  })
});
```

### Field Validation Rules
- **Required fields:** [List fields that must be present]
- **Optional fields:** [List fields that can be omitted]
- **Array constraints:** [Any min/max length requirements]
- **String validation:** [Character limits or format requirements]

### Component Mapping
- **[Schema Field]** → Maps to `[ThemeComponent]` component
- **[Schema Field]** → Maps to `[ThemeComponent]` component
- **[Additional mappings...]**

### Questions for Validation
1. Does this schema structure match your page design intentions?
2. Are there any additional fields needed that I missed?
3. Should any optional fields be required instead?
4. Do the component mappings look correct for your theme?

**Ready to implement this schema? Respond with 'Go' to proceed.**
```

## Phase 2: Implementation Steps

Once user confirms with "Go":

1. **Add Collection Definition:**
   - Insert the collection definition in `src/content.config.ts` before the exports
   - Follow the existing code style and formatting patterns
   - Add proper TypeScript types and Zod validation

2. **Update Collections Export:**
   - Add the new collection to the `export const collections` object
   - Maintain alphabetical order if that's the existing pattern
   - Ensure proper comma placement and syntax

3. **Create Directory Structure:**
   - Create `src/content/[collection]/` directory if it doesn't exist
   - Add `.gitkeep` file to ensure empty directory is tracked

4. **Validation Check:**
   - Test that Astro can load the new schema without errors
   - Verify TypeScript types are properly generated
   - Confirm the collection appears in Astro's content types

## Phase 3: Update Related Commands

After successful schema implementation, automatically update related Claude commands:

1. **Update create-page-design.md:**
   - Move the new collection from "New Collections to Create" to "Existing Collections"
   - Add description of collection capabilities and schema features
   - Update available collection listings

2. **Update generate-copy-tasks.md:**
   - Add schema-specific validation patterns for the new collection
   - Include field structure guidance (arrays, objects, validation rules)
   - Add any special features (e.g., YouTube video support, optional sections)

3. **Update create-astro-content.md:**
   - Move collection from "New Collections to Create" to "Existing Collections"
   - Add comprehensive description of collection capabilities
   - Update content creation guidance

4. **Confirm Command Updates:**
   - Verify all three commands reflect the new collection availability
   - Ensure schema-specific guidance is accurate and helpful
   - Test command integration with the new collection

## Implementation Requirements

### Schema Field Types
Map design requirements to appropriate Zod types:
- **Text content:** `z.string()` or `z.string().optional()`
- **Rich content:** `z.string()` (markdown content)
- **Images:** `z.string()` (path to image file)
- **Booleans:** `z.boolean()` (enable/disable flags)
- **Arrays:** `z.array(z.object({...}))` for lists of items
- **Objects:** `z.object({...})` for complex nested content
- **Numbers:** `z.number()` for counts, IDs, or numeric values

### Integration Considerations
- **Theme Components:** Ensure schema supports existing SyncMaster components
- **SEO Requirements:** Include proper meta fields for search optimization
- **Performance:** Structure schema for efficient static generation
- **Maintainability:** Use clear field names that match design terminology

### Error Handling
- **Missing Design Document:** Inform user if referenced design doc doesn't exist
- **Invalid Schema:** Check for Zod syntax errors before implementation
- **Duplicate Collection:** Warn if collection name already exists
- **Directory Conflicts:** Handle existing directory structures appropriately

## Output Validation

### Pre-Implementation Checklist
- [ ] Design document exists and is properly analyzed
- [ ] Schema structure matches page design requirements
- [ ] All required content sections have corresponding schema fields
- [ ] Field types are appropriate for the content they'll contain
- [ ] Schema follows existing collection patterns and naming conventions
- [ ] Component mapping is clear and feasible

### Post-Implementation Verification
- [ ] Collection definition added to `src/content.config.ts`
- [ ] Collection properly exported in collections object
- [ ] Content directory created with proper structure
- [ ] Astro development server restarts without schema errors
- [ ] TypeScript types generated correctly for the new collection
- [ ] Related Claude commands updated with new collection information
- [ ] Command workflow integration tested and validated

## Final Instructions

1. **Always start by reading the referenced page design document** to understand content requirements
2. **Examine existing collections** in `src/content.config.ts` for patterns and naming conventions
3. **Map design sections to schema fields** using appropriate Zod types
4. **Consider component compatibility** with existing SyncMaster theme components
5. **Include proper metadata fields** for SEO and page management
6. **Validate schema structure** with user before implementation
7. **Test implementation** to ensure Astro accepts the new schema
8. **Automatically update related commands** with new collection information
9. **Document any assumptions** or decisions made during schema design
10. **Provide clear component mapping** for content creators
11. **Consider future extensibility** when designing the schema structure
12. **Verify command workflow integration** to ensure seamless content creation process

## Integration with Existing Workflow

This command fits into the content creation workflow:
1. **create-page-design** → Creates page requirements and structure
2. **create-collection-schema** → Translates design into Astro schema AND automatically updates all related commands (THIS COMMAND)
3. **generate-copy-tasks** → Maps schema fields to specific content needs (now aware of new collection)
4. **create-astro-content** → Generates actual content files matching the schema (now supports new collection)

**Automated Command Updates:** This command automatically updates `create-page-design.md`, `generate-copy-tasks.md`, and `create-astro-content.md` to reflect the new collection availability, ensuring seamless workflow integration without manual maintenance.

## Context Files to Reference

- Page Design Document: `/tasks/page-design-[name].md`
- Astro Content Schema: `src/content.config.ts`
- Product Overview: `/docs/product-overview.md`
- Messaging Framework: `/docs/context/messaging-framework.md`
- Existing Content Examples: `src/content/[collection]/-index.md`

## Notes for Schema Design

- **Flexibility vs Structure:** Balance between flexible content structure and type safety
- **Component Reuse:** Leverage existing theme components rather than requiring custom development
- **Content Editor Experience:** Consider how content creators will work with the schema
- **Migration Considerations:** Plan for potential schema updates and content migration needs
- **Performance Impact:** Structure schema for optimal static site generation performance