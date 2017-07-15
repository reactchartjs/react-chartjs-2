import React from 'react';
import {Pie} from 'react-chartjs-2';

const data = {
  labels: [
    'Red',
    'Green',
    'Yellow'
  ],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56'
    ],
    hoverBackgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56'
    ]
  }]
};

const legendOpts = {
  onClick: (e, item) => alert(`Item with text ${item.text} and index ${item.index} clicked`),
  onHover: (e, item) => alert(`Item with text ${item.text} and index ${item.index} hovered`),
};

export default React.createClass({
  displayName: 'LegendExample',

  getInitialState() {
    return {
      legend: legendOpts
    }
  },

  applyLegendSettings() {
    const { value } = this.legendOptsInput;

    try {
      const opts = JSON.parse(value);
      this.setState({
        legend: opts
      });
    } catch(e) {
      alert(e.message);
      throw Error(e);
    }
  },

  render() {
    return (
      <div>
        <h2>Legend Handlers Example</h2>
        <p>Hover over label and click</p>
        <Pie data={data} legend={this.state.legend} />
      </div>
    );
  }
})