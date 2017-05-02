import React, { Component } from 'react';
import ReactCSSTransition from 'react-addons-css-transition-group';
import Rsvg from 'react-inlinesvg';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

export default class Clock extends Component {
  constructor(props) {
    super(props);

    this.getMinutes = this.getMinutes.bind(this);
    this.getSeconds = this.getSeconds.bind(this);
    this.drawMinutes = this.drawMinutes.bind(this);
    this.drawSeconds = this.drawSeconds.bind(this);
  }

  getMinutes(){
    return parseInt(this.props.remainingTime / 60);
  }

  getSeconds(){
    return parseInt(this.props.remainingTime % 60);
  }

  drawMinutes(){
    var temp = this.getMinutes();
    if (temp < 10) {
      return '0' + temp.toString();
    } else {
      return temp;
    }
  }

  drawSeconds(){
    var temp = this.getSeconds();
    if (temp < 10) {
      return '0' + temp.toString();
    } else {
      return temp;
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="clock logo">
          <div className="circular">
            <CircularProgress
              color={this.props.color ? this.props.color : "#ffffff"}
              mode="determinate"
              value={this.props.remainingAngle}
              size={288}
              thickness={6}
            />
          </div>
          <div className="clockLogo">
            <img src="dakik_logo.svg" alt=""/>
          </div>
          <div className="clockText" style={{"color": this.props.color}}>
            {this.drawMinutes()}:{this.drawSeconds()}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
