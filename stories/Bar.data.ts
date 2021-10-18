import {
  months,
  colorRed,
  colorRed05,
  colorGreen,
  colorBlue,
  colorBlue05,
  numbers,
} from './data';

export const verticalOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

export const verticalData = {
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

export const horizontalOptions = {
  indexAxis: 'y',
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
};

export const horizontalData = verticalData;

export const stackedOptions = {
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export const stackedData = {
  labels: months,
  datasets: [
    {
      label: 'Dataset 1',
      data: numbers(),
      backgroundColor: colorRed,
    },
    {
      label: 'Dataset 2',
      data: numbers(),
      backgroundColor: colorBlue,
    },
    {
      label: 'Dataset 3',
      data: numbers(),
      backgroundColor: colorGreen,
    },
  ],
};

export const groupedOptions = {
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export const groupedData = {
  labels: months,
  datasets: [
    {
      label: 'Dataset 1',
      data: numbers(),
      backgroundColor: colorRed,
      stack: 'Stack 0',
    },
    {
      label: 'Dataset 2',
      data: numbers(),
      backgroundColor: colorBlue,
      stack: 'Stack 0',
    },
    {
      label: 'Dataset 3',
      data: numbers(),
      backgroundColor: colorGreen,
      stack: 'Stack 1',
    },
  ],
};
