'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import type { UIMessage } from 'ai';

// AI Elements components
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import {
  Message,
  MessageContent,
  MessageResponse,
} from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from '@/components/ai-elements/prompt-input';

// Speech recognition hook
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';

interface ChatInterfaceProps {
  sessionId: string;
  initialMessages?: Array<{ id: string; role: 'user' | 'assistant'; content: string }>;
  userAvatarUrl?: string | null;
  onConversationComplete: (messages: Array<{ role: 'user' | 'assistant'; content: string }>) => void;
  onMessagesChange?: (messages: Array<{ id: string; role: 'user' | 'assistant'; content: string }>) => void;
}

// Marker that signals the interview is complete
const COMPLETION_MARKER = '[INTERVIEW_COMPLETE]';

export default function ChatInterface({
  sessionId,
  initialMessages = [],
  userAvatarUrl,
  onConversationComplete,
  onMessagesChange,
}: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const [initialized, setInitialized] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // Track what was in the input before speech started (to append speech to)
  const inputBeforeSpeechRef = useRef('');
  // Track when we're in a submit flow to skip the "commit on stop" effect
  const isSubmittingRef = useRef(false);

  // Speech recognition
  const {
    isSupported: speechSupported,
    isListening,
    transcript,
    startListening: startListeningBase,
    stopListening: stopListeningBase,
    error: speechError,
    clearTranscript,
  } = useSpeechRecognition();

  // Wrap startListening to capture current input
  const startListening = useCallback(() => {
    inputBeforeSpeechRef.current = input.trim();
    startListeningBase();
  }, [input, startListeningBase]);

  // Wrap stopListening to commit the final transcript
  const stopListening = useCallback(() => {
    stopListeningBase();
    // Transcript will be committed via the effect below when isListening becomes false
  }, [stopListeningBase]);

  // Use the useChat hook from AI SDK
  const { messages, sendMessage, status, stop, error, setMessages } = useChat({
    id: sessionId,
    transport: new DefaultChatTransport({
      api: '/api/testimonial/chat',
      body: { sessionId },
    }),
    onFinish: ({ message }) => {
      // Check if conversation is complete
      const textContent = message.parts
        .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
        .map((part) => part.text)
        .join('');

      if (textContent.includes(COMPLETION_MARKER)) {
        // Convert messages to the expected format and trigger completion
        // Note: By the time onFinish fires, the AI SDK has already added the
        // completed message to `messages`, so we use messages directly (no concat)
        const finalMessages = messages.map((m) => ({
          role: m.role as 'user' | 'assistant',
          content: getTextContent(m).replace(COMPLETION_MARKER, '').trim(),
        }));
        onConversationComplete(finalMessages);
      }
    },
  });

  // Initialize messages from props (AI SDK 5.0 uses setMessages instead of initialMessages prop)
  useEffect(() => {
    if (!initialized && initialMessages.length > 0) {
      const uiMessages: UIMessage[] = initialMessages.map((m) => ({
        id: m.id,
        role: m.role,
        parts: [{ type: 'text', text: m.content }],
        createdAt: new Date(),
      }));
      setMessages(uiMessages);
      setInitialized(true);
    }
  }, [initialMessages, initialized, setMessages]);

  // Notify parent of message changes
  useEffect(() => {
    if (onMessagesChange) {
      const convertedMessages = messages.map((m) => ({
        id: m.id,
        role: m.role as 'user' | 'assistant',
        content: getTextContent(m),
      }));
      onMessagesChange(convertedMessages);
    }
  }, [messages, onMessagesChange]);

  // Auto-focus textarea when AI response completes (for voice input like Wispr Flow)
  useEffect(() => {
    if (status === 'ready' && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [status]);

  // Reset the base ref when input is cleared externally (e.g., after submit)
  useEffect(() => {
    if (input === '' && isListening) {
      // Input was cleared while listening - reset the base so new speech starts fresh
      inputBeforeSpeechRef.current = '';
      clearTranscript();
    }
  }, [input, isListening, clearTranscript]);

  // Show real-time speech transcript preview in input field
  useEffect(() => {
    if (isListening && transcript) {
      // While listening, show: original input + space + current transcript
      const base = inputBeforeSpeechRef.current;
      const separator = base ? ' ' : '';
      setInput(base + separator + transcript);
      // Keep textarea focused so user can press Enter to submit
      textareaRef.current?.focus();
    }
  }, [isListening, transcript]);

  // When listening stops (via mic button click), commit the final transcript
  // Skip this if we're submitting - handleSubmit manages the cleanup in that case
  useEffect(() => {
    if (!isListening && transcript && !isSubmittingRef.current) {
      // Listening just stopped via mic button - commit the final transcript
      const base = inputBeforeSpeechRef.current;
      const separator = base ? ' ' : '';
      setInput(base + separator + transcript);
      clearTranscript();
      inputBeforeSpeechRef.current = ''; // Reset for next time
    }
  }, [isListening, transcript, clearTranscript]);

  // Handle microphone button click
  const handleMicrophoneClick = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  // Helper to extract text content from UIMessage
  const getTextContent = (message: UIMessage): string => {
    return message.parts
      .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
      .map((part) => part.text)
      .join('');
  };

  // Remove completion marker from displayed content
  const getDisplayContent = (message: UIMessage): string => {
    return getTextContent(message).replace(COMPLETION_MARKER, '').trim();
  };

  // Handle form submission
  const handleSubmit = useCallback(
    (messageData: { text: string }) => {
      if (messageData.text.trim() && status === 'ready') {
        // Mark that we're submitting to prevent the "commit on stop" effect
        // from re-populating the input after we clear it
        isSubmittingRef.current = true;

        // Clear speech-related state FIRST, before stopping listening
        // This ensures the "commit on stop" effect sees empty transcript
        inputBeforeSpeechRef.current = '';
        clearTranscript();
        setInput('');

        // Now stop speech recognition (push-to-talk model)
        // User must click mic again to start a new recording session
        if (isListening) {
          stopListening();
        }

        // Send the message
        sendMessage({ text: messageData.text });

        // Reset the submitting flag after React processes the state updates
        requestAnimationFrame(() => {
          isSubmittingRef.current = false;
        });
      }
    },
    [sendMessage, status, clearTranscript, isListening, stopListening]
  );

  // Check if conversation seems complete (enough exchanges for manual trigger)
  const userMessageCount = messages.filter((m) => m.role === 'user').length;
  const canGenerateManually = userMessageCount >= 6;

  const handleManualGenerate = useCallback(() => {
    const finalMessages = messages.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: getTextContent(m).replace(COMPLETION_MARKER, '').trim(),
    }));
    onConversationComplete(finalMessages);
  }, [messages, onConversationComplete]);

  const isLoading = status === 'submitted';
  const isStreaming = status === 'streaming';
  const busyState = isLoading || isStreaming;

  return (
    <div className="flex flex-col h-full">
      {/* Messages area using AI Elements Conversation */}
      <Conversation className="flex-1 mb-4">
        <ConversationContent className="gap-4 pr-2">
          {messages.map((message, index) => (
            <Message key={message.id} from={message.role}>
              <div className={`flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {/* Avatar */}
                {message.role === 'user' && userAvatarUrl ? (
                  <img
                    src={userAvatarUrl}
                    alt="Your avatar"
                    className="flex-shrink-0 w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'user'
                        ? 'bg-gray-200 text-gray-600'
                        : 'bg-gradient-to-br from-primary to-secondary text-white'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    )}
                  </div>
                )}

                {/* Message content */}
                <MessageContent
                  className={`max-w-[85%] ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-primary to-secondary !text-white rounded-2xl rounded-tr-sm px-4 py-3'
                      : 'bg-gray-100 text-gray-900 rounded-2xl rounded-tl-sm px-4 py-3'
                  }`}
                >
                  {message.role === 'user' ? (
                    <p className="text-sm whitespace-pre-wrap leading-relaxed text-white">
                      {getDisplayContent(message)}
                    </p>
                  ) : (
                    <MessageResponse
                      className="text-sm leading-relaxed"
                      isAnimating={isStreaming && index === messages.length - 1}
                    >
                      {getDisplayContent(message)}
                    </MessageResponse>
                  )}
                </MessageContent>
              </div>
            </Message>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <Message from="assistant">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            </Message>
          )}

          {/* Error message */}
          {error && (
            <div className="text-center py-2">
              <span className="text-red-500 text-sm">{error.message || 'Something went wrong'}</span>
            </div>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      {/* Manual generate option */}
      {canGenerateManually && !busyState && (
        <div className="mb-3 text-center">
          <button
            onClick={handleManualGenerate}
            className="text-sm text-primary hover:text-primary/80 underline"
          >
            Ready to finish? Click here to generate your testimonial
          </button>
        </div>
      )}

      {/* Input area using AI Elements PromptInput - pinned to bottom */}
      <div className="flex-shrink-0 mt-auto">
        <PromptInput
          onSubmit={handleSubmit}
          className="testimonial-chat-input bg-gray-50 rounded-xl border border-gray-200 transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
        >
          <PromptInputTextarea
            ref={textareaRef}
            value={input}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
            placeholder="Type your response..."
            disabled={busyState}
            className="bg-transparent border-0 resize-none focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-400 py-3 px-3 min-h-[44px] max-h-32"
          />
          <PromptInputFooter className="px-2 pb-2 justify-end gap-2">
            {/* Microphone button - only shown if browser supports speech recognition */}
            {speechSupported && (
              <button
                type="button"
                onClick={handleMicrophoneClick}
                disabled={busyState}
                title={isListening ? 'Stop listening' : 'Start voice input'}
                className={`p-2.5 rounded-lg transition-all ${
                  isListening
                    ? 'bg-gradient-to-r from-primary to-secondary text-white animate-pulse'
                    : busyState
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                }`}
              >
                {isListening ? (
                  // Microphone with sound waves (listening state)
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                ) : (
                  // Simple microphone icon (idle state)
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                )}
              </button>
            )}
            <PromptInputSubmit
              status={status}
              onStop={stop}
              disabled={!input.trim() && !busyState}
              className={`p-2.5 rounded-lg transition-all ${
                input.trim() && !busyState
                  ? 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-md'
                  : busyState
                    ? 'bg-gray-200 text-gray-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            />
          </PromptInputFooter>
        </PromptInput>
        {/* Status messages */}
        {isListening ? (
          <p className="text-xs text-primary mt-2 text-center animate-pulse">
            🎤 Listening... Click the microphone to stop
          </p>
        ) : speechError ? (
          <p className="text-xs text-red-500 mt-2 text-center">
            {speechError}
          </p>
        ) : (
          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send, Shift+Enter for new line{speechSupported && ' • Click 🎤 for voice input'}
          </p>
        )}
      </div>
    </div>
  );
}
