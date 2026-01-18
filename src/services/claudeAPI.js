const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-20250514";

export const sendChatMessage = async (messages, userQuery) => {
  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1000,
        messages: [
          ...messages,
          { 
            role: "user", 
            content: `You are Campus Sahayak, an AI assistant for Indian college students. Answer in a friendly, supportive manner. Keep responses concise and practical. User query: ${userQuery}` 
          }
        ],
      })
    });

    const data = await response.json();
    return data.content.find(item => item.type === "text")?.text || "I'm here to help!";
  } catch (error) {
    console.error("Claude API Error:", error);
    throw error;
  }
};

export const analyzeResume = async () => {
  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
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
    return JSON.parse(clean);
  } catch (error) {
    console.error("Resume Analysis Error:", error);
    throw error;
  }
};

export const generateStudyPlan = async (subjects = "Data Structures, DBMS, OS", days = 7) => {
  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1000,
        messages: [
          { 
            role: "user", 
            content: `Create a ${days}-day study plan for a CSE student preparing for mid-semester exams in ${subjects}. Return ONLY valid JSON: {"days": [{"day": string, "tasks": [string]}]}` 
          }
        ],
      })
    });

    const data = await response.json();
    const text = data.content.find(item => item.type === "text")?.text || "";
    const clean = text.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch (error) {
    console.error("Study Plan Generation Error:", error);
    throw error;
  }
};