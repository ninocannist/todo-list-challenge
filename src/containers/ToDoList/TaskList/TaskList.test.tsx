import React from 'react';
import { render } from '@testing-library/react';
import TaskList from './TaskList';

describe('The scheleton is set up correctly', () => {
  test('renders learn react link', () => {
    const { getByText } = render(<TaskList />);
    const listOfTasks = getByText(/List of tasks/i);
    expect(listOfTasks).toBeInTheDocument();
  });
});
