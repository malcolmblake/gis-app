import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Show Map button', () => {
    render([<App />]);
    await waitFor(() => screen.getByRole('button'))


  const headerElement = screen.getByText(/Show Map/i);
  expect(headerElement).toBeInTheDocument();
})
