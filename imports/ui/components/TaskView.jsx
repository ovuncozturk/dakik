import React, { Component, PropTypes, constructor, State } from 'react';
import ReactCSSTransition from 'react-addons-css-transition-group';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';

import { Tasks } from '../../api/tasks.js';

import Loading from './Loading.jsx';
import TaskFrame from './TaskFrame.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';
import Subheader from 'material-ui/Subheader';
import {Card, CardText} from 'material-ui/Card';
import {List} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

class TaskView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };

    this.routeNewTask = this.routeNewTask.bind(this);
    this.renderTasks = this.renderTasks.bind(this);
    this.toggleHide = this.toggleHide.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.currentUser !== undefined) {
      this.setState({
        hideCompleted: nextProps.currentUser.profile.hideCompleted,
      });
    }
  }

  routeNewTask(){
    Session.set({
      "route": "taskNew"
    });
  }

  renderTasks(){
    let filteredTasks = this.props.tasks;

    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }

    return filteredTasks.map((task) => (
      <TaskFrame key={task._id} task={task}/>
    ));
  }

  toggleHide(){
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });

    var newProfile = Meteor.user().profile;
    newProfile.hideCompleted = !Meteor.user().profile.hideCompleted;

    Meteor.users.update(Meteor.userId(),{$set: {profile: newProfile}});
  }

  render() {
    if (this.props.tasks && Meteor.user()) {
      return (
        <MuiThemeProvider>
          <Flexbox>
            <Card className="taskListCard">
              <CardText>
                <Subheader className="subheader">
                  #TagNameHere
                  <IconButton iconClassName="fa fa-plus-square-o" style={{padding: '-12px'}} onClick={this.routeNewTask} tooltip="New Task"/>
                  <Toggle label="Hide completed" labelPosition="right" toggled={this.state.hideCompleted} onToggle={this.toggleHide} className="toggleChecked"/>
                </Subheader>
                <List className="taskList">
                  <ReactCSSTransition
                    transitionName = "taskFrameLoad"
                    transitionEnterTimeout = {600}
                    transitionLeaveTimeout = {400}>
                      {this.renderTasks()}
                  </ReactCSSTransition>
                </List>
              </CardText>
            </Card>
          </Flexbox>
        </MuiThemeProvider>
      );
    } else {
      return (
        <Loading/>
      );
    }
  }
}

export default TaskViewContainer = createContainer(() => {
  Meteor.subscribe('tasks');
  const tasks = Tasks.find().fetch();

  return {
    tasks,
  };
}, TaskView);
