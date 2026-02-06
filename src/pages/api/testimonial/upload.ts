import type { APIRoute } from 'astro';
import { put } from '@vercel/blob';

// Opt out of static generation - this endpoint needs to run at request time
export const prerender = false;

// Allowed file types
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse multipart form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const type = formData.get('type') as string | null;
    const sessionId = formData.get('sessionId') as string | null;

    // Validate inputs
    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file provided' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!type || !['avatar', 'logo', 'additional'].includes(type)) {
      return new Response(
        JSON.stringify({ error: 'Invalid upload type' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!sessionId) {
      return new Response(
        JSON.stringify({ error: 'Session ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return new Response(
        JSON.stringify({ error: 'Invalid file type. Please upload a JPG, PNG, or WebP image.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate file size
    if (file.size > MAX_SIZE) {
      return new Response(
        JSON.stringify({ error: 'File too large. Maximum size is 5MB.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check for Vercel Blob token
    const blobToken = import.meta.env.BLOB_READ_WRITE_TOKEN;
    if (!blobToken) {
      console.error('BLOB_READ_WRITE_TOKEN not configured');
      return new Response(
        JSON.stringify({ error: 'Storage configuration error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate a unique filename
    const extension = file.name.split('.').pop() || 'jpg';
    const timestamp = Date.now();
    const filename = `testimonials/${sessionId}/${type}-${timestamp}.${extension}`;

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: 'public',
      token: blobToken,
    });

    return new Response(
      JSON.stringify({
        url: blob.url,
        filename: blob.pathname,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Upload API error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return new Response(
      JSON.stringify({ error: 'Failed to upload file', details: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
