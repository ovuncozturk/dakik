import React, { Component, constructor, State } from 'react';
import Flexbox from 'flexbox-react';
import ReactCSSTransition from 'react-addons-css-transition-group';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import { Tasks } from '../../api/tasks.js';

import Loading from './Loading.jsx';
import Clock from './Clock.jsx';

export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: true,
      elapsedTime: 0,
      elapsedAngle: 0,
    }

    this.getIconName = this.getIconName.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handlePause = this.handlePause.bind(this);
  }

  componentDidMount(){
    var date = new Date();

    if (Meteor.user().profile.playing) {
      var timeDiff = (date.valueOf() - Meteor.user().profile.updateTime) / 1000;
    }else{
      var timeDiff = 0;
    }

    if ((timeDiff + Meteor.user().profile.elapsedTime) < 1500) {
      this.setState({
        playing: Meteor.user().profile.playing,
        elapsedTime: Meteor.user().profile.elapsedTime + timeDiff,
        elapsedAngle: Meteor.user().profile.elapsedTime / 15,
      });
    } else {
      // TODO: metod taskı bulamıyor, işlem yarıda kesiliyor.
      Meteor.call('finishTask', Meteor.user().profile.currentTaskId);
      this.handleStop();
    }

    if (this.state.playing) {
      this.timer = setTimeout(() => this.progress(), 1000);
    }
  }

  componentWillReceiveProps(nextProps){
    if(Meteor.user().profile.playing && !this.state.playing){
      this.setState({
        playing: true,
        elapsedTime: Meteor.user().profile.elapsedTime,
      });
      this.timer = setTimeout(() => this.progress(), 1000);
    }
  }

  componentWillUnmount(){
    if (Meteor.user()) {
      var temp = Meteor.user().profile;
      temp.playing = this.state.playing;
      temp.elapsedTime = this.state.elapsedTime;
      temp.updateTime = (new Date()).valueOf();
      Meteor.users.update(Meteor.userId(),{$set: {profile: temp}});
    }

    if (this.state.playing) {
      this.state.playing = false;
    }
  }

  progress() {
    if (this.state.playing) {
      if (this.state.elapsedTime < 1500) {
        const temp = this.state.elapsedTime + 1;
        this.setState({
          elapsedTime: temp,
          elapsedAngle: temp / 15,
        });
        this.timer = setTimeout(() => this.progress(), 1000);
      } else if(this.state.elapsedTime >= 1500){
        Meteor.call('finishTask', Meteor.user().profile.currentTaskId);
        this.handleStop();
      }
    }
  }

  handlePause() {
    if (this.state.playing) {
      this.setState({
        playing: false,
      });
    } else {
      this.setState({
        playing: true,
      });
      this.timer = setTimeout(() => this.progress(), 1000);
    }
  }

  handleStop() {
    this.setState({
      playing: false,
      elapsedTime: 0,
      elapsedAngle: 0
    });

    const newProfile = Meteor.user().profile;

    newProfile.playing = false;
    newProfile.elapsedTime = 0;
    newProfile.updateTime = null;
    newProfile.currentTaskId = null;

    Meteor.users.update(Meteor.userId(), {$set: {profile: newProfile}});
  }

  getIconName(){
    if(this.state.playing){
      return 'fa fa-pause';
    } else {
      return 'fa fa-play';
    }
  }

  render() {
    if (Meteor.user()) {
      return (
        <MuiThemeProvider>
          <Flexbox flexDirection="column">
            <Clock playing={this.state.playing} elapsedTime={this.state.elapsedTime} elapsedAngle={this.state.elapsedAngle} />
            <Flexbox justifyContent="center">
              <FloatingActionButton style={{marginRight: "1em"}} iconClassName={this.getIconName()} onClick={this.handlePause} disabled={this.state.elapsedTime > 0 ? false : true}/>
              <FloatingActionButton disabled={!this.state.playing} iconClassName="fa fa-stop" onClick={this.handleStop}/>
            </Flexbox>
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
