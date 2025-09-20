import React, { useState } from 'react';
import CurrencySelector from './CurrencySelector';
import PricingCard from './PricingCard';
import InvestmentExamples from './InvestmentExamples';

interface PricingSectionProps {
  serviceComponents: any[];
  investmentExamples: any;
}

const PricingSection: React.FC<PricingSectionProps> = ({ serviceComponents, investmentExamples }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  // Debug: log the service components to understand the data structure
  React.useEffect(() => {
    console.log('Service Components:', serviceComponents);
    console.log('Investment Examples:', investmentExamples);
  }, [serviceComponents, investmentExamples]);

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="row justify-center">
            <div className="col-12 mb-16">
              <h2 className="h2 text-center mb-4" data-aos="fade-up-sm">
                Three Service Components for Complete AI Transformation
              </h2>
              <p className="text-center text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8" data-aos="fade-up-sm" data-aos-delay="100">
                Choose the services that match your organization's current ChatGPT situation and transformation goals
              </p>

              {/* Currency Selector */}
              <div className="flex justify-center" data-aos="fade-up-sm" data-aos-delay="200">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">Currency:</span>
                  <CurrencySelector
                    onCurrencyChange={handleCurrencyChange}
                    className="z-20"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {serviceComponents && serviceComponents.map((component: any, index: number) => (
              <PricingCard
                key={index}
                title={component.title}
                description={component.description}
                pricing={component.pricing}
                features={component.features}
                what_included={component.what_included}
                button={component.button}
                selectedCurrency={selectedCurrency}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Investment Examples Section */}
      {investmentExamples && (
        <InvestmentExamples
          investmentExamples={investmentExamples}
          selectedCurrency={selectedCurrency}
        />
      )}
    </>
  );
};

export default PricingSection;