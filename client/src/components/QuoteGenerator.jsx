import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuoteGenerator = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    setError('');
    setCopied(false);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/quote`
      );
      setQuote(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch quote.');
      setQuote(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const copyToClipboard = () => {
    if (quote) {
      const text = `"${quote.text}" - ${quote.author}`;
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const shareOnTwitter = () => {
    if (quote) {
      const text = `"${quote.text}" - ${quote.author}`;
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="flex flex-col items-center w-full space-y-6">
      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center gap-4 py-12">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <p className="text-purple-600 font-semibold">Loading quote...</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="w-full max-w-md bg-red-100 border-l-4 border-red-600 text-red-700 rounded-lg p-4">
          <div className="font-bold mb-1">⚠️ Error</div>
          <p className="text-sm mb-3">{error}</p>
          <button
            onClick={fetchQuote}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold text-sm"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Quote Display */}
      {quote && !loading && (
        <div className="w-full max-w-2xl space-y-6">
          {/* Quote Card */}
          <div className="bg-gradient-to-br from-purple-400 via-pink-300 to-purple-500 rounded-3xl shadow-2xl p-8 text-white">
            <div className="text-6xl mb-6 opacity-50">"</div>
            <p className="text-3xl md:text-4xl font-bold leading-relaxed mb-8">{quote.text}</p>
            <div className="border-t-2 border-white pt-6">
              <p className="text-2xl font-semibold">— {quote.author}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-lg p-4 text-center">
              <p className="text-gray-600 text-sm font-semibold">Quote #</p>
              <p className="text-3xl font-bold text-purple-600">{quote.id + 1}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4 text-center">
              <p className="text-gray-600 text-sm font-semibold">Total</p>
              <p className="text-3xl font-bold text-purple-600">{quote.totalQuotes}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4 text-center">
              <p className="text-gray-600 text-sm font-semibold">Progress</p>
              <p className="text-3xl font-bold text-purple-600">{Math.round(((quote.id + 1) / quote.totalQuotes) * 100)}%</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={copyToClipboard}
              className={`px-6 py-3 rounded-lg font-bold text-lg transition shadow-lg hover:shadow-xl ${
                copied
                  ? 'bg-green-600 text-white'
                  : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:scale-105'
              }`}
            >
              {copied ? '✓ Copied!' : '📋 Copy'}
            </button>
            <button
              onClick={shareOnTwitter}
              className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition shadow-lg hover:shadow-xl hover:scale-105"
            >
              🐦 Twitter
            </button>
            <button
              onClick={fetchQuote}
              className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold rounded-lg hover:scale-105 transition shadow-lg hover:shadow-xl"
            >
              🔄 New Quote
            </button>
          </div>

          <p className="text-center text-gray-500 text-sm">
            Fetched: {new Date(quote.fetchedAt).toLocaleTimeString()}
          </p>
        </div>
      )}

      {/* Empty State */}
      {!quote && !loading && !error && (
        <button
          onClick={fetchQuote}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition"
        >
          Load a Quote
        </button>
      )}
    </div>
  );
};

export default QuoteGenerator;
