import faker from 'faker';
import { months, colorRed, colorGreen, colorBlue, numbers } from './data';

export const multiTypeData = {
  labels: months,
  datasets: [
    {
      type: 'line',
      label: 'Dataset 1',
      borderColor: colorRed,
      borderWidth: 2,
      fill: false,
      data: Array.from({ length: 6 }, () =>
        faker.datatype.number({ min: -10, max: 10 })
      ),
    },
    {
      type: 'bar',
      label: 'Dataset 2',
      backgroundColor: colorGreen,
      data: Array.from({ length: 7 }, () =>
        faker.datatype.number({ min: -10, max: 10 })
      ),
      borderColor: 'white',
      borderWidth: 2,
    },
    {
      type: 'bar',
      label: 'Dataset 3',
      backgroundColor: colorBlue,
      data: Array.from({ length: 7 }, () =>
        faker.datatype.number({ min: -10, max: 10 })
      ),
    },
  ],
};

export const dynamicOptions = {
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

export const getDynamicData = () => ({
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      type: 'bar',
      label: 'Scale',
      data: Array.from({ length: 6 }, () =>
        faker.datatype.number({ min: -10, max: 10 })
      ),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
});

export const eventsOptions = {
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

export const eventsData = {
  labels: months,
  datasets: [
    {
      type: 'line',
      label: 'Dataset 1',
      borderColor: colorRed,
      borderWidth: 2,
      fill: false,
      data: numbers(),
    },
    {
      type: 'bar',
      label: 'Dataset 2',
      backgroundColor: colorGreen,
      data: numbers(),
      borderColor: 'white',
      borderWidth: 2,
    },
    {
      type: 'bar',
      label: 'Dataset 3',
      backgroundColor: colorBlue,
      data: numbers(),
    },
  ],
};
