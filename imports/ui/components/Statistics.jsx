import React, { Component, constructor, State } from 'react';
import { VictoryBar, VictoryTheme, VictoryChart, VictoryAxis, VictoryStack } from 'victory';
import Loading from './Loading.jsx';
import Flexbox from 'flexbox-react';

export default class Statistics extends Component {
  constructor(props) {
    super(props);

    this.renderCharts = this.renderCharts.bind(this);
  }

  renderCharts(){
    data= [
      {key: 1, value: 5},
      {key: 2, value: 2},
      {key: 3, value: 3}
    ];

    return(
      <Flexbox>
        <VictoryChart
          // domainPadding will add space to each side of VictoryBar to
          // prevent it from overlapping the axis
          domainPadding={20}
          theme={VictoryTheme.material}
          width={350}
         >
          <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            tickValues={[1, 2, 3]}
            tickFormat={["Task Count", "Trello", "Wunderlist"]}
          />
          <VictoryAxis
            dependentAxis
            // tickFormat specifies how ticks should be displayed
            tickFormat={(x) => (`${x}`)}
          />
          <VictoryStack colorScale={"warm"}>
            <VictoryBar
              data={data}
              x="key"
              y="value"
            />
          </VictoryStack>
        </VictoryChart>
        <VictoryChart
          // domainPadding will add space to each side of VictoryBar to
          // prevent it from overlapping the axis
          domainPadding={20}
          theme={VictoryTheme.material}
          width={350}
         >
          <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            tickValues={[1, 2, 3]}
            tickFormat={["Task Count", "Completed Tasks", "Incomplete Tasks"]}
          />
          <VictoryAxis
            dependentAxis
            // tickFormat specifies how ticks should be displayed
            tickFormat={(x) => (`${x}`)}
          />
          <VictoryStack colorScale={"warm"}>
            <VictoryBar
              data={data}
              x="key"
              y="value"
            />
          </VictoryStack>
        </VictoryChart>
        <VictoryChart
          // domainPadding will add space to each side of VictoryBar to
          // prevent it from overlapping the axis
          domainPadding={20}
          theme={VictoryTheme.material}
          width={350}
         >
          <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            tickValues={[1, 2, 3]}
            tickFormat={["Estimated Pomos", "Completed Pomos", "Remaining Pomos"]}
          />
          <VictoryAxis
            dependentAxis
            // tickFormat specifies how ticks should be displayed
            tickFormat={(x) => (`${x}`)}
          />
          <VictoryStack colorScale={"warm"}>
            <VictoryBar
              data={data}
              x="key"
              y="value"
            />
          </VictoryStack>
        </VictoryChart>
      </Flexbox>
    );
  }

  render() {
    return (
      this.renderCharts()
    );
  }
}
