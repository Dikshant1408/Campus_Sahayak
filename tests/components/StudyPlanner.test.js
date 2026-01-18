import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StudyPlanner from '../../src/components/StudyPlanner';

describe('StudyPlanner', () => {
  test('renders study planner', () => {
    render(<StudyPlanner />);
    expect(screen.getByText(/AI Study Planner/i)).toBeInTheDocument();
  });

  test('shows generate button', () => {
    render(<StudyPlanner />);
    expect(screen.getByRole('button', { name: /generate/i })).toBeInTheDocument();
  });

  test('generates study plan on click', async () => {
    render(<StudyPlanner />);
    
    const generateButton = screen.getByRole('button', { name: /generate/i });
    fireEvent.click(generateButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Monday/i)).toBeInTheDocument();
    });
  });

  test('displays all 7 days', async () => {
    render(<StudyPlanner />);
    
    const generateButton = screen.getByRole('button', { name: /generate/i });
    fireEvent.click(generateButton);
    
    await waitFor(() => {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      days.forEach(day => {
        expect(screen.getByText(day)).toBeInTheDocument();
      });
    });
  });

  test('shows loading state', () => {
    render(<StudyPlanner />);
    
    const generateButton = screen.getByRole('button', { name: /generate/i });
    fireEvent.click(generateButton);
    
    expect(screen.getByText(/generating/i)).toBeInTheDocument();
  });
});