import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40],
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'rgba(255, 205, 86, 0.2)',
      borderColor: 'rgb(255, 205, 86)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255, 205, 86, 0.4)',
      hoverBorderColor: 'rgb(255, 205, 86)',
      data: [45, 69, 85, 75, 26, 65, 45],
    },
    {
      label: 'My Third dataset',
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgb(153, 102, 255)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(153, 102, 255, 0.4)',
      hoverBorderColor: 'rgb(153, 102, 255)',
      data: [85, 49, 88, 86, 49, 45, 48],
    },
  ],
};

export default React.createClass({
  displayName: 'BarExample',

  render() {
    return (
      <div>
        <h2>Bar Group Example</h2>
        <Bar
          data={data}
          width={100}
          height={250}
          options={{
            maintainAspectRatio: false,
            scales: {
              xAxes: [
                {
                  barThickness: 25,
                },
              ],
            },
          }}
        />
      </div>
    );
  },
});
