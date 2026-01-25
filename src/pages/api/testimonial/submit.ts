import type { APIRoute } from 'astro';
import { createClient } from '@sanity/client';

// Opt out of static generation - this endpoint needs to run at request time
export const prerender = false;
import type { TestimonialSubmission } from '@/lib/testimonial/types';
import { validateCustomerInfo, isValidEmail } from '@/lib/testimonial/validation';

// HubSpot configuration for notifications
const HUBSPOT_PORTAL_ID = '139642758';
const HUBSPOT_FORM_GUID = 'c10f1502-7643-4064-97cc-09cd96943c88'; // Using existing contact form

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse request body
    const body = await request.json();
    const { submission } = body as { submission: TestimonialSubmission };

    if (!submission) {
      return new Response(
        JSON.stringify({ error: 'Submission data is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate customer info
    const validation = validateCustomerInfo(submission.customerInfo);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: 'Invalid customer information', details: validation.errors }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    if (!isValidEmail(submission.customerInfo.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check for Sanity configuration
    const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
    const dataset = import.meta.env.PUBLIC_SANITY_DATASET;
    const token = import.meta.env.SANITY_API_TOKEN;

    if (!projectId || !dataset || !token) {
      console.error('Sanity configuration missing');
      return new Response(
        JSON.stringify({ error: 'Storage configuration error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create Sanity client with write permissions
    const sanityClient = createClient({
      projectId,
      dataset,
      useCdn: false,
      apiVersion: '2024-05-08',
      token,
    });

    // Prepare the document for Sanity
    const testimonialDoc = {
      _type: 'customerTestimonial',
      customerName: submission.customerInfo.name,
      customerTitle: submission.customerInfo.title,
      customerCompany: submission.customerInfo.company,
      customerEmail: submission.customerInfo.email,
      industry: submission.metadata.industry,
      soundBites: submission.soundBites,
      narrative: submission.narrative,
      keyThemes: submission.metadata.keyThemes,
      status: 'pending_review',
      submittedAt: new Date().toISOString(),
      sessionId: submission.sessionId,
      // Store raw conversation for reference
      rawConversation: submission.rawConversation.map((msg) => ({
        _type: 'conversationMessage',
        _key: msg.id,
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp,
      })),
    };

    // Add image references if provided
    if (submission.avatar?.url) {
      // For external URLs, we store the URL directly
      // In a production setup, you might want to upload to Sanity's asset pipeline
      (testimonialDoc as any).avatarUrl = submission.avatar.url;
    }
    if (submission.logo?.url) {
      (testimonialDoc as any).logoUrl = submission.logo.url;
    }

    // Create the document in Sanity
    const result = await sanityClient.create(testimonialDoc);

    // Send notification to HubSpot (fire and forget)
    try {
      await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: [
              { objectTypeId: '0-1', name: 'firstname', value: submission.customerInfo.name.split(' ')[0] },
              { objectTypeId: '0-1', name: 'lastname', value: submission.customerInfo.name.split(' ').slice(1).join(' ') || '' },
              { objectTypeId: '0-1', name: 'email', value: submission.customerInfo.email },
              { objectTypeId: '0-1', name: 'company', value: submission.customerInfo.company },
              { objectTypeId: '0-1', name: 'jobtitle', value: submission.customerInfo.title },
              { objectTypeId: '0-1', name: 'how_can_we_help_', value: 'Customer Testimonial Submitted' },
              { objectTypeId: '0-1', name: 'message', value: `New testimonial submitted. Industry: ${submission.metadata.industry}. Testimonial ID: ${result._id}` },
            ],
            context: {
              pageUri: 'https://www.kowalah.com/customers/share-story',
              pageName: 'Share Your Story - Testimonial Collection',
            },
          }),
        }
      );
    } catch (hubspotError) {
      // Log but don't fail the request if HubSpot notification fails
      console.error('HubSpot notification failed:', hubspotError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        testimonialId: result._id,
        message: 'Testimonial submitted successfully',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Submit API error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return new Response(
      JSON.stringify({ error: 'Failed to submit testimonial', details: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
