---
name: template-creator
description: Create new ChatGPT Enterprise templates for the Kowalah marketing website following the established content collection schema. Use when the user requests to create a new template resource (policy, evaluation guide, deployment checklist, job description, or program framework) for the /resources/templates section.
---

# Template Creator

## Overview

Create comprehensive, SEO-optimized templates for the Kowalah marketing website templates collection. This skill guides the creation of templates that follow the established schema, include proper frontmatter, and optimize for Answer Engine Optimization (AEO) through structured FAQs.

## When to Use This Skill

Use this skill when the user requests to create:
- AI policy templates
- ChatGPT Enterprise evaluation guides
- Deployment checklists and implementation guides
- Chief AI Officer or AI-related job descriptions
- AI program frameworks or templates
- Any other downloadable template resource for the `/resources/templates` section

## Template Creation Workflow

### Step 1: Gather Template Requirements

Before creating the template, understand the following from the user:

1. **Template Purpose**: What problem does this template solve?
2. **Target Audience**: Who will use this template (CIOs, CHROs, CTOs, etc.)?
3. **Template Type**: Which category does it fall into?
   - `policy` - Governance documents and policies
   - `evaluation` - Comparison/evaluation guides
   - `deployment` - Implementation and deployment guides
   - `job-description` - Role descriptions
   - `program-template` - Program frameworks
4. **Content Structure**: What sections should the template include?
5. **Key Differentiators**: What makes this template valuable?

### Step 2: Review the Schema

Load the schema reference to understand the complete template structure:

```bash
Read: .claude/skills/template-creator/references/template-schema.md
```

This reference contains:
- Complete TypeScript schema definition
- Field descriptions and requirements
- Template type icon mappings
- File naming conventions
- Content structure guidelines

### Step 3: Start with the Template Example

Copy the template example as a starting point:

```bash
Read: .claude/skills/template-creator/assets/template-example.md
```

This asset file provides:
- Complete frontmatter structure with all required fields
- Placeholder values showing the expected format
- Example content structure
- Implementation notes section

### Step 4: Create the Template Frontmatter

Fill in the YAML frontmatter with specific values:

#### Required Fields
- `title`: Clear, descriptive template name
- `description`: SEO-optimized description (150-160 characters)
- `template_type`: Choose from: policy, evaluation, deployment, job-description, program-template
- `category`: Template category (e.g., "Governance & Risk", "Implementation & Deployment")

#### Hero Section
- `hero.title`: Template title (can match main title or be variant)
- `hero.subtitle`: Compelling value proposition
- `hero.image`: Path to hero image (format: `/images/templates/[slug]-hero.jpg`)
- `hero.badge`: Optional badge (Most Popular, New, Updated, Essential)

#### Overview Section
- `overview.who_its_for`: Specific target audience and roles
- `overview.when_to_use`: Timing and situations for use
- `overview.key_benefit`: Primary value proposition
- `overview.sections_included`: Array of section names (5-10 items)

#### How to Use Steps
Keep the standard 4-step process:
1. Copy the template
2. Customize for organization
3. Review with stakeholders
4. Deploy and iterate

Adjust descriptions to match the specific template type.

#### FAQ Section
Create 5-10 questions optimized for Answer Engine Optimization:
- Answer common objections
- Explain key decisions and approaches
- Provide implementation context
- Address "how is this different from X" questions
- Include timing/frequency questions

#### CTA Section
- `cta.title`: Call-to-action heading
- `cta.content`: How Kowalah can help beyond the template
- `cta.button_label`: Usually "Talk to an Expert"
- `cta.button_link`: Usually "/contact"

#### Optional Fields
- `meta_title`: If different from title
- `related_templates`: Array of related template slugs
- `draft`: Set to `true` to hide from production
- `featured`: Set to `true` for homepage featuring

### Step 5: Write the Template Content

After the frontmatter, create the markdown content:

#### Start with Usage Note
Always begin with:
```markdown
***NOTE**: To use this template, copy the content using the "Copy page" button above, then customize for your organization.*
```

#### Content Structure
Organize content using clear markdown hierarchy:
- `# Heading 1` for main title
- `## Heading 2` for major sections
- `### Heading 3` for subsections
- Use lists, tables, and emphasis appropriately

#### Implementation Notes
End with an Implementation Notes section providing:
- Customization guidance
- Contextual factors to consider
- Industry-specific adaptation tips

### Step 6: Save the Template File

Save the template to the correct location:

**Location**: `src/content/templates/[template-slug].md`

**Naming Convention**: Use kebab-case
- ✅ `ai-policy-template.md`
- ✅ `chatgpt-evaluation-guide.md`
- ✅ `caio-job-description.md`
- ❌ `AI_Policy_Template.md`
- ❌ `ChatGPT Evaluation Guide.md`

The filename (without `.md`) becomes the URL slug: `/resources/templates/[filename]`

### Step 7: Verify the Template

After creating the template, verify:

1. **Schema Compliance**: All required frontmatter fields present
2. **Template Type**: Correct `template_type` value (determines icon)
3. **FAQ Quality**: 5-10 substantive questions with detailed answers
4. **Content Structure**: Proper markdown hierarchy and formatting
5. **File Location**: Saved in `src/content/templates/`
6. **File Naming**: Uses kebab-case naming

### Step 8: Test the Template

Navigate to the template in the development server to verify:

```
http://localhost:4321/resources/templates/[template-slug]
```

Check:
- Hero section displays correctly
- Overview section shows correct icon (based on template_type)
- "Sections Included" list displays with green checkmarks
- Copy page dropdown works with all export options
- FAQ section renders properly
- Related templates link correctly (if specified)

## Template Type Icon Reference

The `template_type` field determines the icon displayed in the overview section:

- `"policy"` → 📄 DocumentTextIcon (governance documents)
- `"evaluation"` → 📊 TableCellsIcon (comparison guides)
- `"deployment"` → 🚀 RocketLaunchIcon (implementation guides)
- `"job-description"` → 💼 BriefcaseIcon (role descriptions)
- `"program-template"` → 📁 FolderIcon (program frameworks)

## Answer Engine Optimization (AEO) Best Practices

Templates should be optimized for LLMs to parse and cite:

### FAQ Quality
- Write 5-10 substantive questions
- Provide detailed, informative answers (2-4 sentences minimum)
- Address common objections and concerns
- Explain key decisions and trade-offs
- Include timing, frequency, and process questions

### Content Structure
- Use clear heading hierarchy
- Include tables for comparisons
- Use lists for step-by-step instructions
- Add bold emphasis for key concepts
- Keep paragraphs focused and scannable

### SEO Elements
- `meta_title`: Includes target keywords and "| Kowalah"
- `description`: 150-160 characters with primary keywords
- `hero.title`: Clear, keyword-rich title
- `overview` fields: Include target audience and use case keywords

## Common Template Categories

Use these categories for consistency:

- **Governance & Risk**: Policies, compliance frameworks, risk assessments
- **Implementation & Deployment**: Rollout guides, deployment checklists
- **Talent & Hiring**: Job descriptions, interview guides, onboarding plans
- **Strategy & Planning**: Strategic frameworks, planning templates
- **Change Management**: Adoption plans, communication templates

## Resources

### references/template-schema.md
Complete schema definition with:
- TypeScript interface
- All field descriptions
- Template type mappings
- File naming conventions
- Content structure guidelines

### assets/template-example.md
Template boilerplate with:
- Complete frontmatter structure
- All required and optional fields
- Example content sections
- Implementation notes template

---

## Example Usage

**User Request:** "Create a ChatGPT Enterprise Evaluation Guide template"

**Workflow:**
1. Gather requirements about what the evaluation guide should cover
2. Read `references/template-schema.md` to understand schema
3. Read `assets/template-example.md` for structure
4. Create frontmatter with:
   - `template_type: "evaluation"` (→ TableCellsIcon)
   - `category: "Implementation & Deployment"`
   - Comprehensive FAQ about evaluation criteria
5. Write content covering evaluation framework, comparison matrices, decision criteria
6. Save as `src/content/templates/chatgpt-evaluation-guide.md`
7. Verify template displays correctly with table icon in overview
