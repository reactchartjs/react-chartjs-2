import * as React from 'react'
// eslint-disable-next-line no-unused-vars
import { Props } from './types'
import ChartComponent from './chart'

export const LineChart = React.forwardRef((props: Props, ref) => (
  <ChartComponent {...props} type='line' ref={ref} />
))

export const BarChart = React.forwardRef((props: Props, ref) => (
  <ChartComponent {...props} type='bar' ref={ref} />
))

export const HorizontalBarChart = React.forwardRef((props: Props, ref) => (
  <ChartComponent {...props} type='horizontalBar' ref={ref} />
))

export const RadarChart = React.forwardRef((props: Props, ref) => (
  <ChartComponent {...props} type='radar' ref={ref} />
))

export const DoughnutChart = React.forwardRef((props: Props, ref) => (
  <ChartComponent {...props} type='doughnut' ref={ref} />
))

export const PolarAreaChart = React.forwardRef((props: Props, ref) => (
  <ChartComponent {...props} type='polarArea' ref={ref} />
))

export const BubbleChart = React.forwardRef((props: Props, ref) => (
  <ChartComponent {...props} type='bubble' ref={ref} />
))

export const PieChart = React.forwardRef((props: Props, ref) => (
  <ChartComponent {...props} type='pie' ref={ref} />
))

export const ScatterChart = React.forwardRef((props: Props, ref) => (
  <ChartComponent {...props} type='scatter' ref={ref} />
))

export default ChartComponent
