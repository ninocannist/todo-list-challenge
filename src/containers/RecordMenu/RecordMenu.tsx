import React, { Component } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Dispatch } from 'redux';

const Actions = styled.div`
  padding: 10px 20px;
  color: white;
  display: grid;
  grid-template-columns: auto auto auto;
  height: 100px;
  align-items: center;
`;

interface IState {
  [key: string]: any;
  recording: Recording;
  toDoList: { [key: string]: any };
}

interface IProps {
  onListReset: () => void;
  onToggleRecord: (recording: Recording) => void;
  onDeleteTask: (taskId: number) => void;
  onDeleteAction: (actionId: number) => void;
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
}

interface FullAction {
  id: number;
  action: { [key: string]: any };
}

const Play = styled.button`
  width: 76px;
  height: 76px;
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
  font-size: 18px;
  border: none;
  padding: 5px;
  &:hover {
    width: 80px;
    height: 80px;
    -webkit-box-shadow: 5px 5px 10px 0px rgba(0, 133, 166, 1);
    -moz-box-shadow: 5px 5px 10px 0px rgba(0, 133, 166, 1);
    box-shadow: 5px 5px 10px 0px rgba(0, 133, 166, 1);
  }
`;

const Reset = styled.button`
  width: 76px;
  height: 76px;
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
  font-size: 18px;
  border: none;
  padding: 5px;
  &:hover {
    width: 80px;
    height: 80px;
    -webkit-box-shadow: 5px 5px 10px 0px rgba(255, 98, 0, 1);
    -moz-box-shadow: 5px 5px 10px 0px rgba(255, 98, 0, 1);
    box-shadow: 5px 5px 10px 0px rgba(255, 98, 0, 1);
  }
`;

const Record = styled.button`
  width: 76px;
  height: 76px;
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
  font-size: 18px;
  border: none;
  padding: 5px;
  &:hover {
    width: 80px;
    height: 80px;
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
    },
    toDoList: [],
    actions: [],
  };

  componentDidMount() {
    this.setState({
      recording: this.props.recording,
      toDoList: this.props.toDoList,
      actions: this.props.actions,
    });
  }

  play = () => {
    console.log('play');
  };

  resetList = () => {
    this.props.toDoList.toDoList.forEach((element: Task) => {
      this.props.onDeleteTask(element.id);
    });
    this.props.actions.forEach((element: FullAction) => {
      this.props.onDeleteAction(element.id);
    });
  };

  record = () => {
    if (this.props.recording.value) {
      const recording = {
        value: 0,
        initial_state: this.props.recording.initial_state,
      };
      this.props.onToggleRecord(recording);
    } else {
      const recording = {
        value: 1,
        initial_state: this.props.toDoList.toDoList,
      };
      this.props.onToggleRecord(recording);
    }
  };

  render() {
    return (
      <Actions>
        <Play onClick={this.play}>
          {this.props.recording.value ? 'recording' : 'play'}
        </Play>
        <Reset onClick={this.resetList}>Reset</Reset>

        <Record onClick={this.record}>
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
