import React from 'react';
import { MapPin, Thermometer, Droplets, Wind, Eye, Gauge } from 'lucide-react';
import { WeatherData } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-white/30 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <MapPin className="w-6 h-6 text-white" />
          <div>
            <h2 className="text-2xl font-bold text-white">{weather.location}</h2>
            <p className="text-white/80">{weather.country}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-3">
            <WeatherIcon icon={weather.icon} size="large" />
            <span className="text-5xl font-bold text-white">{weather.temperature}°</span>
          </div>
          <p className="text-white/80 text-lg capitalize">{weather.condition}</p>
          <p className="text-white/60 text-sm">Feels like {weather.feelsLike}°</p>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
          <Droplets className="w-6 h-6 text-white mx-auto mb-2" />
          <p className="text-white/80 text-sm">Humidity</p>
          <p className="text-white font-bold text-lg">{weather.humidity}%</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
          <Wind className="w-6 h-6 text-white mx-auto mb-2" />
          <p className="text-white/80 text-sm">Wind Speed</p>
          <p className="text-white font-bold text-lg">{weather.windSpeed} km/h</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
          <Eye className="w-6 h-6 text-white mx-auto mb-2" />
          <p className="text-white/80 text-sm">Visibility</p>
          <p className="text-white font-bold text-lg">{weather.visibility} km</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
          <Gauge className="w-6 h-6 text-white mx-auto mb-2" />
          <p className="text-white/80 text-sm">Pressure</p>
          <p className="text-white font-bold text-lg">{weather.pressure} hPa</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
          <Thermometer className="w-6 h-6 text-white mx-auto mb-2" />
          <p className="text-white/80 text-sm">Feels Like</p>
          <p className="text-white font-bold text-lg">{weather.feelsLike}°</p>
        </div>
      </div>
    </div>
  );
};