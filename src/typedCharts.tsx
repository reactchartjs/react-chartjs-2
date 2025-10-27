import { forwardRef } from 'react';
import {
  Chart as ChartJS,
  LineController,
  BarController,
  RadarController,
  DoughnutController,
  PolarAreaController,
  BubbleController,
  PieController,
  ScatterController,
} from 'chart.js';
import type { ChartType, ChartComponentLike } from 'chart.js';

import type {
  ChartProps,
  ChartJSOrUndefined,
  TypedChartComponent,
} from './types.js';
import { Chart } from './chart.js';

function createTypedChart<T extends ChartType>(
  type: T,
  registerables: ChartComponentLike
) {
  ChartJS.register(registerables);

  return forwardRef<ChartJSOrUndefined<T>, Omit<ChartProps<T>, 'type'>>(
    (props, ref) => <Chart {...props} ref={ref} type={type} />
  ) as TypedChartComponent<T>;
}

export const Line = /* #__PURE__ */ createTypedChart('line', LineController);

export const Bar = /* #__PURE__ */ createTypedChart('bar', BarController);

export const Radar = /* #__PURE__ */ createTypedChart('radar', RadarController);

export const Doughnut = /* #__PURE__ */ createTypedChart(
  'doughnut',
  DoughnutController
);

export const PolarArea = /* #__PURE__ */ createTypedChart(
  'polarArea',
  PolarAreaController
);

export const Bubble = /* #__PURE__ */ createTypedChart(
  'bubble',
  BubbleController
);

export const Pie = /* #__PURE__ */ createTypedChart('pie', PieController);

export const Scatter = /* #__PURE__ */ createTypedChart(
  'scatter',
  ScatterController
);
