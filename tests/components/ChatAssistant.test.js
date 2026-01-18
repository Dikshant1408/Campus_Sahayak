import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChatAssistant from '../../src/components/ChatAssistant';

describe('ChatAssistant', () => {
  test('renders chat interface', () => {
    render(<ChatAssistant />);
    expect(screen.getByPlaceholderText(/ask me anything/i)).toBeInTheDocument();
  });

  test('displays welcome message', () => {
    render(<ChatAssistant />);
    expect(screen.getByText(/Hello! I'm your Campus Sahayak/i)).toBeInTheDocument();
  });

  test('sends message on button click', async () => {
    render(<ChatAssistant />);
    
    const input = screen.getByPlaceholderText(/ask me anything/i);
    const sendButton = screen.getByRole('button', { name: /send/i });
    
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);
    
    await waitFor(() => {
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });
  });

  test('sends message on Enter key', async () => {
    render(<ChatAssistant />);
    
    const input = screen.getByPlaceholderText(/ask me anything/i);
    
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 13 });
    
    await waitFor(() => {
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });
  });

  test('clears input after sending', async () => {
    render(<ChatAssistant />);
    
    const input = screen.getByPlaceholderText(/ask me anything/i);
    const sendButton = screen.getByRole('button', { name: /send/i });
    
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);
    
    await waitFor(() => {
      expect(input.value).toBe('');
    });
  });
});