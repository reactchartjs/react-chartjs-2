import {
  months,
  colorRed,
  colorRed05,
  colorBlue,
  colorBlue05,
  numbers,
} from './data';

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

export const data = {
  labels: months,
  datasets: [
    {
      label: 'Dataset 1',
      data: numbers(),
      borderColor: colorRed,
      backgroundColor: colorRed05,
    },
    {
      label: 'Dataset 2',
      data: numbers(),
      borderColor: colorBlue,
      backgroundColor: colorBlue05,
    },
  ],
};

export const multiAxisOptions = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Line Chart - Multi Axis',
    },
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',

      // grid line settings
      grid: {
        drawOnChartArea: false, // only want the grid lines for one axis to show up
      },
    },
  },
};

export const multiAxisData = {
  labels: months,
  datasets: [
    {
      label: 'Dataset 1',
      data: numbers(),
      borderColor: colorRed,
      backgroundColor: colorRed05,
      yAxisID: 'y',
    },
    {
      label: 'Dataset 2',
      data: numbers(),
      borderColor: colorBlue,
      backgroundColor: colorBlue05,
      yAxisID: 'y1',
    },
  ],
};
