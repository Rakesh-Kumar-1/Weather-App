import { WeatherData } from '../types/weather';

export const getBackgroundGradient = (weather: WeatherData | null): string => {
  if (!weather) return 'from-blue-400 to-blue-600';
  
  const time = new Date().getHours();
  const isNight = time < 6 || time > 18;
  
  if (isNight) {
    switch (weather.icon) {
      case 'clear-night':
        return 'from-indigo-900 via-purple-900 to-pink-900';
      case 'partly-cloudy-night':
        return 'from-slate-800 via-slate-900 to-indigo-900';
      case 'cloudy':
        return 'from-gray-800 via-gray-900 to-slate-900';
      case 'rainy':
        return 'from-slate-700 via-slate-800 to-blue-900';
      case 'stormy':
        return 'from-purple-900 via-indigo-900 to-slate-900';
      default:
        return 'from-indigo-900 via-purple-900 to-pink-900';
    }
  }
  
  switch (weather.icon) {
    case 'sunny':
      return 'from-yellow-400 via-orange-400 to-red-400';
    case 'partly-cloudy':
      return 'from-blue-400 via-blue-500 to-indigo-500';
    case 'cloudy':
      return 'from-gray-400 via-gray-500 to-gray-600';
    case 'rainy':
      return 'from-blue-600 via-blue-700 to-indigo-800';
    case 'snowy':
      return 'from-blue-200 via-blue-300 to-blue-400';
    case 'stormy':
      return 'from-purple-600 via-indigo-700 to-slate-800';
    case 'foggy':
      return 'from-gray-300 via-gray-400 to-gray-500';
    default:
      return 'from-blue-400 via-blue-500 to-blue-600';
  }
};