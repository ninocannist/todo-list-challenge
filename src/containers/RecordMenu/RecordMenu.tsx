import React, { Component } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Dispatch } from 'redux';
import * as actionTypes from '../../store/actions/actionTypes';

const Actions = styled.div`
  padding: 10px 20px;
  color: white;
  display: grid;
  grid-template-columns: auto auto auto;
  height: 100px;
  align-items: center;
  grid-area: record;
`;

interface IState {
  [key: string]: any;
  recording: Recording;
  toDoList: { [key: string]: any };
  replay: boolean;
}

interface NewTask {
  name: string;
  description: string;
  created: number;
}

interface IProps {
  onListReset: () => void;
  onToggleRecord: (recording: Recording) => void;
  onDeleteTask: (taskId: number) => void;
  onDeleteTaskWithoutLogging: (taskId: number) => void;
  onDeleteAction: (actionId: number) => void;
  onFullTaskAdded: (task: Task) => void;
  onUpdateTask: (task: Task) => void;
  onTaskAdded: (task: NewTask) => void;

  recording: Recording;
  toDoList: { [key: string]: any };
  actions: [];
}

interface Task {
  name: string;
  description: string;
  created: number;
  id: number;
}

interface Recording {
  value: number;
  initial_state: [];
  actions: [];
}

interface FullAction {
  id: number;
  action: { [key: string]: any };
}

const Play = styled.button`
  width: 65px;
  height: 65px;
  text-align: center;
  margin: 0 auto;
  border-radius: 38px;
  background: rgb(29, 253, 235);
  background: -moz-linear-gradient(
    156deg,
    rgba(29, 253, 235, 1) 0%,
    rgba(0, 65, 255, 1) 100%
  );
  background: -webkit-linear-gradient(
    156deg,
    rgba(29, 253, 235, 1) 0%,
    rgba(0, 65, 255, 1) 100%
  );
  background: linear-gradient(
    156deg,
    rgba(29, 253, 235, 1) 0%,
    rgba(0, 65, 255, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#1dfdeb",endColorstr="#0041ff",GradientType=1);
  color: white;
  font-size: 15px;
  border: none;
  padding: 5px;
  &:active {
    width: 69px;
    height: 69px;
    -webkit-box-shadow: 5px 5px 10px 0px rgba(0, 133, 166, 1);
    -moz-box-shadow: 5px 5px 10px 0px rgba(0, 133, 166, 1);
    box-shadow: 5px 5px 10px 0px rgba(0, 133, 166, 1);
  }
`;

const Reset = styled.button`
  width: 65px;
  height: 65px;
  text-align: center;
  margin: 0 auto;
  border-radius: 38px;
  background: rgb(253, 232, 29);
  background: -moz-linear-gradient(
    156deg,
    rgba(253, 232, 29, 1) 0%,
    rgba(255, 98, 0, 1) 100%
  );
  background: -webkit-linear-gradient(
    156deg,
    rgba(253, 232, 29, 1) 0%,
    rgba(255, 98, 0, 1) 100%
  );
  background: linear-gradient(
    156deg,
    rgba(253, 232, 29, 1) 0%,
    rgba(255, 98, 0, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#fde81d",endColorstr="#ff6200",GradientType=1);
  color: white;
  font-size: 15px;
  border: none;
  padding: 5px;
  &:active {
    width: 69px;
    height: 69px;
    -webkit-box-shadow: 5px 5px 10px 0px rgba(255, 98, 0, 1);
    -moz-box-shadow: 5px 5px 10px 0px rgba(255, 98, 0, 1);
    box-shadow: 5px 5px 10px 0px rgba(255, 98, 0, 1);
  }
`;

const Record = styled.button`
  width: 65px;
  height: 65px;
  text-align: center;
  margin: 0 auto;
  border-radius: 38px;
  background: rgb(253, 119, 29);
  background: -moz-linear-gradient(
    356deg,
    rgba(253, 119, 29, 1) 0%,
    rgba(253, 29, 29, 1) 100%
  );
  background: -webkit-linear-gradient(
    356deg,
    rgba(253, 119, 29, 1) 0%,
    rgba(253, 29, 29, 1) 100%
  );
  background: linear-gradient(
    356deg,
    rgba(253, 119, 29, 1) 0%,
    rgba(253, 29, 29, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#fd771d",endColorstr="#fd1d1d",GradientType=1);
  color: white;
  font-size: 15px;
  border: none;
  padding: 5px;
  &:active {
    width: 69px;
    height: 69px;
    -webkit-box-shadow: 5px 5px 10px 0px rgba(253, 29, 29, 1);
    -moz-box-shadow: 5px 5px 10px 0px rgba(253, 29, 29, 1);
    box-shadow: 5px 5px 10px 0px rgba(253, 29, 29, 1);
  }
`;

class RecordMenu extends Component<IProps, IState> {
  state: IState = {
    recording: {
      value: 0,
      initial_state: [],
      actions: [],
    },
    toDoList: [],
    actions: [],
    replay: false,
  };

  componentDidMount() {
    this.setState({
      recording: this.props.recording,
      actions: this.props.actions,
    });
  }

  play = () => {
    if (!this.props.recording.value) {
      this.setState({ replay: true });
      console.log('play');
      this.resetList();
      setTimeout(() => {
        this.props.recording.initial_state.forEach((task) => {
          this.props.onFullTaskAdded(task);
        });
        setTimeout(() => {
          console.log('Boh ', this.props.recording.actions);
          this.props.recording.actions.forEach(
            (action: FullAction, index: number) => {
              setTimeout(() => {
                switch (action.action.type) {
                  case actionTypes.DELETE_TASK:
                    console.log('S processed: ', action);
                    this.props.onDeleteTask(action.action.taskId);
                    break;
                  case actionTypes.UPDATE_TASK:
                    console.log('S processed: ', action);
                    this.props.onUpdateTask(action.action.task);
                    break;
                  case actionTypes.ADD_TASK:
                    console.log('S processed: ', action);
                    const newTaskToAdd = {
                      name: action.action.task.name,
                      description: action.action.task.description,
                      created: action.action.task.created,
                    };
                    this.props.onTaskAdded(newTaskToAdd);
                    break;
                  default:
                    console.log('Not processed: ', action);
                }
              }, 1000 * index);
            }
          );
          console.log('sleep');
          this.setState({ replay: false });
        }, 1000);
      }, 2000);
    }
  };

  resetList = () => {
    if (this.props.recording.value) {
      console.log('reset 1');
      this.props.toDoList.toDoList.forEach((element: Task) => {
        this.props.onDeleteTask(element.id);
      });
    } else {
      console.log('reset 2');
      this.props.toDoList.toDoList.forEach((element: Task) => {
        this.props.onDeleteTaskWithoutLogging(element.id);
      });
    }
    console.log('reset 3');
    this.props.actions.forEach((element: FullAction) => {
      this.props.onDeleteAction(element.id);
    });
  };

  record = () => {
    if (this.props.recording.value) {
      const recording: Recording = {
        value: 0,
        initial_state: this.props.recording.initial_state,
        actions: this.props.actions,
      };
      this.props.onToggleRecord(recording);
      this.props.actions.forEach((element: FullAction) => {
        this.props.onDeleteAction(element.id);
      });
    } else {
      this.props.actions.forEach((element: FullAction) => {
        this.props.onDeleteAction(element.id);
      });
      const recording: Recording = {
        value: 1,
        initial_state: this.props.toDoList.toDoList,
        actions: [],
      };
      this.props.onToggleRecord(recording);
    }
  };

  render() {
    return (
      <Actions>
        {this.state.replay ? (
          <Play className='Rep'>Playing</Play>
        ) : (
          <Play onClick={this.play}>Replay</Play>
        )}

        <Reset onClick={this.resetList}>Reset</Reset>

        <Record
          className={this.props.recording.value ? 'Rec' : ''}
          onClick={this.record}
        >
          {this.props.recording.value ? 'Stop' : 'Record'}
        </Record>
      </Actions>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onListReset: () => dispatch<any>(actions.initList()),
    onDeleteTask: (taskId: number) => dispatch<any>(actions.deleteTask(taskId)),
    onToggleRecord: (recording: Recording) =>
      dispatch<any>(actions.record(recording)),
    onDeleteAction: (actionId: number) =>
      dispatch<any>(actions.deleteAction(actionId)),
    onFullTaskAdded: (task: Task) => dispatch<any>(actions.addFullTask(task)),
    onUpdateTask: (task: Task) => dispatch<any>(actions.updateTask(task)),
    onTaskAdded: (task: NewTask) => dispatch<any>(actions.addTask(task)),
    onDeleteTaskWithoutLogging: (taskId: number) =>
      dispatch<any>(actions.deleteTaskWithoutLogging(taskId)),
  };
};

const MapStateToProps = (state: IState) => {
  return {
    recording: state.recording,
    toDoList: state.toDoList,
    actions: state.actions,
  };
};

export default connect(MapStateToProps, mapDispatchToProps)(RecordMenu);
