import { useState } from 'react';
import { sendChatMessage } from '../services/claudeAPI';

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (userMessage) => {
    if (!userMessage.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const apiMessages = messages.map(msg => ({ 
        role: msg.role, 
        content: msg.content 
      }));

      const response = await sendChatMessage(apiMessages, userMessage);
      
      setMessages(prev => [
        ...prev,
        { role: 'user', content: userMessage },
        { role: 'assistant', content: response }
      ]);
    } catch (err) {
      setError('Failed to send message. Please try again.');
      setMessages(prev => [
        ...prev,
        { role: 'user', content: userMessage },
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again!' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  return { 
    messages, 
    loading, 
    error, 
    sendMessage, 
    clearChat 
  };
};