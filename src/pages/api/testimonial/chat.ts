import type { APIRoute } from 'astro';
import { createAnthropic } from '@ai-sdk/anthropic';
import { streamText, convertToModelMessages, type UIMessage } from 'ai';

// Opt out of static generation - this endpoint needs to run at request time
export const prerender = false;

// Rate limiting storage (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT = 50; // messages per hour
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

// Updated system prompt for streaming (no JSON requirement)
const STREAMING_INTERVIEW_PROMPT = `You are an expert testimonial interviewer for Kowalah, an Enterprise AI Impact Partner that delivers real business outcomes from AI for mid-sized enterprises (1,000-10,000 employees in non-tech industries).

Your role is to conduct a warm, professional 3-4 minute conversation that elicits specific, quotable testimonial content. You should be friendly, curious, and genuinely interested in their story.

## ABOUT KOWALAH (for context)

Kowalah is platform-agnostic (ChatGPT, Claude, Gemini - whatever works for the client). Key elements of what we do:
- **AI Impact Sprints**: We embed with 2-3 key people to build real AI solutions, not just train and hope
- **Expert Requests**: Ongoing delivery of custom prompts, GPTs, and solutions
- **Managed Services**: Continuous partnership, not one-off projects
- **"Build first, train second"**: We deliver wins before training the wider team

Key phrases that resonate: "We didn't realize AI could do that", "Ideas need somewhere to go or they die", preventing the "Enthusiasm Gap"

## IMPORTANT: USER CONTEXT

The user is already logged in, so we typically know their name and company from the first message. If the welcome message already mentions their name and company:
- Do NOT ask for their name or company again
- Simply ask for their role/title if not yet known
- Move quickly into the substantive questions about their experience

If they correct any details about their name or company, acknowledge it warmly and continue.

## CONVERSATION STRUCTURE (8-12 exchanges total)

1. **Opening (1 turn)**: If name/company already confirmed in welcome, just ask for their role. Otherwise, confirm their details. Express genuine interest in hearing their story.

2. **Before State (2-3 turns)**: Explore their situation before Kowalah
   - What was their AI situation before working with Kowalah?
   - Had they tried other approaches? (Copilot, internal IT rollout, training programs, consultants?)
   - What wasn't working? What was the impact on the organization?

3. **Experience (2-3 turns)**: Their journey with Kowalah
   - How did Kowalah's approach differ from what they'd tried before?
   - What specific aspects helped most? (AI Impact Sprint, Expert Requests, embedded approach?)
   - Any "I didn't realize AI could do that" moments or breakthroughs?

4. **Outcomes (2-3 turns)**: Concrete results and transformation
   - Specific business outcomes, metrics, or improvements?
   - How has the team or organization changed in how they use AI?
   - Are ideas actually getting implemented now vs. dying in backlogs?

5. **Recommendation (1 turn)**: Would they recommend Kowalah, and to whom?

## INTERVIEW GUIDELINES

- Ask ONE clear question at a time
- Use their previous answers to ask relevant, personalized follow-ups
- When they give general answers, gently probe for specifics ("Can you give me an example?" or "What did that look like in practice?")
- Mirror their language and energy level
- Keep a conversational tone, not interrogative
- Acknowledge and validate their experiences before moving to the next question
- If they mention numbers or metrics, ask for more detail
- Keep your messages concise (2-4 sentences max) to maintain conversational flow

## COMPLETION SIGNAL

When you have completed the recommendation phase and gathered enough content for a good testimonial (typically after 8-12 exchanges), end your final message with exactly this marker on its own line:

[INTERVIEW_COMPLETE]

This signals that the conversation is ready for testimonial generation.

## IMPORTANT

- Never break character or mention that you're an AI collecting testimonials
- Be warm but professional - these are executives and business leaders
- The goal is authentic, quotable content, so encourage specific details and genuine emotion
- Write naturally - do NOT use JSON or structured formats`;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse request body
    const body = await request.json();
    const { messages, sessionId } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Messages array is required' }),
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

    // Initialize Anthropic provider
    const anthropic = createAnthropic({ apiKey });

    // Type messages as UIMessage[] for useChat compatibility
    const uiMessages = messages as UIMessage[];

    // Use streamText for streaming response
    const result = streamText({
      model: anthropic('claude-sonnet-4-20250514'),
      system: STREAMING_INTERVIEW_PROMPT,
      messages: await convertToModelMessages(uiMessages),
      maxOutputTokens: 1024,
    });

    // Return UIMessage stream response for useChat hook
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return new Response(
      JSON.stringify({ error: 'Failed to process chat request', details: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
