import React from 'react';
import { Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <div className="bg-gradient-to-r from-orange-600 to-green-600 text-white p-6 shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Campus Sahayak</h1>
        </div>
        <p className="text-orange-100">Your AI-powered companion for student life in Bharat 🇮🇳</p>
      </div>
    </div>
  );
};

export default Header;