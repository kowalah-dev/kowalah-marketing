/**
 * Migration script: Import webinars from JSON to Sanity CMS
 *
 * This script reads the existing webinar data from src/content/webinars/schedule.json
 * and creates corresponding documents in Sanity CMS.
 *
 * Run with: node scripts/migrate-webinars.js
 */

import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Sanity client
const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.PUBLIC_SANITY_DATASET,
  apiVersion: '2025-01-05',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

/**
 * Convert plain text description to Portable Text format
 */
function textToPortableText(text) {
  return [
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: text,
          marks: [],
        },
      ],
    },
  ];
}

/**
 * Transform JSON webinar to Sanity document format
 */
function transformWebinar(webinar) {
  return {
    _type: 'webinar',
    title: webinar.title,
    slug: {
      _type: 'slug',
      current: webinar.id,
    },
    date: webinar.date,
    duration: '1 hour', // All webinars are 1 hour (3PM - 4PM)
    status: webinar.status,
    shortDescription: webinar.description,
    description: textToPortableText(webinar.description),
    topics: webinar.topics,
    sessionStructure: webinar.structure.map(segment => ({
      _type: 'sessionSegment',
      _key: Math.random().toString(36).substr(2, 9), // Generate unique key
      segment: segment.segment,
      duration: segment.duration,
      description: segment.description,
    })),
    registrationLink: webinar.registration_link,
    youtubeUrl: webinar.recording_link,
    // Note: relatedBlogPosts will need to be added manually in Sanity Studio
    // as we need to reference actual blog post documents
  };
}

/**
 * Main migration function
 */
async function migrateWebinars() {
  console.log('🚀 Starting webinar migration to Sanity...\n');

  // Read JSON file
  const jsonPath = path.join(__dirname, '../src/content/webinars/schedule.json');
  const rawData = fs.readFileSync(jsonPath, 'utf-8');
  const data = JSON.parse(rawData);

  console.log(`📋 Found ${data.webinars.length} webinars to migrate\n`);

  // Migrate each webinar
  for (const webinar of data.webinars) {
    try {
      const sanityDoc = transformWebinar(webinar);

      console.log(`📝 Migrating: ${webinar.title}`);
      console.log(`   Slug: ${webinar.id}`);
      console.log(`   Date: ${new Date(webinar.date).toLocaleDateString()}`);
      console.log(`   Status: ${webinar.status}`);

      // Create document in Sanity
      const result = await client.create(sanityDoc);

      console.log(`   ✅ Created document ID: ${result._id}\n`);

    } catch (error) {
      console.error(`   ❌ Error migrating ${webinar.title}:`, error.message);
      console.error(`   Details:`, error);
      console.log('');
    }
  }

  console.log('✨ Migration complete!\n');
  console.log('📝 Next steps:');
  console.log('   1. Visit Sanity Studio to review the imported webinars');
  console.log('   2. Add related blog posts to webinars (if desired)');
  console.log('   3. Test the webinar pages on your marketing site');
  console.log('   4. Once confirmed, you can delete src/content/webinars/schedule.json');
}

// Run migration
migrateWebinars().catch(error => {
  console.error('💥 Migration failed:', error);
  process.exit(1);
});
