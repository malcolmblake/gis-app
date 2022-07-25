import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Show Map button', () => {
  render(<App />);
  const headerElement = screen.getByText(/Show Map/i);
  expect(headerElement).toBeInTheDocument();
});
