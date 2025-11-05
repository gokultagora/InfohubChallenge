import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock quotes array for demonstration
const quotesArray = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs"
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle"
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky"
  },
  {
    text: "Whether you think you can, or you think you can't - you're right.",
    author: "Henry Ford"
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb"
  }
];

// ===== WEATHER API ENDPOINT =====
app.get('/api/weather', async (req, res) => {
  try {
    const city = req.query.city || 'London';
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return res.status(400).json({
        error: 'OpenWeather API key not configured'
      });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);

    const weatherData = {
      city: response.data.name,
      temperature: Math.round(response.data.main.temp),
      condition: response.data.weather[0].main,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      windSpeed: Math.round(response.data.wind.speed),
      feelsLike: Math.round(response.data.main.feels_like),
      pressure: response.data.main.pressure,
      visibility: Math.round(response.data.visibility / 1000),
      icon: response.data.weather[0].icon,
      lastUpdated: new Date().toISOString()
    };

    res.json(weatherData);
  } catch (error) {
    console.error('Weather API Error:', error.message);
    
    if (error.response?.status === 404) {
      return res.status(404).json({
        error: 'City not found. Please enter a valid city name.'
      });
    }
    
    res.status(500).json({
      error: 'Could not fetch weather data. Please try again later.'
    });
  }
});

// ===== CURRENCY CONVERSION API ENDPOINT =====
app.get('/api/currency', async (req, res) => {
  try {
    const amount = parseFloat(req.query.amount) || 1;
    const apiKey = process.env.EXCHANGERATE_API_KEY;

    if (!apiKey) {
      return res.status(400).json({
        error: 'ExchangeRate API key not configured'
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        error: 'Amount must be greater than 0'
      });
    }

    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR`;
    const response = await axios.get(url);

    if (response.data.result !== 'success') {
      throw new Error('API request failed');
    }

    const rates = response.data.conversion_rates;
    
    const conversionData = {
      amount: amount,
      baseCurrency: 'INR',
      rates: {
        USD: {
          amount: (amount * rates.USD).toFixed(2),
          rate: rates.USD.toFixed(6)
        },
        EUR: {
          amount: (amount * rates.EUR).toFixed(2),
          rate: rates.EUR.toFixed(6)
        },
        GBP: {
          amount: (amount * rates.GBP).toFixed(2),
          rate: rates.GBP.toFixed(6)
        }
      },
      lastUpdated: new Date().toISOString()
    };

    res.json(conversionData);
  } catch (error) {
    console.error('Currency API Error:', error.message);
    res.status(500).json({
      error: 'Could not fetch currency data. Please try again later.'
    });
  }
});

// ===== QUOTE API ENDPOINT =====
app.get('/api/quote', (req, res) => {
  try {
    // Simulate network delay
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotesArray.length);
      const quote = quotesArray[randomIndex];

      res.json({
        ...quote,
        id: randomIndex,
        totalQuotes: quotesArray.length,
        fetchedAt: new Date().toISOString()
      });
    }, 300);
  } catch (error) {
    console.error('Quote API Error:', error.message);
    res.status(500).json({
      error: 'Could not fetch quote data. Please try again later.'
    });
  }
});

// ===== HEALTH CHECK ENDPOINT =====
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Server is running',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// ===== ERROR HANDLING MIDDLEWARE =====
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({
    error: 'An unexpected error occurred. Please try again later.'
  });
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`🚀 InfoHub Server running on http://localhost:${PORT}`);
  console.log(`📍 Weather API: http://localhost:${PORT}/api/weather?city=London`);
  console.log(`💱 Currency API: http://localhost:${PORT}/api/currency?amount=100`);
  console.log(`💡 Quote API: http://localhost:${PORT}/api/quote`);
  console.log(`✅ Health Check: http://localhost:${PORT}/api/health`);
});
