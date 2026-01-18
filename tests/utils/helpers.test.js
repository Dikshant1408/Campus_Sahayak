import { 
  formatDate, 
  getTimeOfDay, 
  getGreeting, 
  truncateText,
  calculateDaysUntil,
  generateId
} from '../../src/utils/helpers';

describe('Helper Functions', () => {
  describe('formatDate', () => {
    test('formats date correctly', () => {
      const date = new Date('2025-01-17');
      const formatted = formatDate(date);
      expect(formatted).toContain('2025');
    });
  });

  describe('getTimeOfDay', () => {
    test('returns correct time of day', () => {
      const timeOfDay = getTimeOfDay();
      expect(['morning', 'afternoon', 'evening', 'night']).toContain(timeOfDay);
    });
  });

  describe('getGreeting', () => {
    test('returns a greeting', () => {
      const greeting = getGreeting();
      expect(greeting).toMatch(/Good (morning|afternoon|evening|night)/);
    });
  });

  describe('truncateText', () => {
    test('truncates long text', () => {
      const longText = 'This is a very long text that needs to be truncated';
      const truncated = truncateText(longText, 20);
      expect(truncated.length).toBeLessThanOrEqual(23); // 20 + '...'
    });

    test('does not truncate short text', () => {
      const shortText = 'Short';
      const result = truncateText(shortText, 20);
      expect(result).toBe('Short');
    });
  });

  describe('calculateDaysUntil', () => {
    test('calculates days correctly', () => {
      const future = new Date();
      future.setDate(future.getDate() + 5);
      const days = calculateDaysUntil(future);
      expect(days).toBeGreaterThanOrEqual(4);
      expect(days).toBeLessThanOrEqual(6);
    });
  });

  describe('generateId', () => {
    test('generates unique ID', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });

    test('generates string ID', () => {
      const id = generateId();
      expect(typeof id).toBe('string');
    });
  });
});