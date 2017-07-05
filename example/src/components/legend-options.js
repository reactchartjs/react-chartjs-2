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
  display: true,
  position: 'top',
  fullWidth: true,
  reverse: false,
  labels: {
    fontColor: 'rgb(255, 99, 132)'
  }
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
        <h2>Legend Options Example</h2>
        <textarea
          cols="40"
          rows="15"
          ref={input => { this.legendOptsInput = input; }}
          defaultValue={JSON.stringify(this.state.legend, null, 2)}></textarea>
        <div>
          <button onClick={this.applyLegendSettings}>Apply legend settings</button>
        </div>
        <Pie data={data} legend={this.state.legend} redraw />
      </div>
    );
  }
})