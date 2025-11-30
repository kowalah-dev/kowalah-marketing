# Image Creation Document: Kowalah Reserved

This document specifies all images needed for the Kowalah Reserved page (`/reserved`), organized by priority and creation method.

---

## Overview

| Priority | Image Count | Creation Method |
|----------|-------------|-----------------|
| Priority 1 (Critical) | 1 | Product Screenshot / Mockup |
| Priority 2 (Important) | 0 | - |
| Priority 3 (Enhancement) | 0 | - |

**Note:** The page is designed to work well without images initially. The dark gradients and typography carry the premium aesthetic. Images can be added iteratively.

---

## Priority 1: Critical Images

### 1. Hero Desktop App Visual
**Path:** `/images/reserved/hero-desktop-app.png`
**Dimensions:** 1200×800px
**Purpose:** Hero section product visualization (currently not displayed, but specified in data)

**Creation Method:** Product Screenshot or Mockup

**Specifications:**
- Show the Kowalah Reserved desktop application interface
- Dark theme to match the hero section aesthetic
- Display a strategic conversation in progress
- Subtle Kowalah branding (pink/purple accent colors)
- Professional, premium feel

**Canva/Figma Mockup Approach:**
1. Create a macOS window frame (dark mode)
2. Design a chat interface showing:
   - Left sidebar with workspace folders (corporate-strategy, product, go-to-market, etc.)
   - Main chat area with a strategic conversation
   - Example prompt: "Help me think through our Q2 pricing strategy"
   - Example response showing strategic framework application
3. Use dark slate backgrounds (#1e293b, #0f172a)
4. Accent with Kowalah gradient (pink #fa26a0 to purple #ae10e3)
5. Add subtle depth with shadows

**AI Generation Alternative (Midjourney):**
```
Professional desktop application interface screenshot, dark theme, strategic planning software, macOS window frame, sidebar navigation with folder structure, main chat interface with AI conversation, executive business context, pink and purple accent colors, clean minimal design, 8k, ultra detailed UI mockup --ar 3:2 --v 6
```

---

## Priority 2: Important Images (Optional Enhancements)

These images would enhance the page but are not critical for launch.

### 2. Constraint Problem Section Visual
**Path:** `/images/reserved/constraints-visual.png`
**Dimensions:** 800×600px
**Purpose:** Atmospheric visual for the problem section

**Concept:** Abstract visualization of communication constraints
- Could be a conceptual diagram showing CEO at center with lines to team, board, coach, family
- Each line has a subtle "barrier" or filter
- Premium, sophisticated design language
- Not stock photography - abstract/conceptual preferred

**AI Generation Prompt:**
```
Abstract minimalist diagram, CEO figure at center, four directional connections to different stakeholder groups, subtle barriers between connections, dark sophisticated color palette with pink purple accents, executive strategic planning concept, clean modern design, no text, pure illustration --ar 4:3 --v 6
```

### 3. Strategic Mirror Concept Visual
**Path:** `/images/reserved/strategic-mirror.png`
**Dimensions:** 1000×600px
**Purpose:** Visualize the "strategic mirror" concept

**Concept:** Abstract representation of reflection/mirroring
- Executive silhouette or abstract representation
- Reflection showing enhanced/augmented version
- Gradient treatment with brand colors
- Conceptual, not literal

**AI Generation Prompt:**
```
Abstract concept of strategic reflection, silhouette figure looking at enhanced mirror reflection, digital augmentation visual effect, sophisticated business context, pink purple gradient accents on dark background, premium executive aesthetic, conceptual illustration, no text --ar 5:3 --v 6
```

### 4. Compounding Effect Diagram
**Path:** `/images/reserved/compounding-effect.png`
**Dimensions:** 1000×400px
**Purpose:** Visualize value accumulation over time

**Concept:** Growth curve or accumulation visualization
- Show value increasing over time (months 1-12)
- Abstract representation, not a literal chart
- Premium design language
- Could be flowing lines that grow and branch

**Canva/Figma Approach:**
- Create abstract flowing lines that grow from left to right
- Use gradient treatment (pink to purple)
- Add subtle data points or nodes
- Dark background, light elements

### 5. Mirroring Process Timeline
**Path:** `/images/reserved/mirroring-timeline.png`
**Dimensions:** 1200×300px
**Purpose:** Visual timeline for the 3-month process

**Note:** The current design uses styled HTML for this section. A visual timeline could enhance it but is optional.

---

## Priority 3: Enhancement Images (Future)

These are nice-to-have images for future iterations.

### Executive Testimonial Photos
- If/when testimonials are added
- Professional headshots, 400×400px
- Real executives (not stock)

### Skills Library Icons
- Custom icons for skill categories
- Currently using Heroicons (sufficient)
- Custom icons could elevate premium feel

---

## Brand Guidelines for All Images

### Color Palette
- **Primary Pink:** #fa26a0
- **Secondary Purple:** #ae10e3
- **Dark Backgrounds:** #0f172a, #1e293b, #334155
- **Light Accents:** #f8fafc, #e2e8f0

### Style Guidelines
- Premium and understated, not flashy
- Abstract/conceptual preferred over literal
- Dark mode aesthetic to match page design
- Avoid stock photography clichés
- Executive-appropriate sophistication

### Technical Requirements
- Format: PNG or WebP
- Optimize for web (target <500KB for hero, <200KB for others)
- Provide @2x versions for retina if possible
- Ensure accessibility (sufficient contrast if text overlays)

---

## Implementation Checklist

### Before Launch (Minimum Viable)
- [ ] Page works without images (verified)
- [ ] Placeholder gradients look professional

### Phase 1 (Recommended)
- [ ] Create hero desktop app mockup
- [ ] Add to `/public/images/reserved/hero-desktop-app.png`
- [ ] Update hero section to display image (optional - current gradient works well)

### Phase 2 (Enhancement)
- [ ] Create constraint problem visual
- [ ] Create strategic mirror concept
- [ ] Create compounding effect diagram

### Phase 3 (Polish)
- [ ] Add executive testimonial photos (when available)
- [ ] Create custom skill icons (optional)

---

## Notes

The Kowalah Reserved page is designed with a "content-first" approach where the typography, spacing, and gradient backgrounds carry the premium aesthetic. The page is fully functional and visually compelling without custom images.

Images should be added iteratively:
1. Launch with gradient backgrounds (no images needed)
2. Add hero product mockup for credibility
3. Add conceptual visuals to enhance storytelling
4. Add testimonial photos when real customer quotes are available

This approach allows for faster iteration while maintaining visual quality.
