export const saveMoodEntry = (mood) => {
  const entry = {
    date: new Date().toISOString(),
    mood: mood,
    timestamp: Date.now()
  };
  
  const existingData = getMoodHistory();
  const updatedData = [...existingData, entry];
  
  // Keep only last 30 entries
  const limitedData = updatedData.slice(-30);
  
  // Store in memory (not localStorage as it's not supported in artifacts)
  return entry;
};

export const getMoodHistory = () => {
  // In a real app, this would fetch from storage
  // For now, return empty array as we store in component state
  return [];
};

export const analyzeMoodPattern = (moodData) => {
  if (moodData.length === 0) {
    return {
      dominantMood: null,
      trend: 'neutral',
      suggestion: 'Start tracking your mood to see patterns!'
    };
  }
  
  const moodCounts = {};
  moodData.forEach(entry => {
    moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
  });
  
  const dominantMood = Object.keys(moodCounts).reduce((a, b) => 
    moodCounts[a] > moodCounts[b] ? a : b
  );
  
  const suggestions = {
    'Great': 'Keep up the positive energy! 🌟',
    'Good': 'You\'re doing well! Stay consistent! 👍',
    'Okay': 'Consider activities that boost your mood 🎯',
    'Stressed': 'Try relaxation techniques like deep breathing 🧘',
    'Anxious': 'Consider talking to a counselor or friend 💙'
  };
  
  return {
    dominantMood,
    suggestion: suggestions[dominantMood] || 'Keep tracking your mood!'
  };
};

export const getMoodStats = (moodData) => {
  const total = moodData.length;
  const positive = moodData.filter(e => ['Great', 'Good'].includes(e.mood)).length;
  const neutral = moodData.filter(e => e.mood === 'Okay').length;
  const negative = moodData.filter(e => ['Stressed', 'Anxious'].includes(e.mood)).length;
  
  return {
    total,
    positive,
    neutral,
    negative,
    positivePercentage: total > 0 ? Math.round((positive / total) * 100) : 0
  };
};