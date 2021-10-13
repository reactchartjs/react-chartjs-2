import React, { forwardRef } from 'react';
import Chart, { defaults } from 'chart.js/auto';

import { Props } from './types';
import ChartComponent from './chart';

export const Line = forwardRef<Chart | undefined, Omit<Props, 'type'>>(
  (props, ref) => (
    <ChartComponent
      {...props}
      type='line'
      ref={ref}
      options={props.options || {}}
    />
  )
);

export const Bar = forwardRef<Chart | undefined, Omit<Props, 'type'>>(
  (props, ref) => (
    <ChartComponent
      {...props}
      type='bar'
      ref={ref}
      options={props.options || {}}
    />
  )
);

export const Radar = forwardRef<Chart | undefined, Omit<Props, 'type'>>(
  (props, ref) => (
    <ChartComponent
      {...props}
      type='radar'
      ref={ref}
      options={props.options || {}}
    />
  )
);

export const Doughnut = forwardRef<Chart | undefined, Omit<Props, 'type'>>(
  (props, ref) => (
    <ChartComponent
      {...props}
      type='doughnut'
      ref={ref}
      options={props.options || {}}
    />
  )
);

export const PolarArea = forwardRef<Chart | undefined, Omit<Props, 'type'>>(
  (props, ref) => (
    <ChartComponent
      {...props}
      type='polarArea'
      ref={ref}
      options={props.options || {}}
    />
  )
);

export const Bubble = forwardRef<Chart | undefined, Omit<Props, 'type'>>(
  (props, ref) => (
    <ChartComponent
      {...props}
      type='bubble'
      ref={ref}
      options={props.options || {}}
    />
  )
);

export const Pie = forwardRef<Chart | undefined, Omit<Props, 'type'>>(
  (props, ref) => (
    <ChartComponent
      {...props}
      type='pie'
      ref={ref}
      options={props.options || {}}
    />
  )
);

export const Scatter = forwardRef<Chart | undefined, Omit<Props, 'type'>>(
  (props, ref) => (
    <ChartComponent
      {...props}
      type='scatter'
      ref={ref}
      options={props.options || {}}
    />
  )
);

export { Chart, defaults };

export default ChartComponent;
