import React from 'react';
import { MessageCircle, Calendar, TrendingUp } from 'lucide-react';

const Home = ({ setActiveTab }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-orange-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Campus Sahayak! 🎓</h2>
        <p className="text-gray-600 mb-4">
          Your all-in-one AI assistant designed specifically for Indian college students. We help you excel in academics, 
          prepare for placements, manage stress, and navigate campus life.
        </p>
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="font-semibold text-orange-800 mb-2">🎯 Key Features</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 24/7 AI Study Assistant in English & Hindi</li>
              <li>• Smart Study Plan Generator</li>
              <li>• Resume ATS Score Checker</li>
              <li>• Mental Wellness Tracker</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">🇮🇳 Built for Bharat</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Works on low bandwidth</li>
              <li>• Affordable & accessible</li>
              <li>• Indian education system focused</li>
              <li>• Privacy-first approach</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div 
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition" 
          onClick={() => setActiveTab('chat')}
        >
          <MessageCircle className="w-10 h-10 mb-3" />
          <h3 className="text-lg font-bold mb-2">AI Assistant</h3>
          <p className="text-sm text-blue-100">Get instant help with doubts, assignments & more</p>
        </div>
        <div 
          className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition" 
          onClick={() => setActiveTab('study')}
        >
          <Calendar className="w-10 h-10 mb-3" />
          <h3 className="text-lg font-bold mb-2">Study Planner</h3>
          <p className="text-sm text-purple-100">AI-generated personalized study schedules</p>
        </div>
        <div 
          className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition" 
          onClick={() => setActiveTab('career')}
        >
          <TrendingUp className="w-10 h-10 mb-3" />
          <h3 className="text-lg font-bold mb-2">Career Tools</h3>
          <p className="text-sm text-green-100">Resume analysis & interview preparation</p>
        </div>
      </div>
    </div>
  );
};

export default Home;