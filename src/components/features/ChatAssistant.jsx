import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';

const ChatAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
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
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            { 
              role: "user", 
              content: `You are Campus Sahayak, an AI assistant helping Indian college students. Answer in a friendly, supportive manner. Keep responses concise and practical. User query: ${userMessage}` 
            }
          ],
        })
      });

      const data = await response.json();
      const assistantMessage = data.content.find(item => item.type === "text")?.text || "I'm here to help!";
      
      setMessages(prev => [...prev, { role: 'user', content: userMessage }, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'user', content: userMessage }, { role: 'assistant', content: "Sorry, I encountered an error. Please try again!" }]);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <MessageCircle className="w-6 h-6 text-orange-600" />
        AI Study Assistant
      </h2>
      
      <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto mb-4 space-y-3">
        {messages.length === 0 && (
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
        
        {messages.map((msg, idx) => (
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
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask me anything about studies, exams, assignments..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition disabled:opacity-50 flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatAssistant;