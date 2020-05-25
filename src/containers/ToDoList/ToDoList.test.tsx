import React from 'react';
import { render } from '../../shared/test-utils';
import ToDoList from './ToDoList';

describe('The scheleton is set up correctly', () => {
  test('renders learn react link', () => {
    const { getByText, getByPlaceholderText } = render(<ToDoList />);
    const newTaskName = getByPlaceholderText(/Buy groceries/i);
    const newTaskDescription = getByPlaceholderText(/Milk, honey, pasta/i);
    expect(newTaskName).toBeInTheDocument();
    expect(newTaskDescription).toBeInTheDocument();

    const listOfItems = getByText(/List of items/i);
    expect(listOfItems).toBeInTheDocument();
  });
});
