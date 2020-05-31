import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { Dispatch } from 'redux';
import styled from '@emotion/styled';
import moment from 'moment';

interface IState {
  [key: string]: any;
  editingTask: Task;
}

interface IProps {
  toDoList: { [key: string]: any };
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: number) => void;
}

interface Task {
  id: number;
  name: string;
  description: string;
  created: number;
}

const emptyTask = {
  id: 0,
  name: '',
  description: '',
  created: 0,
};

const List = styled.ul`
  padding: 0px;
  margin: 0px;
  list-style: none;
  width: 100%;
`;

const ListElement = styled.li`
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  margin: 15px 0px;
`;

const Label = styled.label`
  display: inline-block;
  font-size: 14px;
  width: 100%;
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  font-size: 17px;
  border: 0px;
  border-bottom: 1px solid #cfcfcf;
  &:read-only {
    border-bottom: 0px;
  }
`;

const Edit = styled.button`
  margin: 5px;
  padding: 6px 11px;
  border: 1px solid #277fff;
  border-radius: 6px;
  color: #277fff;
  background-color: white;
  font-size: 14px;
  text-transform: uppercase;
  &:active {
    vertical-align: top;
    padding: 7px 11px 5px;
  }
`;

const FullList = styled.div`
  grid-area: list;
  padding: 10px 20px;
`;

const Delete = styled.button`
  margin: 5px;
  padding: 6px 11px;
  background-color: white;
  border: 1px solid #ca0e00;
  border-radius: 6px;
  color: #ca0e00;
  font-size: 14px;
  text-transform: uppercase;
  &:active {
    vertical-align: top;
    padding: 7px 11px 5px;
  }
`;

const Actions = styled.div`
  border-top: 1px solid grey;
  margin-top: 10px;
  padding: 10px;
`;

class TaskList extends Component<IProps, IState> {
  state: IState = {
    editingTask: emptyTask,
  };
  componentDidMount() {}

  changeTaskName = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const newName = event.currentTarget.value;
    this.setState((oldState) => {
      return {
        ...oldState,
        editingTask: {
          id: oldState.editingTask.id,
          name: newName,
          description: oldState.editingTask.description,
          created: oldState.editingTask.created,
        },
      };
    });
  };

  changeTaskDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const newDescription = event.currentTarget.value;
    this.setState((oldState) => {
      return {
        ...oldState,
        editingTask: {
          id: oldState.editingTask.id,
          name: oldState.editingTask.name,
          description: newDescription,
          created: oldState.editingTask.created,
        },
      };
    });
  };

  editTask = (task: Task) => {
    this.setState({ editingTask: task });
  };

  updateTask = () => {
    this.props.onUpdateTask(this.state.editingTask);
    this.setState({ editingTask: emptyTask });
  };

  deleteTask = (taskId: number) => {
    this.props.onDeleteTask(taskId);
  };

  render() {
    return (
      <FullList>
        <h3>Tasks</h3>
        {'toDoList' in this.props.toDoList &&
        this.props.toDoList.toDoList.length > 0 ? (
          <List>
            {this.props.toDoList.toDoList
              .slice(0)
              .reverse()
              .map((task: Task) => (
                <ListElement key={task.id}>
                  <Label>
                    Name:
                    <Input
                      placeholder='Buy groceries'
                      value={
                        this.state.editingTask.id === task.id
                          ? this.state.editingTask.name
                          : task.name
                      }
                      onChange={this.changeTaskName}
                      type='text'
                      aria-label='new-task-name-to-add'
                      aria-required='true'
                      name='Task Name'
                      readOnly={this.state.editingTask.id !== task.id}
                    />
                  </Label>
                  <Label>
                    Description:
                    <Input
                      placeholder='Milk, honey, pasta'
                      value={
                        this.state.editingTask.id === task.id
                          ? this.state.editingTask.description
                          : task.description
                      }
                      onChange={this.changeTaskDescription}
                      type='text'
                      aria-label='new-task-description-to-add'
                      aria-required='true'
                      name='Task Description'
                      readOnly={this.state.editingTask.id !== task.id}
                    />
                  </Label>
                  <Label>
                    Created:
                    <div>{moment(task.created).fromNow()}</div>
                  </Label>
                  <Actions>
                    {this.state.editingTask.id === task.id ? (
                      <Edit onClick={() => this.updateTask()}>Save</Edit>
                    ) : (
                      <Edit onClick={() => this.editTask(task)}>Edit</Edit>
                    )}
                    <Delete onClick={() => this.deleteTask(task.id)}>
                      Delete
                    </Delete>
                  </Actions>
                </ListElement>
              ))}
          </List>
        ) : (
          <span>Nessun task nella lista</span>
        )}
      </FullList>
    );
  }
}

const MapStateToProps = (state: IState) => {
  return {
    toDoList: state.toDoList,
  };
};

const MapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onUpdateTask: (task: Task) => dispatch<any>(actions.updateTask(task)),
    onDeleteTask: (taskId: number) => dispatch<any>(actions.deleteTask(taskId)),
  };
};

export default connect(MapStateToProps, MapDispatchToProps)(TaskList);
