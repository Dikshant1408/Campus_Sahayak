import React from 'react';
import { Home, MessageCircle, BookOpen, Briefcase, Brain } from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'chat', label: 'AI Assistant', icon: MessageCircle },
    { id: 'study', label: 'Study Planner', icon: BookOpen },
    { id: 'career', label: 'Career Prep', icon: Briefcase },
    { id: 'wellness', label: 'Wellness', icon: Brain }
  ];

  return (
    <div className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto py-3">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navigation;