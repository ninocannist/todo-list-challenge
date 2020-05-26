import React from 'react';
import { render, getByText } from '../../../shared/test-utils';
import TaskList from './TaskList';
import { createStore, combineReducers } from 'redux';
import toDoListReducer from '../../../store/reducers/toDoList';

const rootReducer = combineReducers({
  toDoList: toDoListReducer,
});

describe('The scheleton is set up correctly', () => {
  test('renders learn react link', () => {
    const store = createStore(rootReducer, {
      toDoList: [
        {
          ID: 'asdf',
          name: 'ciaone',
          description: 'verde',
          created: 1590437064156,
        },
      ],
    });
    const { getByText } = render(<TaskList />);
    const listOfTasks = getByText(/List of tasks/i);
    expect(listOfTasks).toBeInTheDocument();
  });
});
