# Kowalah Marketing Design System

This document outlines the core brand elements and design guidelines for Kowalah's marketing website. Since we're using a pre-built Astro template, this focuses on brand consistency rather than component creation.

## Brand Colors

### Primary Brand Colors
- **Primary**: `#fa26a0` (Kowalah Pink) - Use for primary CTAs, links, and brand accents
- **Secondary**: `#ae10e3` (Kowalah Purple) - Use for secondary actions and complementary elements

### Usage Guidelines
```css
/* Primary brand color applications */
.btn-primary { background-color: #fa26a0; }
.link-primary { color: #fa26a0; }
.accent-primary { border-color: #fa26a0; }

/* Secondary brand color applications */
.btn-secondary { background-color: #ae10e3; }
.link-secondary { color: #ae10e3; }
.accent-secondary { border-color: #ae10e3; }
```

### Supporting Colors
- **Success**: `#22c55e` (green) - Use for positive states, success messages
- **Warning**: `#f59e0b` (amber) - Use for warnings, important notices  
- **Danger**: `#ef4444` (red) - Use for errors, destructive actions
- **Info**: `#3b82f6` (blue) - Use for informational content

## Typography

### Font Families
- **Primary Font**: Inter (body text, buttons, UI elements)
  - Already configured in template: `Inter:wght@400;500`
  - Use for: Body text, buttons, navigation, forms, captions
- **Secondary Font**: Be Vietnam Pro (headings, emphasis)
  - Already configured in template: `Be+Vietnam+Pro:wght@500;600`
  - Use for: Headings, hero text, section titles, emphasis

### Hierarchy
- **H1 (Page Titles)**: `text-4xl sm:text-5xl lg:text-6xl font-bold` - Hero headlines, main page titles
- **H2 (Section Titles)**: `text-2xl sm:text-3xl lg:text-4xl font-bold` - Major section headers
- **H3 (Subsection Titles)**: `text-xl sm:text-2xl font-semibold` - Subsection headers, feature titles
- **H4 (Component Titles)**: `text-lg sm:text-xl font-semibold` - Card titles, smaller headings
- **Body Text**: `text-base sm:text-lg leading-relaxed` - Main content, descriptions
- **Small Text**: `text-sm leading-normal` - Captions, meta information, footnotes

### Font Weights
- **Bold** (`font-bold`): Headlines, important CTAs
- **Semibold** (`font-semibold`): Subheadings, emphasis
- **Medium** (`font-medium`): Button text, links
- **Regular** (`font-normal`): Body text, descriptions

## Color Applications for Marketing

### Call-to-Action Buttons
```css
/* Primary CTA - Use Kowalah Pink */
.cta-primary {
  background-color: #fa26a0;
  color: white;
  border: 2px solid #fa26a0;
}

.cta-primary:hover {
  background-color: #e91e94;
  border-color: #e91e94;
}

/* Secondary CTA - Use Kowalah Purple */
.cta-secondary {
  background-color: #ae10e3;
  color: white;
  border: 2px solid #ae10e3;
}

.cta-secondary:hover {
  background-color: #9c0dd0;
  border-color: #9c0dd0;
}
```

### Text Links
```css
/* Primary links */
.link {
  color: #fa26a0;
  text-decoration: underline;
}

.link:hover {
  color: #e91e94;
}
```

### Accent Elements
- Use brand colors sparingly for visual accents
- Icons, borders, and highlights should use primary or secondary colors
- Maintain sufficient contrast for accessibility (minimum 4.5:1 ratio)

## Template Customization Guidelines

### Updating Template Colors
When customizing the purchased template:

1. **Replace template primary color** with `#fa26a0`
2. **Replace template secondary color** with `#ae10e3`
3. **Update button styles** to use Kowalah brand colors
4. **Customize navigation links** to use brand colors
5. **Update form focus states** to use primary color

### Maintaining Brand Consistency
- Always use official Kowalah colors for brand elements
- Ensure all interactive elements (buttons, links) use brand colors
- Keep neutral colors (grays, whites) from template for backgrounds and text
- Test color combinations for accessibility compliance

## Content Tone & Voice

### Voice Characteristics
- **Professional yet approachable** - We're serious about AI adoption but not intimidating
- **Confident and knowledgeable** - We know AI transformation inside and out  
- **Empowering** - We help companies succeed with AI, not just sell software
- **Clear and direct** - Avoid jargon, explain complex concepts simply

### Messaging Themes
- **AI transformation expertise** - We're the digital chief AI officer
- **Proven methodology** - Our approach works for companies of 1,000-10,000 employees
- **Accelerated adoption** - We speed up AI implementation across organizations
- **Business results** - Focus on outcomes, not just features

## Implementation Notes

Since we're using a pre-built template, focus on:
1. **Color replacement** in template's CSS/Tailwind configuration  
2. **Typography consistency** using the scales defined above
3. **Brand voice** in all copy and content
4. **Visual hierarchy** using proper heading levels and spacing

This keeps the design system lean while ensuring strong Kowalah brand presence throughout the marketing site.