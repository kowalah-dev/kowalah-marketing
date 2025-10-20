# Wednesday Webinars Dynamic Scheduling System

## Overview

The Wednesday Webinars page uses a dynamic, date-based scheduling system that automatically updates which webinars are displayed based on the current date. This eliminates the need to manually update the page HTML every week.

## How It Works

### Automatic Date-Based Filtering

The system automatically:
1. **Identifies the next upcoming webinar** based on current date and displays it in a prominent spotlight card
2. **Shows the next 3 webinars** after the spotlight in smaller preview cards (single-row layout)
3. **Archives past webinars** automatically once their dates pass, displaying them with recording links
4. **Handles edge cases** like when no upcoming webinars exist (shows "Coming Soon" message)

### Single Source of Truth

All webinar data is maintained in a single JSON file:
```
src/content/webinars/schedule.json
```

This file contains an array of webinar objects with all necessary information. Update this file weekly, and the website automatically updates on the next build.

## Weekly Update Workflow

### Step 1: Update schedule.json

Every Thursday after the webinar completes:

1. Open `src/content/webinars/schedule.json`
2. Find the webinar that just completed
3. Update its properties:
   - Change `status` from `"upcoming"` to `"completed"`
   - Add the `recording_link` (YouTube, Zoom, Vimeo, or any video URL)
4. Add a new webinar to the end of the array to maintain 4-5 upcoming webinars
5. Save the file

### Step 2: Deploy

The website will automatically update on the next deployment:
- Vercel: Automatically rebuilds on push to main branch
- Manual: Run `npm run build` and deploy

**That's it!** The page will automatically:
- Move the completed webinar to the "Past Sessions Archive" section
- Promote the next webinar to the spotlight position
- Update the preview cards with the new pipeline

## File Structure

### Content Schema (`src/content.config.ts`)

The webinars collection is defined with a Zod schema:

```typescript
const webinarsCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "src/content/webinars" }),
  schema: z.object({
    webinars: z.array(
      z.object({
        id: z.string(),                    // Unique identifier
        title: z.string(),                 // Webinar title
        date: z.string(),                  // ISO format: "2025-11-05"
        displayDate: z.string(),           // Human-readable: "5th November 2025"
        time: z.string(),                  // "3PM - 4PM GMT"
        status: z.enum(["upcoming", "completed"]),
        registration_link: z.string(),
        recording_link: z.string().nullable(),  // null until webinar completes
        webinar_id: z.string().optional(),      // Zoom webinar ID
        is_recurring: z.boolean().optional(),   // Show "Weekly Series" badge
        description: z.string(),
        topics: z.array(z.string()),            // Key discussion points
        structure: z.array(                     // Session breakdown
          z.object({
            segment: z.string(),
            duration: z.string(),
            description: z.string(),
          }),
        ),
      }),
    ),
  }),
});
```

### Key Files

| File | Purpose |
|------|---------|
| `src/content/webinars/schedule.json` | Single source of truth for all webinar data |
| `src/pages/resources/wednesday-webinars.astro` | Main page with date filtering logic |
| `src/layouts/components/webinars/UpcomingWebinarCard.astro` | Spotlight card (large, detailed) |
| `src/layouts/components/webinars/UpcomingWebinarPreview.astro` | Preview cards (compact, 3-column grid) |
| `src/layouts/components/webinars/PastWebinarCard.astro` | Archive cards with recording links |
| `src/content.config.ts` | Content collection schema definition |

## Date Filtering Logic

The page uses server-side date filtering at build time:

```typescript
// Get current date
const now = new Date();

// Filter upcoming webinars (date >= now AND status = "upcoming")
const upcomingWebinars = allWebinars
  .filter(w => new Date(w.date) >= now && w.status === "upcoming")
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

// Spotlight = first upcoming webinar
const spotlightWebinar = upcomingWebinars[0];

// Previews = next 3 webinars
const previewWebinars = upcomingWebinars.slice(1, 4);

// Past webinars (date < now OR status = "completed")
const pastWebinars = allWebinars
  .filter(w => new Date(w.date) < now || w.status === "completed")
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
```

### Important: Date Format

- **Storage**: Use ISO date format in JSON: `"2025-11-05"`
- **Display**: Use human-readable format in `displayDate`: `"5th November 2025"`
- **Comparison**: JavaScript `new Date()` constructor handles ISO format correctly

## Adding a New Webinar

Add a new webinar object to the `webinars` array in `schedule.json`:

```json
{
  "id": "unique-id-description-month-year",
  "title": "Webinar Title: Compelling Subtitle",
  "date": "2025-12-10",
  "displayDate": "10th December 2025",
  "time": "3PM - 4PM GMT",
  "status": "upcoming",
  "registration_link": "https://zoom.us/webinar/register/...",
  "recording_link": null,
  "webinar_id": "984 7523 9119",
  "is_recurring": true,
  "description": "Brief description for preview cards and SEO",
  "topics": [
    "Key topic 1",
    "Key topic 2",
    "Key topic 3",
    "Key topic 4"
  ],
  "structure": [
    {
      "segment": "Opening Topic",
      "duration": "15 mins",
      "description": "Main topic description"
    },
    {
      "segment": "AI in the News",
      "duration": "15 mins",
      "description": "This Week in AI: The Business Edition"
    },
    {
      "segment": "Live Q&A",
      "duration": "30 mins",
      "description": "Open discussion and audience questions"
    }
  ]
}
```

## Marking a Webinar as Completed

After a webinar finishes, update its entry in `schedule.json`:

```json
{
  "id": "shared-projects-nov-2025",
  "status": "completed",                    // Changed from "upcoming"
  "recording_link": "https://youtube.com/watch?v=...",  // Added recording URL
  // ... rest of properties stay the same
}
```

### Supported Recording Platforms

The system automatically handles:
- **YouTube**: Extracts video ID and shows thumbnail
- **Zoom**: Direct recording links
- **Vimeo**: Direct video links
- **Any video URL**: Custom hosting

### Backward Compatibility

For older webinars using the legacy format:
```json
{
  "youtube_id": "dQw4w9WgXcQ"  // Still supported, converts to recording_link
}
```

## Component Hierarchy

### Spotlight Card (`UpcomingWebinarCard.astro`)
- **Used for**: Next upcoming webinar only
- **Features**:
  - Large, prominent display
  - Full topic list with checkmarks
  - Detailed session structure accordion
  - Register button
  - Recurring badge if applicable

### Preview Cards (`UpcomingWebinarPreview.astro`)
- **Used for**: Next 3 webinars after spotlight
- **Features**:
  - Compact design (3-column grid)
  - Shows first 2 topics only
  - "+X more topics" indicator
  - Register button
  - Weekly Series badge

### Archive Cards (`PastWebinarCard.astro`)
- **Used for**: Past webinars with recordings
- **Features**:
  - Video thumbnail (auto-generated for YouTube)
  - Play button overlay
  - Duration badge
  - "Recorded" badge
  - Watch Recording link
  - Placeholder for recordings not yet available

## Troubleshooting

### Webinar Not Showing Up

**Check the date format:**
```json
"date": "2025-11-05"  ✅ Correct
"date": "5th November 2025"  ❌ Wrong (use displayDate for this)
```

**Check the status:**
```json
"status": "upcoming"  ✅ Will show in upcoming section
"status": "completed"  ✅ Will show in archive
"status": "draft"  ❌ Not a valid status
```

**Check current date vs webinar date:**
- If webinar date < current date, it won't show in upcoming (even with "upcoming" status)
- Solution: Update status to "completed" or change date to future

### Past Webinar Still Showing in Upcoming

**Date hasn't passed yet:**
- System uses build-time date, not runtime
- Redeploy after date passes to update

**Status not updated:**
```json
"status": "upcoming"  // Change to "completed"
```

### Recording Link Not Working

**Check URL format:**
```json
"recording_link": "https://youtube.com/watch?v=..."  ✅ Full URL
"recording_link": "dQw4w9WgXcQ"  ❌ ID only (use youtube_id for this)
"recording_link": null  ✅ Shows "Coming Soon" placeholder
```

## Best Practices

### Maintain 4-5 Upcoming Webinars

Keep a pipeline of future webinars so visitors always see what's coming. Add new webinars weekly to maintain this buffer.

### Use Descriptive IDs

```json
"id": "voice-mode-nov-2025"  ✅ Clear and descriptive
"id": "webinar-5"  ❌ Not descriptive
```

### Write Compelling Descriptions

The description shows in preview cards and is crucial for registration conversions:
```json
"description": "Discover how Voice Mode transforms ChatGPT from a typing tool into a thinking partner."  ✅
"description": "We'll talk about voice mode."  ❌
```

### Update Recording Links Promptly

Add recording links within 24-48 hours of webinar completion to maintain engagement momentum.

## Technical Notes

### Build-Time vs Runtime

This is a **static site generation** system. Date filtering happens at build time, not runtime:

- ✅ Automatic on every deployment
- ✅ Fast page loads (no client-side JavaScript needed)
- ⚠️ Requires rebuild to reflect date changes (Vercel does this automatically on push)

### Type Safety

All webinar data is validated against the Zod schema in `content.config.ts`. If you add invalid data, the build will fail with a clear error message showing what's wrong.

### Performance

- Webinar images are optimized automatically by Astro's image service
- YouTube thumbnails are loaded from YouTube's CDN
- Static generation ensures fast page loads

## Future Enhancements

Potential improvements to consider:

1. **Email notifications** - Auto-notify subscribers when new webinars are added
2. **Calendar integration** - Generate .ics files for attendees
3. **Waitlist system** - Handle registration capacity limits
4. **Analytics tracking** - Monitor registration conversion rates
5. **Automated recording processing** - Auto-update recording links from Zoom API

## Questions?

For questions about this system, refer to:
- Main project docs: `/docs/`
- Astro Content Collections: https://docs.astro.build/en/guides/content-collections/
- This implementation: Git commit history on `enhancement/wednesday-webinars` branch
