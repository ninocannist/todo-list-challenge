import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

export const initialState: IState = {
  toDoList: [],
};

interface IState {
  [key: string]: any;
}

interface IAction {
  type: string;
  [key: string]: any;
}

const addTask = (state: IState, action: IAction) => {
  return updateObject(state, {
    toDoList: {
      toDoList: [...state.toDoList.toDoList, action.fullAction.action.task],
    },
    actions: [...state.actions, action.fullAction],
  });
};

const updateTask = (state: IState, action: IAction) => {
  const tasksList = state.toDoList.toDoList;
  const indexOfToEdit = tasksList
    .map((e: { [key: string]: any }) => e.id)
    .indexOf(action.fullAction.action.task.id);
  const tasksBefore = tasksList.slice(0, indexOfToEdit);
  const tasksAfter = tasksList.slice(indexOfToEdit + 1, tasksList.length);
  const updatedTasksList = [
    ...tasksBefore,
    action.fullAction.action.task,
    ...tasksAfter,
  ];
  return updateObject(state, {
    toDoList: { toDoList: updatedTasksList },
    actions: [...state.actions, action.fullAction],
  });
};

const deleteTask = (state: IState, action: IAction) => {
  const tasksList = state.toDoList.toDoList;
  const indexOfToEdit = tasksList
    .map((e: { [key: string]: any }) => e.id)
    .indexOf(action.fullAction.action.taskId);
  const tasksBefore = tasksList.slice(0, indexOfToEdit);
  const tasksAfter = tasksList.slice(indexOfToEdit + 1, tasksList.length);
  const updatedTasksList = [...tasksBefore, ...tasksAfter];
  return updateObject(state, {
    toDoList: { toDoList: updatedTasksList },
    actions: [...state.actions, action.fullAction],
  });
};

const deleteTaskWithoutLogging = (state: IState, action: IAction) => {
  const tasksList = state.toDoList.toDoList;
  const indexOfToEdit = tasksList
    .map((e: { [key: string]: any }) => e.id)
    .indexOf(action.actionPerformed.taskId);
  const tasksBefore = tasksList.slice(0, indexOfToEdit);
  const tasksAfter = tasksList.slice(indexOfToEdit + 1, tasksList.length);
  const updatedTasksList = [...tasksBefore, ...tasksAfter];
  return updateObject(state, {
    toDoList: { toDoList: updatedTasksList },
  });
};

const startRecord = (state: IState, action: IAction) => {
  return updateObject(state, {
    recording: action.recordingState,
  });
};

const resetList = (state: IState, action: IAction) => {
  return updateObject(state, { toDoList: [] });
};

const resetListFailed = (state: IState, action: IAction) => {
  return updateObject(state, { error: true });
};

const deleteAction = (state: IState, action: IAction) => {
  const actionList = state.actions;
  const indexOfToEdit = actionList
    .map((e: { [key: string]: any }) => e.id)
    .indexOf(action.actionId);
  const tasksBefore = actionList.slice(0, indexOfToEdit);
  const tasksAfter = actionList.slice(indexOfToEdit + 1, actionList.length);
  const updatedTasksList = [...tasksBefore, ...tasksAfter];
  return updateObject(state, {
    actions: updatedTasksList,
  });
};

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case actionTypes.ADD_TASK:
      return addTask(state, action);
    case actionTypes.UPDATE_TASK:
      return updateTask(state, action);
    case actionTypes.DELETE_TASK:
      return deleteTask(state, action);
    case actionTypes.RESET_LIST:
      return resetList(state, action);
    case actionTypes.RESET_LIST_FAILED:
      return resetListFailed(state, action);
    case actionTypes.RECORD:
      return startRecord(state, action);
    case actionTypes.DELETE_ACTION:
      return deleteAction(state, action);
    case actionTypes.DELETE_TASK_WITHOUT_LOGGING:
      return deleteTaskWithoutLogging(state, action);
    default:
      return state;
  }
};

export default reducer;
