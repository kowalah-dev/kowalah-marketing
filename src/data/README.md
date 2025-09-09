# Accelerator Data Management

This directory contains the accelerator data used for the marketing website showcase.

## Files

- `accelerators.json` - Contains all accelerator data, categories, and featured list
- `README.md` - This documentation file

## Data Structure

### For Each Accelerator, You Need:

```json
{
  "id": "unique-slug-id",           // Unique identifier (will match Supabase)
  "title": "Accelerator Name",      // Display name
  "description": "Short description for cards (150-200 chars)",
  "category": "AI Strategy",        // Must match category names below
  "type": "Prompt Template",        // Type of accelerator
  "difficulty": "Advanced",         // Beginner | Intermediate | Advanced  
  "image": "/images/path/to/screenshot.png",  // Screenshot path
  "duration": "30 minutes setup",   // Time to complete/setup
  "outcomes": ["Outcome 1", "Outcome 2"],     // What users achieve
  "featured": true                  // Whether to show in carousel
}
```

### Categories Available:

- **AI Strategy** - Strategic planning and executive decision-making
- **Training** - Educational materials and workshops  
- **Governance** - Policies, frameworks, and compliance
- **Change Management** - Organizational transformation tools
- **Measurement** - ROI tracking and success measurement
- **Workflows** - Department-specific AI workflows
- **Prompts** - Professional prompt libraries
- **Integration** - Enterprise system connections

## How to Update:

1. **Add New Accelerator:**
   - Add entry to `accelerators` array in `accelerators.json`
   - Add screenshot to `/public/images/accelerators/` (recommended)
   - Set `featured: true` if you want it in the carousel

2. **Update Featured List:**
   - Modify the `featured` array with accelerator IDs you want to showcase
   - Recommend showing 5-6 diverse accelerators

3. **Change Categories:**
   - Update the `categories` object
   - Ensure all accelerators use valid category names

## Image Requirements:

- **Aspect Ratio:** 4:2.5 (400x250px recommended)
- **Format:** PNG or WebP
- **Content:** Screenshot of the accelerator detail page from your platform
- **Location:** `/public/images/accelerators/accelerator-name.png`

## Future Enhancement:

This JSON structure matches what you'll need for Supabase integration. When ready to connect to your database:

1. Create API endpoint that returns data in this format
2. Replace `import acceleratorData from '../data/accelerators.json'` with API call
3. Add caching layer for build-time optimization

The TypeScript interfaces in `/src/types/accelerator.ts` already support additional fields for future expansion.