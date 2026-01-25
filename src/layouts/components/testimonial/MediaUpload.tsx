import { useState, useCallback } from 'react';
import type { MediaUpload as MediaUploadType } from '@/lib/testimonial/types';
import { validateImageFile } from '@/lib/testimonial/validation';

interface MediaUploadProps {
  avatar: MediaUploadType | null;
  logo: MediaUploadType | null;
  sessionId: string;
  onUpload: (media: MediaUploadType) => void;
  onContinue: () => void;
  onBack: () => void;
  onRemove?: (type: 'avatar' | 'logo') => void;
}

type UploadType = 'avatar' | 'logo';

export default function MediaUpload({
  avatar,
  logo,
  sessionId,
  onUpload,
  onContinue,
  onBack,
  onRemove,
}: MediaUploadProps) {
  const [uploading, setUploading] = useState<UploadType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback(
    async (file: File, type: UploadType) => {
      setError(null);

      // Validate file
      const validation = validateImageFile(file);
      if (!validation.valid) {
        setError(validation.error || 'Invalid file');
        return;
      }

      setUploading(type);

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);
        formData.append('sessionId', sessionId);

        const response = await fetch('/api/testimonial/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const { url, filename } = await response.json();

        onUpload({
          type,
          url,
          filename,
        });
      } catch (err) {
        setError('Failed to upload. Please try again.');
      } finally {
        setUploading(null);
      }
    },
    [sessionId, onUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent, type: UploadType) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) {
        handleFileSelect(file, type);
      }
    },
    [handleFileSelect]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, type: UploadType) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileSelect(file, type);
      }
    },
    [handleFileSelect]
  );

  const renderUploadZone = (type: UploadType, current: MediaUploadType | null, label: string, icon: React.ReactNode) => {
    const isUploading = uploading === type;
    const isFromClerk = current?.filename?.startsWith('clerk-');

    return (
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        {current && current.url ? (
          <div className="relative group">
            <img
              src={current.url}
              alt={label}
              className="w-full h-40 object-cover rounded-lg border border-gray-200"
            />
            {isFromClerk && (
              <div className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                From your profile
              </div>
            )}
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <label
                className="p-1.5 bg-gray-700 text-white rounded-full cursor-pointer hover:bg-gray-600"
                title="Upload different image"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => handleInputChange(e, type)}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
              {onRemove && (
                <button
                  onClick={() => onRemove(type)}
                  className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600"
                  title="Remove"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div
            className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isUploading
                ? 'border-primary bg-primary/5'
                : 'border-gray-300 hover:border-primary hover:bg-primary/5'
            }`}
            onDrop={(e) => handleDrop(e, type)}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => handleInputChange(e, type)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isUploading}
            />
            {isUploading ? (
              <div className="py-4">
                <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-2" />
                <p className="text-sm text-gray-500">Uploading...</p>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                  {icon}
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  Drag & drop or click to upload
                </p>
                <p className="text-xs text-gray-400">
                  JPG, PNG, or WebP (max 5MB)
                </p>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Add Your Photo
        </h2>
        <p className="text-gray-600">
          A photo or company logo helps make your testimonial more personal. This step is optional.
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
          {error}
        </div>
      )}

      {/* Upload zones */}
      <div className="grid md:grid-cols-2 gap-6">
        {renderUploadZone(
          'avatar',
          avatar,
          'Your Photo (Headshot)',
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )}
        {renderUploadZone(
          'logo',
          logo,
          'Company Logo',
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to review
        </button>
        <button
          onClick={onContinue}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:shadow-lg transition-all"
        >
          {avatar || logo ? 'Continue' : 'Skip & Continue'}
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
