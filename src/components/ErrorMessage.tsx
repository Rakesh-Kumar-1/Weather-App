import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="max-w-md mx-auto mb-8 p-6 bg-red-500/20 border border-red-500/30 rounded-xl text-white backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-4">
        <AlertCircle className="w-6 h-6 text-red-400" />
        <h3 className="font-semibold">Error</h3>
      </div>
      <p className="text-white/90 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center space-x-2 bg-red-500/30 hover:bg-red-500/40 px-4 py-2 rounded-lg transition-all duration-300"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};