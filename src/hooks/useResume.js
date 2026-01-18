import { useState } from "react";
import { getResumeScore } from "../services/resumeAnalyzer";

export const useResume = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Analyze resume text
   */
  const analyzeResume = async (resumeText) => {
    if (!resumeText || resumeText.trim().length < 50) {
      setError("Please upload a valid resume file");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await getResumeScore(resumeText);
      setAnalysis(result);
    } catch (err) {
      setError("Failed to analyze resume. Please try again.");
      console.error("Resume analysis error:", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Clear analysis
   */
  const clearAnalysis = () => {
    setAnalysis(null);
    setError(null);
  };

  return {
    analysis,
    loading,
    error,
    analyzeResume,
    clearAnalysis
  };
};
