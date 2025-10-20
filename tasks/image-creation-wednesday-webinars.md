# Wednesday Webinars - Image Creation Document

**Page:** Wednesday Webinars
**Content File:** `src/content/resources/wednesday-webinars.md`
**Created:** 2025-01-20

---

## Overview

This document provides a systematic approach to creating all visual assets for the Wednesday Webinars page. Images are organized by priority and creation method, with detailed specifications using standardized dimensions for consistency and performance.

### Standardized Image Dimensions

All images use one of four approved formats:
- **800×450px** (16:9 landscape) - Feature cards, hero images, general content
- **800×800px** (1:1 square) - Profile images, icons, social media
- **800×200px** (4:1 wide) - Banner graphics, overlays
- **400×600px** (2:3 portrait) - Book covers, mobile-first content

---

## Priority 1: Essential Images (Must-Have)

### 1. Hero Background Image
**File:** `/public/images/webinars/hero-background.jpg`
**Dimensions:** 800×450px (16:9 landscape)
**Purpose:** Main hero section background showcasing business leaders learning tactical ChatGPT applications
**Creation Method:** AI-generated using Midjourney

**AI Generation Prompt:**
```
Create a 800×450px authentic human-centered photograph featuring a business leader workshop scene with tactical ChatGPT training focus.

Camera & Technical Style:
- Shot on Fujifilm X-T4 with 35mm f/1.4 lens
- Fujifilm color science: warm, natural skin tones, slight film grain
- Natural window lighting with golden hour warmth
- Shallow depth of field f/1.4-2.8 for subject focus
- Warm color grading, authentic and approachable feel
- Documentary photography aesthetic

Visual Style:
- Authentic, human-first photography (not corporate stock photo)
- Professional conference room or collaborative workspace setting
- Color palette: Warm naturals, soft whites, with strategic pink (#fa26a0) and purple (#ae10e3) accent elements visible in background (laptop screens, presentation displays)
- Genuine, engaged learning moments
- Natural, flattering lighting with depth

Subjects:
- Business leaders at organizations (25-55 age range): CROs, Marketing/Sales Heads, Department Heads
- Business casual attire - smart casual, professional but approachable
- Diverse representation across roles, gender, age, ethnicity
- Close-up portraits showing human emotion and authentic learning moments (60% of composition)

Expressions & Moments to Capture:
- "Aha moment" realizations during capability demonstrations
- Genuine interest and engagement with ChatGPT training content
- Collaborative learning atmosphere
- Note-taking and active participation
- Professional yet approachable energy

Environment & Context:
- Modern conference room with natural light
- Laptop screens showing ChatGPT interface (subtle, not dominant)
- Coffee cups, notebooks, collaborative workspace elements
- Real, lived-in professional setting (not pristine showroom)

Mood & Composition:
- Discovery, engagement, professional learning
- Close-up focus on 2-3 business leaders in foreground
- Shallow depth of field emphasizing individual engagement
- Warm, approachable, genuine human energy
- Environmental context supporting the learning atmosphere

Technology Elements:
- Natural laptop use showing ChatGPT interface
- Professional presentation displays in background
- Comfortable, confident technology use in business context
- Focus on human learning, technology as enabler

Lighting & Color:
- Natural window light, golden hour quality
- Warm skin tones, flattering and authentic
- Soft shadows, gentle contrast
- Fujifilm color palette: warm, natural, slightly desaturated

Specific Scene: Business leaders in a professional workshop setting, engaged in learning advanced ChatGPT capabilities. Focus on authentic reactions of discovery and interest as they learn practical applications for their teams. Natural collaborative energy with laptops open and ChatGPT demonstrations visible on screens.

Technical Prompt Additions:
- Shot on Fujifilm X-T4, 35mm f/1.4
- Natural light, golden hour
- f/1.4 bokeh, slight film grain
- Fujifilm color science
- Documentary portrait style

Photography Specifications:
- Pure photographic portrait without text overlays or graphic elements
- Natural realistic photography, not illustration or graphic design
- Clean professional photography quality
- No text, no graphics, authentic photography only

Dimensions: Create at 800×450 pixels (16:9 landscape ratio)

Avoid: Corporate stock photo aesthetics, sterile conference rooms, overly formal business attire, posed corporate settings, artificial lighting, harsh shadows, text overlays, graphic elements.
```

**Alternative Approach:** Use stock photography from Unsplash/Pexels with filters:
- Search: "business workshop collaboration" or "professional training session"
- Filter for warm tones, natural lighting
- Apply subtle pink/purple color overlay for brand alignment

---

### 2. Host Photo (Charlie Cowan)
**File:** `/public/images/team/charlie-cowan.jpg`
**Dimensions:** 800×800px (1:1 square)
**Purpose:** Professional headshot for host credibility section
**Creation Method:** Professional photography or existing photo

**Specifications:**
- Professional business casual attire
- Neutral or subtly blurred background
- Warm, approachable expression
- High-quality resolution for web display
- Natural lighting, confident yet friendly demeanor

**Display Size:** Will be displayed at 400×400px or smaller, ensure clarity at reduced size

---

## Priority 2: Supporting Images (Important)

### 3. Placeholder Past Webinar Thumbnails
**File:** `/public/images/webinars/thumbnails/template-placeholder.jpg`
**Dimensions:** 800×450px (16:9 landscape)
**Purpose:** Placeholder for past webinar archive (will be populated after first webinar)
**Creation Method:** Template design in Canva or Figma

**Template Design Specifications:**
- **Background:** Gradient from pink (#fa26a0) to purple (#ae10e3)
- **Text Elements:**
  - Webinar title (large, bold, white text)
  - Date stamp (top left or right corner)
  - "Wednesday Webinars" branding (small, top)
  - Duration badge (bottom corner, e.g., "58 min")
- **Visual Elements:**
  - Kowalah logo (subtle, corner placement)
  - Optional: Charlie's headshot (small, circular)
  - ChatGPT-related iconography (subtle)
- **Typography:** Inter font, bold for titles, regular for metadata

**Template Variables for Future Webinars:**
- Title text field (editable)
- Date field (editable)
- Duration field (editable)
- Optional screenshot from webinar

---

## Priority 3: Enhancement Images (Nice-to-Have)

### 4. Webinar Format Visual
**File:** `/public/images/webinars/format-timeline.png`
**Dimensions:** 800×450px (16:9 landscape)
**Purpose:** Visual representation of 60-minute webinar structure
**Creation Method:** Graphic design (Canva, Figma, or Illustrator)

**Design Specifications:**
- **Timeline Layout:** Horizontal timeline showing 3 segments
- **Segments:**
  1. Opening Topic (10-15 mins) - Pink gradient
  2. AI in the News (10-15 mins) - Purple gradient
  3. Live Q&A (30 mins) - Brand gradient
- **Icons:** Use Heroicons for each segment
  - Opening: `lightbulb` (capability demonstration)
  - AI News: `newspaper` (industry updates)
  - Q&A: `chat-bubble-left-right` (discussion)
- **Colors:** Brand colors (#fa26a0, #ae10e3) with transparency
- **Typography:** Inter font, clean and modern

---

### 5. Benefits Icon Illustrations (Optional)
**Files:** Icon mapping to Heroicons (no files needed)
**Purpose:** Visual icons for "Why Attend" benefits section
**Creation Method:** Use Heroicons library

**Icon Mapping:**
- Business Applications → `briefcase` (Heroicons)
- "I Didn't Know It Could Do That" → `lightbulb` (Heroicons)
- Practical Use Cases → `clipboard-check` (Heroicons)
- Creative Co-Worker → `users` (Heroicons)

**Note:** No custom images needed - icons handled by Heroicons React components in code

---

## Brand Guidelines Reference

### Color Palette
- **Primary Pink:** #fa26a0
- **Secondary Purple:** #ae10e3
- **Gradient:** from-primary to-secondary (pink to purple)
- **Neutrals:** #ffffff (white), #f8fafc (off-white), #64748b (gray)

### Typography
- **Font Family:** Inter (all weights)
- **Headlines:** Inter Bold (600-700 weight)
- **Body Text:** Inter Regular (400 weight)

### Photography Style
- **Aesthetic:** Human-centered transformation, authentic business moments
- **Tone:** Warm, approachable, professional (not sterile or overly formal)
- **Subjects:** Business leaders 25-65, diverse representation
- **Lighting:** Natural, warm, golden hour quality
- **Camera Style:** Fujifilm color science, slight film grain, documentary feel
- **Focus:** Close-up portraits showing genuine emotion (60% of shots)

### Visual Assets Organization
```
/public/images/
  └── webinars/
      ├── hero-background.jpg (800×450px)
      ├── format-timeline.png (800×450px)
      └── thumbnails/
          └── template-placeholder.jpg (800×450px)
  └── team/
      └── charlie-cowan.jpg (800×800px)
```

---

## Implementation Checklist

### Phase 1: Essential Assets (Must complete before page launch)
- [ ] **Hero Background Image** (800×450px)
  - [ ] Generate using AI prompt above OR source from stock photography
  - [ ] Ensure warm, business-focused atmosphere
  - [ ] Optimize for web (WebP format, ~200KB)
  - [ ] Save to `/public/images/webinars/hero-background.jpg`

- [ ] **Host Photo** (800×800px)
  - [ ] Use existing professional headshot OR schedule photo session
  - [ ] Ensure high quality and professional appearance
  - [ ] Optimize for web (WebP format, ~150KB)
  - [ ] Save to `/public/images/team/charlie-cowan.jpg`

### Phase 2: Supporting Assets (Complete within 1 week of launch)
- [ ] **Webinar Thumbnail Template** (800×450px)
  - [ ] Design template in Canva or Figma
  - [ ] Include editable text fields for future webinars
  - [ ] Save template file for reuse
  - [ ] Export placeholder to `/public/images/webinars/thumbnails/template-placeholder.jpg`

### Phase 3: Enhancement Assets (Optional, post-launch improvements)
- [ ] **Format Timeline Graphic** (800×450px)
  - [ ] Design in graphic design tool
  - [ ] Export as PNG with transparency if needed
  - [ ] Save to `/public/images/webinars/format-timeline.png`

- [ ] **Custom Benefit Icons** (optional)
  - [ ] Only if Heroicons don't provide suitable alternatives
  - [ ] Create at 800×800px for flexibility
  - [ ] Save to `/public/images/webinars/icons/`

---

## Weekly Update Workflow

After each webinar, create a custom thumbnail:

1. **Screenshot:** Capture key moment from webinar recording
2. **Template:** Use Canva/Figma template
3. **Customize:** Add webinar title, date, duration
4. **Export:** 800×450px JPEG/WebP
5. **Upload:** Save to `/public/images/webinars/thumbnails/[webinar-slug].jpg`
6. **Update Content:** Add YouTube embed and metadata to `past_webinars.webinars[]` in markdown file

---

## Image Optimization Guidelines

### File Formats
- **Photography:** WebP (primary), JPEG (fallback) at 85-90% quality
- **Graphics/Diagrams:** PNG for transparency, WebP for solid backgrounds
- **Logos:** SVG (vector) when possible

### File Size Targets
- **Hero images (800×450px):** <200KB
- **Thumbnails (800×450px):** <150KB
- **Profile photos (800×800px):** <150KB
- **Graphics (800×450px):** <100KB

### Optimization Tools
- **ImageOptim** (Mac) - Drag and drop compression
- **TinyPNG** (Web) - Online compression
- **Squoosh** (Web) - Advanced WebP conversion
- **Sharp** (CLI) - Automated batch optimization

---

## Quality Checklist

Before finalizing any image:
- [ ] Meets standardized dimension requirements (800×450, 800×800, 800×200, or 400×600)
- [ ] File size optimized (<200KB for web)
- [ ] Saved in correct directory with descriptive filename
- [ ] Aligned with brand color palette and visual style
- [ ] Tested at actual display sizes (looks sharp at 400px width minimum)
- [ ] Alt text considerations documented (for accessibility)
- [ ] No placeholder or watermark text visible
- [ ] Professional quality suitable for business audience

---

## Resources

### Stock Photography Sources
- **Unsplash:** Free high-quality business photography
- **Pexels:** Free stock photos with business/professional filters
- **Adobe Stock:** Premium (paid) business imagery

### Design Tools
- **Canva:** Easy template creation for thumbnails
- **Figma:** Professional design tool for graphics
- **Photopea:** Free online Photoshop alternative

### AI Image Generation
- **Midjourney:** Premium AI image generation (use prompts above)
- **DALL-E 3:** OpenAI's image generator
- **Stable Diffusion:** Open-source alternative

### Icon Libraries
- **Heroicons:** Primary icon system (heroicons.com)
- **Font Awesome:** Alternative icon library
- **Noun Project:** Custom icon creation

---

## Success Criteria

Images are complete when:
✅ All Priority 1 images created and optimized
✅ Hero background showcases business-focused ChatGPT learning
✅ Host photo is professional and brand-aligned
✅ Thumbnail template ready for weekly webinar updates
✅ All files follow standardized dimension formats
✅ File paths match content file references exactly
✅ Images load quickly (<2 seconds on 3G)
✅ Visual consistency across all assets
✅ Brand guidelines followed throughout

---

**Next Steps:**
1. Start with Priority 1 images (hero background + host photo)
2. Test page rendering with images in place
3. Create thumbnail template for future webinars
4. Consider enhancement assets for visual polish post-launch
