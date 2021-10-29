import faker from 'faker';
import { colorRed } from './data';

export const dynamicOptions = {
  scales: {
    y: {
      beginAtZero: true,
    },
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

export const sameData1 = {
  labels: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(75,192,192,0.4)',
      data: [33, 53, 85, 41, 44, 65, 61, 47, 52, 53, 62, 82],
    },
    {
      label: 'My Second dataset',
      backgroundColor: '#742774',
      data: [33, 25, 35, 51, 54, 76, 65, 40, 42, 39, 51, 55],
    },
  ],
};

export const sameData2 = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(75,192,192,0.4)',
      data: [42, 13, 45, 29, 44, 25, 27],
    },
    {
      label: 'My Second dataset',
      backgroundColor: '#742774',
      data: [33, 25, 35, 44, 50, 40, 48],
    },
  ],
};

export const decimationOptions = {
  // Turn off animations and data parsing for performance
  animation: false,
  parsing: false,

  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false,
  },
  plugins: {
    decimation: {
      enabled: true,
      algorithm: 'lttb',
      samples: 500,
    },
  },
  scales: {
    x: {
      type: 'time',
      ticks: {
        source: 'auto',
        // Disabled rotation for performance
        maxRotation: 0,
        autoSkip: true,
      },
    },
  },
};

export const getDecimationData = () => {
  const start = Date.now();
  const data = Array.from({ length: 100000 }, (_, i) => ({
    x: start + i * 30000,
    y: faker.datatype.number({ min: 0, max: Math.random() < 0.001 ? 100 : 20 }),
  }));

  return {
    datasets: [
      {
        borderColor: colorRed,
        borderWidth: 1,
        data,
        label: 'Large Dataset',
        radius: 0,
      },
    ],
  };
};
