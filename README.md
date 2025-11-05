# InfoHub - Full-Stack Single-Page Application

A comprehensive single-page application integrating real-time weather display, currency conversion, and motivational quote generation.

## 📋 Project Structure

```
InfoHub-Challenge/
├── client/                      (React Frontend - Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── WeatherModule.jsx      (Weather UI & Data Fetching)
│   │   │   ├── CurrencyConverter.jsx  (Currency UI & Data Fetching)
│   │   │   └── QuoteGenerator.jsx     (Quotes UI & Data Fetching)
│   │   ├── App.jsx                    (Main App, Tab Navigation)
│   │   ├── main.jsx                   (React Entry Point)
│   │   ├── index.css                  (Global Styles)
│   │   └── index.html                 (HTML Template)
│   ├── package.json
│   ├── vite.config.js                 (Vite Configuration with Proxy)
│   ├── tailwind.config.js             (Tailwind CSS Config)
│   └── postcss.config.js              (PostCSS Config)
│
└── server/                      (Node.js/Express Backend)
    ├── server.js                (Express Server & API Endpoints)
    ├── package.json
    ├── .env                     (Environment Variables - API Keys)
    └── .env.example             (Example Environment File)
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Backend Setup

1. **Navigate to server directory:**
```bash
cd server
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file:**
```bash
# Copy from .env.example
cp .env.example .env
```

4. **Configure API keys in `.env`:**
```
OPENWEATHER_API_KEY=your_key_here
EXCHANGERATE_API_KEY=your_key_here
PORT=3001
NODE_ENV=development
```

> Get API keys from:
> - [OpenWeatherMap](https://openweathermap.org/api)
> - [ExchangeRate-API](https://exchangerate-api.com)

5. **Start the backend server:**
```bash
# Development with auto-reload
npm run dev

# Or production
npm start
```

Server will run at: `http://localhost:3001`

### Frontend Setup

1. **Navigate to client directory (in another terminal):**
```bash
cd client
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

Frontend will run at: `http://localhost:3000`

4. **Build for production:**
```bash
npm run build
```

## 📦 API Endpoints

### Weather Endpoint
- **URL:** `/api/weather`
- **Method:** GET
- **Query Params:** `city` (default: London)
- **Example:** `/api/weather?city=New York`
- **Response:**
```json
{
  "city": "London",
  "temperature": 15,
  "condition": "Partly Cloudy",
  "description": "partly cloudy",
  "humidity": 65,
  "windSpeed": 12,
  "feelsLike": 14,
  "pressure": 1013,
  "visibility": 10,
  "lastUpdated": "2025-11-05T13:30:00.000Z"
}
```

### Currency Endpoint
- **URL:** `/api/currency`
- **Method:** GET
- **Query Params:** `amount` (default: 1)
- **Example:** `/api/currency?amount=100`
- **Response:**
```json
{
  "amount": 100,
  "baseCurrency": "INR",
  "rates": {
    "USD": {
      "amount": "1.20",
      "rate": "0.012000"
    },
    "EUR": {
      "amount": "1.10",
      "rate": "0.011000"
    },
    "GBP": {
      "amount": "0.95",
      "rate": "0.009500"
    }
  },
  "lastUpdated": "2025-11-05T13:30:00.000Z"
}
```

### Quote Endpoint
- **URL:** `/api/quote`
- **Method:** GET
- **Response:**
```json
{
  "text": "The only way to do great work is to love what you do.",
  "author": "Steve Jobs",
  "id": 0,
  "totalQuotes": 10,
  "fetchedAt": "2025-11-05T13:30:00.000Z"
}
```

### Health Check
- **URL:** `/api/health`
- **Method:** GET
- **Response:**
```json
{
  "status": "Server is running",
  "timestamp": "2025-11-05T13:30:00.000Z",
  "port": 3001
}
```

## 🛠️ Technologies Used

### Frontend
- **React 18+** - UI Library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Hooks** - useState, useEffect for state management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Axios** - HTTP client for external APIs
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### External APIs
- **OpenWeatherMap** - Real-time weather data
- **ExchangeRate-API** - Currency exchange rates
- **Quotable** - Motivational quotes

## 🎯 Features

### Weather Module
- ✅ Real-time weather data
- ✅ City search functionality
- ✅ Multiple weather parameters (humidity, wind speed, pressure, visibility)
- ✅ Weather emoji indicators
- ✅ Refresh button for latest data
- ✅ Loading and error states

### Currency Converter
- ✅ INR to USD/EUR/GBP conversion
- ✅ Real-time conversion as you type
- ✅ Input validation
- ✅ Exchange rate display
- ✅ Last updated timestamp
- ✅ Beautiful card layout for each currency

### Quote Generator
- ✅ Random motivational quotes
- ✅ Copy to clipboard functionality
- ✅ Share on Twitter
- ✅ Quote progress tracking
- ✅ Loading and error states

### General Features
- ✅ Single-Page Application (SPA) with tab navigation
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Beautiful gradient backgrounds and animations
- ✅ Smooth transitions between modules
- ✅ Professional error handling
- ✅ Loading spinners for better UX
- ✅ Clean, modular code architecture

## 🔒 Security Features

- ✅ API keys stored in `.env` (never committed to git)
- ✅ CORS middleware for frontend-backend communication
- ✅ Input validation on both frontend and backend
- ✅ Error messages don't expose sensitive information
- ✅ Environment-specific configuration

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- ✅ Touch-friendly buttons and inputs
- ✅ Optimized typography for all screen sizes

## 🚀 Deployment

### Vercel Deployment

1. **Push to GitHub:**
```bash
git push origin main
```

2. **Connect to Vercel:**
   - Visit [Vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure build settings:
     - Root Directory: `.`
     - Build Command: `cd client && npm run build`
     - Output Directory: `client/dist`

3. **Set Environment Variables:**
   - Add API keys in Vercel dashboard:
     - `OPENWEATHER_API_KEY`
     - `EXCHANGERATE_API_KEY`

4. **Deploy:**
   - Vercel will automatically deploy on push

## 📊 Performance Optimizations

- ✅ Code splitting with Vite
- ✅ CSS minification with Tailwind
- ✅ Efficient re-renders with React hooks
- ✅ Lazy loading of components
- ✅ Image optimization

## 🐛 Troubleshooting

### CORS Error
- Make sure backend is running on port 3001
- Check Vite proxy configuration
- Verify CORS middleware is enabled

### API Key Issues
- Verify keys are correctly set in `.env`
- Check API key quotas and limits
- Ensure `.env` is not committed to git

### Port Already in Use
```bash
# Frontend port 3000
lsof -i :3000
kill -9 <PID>

# Backend port 3001
lsof -i :3001
kill -9 <PID>
```

## 📝 Environment Variables

### Backend (.env)
```
OPENWEATHER_API_KEY=sk_test_xxxxx
EXCHANGERATE_API_KEY=xxxxx
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:3001
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Built as part of the ByteXL Assignment by [Your Name]

## 🙋 Support

For questions or issues, please:
1. Check the troubleshooting section
2. Review API documentation
3. Check console for error messages
4. Contact support

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Express.js Documentation](https://expressjs.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Axios Documentation](https://axios-http.com)

---

**Happy Coding! 🚀**
