# SSR-Compatible Dynamic Pages Pattern

This document outlines the required pattern for creating dynamic pages in SSR mode with Clerk authentication.

## Background

The Kowalah marketing site uses **Server-Side Rendering (SSR)** to enable Clerk authentication and cross-domain session sharing. This requires a specific pattern for dynamic pages that differs from traditional Astro static site generation.

## The Problem

In traditional Astro static mode:
- `getStaticPaths()` pre-generates all pages at build time
- Props are passed to the page component
- Pages are static HTML files

In SSR mode (required for Clerk):
- `getStaticPaths()` is **ignored** - pages are rendered on-demand
- Props from `getStaticPaths()` are **undefined**
- Attempting to read `undefined.data` causes errors

## The Solution Pattern

All dynamic pages MUST use this SSR-compatible pattern:

```astro
---
import { getEntry, getCollection } from "astro:content";

// getStaticPaths still helps with type inference and development
export async function getStaticPaths() {
  const items = await getCollection("collection-name");

  return items.map((item) => ({
    params: { slug: item.id },
    props: { item },
  }));
}

// Extract URL parameter
const { slug } = Astro.params;

// Try to get item from props (works in static mode)
const { item } = Astro.props;

// CRITICAL: Fallback for SSR mode - fetch data if props are missing
const itemEntry = item || await getEntry("collection-name", slug as string);

// Handle missing content
if (!itemEntry) {
  return Astro.redirect("/404");
}

// Now safe to destructure data
const {
  title,
  description,
  // ... other fields
} = itemEntry.data;
---

<!-- Use itemEntry for rendering -->
<Base title={title} description={description}>
  <!-- Page content -->
</Base>
```

## Key Components Explained

### 1. Parameter Extraction
```astro
const { slug } = Astro.params;
```
Always extract the URL parameter first - available in both static and SSR modes.

### 2. Props with Fallback
```astro
const { item } = Astro.props;
const itemEntry = item || await getEntry("collection-name", slug as string);
```
- Try props first (works in static builds)
- Fallback to `getEntry()` if props are undefined (SSR mode)
- This makes the page work in **both** modes

### 3. Content Validation
```astro
if (!itemEntry) {
  return Astro.redirect("/404");
}
```
Always check if content exists before accessing `.data`

### 4. Safe Data Access
```astro
const { title, description } = itemEntry.data;
```
Only destructure after validating `itemEntry` exists

## Real-World Examples

### Example 1: Solutions Page
**File:** `src/pages/solutions/[slug].astro`

```astro
const { slug } = Astro.params;
const { solution } = Astro.props;

// Fallback for SSR mode
const solutionEntry = solution || await getEntry("solutions", slug as string);

if (!solutionEntry) {
  return Astro.redirect("/404");
}

const { title, hero, benefits } = solutionEntry.data;
```

### Example 2: Regular Pages
**File:** `src/pages/[regular].astro`

```astro
const { regular } = Astro.params;
const { page } = Astro.props;

// Fallback for SSR mode
const pageEntry = page || await getEntry("pages", regular as string);

if (!pageEntry) {
  return Astro.redirect("/404");
}

const { title, meta_title, description } = pageEntry.data;
const { Content } = await render(pageEntry);
```

### Example 3: Insights/Blog Posts
**File:** `src/pages/insights/[single].astro`

```astro
const { single } = Astro.params;
let { post, usingSanity = false } = Astro.props;

// Try Sanity first, then content collection
if (!post) {
  try {
    const sanityPost = await client.fetch(queries.post(single));
    if (sanityPost) {
      post = sanityPost;
      usingSanity = true;
    }
  } catch (error) {
    const contentPost = await getEntry("insights", single as string);
    if (contentPost) {
      post = contentPost;
      usingSanity = false;
    }
  }
}

if (!post) {
  return Astro.redirect("/404");
}
```

## When Creating New Dynamic Pages

### ✅ DO:
- Always extract URL params: `const { slug } = Astro.params;`
- Provide SSR fallback: `item || await getEntry(...)`
- Validate content exists before accessing `.data`
- Use consistent naming: if param is `slug`, use `slug` throughout
- Test in both development (SSR) and production builds

### ❌ DON'T:
- Directly access `Astro.props.item.data` without validation
- Assume `getStaticPaths()` props will always be available
- Skip the fallback `getEntry()` call
- Forget the 404 redirect for missing content

## Template for New Dynamic Pages

```astro
---
import Base from "@/layouts/Base.astro";
import { getEntry, getCollection, render } from "astro:content";

// Type definition (optional but recommended)
type CollectionName = "pages" | "solutions" | "insights" | /* your collection */;

export async function getStaticPaths() {
  const items = await getCollection("your-collection-name" as CollectionName);

  return items.map((item) => ({
    params: {
      slug: item.id, // or item.slug.current for Sanity
    },
    props: { item },
  }));
}

// SSR-compatible data fetching
const { slug } = Astro.params;
const { item } = Astro.props;

// Fallback for SSR mode
const itemEntry = item || await getEntry("your-collection-name", slug as string);

if (!itemEntry) {
  return Astro.redirect("/404");
}

// Safely destructure data
const {
  title,
  meta_title,
  description,
  // ... other fields from your schema
} = itemEntry.data;

// If you need rendered content
const { Content } = await render(itemEntry);
---

<Base title={title} meta_title={meta_title} description={description}>
  <!-- Your page content here -->
  <Content />
</Base>
```

## Troubleshooting

### Error: "Cannot read properties of undefined (reading 'data')"
**Cause:** Attempting to access `.data` on undefined item in SSR mode
**Solution:** Add the fallback pattern: `item || await getEntry(...)`

### Page works in development but fails in production
**Cause:** Different rendering modes between dev and prod
**Solution:** Ensure SSR fallback is implemented for all dynamic pages

### 404 errors for valid content
**Cause:** Collection name mismatch between `getStaticPaths()` and `getEntry()`
**Solution:** Verify collection names are identical in both calls

## Related Documentation

- [Clerk Setup Summary](./CLERK-SETUP-SUMMARY.md) - Authentication configuration
- [Deployment Guide](./DEPLOYMENT.md) - Production deployment steps
- [CLAUDE.md](../CLAUDE.md) - Project overview and architecture
