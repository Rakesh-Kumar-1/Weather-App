import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationRequest: () => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onLocationRequest, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setSearchTerm('');
    }
  };

  return (
    <div className="max-w-md mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a city..."
          disabled={isLoading}
          className="w-full px-4 py-3 pl-12 pr-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 disabled:opacity-50"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
          <button
            type="button"
            onClick={onLocationRequest}
            disabled={isLoading}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all duration-300 disabled:opacity-50"
            title="Use current location"
          >
            <MapPin className="w-4 h-4 text-white" />
          </button>
          <button
            type="submit"
            disabled={isLoading || !searchTerm.trim()}
            className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-full transition-all duration-300 disabled:opacity-50"
          >
            <Search className="w-4 h-4 text-white" />
          </button>
        </div>
      </form>
    </div>
  );
};