# Templates Collection Schema

This document defines the complete schema for templates in the Kowalah marketing website templates collection.

## Location

Templates are stored in: `src/content/templates/`

Each template is a Markdown file with YAML frontmatter and markdown content.

## Schema Structure

```typescript
{
  title: string,                    // Template title (e.g., "AI Usage Policy Template")
  meta_title: string (optional),    // SEO meta title
  description: string,              // Template description for SEO and listing

  template_type: enum [             // Type of template (determines icon displayed)
    "policy",                       // → DocumentTextIcon (document policies)
    "evaluation",                   // → TableCellsIcon (comparison/evaluation matrices)
    "deployment",                   // → RocketLaunchIcon (implementation guides)
    "job-description",              // → BriefcaseIcon (role descriptions)
    "program-template"              // → FolderIcon (program frameworks)
  ],

  category: string,                 // Template category (e.g., "Governance & Risk")

  hero: {                          // Hero section at top of page
    title: string,
    subtitle: string,
    image: string,                  // Path to hero image
    badge: string (optional)        // e.g., "Most Popular", "New"
  },

  overview: {                      // "What's Inside This Template" section
    who_its_for: string,           // Target audience
    when_to_use: string,           // When to use this template
    key_benefit: string,           // Primary benefit
    sections_included: string[]    // List of sections in the template
  },

  how_to_use: {                    // "How to Use This Template" section
    title: string (optional),
    steps: [
      {
        title: string,
        description: string,
        icon: string (optional)     // Icon name (not used currently)
      }
    ]
  },

  faq: {                           // FAQ section for Answer Engine Optimization
    title: string (optional),
    subtitle: string (optional),
    questions: [
      {
        question: string,
        answer: string
      }
    ]
  },

  related_templates: string[] (optional),  // Array of template slugs

  external_resources: {            // Optional links to external comprehensive resources
    google_doc: {
      url: string,                 // URL to Google Doc
      label: string                // Button label (default: "Open in Google Docs")
    } (optional)
  } (optional),

  cta: {                           // Call-to-action section at bottom
    title: string,
    content: string,
    button_label: string,
    button_link: string
  },

  draft: boolean (optional),       // If true, template won't be published
  featured: boolean (optional)     // If true, appears in featured section
}
```

## Template Type Icons

The `template_type` field determines which icon displays in the overview section:

- `"policy"` → 📄 DocumentTextIcon (for policies and governance documents)
- `"evaluation"` → 📊 TableCellsIcon (for comparison/evaluation guides)
- `"deployment"` → 🚀 RocketLaunchIcon (for implementation/deployment guides)
- `"job-description"` → 💼 BriefcaseIcon (for job descriptions and role templates)
- `"program-template"` → 📁 FolderIcon (for program frameworks and structures)

## File Naming Convention

Template files should use kebab-case naming:
- `ai-policy-template.md`
- `chatgpt-evaluation-guide.md`
- `caio-job-description.md`

The filename becomes the template slug in the URL: `/resources/templates/[filename-without-extension]`

## Content Structure

After the frontmatter, the markdown content should follow this structure:

```markdown
***NOTE**: To use this template, copy the content using the "Copy page" button above, then customize for your organization.*

# [Template Title]

[Main template content in markdown format]

## Section 1

[Content...]

## Section 2

[Content...]

---

# Implementation Notes

[Any implementation guidance, customization notes, or additional context]
```

## Example Values

### Category Options
- "Governance & Risk"
- "Implementation & Deployment"
- "Talent & Hiring"
- "Strategy & Planning"
- "Change Management"

### Badge Options
- "Most Popular"
- "New"
- "Updated"
- "Essential"

## Answer Engine Optimization (AEO)

Templates should include comprehensive FAQ sections to optimize for LLM parsing and citation. FAQs should:
- Answer common questions about the template
- Provide context about when and how to use it
- Explain key decisions and approaches
- Include 5-10 questions minimum
