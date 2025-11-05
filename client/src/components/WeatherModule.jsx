import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherModule = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [city, setCity] = useState('London');
  const [inputCity, setInputCity] = useState('');

  const fetchWeather = async (cityName = city) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/weather?city=${cityName}`
      );
      setWeatherData(response.data);
      setCity(cityName);
      setInputCity('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch weather data.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      fetchWeather(inputCity.trim());
    }
  };

  const getWeatherIcon = (condition) => {
    const c = condition.toLowerCase();
    if (c.includes('cloud')) return '☁️';
    if (c.includes('rain')) return '🌧️';
    if (c.includes('sunny') || c.includes('clear')) return '☀️';
    if (c.includes('snow')) return '❄️';
    if (c.includes('wind')) return '💨';
    if (c.includes('fog')) return '🌫️';
    if (c.includes('thunder')) return '⛈️';
    return '🌤️';
  };

  return (
    <div className="flex flex-col items-center w-full space-y-6">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="w-full max-w-md">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            placeholder="Enter city name..."
            className="flex-1 px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition"
          >
            Search
          </button>
        </div>
      </form>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center gap-4 py-12">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-blue-600 font-semibold">Fetching weather data...</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="w-full max-w-md bg-red-100 border-l-4 border-red-600 text-red-700 rounded-lg p-4">
          <div className="font-bold mb-1">⚠️ Error</div>
          <div className="text-sm mb-3">{error}</div>
          <button
            onClick={() => fetchWeather()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-semibold"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Weather Display */}
      {weatherData && !loading && (
        <div className="w-full max-w-2xl space-y-6">
          {/* Main Weather Card */}
          <div className="bg-gradient-to-br from-blue-400 via-cyan-300 to-blue-500 rounded-2xl p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-5xl font-extrabold">{weatherData.city}</h3>
                <p className="text-blue-100 text-sm mt-1">
                  Last updated: {new Date(weatherData.lastUpdated).toLocaleTimeString()}
                </p>
              </div>
              <div className="text-7xl">{getWeatherIcon(weatherData.condition)}</div>
            </div>

            <div className="flex items-end gap-2 mb-4">
              <span className="text-6xl font-extrabold">{weatherData.temperature}°C</span>
              <span className="text-2xl capitalize mb-2">{weatherData.description}</span>
            </div>

            <div className="text-blue-50 text-lg">Feels like {weatherData.feelsLike}°C</div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: 'Humidity', value: `${weatherData.humidity}%`, icon: '💧' },
              { label: 'Wind Speed', value: `${weatherData.windSpeed} m/s`, icon: '💨' },
              { label: 'Pressure', value: `${weatherData.pressure} hPa`, icon: '🔵' },
              { label: 'Visibility', value: `${weatherData.visibility} km`, icon: '👁️' },
              { label: 'Condition', value: weatherData.condition, icon: '🌦️' },
              { label: 'Temperature', value: `${weatherData.temperature}°C`, icon: '🌡️' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{item.icon}</span>
                  <p className="text-gray-600 text-sm font-semibold">{item.label}</p>
                </div>
                <p className="text-2xl font-bold text-blue-600">{item.value}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => fetchWeather()}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition"
          >
            🔄 Refresh
          </button>
        </div>
      )}
    </div>
  );
};

export default WeatherModule;
