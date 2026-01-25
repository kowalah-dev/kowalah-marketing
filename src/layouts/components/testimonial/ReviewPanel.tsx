import { useState } from 'react';

interface ReviewPanelProps {
  soundBites: string[];
  narrative: string;
  onUpdateSoundBites: (soundBites: string[]) => void;
  onUpdateNarrative: (narrative: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export default function ReviewPanel({
  soundBites,
  narrative,
  onUpdateSoundBites,
  onUpdateNarrative,
  onContinue,
  onBack,
}: ReviewPanelProps) {
  const [isEditingNarrative, setIsEditingNarrative] = useState(false);
  const [editingSoundBiteIndex, setEditingSoundBiteIndex] = useState<number | null>(null);

  const handleSoundBiteChange = (index: number, value: string) => {
    const newSoundBites = [...soundBites];
    newSoundBites[index] = value;
    onUpdateSoundBites(newSoundBites);
  };

  const handleRemoveSoundBite = (index: number) => {
    const newSoundBites = soundBites.filter((_, i) => i !== index);
    onUpdateSoundBites(newSoundBites);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Review Your Testimonial
        </h2>
        <p className="text-gray-600">
          We've created a testimonial based on your conversation. Feel free to edit anything below.
        </p>
      </div>

      {/* Sound Bites */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
          <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          Sound Bites
          <span className="ml-2 text-sm font-normal text-gray-500">
            (short quotes for social media)
          </span>
        </h3>
        <div className="space-y-3">
          {soundBites.map((bite, index) => (
            <div key={index} className="group relative">
              {editingSoundBiteIndex === index ? (
                <div className="flex items-start gap-2">
                  <textarea
                    value={bite}
                    onChange={(e) => handleSoundBiteChange(index, e.target.value)}
                    className="flex-1 p-3 border border-primary rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none text-sm"
                    rows={2}
                    autoFocus
                  />
                  <button
                    onClick={() => setEditingSoundBiteIndex(null)}
                    className="px-3 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200 group-hover:border-gray-300 transition-colors">
                  <p className="flex-1 text-gray-700 text-sm italic">
                    <span className="text-primary font-bold not-italic">"</span>
                    {bite}
                    <span className="text-primary font-bold not-italic">"</span>
                  </p>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setEditingSoundBiteIndex(index)}
                      className="p-1.5 text-gray-400 hover:text-primary rounded"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    {soundBites.length > 1 && (
                      <button
                        onClick={() => handleRemoveSoundBite(index)}
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded"
                        title="Remove"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Narrative */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
          <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Full Testimonial
          <span className="ml-2 text-sm font-normal text-gray-500">
            (for case studies and website)
          </span>
        </h3>
        {isEditingNarrative ? (
          <div className="space-y-2">
            <textarea
              value={narrative}
              onChange={(e) => onUpdateNarrative(e.target.value)}
              className="w-full p-4 border border-primary rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none text-sm leading-relaxed"
              rows={8}
              autoFocus
            />
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditingNarrative(false)}
                className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90"
              >
                Done Editing
              </button>
            </div>
          </div>
        ) : (
          <div
            className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer group"
            onClick={() => setIsEditingNarrative(true)}
          >
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
              {narrative}
            </p>
            <div className="mt-3 flex items-center text-sm text-gray-400 group-hover:text-primary transition-colors">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Click to edit
            </div>
          </div>
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
          Back to conversation
        </button>
        <button
          onClick={onContinue}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:shadow-lg transition-all"
        >
          Continue
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
