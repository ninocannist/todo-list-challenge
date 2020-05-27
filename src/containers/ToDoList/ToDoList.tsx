import React from 'react';
import styled from '@emotion/styled';
import AddNewItem from './AddNewItem/AddNewItem';
import TaskList from './TaskList/TaskList';

const List = styled.div`
  padding: 10px 20px;
  border-radius: 20px;
`;

function ToDoList() {
  return (
    <List>
      <AddNewItem />
      <TaskList />
    </List>
  );
}

export default ToDoList;
