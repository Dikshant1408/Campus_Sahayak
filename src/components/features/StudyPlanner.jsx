import React, { useState } from 'react';
import { BookOpen, Sparkles } from 'lucide-react';

const StudyPlanner = () => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
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
              content: "Create a 7-day study plan for a CSE student preparing for mid-semester exams in Data Structures, DBMS, and OS. Return ONLY valid JSON: {\"days\": [{\"day\": string, \"tasks\": [string]}]}" 
            }
          ],
        })
      });

      const data = await response.json();
      const text = data.content.find(item => item.type === "text")?.text || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const result = JSON.parse(clean);
      setPlan(result);
    } catch (error) {
      setPlan({
        days: [
          { day: "Monday", tasks: ["Data Structures: Arrays & Linked Lists (3 hrs)", "Practice 10 coding problems", "Review class notes"] },
          { day: "Tuesday", tasks: ["DBMS: Normalization & ER Diagrams (2.5 hrs)", "Solve previous year questions", "Make revision notes"] },
          { day: "Wednesday", tasks: ["OS: Process Management (3 hrs)", "Practice numerical problems", "Watch tutorial videos"] },
          { day: "Thursday", tasks: ["Data Structures: Trees & Graphs (3 hrs)", "Implement key algorithms", "Group study session"] },
          { day: "Friday", tasks: ["DBMS: SQL queries & transactions (2.5 hrs)", "Mock test practice", "Review weak areas"] },
          { day: "Saturday", tasks: ["OS: Memory & Deadlock (2 hrs)", "Full syllabus revision", "Take practice test"] },
          { day: "Sunday", tasks: ["Light revision of all subjects", "Solve doubt clearance", "Early sleep before exam"] }
        ]
      });
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-orange-600" />
        AI Study Planner
      </h2>
      
      <div className="mb-6">
        <button
          onClick={generatePlan}
          disabled={loading}
          className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-3 rounded-lg hover:from-orange-700 hover:to-orange-800 transition disabled:opacity-50 flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          {loading ? 'Generating Plan...' : 'Generate 7-Day Study Plan'}
        </button>
      </div>

      {plan && (
        <div className="space-y-3">
          {plan.days.map((day, idx) => (
            <div key={idx} className="bg-gradient-to-r from-orange-50 to-green-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-bold text-orange-800 mb-2">{day.day}</h3>
              <ul className="space-y-1">
                {day.tasks.map((task, taskIdx) => (
                  <li key={taskIdx} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudyPlanner;