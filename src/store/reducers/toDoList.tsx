import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

export const initialState = {
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
  return updateObject(state, { toDoList: [...state.toDoList, action.task] });
};

const updateTask = (state: IState, action: IAction) => {
  const indexOfToEdit = state.toDoList
    .map((e: { [key: string]: any }) => e.ID)
    .indexOf(action.task.ID);
  const tasksBefore = state.toDoList.slice(0, indexOfToEdit);
  const tasksAfter = state.toDoList.slice(
    indexOfToEdit + 1,
    state.toDoList.length
  );
  const updatedTasksList = [...tasksBefore, action.task, ...tasksAfter];
  return updateObject(state, { toDoList: updatedTasksList });
};

const deleteTask = (state: IState, action: IAction) => {
  const indexOfToEdit = state.toDoList
    .map((e: { [key: string]: any }) => e.ID)
    .indexOf(action.taskID);
  const tasksBefore = state.toDoList.slice(0, indexOfToEdit);
  const tasksAfter = state.toDoList.slice(
    indexOfToEdit + 1,
    state.toDoList.length
  );
  const updatedTasksList = [...tasksBefore, ...tasksAfter];
  return updateObject(state, { toDoList: updatedTasksList });
};

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case actionTypes.ADD_TASK:
      return addTask(state, action);
    case actionTypes.UPDATE_TASK:
      return updateTask(state, action);
    case actionTypes.DELETE_TASK:
      return deleteTask(state, action);
    default:
      return state;
  }
};

export default reducer;
