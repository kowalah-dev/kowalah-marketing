import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type {
  TestimonialState,
  TestimonialStep,
  Message,
  GeneratedTestimonial,
  CustomerInfo,
  MediaUpload,
} from '@/lib/testimonial/types';
import { createWelcomeMessage } from '@/lib/testimonial/prompts';
import WelcomeStep from './WelcomeStep';
import ChatInterface from './ChatInterface';
import ReviewPanel from './ReviewPanel';
import MediaUploadComponent from './MediaUpload';
import ConfirmationStep from './ConfirmationStep';

// Props passed from Astro page with Clerk user data
interface ClerkUserData {
  name: string;
  email: string;
  imageUrl: string | null;
  company: string | null;
  companyLogo: string | null;
}

interface TestimonialCollectorProps {
  clerkUser?: ClerkUserData | null;
}

export default function TestimonialCollector({ clerkUser }: TestimonialCollectorProps) {
  // Create initial state with Clerk data from props
  const [state, setState] = useState<TestimonialState>(() => ({
    step: 'welcome',
    conversationHistory: [],
    generatedTestimonial: null,
    editedSoundBites: [],
    editedNarrative: '',
    uploadedAvatar: clerkUser?.imageUrl
      ? { type: 'avatar', url: clerkUser.imageUrl, filename: 'clerk-profile' }
      : null,
    uploadedLogo: clerkUser?.companyLogo
      ? { type: 'logo', url: clerkUser.companyLogo, filename: 'clerk-org-logo' }
      : null,
    customerInfo: {
      name: clerkUser?.name || '',
      email: clerkUser?.email || '',
      title: '',
      company: clerkUser?.company || '',
    },
    sessionId: uuidv4(),
    isLoading: false,
    error: null,
  }));

  // Step navigation
  const goToStep = useCallback((step: TestimonialStep) => {
    setState((prev) => ({ ...prev, step, error: null }));
  }, []);

  // Start the conversation with personalized welcome
  const handleStartConversation = useCallback(() => {
    const welcomeContent = createWelcomeMessage(
      clerkUser?.name || null,
      clerkUser?.company || null
    );

    const welcomeMessage: Message = {
      id: uuidv4(),
      role: 'assistant',
      content: welcomeContent,
      timestamp: new Date(),
    };

    setState((prev) => ({
      ...prev,
      step: 'chat',
      conversationHistory: [welcomeMessage],
    }));
  }, [clerkUser]);

  // Handle conversation completion from ChatInterface
  const handleConversationComplete = useCallback(
    async (messages: Array<{ role: 'user' | 'assistant'; content: string }>) => {
      // Update conversation history with the final messages
      const messageHistory: Message[] = messages.map((m, i) => ({
        id: `msg-${i}`,
        role: m.role,
        content: m.content,
        timestamp: new Date(),
      }));

      setState((prev) => ({
        ...prev,
        conversationHistory: messageHistory,
        step: 'generating',
        isLoading: true,
      }));

      // Generate the testimonial
      try {
        const messagesForAPI = messages.map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const response = await fetch('/api/testimonial/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: messagesForAPI,
            sessionId: state.sessionId,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate testimonial');
        }

        const testimonial: GeneratedTestimonial = await response.json();

        setState((prev) => ({
          ...prev,
          step: 'review',
          generatedTestimonial: testimonial,
          editedSoundBites: [...testimonial.soundBites],
          editedNarrative: testimonial.narrative,
          isLoading: false,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          step: 'chat',
          isLoading: false,
          error: 'Failed to generate testimonial. Please try completing the conversation again.',
        }));
      }
    },
    [state.sessionId]
  );

  // Track messages as they change (for storing conversation history)
  const handleMessagesChange = useCallback(
    (messages: Array<{ id: string; role: 'user' | 'assistant'; content: string }>) => {
      const messageHistory: Message[] = messages.map((m) => ({
        id: m.id,
        role: m.role,
        content: m.content,
        timestamp: new Date(),
      }));
      setState((prev) => ({
        ...prev,
        conversationHistory: messageHistory,
      }));
    },
    []
  );

  // Update edited sound bites
  const handleUpdateSoundBites = useCallback((soundBites: string[]) => {
    setState((prev) => ({ ...prev, editedSoundBites: soundBites }));
  }, []);

  // Update edited narrative
  const handleUpdateNarrative = useCallback((narrative: string) => {
    setState((prev) => ({ ...prev, editedNarrative: narrative }));
  }, []);

  // Handle media upload
  const handleMediaUpload = useCallback((media: MediaUpload) => {
    setState((prev) => ({
      ...prev,
      ...(media.type === 'avatar'
        ? { uploadedAvatar: media }
        : { uploadedLogo: media }),
    }));
  }, []);

  // Handle media removal
  const handleMediaRemove = useCallback((type: 'avatar' | 'logo') => {
    setState((prev) => ({
      ...prev,
      ...(type === 'avatar'
        ? { uploadedAvatar: null }
        : { uploadedLogo: null }),
    }));
  }, []);

  // Update customer info
  const handleUpdateCustomerInfo = useCallback((info: Partial<CustomerInfo>) => {
    setState((prev) => ({
      ...prev,
      customerInfo: { ...prev.customerInfo, ...info },
    }));
  }, []);

  // Handle final submission
  const handleSubmit = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const submission = {
        customerInfo: state.customerInfo,
        soundBites: state.editedSoundBites,
        narrative: state.editedNarrative,
        metadata: state.generatedTestimonial?.metadata || {
          industry: '',
          roleLevel: 'Individual Contributor' as const,
          companySize: '',
          keyThemes: [],
        },
        avatar: state.uploadedAvatar || undefined,
        logo: state.uploadedLogo || undefined,
        rawConversation: state.conversationHistory,
        sessionId: state.sessionId,
      };

      const response = await fetch('/api/testimonial/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submission }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit testimonial');
      }

      // Track submission in Plausible
      if (typeof window !== 'undefined' && (window as any).plausible) {
        (window as any).plausible('Testimonial Submitted', {
          props: {
            industry: state.generatedTestimonial?.metadata.industry || 'unknown',
          },
        });
      }

      setState((prev) => ({ ...prev, step: 'complete', isLoading: false }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Failed to submit. Please try again.',
      }));
    }
  }, [state]);

  // Convert conversation history to the format expected by ChatInterface
  const initialChatMessages = state.conversationHistory.map((m) => ({
    id: m.id,
    role: m.role,
    content: m.content,
  }));

  // Render current step
  const renderStep = () => {
    switch (state.step) {
      case 'welcome':
        return <WelcomeStep onStart={handleStartConversation} />;

      case 'chat':
        return (
          <ChatInterface
            sessionId={state.sessionId}
            initialMessages={initialChatMessages}
            userAvatarUrl={clerkUser?.imageUrl}
            onConversationComplete={handleConversationComplete}
            onMessagesChange={handleMessagesChange}
          />
        );

      case 'generating':
        return (
          <div className="flex flex-col items-center justify-center py-20">
            {/* Enhanced loading spinner with gradient */}
            <div className="relative mb-8">
              <div className="w-20 h-20 rounded-full border-4 border-gray-100"></div>
              <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-primary border-r-secondary animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Creating Your Testimonial
            </h2>
            <p className="text-gray-600 mb-4">
              Analyzing your conversation and crafting your story...
            </p>
            {/* Animated progress dots */}
            <div className="flex gap-1.5">
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        );

      case 'review':
        return (
          <ReviewPanel
            soundBites={state.editedSoundBites}
            narrative={state.editedNarrative}
            onUpdateSoundBites={handleUpdateSoundBites}
            onUpdateNarrative={handleUpdateNarrative}
            onContinue={() => goToStep('media')}
            onBack={() => goToStep('chat')}
          />
        );

      case 'media':
        return (
          <MediaUploadComponent
            avatar={state.uploadedAvatar}
            logo={state.uploadedLogo}
            sessionId={state.sessionId}
            onUpload={handleMediaUpload}
            onRemove={handleMediaRemove}
            onContinue={() => goToStep('confirm')}
            onBack={() => goToStep('review')}
          />
        );

      case 'confirm':
        return (
          <ConfirmationStep
            soundBites={state.editedSoundBites}
            narrative={state.editedNarrative}
            customerInfo={state.customerInfo}
            avatar={state.uploadedAvatar}
            logo={state.uploadedLogo}
            isLoading={state.isLoading}
            error={state.error}
            onUpdateCustomerInfo={handleUpdateCustomerInfo}
            onSubmit={handleSubmit}
            onBack={() => goToStep('media')}
          />
        );

      case 'complete':
        return (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Your testimonial has been submitted. Our team will review it and
              reach out if we have any questions.
            </p>
            <a
              href="/customers"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:shadow-lg transition-all"
            >
              View Customer Stories
            </a>
          </div>
        );

      default:
        return null;
    }
  };

  // Progress indicator component
  const ProgressIndicator = () => (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-600">
        {state.step === 'chat' && 'Step 1: Tell Your Story'}
        {state.step === 'generating' && 'Creating Your Testimonial...'}
        {state.step === 'review' && 'Step 2: Review & Edit'}
        {state.step === 'media' && 'Step 3: Add Your Photo'}
        {state.step === 'confirm' && 'Step 4: Confirm & Submit'}
      </span>
      <div className="flex gap-1.5">
        {['chat', 'review', 'media', 'confirm'].map((s, i) => (
          <div
            key={s}
            className={`w-2 h-2 rounded-full transition-colors ${
              ['chat', 'generating'].includes(state.step) && i === 0
                ? 'bg-primary'
                : state.step === 'review' && i <= 1
                  ? 'bg-primary'
                  : state.step === 'media' && i <= 2
                    ? 'bg-primary'
                    : state.step === 'confirm' && i <= 3
                      ? 'bg-primary'
                      : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );

  // Chat step uses a taller card that fills most of the viewport
  const isChatStep = state.step === 'chat';

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden ${isChatStep ? 'h-[calc(100vh-10rem)]' : ''}`}>
      {/* Progress indicator */}
      {state.step !== 'welcome' && state.step !== 'complete' && (
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
          <ProgressIndicator />
        </div>
      )}

      {/* Main content */}
      <div className={`${isChatStep ? 'p-4 md:p-6 h-[calc(100%-60px)]' : 'p-6 md:p-8'}`}>
        {renderStep()}
      </div>
    </div>
  );
}
