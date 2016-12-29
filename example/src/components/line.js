import React from 'react';
import {Line} from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

const options = {
  legend: {
    display: false
  },
  legendCallback: function(chart) {
    console.log(chart.data);
    var text = [];
    text.push('<ul>');
    for (var i=0; i<chart.data.datasets[0].data.length; i++) {
      text.push('<li>');
      text.push('<span style="background-color:' + chart.data.datasets[0].backgroundColor[i] + '">' + chart.data.datasets[0].data[i] + '</span>');
      if (chart.data.labels[i]) {
        text.push(chart.data.labels[i]);
      }
      text.push('</li>');
    }
    text.push('</ul>');
    return text.join("");
  }
};

export default React.createClass({
  displayName: 'LineExample',

  render() {
    return (
      <div>
        <h2>Line Example</h2>
        <Line data={data} options={options}/>
      </div>
    );
  }
});
