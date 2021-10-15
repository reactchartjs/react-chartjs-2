import faker from 'faker';

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
];
export const colorRed = 'rgb(255, 99, 132)';
export const colorRed05 = 'rgba(255, 99, 132, 0.5)';
export const colorGreen = 'rgb(75, 192, 192)';
export const colorGreen05 = 'rgba(75, 192, 192, 0.5)';
export const colorBlue = 'rgb(53, 162, 235)';
export const colorBlue05 = 'rgba(53, 162, 235, 0.5)';

export function numbers(count = months.length) {
  return Array.from({ length: count }, () =>
    faker.datatype.number({ min: -100, max: 100 })
  );
}
