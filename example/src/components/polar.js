import React from 'react';
import {Polar} from 'react-chartjs-2';

var randomScalingFactor = function() {
  return Math.round(Math.random() * 100);
};

const data = {
  datasets: [{
    data: [
      randomScalingFactor(),
      randomScalingFactor(),
      randomScalingFactor(),
      randomScalingFactor(),
      randomScalingFactor(),
    ],
    backgroundColor: [
      '#FF6384',
      '#4BC0C0',
      '#FFCE56',
      '#E7E9ED',
      '#36A2EB'
    ],
    label: 'My dataset' // for legend
  }],
  labels: [
    'Red',
    'Green',
    'Yellow',
    'Grey',
    'Blue'
  ]
};

export default React.createClass({
  displayName: 'PolarExample',

  render() {
    return (
      <div>
        <h2>Polar Example</h2>
        <Polar data={data} />
      </div>
    );
  }
});
