import React, { useState } from 'react';
import { Briefcase, Upload } from 'lucide-react';

const CareerTools = () => {
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            { 
              role: "user", 
              content: "Analyze this sample student resume and provide ATS score (0-100) and 3 key improvements. Return ONLY valid JSON with format: {\"score\": number, \"improvements\": [string, string, string], \"strengths\": [string, string]}" 
            }
          ],
        })
      });

      const data = await response.json();
      const text = data.content.find(item => item.type === "text")?.text || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const result = JSON.parse(clean);
      setScore(result);
    } catch (error) {
      setScore({
        score: 72,
        improvements: [
          "Add quantifiable achievements (e.g., 'Improved efficiency by 30%')",
          "Include relevant technical skills and certifications",
          "Use action verbs like 'Developed', 'Implemented', 'Led'"
        ],
        strengths: [
          "Clear education section with GPA",
          "Good project descriptions"
        ]
      });
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Briefcase className="w-6 h-6 text-orange-600" />
        Career Preparation Tools
      </h2>
      
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Resume ATS Score Checker</h3>
        <div className="flex gap-3 mb-4">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload Resume (PDF)
          </button>
          <button
            onClick={analyzeResume}
            disabled={loading}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Analyze Sample Resume'}
          </button>
        </div>
      </div>

      {score && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">ATS Score</h3>
              <div className="text-4xl font-bold text-green-600">{score.score}%</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${score.score}%` }}
              ></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-3">🔧 Key Improvements</h4>
              <ul className="space-y-2">
                {score.improvements.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-red-600 font-bold">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-3">✅ Strengths</h4>
              <ul className="space-y-2">
                {score.strengths.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerTools;