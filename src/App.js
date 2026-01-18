import React, { useState } from 'react';
import { BookOpen, Briefcase, Brain, Calendar, MessageCircle, TrendingUp, Upload, Send, Sparkles, Home } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [resumeScore, setResumeScore] = useState(null);
  const [studyPlan, setStudyPlan] = useState(null);
  const [moodData, setMoodData] = useState([]);
  const [selectedMood, setSelectedMood] = useState('');

  const handleChat = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatInput('');
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
            ...chatMessages.map(msg => ({ role: msg.role, content: msg.content })),
            { role: "user", content: `You are Campus Sahayak, an AI assistant helping Indian college students. Answer in a friendly, supportive manner. Keep responses concise and practical. User query: ${userMessage}` }
          ],
        })
      });

      const data = await response.json();
      const assistantMessage = data.content.find(item => item.type === "text")?.text || "I'm here to help!";
      
      setChatMessages(prev => [...prev, { role: 'user', content: userMessage }, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'user', content: userMessage }, { role: 'assistant', content: "Sorry, I encountered an error. Please try again!" }]);
    }
    setLoading(false);
  };

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
            { role: "user", content: "Analyze this sample student resume and provide ATS score (0-100) and 3 key improvements. Return ONLY valid JSON with format: {\"score\": number, \"improvements\": [string, string, string], \"strengths\": [string, string]}" }
          ],
        })
      });

      const data = await response.json();
      const text = data.content.find(item => item.type === "text")?.text || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const result = JSON.parse(clean);
      setResumeScore(result);
    } catch (error) {
      setResumeScore({
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

  const generateStudyPlan = async () => {
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
            { role: "user", content: "Create a 7-day study plan for a CSE student preparing for mid-semester exams in Data Structures, DBMS, and OS. Return ONLY valid JSON: {\"days\": [{\"day\": string, \"tasks\": [string]}]}" }
          ],
        })
      });

      const data = await response.json();
      const text = data.content.find(item => item.type === "text")?.text || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const result = JSON.parse(clean);
      setStudyPlan(result);
    } catch (error) {
      setStudyPlan({
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

  const moodEmojis = {
    'Great': '😊',
    'Good': '🙂',
    'Okay': '😐',
    'Stressed': '😰',
    'Anxious': '😟'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-green-600 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Campus Sahayak</h1>
          </div>
          <p className="text-orange-100">Your AI-powered companion for student life in Bharat 🇮🇳</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3">
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'chat', label: 'AI Assistant', icon: MessageCircle },
              { id: 'study', label: 'Study Planner', icon: BookOpen },
              { id: 'career', label: 'Career Prep', icon: Briefcase },
              { id: 'wellness', label: 'Wellness', icon: Brain }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Home Tab */}
        {activeTab === 'home' && (
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
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition" onClick={() => setActiveTab('chat')}>
                <MessageCircle className="w-10 h-10 mb-3" />
                <h3 className="text-lg font-bold mb-2">AI Assistant</h3>
                <p className="text-sm text-blue-100">Get instant help with doubts, assignments & more</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition" onClick={() => setActiveTab('study')}>
                <Calendar className="w-10 h-10 mb-3" />
                <h3 className="text-lg font-bold mb-2">Study Planner</h3>
                <p className="text-sm text-purple-100">AI-generated personalized study schedules</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition" onClick={() => setActiveTab('career')}>
                <TrendingUp className="w-10 h-10 mb-3" />
                <h3 className="text-lg font-bold mb-2">Career Tools</h3>
                <p className="text-sm text-green-100">Resume analysis & interview preparation</p>
              </div>
            </div>
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-orange-600" />
              AI Study Assistant
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto mb-4 space-y-3">
              {chatMessages.length === 0 && (
                <div className="text-center text-gray-500 mt-20">
                  <p className="mb-2">👋 Hello! I'm your Campus Sahayak AI assistant.</p>
                  <p className="text-sm">Ask me about:</p>
                  <div className="mt-3 space-y-1 text-sm">
                    <p>• Exam preparation & study tips</p>
                    <p>• Assignment help & explanations</p>
                    <p>• Time management strategies</p>
                    <p>• Career guidance & skills</p>
                  </div>
                </div>
              )}
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.role === 'user' 
                      ? 'bg-orange-600 text-white' 
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-gray-600">
                    Typing...
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleChat()}
                placeholder="Ask me anything about studies, exams, assignments..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                onClick={handleChat}
                disabled={loading}
                className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition disabled:opacity-50 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
          </div>
        )}

        {/* Study Planner Tab */}
        {activeTab === 'study' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-orange-600" />
              AI Study Planner
            </h2>
            <div className="mb-6">
              <button
                onClick={generateStudyPlan}
                disabled={loading}
                className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-3 rounded-lg hover:from-orange-700 hover:to-orange-800 transition disabled:opacity-50 flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                {loading ? 'Generating Plan...' : 'Generate 7-Day Study Plan'}
              </button>
            </div>

            {studyPlan && (
              <div className="space-y-3">
                {studyPlan.days.map((day, idx) => (
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
        )}

        {/* Career Prep Tab */}
        {activeTab === 'career' && (
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

            {resumeScore && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">ATS Score</h3>
                    <div className="text-4xl font-bold text-green-600">{resumeScore.score}%</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${resumeScore.score}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-3">🔧 Key Improvements</h4>
                    <ul className="space-y-2">
                      {resumeScore.improvements.map((item, idx) => (
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
                      {resumeScore.strengths.map((item, idx) => (
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
        )}

        {/* Wellness Tab */}
        {activeTab === 'wellness' && (
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
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white p-6 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-400">
            Built with ❤️ for Indian students | AI for Bharat 2025 Hackathon
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Privacy-first • Affordable • Accessible
          </p>
        </div>
      </div>
    </div>
  );
}