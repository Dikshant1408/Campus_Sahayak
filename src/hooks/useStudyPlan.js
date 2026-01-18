import { useState } from 'react';
import { createStudyPlan } from '../services/studyPlanGenerator';

export const useStudyPlan = () => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generatePlan = async (subjects = "Data Structures, DBMS, OS", days = 7) => {
    setLoading(true);
    setError(null);

    try {
      const generatedPlan = await createStudyPlan(subjects, days);
      setPlan(generatedPlan);
    } catch (err) {
      setError('Failed to generate study plan. Please try again.');
      console.error('Study plan error:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearPlan = () => {
    setPlan(null);
    setError(null);
  };

  return { 
    plan, 
    loading, 
    error, 
    generatePlan, 
    clearPlan 
  };
};