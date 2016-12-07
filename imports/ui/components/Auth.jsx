import React, { Component, PropTypes, constructor, State } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import TextField from 'material-ui/TextField';

export default class Auth extends Component {

  constructor(props) {
    super(props);

    this.state = {
      signinEmail: '',
      signinPassword: '',
      signupUsername: '',
      signupEmail: '',
      signupPassword: ''
    };

    this.updateSigninEmail = this.updateSigninEmail.bind(this);
    this.updateSigninPassword = this.updateSigninPassword.bind(this);

    this.updateSignupUsername = this.updateSignupUsername.bind(this);
    this.updateSignupEmail = this.updateSignupEmail.bind(this);
    this.updateSignupPassword = this.updateSignupPassword.bind(this);

    this.handleSignin = this.handleSignin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  updateSigninEmail(e){
    this.setState({
      signinEmail: e.target.value
    });
  }

  updateSigninPassword(e){
    this.setState({
      signinPassword: e.target.value
    });
  }

  updateSignupUsername(e){
    this.setState({
      signupUsername: e.target.value
    });
  }

  updateSignupEmail(e){
    this.setState({
      signupEmail: e.target.value
    });
  }

  updateSignupPassword(e){
    this.setState({
      signupPassword: e.target.value
    });
  }

  handleSignin(event){
    event.preventDefault();

    Meteor.loginWithPassword(this.state.signinEmail, this.state.signinPassword, (error, data) => {
      if(error) {
        Bert.alert({
          type: 'danger',
          style: 'growl-top-right',
          message: 'Sign In Failed!',
          icon: 'fa-sign-in'
        });
      } else {
        Bert.alert({
          type: 'info',
          style: 'growl-top-right',
          message: 'You have successfully signed in!',
          icon: 'fa-sign-in'
        });
		    FlowRouter.go('/');
      }
    });
  }

  handleSignup(event){
    event.preventDefault();
    Accounts.createUser({
      username: this.state.signupUsername,
      email: this.state.signupEmail,
      password: this.state.signupPassword
    }, (error, data) => {
      if(error) {
        Bert.alert({
          type: 'danger',
          style: 'growl-top-right',
          message: 'Sign Up Failed!',
          icon: 'fa-sign-in'
        });
        console.log(error);
      } else {
        Bert.alert({
          type: 'info',
          style: 'growl-top-right',
          message: 'You have successfully signed up, and automatically logged in!',
          icon: 'fa-sign-in'
        });
		    FlowRouter.redirect('/');
      }
    });
  };

  render() {
    return (
      <MuiThemeProvider>
        <Flexbox className="app" flexDirection="column">
          <Flexbox className="content" flexDirection="row" justifyContent="center">

            <Flexbox className="col1">
            </Flexbox>

            <Flexbox className="col2">
              <Tabs>
                <Tab label="Sign In">
                  <Card>
                    <CardText>
                      <Flexbox className="textfields" flexDirection="column">
                        <TextField
                          name="signinEmail"
                          type="text"
                          onChange = {this.updateSigninEmail}
                          floatingLabelText = "E-mail"
                          />

                        <TextField
                          name="signinPassword"
                          type="password"
                          onChange = {this.updateSigninPassword}
                          floatingLabelText = "Password"
                          className = "textfield" />
                      </Flexbox>
                    </CardText>
                    <CardActions>
                      <RaisedButton label="Sign In" onClick={this.handleSignin} backgroundColor = "#FFEB3B" labelColor="#424242" fullWidth={true}/>
                    </CardActions>
                  </Card>
                </Tab>
                <Tab label="Sign Up" >
                  <Card>
                    <CardText>
                      <Flexbox className="textfields" flexDirection="column">
                        <TextField
                          name="signupUsername"
                          type="text"
                          onChange = {this.updateSignupUsername}
                          floatingLabelText = "Username"
                          className = "textfield" />
                        <TextField
                          name="signupEmail"
                          type="text"
                          onChange = {this.updateSignupEmail}
                          floatingLabelText = "E-mail"
                          className = "textfield" />
                        <TextField
                          name="signupPassword"
                          type="password"
                          onChange = {this.updateSignupPassword}
                          floatingLabelText = "Password"
                          className = "textfield" />
                      </Flexbox>
                    </CardText>
                    <CardActions>
                      <RaisedButton label="Sign Up" onClick={this.handleSignup} backgroundColor = "#FFEB3B" labelColor="#424242" fullWidth={true}/>
                    </CardActions>
                  </Card>
                </Tab>
              </Tabs>
            </Flexbox>

            <Flexbox className="col3">
            </Flexbox>

          </Flexbox>
        </Flexbox>
      </MuiThemeProvider>
    );
  }
}
