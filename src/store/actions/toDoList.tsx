import * as actionTypes from './actionTypes';
import { Dispatch } from 'redux';
import axios from 'axios';

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

export const resetList = () => {
  return {
    type: actionTypes.RESET_LIST,
  };
};

export const resetListFailed = () => {
  return {
    type: actionTypes.RESET_LIST_FAILED,
  };
};

export const initList = () => {
  return (dispatch: Dispatch) => {
    axios
      .patch('http://localhost:3000/current_state/', {
        toDoList: { toDoList: {} },
      })
      .then((response: any) => {
        dispatch(resetList());
      })
      .catch((error: any) => {
        dispatch(resetListFailed());
      });
  };
};
