import React, { useState } from 'react';
import WeatherModule from './components/WeatherModule';
import CurrencyConverter from './components/CurrencyConverter';
import QuoteGenerator from './components/QuoteGenerator';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('Weather');
  const tabs = [
    { name: 'Weather', icon: '🌍', color: 'from-blue-400 to-blue-600' },
    { name: 'Currency', icon: '💱', color: 'from-green-400 to-green-600' },
    { name: 'Quotes', icon: '💡', color: 'from-purple-400 to-purple-600' },
  ];

  const renderModule = () => {
    switch (activeTab) {
      case 'Weather':
        return <WeatherModule />;
      case 'Currency':
        return <CurrencyConverter />;
      case 'Quotes':
        return <QuoteGenerator />;
      default:
        return <WeatherModule />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-12 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-5xl">🌟</span>
            <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">InfoHub</h1>
          </div>
          <p className="text-center text-blue-100 text-lg font-medium">
            Your All-in-One Utility Dashboard
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-50 bg-white shadow-lg border-b-2 border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`
                  px-6 py-3 rounded-full font-bold text-lg transition-all duration-300
                  flex items-center gap-2 shadow-md hover:shadow-xl hover:-translate-y-1
                  ${
                    activeTab === tab.name
                      ? `bg-gradient-to-r ${tab.color} text-white scale-105 shadow-xl`
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-400'
                  }
                `}
              >
                <span className="text-2xl">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Active Tab Indicator */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4">
            <p className="text-sm font-semibold uppercase tracking-wider opacity-90">
              📌 Active Module
            </p>
            <p className="text-3xl font-bold">{activeTab}</p>
          </div>

          {/* Module Content */}
          <div className="p-8 md:p-12 animate-fadeIn">
            {renderModule()}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 py-8 mt-16 border-t-4 border-purple-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 InfoHub - ByteXL Assignment • Built with <span className="text-red-500">❤️</span> by a Developer
          </p>
          <p className="text-xs text-gray-400 mt-2">✅ API Status: Operational</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
