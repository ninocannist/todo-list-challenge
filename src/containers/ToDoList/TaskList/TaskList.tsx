import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { Dispatch } from 'redux';

interface IState {
  [key: string]: any;
  editingTask: Task;
}

interface IProps {
  toDoList: { [key: string]: any };
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskID: string);
}

interface Task {
  ID: string;
  name: string;
  description: string;
  created: number;
}

const emptyTask = {
  ID: '',
  name: '',
  description: '',
  created: 0,
};

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
          ID: oldState.editingTask.ID,
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
          ID: oldState.editingTask.ID,
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

  deleteTask = (taskID: string) => {
    this.props.onDeleteTask(taskID);
  };

  render() {
    console.log(this.props.toDoList);
    return (
      <div>
        <h2>List of tasks</h2>
        {this.props.toDoList.toDoList.length > 0 ? (
          <ul>
            {this.props.toDoList.toDoList.map((task: Task) => (
              <li key={task.ID}>
                <label>
                  Name:
                  <input
                    placeholder='Buy groceries'
                    value={
                      this.state.editingTask.ID === task.ID
                        ? this.state.editingTask.name
                        : task.name
                    }
                    onChange={this.changeTaskName}
                    type='text'
                    aria-label='new-task-name-to-add'
                    aria-required='true'
                    name='Task Name'
                    readOnly={this.state.editingTask.ID !== task.ID}
                  />
                </label>
                <label>
                  Description:
                  <input
                    placeholder='Milk, honey, pasta'
                    value={
                      this.state.editingTask.ID === task.ID
                        ? this.state.editingTask.description
                        : task.description
                    }
                    onChange={this.changeTaskDescription}
                    type='text'
                    aria-label='new-task-description-to-add'
                    aria-required='true'
                    name='Task Description'
                    readOnly={this.state.editingTask.ID !== task.ID}
                  />
                </label>
                {this.state.editingTask.ID === task.ID ? (
                  <button onClick={() => this.updateTask()}>Save</button>
                ) : (
                  <button onClick={() => this.editTask(task)}>Edit</button>
                )}
                <button onClick={() => this.deleteTask(task.ID)}>Delete</button>
              </li>
            ))}
            <li></li>
          </ul>
        ) : (
          <span>Nessun task nella lista</span>
        )}
      </div>
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
    onUpdateTask: (task: Task) => dispatch(actions.updateTask(task)),
    onDeleteTask: (taskID: string) => dispatch(actions.deleteTask(taskID))
  };
};

export default connect(MapStateToProps, MapDispatchToProps)(TaskList);
