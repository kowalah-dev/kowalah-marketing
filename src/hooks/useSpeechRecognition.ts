'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// TypeScript declarations for Web Speech API
interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export interface UseSpeechRecognitionReturn {
  /** Whether the browser supports Web Speech API */
  isSupported: boolean;
  /** Whether speech recognition is currently active */
  isListening: boolean;
  /** Current transcribed text (includes interim results) */
  transcript: string;
  /** Start listening for speech */
  startListening: () => void;
  /** Stop listening for speech */
  stopListening: () => void;
  /** Current error message, if any */
  error: string | null;
  /** Clear the current transcript */
  clearTranscript: () => void;
}

/**
 * Hook for browser-native speech recognition using Web Speech API.
 *
 * @returns Speech recognition state and controls
 *
 * @example
 * ```tsx
 * const { isSupported, isListening, transcript, startListening, stopListening } = useSpeechRecognition();
 *
 * // In your component:
 * {isSupported && (
 *   <button onClick={isListening ? stopListening : startListening}>
 *     {isListening ? 'Stop' : 'Start'} Listening
 *   </button>
 * )}
 * ```
 */
export function useSpeechRecognition(): UseSpeechRecognitionReturn {
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  // Track accumulated final transcript separately from interim
  const finalTranscriptRef = useRef('');

  // Check for browser support on mount
  useEffect(() => {
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognitionAPI) {
      setIsSupported(true);

      // Initialize the recognition instance
      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = true; // Keep listening until stopped
      recognition.interimResults = true; // Show results as user speaks
      recognition.lang = 'en-US'; // Default language

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let currentInterim = '';

        // Process all results from the current event
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            // Accumulate final results - these won't change
            finalTranscriptRef.current += result[0].transcript;
          } else {
            // Collect current interim results (speculative, may change)
            currentInterim += result[0].transcript;
          }
        }

        // Display: all confirmed finals + current interim preview
        // Interim gets replaced on each update, finals accumulate
        setTranscript(finalTranscriptRef.current + currentInterim);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        // Handle common errors gracefully
        switch (event.error) {
          case 'not-allowed':
          case 'permission-denied':
            setError('Microphone access denied. Please allow microphone access to use voice input.');
            break;
          case 'no-speech':
            // This is normal - just means silence was detected
            setError(null);
            break;
          case 'network':
            setError('Network error. Please check your connection.');
            break;
          case 'aborted':
            // User stopped - not an error
            setError(null);
            break;
          default:
            setError(`Speech recognition error: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    // Cleanup
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      // Reset both the accumulated finals and displayed transcript
      finalTranscriptRef.current = '';
      setTranscript('');
      setError(null);
      try {
        recognitionRef.current.start();
      } catch (err) {
        // Handle "already started" error
        console.warn('Speech recognition already started');
      }
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  const clearTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    isSupported,
    isListening,
    transcript,
    startListening,
    stopListening,
    error,
    clearTranscript,
  };
}
