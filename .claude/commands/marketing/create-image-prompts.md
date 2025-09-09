---
description: Generate AI image prompts and automate screenshot capture based on Astro content file requirements, following executive visual style guide and organized directory structure
---
# Command: Create Image Prompts

## Goal

To automatically generate detailed AI image prompts and coordinate Playwright screenshot capture based on Astro content file image requirements, ensuring visual consistency with Kowalah's executive brand and organized asset management.

## Command Syntax

### Complete Image Generation (Recommended)
```bash
/create-image-prompts [astro-content-file]
```
**Example:** `/create-image-prompts src/content/product/digital-caio.md`
*Generates AI prompts and captures screenshots for all image requirements*

### Selective Generation
```bash
/create-image-prompts [astro-content-file] --screenshots-only
/create-image-prompts [astro-content-file] --ai-only
/create-image-prompts [astro-content-file] --batch
```
- **`--screenshots-only`** - Only capture application interface screenshots via Playwright
- **`--ai-only`** - Only generate AI image prompts for executive/business scenes
- **`--batch`** - Process multiple content files (provide directory path)

## Process Workflow

### 1. Content File Analysis
1. **Parse Frontmatter** - Extract all image field requirements from YAML
2. **Identify Image Types** - Categorize as product screenshots, AI-generated scenes, or icons
3. **Map Directory Structure** - Determine correct `/public/images/` subdirectories
4. **Extract Specifications** - Get dimensions, alt text, and purpose requirements

### 2. AI Image Prompt Generation
1. **Apply Visual Style Guide** - Reference `/docs/context/executive-visual-style-guide.md`
2. **Generate Detailed Prompts** - Create comprehensive prompts for each AI-generated image
3. **Include Technical Specs** - Add dimensions, format, and style requirements
4. **Provide Implementation Guide** - Instructions for using prompts with AI generation tools

### 3. Playwright Screenshot Automation
1. **Navigate to Application** - Use Playwright MCP to access live Kowalah application at app.kowalah.com (NOT kowalah.com)
2. **Await Authentication** - Wait for user to login and access dashboard at app.kowalah.com/new
3. **Configure Viewports** - Set exact dimensions: 1200x800px (hero), 1000x750px (screenshots)
4. **Capture Multiple Views** - Take varied screenshots showing different capabilities and workflows
5. **Auto-move Files** - Use bash commands to move from Playwright temp directory to final location

### 4. Asset Organization
1. **Directory Creation** - Ensure correct `/public/images/` subdirectory structure exists
2. **File Naming** - Use consistent naming that matches content file references
3. **Optimization** - Compress images for web performance while maintaining quality
4. **Validation** - Verify all required images are generated and accessible

## Image Type Classification

### Product Screenshots (Playwright Automation)
**Directory:** `/public/images/product/`
- **`mockups/`** - Hero product interface shots, polished dashboard views
- **`screenshots/`** - Raw interface captures, feature demonstrations  
- **`demos/`** - How-it-works process screenshots, user flow captures

**Playwright Configuration:**
- **Hero Screenshots:** 1200x800px viewport for hero product mockups
- **Demo Screenshots:** 1000x750px viewport for interface demonstrations  
- **Executive Display:** Professional appearance with clean UI state
- **Element Selection:** Full viewport captures, specific UI interactions
- **Quality:** PNG format for crisp interface details
- **File Management:** Auto-move from `.playwright-mcp/` temp directory to final `/public/images/` location

### AI-Generated Business Scenes
**Directory:** `/public/images/heroes/`, `/public/images/backgrounds/`
- **Executive Photography:** C-suite professionals in strategic settings
- **Corporate Environments:** Boardrooms, modern offices, professional consultations
- **Industry Contexts:** Manufacturing, finance, healthcare professional settings

**AI Generation Requirements:**
- **Style:** Professional photography aesthetic (not illustrations)
- **Quality:** High-resolution, publication-ready
- **Subjects:** Mature business leaders (40-60+ age range), diverse representation
- **Settings:** Modern corporate environments, strategic contexts

### Icons and Graphics
**Directory:** `/public/images/icons/`, `/public/images/product/features/`
- **Existing Icons:** Check `src/icons/` directory for available icons first
- **No Custom Icons:** Use existing project icons rather than generating new ones
- **Brand Consistency:** Follow Kowalah color palette and style guidelines

### Image Path Formatting
**CRITICAL:** Ensure correct path format in content files
- **✅ CORRECT:** `/images/product/mockups/digital-caio-hero-interface.png` (leading slash)
- **❌ INCORRECT:** `images/product/mockups/digital-caio-hero-interface.png` (no leading slash)

## AI Image Prompt Template

### Executive Photography Prompt Structure
```
Create a [DIMENSIONS] professional business photograph featuring [SCENE DESCRIPTION].

**Visual Style:**
- High-quality professional photography aesthetic (not illustration or cartoon)
- Sophisticated corporate environment with modern, clean design
- Color palette: Deep blues (#1e3a8a, #3b82f6), sophisticated grays (#64748b, #94a3b8), clean whites
- Strategic use of Kowalah accent pink (#fa26a0) for key elements only
- Professional lighting with soft shadows and natural depth of field

**Subjects:**
- C-suite executives and mature business leaders (40-60+ age range)
- Professional business attire (suits, blazers, sophisticated dress)
- Confident, authoritative expressions and strategic thinking poses
- Diverse representation across gender, age, and ethnicity
- [SPECIFIC SCENE REQUIREMENTS]

**Environment:**
- Modern corporate settings (boardrooms, executive offices, professional meeting spaces)
- Professional technology (premium laptops, large monitors, clean interfaces)
- [INDUSTRY-SPECIFIC CONTEXT if applicable]
- Clean, sophisticated interior design with strategic furniture placement

**Mood & Composition:**
- [CONFIDENT/STRATEGIC/AUTHORITATIVE/PROFESSIONAL/CONTEMPLATIVE]
- Strong focal points with executive subjects as primary focus
- Balanced composition with sophisticated framing
- Natural depth of field with professional bokeh

**Technical Specifications:**
- **Dimensions:** [EXACT_DIMENSIONS]
- **Format:** PNG or high-quality JPEG
- **Resolution:** High-resolution for web optimization
- **Alt Text Purpose:** [SPECIFIC_ALT_TEXT_CONTEXT]

**Specific Scene:** [DETAILED_SCENE_DESCRIPTION_FROM_CONTENT_REQUIREMENTS]

**Avoid:** Comic book styles, pop art aesthetics, casual startup environments, overly futuristic elements, bright cartoon colors, young/casual subjects, amateur photography appearance.
```

## Playwright MCP Integration

### Screenshot Automation Workflow
```javascript
// Playwright automation examples (to be implemented via MCP)

// Navigate to specific application sections
await page.goto('https://app.kowalah.com/digital-caio');
await page.setViewportSize({ width: 1200, height: 800 });

// Capture specific interface elements
await page.locator('[data-testid="capabilities-grid"]').screenshot({
  path: 'public/images/product/screenshots/digital-caio-capabilities.png',
  quality: 90
});

// Full page screenshots for hero sections
await page.screenshot({
  path: 'public/images/product/mockups/digital-caio-hero-interface.png',
  fullPage: false,
  clip: { x: 0, y: 0, width: 1200, height: 800 }
});
```

### Authentication & Access
- **Development Environment:** Use development/staging application URLs
- **Authentication:** Handle login flow for protected application sections
- **State Management:** Ensure consistent application state for screenshot quality
- **Error Handling:** Graceful failure with manual screenshot fallback instructions

## Output Format

```
## Image Prompts and Screenshots Generated

**Source Content:** [astro-content-file-path]
**Collection:** [collection-name]
**Generated Assets:** [total-count] images

### AI Image Prompts Generated:
📝 **[Image-Name].png** - [Purpose]
**Directory:** `/public/images/[subdirectory]/`
**Dimensions:** [width]x[height]px
**Prompt:** 
```
[Complete AI generation prompt with all specifications]
```
**Implementation:** Use prompt with [AI generation tool] and save to specified directory

### Playwright Screenshots Captured:
📸 **[Screenshot-Name].png** - [Purpose]  
**Directory:** `/public/images/product/screenshots/`
**Dimensions:** [width]x[height]px  
**Source:** [Application URL/Section]
**Status:** ✅ Captured and optimized

### Implementation Checklist:
- [ ] All AI prompts ready for image generation
- [ ] All screenshots captured and optimized
- [ ] Images saved to correct directory structure
- [ ] File names match content file references
- [ ] Alt text requirements documented
- [ ] Web performance optimization completed

### Next Steps:
1. **Generate AI Images:** Use provided prompts with preferred AI generation tool
2. **Verify Screenshots:** Check Playwright captures meet quality standards
3. **Test Content:** Run `npm run dev` to verify all images load correctly
4. **Optimize Performance:** Compress images if needed for web performance
5. **Content Validation:** Ensure images support content messaging and user experience

### Directory Structure Created:
```
/public/images/
├── product/
│   ├── mockups/[hero-screenshots]
│   ├── screenshots/[demo-captures] 
│   └── features/[capability-images]
├── heroes/[executive-photography]
└── backgrounds/[corporate-environments]
```

### Quality Validation:
✅ All images follow executive visual style guide
✅ Professional appearance appropriate for CEO audience  
✅ Brand colors and styling consistent across assets
✅ Technical specifications meet web performance requirements
✅ Directory organization follows established structure
```

## AI Processing Instructions

When processing image prompt generation requests, the AI must:

### 1. Content File Analysis Phase
- **Parse YAML Frontmatter:** Extract all image field values from content file
- **Identify Image Categories:** 
  - `product_screenshot`, `screenshots[]` → Playwright automation
  - Business/executive scenes → AI image generation
  - Icons → Heroicons library or custom generation
- **Map to Directories:** Determine correct `/public/images/` subdirectory based on image purpose
- **Extract Context:** Get alt text, dimensions, and purpose from content file

### 2. AI Prompt Generation Phase  
- **Reference Style Guide:** Use `/docs/context/executive-visual-style-guide.md` for all specifications
- **Create Detailed Prompts:** Generate comprehensive prompts following template structure
- **Include Technical Specs:** Add exact dimensions, format requirements, alt text purpose
- **Brand Alignment:** Ensure executive tone, professional appearance, corporate environments
- **Avoid Generic Content:** No invented statistics, testimonials, or company names in imagery

### 3. Playwright Automation Phase
- **Application Navigation:** Use MCP to access app.kowalah.com (NOT www.kowalah.com)
- **Wait for Authentication:** Ensure user is logged in and can access /new dashboard
- **Viewport Configuration:** Set exact dimensions (1200x800px hero, 1000x750px demos)
- **Capture Varied Screenshots:** Show different capabilities, workflows, and interface states
- **File Management:** Use bash commands to move from `.playwright-mcp/` temp directory to `/public/images/`
- **Quality Control:** Ensure screenshots are crisp, professional, and brand-appropriate

### 4. Validation and Output Phase
- **Directory Creation:** Ensure all required subdirectories exist in `/public/images/`
- **File Organization:** Verify naming matches content file references exactly
- **Quality Assessment:** Check all generated assets meet executive brand standards
- **Implementation Guide:** Provide clear next steps and validation checklist

## Error Handling and Fallbacks

### Playwright MCP Issues
- **Connection Failures:** Provide manual screenshot instructions with specific application URLs
- **Authentication Problems:** Guide user through application access setup  
- **Element Not Found:** Offer alternative selectors or manual capture guidance
- **Quality Issues:** Suggest viewport adjustments or element-specific capture methods

### AI Prompt Generation Issues
- **Style Guide Access:** Use fallback professional photography guidelines
- **Content Parsing:** Manual specification request with clear format requirements
- **Brand Alignment:** Default to conservative, professional executive appearance standards

### Directory and File Issues
- **Permission Errors:** Guide user through directory creation and access setup
- **Naming Conflicts:** Provide alternative naming conventions that match content references
- **Format Issues:** Offer multiple format options (PNG, JPEG) with quality specifications
- **Temp File Management:** Always move files from `.playwright-mcp/` to final `/public/images/` location
- **Path Format:** Ensure leading slash in all image paths for proper Astro resolution

## Integration with Existing Workflow

### Enhanced Content Creation Pipeline
1. **`create-page-design.md`** → Design document with visual requirements
2. **`create-astro-content [design-doc]`** → Content file with image placeholders
3. **`create-image-prompts [content-file]`** → Generate all visual assets
4. **Manual/Automated Image Generation** → Create final optimized images
5. **Testing and Validation** → Verify complete page functionality

### Quality Assurance Integration
- **Brand Consistency:** All images align with executive visual style guide
- **Technical Standards:** Proper dimensions, optimization, and accessibility
- **Content Alignment:** Images support messaging and user experience goals
- **Performance Optimization:** Web-ready formats and file sizes

## Context Files to Reference

### Required Context Files
- `/docs/context/executive-visual-style-guide.md` - Visual style and prompt templates
- `[astro-content-file]` - Source content with image requirements
- `/public/images/` directory structure - Asset organization patterns

### Optional Reference Files  
- `/docs/context/messaging-framework.md` - Brand voice for image context
- `/docs/context/positioning-canvas.md` - Competitive positioning for business scenes
- `/docs/product-overview.md` - Product context for interface screenshots

## Playwright Screenshot Workflow (Tested Process)

Based on successful Digital CAIO implementation:

### 1. Setup and Navigation
```bash
# Navigate to correct application URL
mcp__playwright__browser_navigate app.kowalah.com
# Ensure user authentication is complete
mcp__playwright__browser_snapshot  # Verify dashboard access
```

### 2. Screenshot Capture Process
```bash
# Set viewport for hero screenshots
mcp__playwright__browser_resize 1200 800
mcp__playwright__browser_take_screenshot "hero-interface.png"

# Set viewport for demo screenshots  
mcp__playwright__browser_resize 1000 750
mcp__playwright__browser_take_screenshot "dashboard-view.png"

# Interact with interface for varied captures
mcp__playwright__browser_click [capability-button] [ref]
mcp__playwright__browser_take_screenshot "capabilities-view.png"
```

### 3. File Management (CRITICAL)
```bash
# Move from Playwright temp directory to final location
mv "/.playwright-mcp/[temp-filename].png" "/public/images/product/mockups/[final-name].png"
mv "/.playwright-mcp/[temp-filename].png" "/public/images/product/screenshots/[final-name].png"
```

### 4. Validation
- Verify all required image paths match content file references exactly
- Confirm all image paths start with leading slash (`/images/...`)
- Test images load correctly in development server

## Success Criteria

### Technical Success
- All required images generated or captured successfully
- Files saved to correct directory structure with proper naming
- Images meet specified dimensions and quality requirements
- Content file image references resolve correctly

### Brand Success  
- All images align with executive visual style guide
- Professional appearance appropriate for CEO/executive audience
- Brand colors and styling consistent across generated assets
- Corporate environments and subjects match target market positioning

### User Experience Success
- Images enhance content messaging and user journey
- Visual hierarchy supports conversion goals and page objectives  
- Accessibility requirements met (alt text, proper contrast)
- Page loading performance optimized with appropriate file sizes

---

*This command creates a comprehensive visual asset generation pipeline that maintains brand consistency, automates repetitive tasks, and ensures professional quality appropriate for executive audiences.*