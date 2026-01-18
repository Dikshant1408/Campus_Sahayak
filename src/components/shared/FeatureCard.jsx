import React from 'react';

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  color = 'blue', 
  onClick 
}) => {
  const gradients = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600'
  };

  const textColors = {
    blue: 'text-blue-100',
    purple: 'text-purple-100',
    green: 'text-green-100',
    orange: 'text-orange-100',
    red: 'text-red-100'
  };

  return (
    <div
      onClick={onClick}
      className={`bg-gradient-to-br ${gradients[color]} text-white p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition`}
    >
      {Icon && <Icon className="w-10 h-10 mb-3" />}
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className={`text-sm ${textColors[color]}`}>{description}</p>
    </div>
  );
};

export default FeatureCard;