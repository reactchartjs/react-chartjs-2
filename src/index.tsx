import React, { forwardRef } from 'react';
// eslint-disable-next-line no-unused-vars
import ChartComponent from './chart';

export const Line = forwardRef<any, any>((props, ref) => (
  <ChartComponent {...props} type='line' ref={ref} />
));

export const Bar = forwardRef<any, any>((props, ref) => (
  <ChartComponent {...props} type='bar' ref={ref} />
));

export const Radar = forwardRef<any, any>((props, ref) => (
  <ChartComponent {...props} type='radar' ref={ref} />
));

export const Doughnut = forwardRef<any, any>((props, ref) => (
  <ChartComponent {...props} type='doughnut' ref={ref} />
));

export const PolarArea = forwardRef<any, any>((props, ref) => (
  <ChartComponent {...props} type='polarArea' ref={ref} />
));

export const Bubble = forwardRef<any, any>((props, ref) => (
  <ChartComponent {...props} type='bubble' ref={ref} />
));

export const Pie = forwardRef<any, any>((props, ref) => (
  <ChartComponent {...props} type='pie' ref={ref} />
));

export const Scatter = forwardRef<any, any>((props, ref) => (
  <ChartComponent {...props} type='scatter' ref={ref} />
));

export default ChartComponent;
