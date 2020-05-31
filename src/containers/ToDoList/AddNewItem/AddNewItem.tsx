import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { Dispatch } from 'redux';
import styled from '@emotion/styled';

interface IState {
  [key: string]: any;
  newTaskToAddName: string;
  newTaskToAddDescription: string;
}

interface IProps {
  onTaskAdded: (task: NewTask) => void;
}

interface NewTask {
  name: string;
  description: string;
  created: number;
}

const Box = styled.div`
  grid-area: addnew;
  padding: 10px 20px;
  @media (min-width: 768px) {
    padding: 10px;
  }
`;

const Form = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
`;

const Label = styled.label`
  display: inline-block;
  margin: 9px 0px;
  font-size: 15px;
  width: 100%;
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  font-size: 17px;
  border: 0px;
  border-bottom: 1px solid #cfcfcf;
`;

const Button = styled.button`
  margin: 5px 0px;
  padding: 10px 15px;
  background-color: #277fff;
  border: 1px solid #277fff;
  border-radius: 9px;
  color: white;
  font-size: 16px;
  text-transform: uppercase;
  &:active {
    vertical-align: top;
    padding: 11px 15px 9px;
  }
`;

class AddNewItem extends Component<IProps, IState> {
  state: IState = {
    newTaskToAddName: '',
    newTaskToAddDescription: '',
  };

  updateNewTaskName = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    this.setState({ newTaskToAddName: event.currentTarget.value });
  };

  updateNewTaskDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    this.setState({ newTaskToAddDescription: event.currentTarget.value });
  };

  generateTask: () => void = () => {
    const taskObject = {
      name: this.state.newTaskToAddName,
      description: this.state.newTaskToAddDescription,
      created: Date.now(),
    };

    this.props.onTaskAdded(taskObject);
  };

  render() {
    return (
      <Box>
        <h3>Create New Task</h3>
        <Form>
          <Label>
            Name
            <Input
              placeholder='Buy groceries'
              value={this.state.newTaskToAddName}
              onChange={this.updateNewTaskName}
              type='text'
              aria-label='new-task-name-to-add'
              aria-required='true'
              name='Task Name'
              autoComplete='off'
            />
          </Label>
          <Label>
            Description
            <Input
              placeholder='Milk, honey, pasta'
              value={this.state.newTaskToAddDescription}
              onChange={this.updateNewTaskDescription}
              type='text'
              aria-label='new-task-description-to-add'
              aria-required='true'
              name='Task Description'
              autoComplete='off'
            />
          </Label>
          <Button onClick={this.generateTask}>Add Task +</Button>
        </Form>
      </Box>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onTaskAdded: (task: NewTask) => dispatch<any>(actions.addTask(task)),
  };
};

export default connect(null, mapDispatchToProps)(AddNewItem);
