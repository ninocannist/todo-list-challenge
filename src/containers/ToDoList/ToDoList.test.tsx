import React from 'react';
import { render } from '@testing-library/react';
import ToDoList from './ToDoList';

describe('The scheleton is set up correctly', () => {
  test('renders learn react link', () => {
    const { getByText } = render(<ToDoList />);
    const addNewItem = getByText(/Add new item/i);
    const listOfItems = getByText(/List of items/i);
    expect(addNewItem).toBeInTheDocument();
    expect(listOfItems).toBeInTheDocument();
  });
});
