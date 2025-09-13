# Content Architecture Guide

## Overview

This guide explains the two primary content management patterns used in the Kowalah marketing site, helping developers choose the right approach for different content types and avoid architectural mismatches.

## Content Management Patterns

### Pattern 1: Static Pages with Markdown Content Files

**When to Use:**
- Single, unique pages (product overviews, company pages, landing pages)
- Content that doesn't share a schema with other pages
- Pages where each one has unique sections and requirements

**Architecture:**
```
Content File → Gray-matter Parser → Astro Page → Theme Components
```

**File Structure:**
```
src/
├── content/
│   └── product/
│       ├── accelerators.md
│       └── expert-requests.md
├── lib/
│   └── utils/
│       └── markdown.ts
└── pages/
    └── product/
        ├── accelerators.astro
        └── expert-requests.astro
```

**Implementation Steps:**

1. **Create Content File** in `src/content/[category]/[page-name].md`
   ```markdown
   ---
   title: "Page Title"
   meta_title: "SEO Title"
   description: "Meta description"

   hero:
     title: "Hero Title"
     subtitle: "Hero subtitle"

   section_name:
     title: "Section Title"
     items:
       - name: "Item 1"
         description: "Description"
   ---

   # Optional markdown content here
   ```

2. **Create Static Astro Page** in `src/pages/[category]/[page-name].astro`
   ```astro
   ---
   import { getMarkdownData } from "@/lib/utils/markdown";
   import Base from "@/layouts/Base.astro";
   import ImageMod from "@/components/ImageMod.astro";
   import Button from "@/shortcodes/Button";

   const pageData = getMarkdownData("category/page-name.md");
   ---

   <Base title={pageData.title} meta_title={pageData.meta_title} description={pageData.description}>
     <!-- Use theme components -->
     <section class="section-sm pt-24 bg-gradient">
       <div class="container">
         <h1 class="h1 text-dark">{pageData.hero.title}</h1>
         <!-- More sections using pageData -->
       </div>
     </section>
   </Base>
   ```

3. **Use Theme Components Consistently**
   - `ImageMod` for responsive images
   - `Button` for CTAs with consistent styling
   - `Icon` from astro-icon/components
   - Standard CSS classes: `section`, `container`, `h1`, `h2`, etc.

**Advantages:**
- No schema constraints
- Flexible content structure per page
- Fast static generation
- Simple content editing

**Example Pages:**
- `/product/accelerators`
- `/product/expert-requests`

### Pattern 2: Collections for Similar Content Types

**When to Use:**
- Multiple content items sharing the same schema
- Dynamic routing needed (`[slug].astro`)
- Content that benefits from consistent structure
- Blog posts, case studies, individual accelerator pages

**Architecture:**
```
Content Collection → Zod Schema → Dynamic Route → Template
```

**File Structure:**
```
src/
├── content/
│   └── blog/
│       ├── post-1.md
│       ├── post-2.md
│       └── post-3.md
├── content.config.ts
└── pages/
    └── blog/
        └── [slug].astro
```

**Implementation Steps:**

1. **Define Collection Schema** in `src/content.config.ts`
   ```typescript
   import { defineCollection, z } from 'astro:content';

   const blogCollection = defineCollection({
     type: 'content',
     schema: z.object({
       title: z.string(),
       description: z.string(),
       publishedAt: z.date(),
       author: z.string(),
       tags: z.array(z.string()).optional(),
     }),
   });

   export const collections = {
     blog: blogCollection,
   };
   ```

2. **Create Content Files** in `src/content/blog/`
   ```markdown
   ---
   title: "Blog Post Title"
   description: "Post description"
   publishedAt: 2025-01-15
   author: "Author Name"
   tags: ["AI", "Strategy"]
   ---

   # Blog post content here
   ```

3. **Create Dynamic Route** in `src/pages/blog/[slug].astro`
   ```astro
   ---
   import { getCollection, type CollectionEntry } from 'astro:content';
   import Base from '@/layouts/Base.astro';

   export async function getStaticPaths() {
     const posts = await getCollection('blog');
     return posts.map((post) => ({
       params: { slug: post.slug },
       props: { post },
     }));
   }

   type Props = {
     post: CollectionEntry<'blog'>;
   };

   const { post } = Astro.props;
   const { Content } = await post.render();
   ---

   <Base title={post.data.title}>
     <article>
       <h1>{post.data.title}</h1>
       <Content />
     </article>
   </Base>
   ```

**Advantages:**
- Type safety with Zod validation
- Consistent content structure
- Automatic slug generation
- Built-in content processing

**Use Cases:**
- Blog posts
- Case studies
- Individual accelerator detail pages
- Team member profiles

## Custom Markdown Parser

For static pages, we use a custom markdown parser to avoid collection constraints:

> **Important**: Files can live in `src/content/` without being collections! The key is **not defining them** in `content.config.ts`. Only files explicitly defined as collections in `content.config.ts` are subject to schema validation.

**File:** `src/lib/utils/markdown.ts`
```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getMarkdownData(filePath: string) {
  const fullPath = path.join(process.cwd(), 'src', 'content', filePath);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);
  return data;
}
```

**Benefits:**
- No schema validation constraints
- Flexible frontmatter structure
- Works with files outside content collections
- Simple implementation

## Theme Components Integration

Both patterns should use consistent theme components:

### Core Components
- `Base.astro` - Main layout wrapper
- `ImageMod.astro` - Responsive image component
- `Button` - Consistent CTA styling
- `AcceleratorCarousel.astro` - Product showcase carousel
- `CallToAction.astro` - Footer CTA section

### Styling Classes
- `section` - Standard section spacing
- `section-sm` - Smaller section padding
- `container` - Content width constraints
- `bg-gradient` - Brand gradient background
- `h1`, `h2`, `h3` - Typography hierarchy
- `text-dark`, `text-light` - Color variants

### Icons
Use `astro-icon/components` for consistent iconography:
```astro
import { Icon } from "astro-icon/components";

<Icon name="check" size={20} class="text-primary" />
```

## Decision Framework

### Choose Static Pages When:
- ✅ Each page has unique content structure
- ✅ No shared schema across pages
- ✅ Content doesn't need dynamic routing
- ✅ Simple content management needs

### Choose Collections When:
- ✅ Multiple items share the same schema
- ✅ Need dynamic routing with `[slug].astro`
- ✅ Want type safety and validation
- ✅ Content benefits from consistent structure

### Anti-Patterns to Avoid:
- ❌ Using collections for single overview pages
- ❌ Forcing schema constraints on unique pages
- ❌ Creating collections with only one item
- ❌ Mixing inconsistent styling between pages

## Migration Examples

### From Collection to Static Page

**Before (Problem):**
```typescript
// content.config.ts - Unnecessary collection
const productCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    difficulty: z.string(), // Only needed for some products
  }),
});
```

**After (Solution):**
```typescript
// Remove collection entirely
// Create: src/data/product/accelerators.md
// Create: src/pages/product/accelerators.astro
```

### From Static to Collection

**Before (Problem):**
```
src/pages/blog/post-1.astro
src/pages/blog/post-2.astro
src/pages/blog/post-3.astro  // Repetitive structure
```

**After (Solution):**
```
src/content/blog/post-1.md
src/content/blog/post-2.md
src/content/blog/post-3.md
src/pages/blog/[slug].astro  // Single template
```

## Best Practices

### Content Organization
- Static pages: `src/content/[category]/[page-name].md` (not defined as collections)
- Collections: `src/content/[collection]/[item-name].md` (with schema in `content.config.ts`)
- Keep related content grouped by category

### File Naming
- Use kebab-case for file names
- Match directory structure to URL structure
- Use descriptive names that match content purpose

### Schema Design
- Only include fields used across all items
- Use optional fields sparingly
- Validate required content with Zod

### Performance
- Static pages generate faster (no collection processing)
- Collections provide better type safety
- Both support full static site generation

## Troubleshooting

### Common Errors

**"Cannot read properties of undefined"**
- Check markdown frontmatter data paths
- Verify `getMarkdownData` file path is correct
- Ensure frontmatter structure matches component usage

**Schema Validation Errors**
- Verify all collection items have required fields
- Check that optional fields are properly marked
- Ensure data types match schema definition

**Build Failures**
- Static pages build independently
- Collection errors affect entire build
- Check for missing imports or malformed frontmatter

### Debug Tips
- Use `console.log(pageData)` to inspect markdown data
- Check browser network tab for 404s on missing content
- Verify file paths match import statements exactly

## Conclusion

This architecture provides flexibility for unique pages while maintaining consistency for similar content. Choose the pattern that matches your content's natural structure, and always prioritize maintainability and editor experience.

Remember: Collections are for similar items, static pages are for unique content.