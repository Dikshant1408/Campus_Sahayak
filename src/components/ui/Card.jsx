import React from 'react';

const Card = ({ 
  children, 
  title, 
  className = '',
  onClick = null,
  hover = false 
}) => {
  const hoverClass = hover ? 'hover:scale-105 cursor-pointer' : '';
  
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-lg p-6 transition ${hoverClass} ${className}`}
    >
      {title && (
        <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      )}
      {children}
    </div>
  );
};

export default Card;