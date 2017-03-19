import React, { Component, constructor, PropTypes} from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Tasks } from '../../api/tasks.js';

export default class WunderlistApi extends Component {
  constructor(props) {
    super(props);

    this.takeToken = this.takeToken.bind(this);
    this.insertLists = this.insertLists.bind(this);
    this.example = this.example.bind(this);
    this.handleDisabled = this.handleDisabled.bind(this);

    var location = window.location.href;
    var pathanddomain = location.split('&');
    var path = pathanddomain.splice(1, pathanddomain.length-1);
    if(path[0]==undefined) {
      code="";
    } else {
      var codeSegment = path[0];
      var checkValue = codeSegment.charAt(codeSegment.length-1);
      if(checkValue=='#') {
        var code = codeSegment.substring(5,codeSegment.length-1);
      } else {
        var code = codeSegment.substring(5,codeSegment.length);
      }
    }

    if(code=="") {
      this.state = {
        disabled: false,
      }
    } else {
      this.state = {
        disabled: true,
      }
      this.takeToken();
    }
  }

  takeToken() {
    var location = window.location.href;
    var pathanddomain = location.split('&');
    var path = pathanddomain.splice(1, pathanddomain.length-1);
    var codeSegment = path[0];

    var checkValue = codeSegment.charAt(codeSegment.length-1);
    if(checkValue=='#') {
      var code = codeSegment.substring(5,codeSegment.length-1);
    } else {
      var code = codeSegment.substring(5,codeSegment.length);
    }

    Meteor.call('fetchFromService', code, function(err, respJson) {
      if(err) {
        window.alert("Error: " + err.reason);
        console.log("error occured on receiving data on server. ", err );
      }
    });

    this.handleDisabled();
  }

  insertLists() {
    var user = this.props.currentUser;
    const ownerId = user._id;
    const checked = false;
    const taskPriority = 0;
    const totalPomos = 0;
    const taskGoal = null;
    const integratedWith = "wunderlist";
    const dueDate = null;
    const createdAt = new Date();
    var taskCount = 0;
    var wunderlistTasksCount = 0;

    if (user.profile.taskCount !== undefined) {
      taskCount = user.profile.taskCount;
    }

    if (user.profile.wunderlistTasksCount !== undefined) {
      wunderlistTasksCount = user.profile.wunderlistTasksCount;
    }

    Meteor.call('fetchFromService2', function(err, respJson) {
      for(i=0; i<respJson.length; i++) {
        Meteor.call('fetchFromService3', respJson[i].id, function(err, respJsonTask) {
          for(x=0;x<respJsonTask.length;x++) {
            const taskName = respJsonTask[x].title;
            Tasks.insert({
              ownerId,
              taskName,
              taskPriority,
              checked,
              totalPomos,
              taskGoal,
              integratedWith,
              dueDate,
              createdAt,
            });
            taskCount += 1;
            wunderlistTasksCount += 1;
            const newProfile = user.profile;
            newProfile.taskCount = taskCount;
            newProfile.wunderlistTasksCount = wunderlistTasksCount;
            Meteor.users.update({_id: user._id},{$set: {profile: newProfile}});
          }
        });
      }
    });
  }

  handleDisabled() {
    if (this.refs.myRef) {
      this.setState({disabled: !this.state.disabled});
    }
  }

  example() {
    this.handleDisabled();
    window.location.href = "https://www.wunderlist.com/oauth/authorize?client_id=e04ef6ffa3101a7ffe8e&redirect_uri=http://localhost:3000&state=RANDOM";
  }

  render() {
    return (
      <div ref="myRef">
        <FlatButton disabled={this.state.disabled} label="Connect To Wunderlist" onTouchTap={this.example}/>
        <FlatButton label="SYNC" onTouchTap={this.insertLists}/>
      </div>
    );
  }
}
