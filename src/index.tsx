// @todo Remove these exports
export { default as Chart } from 'chart.js/auto';
export { defaults } from 'chart.js';

// @todo Make named export instead of default
export { Chart as default } from './chart';
export * from './typedCharts';
