import React, { useState, useEffect } from 'react';
import config from '@/config/config.json';

interface CurrencyOption {
  code: string;
  symbol: string;
  name: string;
}

interface CurrencySelectorProps {
  onCurrencyChange: (currency: string) => void;
  className?: string;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  onCurrencyChange,
  className = ""
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>(config.currencies.default);

  const currencies: CurrencyOption[] = config.currencies.options;

  useEffect(() => {
    onCurrencyChange(selectedCurrency);
  }, [selectedCurrency, onCurrencyChange]);

  const handleCurrencySelect = (currencyCode: string) => {
    setSelectedCurrency(currencyCode);
  };

  return (
    <div className={`inline-flex items-center ${className}`}>
      <div className="flex bg-gray-100 rounded-lg p-1">
        {currencies.map((currency) => (
          <button
            key={currency.code}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              currency.code === selectedCurrency
                ? 'bg-white text-primary shadow-sm border border-primary/20'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            onClick={() => handleCurrencySelect(currency.code)}
            aria-pressed={currency.code === selectedCurrency}
          >
            <span className="mr-1.5 font-mono">{currency.symbol}</span>
            <span>{currency.code}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CurrencySelector;