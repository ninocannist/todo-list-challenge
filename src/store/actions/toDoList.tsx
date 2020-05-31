import * as actionTypes from './actionTypes';
import { Dispatch, Action } from 'redux';
import axios from 'axios';

const DB_URL =
  process.env.DB_URL || 'https://murmuring-cove-53176.herokuapp.com';

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
  actions: [];
}

interface FullAction {
  id: number;
  action: {
    [key: string]: any;
  };
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
      .patch(DB_URL + '/tasks/', {
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

export const addTaskToState = (fullAction: FullAction) => {
  return {
    type: actionTypes.ADD_TASK,
    fullAction: fullAction,
  };
};

export const addTask = (taskToAdd: NewTask) => {
  return (dispatch: Dispatch) => {
    axios
      .post(DB_URL + '/tasks/', taskToAdd)
      .then((response: any) => {
        const taskAdded = response.data;
        const actionPerformed = {
          type: actionTypes.ADD_TASK,
          task: taskAdded,
        };
        axios
          .post(DB_URL + '/actions/', {
            action: actionPerformed,
          })

          .then((response: any) => {
            const fullAction = response.data;
            dispatch(addTaskToState(fullAction));
          })
          .catch((error: any) => {
            dispatch(resetListFailed());
          });
      })
      .catch((error: any) => {
        dispatch(resetListFailed());
      });
  };
};

export const updateTaskToState = (fullAction: FullAction) => {
  return {
    type: actionTypes.UPDATE_TASK,
    fullAction: fullAction,
  };
};

export const updateTask = (taskToUpdate: Task) => {
  return (dispatch: Dispatch) => {
    const actionPerformed = {
      type: actionTypes.UPDATE_TASK,
      task: taskToUpdate,
    };
    axios
      .post(DB_URL + '/actions/', {
        action: actionPerformed,
      })
      .then((response: any) => {
        const fullAction = response.data;
        axios
          .patch(
            DB_URL + '/tasks/' + fullAction.action.task.id,
            fullAction.action.task
          )
          .then((response: any) => {
            dispatch(updateTaskToState(fullAction));
          })
          .catch((error: any) => {
            dispatch(resetListFailed());
          });
      })
      .catch((error: any) => {
        dispatch(resetListFailed());
      });
  };
};

export const deleteTaskFromState = (fullAction: FullAction) => {
  return {
    type: actionTypes.DELETE_TASK,
    fullAction: fullAction,
  };
};

export const deleteTaskFromStateWithoutLogging = (actionPerformed: Action) => {
  return {
    type: actionTypes.DELETE_TASK_WITHOUT_LOGGING,
    actionPerformed: actionPerformed,
  };
};

export const deleteTask = (taskId: number) => {
  return (dispatch: Dispatch) => {
    const actionPerformed = {
      type: actionTypes.DELETE_TASK,
      taskId: taskId,
    };
    axios
      .post(DB_URL + '/actions/', {
        action: actionPerformed,
      })
      .then((response: any) => {
        const fullAction = response.data;
        axios
          .delete(DB_URL + '/tasks/' + fullAction.action.taskId)
          .then(() => {
            dispatch(deleteTaskFromState(fullAction));
          })
          .catch((error: any) => {
            dispatch(resetListFailed());
          });
      })
      .catch((error: any) => {
        dispatch(resetListFailed());
      });
  };
};

export const deleteTaskWithoutLogging = (taskId: number) => {
  return (dispatch: Dispatch) => {
    const actionPerformed = {
      type: actionTypes.DELETE_TASK_WITHOUT_LOGGING,
      taskId: taskId,
    };
    const fullAction = actionPerformed;
    axios
      .delete(DB_URL + '/tasks/' + fullAction.taskId)
      .then(() => {
        dispatch(deleteTaskFromStateWithoutLogging(actionPerformed));
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
      .patch(DB_URL + '/recording/', recordingState)
      .then((response: any) => {
        dispatch(startRecording(response.data));
      })
      .catch((error: any) => {
        dispatch(resetListFailed());
      });
  };
};

export const deleteActionFromState = (actionId: number) => {
  return {
    type: actionTypes.DELETE_ACTION,
    actionId: actionId,
  };
};

export const deleteAction = (actionId: number) => {
  return (dispatch: Dispatch) => {
    axios
      .delete(DB_URL + '/actions/' + actionId)
      .then((response: any) => {
        dispatch(deleteActionFromState(actionId));
      })
      .catch((error: any) => {
        dispatch(resetListFailed());
      });
  };
};

export const addFullTask = (task: Task) => {
  return (dispatch: Dispatch) => {
    axios
      .post(DB_URL + '/tasks/', task)
      .then((response: any) => {
        const taskAdded = response.data;
        const actionPerformed = {
          type: actionTypes.ADD_TASK,
          task: taskAdded,
        };
        axios
          .post(DB_URL + '/actions/', {
            action: actionPerformed,
          })

          .then((response: any) => {
            const fullAction = response.data;
            dispatch(addTaskToState(fullAction));
          })
          .catch((error: any) => {
            dispatch(resetListFailed());
          });
      })
      .catch((error: any) => {
        dispatch(resetListFailed());
      });
  };
};
