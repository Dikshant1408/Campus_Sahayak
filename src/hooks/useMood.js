import { useState } from 'react';
import { saveMoodEntry, analyzeMoodPattern, getMoodStats } from '../services/moodTracker';

export const useMood = () => {
  const [moodData, setMoodData] = useState([]);
  const [selectedMood, setSelectedMood] = useState('');

  const trackMood = () => {
    if (!selectedMood) return;

    const entry = saveMoodEntry(selectedMood);
    const newEntry = {
      date: new Date().toLocaleDateString('en-IN'),
      mood: selectedMood,
      timestamp: Date.now()
    };

    setMoodData(prev => [...prev.slice(-6), newEntry]);
    setSelectedMood('');
  };

  const selectMood = (mood) => {
    setSelectedMood(mood);
  };

  const analysis = analyzeMoodPattern(moodData);
  const stats = getMoodStats(moodData);

  return {
    moodData,
    selectedMood,
    trackMood,
    selectMood,
    analysis,
    stats
  };
};