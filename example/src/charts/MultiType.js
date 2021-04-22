import React from 'react';
import { Bar } from 'react-chartjs-2';

const rand = () => Math.round(Math.random() * 20 - 10);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      type: 'line',
      label: 'Dataset 1',
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 2,
      fill: false,
      data: [rand(), rand(), rand(), rand(), rand(), rand()],
    },
    {
      type: 'bar',
      label: 'Dataset 2',
      backgroundColor: 'rgb(255, 99, 132)',
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
      borderColor: 'white',
      borderWidth: 2,
    },
    {
      type: 'bar',
      label: 'Dataset 3',
      backgroundColor: 'rgb(75, 192, 192)',
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
    },
  ],
};

const MultiType = () => (
  <>
    <div className='header'>
      <h1 className='title'>MultiType Chart</h1>
      <div className='links'>
        <a
          className='btn btn-gh'
          href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/MultiType.js'
        >
          Github Source
        </a>
      </div>
    </div>
    <Bar data={data} />
  </>
);

export default MultiType;
