import React, { forwardRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { Props } from './types';
import ChartComponent from './chart';
// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';
import * as chartjs from 'chart.js';

export const Line = forwardRef<Chart | undefined, Props>((props, ref) => (
  <ChartComponent
    {...props}
    type='line'
    ref={ref}
    options={props.options || {}}
  />
));

export const Bar = forwardRef<Chart | undefined, Props>((props, ref) => (
  <ChartComponent
    {...props}
    type='bar'
    ref={ref}
    options={props.options || {}}
  />
));

export const Radar = forwardRef<Chart | undefined, Props>((props, ref) => (
  <ChartComponent
    {...props}
    type='radar'
    ref={ref}
    options={props.options || {}}
  />
));

export const Doughnut = forwardRef<Chart | undefined, Props>((props, ref) => (
  <ChartComponent
    {...props}
    type='doughnut'
    ref={ref}
    options={props.options || {}}
  />
));

export const PolarArea = forwardRef<Chart | undefined, Props>((props, ref) => (
  <ChartComponent
    {...props}
    type='polarArea'
    ref={ref}
    options={props.options || {}}
  />
));

export const Bubble = forwardRef<Chart | undefined, Props>((props, ref) => (
  <ChartComponent
    {...props}
    type='bubble'
    ref={ref}
    options={props.options || {}}
  />
));

export const Pie = forwardRef<Chart | undefined, Props>((props, ref) => (
  <ChartComponent
    {...props}
    type='pie'
    ref={ref}
    options={props.options || {}}
  />
));

export const Scatter = forwardRef<Chart | undefined, Props>((props, ref) => (
  <ChartComponent
    {...props}
    type='scatter'
    ref={ref}
    options={props.options || {}}
  />
));

export const defaults = chartjs.defaults;

export const Chart = chartjs.Chart;

export default ChartComponent;
