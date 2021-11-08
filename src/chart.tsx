import React, { useEffect, useRef, forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { Chart as ChartJS } from 'chart.js';
import type { ChartType, DefaultDataPoint } from 'chart.js';

import type { ChartProps, TypedChartComponent } from './types';
import {
  reforwardRef,
  cloneData,
  setOptions,
  setLabels,
  setDatasets,
} from './utils';

function ChartComponent<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
>(
  {
    height = 150,
    width = 300,
    redraw = false,
    datasetIdKey,
    type,
    data,
    options,
    plugins = [],
    fallbackContent,
    ...props
  }: ChartProps<TType, TData, TLabel>,
  ref: ForwardedRef<ChartJS<TType, TData, TLabel>>
) {
  type TypedChartJS = ChartJS<TType, TData, TLabel>;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<TypedChartJS | null>();

  const renderChart = () => {
    if (!canvasRef.current) return;

    chartRef.current = new ChartJS(canvasRef.current, {
      type,
      data: cloneData(data, datasetIdKey),
      options,
      plugins,
    });

    reforwardRef(ref, chartRef.current);
  };

  const destroyChart = () => {
    reforwardRef(ref, null);

    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }
  };

  useEffect(() => {
    if (!redraw && chartRef.current && options) {
      setOptions(chartRef.current, options);
    }
  }, [redraw, options]);

  useEffect(() => {
    if (!redraw && chartRef.current) {
      setLabels(chartRef.current.config.data, data.labels);
    }
  }, [redraw, data.labels]);

  useEffect(() => {
    if (!redraw && chartRef.current && data.datasets) {
      setDatasets(chartRef.current.config.data, data.datasets, datasetIdKey);
    }
  }, [redraw, data.datasets]);

  useEffect(() => {
    if (!chartRef.current) return;

    if (redraw) {
      destroyChart();
      setTimeout(renderChart);
    } else {
      chartRef.current.update();
    }
  }, [redraw, options, data.labels, data.datasets]);

  useEffect(() => {
    renderChart();

    return () => destroyChart();
  }, []);

  return (
    <canvas ref={canvasRef} role='img' height={height} width={width} {...props}>
      {fallbackContent}
    </canvas>
  );
}

export const Chart = forwardRef(ChartComponent) as TypedChartComponent;
