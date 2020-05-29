import * as actionTypes from './actionTypes';
import { Dispatch } from 'redux';
import axios from 'axios';

interface Task {
  id: number;
  name: string;
  description: string;
  created: number;
}

interface NewTask {
  name: string;
  description: string;
  created: number;
}

interface Recording {
  value: number;
  initial_state: [];
}

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
      .patch('http://localhost:3000/tasks/', {
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

export const addTaskToState = (taskToAdd: NewTask) => {
  return {
    type: actionTypes.ADD_TASK,
    task: taskToAdd,
  };
};

export const addTask = (taskToAdd: NewTask) => {
  return (dispatch: Dispatch) => {
    axios
      .post('http://localhost:3000/tasks/', taskToAdd)
      .then((response: any) => {
        dispatch(addTaskToState(response.data));
      })
      .catch((error: any) => {
        dispatch(resetListFailed());
      });
  };
};

export const updateTaskToState = (taskToUpdate: Task) => {
  return {
    type: actionTypes.UPDATE_TASK,
    task: taskToUpdate,
  };
};

export const updateTask = (taskToUpdate: Task) => {
  return (dispatch: Dispatch) => {
    axios
      .patch('http://localhost:3000/tasks/' + taskToUpdate.id, taskToUpdate)
      .then((response: any) => {
        dispatch(updateTaskToState(response.data));
      })
      .catch((error: any) => {
        dispatch(resetListFailed());
      });
  };
};

export const deleteTaskFromState = (taskId: number) => {
  return {
    type: actionTypes.DELETE_TASK,
    taskId: taskId,
  };
};

export const deleteTask = (taskId: number) => {
  return (dispatch: Dispatch) => {
    axios
      .delete('http://localhost:3000/tasks/' + taskId)
      .then((response: any) => {
        dispatch(deleteTaskFromState(taskId));
      })
      .catch((error: any) => {
        dispatch(resetListFailed());
      });
  };
};

export const startRecording = (recordingState: Recording) => {
  return {
    type: actionTypes.RECORD,
    recordingState: recordingState,
  };
};

export const record = (recordingState: Recording) => {
  return (dispatch: Dispatch) => {
    axios
      .patch('http://localhost:3000/recording/', recordingState)
      .then((response: any) => {
        dispatch(startRecording(response.data));
      })
      .catch((error: any) => {
        dispatch(resetListFailed());
      });
  };
};
