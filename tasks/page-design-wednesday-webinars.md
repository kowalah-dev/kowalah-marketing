# Wednesday Webinars - Webpage Design Document

**Created:** 2025-01-20
**URL Path:** `/resources/wednesday-webinars`
**Navigation Location:** Resources menu dropdown
**Content Strategy:** Static markdown page (Pattern 1)

---

## 1. Page Overview

### Primary Objective
Convert business leaders into registered webinar attendees by showcasing Kowalah's weekly Wednesday Webinars as the premier thought-leadership series for tactical ChatGPT usage, positioning Kowalah as the trusted ChatGPT rollout and deployment specialist for mid-sized organizations.

### Target Audience
**Primary Persona:** Business leaders at organizations with 1,000-10,000 employees including:
- **Chief Revenue Officers (CROs)** - Driving revenue growth through AI-enabled sales and customer success
- **Heads of Sales** - Equipping sales teams with ChatGPT for customer research, proposal writing, objection handling
- **Heads of Marketing** - Leveraging ChatGPT for content creation, campaign planning, market research
- **Department Heads** - Operations, HR, Finance leaders looking to transform their team's productivity
- **Managing Partners/CEOs** - Business leaders (not IT leaders) wanting tactical ChatGPT rollout guidance

**Pain Points:**
- Teams using basic ChatGPT features (email drafting, summaries) but missing advanced capabilities
- Shadow ChatGPT usage across organization with no coordination or best practices
- Failed Copilot/Gemini rollouts that employees don't actually use
- Frustration with "we know ChatGPT can do more, but don't know what we're missing"
- Need business applications, not technical training or IT governance frameworks

**Secondary Persona:** CIOs and IT Directors supporting business-led ChatGPT adoption who need practical rollout guidance and advanced capability training for their organization.

### Position in User Journey
**Discovery/Awareness Stage:** This page serves prospects who are:
- Exploring thought leadership content (from LinkedIn, email, or referrals)
- Evaluating Kowalah's expertise before engaging commercially
- Building trust through educational content consumption
- Moving from "interested in AI" to "ready to take action"

**Post-Conversion:** Registered attendees return here for:
- Past webinar recordings (nurture content)
- Calendar/reminder links
- Sharing with colleagues

---

## 2. Content Architecture Decision

### Pattern Selected: **Static Page with Markdown Content**

**Rationale:**
- ✅ **Single unique page** - This is a series landing page, not multiple webinar pages
- ✅ **Unique content structure** - Combines upcoming event promotion + past recordings archive
- ✅ **No shared schema** - This page structure is specific to the Wednesday Webinars brand
- ✅ **Simple management** - Content updated weekly (upcoming webinar details, archive additions)
- ✅ **No dynamic routing needed** - Single URL serves all webinar series content

**Implementation Pattern:**
- **File Location:** `src/content/resources/wednesday-webinars.md`
- **Page Creation:** `src/pages/resources/wednesday-webinars.astro` (static)
- **Content Access:** Custom `getMarkdownData()` utility (not Astro collections)
- **Schema Validation:** Flexible frontmatter (no strict Zod schema required)

**Why NOT a Collection:**
- ❌ No need for individual webinar pages with `[slug].astro` routing
- ❌ Not multiple items sharing the same schema
- ❌ User specifically requested "single landing page only"
- ❌ Webinar archive will use accordion/tab pattern, not separate pages

**Why NOT Sanity CMS:**
- ❌ Weekly updates are manageable via markdown
- ❌ No complex media management needs (YouTube embeds)
- ❌ Single content editor (doesn't need multi-user CMS)
- ❌ Version control preferred for webinar history

**Schema Considerations:**
This page will use flexible frontmatter to support:
- Hero section with webinar series branding
- Upcoming webinar details (dynamically highlighted)
- Past webinar archive (expandable list)
- Registration CTA sections
- Speaker/host information
- Trust elements (testimonials, stats)

---

## 3. Key Messages

### Primary Value Proposition
**"Every Wednesday at 3PM GMT: Discover What ChatGPT Can Really Do for Your Business"**

Turn ChatGPT into a creative co-worker for every team. Join business leaders from 1,000-10,000 employee organizations for live, tactical ChatGPT training you can implement immediately with your teams.

### Supporting Messages

1. **Business Applications, Not Technical Training**
   - "Not a vendor demo. Not IT governance. Real ChatGPT business applications from Kowalah, your ChatGPT deployment specialist."
   - Focuses on sales enablement, marketing productivity, team collaboration—not technical features or security policies

2. **"I Didn't Know It Could Do That" Moments Every Week**
   - "Discover advanced ChatGPT capabilities most teams don't know exist"
   - Tactical focus on ChatGPT features that drive business results: Voice for role-playing, Projects for collaboration, Custom GPTs for team workflows

3. **Practical Takeaways for Your Teams**
   - "Walk away with specific prompts, GPT ideas, and use cases you can share Monday morning"
   - Move beyond email drafting to ChatGPT as creative thinking partner for revenue growth and competitive advantage

### Competitive Differentiators
- **vs. Generic AI webinars:** ChatGPT-specific business applications (not generic "AI overview")
- **vs. Basic prompt training:** Advanced capabilities most teams don't know exist (Voice, Projects, Custom GPTs)
- **vs. Internal IT teams:** Business context and revenue focus (not just technical deployment)
- **vs. DIY approach:** Proven ChatGPT deployment expertise—learn what works without costly trial-and-error

### Messaging Framework Alignment
- **Building Block:** Capability revelation ("I didn't know it could do that") → Business applications → ChatGPT rollout services
- **Tone:** Business-focused, practical, capability-revealing (not technical or governance-focused)
- **Persona Fit:** Directly addresses business leader pain points (underutilization, shadow AI, competitive pressure)

---

## 4. Page Structure & Components

### Section Flow (Top to Bottom)

1. **Hero Section** - Webinar series branding and immediate registration CTA
2. **Upcoming Webinar Spotlight** - Next session details with primary registration CTA
3. **Why Attend** - Value proposition for senior executives
4. **Webinar Format** - What to expect (structure, timing, Q&A)
5. **Past Webinars Archive** - On-demand recordings with accordion/card layout
6. **Host/Speaker Section** - Credibility and expertise showcase
7. **FAQ Section** - Common questions (time commitment, technical requirements, etc.)
8. **Final CTA Section** - Registration + email subscription for series updates

### Theme Components to Leverage

**From SyncMaster Theme:**
- **Hero Sections:** Use `ServicesHero` component (similar to solutions pages) for consistent branding
- **Feature Grid:** Adapt for "Why Attend" benefits section
- **Accordion Component:** For FAQ section and potentially past webinar archive
- **Testimonial Slider:** For executive testimonials from past attendees
- **CTA Blocks:** For registration CTAs throughout page
- **Video Component:** For embedded YouTube recordings in archive section

**Custom Components Needed:**
- **Upcoming Webinar Card:** Prominent card with countdown timer, date/time, registration button
- **Past Webinar Card:** Thumbnail + title + duration + watch button (YouTube embed)
- **Registration Form Embed:** Integration with Zoom webinar registration (iframe or custom form)

### Content Schema Fields Required

```yaml
# Frontmatter structure for wednesday-webinars.md

---
title: "Wednesday Webinars"
meta_title: "Wednesday Webinars - Weekly AI Leadership for Executives | Kowalah"
description: "Join business leaders every Wednesday for tactical ChatGPT training and advanced capability discovery. Free live webinars from Kowalah, your ChatGPT deployment specialist."

hero:
  title: "Wednesday Webinars"
  subtitle: "Tactical ChatGPT Training for Business Leaders"
  content: "Every Wednesday at 3PM GMT, discover advanced ChatGPT capabilities for your sales, marketing, and operations teams. Turn ChatGPT into a creative co-worker, not just an email assistant."
  background_image: "/images/webinars/hero-bg.jpg"
  badge: "Free Live Series"

upcoming_webinar:
  title: "Shared Projects in ChatGPT: From Shadow AI to Shared Intelligence"
  date: "2025-11-05"
  time: "3PM - 4PM GMT"
  webinar_id: "984 7523 9119"
  registration_link: "https://zoom.us/webinar/register/WN_gh7RuiPHSaqe5a777xJxRA"
  is_recurring: true
  description: "Discover how Shared Projects turns ChatGPT into a team collaboration tool. Learn practical applications for sales handoffs, marketing campaigns, and cross-functional projects that drive business results."
  topics:
    - "What most teams miss about ChatGPT's collaboration features"
    - "How Shared Projects transforms team workflows and knowledge sharing"
    - "Business applications: sales enablement, campaign planning, project documentation"
    - "Getting teams to actually use advanced ChatGPT features"
  structure:
    - segment: "Opening Topic"
      duration: "10-15 mins"
      description: "Shared Projects: From Shadow AI to Shared Intelligence"
    - segment: "AI in the News"
      duration: "10-15 mins"
      description: "This Week in AI: The Enterprise Edition"
    - segment: "Live Q&A"
      duration: "30 mins"
      description: "Open discussion and audience questions"

why_attend:
  title: "Why Business Leaders Attend"
  subtitle: "Not your typical AI webinar"
  benefits:
    - title: "Business Applications, Not Technical Training"
      icon: "briefcase"
      content: "Focus on sales enablement, marketing productivity, and team collaboration—not IT governance or technical features."
    - title: "\"I Didn't Know It Could Do That\" Moments"
      icon: "lightbulb"
      content: "Discover advanced ChatGPT capabilities most teams don't know exist: Voice, Projects, Custom GPTs, and more."
    - title: "Practical Use Cases for Your Teams"
      icon: "clipboard-check"
      content: "Walk away with specific prompts, GPT ideas, and workflows you can share with your sales, marketing, and ops teams Monday morning."
    - title: "Turn ChatGPT Into a Creative Co-Worker"
      icon: "users"
      content: "Move beyond email drafting to ChatGPT as a creative thinking partner that drives revenue growth and competitive advantage."

format:
  title: "What to Expect"
  duration: "60 minutes"
  frequency: "Every Wednesday at 3PM GMT"
  structure_description: "Each session includes tactical ChatGPT capability demonstrations, business-focused AI news, and live Q&A where you can ask about specific use cases for your teams."

past_webinars:
  title: "Past Sessions Archive"
  subtitle: "Catch up on previous webinars on-demand"
  webinars: []  # Will be populated after first webinar
    # Future structure:
    # - title: "Shared Projects in ChatGPT"
    #   date: "2025-11-05"
    #   youtube_id: "xxxxx"
    #   duration: "58:32"
    #   topics: ["Shared Projects", "Governance", "Shadow AI"]

host:
  name: "Charlie Cowan"
  title: "Founder, Kowalah"
  bio: "Charlie helps mid-sized companies roll out ChatGPT successfully, specializing in business-focused training that reveals advanced capabilities most teams don't know exist."
  image: "/images/team/charlie-cowan.jpg"
  credentials:
    - "Led 100+ successful ChatGPT Enterprise deployments"
    - "Specialist in advanced ChatGPT capabilities (Voice, Projects, Custom GPTs)"
    - "Expert in turning shadow AI usage into structured business advantage"

faq:
  - question: "Who should attend these webinars?"
    answer: "Business leaders at organizations with 1,000-10,000 employees: CROs, Heads of Sales, Heads of Marketing, Department Heads, and CEOs/Managing Partners wanting tactical ChatGPT guidance for their teams."
  - question: "Is this technical training?"
    answer: "No. These are business-focused sessions showing practical ChatGPT applications for sales, marketing, and operations teams—not technical tutorials, IT governance, or coding."
  - question: "What if I can't attend live?"
    answer: "All registered attendees receive a recording link after the session. Past webinars are also available in our archive on this page."
  - question: "How long is each webinar?"
    answer: "60 minutes total: 10-15 min opening topic, 10-15 min AI news, and 30 min live Q&A."
  - question: "Is there a cost?"
    answer: "No, Wednesday Webinars are completely free. This is our way of sharing expertise and building the enterprise AI leadership community."
  - question: "Can I invite colleagues?"
    answer: "Absolutely! We encourage you to share the registration link with other senior leaders at your organization."

cta:
  title: "Join the Next Wednesday Webinar"
  content: "Register now to secure your spot. Limited capacity to ensure quality discussion and Q&A time."
  button:
    enable: true
    label: "Register for Free"
    link: "https://zoom.us/webinar/register/WN_gh7RuiPHSaqe5a777xJxRA"
---
```

### Mobile/Responsive Considerations
- **Registration CTAs:** Sticky bottom bar on mobile with "Register Now" button
- **Countdown Timer:** Simplified on mobile (date/time only, no full countdown)
- **Past Webinar Cards:** Stack vertically on mobile, 2-column on tablet, 3-column on desktop
- **Video Embeds:** Responsive YouTube embeds with proper aspect ratio
- **Accordion Archives:** Touch-friendly expand/collapse for past webinars on mobile

---

## 5. Content Requirements by Section

### Section 1: Hero Section
**Purpose:** Immediate brand recognition and value proposition
**Key Message:** "This is the premier weekly AI leadership series for enterprise executives"

**Content Elements:**
- **Hero Title:** "Wednesday Webinars" or "Kowalah Wednesday Webinars"
- **Subtitle/Badge:** "Free Weekly AI Leadership Series"
- **Value Proposition:** "Every Wednesday at 3PM GMT: Practical AI frameworks for CIOs and enterprise leaders"
- **Background Image:** Professional yet approachable executive setting (conference room, collaborative workspace) - aligned with visual style guide (human-centered transformation)
- **Primary CTA:** "Register for Next Webinar" button (prominent, gradient style)

**Content Length:** Concise - title + 1-2 sentence value prop
**Schema Fields:** `hero.title`, `hero.subtitle`, `hero.content`, `hero.background_image`, `hero.badge`

---

### Section 2: Upcoming Webinar Spotlight
**Purpose:** Drive immediate registration for next live session
**Key Message:** "Here's what your teams will be able to do after this Wednesday's session—register now"

**Content Elements:**
- **Webinar Title:** "Shared Projects in ChatGPT: From Shadow AI to Shared Intelligence"
- **Date/Time:** Large, clear display with timezone (3PM-4PM GMT)
- **Recurring Note:** Badge/label indicating "Weekly Series" or "Every Wednesday"
- **Countdown Timer:** Days/hours until next session (creates urgency)
- **Session Description:** 2-3 sentences on specific business applications attendees will learn
- **Key Topics List:** 4-5 bullet points of practical takeaways for sales, marketing, ops teams
- **Session Structure:** Breakdown of 60-minute format (capability demo, business-focused AI news, Q&A)
- **Zoom Details:** Webinar ID for reference (984 7523 9119)
- **Registration CTA:** Primary button with contrasting color
- **Social Proof:** "Join 150+ business leaders registered" or similar

**Content Length:** 150-200 words description + structured data
**Schema Fields:** `upcoming_webinar.title`, `upcoming_webinar.date`, `upcoming_webinar.time`, `upcoming_webinar.webinar_id`, `upcoming_webinar.registration_link`, `upcoming_webinar.is_recurring`, `upcoming_webinar.description`, `upcoming_webinar.topics`, `upcoming_webinar.structure`

**Visual Treatment:** Card or panel with subtle border, possibly slight gradient background to draw attention

---

### Section 3: Why Attend (Value Proposition)
**Purpose:** Overcome objections and demonstrate unique value
**Key Message:** "This isn't another AI webinar—here's why business leaders prioritize this every week"

**Content Elements:**
- **Section Title:** "Why Business Leaders Attend" or "What Makes This Different"
- **Subtitle:** "Not your typical AI webinar"
- **4 Key Benefits (cards or columns):**
  1. **Business Applications, Not Technical Training**
     - Icon: Briefcase
     - Content: "Focus on sales enablement, marketing productivity, and team collaboration—not IT governance or technical features."
  2. **"I Didn't Know It Could Do That" Moments**
     - Icon: Lightbulb
     - Content: "Discover advanced ChatGPT capabilities most teams don't know exist: Voice, Projects, Custom GPTs, and more."
  3. **Practical Use Cases for Your Teams**
     - Icon: Clipboard-check
     - Content: "Walk away with specific prompts, GPT ideas, and workflows you can share with your sales, marketing, and ops teams Monday morning."
  4. **Turn ChatGPT Into a Creative Co-Worker**
     - Icon: Users
     - Content: "Move beyond email drafting to ChatGPT as a creative thinking partner that drives revenue growth and competitive advantage."

**Content Length:** 4 cards, ~30-40 words each
**Schema Fields:** `why_attend.title`, `why_attend.subtitle`, `why_attend.benefits[]`

**Visual Treatment:** Use existing "Features" or "Benefits" grid component from theme

---

### Section 4: Webinar Format
**Purpose:** Set expectations and reduce friction
**Key Message:** "Here's exactly what happens in 60 minutes"

**Content Elements:**
- **Section Title:** "What to Expect"
- **Duration:** "60 minutes, every Wednesday at 3PM GMT"
- **Format Breakdown:**
  - 10-15 min: Opening topic (live demonstration of advanced ChatGPT capability with business applications)
  - 10-15 min: AI in the News (business edition—what ChatGPT features matter for your teams)
  - 30 min: Live Q&A (your specific use case questions answered)
- **Interaction Note:** "Bring your team's toughest challenges—we'll show you ChatGPT solutions live"
- **Format Highlight:** "No vendor pitch. No IT jargon. Just practical ChatGPT applications you can use immediately."

**Content Length:** 100-150 words
**Schema Fields:** `format.title`, `format.duration`, `format.frequency`, `format.structure_description`

**Visual Treatment:** Timeline or step-by-step visual layout

---

### Section 5: Past Webinars Archive
**Purpose:** Demonstrate value and provide on-demand nurture content
**Key Message:** "Couldn't attend live? Watch previous sessions on-demand"

**Content Elements:**
- **Section Title:** "Past Sessions Archive" or "Watch Previous Webinars"
- **Subtitle:** "Catch up on previous webinars on-demand"
- **Webinar Cards (repeatable structure):**
  - Thumbnail image (YouTube preview or custom thumbnail)
  - Webinar title
  - Date aired
  - Duration (e.g., "58 min")
  - Topics covered (tags/chips)
  - "Watch Now" button (opens YouTube embed or modal)
- **Filter/Sort Option (future enhancement):** By topic, date, or duration
- **Archive Note:** "New webinars added every Thursday"

**Content Length:** Repeatable card structure, grows over time
**Schema Fields:** `past_webinars.title`, `past_webinars.subtitle`, `past_webinars.webinars[]` with nested `title`, `date`, `youtube_id`, `duration`, `topics`

**Visual Treatment:** Card grid (3 columns on desktop, 2 on tablet, 1 on mobile) or accordion list for compact view

**Note:** This section will be empty at launch (no webinars yet) but structure should be ready for weekly additions.

---

### Section 6: Host/Speaker Section
**Purpose:** Build credibility and trust
**Key Message:** "Learn from someone who's led 100+ successful ChatGPT deployments"

**Content Elements:**
- **Section Title:** "Your Host" or "Meet Your ChatGPT Specialist"
- **Host Photo:** Professional headshot (Charlie Cowan)
- **Name & Title:** "Charlie Cowan, Founder of Kowalah"
- **Bio:** 2-3 sentences highlighting:
  - Expertise in ChatGPT rollout and business-focused training
  - Specialist in revealing advanced capabilities teams don't know exist
  - Experience with 1,000-10,000 employee organizations
- **Credentials List (bullets):**
  - "Led 100+ successful ChatGPT Enterprise deployments"
  - "Specialist in advanced ChatGPT capabilities (Voice, Projects, Custom GPTs)"
  - "Expert in turning shadow AI usage into structured business advantage"
- **Optional:** Social proof (LinkedIn profile link, "Connect on LinkedIn" CTA)

**Content Length:** 80-120 words bio + 3-4 credential bullets
**Schema Fields:** `host.name`, `host.title`, `host.bio`, `host.image`, `host.credentials[]`

**Visual Treatment:** 2-column layout (image left, content right) or centered card layout

---

### Section 7: FAQ Section
**Purpose:** Overcome objections and reduce registration friction
**Key Message:** "Everything you need to know before registering"

**Content Elements:**
- **Section Title:** "Frequently Asked Questions"
- **FAQ Accordion (6-8 questions):**
  1. **"Who should attend these webinars?"**
     - Answer: Target audience description (CIOs, IT Directors, transformation executives at 1,000-10,000 employee orgs)
  2. **"Is this technical training?"**
     - Answer: No, executive-level strategy focused on governance and adoption
  3. **"What if I can't attend live?"**
     - Answer: Recording sent to all registrants + archive available on this page
  4. **"How long is each webinar?"**
     - Answer: 60 minutes (format breakdown)
  5. **"Is there a cost?"**
     - Answer: Free, no cost, thought leadership contribution to AI community
  6. **"Can I invite colleagues?"**
     - Answer: Yes, encourage sharing registration link
  7. **"What platform do you use?"**
     - Answer: Zoom webinars, link sent after registration
  8. **"How do I ask questions during the webinar?"**
     - Answer: Live Q&A segment, submit via Zoom chat or raise hand

**Content Length:** 6-8 Q&A pairs, 30-60 words per answer
**Schema Fields:** `faq[]` with `question` and `answer` fields

**Visual Treatment:** Use theme's Accordion component for expand/collapse interaction

---

### Section 8: Final CTA Section
**Purpose:** Final conversion opportunity
**Key Message:** "Don't miss Wednesday's session—register now"

**Content Elements:**
- **CTA Title:** "Join the Next Wednesday Webinar" or "Reserve Your Spot for This Wednesday"
- **CTA Content:** "Register now to secure your spot. Limited capacity to ensure quality discussion and Q&A time."
- **Primary Button:** "Register for Free" (links to Zoom registration)
- **Secondary CTA (optional):** "Subscribe for Series Updates" (email opt-in for all future webinars)
- **Trust Element:** "Join [X] executives already registered" or "350+ leaders have attended our webinars"
- **Background:** Gradient or subtle background image to draw attention

**Content Length:** 20-40 words
**Schema Fields:** `cta.title`, `cta.content`, `cta.button.enable`, `cta.button.label`, `cta.button.link`

**Visual Treatment:** Full-width section with gradient background (similar to pricing page CTA) or contained card with contrasting background

---

## 6. SEO Requirements

### Primary Keywords
- **Primary:** "AI leadership webinars", "enterprise AI webinars", "ChatGPT for executives"
- **Secondary:** "AI governance webinars", "CIO AI training", "enterprise ChatGPT adoption"
- **Long-tail:** "weekly AI webinars for CIOs", "ChatGPT shared projects webinar", "AI strategy for mid-size companies"

### Meta Tags
**Meta Title (60 chars):**
`Wednesday Webinars - Weekly AI Leadership for Executives | Kowalah`

**Meta Description (155 chars):**
`Join business leaders every Wednesday for tactical ChatGPT training and advanced capability discovery. Free live webinars from Kowalah, your ChatGPT deployment specialist.`

### Heading Structure
- **H1:** "Wednesday Webinars" (hero section)
- **H2s:**
  - "Next Webinar: [Webinar Title]"
  - "Why Business Leaders Attend"
  - "What to Expect"
  - "Past Sessions Archive"
  - "Your Host" or "Meet Your ChatGPT Specialist"
  - "Frequently Asked Questions"
- **H3s:** Individual benefit titles, FAQ questions, webinar card titles

### Structured Data Needs
**Schema.org markup for events:**
```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Wednesday Webinars: [Upcoming Webinar Title]",
  "startDate": "2025-11-05T15:00:00Z",
  "endDate": "2025-11-05T16:00:00Z",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
  "location": {
    "@type": "VirtualLocation",
    "url": "https://zoom.us/webinar/register/WN_gh7RuiPHSaqe5a777xJxRA"
  },
  "organizer": {
    "@type": "Organization",
    "name": "Kowalah",
    "url": "https://www.kowalah.com"
  },
  "description": "[Upcoming webinar description]",
  "isAccessibleForFree": true
}
```

**Video Schema for Past Webinars:**
```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "[Past Webinar Title]",
  "description": "[Webinar description]",
  "uploadDate": "[Upload date]",
  "contentUrl": "https://www.youtube.com/watch?v=[video_id]",
  "embedUrl": "https://www.youtube.com/embed/[video_id]"
}
```

### Additional SEO Considerations
- **Canonical URL:** `https://www.kowalah.com/resources/wednesday-webinars`
- **Open Graph Tags:** Featured image (webinar branding graphic), description, title
- **Twitter Card:** Summary with large image
- **Internal Linking:** Link from blog posts, resources pages, and footer
- **External Backlinks:** Encourage sharing on LinkedIn, embed calendar invites with page link

---

## 7. User Experience Flow

### Entry Points (How Users Arrive)
1. **LinkedIn Post/Ad:** Charlie's personal posts or Kowalah company page content promoting upcoming webinar
2. **Email Invitation:** Email campaigns sent to existing contacts/prospects (scheduled for 2 weeks before + 2 days before)
3. **Blog Post CTAs:** In-content and footer CTAs from Insights/Blog articles
4. **Resources Menu:** Navigation from main menu dropdown (Resources > Wednesday Webinars)
5. **Referral/Share:** Registered attendees share link with colleagues
6. **Search:** Organic search for "enterprise AI webinars" or similar queries
7. **Retargeting Ads:** Display/social ads to site visitors who haven't registered

### Key Actions on Page
**Primary Action:** Click "Register for Next Webinar" CTA (multiple placements)
- Hero section registration button
- Upcoming webinar card registration button
- Final CTA section registration button

**Secondary Actions:**
- Watch past webinar recordings (archive section)
- Read FAQ to overcome objections
- Share page link with colleagues (social share buttons)
- Subscribe to email updates for all future webinars

**Tertiary Actions:**
- Add event to calendar (post-registration)
- Connect with host on LinkedIn
- Browse other Resources content

### Exit Points (Where Users Should Go Next)
**Successful Registration:**
1. **Zoom Registration Confirmation Page:** External (Zoom-hosted thank you page)
2. **Return to Kowalah:** Email confirmation with link back to wednesday-webinars page for calendar invite
3. **Post-Webinar:** Email with recording link → drives back to archive section

**Exploration:**
1. **Other Resources:** Blog/Insights for deeper content consumption
2. **Services Pages:** For users interested in Kowalah's offerings (ChatGPT Deployment, Training, Advisory)
3. **Contact Page:** For immediate consultation requests
4. **Pricing Page:** For users ready to explore commercial engagement

**Nurture:**
1. **Blog Subscribe:** Email opt-in for ongoing content
2. **LinkedIn Follow:** Connect on social for ongoing updates
3. **Archive Binge:** Multiple past webinar recordings for deeper engagement

### Navigation Integration
**Primary Navigation (Resources Dropdown):**
- Add "Wednesday Webinars" as new menu item:
```json
{
  "name": "Wednesday Webinars",
  "url": "/resources/wednesday-webinars"
}
```

**Position:** After "Videos", before "Recommended Books" in Resources dropdown

**Footer Navigation:**
- Add to "RESOURCES" section in footer
- Ensures discoverability from any page

**Breadcrumb:**
`Home > Resources > Wednesday Webinars`

---

## 8. Calls-to-Action

### Primary CTA: "Register for Next Webinar"
**Placement:**
1. **Hero Section:** Above fold, prominent button (gradient style)
2. **Upcoming Webinar Card:** Within spotlight section, repeated for emphasis
3. **Final CTA Section:** Bottom of page conversion opportunity
4. **Sticky Mobile Bar (optional):** Fixed bottom bar on mobile with registration button

**Button Copy:**
- "Register for Free"
- "Secure Your Spot"
- "Join This Wednesday"

**Visual Style:**
- Gradient button (primary to secondary pink-purple)
- High contrast with background
- Hover state with slight scale/shadow effect

**Link Destination:**
- External: Zoom webinar registration URL
- Opens in new tab to preserve user's place on page
- Tracks conversion via analytics event

**Success Metrics:**
- Click-through rate from each CTA placement
- Registration completion rate
- Attribution to email, LinkedIn, or organic source

---

### Secondary CTA: "Watch Past Webinars"
**Placement:**
1. **Past Webinars Archive Section:** Individual "Watch Now" buttons on each webinar card
2. **Below Upcoming Webinar (optional):** "Can't make it live? Watch previous sessions" link

**Button Copy:**
- "Watch Now"
- "View Recording"
- "Play Video"

**Visual Style:**
- Outline button (less prominent than primary CTA)
- Plays icon (triangle/play symbol)

**Link Destination:**
- In-page YouTube embed (modal or expand)
- Tracks video plays via analytics

**Success Metrics:**
- Video play rate
- Average watch time
- Conversion from video viewers to registrations

---

### Tertiary CTA: "Subscribe for Series Updates"
**Placement:**
1. **Final CTA Section:** Below primary registration CTA
2. **Post-Webinar Thank You (future):** Email opt-in for all future webinars

**Button Copy:**
- "Subscribe for Updates"
- "Get All Webinar Invites"
- "Join the Series"

**Visual Style:**
- Text link or subtle button (tertiary style)
- Email icon

**Link Destination:**
- Email opt-in form (embed or link to form)
- Could use Mailchimp, HubSpot, or Clerk email capture

**Success Metrics:**
- Email subscription rate
- Email open/click rates for subsequent webinar invites

---

### Micro-Conversions to Track
1. **Scroll Depth:** How far users scroll (are they seeing past webinars archive?)
2. **CTA Clicks:** Individual button performance (hero vs. spotlight vs. final CTA)
3. **FAQ Accordion Opens:** Which questions are most commonly viewed?
4. **Video Plays:** How many past webinar recordings are watched?
5. **Time on Page:** Indicator of engagement and content quality
6. **Calendar Adds:** Post-registration, how many add to calendar?
7. **Social Shares:** LinkedIn, Twitter, email forwards

---

## 9. Trust & Social Proof

### Testimonials from Past Attendees
**Goal:** Build credibility and overcome skepticism
**Format:** Short quote testimonials with name, title, company

**Example Testimonials (to be collected after webinars):**
> "Finally, an AI webinar that doesn't waste my time with vendor pitches. I walked away with a governance framework I implemented the next week."
> — **Sarah Mitchell, CIO, [Company Name]** (1,200 employees, Manufacturing)

> "The weekly Q&A is worth it alone. Charlie tackles the hard questions about shadow AI and compliance that no one else addresses."
> — **James Thompson, VP of IT, [Company Name]** (3,500 employees, Financial Services)

> "I've attended every Wednesday for 2 months. It's become part of my AI strategy routine."
> — **David Chen, Head of Digital Transformation, [Company Name]** (5,000 employees, Healthcare)

**Placement:**
- Carousel/slider in "Why Attend" section
- Individual quotes throughout page (between sections)
- Could also use theme's TestimonialSlider component

**Collection Strategy:**
- Post-webinar survey asking for feedback
- Permission to use quotes (with attribution)
- Offer incentive (free resource, consultation) for testimonials

---

### Attendance Statistics & Social Proof
**Dynamic Elements (update weekly):**
- "Join [X] executives already registered for this Wednesday"
- "350+ leaders have attended our webinars"
- "Averaging 120 live attendees per session"
- "95% of attendees rate sessions as 'valuable' or 'extremely valuable'"

**Placement:**
- Below registration CTA buttons
- In upcoming webinar spotlight card
- Hero section badge

**Visual Treatment:**
- Small text or badge element
- Could use live counter animation

---

### Certifications & Credentials
**Host Credentials:**
- Display relevant certifications, speaking engagements, or publications
- LinkedIn profile link for verification
- "Featured in [Publications]" if applicable

**Kowalah Brand Trust:**
- "Trusted by [X] enterprise organizations"
- "Advisors to Fortune 500 companies" (if applicable)
- Client logos (if permission granted)

---

### Past Webinar Proof
**Once archive grows:**
- "Watch 12+ past sessions on-demand"
- Total view count across all recordings
- "Replays watched [X] times"

---

### Integration with Dynamic Content (Sanity - Future)
**Potential Future Enhancement:**
If webinar testimonials grow significantly, could migrate testimonials to Sanity CMS for:
- Easy addition of new testimonials weekly
- Rich media (headshots, video testimonials)
- Filtering by industry or role

For now, markdown frontmatter array is sufficient:
```yaml
testimonials:
  - quote: "..."
    name: "Sarah Mitchell"
    title: "CIO"
    company: "Company Name"
    company_size: "1,200 employees"
    industry: "Manufacturing"
```

---

## 10. Technical Implementation

### File Structure
```
src/
├── content/
│   └── resources/
│       └── wednesday-webinars.md           # Main content file (frontmatter + markdown)
├── pages/
│   └── resources/
│       └── wednesday-webinars.astro        # Page template
├── layouts/
│   └── components/
│       ├── webinars/
│       │   ├── UpcomingWebinarCard.astro   # Custom component for next webinar
│       │   ├── PastWebinarCard.astro       # Card for archive webinars
│       │   └── CountdownTimer.tsx          # React component for countdown
│       └── (reuse existing theme components)
├── styles/
│   └── webinars.css                        # Page-specific styles (if needed)
public/
└── images/
    └── webinars/
        ├── hero-bg.jpg                     # Hero background image
        ├── webinar-thumbnails/             # Thumbnails for past webinars
        └── host-photo.jpg                  # Charlie's headshot
```

### Page Template Structure (`wednesday-webinars.astro`)
```astro
---
import Base from "@/layouts/Base.astro";
import ServicesHero from "@/layouts/components/services/ServicesHero.astro";
import UpcomingWebinarCard from "@/layouts/components/webinars/UpcomingWebinarCard.astro";
import PastWebinarCard from "@/layouts/components/webinars/PastWebinarCard.astro";
import Benefits from "@/layouts/components/home/Benefits.astro";
import Accordion from "@/shortcodes/Accordion";
import Button from "@/shortcodes/Button";
import { getMarkdownData } from "@/lib/contentParser"; // Custom utility for non-collection markdown

// Fetch webinar page data
const webinarData = await getMarkdownData("resources/wednesday-webinars.md");
const {
  title,
  meta_title,
  description,
  hero,
  upcoming_webinar,
  why_attend,
  format,
  past_webinars,
  host,
  faq,
  cta
} = webinarData;

// Structured data for SEO
const upcomingWebinarSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": upcoming_webinar.title,
  "startDate": new Date(upcoming_webinar.date + "T15:00:00Z").toISOString(),
  "endDate": new Date(upcoming_webinar.date + "T16:00:00Z").toISOString(),
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
  "location": {
    "@type": "VirtualLocation",
    "url": upcoming_webinar.registration_link
  },
  "organizer": {
    "@type": "Organization",
    "name": "Kowalah",
    "url": "https://www.kowalah.com"
  },
  "description": upcoming_webinar.description,
  "isAccessibleForFree": true
};
---

<Base title={title} meta_title={meta_title} description={description}>
  <!-- Structured Data -->
  <script type="application/ld+json" set:html={JSON.stringify(upcomingWebinarSchema)} />

  <!-- Hero Section -->
  <ServicesHero
    title={hero.title}
    subtitle={hero.subtitle}
    cta={{
      label: "Register for Free",
      link: upcoming_webinar.registration_link,
      subtext: "Join senior executives every Wednesday"
    }}
    image={hero.background_image}
    badge={hero.badge}
  />

  <!-- Upcoming Webinar Spotlight -->
  <section class="section">
    <div class="container">
      <UpcomingWebinarCard webinar={upcoming_webinar} />
    </div>
  </section>

  <!-- Why Attend (Benefits) -->
  <Benefits benefits={why_attend} />

  <!-- Webinar Format -->
  <section class="section bg-gray-50">
    <div class="container">
      <div class="row justify-center">
        <div class="lg:col-8 text-center">
          <h2>{format.title}</h2>
          <p class="text-lg mt-4">{format.structure_description}</p>
          <!-- Format breakdown visualization -->
        </div>
      </div>
    </div>
  </section>

  <!-- Past Webinars Archive -->
  {past_webinars.webinars && past_webinars.webinars.length > 0 && (
    <section class="section">
      <div class="container">
        <h2 class="text-center mb-12">{past_webinars.title}</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {past_webinars.webinars.map((webinar) => (
            <PastWebinarCard webinar={webinar} />
          ))}
        </div>
      </div>
    </section>
  )}

  <!-- Host Section -->
  <section class="section bg-gray-50">
    <div class="container">
      <div class="row items-center">
        <div class="lg:col-4">
          <img src={host.image} alt={host.name} class="rounded-xl" />
        </div>
        <div class="lg:col-8">
          <h2>{host.name}</h2>
          <p class="text-lg text-primary mb-4">{host.title}</p>
          <p class="mb-6">{host.bio}</p>
          <ul class="space-y-2">
            {host.credentials.map((credential) => (
              <li class="flex items-start">
                <span class="text-primary mr-2">✓</span>
                <span>{credential}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="section">
    <div class="container">
      <h2 class="text-center mb-12">Frequently Asked Questions</h2>
      <div class="row justify-center">
        <div class="lg:col-8">
          <Accordion items={faq} />
        </div>
      </div>
    </div>
  </section>

  <!-- Final CTA -->
  <section class="section pb-0">
    <div class="container">
      <div class="rounded-3xl bg-gradient-to-br from-primary to-secondary px-12 py-16 text-center">
        <h2 class="text-white mb-4">{cta.title}</h2>
        <p class="text-white/90 mb-8">{cta.content}</p>
        <Button
          label={cta.button.label}
          link={cta.button.link}
          style="white"
        />
      </div>
    </div>
  </section>
</Base>
```

### Custom Components Needed

#### 1. `UpcomingWebinarCard.astro`
**Purpose:** Display next webinar with countdown timer and registration CTA

**Props:**
```typescript
interface Props {
  webinar: {
    title: string;
    date: string;
    time: string;
    description: string;
    topics: string[];
    structure: Array<{
      segment: string;
      duration: string;
      description: string;
    }>;
    registration_link: string;
  };
}
```

**Features:**
- Countdown timer (React component for interactivity)
- Date/time display with timezone
- Topic list
- Session structure breakdown
- Prominent registration CTA
- Visual hierarchy (large card, gradient border or shadow)

#### 2. `PastWebinarCard.astro`
**Purpose:** Display archived webinar with thumbnail and watch button

**Props:**
```typescript
interface Props {
  webinar: {
    title: string;
    date: string;
    youtube_id: string;
    duration: string;
    topics: string[];
  };
}
```

**Features:**
- YouTube thumbnail image
- Webinar title and date
- Duration badge
- Topic tags/chips
- "Watch Now" button (opens YouTube embed modal or inline)
- Hover effect (scale, shadow)

#### 3. `CountdownTimer.tsx` (React)
**Purpose:** Live countdown to next webinar

**Props:**
```typescript
interface Props {
  targetDate: string; // ISO date string
}
```

**Features:**
- Real-time countdown (days, hours, minutes, seconds)
- Updates every second
- Graceful handling when event is in past
- Responsive typography

**Implementation:**
```tsx
import { useState, useEffect } from 'react';

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    // Calculate days, hours, minutes, seconds
    // Return object
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-timer">
      {/* Display time left */}
    </div>
  );
}
```

### Astro Collection Schema Updates
**Not applicable** - Using static page pattern (Pattern 1), not collections.

However, if future migration to collections is needed:
```typescript
// Future: src/content.config.ts
const webinarsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/webinars" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    youtube_id: z.string().optional(),
    description: z.string(),
    topics: z.array(z.string()),
    // ... etc
  })
});
```

### Performance Considerations
1. **Image Optimization:**
   - Use Astro's `<Image>` component for hero background
   - YouTube thumbnails loaded via `loading="lazy"`
   - Responsive images (srcset) for different screen sizes

2. **Video Embeds:**
   - Use lite-youtube-embed or similar for past webinars (loads player on click)
   - Prevents heavy YouTube iframe from loading on page load
   - Improves Lighthouse performance score

3. **JavaScript:**
   - Countdown timer is only interactive element (small React component)
   - Consider server-side rendering initial countdown state
   - Use `client:load` or `client:visible` directive strategically

4. **CSS:**
   - Leverage existing theme styles where possible
   - Minimize custom CSS
   - Use Tailwind utility classes for consistency

5. **Third-Party Scripts:**
   - Zoom registration link (external, no embed needed)
   - YouTube embeds (lazy-loaded)
   - Analytics tracking (defer or async)

**Lighthouse Goals:**
- Performance: >90
- Accessibility: 100
- Best Practices: 100
- SEO: 100

### Integration Requirements

#### Menu Integration
**File:** `src/config/menu.json`

**Change:**
```json
{
  "name": "Resources",
  "url": "",
  "hasChildren": true,
  "children": [
    { "name": "Blog & Insights", "url": "/insights" },
    { "name": "Videos", "url": "/resources/videos" },
    { "name": "Wednesday Webinars", "url": "/resources/wednesday-webinars" },
    { "name": "Recommended Books", "url": "/resources/recommended-books" },
    { "name": "Documentation", "url": "https://docs.kowalah.com" }
  ]
}
```

#### Footer Integration
**File:** `src/config/menu.json` (footer section)

**Change:**
```json
{
  "title": "RESOURCES",
  "children": [
    { "name": "Insights", "url": "/insights" },
    { "name": "Videos", "url": "/resources/videos" },
    { "name": "Wednesday Webinars", "url": "/resources/wednesday-webinars" },
    { "name": "Recommended Books", "url": "/resources/recommended-books" },
    { "name": "Documentation", "url": "https://docs.kowalah.com" }
  ]
}
```

#### Analytics Tracking
**Events to Track:**
- `webinar_registration_click` - User clicks registration CTA
- `webinar_video_play` - User plays past webinar recording
- `webinar_faq_open` - User expands FAQ question
- `webinar_page_scroll` - Scroll depth milestones (25%, 50%, 75%, 100%)
- `webinar_share` - Social share button clicks

**Implementation:** Use Vercel Analytics or Google Tag Manager

#### Email Marketing Integration (Future)
**For "Subscribe for Series Updates" CTA:**
- Integrate with Mailchimp, HubSpot, or ConvertKit
- Capture email + name
- Tag subscribers as "Wednesday Webinars"
- Automated weekly email with registration link

**Not required for MVP** - focus on Zoom registration first

---

## 11. Content Creation Notes

### Tone and Voice Guidelines
**Brand Alignment:**
- **Executive-level:** Professional, authoritative, strategic (avoid casual or overly technical)
- **Approachable:** Warm, human, conversational (not stuffy or academic)
- **Practical:** Action-oriented, tangible, results-focused (not theoretical)
- **Confident:** Positioning as trusted advisor (not salesy or promotional)

**Writing Style:**
- **Second person ("you"):** Speak directly to executives
- **Active voice:** "Join senior executives" not "Senior executives are joined"
- **Concrete language:** "Walk away with a governance framework" not "Gain insights"
- **Benefit-driven:** Lead with outcomes, not features

**Example Comparisons:**
❌ **Too Casual:** "Hey there! Wanna learn some cool AI tricks?"
✅ **Right Tone:** "Join senior executives for practical AI governance frameworks you can implement immediately."

❌ **Too Technical:** "Explore the API-driven orchestration of large language models"
✅ **Right Tone:** "Learn how ChatGPT Shared Projects transform collaboration and governance"

❌ **Too Salesy:** "Sign up now for the world's #1 AI webinar series!"
✅ **Right Tone:** "Every Wednesday at 3PM GMT: Practical AI leadership for enterprise executives"

### Content Collection Format
**Markdown File Structure:**
- Use YAML frontmatter for all structured data (see Section 5 for full schema)
- Minimal markdown body content (most content lives in frontmatter)
- Use markdown body for long-form sections if needed (e.g., detailed webinar descriptions)

**Example:**
```markdown
---
title: "Wednesday Webinars"
meta_title: "..."
hero:
  title: "..."
  content: "..."
# ... rest of frontmatter
---

<!-- Optional markdown body content here -->
Additional narrative content or HTML embeds if needed.
```

### Image & Media Requirements

#### Hero Background Image
**Specifications:**
- **Dimensions:** 1920x800px (16:10 aspect ratio)
- **File Type:** JPG or WebP (optimized)
- **File Size:** <500KB
- **Subject Matter:** Professional executive setting (aligned with visual style guide)
  - Human-centered transformation photography
  - Conference room, collaborative workspace, or individual at desk
  - Natural lighting, warm tones (Fujifilm color science)
  - Avoid: sterile boardrooms, stock photo clichés
- **Overlay:** Gradient overlay (primary to secondary) for text legibility

**Reference:** See `docs/context/visual-style-guide.md` for photography direction

#### Host Photo
**Specifications:**
- **Dimensions:** 400x400px (1:1 square)
- **File Type:** JPG or WebP
- **Subject:** Charlie Cowan professional headshot
- **Style:** Approachable, confident, executive-level
- **Background:** Neutral or subtly blurred

#### Past Webinar Thumbnails
**Specifications:**
- **Dimensions:** 1280x720px (16:9 - YouTube standard)
- **File Type:** JPG
- **Design:** Custom thumbnail template with:
  - Webinar title overlay
  - Kowalah branding (logo or gradient)
  - Date stamp
  - Speaker headshot (optional)
- **Consistency:** Use template for all thumbnails

**YouTube Automatic Thumbnails:** Can use YouTube's auto-generated thumbnails initially, but custom thumbnails increase click-through rates

#### Icons
**Source:** Heroicons (@heroicons/react)
- Use 24x24 outline or solid icons
- Consistent style throughout page
- Map icon names to semantic meanings in frontmatter

**Example Icons:**
- Briefcase (`briefcase`) - Executive enablement
- Clipboard-check (`clipboard-check`) - Practical frameworks
- Users (`users`) - Peer network
- Lightbulb (`lightbulb`) - Thought leadership
- Clock (`clock`) - Duration/time
- Calendar (`calendar`) - Schedule

### Schema Validation Requirements
**No strict Zod validation** (static page pattern), but maintain consistent frontmatter structure:

**Required Fields:**
- `title`, `meta_title`, `description`
- `hero` (title, subtitle, content, background_image)
- `upcoming_webinar` (all fields)
- `why_attend`, `format`, `host`, `faq`, `cta`

**Optional Fields:**
- `past_webinars.webinars[]` (empty array at launch)
- `testimonials[]` (add after first webinar)

**Validation Strategy:**
- Manual review during content updates
- TypeScript types in page component for IntelliSense
- Could add runtime validation with Zod if needed later

### Content Update Workflow (Weekly)
**After Each Webinar:**
1. Update `upcoming_webinar` section with next week's details
2. Add completed webinar to `past_webinars.webinars[]` array:
   ```yaml
   - title: "Shared Projects in ChatGPT"
     date: "2025-11-05"
     youtube_id: "dQw4w9WgXcQ"
     duration: "58:32"
     topics: ["Shared Projects", "Governance", "Shadow AI"]
   ```
3. Upload recording to YouTube (Kowalah channel)
4. Create custom thumbnail
5. Update registration link if Zoom webinar ID changes
6. Test all CTAs and links

**Content Ownership:**
- **Primary:** Marketing/content team
- **Backup:** Webinar host (Charlie) for topic details
- **Technical:** Developer for schema updates or component changes

### Accessibility Considerations
- **Alt Text:** All images require descriptive alt text
- **Heading Hierarchy:** Proper H1 > H2 > H3 structure (no skips)
- **Form Labels:** Registration CTAs clearly labeled
- **Keyboard Navigation:** All interactive elements keyboard-accessible
- **Color Contrast:** Ensure WCAG AA compliance (4.5:1 ratio for text)
- **Video Captions:** YouTube auto-captions (or manual captions for better accuracy)
- **Screen Reader:** Semantic HTML, ARIA labels where needed

**Testing:**
- Run Lighthouse accessibility audit (target: 100 score)
- Test with screen reader (VoiceOver, NVDA)
- Keyboard-only navigation test

---

## Summary & Next Steps

### What We're Building
A single landing page for Kowalah's **Wednesday Webinars** series—a weekly thought-leadership program targeting business leaders (CROs, Sales, Marketing, Department Heads). The page drives registrations for upcoming live sessions while providing on-demand access to past recordings, positioning Kowalah as the ChatGPT deployment specialist for mid-sized organizations.

### Key Differentiators
- **Business-focused:** Not IT governance, but tactical ChatGPT applications for sales, marketing, ops teams
- **Capability revelation:** "I didn't know it could do that" moments with advanced features (Voice, Projects, Custom GPTs)
- **Practical takeaways:** Specific prompts, GPT ideas, and use cases attendees can share with teams Monday morning
- **Consistent cadence:** Weekly Wednesday webinars build habit and position Kowalah as ChatGPT deployment specialist

### Technical Approach
- **Static markdown page** (Pattern 1) for simplicity and performance
- **Reuse theme components** (ServicesHero, Benefits, Accordion) where possible
- **3 custom components:** UpcomingWebinarCard, PastWebinarCard, CountdownTimer
- **Integrations:** Zoom registration (external), YouTube embeds (lazy-loaded)

### Content Priorities
1. **Upcoming webinar spotlight** - Drive registrations
2. **Clear value proposition** - Overcome "another webinar" skepticism
3. **Trust elements** - Host credentials, testimonials, social proof
4. **Past webinar archive** - Nurture content for non-registrants

### Success Metrics
- **Primary:** Webinar registration rate (% of page visitors who register)
- **Secondary:** Archive video plays, time on page, email subscriptions
- **Long-term:** Registered attendee → qualified lead → customer conversion rate

### Immediate Next Steps
1. **Create content file:** `src/content/resources/wednesday-webinars.md` with frontmatter
2. **Build page template:** `src/pages/resources/wednesday-webinars.astro`
3. **Develop custom components:** UpcomingWebinarCard, PastWebinarCard, CountdownTimer
4. **Source images:** Hero background, host photo, placeholder thumbnails
5. **Update navigation:** Add to Resources menu and footer
6. **Test registration flow:** Ensure Zoom link works, analytics tracking fires
7. **SEO optimization:** Meta tags, structured data, OpenGraph tags
8. **Accessibility audit:** Lighthouse check, keyboard navigation test
9. **Preview deployment:** Vercel preview for review
10. **Launch promotion:** Email invite, LinkedIn posts, blog cross-promotion

---

## Appendix: Reference Materials

### Related Documentation
- **Product Overview:** `@docs/product-overview.md` - Kowalah ICP, personas, value proposition
- **Visual Style Guide:** `@docs/context/visual-style-guide.md` - Photography and image requirements
- **Webinar Purpose:** `@docs/webinars/Webinar_Purpose_Statement.md` - Series strategy and goals
- **First Webinar:** `@docs/webinars/Webinar_Wednesdays_5th_November.md` - Inaugural session details

### Example URLs
- **Live Page URL:** `https://www.kowalah.com/resources/wednesday-webinars`
- **Zoom Registration:** `https://zoom.us/webinar/register/WN_gh7RuiPHSaqe5a777xJxRA`
- **YouTube Channel:** (To be added when available)

### Design References
- **Similar Pages:** `/resources/recommended-books`, `/resources/videos` (for navigation consistency)
- **CTA Style:** `/pricing` (gradient CTA section), `/solutions/*` (ServicesHero component)
- **Archive Layout:** `/insights` (blog grid) - adapt for video cards

### Contact for Questions
- **Content:** Charlie Cowan (webinar host, topic expert)
- **Technical:** Development team (component implementation, integrations)
- **Design:** Marketing team (image sourcing, brand alignment)

---

**End of Webpage Design Document**
