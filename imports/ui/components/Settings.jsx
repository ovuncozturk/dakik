import React, { Component, constructor } from 'react';
import TrelloApi from './TrelloApi.jsx';
import WunderlistApi from './WunderlistApi.jsx';
import { Grid, Menu, Segment, Label, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

export default class Settings extends Component {
  constructor(props) {
    super(props);
	this.state = {
	  activeItem: 'trello'
	}
	this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }){
    this.setState({ activeItem: name });
  }

  render() {
    return (
      <Segment className = "settingsCont">
		<Grid className="about-semantic">
		  <Grid.Column width={4}>
			<Menu pointing secondary vertical>
			  <Menu.Item name='trello' active={this.state.activeItem === 'trello'} onClick={this.handleItemClick} >Trello</Menu.Item>
			  <Menu.Item name='wunderlist' active={this.state.activeItem === 'wunderlist'} onClick={this.handleItemClick} >Wunderlist</Menu.Item>

			</Menu>
		  </Grid.Column>
		  <Grid.Column stretched width={12}>
			{this.state.activeItem === "trello" ?
			<Segment className = "sementicSegment">
				<TrelloApi history={this.props.history} />
			</Segment>
			: ""}

			{this.state.activeItem === "wunderlist" ?
			<Segment className = "sementicSegment">
				<WunderlistApi history={this.props.history} />
			</Segment>
			: ""}
		</Grid.Column>
		</Grid>
      </Segment>
    );
  }
}
