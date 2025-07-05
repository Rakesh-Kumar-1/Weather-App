import { ApiWeatherResponse, ApiForecastResponse, WeatherData, ForecastDay } from '../types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'demo_key';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

class WeatherService {
  private async fetchWithErrorHandling(url: string): Promise<any> {
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
      } else if (response.status === 404) {
        throw new Error('City not found. Please check the spelling and try again.');
      } else if (response.status === 429) {
        throw new Error('API rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`Weather service error: ${response.statusText}`);
      }
    }
    
    return response.json();
  }

  async getCurrentWeather(city: string): Promise<WeatherData> {
    const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    
    try {
      const data: ApiWeatherResponse = await this.fetchWithErrorHandling(url);
      
      return {
        location: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
        visibility: Math.round(data.visibility / 1000), // Convert m to km
        pressure: data.main.pressure,
        icon: this.mapWeatherIcon(data.weather[0].icon),
        feelsLike: Math.round(data.main.feels_like),
        uvIndex: 0 // UV index requires separate API call
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to fetch weather data. Please try again.');
    }
  }

  async getForecast(city: string): Promise<ForecastDay[]> {
    const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    
    try {
      const data: ApiForecastResponse = await this.fetchWithErrorHandling(url);
      
      // Group forecast data by day
      const dailyForecasts = new Map<string, any[]>();
      
      data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toDateString();
        
        if (!dailyForecasts.has(dateKey)) {
          dailyForecasts.set(dateKey, []);
        }
        dailyForecasts.get(dateKey)!.push(item);
      });

      // Convert to forecast days (take first 5 days)
      const forecastDays: ForecastDay[] = [];
      let dayCount = 0;
      
      for (const [dateKey, dayData] of dailyForecasts) {
        if (dayCount >= 5) break;
        
        const date = new Date(dateKey);
        const isToday = date.toDateString() === new Date().toDateString();
        const isTomorrow = date.toDateString() === new Date(Date.now() + 86400000).toDateString();
        
        let dayName: string;
        if (isToday) {
          dayName = 'Today';
        } else if (isTomorrow) {
          dayName = 'Tomorrow';
        } else {
          dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        }

        // Calculate daily high/low from all forecasts for that day
        const temps = dayData.map(d => d.main.temp_max);
        const high = Math.round(Math.max(...temps));
        const low = Math.round(Math.min(...dayData.map(d => d.main.temp_min)));
        
        // Use the most common weather condition for the day
        const conditions = dayData.map(d => d.weather[0]);
        const mainCondition = conditions[Math.floor(conditions.length / 2)];
        
        forecastDays.push({
          date: date.toISOString().split('T')[0],
          day: dayName,
          high,
          low,
          condition: mainCondition.description,
          icon: this.mapWeatherIcon(mainCondition.icon),
          humidity: Math.round(dayData.reduce((sum, d) => sum + d.main.humidity, 0) / dayData.length),
          windSpeed: Math.round(dayData.reduce((sum, d) => sum + d.wind.speed, 0) / dayData.length * 3.6)
        });
        
        dayCount++;
      }
      
      return forecastDays;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to fetch forecast data. Please try again.');
    }
  }

  async getWeatherByCoordinates(lat: number, lon: number): Promise<WeatherData> {
    const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    
    try {
      const data: ApiWeatherResponse = await this.fetchWithErrorHandling(url);
      
      return {
        location: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6),
        visibility: Math.round(data.visibility / 1000),
        pressure: data.main.pressure,
        icon: this.mapWeatherIcon(data.weather[0].icon),
        feelsLike: Math.round(data.main.feels_like),
        uvIndex: 0
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to fetch weather data for your location.');
    }
  }

  private mapWeatherIcon(iconCode: string): string {
    const iconMap: { [key: string]: string } = {
      '01d': 'sunny',
      '01n': 'clear-night',
      '02d': 'partly-cloudy',
      '02n': 'partly-cloudy-night',
      '03d': 'cloudy',
      '03n': 'cloudy',
      '04d': 'cloudy',
      '04n': 'cloudy',
      '09d': 'rainy',
      '09n': 'rainy',
      '10d': 'rainy',
      '10n': 'rainy',
      '11d': 'stormy',
      '11n': 'stormy',
      '13d': 'snowy',
      '13n': 'snowy',
      '50d': 'foggy',
      '50n': 'foggy'
    };
    
    return iconMap[iconCode] || 'sunny';
  }
}

export const weatherService = new WeatherService();