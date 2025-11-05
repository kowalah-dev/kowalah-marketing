/**
 * Fix script: Add missing _key properties to webinar Portable Text blocks
 *
 * This fixes the "Missing keys" error in Sanity Studio by adding unique _key
 * properties to all Portable Text blocks and children in webinar descriptions.
 *
 * Run with: node scripts/fix-webinar-keys.js
 */

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Initialize Sanity client
const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.PUBLIC_SANITY_DATASET,
  apiVersion: '2025-01-05',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

/**
 * Generate a unique key
 */
function generateKey() {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Add _key to Portable Text blocks recursively
 */
function addKeysToPortableText(blocks) {
  if (!Array.isArray(blocks)) return blocks;

  return blocks.map(block => {
    const updatedBlock = {
      ...block,
      _key: block._key || generateKey(),
    };

    // Add keys to children if they exist
    if (Array.isArray(block.children)) {
      updatedBlock.children = block.children.map(child => ({
        ...child,
        _key: child._key || generateKey(),
      }));
    }

    return updatedBlock;
  });
}

/**
 * Main fix function
 */
async function fixWebinarKeys() {
  console.log('🔧 Starting webinar key fix...\n');

  try {
    // Fetch all webinars
    const webinars = await client.fetch(`*[_type == "webinar"] {
      _id,
      title,
      description
    }`);

    console.log(`📋 Found ${webinars.length} webinars to fix\n`);

    // Fix each webinar
    for (const webinar of webinars) {
      try {
        console.log(`🔧 Fixing: ${webinar.title}`);
        console.log(`   ID: ${webinar._id}`);

        // Add keys to description blocks
        const fixedDescription = addKeysToPortableText(webinar.description);

        // Update the document
        await client
          .patch(webinar._id)
          .set({ description: fixedDescription })
          .commit();

        console.log(`   ✅ Fixed successfully\n`);

      } catch (error) {
        console.error(`   ❌ Error fixing ${webinar.title}:`, error.message);
        console.log('');
      }
    }

    console.log('✨ Fix complete!\n');
    console.log('📝 Next steps:');
    console.log('   1. Refresh Sanity Studio');
    console.log('   2. The "Missing keys" error should be gone');
    console.log('   3. You can now edit the descriptions normally');

  } catch (error) {
    console.error('💥 Fix failed:', error);
    process.exit(1);
  }
}

// Run fix
fixWebinarKeys().catch(error => {
  console.error('💥 Fix failed:', error);
  process.exit(1);
});
