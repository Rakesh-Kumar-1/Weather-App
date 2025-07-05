# Weather Forecast App

A beautiful, production-ready weather forecast application built with React, TypeScript, and Tailwind CSS. Features real-time weather data, 5-day forecasts, and an elegant responsive design.

## Features

- **Real-time Weather Data**: Current weather conditions with detailed metrics
- **5-Day Forecast**: Extended weather predictions with daily highs and lows
- **Location Services**: Search by city name or use current location
- **Responsive Design**: Beautiful interface that works on all devices
- **Dynamic Backgrounds**: Weather-appropriate gradient backgrounds
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Smooth loading animations and states
- **Production Ready**: Clean architecture with TypeScript and proper error boundaries

## API Integration

This app uses the OpenWeatherMap API for real weather data. To get started:

1. Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api)
2. Copy `.env.example` to `.env`
3. Add your API key to the `.env` file:
   ```
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your environment variables (see API Integration above)

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local development URL

## Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── services/           # API services and data fetching
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── App.tsx             # Main application component
```

## Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Vite** - Fast build tool and development server
- **OpenWeatherMap API** - Real weather data

## Features in Detail

### Weather Data
- Current temperature and "feels like" temperature
- Weather conditions with appropriate icons
- Humidity, wind speed, visibility, and atmospheric pressure
- Location information with country

### Forecast
- 5-day weather forecast
- Daily high and low temperatures
- Weather conditions for each day
- Additional metrics (humidity, wind speed)

### User Experience
- Smooth animations and transitions
- Glassmorphism design with backdrop blur effects
- Dynamic color schemes based on weather conditions
- Mobile-first responsive design
- Intuitive search with location services
- Comprehensive error handling

## Environment Variables

- `VITE_OPENWEATHER_API_KEY` - Your OpenWeatherMap API key

## License

This project is open source and available under the MIT License.