import React from 'react';
import ToDoList from './containers/ToDoList/ToDoList';
import RecordMenu from './containers/RecordMenu/RecordMenu';
//import '@csstools/normalize.css';
import styled from '@emotion/styled';
import './App.css';

const AppBody = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-areas:
    'record'
    'addnew'
    'list';
  @media (min-width: 768px) {
    grid-template-columns: 50% 50%;
    grid-template-rows: 120px 1fr;
    grid-template-areas:
      'list record'
      'list addnew';
  }
`;

export default function App() {
  return (
    <AppBody>
      <RecordMenu />
      <ToDoList />
    </AppBody>
  );
}
