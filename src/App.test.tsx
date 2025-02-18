import React from 'react';
import { getByPlaceholderText } from '@testing-library/react';
import { render } from './shared/test-utils';
import App from './App';

describe('The scheleton is set up correctly', () => {
  test('renders learn react link', () => {
    const { getByText, getByPlaceholderText } = render(<App />);

    const newTaskName = getByPlaceholderText(/Buy groceries/i);
    const newTaskDescription = getByPlaceholderText(/Milk, honey, pasta/i);
    expect(newTaskName).toBeInTheDocument();
    expect(newTaskDescription).toBeInTheDocument();

    const play = getByText(/Play/i);
    const reset = getByText(/Reset/i);
    const record = getByText(/Record/i);
    expect(play).toBeInTheDocument();
    expect(reset).toBeInTheDocument();
    expect(record).toBeInTheDocument();
  });
});
