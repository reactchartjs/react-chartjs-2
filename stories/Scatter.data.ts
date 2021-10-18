import faker from 'faker';

function pos() {
  return {
    x: faker.datatype.number({ min: -10, max: 10 }),
    y: faker.datatype.number({ min: -10, max: 10 }),
  };
}

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export const data = {
  datasets: [
    {
      label: 'A dataset',
      data: Array.from({ length: 15 }, pos),
      backgroundColor: 'rgba(255, 99, 132, 1)',
    },
  ],
};
