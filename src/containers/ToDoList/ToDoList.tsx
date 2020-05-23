import React from 'react';
import styled from '@emotion/styled';

const List = styled.div`
  background-color: orange;
  padding: 10px 20px;
  color: white;
  border-radius: 20px;
`;

function ToDoList() {
  return (
    <List>
      <div>Add new item</div>
      <div>List of items</div>
    </List>
  );
}

export default ToDoList;
