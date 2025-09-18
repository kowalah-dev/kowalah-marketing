# Services Landing Page Design Document

## 1. Page Overview

- **Page name & URL:** Services | `/services`
- **Content strategy:** Static Astro page with bespoke sections; no shared collection
- **Primary objective:** Route senior executives to the most relevant service detail page while reinforcing Kowalah as the partner for enterprise ChatGPT rollouts
- **Secondary objective:** Capture consultation inquiries via primary CTA
- **Target audience:** CEOs, CIOs, and transformation leaders researching how to rescue stalled AI initiatives and evaluating Kowalah after referrals, podcasts, or webinars
- **Position in user journey:** Post-awareness → consideration; acts as gateway to deeper service detail pages

## 2. Content Architecture Decision

- **Pattern chosen:** Static page with individual Astro routes for each service detail page
- **Rationale:**
  - Each service page (ChatGPT deployment, change enablement, training, accelerators, expert requests, advisory platform) will have distinct layouts, assets, and storytelling needs
  - Avoids forcing a shared schema that would limit flexibility for bespoke sections and interactions per service
  - Keeps routing and SEO straightforward while we phase out legacy `/product/*` pages
- **Implementation details:**
  - New route `src/pages/services/index.astro` leveraging existing layouts/components for hero, comparison blocks, CTA sections
  - Each service will later live under its own static Astro page (e.g., `src/pages/services/chatgpt-enterprise-deployment.astro`) with tailored content
  - Navigation already points to `/services/...` paths; create stub pages or redirects as we develop them
- **Technical considerations:**
  - Ensure menu and footer references to `/services` resolve once the new page ships
  - Plan for 301 redirects from legacy `/product/*` URLs when new pages launch
  - Include metadata (`<title>`, `<meta description>`, canonical) tuned for the new focus on services

## 3. Key Messages

- **Primary value proposition:** Kowalah orchestrates ChatGPT enterprise deployment, change enablement, and workforce training to turn fragmented usage into a governed, AI-first organization
- **Supporting messages:**
  1. Move from shadow ChatGPT usage to secure, enterprise-ready adoption
  2. Align strategy, training, and change management under a single accountable partner
  3. Accelerate business outcomes with accelerators, expert delivery, and ongoing advisory support
- **Differentiators:** Business-led change blueprint, comprehensive training ladder (101–leadership), AI advisory platform for sustained momentum
- **Messaging alignment:** Follows the Kowalah messaging framework focus on “Accelerate AI progress from slow IT project to organization-wide adoption”

## 4. Page Structure & Components

1. **Hero Section**
   - Component: Full-width hero with gradient background (existing hero variant)
   - Copy: Before/after headline emphasising transformation; short proof statement
   - CTAs: Primary `Talk to an AI Advisor` (contact form/meeting link); secondary `Explore Services` (anchor to cards)
   - Visual: Conceptual image showing organizational transformation (AI-generated or Canva)

2. **Before & After Transformation**
   - Component: Two-column comparison (reuse homepage `transformation` pattern)
   - Content: Lists highlighting chaos (shadow usage, no policy, low ROI) vs coordinated AI program (governance, trained teams, measurable outcomes)

3. **Service Overview Grid**
   - Component: Responsive card grid (3-up desktop, single column mobile)
   - Cards: ChatGPT Enterprise Deployment, AI Change Enablement, ChatGPT Training, Expert Requests, AI Accelerators, AI Advisory Platform
   - Elements per card: Icon/image, short summary, 3 bullet capabilities, CTA button linking to respective `/services/[slug]`

4. **How We Deliver (Process)**
   - Component: Step/Process band (existing process or 3-column feature component)
   - Steps: Discover + Define Strategy → Deploy & Enable Teams → Scale & Optimize Ongoing
   - Optional CTA at end to schedule discovery call

5. **Outcomes & Differentiators**
   - Component: Feature/benefit list with icons
   - Content: Time-to-value metrics, governance assurance, workforce activation, ongoing advisory

6. **Decision Guidance**
   - Component: Table or accordion summarizing “Which service fits your situation?” (Trigger, ideal buyer, key outcome for each service)
   - Provides quick scannability for execs to pick the right deep-dive

7. **Resource Gateway (Optional)**
   - Component: Horizontal cards linking to Solutions, AI Adoption Playbook, webinars/podcast episodes
   - Keep static for now; can swap to dynamic later

8. **Final CTA Strip**
   - Component: Banner with contrasting background
   - Content: Reinforce partnership message, CTA `Book a ChatGPT Strategy Call`; optional secondary action `Download AI Adoption Playbook`

## 5. Content Requirements

- Hero headline + subheading capturing before/after transformation
- Bullet lists for before/after state
- Service-specific card copy (summary + 3 bullets + CTA labels)
- Process step titles and descriptions
- Outcomes/differentiators copy aligned with messaging framework
- Decision guidance table content
- CTA copy and contact link (confirm final destination)

## 6. Visual & Asset Notes

- Generate or design iconography for each service (AI + Canva mix)
- Use contrasting color blocks for before/after; maintain brand gradients per style guide
- Ensure imagery includes accessible alt text; keep typography consistent with theme

## 7. SEO & Metadata

- Target keywords: “ChatGPT enterprise services”, “ChatGPT deployment partner”, “ChatGPT change enablement”, “ChatGPT training enterprise”
- Meta title (~60 chars): `Enterprise ChatGPT Services | Kowalah`
- Meta description (~155 chars): Highlight deployment + enablement + training approach
- Add structured data later if FAQ-style decision guidance is implemented

## 8. Technical & Implementation Checklist

- [ ] Build `src/pages/services/index.astro` using base layout and new section components
- [ ] Update navigation tests/previews to ensure `/services` route works
- [ ] Plan stub or redirect pages for each `/services/[slug]`
- [ ] Remove legacy `/product` links once replacements are live (future task)
- [ ] Track CTA clicks via data attributes/analytics wrapper

## 9. Open Questions & Follow-Ups

- Confirm primary CTA destination (contact form vs calendar booking) and secondary CTA asset availability
- Decide if resource gateway should remain static or draw from Sanity once available
- Schedule creation of individual service page designs/content

