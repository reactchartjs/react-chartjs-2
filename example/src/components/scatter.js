import React from 'react';
import {Scatter} from 'react-chartjs-2';

const data = {
  labels: ['Scatter'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      backgroundColor: 'rgba(75,192,192,0.4)',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 5,
      pointHitRadius: 10,
      data: generateData()
    }
  ]
};

export default React.createClass({
  displayName: 'ScatterExample',

  render() {
    return (
      <div>
        <h2>Scatter Example</h2>
        <Scatter data={data} />
      </div>
    );
  }
});

function generateData() {
  var randomScalingFactor = function() {
    return Math.round(Math.random() * 100);
  };
  var data = [];
  for (var i = 0; i < 7; i++) {
    data.push({
      x: randomScalingFactor(),
      y: randomScalingFactor()
    });
  }
  return data;
}
