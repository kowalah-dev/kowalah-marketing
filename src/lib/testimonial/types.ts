/**
 * TypeScript interfaces for the AI-powered testimonial collection feature
 */

// === Conversation Types ===

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatResponse {
  message: string;
  suggestedReplies: string[];
  conversationPhase: ConversationPhase;
  progressPercent: number;
  conversationComplete: boolean;
}

export type ConversationPhase =
  | 'opening'
  | 'before'
  | 'experience'
  | 'outcomes'
  | 'recommendation';

// === Testimonial Generation Types ===

export interface GeneratedTestimonial {
  soundBites: string[];
  narrative: string;
  metadata: TestimonialMetadata;
}

export interface TestimonialMetadata {
  industry: string;
  roleLevel: 'C-suite' | 'VP' | 'Director' | 'Manager' | 'Individual Contributor';
  companySize: string;
  keyThemes: string[];
}

// === Customer & Submission Types ===

export interface CustomerInfo {
  name: string;
  email: string;
  title: string;
  company: string;
}

export interface MediaUpload {
  type: 'avatar' | 'logo' | 'additional';
  url: string;
  filename: string;
}

export interface TestimonialSubmission {
  customerInfo: CustomerInfo;
  soundBites: string[];
  narrative: string;
  metadata: TestimonialMetadata;
  avatar?: MediaUpload;
  logo?: MediaUpload;
  additionalImages?: MediaUpload[];
  rawConversation: Message[];
  sessionId: string;
}

// === UI State Types ===

export type TestimonialStep =
  | 'welcome'
  | 'chat'
  | 'generating'
  | 'review'
  | 'media'
  | 'confirm'
  | 'complete';

export interface TestimonialState {
  step: TestimonialStep;
  conversationHistory: Message[];
  generatedTestimonial: GeneratedTestimonial | null;
  editedSoundBites: string[];
  editedNarrative: string;
  uploadedAvatar: MediaUpload | null;
  uploadedLogo: MediaUpload | null;
  additionalImages: MediaUpload[];
  customerInfo: CustomerInfo;
  sessionId: string;
  isLoading: boolean;
  error: string | null;
}

// === API Request/Response Types ===

export interface ChatRequest {
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  sessionId: string;
}

export interface GenerateRequest {
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  sessionId: string;
}

export interface UploadRequest {
  file: File;
  type: 'avatar' | 'logo' | 'additional';
  sessionId: string;
}

export interface UploadResponse {
  url: string;
  filename: string;
}

export interface SubmitRequest {
  submission: TestimonialSubmission;
}

export interface SubmitResponse {
  success: boolean;
  testimonialId: string;
  message?: string;
}
