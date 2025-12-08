import React from 'react';

interface InvestmentExample {
  organization_size: string;
  pricing: {
    USD: {
      deployment_cost: string;
      enablement_cost: string;
      managed_annual: string;
      total_year_one: string;
      per_employee: string;
    };
    EUR: {
      deployment_cost: string;
      enablement_cost: string;
      managed_annual: string;
      total_year_one: string;
      per_employee: string;
    };
    GBP: {
      deployment_cost: string;
      enablement_cost: string;
      managed_annual: string;
      total_year_one: string;
      per_employee: string;
    };
  };
  description: string;
}

interface InvestmentExamplesProps {
  investmentExamples: {
    title: string;
    subtitle: string;
    examples: InvestmentExample[];
  };
  selectedCurrency: string;
}

const InvestmentExamples: React.FC<InvestmentExamplesProps> = ({
  investmentExamples,
  selectedCurrency
}) => {
  return (
    <section className="section bg-theme-light">
      <div className="container">
        <div className="row justify-center">
          <div className="col-12 mb-12">
            <h2 className="h2 text-center mb-4" data-aos="fade-up-sm">
              {investmentExamples.title}
            </h2>
            <p className="text-center text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto" data-aos="fade-up-sm" data-aos-delay="100">
              {investmentExamples.subtitle}
            </p>
          </div>
        </div>

        <div className="row g-4">
          {investmentExamples.examples && investmentExamples.examples.map((example: InvestmentExample, index: number) => {
            const currentPricing = example.pricing[selectedCurrency as keyof typeof example.pricing];

            // Debug log
            console.log('Example:', example.organization_size, 'Currency:', selectedCurrency, 'Pricing:', currentPricing);

            return (
              <div key={index} className="col-12 lg:col-4" data-aos="fade-up-sm" data-aos-delay={100 * (index + 1)}>
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-border h-full">
                  <div className="text-center mb-6">
                    <h3 className="h4 mb-2">{example.organization_size}</h3>
                    <p className="text-gray-600 text-sm mb-4">{example.description}</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">AI Impact Sprint:</span>
                      <span className="font-semibold text-gray-900">{currentPricing.deployment_cost}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Change Enablement:</span>
                      <span className="font-semibold text-gray-900">{currentPricing.enablement_cost}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Managed Services (annual):</span>
                      <span className="font-semibold text-gray-900">{currentPricing.managed_annual}</span>
                    </div>
                    <hr className="my-4 border-gray-200" />
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Total Year One Investment:</span>
                      <span className="font-bold text-lg text-primary">{currentPricing.total_year_one}</span>
                    </div>
                    {currentPricing.per_employee && (
                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                        <span className="text-sm text-gray-600">Per employee:</span>
                        <span className="font-semibold text-gray-900">{currentPricing.per_employee}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InvestmentExamples;