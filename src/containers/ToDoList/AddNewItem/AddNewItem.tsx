import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { Dispatch } from 'redux';

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
      <div>
        <label>
          Name:
          <input
            placeholder='Buy groceries'
            value={this.state.newTaskToAddName}
            onChange={this.updateNewTaskName}
            type='text'
            aria-label='new-task-name-to-add'
            aria-required='true'
            name='Task Name'
          />
        </label>
        <label>
          Description:
          <input
            placeholder='Milk, honey, pasta'
            value={this.state.newTaskToAddDescription}
            onChange={this.updateNewTaskDescription}
            type='text'
            aria-label='new-task-description-to-add'
            aria-required='true'
            name='Task Description'
          />
        </label>
        <button onClick={this.generateTask}>Add Task +</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onTaskAdded: (task: NewTask) => dispatch<any>(actions.addTask(task)),
  };
};

export default connect(null, mapDispatchToProps)(AddNewItem);
