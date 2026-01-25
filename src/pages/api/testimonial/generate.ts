import type { APIRoute } from 'astro';
import Anthropic from '@anthropic-ai/sdk';

// Opt out of static generation - this endpoint needs to run at request time
export const prerender = false;
import { GENERATION_SYSTEM_PROMPT } from '@/lib/testimonial/prompts';
import { parseJSONResponse } from '@/lib/testimonial/validation';
import type { GeneratedTestimonial } from '@/lib/testimonial/types';

// Rate limiting for generation (more restrictive)
const rateLimitStore = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT = 5; // generations per hour
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in ms

function checkRateLimit(sessionId: string): boolean {
  const now = Date.now();
  const state = rateLimitStore.get(sessionId);

  if (!state || now - state.windowStart > RATE_WINDOW) {
    rateLimitStore.set(sessionId, { count: 1, windowStart: now });
    return true;
  }

  if (state.count >= RATE_LIMIT) {
    return false;
  }

  state.count++;
  return true;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse request body
    const body = await request.json();
    const { messages, sessionId } = body;

    if (!messages || !Array.isArray(messages) || messages.length < 4) {
      return new Response(
        JSON.stringify({ error: 'Insufficient conversation history' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!sessionId) {
      return new Response(
        JSON.stringify({ error: 'Session ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check rate limit
    if (!checkRateLimit(sessionId)) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check for API key
    const apiKey = import.meta.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Service configuration error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Anthropic client
    const client = new Anthropic({ apiKey });

    // Format the conversation as a transcript for generation
    const transcript = messages
      .map((m: { role: string; content: string }) => {
        const speaker = m.role === 'user' ? 'Customer' : 'Interviewer';
        return `${speaker}: ${m.content}`;
      })
      .join('\n\n');

    // Call Claude API for testimonial generation
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: GENERATION_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Here is the conversation transcript:\n\n${transcript}\n\nPlease generate the testimonial package as specified.`,
        },
      ],
    });

    // Extract text content from response
    const textContent = response.content.find((c) => c.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text response from Claude');
    }

    // Parse the JSON response
    const parsed = parseJSONResponse<GeneratedTestimonial>(textContent.text);

    if (!parsed) {
      throw new Error('Failed to parse testimonial generation response');
    }

    // Validate the response structure
    if (!parsed.soundBites || !Array.isArray(parsed.soundBites) || parsed.soundBites.length === 0) {
      throw new Error('Invalid sound bites in response');
    }

    if (!parsed.narrative || typeof parsed.narrative !== 'string') {
      throw new Error('Invalid narrative in response');
    }

    // Ensure metadata has required fields with defaults
    const testimonial: GeneratedTestimonial = {
      soundBites: parsed.soundBites.slice(0, 5), // Max 5 sound bites
      narrative: parsed.narrative,
      metadata: {
        industry: parsed.metadata?.industry || 'Technology',
        roleLevel: parsed.metadata?.roleLevel || 'Manager',
        companySize: parsed.metadata?.companySize || 'Unknown',
        keyThemes: parsed.metadata?.keyThemes || [],
      },
    };

    return new Response(JSON.stringify(testimonial), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Generate API error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return new Response(
      JSON.stringify({ error: 'Failed to generate testimonial', details: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
