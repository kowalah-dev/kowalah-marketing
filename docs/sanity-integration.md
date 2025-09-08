# Sanity CMS Integration for Kowalah Marketing Site

## Overview

This document outlines the simplified Sanity CMS integration approach for the Kowalah marketing website, moving away from complex block-based page building to a more streamlined content management approach.

## Integration Setup

### Packages Installed
- `@sanity/astro` - Official Astro integration
- `@sanity/client` - Sanity client for data fetching  
- `@sanity/image-url` - Image URL helper
- `astro-portabletext` - For rich text content rendering

### Configuration
- **Project ID**: `ig58e610` (shared with main Kowalah app)
- **Dataset**: `production`
- **Environment**: Uses same credentials as main application

## Simplified Content Approach

### Moving from Complex Blocks to Simple Content Types

**Previous Approach (Complex):**
- Page builder with nested component blocks
- Complex schema relationships  
- Dynamic component rendering
- Heavy client-side processing

**New Approach (Simplified):**
- Standard content types (pages, blog posts, etc.)
- Rich text fields with Portable Text
- Simple image and metadata fields
- Server-side rendering with Astro

### Recommended Content Types

#### 1. Blog Posts
```typescript
{
  _type: 'blogPost',
  title: string,
  slug: {current: string},
  excerpt: string,
  content: PortableText, // Rich text content
  featuredImage: SanityImage,
  publishedAt: datetime,
  author: reference,
  categories: reference[]
}
```

#### 2. Pages (Homepage, About, etc.)
```typescript
{
  _type: 'page',
  title: string,
  slug: {current: string},
  seo: {
    title: string,
    description: string,
    image: SanityImage
  },
  content: PortableText, // Main content area
  sections?: {
    _type: string,
    title?: string,
    content?: PortableText,
    image?: SanityImage
  }[]
}
```

#### 3. Simple Reusable Content
```typescript
{
  _type: 'contentBlock',
  identifier: string, // e.g., 'hero-cta', 'footer-text'
  title: string,
  content: PortableText,
  image?: SanityImage
}
```

## Usage Patterns

### Fetching Content in Astro
```typescript
---
import { client } from '../lib/sanity';

// Get a single page
const page = await client.fetch(`
  *[_type == "page" && slug.current == $slug][0] {
    title,
    content,
    seo,
    "image": featuredImage.asset
  }
`, { slug: Astro.params.slug });
---
```

### Rendering Rich Text
```astro
---
import { PortableText } from 'astro-portabletext';
---

<PortableText value={page.content} />
```

### Image Handling
```astro
---
import { urlFor } from '../lib/sanity';
---

{page.image && (
  <img 
    src={urlFor(page.image).width(800).height(400).url()} 
    alt={page.title} 
  />
)}
```

## Benefits of Simplified Approach

### For Developers
- **Faster builds** - Less complex data fetching and processing
- **Better caching** - Static generation with simple content structure
- **Easier maintenance** - Standard patterns instead of custom block logic
- **Type safety** - Clear, predictable content shapes

### For Content Editors
- **Familiar editing** - Standard rich text editing experience
- **Faster editing** - No complex component configuration
- **More reliable** - Fewer moving parts, less chance of breaking
- **Better preview** - Clearer content structure

### For Performance
- **Static generation** - All content can be pre-rendered
- **Smaller bundles** - No complex client-side component logic
- **Better SEO** - Server-side rendered content
- **Faster page loads** - Optimized images and content delivery

## Migration Strategy

### From Complex Blocks to Simple Content

1. **Content audit** - Identify existing page components
2. **Schema simplification** - Create new simplified schemas
3. **Content migration** - Move existing content to simpler structure
4. **Template updates** - Update Astro templates to use new content structure

### Example: Hero Section Migration

**Before (Complex Block):**
```javascript
// Complex hero block with multiple sub-components
{
  _type: 'heroBlock',
  components: [
    { _type: 'headline', text: 'Title' },
    { _type: 'subtitle', text: 'Subtitle' },
    { _type: 'ctaButton', text: 'CTA', link: '/signup' }
  ]
}
```

**After (Simple Content):**
```javascript
// Simple hero content
{
  _type: 'page',
  title: 'Homepage',
  hero: {
    title: 'Title',
    subtitle: 'Subtitle', 
    cta: { text: 'CTA', url: '/signup' }
  }
}
```

## Testing

Visit `/sanity-test` to verify the connection is working and see available content types.

## Next Steps

1. **Content audit** - Review existing Sanity content structure
2. **Schema design** - Create simplified schemas for marketing content
3. **Template creation** - Build Astro templates for each content type
4. **Content migration** - Move existing content to new structure
5. **SEO optimization** - Ensure proper meta tags and structured data