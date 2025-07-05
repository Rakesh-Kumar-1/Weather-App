import React, { useState } from 'react';
import { Search, Wind, Thermometer, Droplets, TrendingUp, TrendingDown, MapPin } from 'lucide-react';

interface LocationData {
  lat: number;
  lon: number;
  name: string;
  state?: string;
  country: string;
}

interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    feels_like: number;
  };
  wind: {
    speed: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
}

const App = () => {
  const api = "c215ce0b4b27f9a05940c4e0e7b5c567";
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const search = async () => {
    if (!location.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      // Step 1: Get coordinates from location name
      const response1 = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${api}`
      );
      
      if (!response1.ok) {
        throw new Error('Failed to fetch location data');
      }
      
      const locationData: LocationData[] = await response1.json();
      
      if (locationData.length === 0) {
        throw new Error('Location not found');
      }
      
      const { lat: latitude, lon: longitude } = locationData[0];
      
      // Step 2: Get weather data using coordinates
      const response2 = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api}&units=metric`
      );
      
      if (!response2.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const weather: WeatherData = await response2.json();
      setWeatherData(weather);
      console.log('Location Data:', locationData[0]);
      console.log('Weather Data:', weather);
      
    } catch (error) {
      console.log('Error fetching weather:', error);
      setError(error instanceof Error ? error.message : 'An error occurred while fetching weather data');
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-white mb-2">Weather Dashboard</h1>
          <p className="text-white/80">Get detailed weather information for any city worldwide</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter city name..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="w-full px-4 py-3 pl-12 pr-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 disabled:opacity-50"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
            <button
              onClick={search}
              disabled={isLoading || !location.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Search className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-md mx-auto mb-8 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-white backdrop-blur-sm text-center">
            <p>{error}</p>
          </div>
        )}

        {/* Weather Information */}
        {weatherData && (
          <div className="space-y-6">
            {/* Main Weather Card */}
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6 text-white" />
                  <div>
                    <h2 className="text-3xl font-bold text-white">{weatherData.name}</h2>
                    <p className="text-white/80">{weatherData.sys.country}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-6xl font-bold text-white mb-2">
                    {Math.round(weatherData.main.temp)}°C
                  </div>
                  <p className="text-white/80 text-lg capitalize">{weatherData.weather[0].description}</p>
                  <p className="text-white/60 text-sm">Feels like {Math.round(weatherData.main.feels_like)}°C</p>
                </div>
              </div>
            </div>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Min Temperature */}
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl hover:bg-white/25 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500/30 p-3 rounded-full">
                    <TrendingDown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm font-medium">Min Temperature</p>
                    <p className="text-2xl font-bold text-white">{Math.round(weatherData.main.temp_min)}°C</p>
                  </div>
                </div>
              </div>

              {/* Max Temperature */}
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl hover:bg-white/25 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center space-x-4">
                  <div className="bg-red-500/30 p-3 rounded-full">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm font-medium">Max Temperature</p>
                    <p className="text-2xl font-bold text-white">{Math.round(weatherData.main.temp_max)}°C</p>
                  </div>
                </div>
              </div>

              {/* Humidity */}
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl hover:bg-white/25 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center space-x-4">
                  <div className="bg-cyan-500/30 p-3 rounded-full">
                    <Droplets className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm font-medium">Humidity</p>
                    <p className="text-2xl font-bold text-white">{weatherData.main.humidity}%</p>
                  </div>
                </div>
              </div>

              {/* Wind Speed */}
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl hover:bg-white/25 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-500/30 p-3 rounded-full">
                    <Wind className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm font-medium">Wind Speed</p>
                    <p className="text-2xl font-bold text-white">{Math.round(weatherData.wind.speed * 3.6)} km/h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4">Weather Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-white/80 text-sm">Current Temperature</p>
                  <p className="text-2xl font-bold text-white">{Math.round(weatherData.main.temp)}°C</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-white/80 text-sm">Temperature Range</p>
                  <p className="text-lg font-semibold text-white">
                    {Math.round(weatherData.main.temp_min)}° - {Math.round(weatherData.main.temp_max)}°
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-white/80 text-sm">Weather Condition</p>
                  <p className="text-lg font-semibold text-white capitalize">{weatherData.weather[0].main}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!weatherData && !isLoading && !error && (
          <div className="text-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl">
              <Thermometer className="w-16 h-16 text-white mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Welcome to Weather Dashboard</h3>
              <p className="text-white/80">Enter any city name to get detailed weather information including temperature, humidity, and wind speed.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;