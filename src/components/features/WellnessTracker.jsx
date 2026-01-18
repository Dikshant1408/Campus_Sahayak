import React, { useState } from 'react';
import { Brain } from 'lucide-react';

const WellnessTracker = () => {
  const [moodData, setMoodData] = useState([]);
  const [selectedMood, setSelectedMood] = useState('');

  const moodEmojis = {
    'Great': '😊',
    'Good': '🙂',
    'Okay': '😐',
    'Stressed': '😰',
    'Anxious': '😟'
  };

  const trackMood = () => {
    if (!selectedMood) return;
    const newEntry = {
      date: new Date().toLocaleDateString('en-IN'),
      mood: selectedMood,
      timestamp: Date.now()
    };
    setMoodData(prev => [...prev.slice(-6), newEntry]);
    setSelectedMood('');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Brain className="w-6 h-6 text-orange-600" />
        Mental Wellness Tracker
      </h2>
      
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">How are you feeling today?</h3>
        <div className="flex gap-3 flex-wrap mb-4">
          {Object.entries(moodEmojis).map(([mood, emoji]) => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className={`px-4 py-2 rounded-lg transition ${
                selectedMood === mood
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {emoji} {mood}
            </button>
          ))}
        </div>
        <button
          onClick={trackMood}
          disabled={!selectedMood}
          className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition disabled:opacity-50"
        >
          Track Mood
        </button>
      </div>

      {moodData.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
          <h3 className="font-semibold text-purple-800 mb-4">Your Mood History</h3>
          <div className="space-y-2">
            {moodData.map((entry, idx) => (
              <div key={idx} className="flex items-center justify-between bg-white rounded-lg p-3">
                <span className="text-gray-600 text-sm">{entry.date}</span>
                <span className="text-2xl">{moodEmojis[entry.mood]}</span>
                <span className="font-medium text-gray-800">{entry.mood}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          💡 <strong>Tip:</strong> If you're feeling stressed or anxious frequently, consider talking to a counselor 
          or trusted friend. Your campus likely has mental health resources available.
        </p>
      </div>
    </div>
  );
};

export default WellnessTracker;