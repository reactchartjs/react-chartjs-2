import React, { forwardRef } from 'react';
import { ChartType } from 'chart.js';

import { ChartProps, ChartJSOrUndefined, TypedChartComponent } from './types';
import { Chart } from './chart';

function createTypedChart<T extends ChartType>(type: T) {
  return forwardRef<ChartJSOrUndefined<T>, Omit<ChartProps<T>, 'type'>>(
    (props, ref) => <Chart {...props} ref={ref} type={type} />
  ) as TypedChartComponent<T, true>;
}

export const Line = createTypedChart('line');

export const Bar = createTypedChart('bar');

export const Radar = createTypedChart('radar');

export const Doughnut = createTypedChart('doughnut');

export const PolarArea = createTypedChart('polarArea');

export const Bubble = createTypedChart('bubble');

export const Pie = createTypedChart('pie');

export const Scatter = createTypedChart('scatter');
