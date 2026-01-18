import { sendChatMessage, analyzeResume, generateStudyPlan } from '../../src/services/claudeAPI';

// Mock fetch
global.fetch = jest.fn();

describe('Claude API Service', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('sendChatMessage', () => {
    test('sends message and returns response', async () => {
      const mockResponse = {
        content: [{ type: 'text', text: 'Hello!' }]
      };
      
      fetch.mockResolvedValueOnce({
        json: async () => mockResponse
      });
      
      const result = await sendChatMessage([], 'Hi');
      expect(result).toBe('Hello!');
    });

    test('handles API errors', async () => {
      fetch.mockRejectedValueOnce(new Error('API Error'));
      
      await expect(sendChatMessage([], 'Hi')).rejects.toThrow('API Error');
    });
  });

  describe('analyzeResume', () => {
    test('returns resume analysis', async () => {
      const mockResponse = {
        content: [{ 
          type: 'text', 
          text: '{"score": 75, "improvements": [], "strengths": []}' 
        }]
      };
      
      fetch.mockResolvedValueOnce({
        json: async () => mockResponse
      });
      
      const result = await analyzeResume();
      expect(result.score).toBe(75);
    });
  });

  describe('generateStudyPlan', () => {
    test('generates study plan', async () => {
      const mockResponse = {
        content: [{ 
          type: 'text', 
          text: '{"days": [{"day": "Monday", "tasks": ["Task 1"]}]}' 
        }]
      };
      
      fetch.mockResolvedValueOnce({
        json: async () => mockResponse
      });
      
      const result = await generateStudyPlan();
      expect(result.days).toHaveLength(1);
    });
  });
});