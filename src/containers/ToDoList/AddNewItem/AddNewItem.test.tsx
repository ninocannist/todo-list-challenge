import React from 'react';
import AddNewItem from './AddNewItem';
import { createStore } from 'redux';
import { render, fireEvent, screen } from '../../../shared/test-utils';

const setup = () => {
  const utils = render(<AddNewItem />);
  const input = utils.getByLabelText(
    'new-task-name-to-add'
  ) as HTMLInputElement;
  return {
    input,
    ...utils,
  };
};

describe('The scheleton is set up correctly', () => {
  test('Renders an input with placeholder "Buy groceries"', () => {
    const { getByPlaceholderText } = render(<AddNewItem />);
    const NewTaskToAdd = getByPlaceholderText(/Buy groceries/i);

    expect(NewTaskToAdd).toBeInTheDocument();
  });

  test('Renders a button with "Add Task +', () => {
    const { getByText } = render(<AddNewItem />);
    const AddTaskButton = getByText(/Add Task +/i);
    expect(AddTaskButton).toBeInTheDocument();
  });

  test('Writing in the input Name renders the right text', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: '23' } });
    expect(input.value).toBe('23');
  });
});
