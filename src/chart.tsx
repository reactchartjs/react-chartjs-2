import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  useMemo,
  forwardRef,
} from 'react';
import type { Ref, MouseEvent } from 'react';
import ChartJS from 'chart.js/auto';
import type { ChartData, ChartType, DefaultDataPoint } from 'chart.js';

import { Props, ChartJSOrUndefined, TypedChartComponent } from './types';

function ChartComponent<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
>(
  {
    height = 150,
    width = 300,
    redraw = false,
    type,
    data,
    options,
    plugins = [],
    getDatasetAtEvent,
    getElementAtEvent,
    getElementsAtEvent,
    fallbackContent,
    onClick: onClickProp,
    ...props
  }: Props<TType, TData, TLabel>,
  ref: Ref<ChartJS<TType, TData, TLabel>>
) {
  type TypedChartJS = ChartJSOrUndefined<TType, TData, TLabel>;
  type TypedChartData = ChartData<TType, TData, TLabel>;

  const canvas = useRef<HTMLCanvasElement>(null);

  const computedData = useMemo<TypedChartData>(() => {
    if (typeof data === 'function') {
      return canvas.current
        ? data(canvas.current)
        : {
            datasets: [],
          };
    } else return data;
  }, [data, canvas.current]);

  const [chart, setChart] = useState<TypedChartJS>();

  useImperativeHandle<TypedChartJS, TypedChartJS>(ref, () => chart, [chart]);

  const renderChart = () => {
    if (!canvas.current) return;

    setChart(
      new ChartJS(canvas.current, {
        type,
        data: computedData,
        options,
        plugins,
      })
    );
  };

  const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
    if (onClickProp) {
      onClickProp(event);
    }

    if (!chart) return;

    getDatasetAtEvent &&
      getDatasetAtEvent(
        chart.getElementsAtEventForMode(
          event.nativeEvent,
          'dataset',
          { intersect: true },
          false
        ),
        event
      );
    getElementAtEvent &&
      getElementAtEvent(
        chart.getElementsAtEventForMode(
          event.nativeEvent,
          'nearest',
          { intersect: true },
          false
        ),
        event
      );
    getElementsAtEvent &&
      getElementsAtEvent(
        chart.getElementsAtEventForMode(
          event.nativeEvent,
          'index',
          { intersect: true },
          false
        ),
        event
      );
  };

  const updateChart = () => {
    if (!chart) return;

    if (options) {
      chart.options = { ...options };
    }

    if (!chart.config.data) {
      chart.config.data = computedData;
      chart.update();
      return;
    }

    const { datasets: newDataSets = [], ...newChartData } = computedData;
    const { datasets: currentDataSets = [] } = chart.config.data;

    // copy values
    Object.assign(chart.config.data, newChartData);

    chart.config.data.datasets = newDataSets.map((newDataSet: any) => {
      // given the new set, find it's current match
      const currentDataSet = currentDataSets.find(
        d => d.label === newDataSet.label && d.type === newDataSet.type
      );

      // There is no original to update, so simply add new one
      if (!currentDataSet || !newDataSet.data) return { ...newDataSet };

      if (!currentDataSet.data) {
        // @ts-expect-error Need to refactor
        currentDataSet.data = [];
      } else {
        // @ts-expect-error Need to refactor
        currentDataSet.data.length = newDataSet.data.length;
      }

      // copy in values
      Object.assign(currentDataSet.data, newDataSet.data);

      // apply dataset changes, but keep copied data
      Object.assign(currentDataSet, {
        ...newDataSet,
        data: currentDataSet.data,
      });
      return currentDataSet;
    });

    chart.update();
  };

  const destroyChart = () => {
    if (chart) chart.destroy();
  };

  useEffect(() => {
    renderChart();

    return () => destroyChart();
  }, []);

  useEffect(() => {
    if (redraw) {
      destroyChart();
      setTimeout(() => {
        renderChart();
      }, 0);
    } else {
      updateChart();
    }
  });

  return (
    <canvas
      ref={canvas}
      role='img'
      height={height}
      width={width}
      onClick={onClick}
      {...props}
    >
      {fallbackContent}
    </canvas>
  );
}

export const Chart = forwardRef(ChartComponent) as TypedChartComponent;
