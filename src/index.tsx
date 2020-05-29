import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import toDoListReducer from './store/reducers/toDoList';
import thunk from 'redux-thunk';
import axios from 'axios';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = toDoListReducer;

axios
  .get('http://localhost:3000/db/')
  .then((res) => {
    console.log('datas: ', res.data);
    const store = createStore(
      rootReducer,
      {
        toDoList: { toDoList: res.data.tasks },
        recording: res.data.recording,
        recorded_actions: res.data.recorded_actions,
      },
      composeEnhancers(applyMiddleware(thunk))
    );

    const app = (
      <Provider store={store}>
        <App />
      </Provider>
    );

    ReactDOM.render(app, document.getElementById('root'));
  })
  .catch((err) => {
    const store = createStore(
      rootReducer,
      {},
      composeEnhancers(applyMiddleware(thunk))
    );

    const app = (
      <Provider store={store}>
        <App />
      </Provider>
    );

    ReactDOM.render(app, document.getElementById('root'));
  });
