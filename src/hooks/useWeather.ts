import { useState, useEffect } from 'react';
import { WeatherData, ForecastDay } from '../types/weather';
import { weatherService } from '../services/weatherApi';

export const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const fetchWeatherData = async (city: string) => {
    setIsLoading(true);
    setError('');

    try {
      const [weatherData, forecastData] = await Promise.all([
        weatherService.getCurrentWeather(city),
        weatherService.getForecast(city)
      ]);

      setCurrentWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
      console.error('Weather fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeatherByLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    setIsLoading(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const weatherData = await weatherService.getWeatherByCoordinates(latitude, longitude);
          setCurrentWeather(weatherData);
          
          // Fetch forecast for the detected location
          const forecastData = await weatherService.getForecast(weatherData.location);
          setForecast(forecastData);
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data for your location';
          setError(errorMessage);
          console.error('Location weather fetch error:', err);
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        setError('Unable to retrieve your location. Please search for a city instead.');
        setIsLoading(false);
        console.error('Geolocation error:', err);
      },
      {
        timeout: 10000,
        enableHighAccuracy: true
      }
    );
  };

  // Load default city on component mount
  useEffect(() => {
    fetchWeatherData('London');
  }, []);

  return {
    currentWeather,
    forecast,
    isLoading,
    error,
    fetchWeatherData,
    fetchWeatherByLocation,
    clearError: () => setError('')
  };
};