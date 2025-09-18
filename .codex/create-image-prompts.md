---
description: Generate conceptual mockup specifications for Canva creation based on Astro content file requirements, providing detailed functionality descriptions and text suggestions for platform features
---
# Command: Create Image Prompts

## Goal

To automatically generate detailed Canva mockup specifications based on Astro content file image requirements, providing conceptual functionality descriptions, suggested text content, and visual guidance for creating polished platform demonstrations that showcase Kowalah's Digital CAIO capabilities.

## Command Syntax

### Complete Mockup Specifications (Recommended)
```bash
/create-image-prompts [astro-content-file]
```
**Example:** `/create-image-prompts src/content/product/digital-caio.md`
*Generates Canva mockup specifications for all image requirements*

### Selective Generation
```bash
/create-image-prompts [astro-content-file] --platform-only
/create-image-prompts [astro-content-file] --conceptual-only
/create-image-prompts [astro-content-file] --batch
```
- **`--platform-only`** - Only create specifications for platform interface mockups
- **`--conceptual-only`** - Only generate conceptual business/executive scene descriptions
- **`--batch`** - Process multiple content files (provide directory path)

## Process Workflow

### 1. Content File Analysis
1. **Parse Frontmatter** - Extract all image field requirements from YAML
2. **Identify Image Types** - Categorize as platform mockups, conceptual scenes, or feature demonstrations
3. **Map Directory Structure** - Determine correct `/public/images/` subdirectories
4. **Extract Context** - Get dimensions, alt text, purpose, and platform functionality requirements

### 2. Platform Mockup Specification
1. **Analyze Platform Features** - Reference product knowledge for realistic functionality
2. **Generate Detailed Mockup Specs** - Create comprehensive Canva creation instructions
3. **Suggest Interface Content** - Provide realistic text, messages, and UI elements
4. **Include Brand Guidelines** - Apply Kowalah visual style and design standards

### 3. Conceptual Scene Specification
1. **Business Context Creation** - Define executive scenarios and use cases
2. **Visual Composition Guide** - Describe layout, subjects, and environmental elements
3. **Brand Integration** - Ensure alignment with executive visual style guide
4. **Messaging Alignment** - Connect visuals to content strategy and value propositions

### 4. Canva Implementation Guide
1. **Directory Organization** - Ensure correct `/public/images/` subdirectory structure
2. **Creation Instructions** - Step-by-step Canva mockup creation guidance
3. **Brand Asset Integration** - Reference Kowalah colors, fonts, and visual elements
4. **Quality Standards** - Professional polish appropriate for executive audience

## Image Type Classification

### Platform Mockups (Canva Creation)
**Directory:** `/public/images/product/`
- **`mockups/`** - Hero product interface mockups, polished dashboard views
- **`screenshots/`** - Conceptual interface demonstrations, feature showcases
- **`demos/`** - How-it-works process mockups, user flow illustrations

**Platform Features to Showcase:**
- **Digital CAIO Chat Interface** - Strategic AI conversations, expert guidance interactions
- **Projects Dashboard** - AI initiative tracking, progress monitoring, team collaboration
- **Expert Requests** - Custom prompt development, GPT creation, training session requests
- **Accelerators** - Quick-start AI implementations, governance templates, policy frameworks
- **Admin Functionality** - User management, organization settings, usage analytics
- **Integrations** - Slack, Teams, email connections, workflow automation
- **Reporting** - Board-ready AI progress reports, ROI analytics, strategic insights

**Mockup Specifications with Standardized Dimensions:**
- **Hero Interfaces:** 800x450px (16:9 landscape) for primary product demonstrations
- **Feature Showcases:** 800x450px for capability-specific mockups
- **Wide Dashboard Views:** 800x200px (4:1 wide) for banner-style interface elements
- **Square Feature Icons:** 800x800px for individual capability demonstrations
- **Professional Polish:** Clean UI state, realistic data, executive-appropriate content
- **Brand Integration:** Kowalah colors, typography, and visual design language

### Conceptual Business Scenes
**Directory:** `/public/images/heroes/`, `/public/images/backgrounds/`
- **Executive Strategy Sessions:** C-suite professionals in strategic AI planning contexts
- **Digital Transformation Scenarios:** Modern offices with AI technology integration
- **Industry-Specific Contexts:** Manufacturing, finance, healthcare professional environments

**Conceptual Scene Specifications:**
- **Style:** Professional, sophisticated visual storytelling through Canva design
- **Quality:** Executive-appropriate, polished presentation quality
- **Subjects:** Mature business leaders (40-60+ age range), diverse representation
- **Settings:** Modern corporate environments, strategic contexts, AI-enabled workplaces

**Dimension Standards for Canva Creation:**
- **Hero Images:** 800x450px (16:9 landscape) for primary page heroes
- **Banner Images:** 800x200px (4:1 wide) for section headers and concept illustrations
- **Profile/Avatar Images:** 800x800px (1:1 square) for executive representations
- **Portrait Scenes:** 400x600px (2:3 portrait) for vertical business contexts
- **Brand Integration:** Kowalah gradient backgrounds, professional color palette
- **Format:** PNG with transparency or high-quality designs optimized for web

### Icons and Graphics
**Directory:** `/public/images/icons/`, `/public/images/product/features/`
- **Existing Icons:** Check `src/icons/` directory for available icons first
- **No Custom Icons:** Use existing project icons rather than generating new ones
- **Brand Consistency:** Follow Kowalah color palette and style guidelines

### Image Path Formatting
**CRITICAL:** Ensure correct path format in content files
- **✅ CORRECT:** `/images/product/mockups/digital-caio-hero-interface.png` (leading slash)
- **❌ INCORRECT:** `images/product/mockups/digital-caio-hero-interface.png` (no leading slash)

## Canva Mockup Specification Template

### Platform Mockup Specification Structure
```
**Image: [MOCKUP_NAME]**
**Dimensions:** [STANDARDIZED_DIMENSIONS]
**Purpose:** [FUNCTIONALITY_DEMONSTRATION]

**Platform Feature Context:**
- **Functionality:** [SPECIFIC_PLATFORM_CAPABILITY]
- **User Journey:** [WHERE_IN_WORKFLOW_THIS_APPEARS]
- **Value Demonstration:** [WHAT_BENEFIT_THIS_SHOWS]

**Mockup Content Specifications:**
- **Interface Elements:** [SPECIFIC_UI_COMPONENTS_TO_SHOW]
- **Text Content:** [REALISTIC_MESSAGES_LABELS_HEADINGS]
- **Data Examples:** [SAMPLE_CONTENT_THAT_DEMONSTRATES_VALUE]
- **Interactive Elements:** [BUTTONS_MENUS_FORMS_TO_INCLUDE]

**Visual Design Guidelines:**
- **Brand Integration:** Kowalah gradient background (#fa26a0 to #ae10e3)
- **Color Palette:** Professional grays (#64748b, #94a3b8), clean whites, strategic pink accents
- **Typography:** Clean, modern fonts consistent with executive brand
- **Layout:** Sophisticated, uncluttered design with clear hierarchy

**Canva Creation Instructions:**
1. **Canvas Setup:** Create [DIMENSIONS] canvas in Canva
2. **Background:** Apply Kowalah gradient or clean professional background
3. **Interface Layout:** [SPECIFIC_LAYOUT_GUIDANCE]
4. **Content Population:** [STEP_BY_STEP_CONTENT_CREATION]
5. **Brand Polish:** [FINAL_BRANDING_AND_REFINEMENT_STEPS]

**Text Content Suggestions:**
- **Primary Heading:** "[SUGGESTED_HEADING]"
- **Interface Labels:** [LIST_OF_UI_TEXT_ELEMENTS]
- **Sample Messages/Data:** [REALISTIC_CONTENT_EXAMPLES]
- **Call-to-Action Text:** [RELEVANT_BUTTON_TEXT]

**Quality Standards:**
- Executive-appropriate professional appearance
- Realistic platform functionality demonstration
- Brand-consistent visual design
- Clear value proposition communication
```

## Platform Knowledge Integration

### Digital CAIO Chat Interface Examples
```yaml
Chat Scenarios:
  Strategic Planning:
    User: "Can you help me design our AI strategy document?"
    CAIO: "Absolutely, a pragmatic AI strategy will help you align your team and plan the tactical next steps for your journey at [Company Name]. Tell me, what's driving this program? What do you want to get out of an 'AI strategy'?"
    
  Vendor Evaluation:
    User: "We're evaluating ChatGPT Enterprise vs Google Workspace AI. What should we consider?"
    CAIO: "Let me help you evaluate both platforms against your specific requirements. First, what's your primary use case - employee productivity, customer service, or specialized workflows?"
    
  Implementation Guidance:
    User: "How do we roll out AI tools without overwhelming our teams?"
    CAIO: "A phased rollout approach works best. Start with power users in each department, then expand based on adoption success. What's your current team's AI experience level?"
```

### Platform Features for Mockup Creation
- **Projects Dashboard:** AI initiative tracking, milestone progress, team assignments
- **Expert Requests:** Custom prompt development queue, GPT creation status, training session bookings
- **Accelerators:** Pre-built templates, governance frameworks, policy starters
- **Admin Interface:** User management, organization settings, usage analytics, billing overview

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

### 1. Content Analysis and Mockup Planning
```yaml
Mockup Planning Process:
  Content Review: Analyze image requirements from Astro content file
  Feature Mapping: Match image needs to specific platform capabilities
  Scenario Creation: Develop realistic use cases and data examples
  Text Generation: Create authentic interface content and messaging
```

### 2. Canva Mockup Creation Process (Standardized Dimensions)
```yaml
Creation Workflow:
  Canvas Setup: Create canvas with standardized dimensions
  Background Application: Apply Kowalah gradient or professional background
  Interface Layout: Structure mockup with realistic UI elements
  Content Population: Add suggested text, messages, and data examples
  Brand Polish: Apply final branding, colors, and visual refinements
```

### 3. Quality Standards and Brand Integration
```yaml
Quality Checklist:
  Executive Appropriate: Professional appearance suitable for CEO audience
  Platform Realistic: Authentic demonstration of actual functionality
  Brand Consistent: Kowalah colors, typography, and visual style
  Message Aligned: Clear value proposition and benefit communication
  Technically Accurate: Realistic platform capabilities and workflows
```

### 4. File Organization and Implementation
```yaml
Implementation Process:
  Directory Structure: Organize mockups in correct /public/images/ subdirectories
  File Naming: Use names that match content file references exactly
  Path Formatting: Ensure all paths start with leading slash (/images/...)
  Quality Validation: Test mockups load correctly in development environment
```

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