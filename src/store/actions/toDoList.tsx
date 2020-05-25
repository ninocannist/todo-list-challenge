import * as actionTypes from './actionTypes';

interface Task {
  ID: string;
  name: string;
  description: string;
  created: number;
}

export const addTask = (taskToAdd: Task) => {
  return {
    type: actionTypes.ADD_TASK,
    task: taskToAdd,
  };
};

export const updateTask = (taskToUpdate: Task) => {
  return {
    type: actionTypes.UPDATE_TASK,
    task: taskToUpdate,
  };
};

export const deleteTask = (taskID: string) => {
  return {
    type: actionTypes.DELETE_TASK,
    taskID: taskID,
  };
};
