import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('The scheleton is set up correctly', () => {
  test('renders learn react link', () => {
    const { getByText } = render(<App />);

    const todoList = getByText(/Add new item/i);
    expect(todoList).toBeInTheDocument();

    const recordMenu = getByText(/Record Menu/i);
    expect(recordMenu).toBeInTheDocument();
  });
});
