import * as actionTypes from './actionTypes';

export const addTask = (taskToAdd) => {
  return {
    type: actionTypes.ADD_TASK,
    task: taskToAdd,
  };
};
