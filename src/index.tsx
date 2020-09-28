import * as React from 'react';
// eslint-disable-next-line no-unused-vars
import { Props } from './types';
import ChartComponent from './chart';

export const Line = React.forwardRef((props: Props, ref) => (
  <ChartComponent {...props} type='line' ref={ref} />
));

export const Bar = React.forwardRef((props: Props, ref) => (
  <ChartComponent {...props} type='bar' ref={ref} />
));

export const HorizontalBar = React.forwardRef((props: Props, ref) => (
  <ChartComponent {...props} type='horizontalBar' ref={ref} />
));

export const Radar = React.forwardRef((props: Props, ref) => (
  <ChartComponent {...props} type='radar' ref={ref} />
));

export const Doughnut = React.forwardRef((props: Props, ref) => (
  <ChartComponent {...props} type='doughnut' ref={ref} />
));

export const PolarArea = React.forwardRef((props: Props, ref) => (
  <ChartComponent {...props} type='polarArea' ref={ref} />
));

export const Bubble = React.forwardRef((props: Props, ref) => (
  <ChartComponent {...props} type='bubble' ref={ref} />
));

export const Pie = React.forwardRef((props: Props, ref) => (
  <ChartComponent {...props} type='pie' ref={ref} />
));

export const Scatter = React.forwardRef((props: Props, ref) => (
  <ChartComponent {...props} type='scatter' ref={ref} />
));

export default ChartComponent;
