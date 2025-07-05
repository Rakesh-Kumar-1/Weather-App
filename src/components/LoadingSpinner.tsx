import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  overlay?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Loading weather data...", 
  overlay = false 
}) => {
  const content = (
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mb-4 mx-auto"></div>
      <p className="text-white text-lg">{message}</p>
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
      {content}
    </div>
  );
};