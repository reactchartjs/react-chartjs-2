import React, { forwardRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { Props } from './types';
import ChartComponent from './chart';

export const Line = forwardRef<Chart | undefined, Props>((props, ref) => (
  <ChartComponent {...props} type='line' ref={ref} />
));

export const Bar = forwardRef<Chart | undefined, Props>((props, ref) => (
  <ChartComponent {...props} type='bar' ref={ref} />
));

export const HorizontalBar = forwardRef<Chart | undefined, Props>(
  (props, ref) => <ChartComponent {...props} type='horizontalBar' ref={ref} />
);

export const Radar = forwardRef<Chart | undefined, Props>((props, ref) => (
  <ChartComponent {...props} type='radar' ref={ref} />
));

export const Doughnut = forwardRef<Chart | undefined, Props>((props, ref) => (
  <ChartComponent {...props} type='doughnut' ref={ref} />
));

export const PolarArea = forwardRef<Chart | undefined, Props>((props, ref) => (
  <ChartComponent {...props} type='polarArea' ref={ref} />
));

export const Bubble = forwardRef<Chart | undefined, Props>((props, ref) => (
  <ChartComponent {...props} type='bubble' ref={ref} />
));

export const Pie = forwardRef<Chart | undefined, Props>((props, ref) => (
  <ChartComponent {...props} type='pie' ref={ref} />
));

export const Scatter = forwardRef<Chart | undefined, Props>((props, ref) => (
  <ChartComponent {...props} type='scatter' ref={ref} />
));

export default ChartComponent;
