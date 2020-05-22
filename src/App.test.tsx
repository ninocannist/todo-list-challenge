import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('The scheleton is set up correctly', () => {
  test('renders learn react link', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/Hello from ciaone and builderi/i);
    expect(linkElement).toBeInTheDocument();
  });
});
