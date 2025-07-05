import React from 'react';
import { ForecastDay } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';

interface ForecastCardProps {
  forecast: ForecastDay[];
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-2xl">
      <h3 className="text-2xl font-bold text-white mb-6">5-Day Forecast</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            <p className="text-white font-semibold mb-3">{day.day}</p>
            <div className="flex justify-center mb-3">
              <WeatherIcon icon={day.icon} size="medium" />
            </div>
            <p className="text-white/80 text-sm mb-3 capitalize">{day.condition}</p>
            <div className="space-y-1">
              <p className="text-white font-bold text-lg">{day.high}°</p>
              <p className="text-white/70">{day.low}°</p>
            </div>
            <div className="mt-3 pt-3 border-t border-white/20">
              <div className="flex justify-between text-xs text-white/60">
                <span>{day.humidity}%</span>
                <span>{day.windSpeed}km/h</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};