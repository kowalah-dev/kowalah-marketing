import React from 'react';
import Button from '@/shortcodes/Button';

interface PricingData {
  prefix: string;
  amount: string;
  suffix: string;
  detail: string;
  range: string;
}

interface PricingCardProps {
  title: string;
  description: string;
  pricing: {
    USD: PricingData;
    EUR: PricingData;
    GBP: PricingData;
  };
  features: string[];
  what_included: string;
  button: {
    label: string;
    link: string;
  };
  selectedCurrency: string;
  index: number;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  pricing,
  features,
  what_included,
  button,
  selectedCurrency,
  index
}) => {
  // Defensive programming: ensure pricing exists and has the selected currency
  if (!pricing || !pricing[selectedCurrency as keyof typeof pricing]) {
    console.error('Pricing data is missing or invalid:', { pricing, selectedCurrency });
    return (
      <div className="col-12 lg:col-4">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-border h-full">
          <div className="text-center">
            <h3 className="h4 mb-3">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <p className="text-red-500">Pricing data unavailable</p>
          </div>
        </div>
      </div>
    );
  }

  const currentPricing = pricing[selectedCurrency as keyof typeof pricing];

  return (
    <div className="col-12 lg:col-4" data-aos="fade-up-sm" data-aos-delay={100 * (index + 1)}>
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-border h-full flex flex-col">
        <div className="text-center mb-6">
          <h3 className="h4 mb-3">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="mb-2">
            <span className="text-3xl font-bold text-primary">
              {currentPricing.prefix}{currentPricing.amount}
            </span>
            {currentPricing.suffix && (
              <span className="text-gray-600 ml-2">{currentPricing.suffix}</span>
            )}
          </div>
          <p className="text-sm text-gray-600">{currentPricing.detail}</p>
        </div>

        <div className="space-y-3 mb-6">
          {features.map((feature: string, featureIndex: number) => (
            <div key={featureIndex} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        <div className="mb-6 flex-grow flex flex-col justify-end">
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-sm font-medium mb-2 text-gray-900">What's Included:</p>
            <p className="text-sm text-gray-700">{what_included}</p>
          </div>
          <p className="text-xs text-gray-600">{currentPricing.range}</p>
        </div>

        <Button
          label={button.label}
          link={button.link}
          style="primary"
          className="w-full justify-center"
        />
      </div>
    </div>
  );
};

export default PricingCard;