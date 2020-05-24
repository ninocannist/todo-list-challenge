import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  toDoList: [],
};

const addTask = (state, action) => {
  return updateObject(state, { toDoList: [...state.toDoList, action.task] });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TASK:
      return addTask(state, action);
    default:
      return state;
  }
};

export default reducer;
