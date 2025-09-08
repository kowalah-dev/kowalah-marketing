# Phase 4: Sanity Integration for Dynamic Content

## Overview
Set up Sanity CMS integration for dynamic content (blogs, case studies, team members) while keeping static pages in Astro Collections.

## Tasks

### 4.1 Sanity Schema Development

#### 4.1.1 Blog/Insights Schema
- [ ] Create blog post schema in Sanity Studio:
```javascript
// schemas/blogPost.js
export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'person'}
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.max(200)
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}]
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo'
    }
  ]
}
```

#### 4.1.2 Case Study Schema
- [ ] Create case study schema in Sanity Studio:
```javascript
// schemas/caseStudy.js
export default {
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'client',
      title: 'Client',
      type: 'object',
      fields: [
        {name: 'name', title: 'Company Name', type: 'string'},
        {name: 'industry', title: 'Industry', type: 'string'},
        {name: 'size', title: 'Company Size', type: 'string'},
        {name: 'logo', title: 'Logo', type: 'image'}
      ]
    },
    {
      name: 'challenge',
      title: 'Challenge',
      type: 'blockContent'
    },
    {
      name: 'solution',
      title: 'Solution',
      type: 'blockContent'
    },
    {
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'metric', title: 'Metric', type: 'string'},
          {name: 'value', title: 'Value', type: 'string'},
          {name: 'description', title: 'Description', type: 'text'}
        ]
      }]
    },
    {
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      fields: [
        {name: 'quote', title: 'Quote', type: 'text'},
        {name: 'author', title: 'Author', type: 'string'},
        {name: 'title', title: 'Author Title', type: 'string'},
        {name: 'image', title: 'Author Image', type: 'image'}
      ]
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image'
    },
    {
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{type: 'image'}]
    }
  ]
}
```

#### 4.1.3 Supporting Schemas
- [ ] Create Person/Author schema:
```javascript
// schemas/person.js
export default {
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    {name: 'name', title: 'Name', type: 'string'},
    {name: 'slug', title: 'Slug', type: 'slug', options: {source: 'name'}},
    {name: 'image', title: 'Image', type: 'image'},
    {name: 'bio', title: 'Bio', type: 'blockContent'},
    {name: 'role', title: 'Role', type: 'string'},
    {name: 'linkedin', title: 'LinkedIn URL', type: 'url'}
  ]
}
```

- [ ] Create Category schema:
```javascript
// schemas/category.js
export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}},
    {name: 'description', title: 'Description', type: 'text'}
  ]
}
```

- [ ] Create SEO schema:
```javascript
// schemas/seo.js
export default {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {name: 'title', title: 'SEO Title', type: 'string'},
    {name: 'description', title: 'SEO Description', type: 'text'},
    {name: 'image', title: 'SEO Image', type: 'image'}
  ]
}
```

### 4.2 Astro-Sanity Integration Updates

#### 4.2.1 Update Sanity Client Configuration
- [ ] Enhance `src/lib/sanity.ts` with new queries:
```typescript
// Add to existing queries object
export const queries = {
  // ... existing queries ...
  
  // Blog queries
  blogPosts: `*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "featuredImage": featuredImage.asset,
    "author": author->{name, image},
    "categories": categories[]->title
  }`,
  
  blogPost: (slug: string) => `*[_type == "blogPost" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    body,
    excerpt,
    publishedAt,
    "featuredImage": featuredImage.asset,
    "author": author->{name, image, bio, role},
    "categories": categories[]->{title, slug},
    seo
  }`,
  
  // Case study queries
  caseStudies: `*[_type == "caseStudy"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    client,
    "featuredImage": featuredImage.asset,
    "resultsSummary": results[0..2]
  }`,
  
  caseStudy: (slug: string) => `*[_type == "caseStudy" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    client,
    challenge,
    solution,
    results,
    testimonial,
    "featuredImage": featuredImage.asset,
    "gallery": gallery[].asset
  }`
};
```

#### 4.2.2 Create Sanity-Powered Pages
- [ ] Update blog/insights pages to use Sanity:
  - Update `src/pages/insights/index.astro` to fetch from Sanity
  - Update `src/pages/insights/[single].astro` to use Sanity data
  - Remove existing markdown-based insights content

- [ ] Update case study pages:
  - Update `src/pages/case-study/index.astro` to fetch from Sanity
  - Update `src/pages/case-study/[single].astro` to use Sanity data
  - Remove existing markdown-based case studies

#### 4.2.3 Create Portable Text Components
- [ ] Install and configure Portable Text for Astro:
```bash
npm install @portabletext/react @portabletext/types
```

- [ ] Create `src/components/PortableText.astro`:
```typescript
// Component for rendering Sanity's Portable Text in Astro
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

export interface Props {
  content: PortableTextBlock[];
}

const { content } = Astro.props;

const components = {
  types: {
    image: ({value}) => (
      <img 
        src={urlFor(value.asset).width(800).url()} 
        alt={value.alt || ''} 
        class="rounded-lg shadow-md"
      />
    ),
  },
  marks: {
    link: ({children, value}) => (
      <a href={value.href} target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">
        {children}
      </a>
    ),
  },
};
```

### 4.3 Content Migration from Markdown to Sanity

#### 4.3.1 Blog Content Migration
- [ ] Audit existing blog posts in `src/content/insights/`
- [ ] Create migration script to move content to Sanity
- [ ] Migrate author information to Person documents
- [ ] Create appropriate categories
- [ ] Update image references and upload to Sanity

#### 4.3.2 Case Study Content Migration
- [ ] Audit existing case studies in `src/content/case/`
- [ ] Transform case study content to new schema format
- [ ] Create client information objects
- [ ] Migrate images and create galleries where appropriate

### 4.4 Dynamic Content Components

#### 4.4.1 Blog Components
- [ ] Create `src/components/blog/BlogCard.astro`
- [ ] Create `src/components/blog/BlogHero.astro`
- [ ] Create `src/components/blog/AuthorBio.astro`
- [ ] Create `src/components/blog/RelatedPosts.astro`

#### 4.4.2 Case Study Components
- [ ] Create `src/components/case-study/CaseStudyCard.astro`
- [ ] Create `src/components/case-study/ClientInfo.astro`
- [ ] Create `src/components/case-study/ResultsMetrics.astro`
- [ ] Create `src/components/case-study/TestimonialBlock.astro`

### 4.5 SEO and Performance Optimization

#### 4.5.1 SEO Implementation
- [ ] Implement dynamic meta tags based on Sanity SEO data
- [ ] Create Open Graph images for blog posts and case studies
- [ ] Implement structured data (JSON-LD) for articles and case studies
- [ ] Set up canonical URLs and proper pagination

#### 4.5.2 Performance Optimization
- [ ] Implement image optimization for Sanity images
- [ ] Set up proper caching strategies
- [ ] Optimize Sanity queries to fetch only necessary data
- [ ] Implement lazy loading for image galleries

### 4.6 Content Management Workflow

#### 4.6.1 Sanity Studio Setup
- [ ] Configure Sanity Studio with Kowalah branding
- [ ] Set up proper access controls and user roles
- [ ] Create documentation for content editors
- [ ] Set up preview functionality (optional)

#### 4.6.2 Editorial Workflow
- [ ] Define content approval process
- [ ] Set up draft/published states
- [ ] Create content guidelines and style guide
- [ ] Set up automated deployment triggers

## Testing and Quality Assurance

### 4.7 Integration Testing
- [ ] Test Sanity connection and data fetching
- [ ] Verify all blog posts display correctly
- [ ] Test case study pages and components
- [ ] Verify image optimization and loading
- [ ] Test mobile responsiveness
- [ ] Validate SEO meta tags and structured data

### 4.8 Content Validation
- [ ] Verify all migrated content displays correctly
- [ ] Check all internal and external links
- [ ] Validate image alt texts and accessibility
- [ ] Test search functionality (if implemented)

## Completion Criteria
- [ ] Sanity schemas are created and functional
- [ ] All blog posts are migrated and displaying correctly
- [ ] Case studies are properly migrated with rich media
- [ ] SEO implementation is complete and tested
- [ ] Content management workflow is documented
- [ ] Performance benchmarks are met
- [ ] All dynamic pages are mobile-responsive

## Dependencies
- Access to existing blog content and images
- Customer case study permissions and materials
- Sanity Studio access and configuration
- Content team training on new workflow

## Estimated Time
4-6 days

## Next Phase
Proceed to testing, optimization, and deployment preparation