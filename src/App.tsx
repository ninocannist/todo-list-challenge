import React from 'react';
import ToDoList from './containers/ToDoList/ToDoList';
import RecordMenu from './containers/RecordMenu/RecordMenu';
//import '@csstools/normalize.css';
import styled from '@emotion/styled';

const AppBody = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 120px;
`;

export default function App() {
  return (
    <AppBody>
      <ToDoList />
      <RecordMenu />
    </AppBody>
  );
}
