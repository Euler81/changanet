// tests/unit/App.test.jsx
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../../src/App';

test('renders main heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/¿Necesitas un profesional de confianza\?/i);
  expect(headingElement).toBeInTheDocument();
});