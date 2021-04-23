import React from 'react';
import { Scatter } from 'react-chartjs-2';

const rand = () => Math.round(Math.random() * 20 - 10);

const data = {
  datasets: [
    {
      label: 'A dataset',
      data: [
        { x: rand(), y: rand() },
        { x: rand(), y: rand() },
        { x: rand(), y: rand() },
        { x: rand(), y: rand() },
        { x: rand(), y: rand() },
        { x: rand(), y: rand() },
        { x: rand(), y: rand() },
        { x: rand(), y: rand() },
        { x: rand(), y: rand() },
        { x: rand(), y: rand() },
        { x: rand(), y: rand() },
        { x: rand(), y: rand() },
        { x: rand(), y: rand() },
        { x: rand(), y: rand() },
      ],
      backgroundColor: 'rgba(255, 99, 132, 1)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const ScatterChart = () => (
  <>
    <div className='header'>
      <h1 className='title'>Scatter Chart</h1>
      <div className='links'>
        <a
          className='btn btn-gh'
          href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Scatter.js'
        >
          Github Source
        </a>
      </div>
    </div>
    <Scatter data={data} options={options} />
  </>
);

export default ScatterChart;
