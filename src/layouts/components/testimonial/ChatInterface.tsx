import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Streamdown } from 'streamdown';
import { code } from '@streamdown/code';

interface ChatInterfaceProps {
  sessionId: string;
  initialMessages?: Array<{ id: string; role: 'user' | 'assistant'; content: string }>;
  userAvatarUrl?: string | null;
  onConversationComplete: (messages: Array<{ role: 'user' | 'assistant'; content: string }>) => void;
  onMessagesChange?: (messages: Array<{ id: string; role: 'user' | 'assistant'; content: string }>) => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
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
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Notify parent of message changes
  useEffect(() => {
    if (onMessagesChange) {
      onMessagesChange(messages);
    }
  }, [messages, onMessagesChange]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading, isStreaming]);

  // Auto-focus input when not loading
  useEffect(() => {
    if (!isLoading && !isStreaming) {
      inputRef.current?.focus();
    }
  }, [isLoading, isStreaming]);

  // Send message with streaming response
  const sendMessage = useCallback(async (text: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/testimonial/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      setIsLoading(false);
      setIsStreaming(true);

      const assistantMessageId = `assistant-${Date.now()}`;
      let fullContent = '';

      // Add empty assistant message to start streaming into
      setMessages(prev => [...prev, { id: assistantMessageId, role: 'assistant', content: '' }]);

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullContent += chunk;

        // Update the assistant message with streamed content
        setMessages(prev =>
          prev.map(m =>
            m.id === assistantMessageId
              ? { ...m, content: fullContent }
              : m
          )
        );
      }

      setIsStreaming(false);

      // Check if conversation is complete
      if (fullContent.includes(COMPLETION_MARKER)) {
        const finalMessages = newMessages.concat({
          id: assistantMessageId,
          role: 'assistant',
          content: fullContent.replace(COMPLETION_MARKER, '').trim(),
        });

        onConversationComplete(
          finalMessages.map(m => ({
            role: m.role,
            content: m.content.replace(COMPLETION_MARKER, '').trim(),
          }))
        );
      }
    } catch (err) {
      setIsLoading(false);
      setIsStreaming(false);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  }, [messages, sessionId, onConversationComplete]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading && !isStreaming) {
      sendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Check if conversation seems complete (enough exchanges for manual trigger)
  const userMessageCount = messages.filter((m) => m.role === 'user').length;
  const canGenerateManually = userMessageCount >= 6;

  const handleManualGenerate = useCallback(() => {
    onConversationComplete(
      messages.map(m => ({
        role: m.role,
        content: m.content.replace(COMPLETION_MARKER, '').trim(),
      }))
    );
  }, [messages, onConversationComplete]);

  // Remove completion marker from displayed content
  const getDisplayContent = (content: string) => {
    return content.replace(COMPLETION_MARKER, '').trim();
  };

  const busyState = isLoading || isStreaming;

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)]">
      {/* Messages area - scrolls, with padding at bottom for fixed input */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto space-y-4 pb-36 pr-2 scroll-smooth">
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            role={message.role}
            content={getDisplayContent(message.content)}
            userAvatarUrl={userAvatarUrl}
            isStreaming={isStreaming && index === messages.length - 1 && message.role === 'assistant'}
          />
        ))}

        {isLoading && (
          <TypingIndicator />
        )}

        {error && (
          <div className="text-center py-2">
            <span className="text-red-500 text-sm">{error}</span>
          </div>
        )}
      </div>

      {/* Fixed input area at bottom of viewport */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-white/95 pt-4 pb-6 px-4 z-40">
        <div className="max-w-3xl mx-auto">
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

          {/* Input area */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-end gap-2 bg-white rounded-xl p-2 border border-gray-200 shadow-lg focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your response..."
                disabled={busyState}
                rows={1}
                className="flex-1 bg-transparent border-0 resize-none focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-400 py-2 px-2 max-h-32"
                style={{ minHeight: '44px' }}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || busyState}
                className={`flex-shrink-0 p-2.5 rounded-lg transition-all ${
                  inputValue.trim() && !busyState
                    ? 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-md'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500 text-center">
              Press Enter to send, Shift+Enter for new line
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

// Message bubble component with Streamdown for AI responses
interface MessageBubbleProps {
  role: string;
  content: string;
  userAvatarUrl?: string | null;
  isStreaming?: boolean;
}

function MessageBubble({ role, content, userAvatarUrl, isStreaming = false }: MessageBubbleProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start gap-3 max-w-[85%] ${isUser ? 'flex-row-reverse' : ''}`}>
        {/* Avatar */}
        {isUser && userAvatarUrl ? (
          <img
            src={userAvatarUrl}
            alt="Your avatar"
            className="flex-shrink-0 w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              isUser
                ? 'bg-gray-200 text-gray-600'
                : 'bg-gradient-to-br from-primary to-secondary text-white'
            }`}
          >
            {isUser ? (
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

        {/* Message bubble */}
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-gradient-to-r from-primary to-secondary text-white rounded-tr-sm'
              : 'bg-gray-100 text-gray-900 rounded-tl-sm'
          }`}
        >
          {isUser ? (
            <p className="text-sm whitespace-pre-wrap leading-relaxed">{content}</p>
          ) : (
            <div className="text-sm leading-relaxed streamdown-content">
              <Streamdown
                plugins={{ code }}
                isAnimating={isStreaming}
              >
                {content}
              </Streamdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Typing indicator component
function TypingIndicator() {
  return (
    <div className="flex justify-start">
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
    </div>
  );
}
