import React, { Component, constructor, State } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Loading from './Loading.jsx';
import Flexbox from 'flexbox-react';

import { VictoryBar, VictoryTheme, VictoryChart, VictoryAxis, VictoryStack } from 'victory';

class Statistics extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return(
      <Flexbox flexDirection="column">
        <Flexbox>
          <VictoryChart
            domainPadding={20}
            theme={VictoryTheme.material}
            width={350}
           >
            <VictoryAxis
              tickValues={[1, 2, 3]}
              tickFormat={["Task Count", "Trello", "Wunderlist"]}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => (`${x}`)}
            />
            <VictoryStack>
              <VictoryBar
                data={this.props.graph1Data}
                x="key"
                y="value"
              />
            </VictoryStack>
          </VictoryChart>
          <VictoryChart
            domainPadding={20}
            theme={VictoryTheme.material}
            width={350}
           >
            <VictoryAxis
              tickValues={[1, 2, 3]}
              tickFormat={["Task Count", "Completed Tasks", "Incomplete Tasks"]}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => (`${x}`)}
            />
            <VictoryStack colorScale={"warm"}>
              <VictoryBar
                data={this.props.graph2Data}
                x="key"
                y="value"
              />
            </VictoryStack>
          </VictoryChart>
        </Flexbox>
        <Flexbox>
          <VictoryChart
            domainPadding={20}
            theme={VictoryTheme.material}
            width={350}
           >
            <VictoryAxis
              tickValues={[1, 2, 3]}
              tickFormat={["Estimated Pomos", "Completed Pomos", "Remaining Pomos"]}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => (`${x}`)}
            />
            <VictoryStack colorScale={"warm"}>
              <VictoryBar
                data={this.props.graph3Data}
                x="key"
                y="value"
              />
            </VictoryStack>
          </VictoryChart>
        </Flexbox>
      </Flexbox>
    );
  }
}

export default StatisticsContainer = createContainer(() => {
  var user = Meteor.user();

  var graph1Data = [{key: 1, value: 0}, {key: 2, value: 0}, {key: 3, value: 0}];
  if (user.profile.taskCount) {
    graph1Data[0].value = user.profile.taskCount;
    if (user.profile.trelloTasksCount) {
      graph1Data[1].value = user.profile.trelloTasksCount;
    }
    if(user.profile.wunderlistTasksCount) {
      graph1Data[2].value = user.profile.wunderlistTasksCount;
    }
  }

  var graph2Data = [{key: 1, value: 0}, {key: 2, value: 0}, {key: 3, value: 0}];
  if (user.profile.taskCount) {
    graph2Data[0].value = user.profile.taskCount;
    if (user.profile.trelloTasksCount) {
      graph2Data[1].value = user.profile.trelloTasksCount;
    }
    if(user.profile.wunderlistTasksCount) {
      graph2Data[2].value = user.profile.wunderlistTasksCount;
    }
  }

  var graph3Data = [{key: 1, value: 0}, {key: 2, value: 0}, {key: 3, value: 0}];
  if (user.profile.taskCount) {
    graph3Data[0].value = user.profile.taskCount;
    if (user.profile.trelloTasksCount) {
      graph3Data[1].value = user.profile.trelloTasksCount;
    }
    if(user.profile.wunderlistTasksCount) {
      graph3Data[2].value = user.profile.wunderlistTasksCount;
    }
  }

  return{
    user,
    graph1Data,
    graph2Data,
    graph3Data
  };
}, Statistics);
