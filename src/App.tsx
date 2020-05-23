import React from 'react';
import ToDoList from './containers/ToDoList/ToDoList';
import RecordMenu from './containers/RecordMenu/RecordMenu';

export default function App() {
  return (
    <div>
      <ToDoList />
      <RecordMenu />
    </div>
  );
}
