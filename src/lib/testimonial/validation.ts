/**
 * Input validation utilities for the testimonial collection feature
 */

// === File Upload Validation ===

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateImageFile(file: File): ValidationResult {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Please upload a JPG, PNG, or WebP image',
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: 'Image must be smaller than 5MB',
    };
  }

  return { valid: true };
}

// === Text Sanitization ===

export function sanitizeText(text: string): string {
  // Remove potential HTML/script injection
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

export function sanitizeForDisplay(text: string): string {
  // Lighter sanitization for display - preserve some formatting
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .trim();
}

// === Email Validation ===

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// === Customer Info Validation ===

export interface CustomerInfoValidation {
  valid: boolean;
  errors: Record<string, string>;
}

export function validateCustomerInfo(info: {
  name?: string;
  email?: string;
  title?: string;
  company?: string;
}): CustomerInfoValidation {
  const errors: Record<string, string> = {};

  if (!info.name || info.name.trim().length < 2) {
    errors.name = 'Please enter your full name';
  }

  if (!info.email || !isValidEmail(info.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!info.title || info.title.trim().length < 2) {
    errors.title = 'Please enter your job title';
  }

  if (!info.company || info.company.trim().length < 2) {
    errors.company = 'Please enter your company name';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// === Rate Limiting Helpers ===

export interface RateLimitState {
  count: number;
  windowStart: number;
}

export function checkRateLimit(
  state: RateLimitState,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();

  // Reset window if expired
  if (now - state.windowStart > windowMs) {
    state.count = 0;
    state.windowStart = now;
  }

  const allowed = state.count < maxRequests;
  const remaining = Math.max(0, maxRequests - state.count);
  const resetIn = Math.max(0, windowMs - (now - state.windowStart));

  if (allowed) {
    state.count++;
  }

  return { allowed, remaining, resetIn };
}

// === JSON Response Parsing ===

export function parseJSONResponse<T>(text: string): T | null {
  try {
    // Try to find JSON in the response (Claude sometimes wraps it in markdown)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as T;
    }
    return null;
  } catch {
    return null;
  }
}

// === Content Length Validation ===

export function validateSoundBite(soundBite: string): ValidationResult {
  const words = soundBite.trim().split(/\s+/);
  if (words.length > 25) {
    return {
      valid: false,
      error: 'Sound bite should be 25 words or less',
    };
  }
  if (words.length < 3) {
    return {
      valid: false,
      error: 'Sound bite should be at least 3 words',
    };
  }
  return { valid: true };
}

export function validateNarrative(narrative: string): ValidationResult {
  const words = narrative.trim().split(/\s+/);
  if (words.length > 350) {
    return {
      valid: false,
      error: 'Narrative should be 350 words or less',
    };
  }
  if (words.length < 50) {
    return {
      valid: false,
      error: 'Narrative should be at least 50 words',
    };
  }
  return { valid: true };
}
