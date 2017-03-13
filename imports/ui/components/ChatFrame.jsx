import React, { Component, PropTypes, constructor, State } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';
import {mount} from 'react-mounter';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';

export default class ChatFrame extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <ListItem
          primaryText={this.props.chat.message}
          secondaryText={this.props.chat.ownerName}
        />
      </MuiThemeProvider>
    );
  }
}
