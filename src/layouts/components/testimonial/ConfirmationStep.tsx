import { useState, useEffect } from 'react';
import type { CustomerInfo, MediaUpload } from '@/lib/testimonial/types';
import { validateCustomerInfo } from '@/lib/testimonial/validation';

interface ConfirmationStepProps {
  soundBites: string[];
  narrative: string;
  customerInfo: CustomerInfo;
  avatar: MediaUpload | null;
  logo: MediaUpload | null;
  isLoading: boolean;
  error: string | null;
  onUpdateCustomerInfo: (info: Partial<CustomerInfo>) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export default function ConfirmationStep({
  soundBites,
  narrative,
  customerInfo,
  avatar,
  logo,
  isLoading,
  error,
  onUpdateCustomerInfo,
  onSubmit,
  onBack,
}: ConfirmationStepProps) {
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [agreed, setAgreed] = useState(false);

  // Validate on change
  useEffect(() => {
    const result = validateCustomerInfo(customerInfo);
    setValidationErrors(result.errors);
  }, [customerInfo]);

  const canSubmit = Object.keys(validationErrors).length === 0 && agreed && !isLoading;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) {
      onSubmit();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Almost There!
        </h2>
        <p className="text-gray-600">
          Please confirm your details and review your testimonial one more time.
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Info */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Your Details
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={customerInfo.name}
                onChange={(e) => onUpdateCustomerInfo({ name: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                  validationErrors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Jane Smith"
              />
              {validationErrors.name && (
                <p className="mt-1 text-sm text-red-500">{validationErrors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                value={customerInfo.email}
                onChange={(e) => onUpdateCustomerInfo({ email: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                  validationErrors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="jane@company.com"
              />
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-500">{validationErrors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                value={customerInfo.title}
                onChange={(e) => onUpdateCustomerInfo({ title: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                  validationErrors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Chief Technology Officer"
              />
              {validationErrors.title && (
                <p className="mt-1 text-sm text-red-500">{validationErrors.title}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company *
              </label>
              <input
                type="text"
                value={customerInfo.company}
                onChange={(e) => onUpdateCustomerInfo({ company: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                  validationErrors.company ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Acme Corporation"
              />
              {validationErrors.company && (
                <p className="mt-1 text-sm text-red-500">{validationErrors.company}</p>
              )}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Testimonial Preview
          </h3>

          {/* Media preview */}
          {(avatar || logo) && (
            <div className="flex items-center gap-4 mb-4">
              {avatar && (
                <img
                  src={avatar.url}
                  alt="Your photo"
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                />
              )}
              {logo && (
                <img
                  src={logo.url}
                  alt="Company logo"
                  className="h-12 object-contain"
                />
              )}
            </div>
          )}

          {/* Sound bites preview */}
          <div className="mb-4">
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Sound Bites</p>
            <div className="space-y-2">
              {soundBites.slice(0, 2).map((bite, i) => (
                <p key={i} className="text-sm text-gray-700 italic">"{bite}"</p>
              ))}
            </div>
          </div>

          {/* Narrative preview */}
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Full Testimonial</p>
            <p className="text-sm text-gray-700 line-clamp-4">{narrative}</p>
          </div>
        </div>

        {/* Agreement */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="agree" className="text-sm text-gray-600">
            I agree that Kowalah may use this testimonial on their website, marketing materials,
            and social media. I confirm that all information provided is accurate.
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <button
            type="submit"
            disabled={!canSubmit}
            className={`inline-flex items-center px-8 py-3 font-medium rounded-lg transition-all ${
              canSubmit
                ? 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              <>
                Submit Testimonial
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
