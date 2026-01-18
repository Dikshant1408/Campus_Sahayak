import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'orange' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colors = {
    orange: 'border-orange-600',
    blue: 'border-blue-600',
    green: 'border-green-600'
  };

  return (
    <div className="flex justify-center items-center">
      <div 
        className={`${sizes[size]} border-4 ${colors[color]} border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;