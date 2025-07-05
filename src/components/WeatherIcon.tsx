import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Moon, Cloudy, CloudDrizzle } from 'lucide-react';

interface WeatherIconProps {
  icon: string;
  size?: 'small' | 'medium' | 'large';
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ icon, size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const iconClass = sizeClasses[size];

  const getIcon = () => {
    switch (icon) {
      case 'sunny':
        return <Sun className={`${iconClass} text-yellow-400`} />;
      case 'clear-night':
        return <Moon className={`${iconClass} text-blue-200`} />;
      case 'partly-cloudy':
        return <Cloudy className={`${iconClass} text-gray-300`} />;
      case 'partly-cloudy-night':
        return <Cloud className={`${iconClass} text-gray-400`} />;
      case 'cloudy':
        return <Cloud className={`${iconClass} text-gray-400`} />;
      case 'rainy':
        return <CloudRain className={`${iconClass} text-blue-400`} />;
      case 'snowy':
        return <CloudSnow className={`${iconClass} text-blue-200`} />;
      case 'stormy':
        return <CloudLightning className={`${iconClass} text-purple-400`} />;
      case 'foggy':
        return <CloudDrizzle className={`${iconClass} text-gray-300`} />;
      default:
        return <Sun className={`${iconClass} text-yellow-400`} />;
    }
  };

  return <div className="flex items-center justify-center">{getIcon()}</div>;
};