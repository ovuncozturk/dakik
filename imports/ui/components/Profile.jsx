import React, { Component, constructor, State } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Loading from './Loading.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      openLogout: false,
    }

  	this.handleLogout = this.handleLogout.bind(this);
  	this.handleCloseLogout = this.handleCloseLogout.bind(this);
  	this.handleOpenLogout = this.handleOpenLogout.bind(this);
  }

  handleOpenLogout(){
    this.setState({openLogout: true});
  }

  handleCloseLogout(){
    this.setState({openLogout: false});
  }

  handleLogout(){
    Meteor.logout(function(err){
      if(err) {
        this.updateSnackbarText('Logout Failed!');
        this.openSnackbar();
      } else {
        FlowRouter.go('/auth');
      }
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCloseLogout}
        />,
      <FlatButton
        label="Log out"
        primary={true}
        onTouchTap={this.handleLogout}
        />,
    ];

    if (this.props.user) {
      if (this.props.user.profile) {
        return (
          <MuiThemeProvider>
            <Card>
              <CardHeader
                title={this.props.user.username ? this.props.user.username : 'Registered username was not found..'}
                subtitle= {this.props.user.emails ? this.props.user.emails[0].address : 'Registered email address was not found..'}
                avatar="/jsa-128.jpg"
              />
              <CardTitle title="Statistics"/>
              <CardText>
                Tasks Created: {this.props.user.profile.taskCount ? this.props.user.profile.taskCount : 0}<br/>
                Tasks Integrated With Trello: {this.props.user.profile.trelloTasksCount ? this.props.user.profile.trelloTasksCount : 0}<br/>
                Tasks Integrated With Wunderlist: {this.props.user.profile.wunderlistTasksCount ? this.props.user.profile.wunderlistTasksCount : 0}<br/>
                Finished Pomos: {this.props.user.profile.pomoCount ? this.props.user.profile.pomoCount : 0}<br/>
              </CardText>
              <CardActions>
                <IconButton iconClassName="fa fa-sign-out" style={{padding: '-12px'}} tooltip="Log out" onClick={this.handleOpenLogout}/>
              </CardActions>
            <Dialog actions={actions} modal={false} open={this.state.openLogout} onRequestClose={this.handleCloseLogout}>
              Are you sure ?
            </Dialog>
            </Card>
          </MuiThemeProvider>
        );
      } else {
        return (
          <MuiThemeProvider>
            <Card>
              <CardHeader
                title={this.props.user.username ? this.props.user.username : 'Registered username was not found..'}
                subtitle= {this.props.user.emails ? this.props.user.emails[0].address : 'Registered email address was not found..'}
                avatar="/jsa-128.jpg"
              />
            </Card>
          </MuiThemeProvider>
        );
      }
    } else {
      return (
        <Loading/>
      );
    }
  }
}

export default ProfileContainer = createContainer(() => {
  const user = Meteor.users.findOne(Meteor.userId());
  return{
    user,
  };
}, Profile);
