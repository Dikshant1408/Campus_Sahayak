import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false, 
  className = '',
  icon = null 
}) => {
  const baseClasses = 'px-6 py-2 rounded-lg transition font-medium flex items-center gap-2';
  
  const variants = {
    primary: 'bg-orange-600 text-white hover:bg-orange-700 disabled:opacity-50',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50',
    success: 'bg-green-600 text-white hover:bg-green-700 disabled:opacity-50',
    danger: 'bg-red-600 text-white hover:bg-red-700 disabled:opacity-50'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {icon && icon}
      {children}
    </button>
  );
};

export default Button;