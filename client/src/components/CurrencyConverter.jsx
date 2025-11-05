import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(100);
  const [conversionData, setConversionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchConversion = async (amountValue = amount) => {
    if (amountValue <= 0) {
      setError('Please enter a positive amount');
      setConversionData(null);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/currency?amount=${amountValue}`
      );
      setConversionData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch currency data.');
      setConversionData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversion();
  }, []);

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setAmount(value);
    if (value > 0) {
      fetchConversion(value);
    } else {
      setConversionData(null);
    }
  };

  return (
    <div className="flex flex-col items-center w-full space-y-6">
      {/* Input Card */}
      <div className="w-full max-w-md bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg p-6 border-2 border-green-200">
        <label className="block text-gray-700 font-bold text-lg mb-3">Amount in INR</label>
        <div className="flex items-center border-2 border-green-400 rounded-lg bg-white overflow-hidden shadow-md">
          <span className="px-4 text-3xl">₹</span>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="0"
            className="flex-1 px-4 py-3 outline-none text-lg"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center gap-4 py-12">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          <p className="text-green-600 font-semibold">Converting currency...</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="w-full max-w-md bg-red-100 border-l-4 border-red-600 text-red-700 rounded-lg p-4">
          <div className="font-bold mb-1">⚠️ Error</div>
          <p className="text-sm mb-3">{error}</p>
          <button
            onClick={() => fetchConversion()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold text-sm"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Results */}
      {conversionData && !loading && (
        <div className="w-full max-w-2xl space-y-6">
          {/* Amount Display */}
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-8 text-white shadow-2xl">
            <p className="text-lg opacity-90 mb-2">You have</p>
            <p className="text-5xl font-extrabold">₹ {amount.toFixed(2)}</p>
            <p className="text-lg opacity-90 mt-4">is equal to</p>
          </div>

          {/* Currency Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { code: 'USD', symbol: '$', emoji: '🇺🇸', color: 'from-blue-400 to-blue-600' },
              { code: 'EUR', symbol: '€', emoji: '🇪🇺', color: 'from-yellow-400 to-yellow-600' },
              { code: 'GBP', symbol: '£', emoji: '🇬🇧', color: 'from-red-400 to-red-600' },
            ].map((curr) => (
              <div key={curr.code} className={`bg-gradient-to-br ${curr.color} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition`}>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-4xl">{curr.emoji}</span>
                  <span className="text-2xl font-bold">{curr.code}</span>
                </div>
                <p className="text-sm opacity-90 mb-2">Amount</p>
                <p className="text-4xl font-extrabold mb-3">{curr.symbol} {conversionData.rates[curr.code].amount}</p>
                <p className="text-xs opacity-75">1 INR = {conversionData.rates[curr.code].rate}</p>
              </div>
            ))}
          </div>

          <div className="text-center text-gray-500 text-sm">
            Last updated: {new Date(conversionData.lastUpdated).toLocaleString()}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!conversionData && !loading && !error && (
        <p className="text-gray-400 text-lg">Enter an amount to see conversion</p>
      )}
    </div>
  );
};

export default CurrencyConverter;
