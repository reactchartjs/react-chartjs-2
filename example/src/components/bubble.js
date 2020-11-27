import React from 'react';
import {Bubble} from 'react-chartjs-2';

var randomScalingFactor = function() {
  return Math.round(Math.random() * 100);
};

const data = {
  labels: ['January'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [{
        x: randomScalingFactor(),
        y: randomScalingFactor(),
        r: Math.abs(randomScalingFactor()) / 5,
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
        r: Math.abs(randomScalingFactor()) / 5,
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
        r: Math.abs(randomScalingFactor()) / 5,
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
        r: Math.abs(randomScalingFactor()) / 5,
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
        r: Math.abs(randomScalingFactor()) / 5,
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
        r: Math.abs(randomScalingFactor()) / 5,
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
        r: Math.abs(randomScalingFactor()) / 5,
      }]
    }
  ]
};

const options = {
  responsive: true,
    plugins: {
    title: {
      display: true,
        text: 'Chart.js Bubble Chart'
    },
    tooltip: {
      mode: 'point'
    }
  }
}

export default React.createClass({
  displayName: 'BubbleExample',

  render() {
    return (
      <div>
        <h2>Bubble Example</h2>
        <Bubble data={data} options={options} />
      </div>
    );
  }
});
