import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  useMemo,
  forwardRef,
} from 'react';
// eslint-disable-next-line no-unused-vars
import { Props } from './types';

import Chart from 'chart.js/auto';

import merge from 'lodash/merge';
import assign from 'lodash/assign';
import find from 'lodash/find';

const ChartComponent = forwardRef<Chart | undefined, Props>((props, ref) => {
  const {
    id,
    className,
    height = 150,
    width = 300,
    redraw = false,
    type,
    data,
    options = {},
    plugins = [],
    getDatasetAtEvent,
    getElementAtEvent,
    getElementsAtEvent,
    fallbackContent,
    ...rest
  } = props;

  const canvas = useRef<HTMLCanvasElement>(null);

  const computedData = useMemo<Chart.ChartData>(() => {
    if (typeof data === 'function') {
      return canvas.current ? data(canvas.current) : {};
    } else return merge({}, data);
  }, [data, canvas.current]);

  const [chart, setChart] = useState<Chart>();

  useImperativeHandle<Chart | undefined, Chart | undefined>(ref, () => chart, [
    chart,
  ]);

  const renderChart = () => {
    if (!canvas.current) return;

    setChart(
      new Chart(canvas.current, {
        type,
        data: computedData,
        options,
        plugins,
      })
    );
  };

  const onClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!chart) return;

    getDatasetAtEvent &&
      getDatasetAtEvent(
        chart.getElementsAtEventForMode(
          e,
          'dataset',
          { intersect: true },
          false
        ),
        e
      );
    getElementAtEvent &&
      getElementAtEvent(
        chart.getElementsAtEventForMode(
          e,
          'nearest',
          { intersect: true },
          false
        ),
        e
      );
    getElementsAtEvent &&
      getElementsAtEvent(
        chart.getElementsAtEventForMode(e, 'index', { intersect: true }, false),
        e
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
    assign(chart.config.data, newChartData);
    chart.config.data.datasets = newDataSets.map((newDataSet: any) => {
      // given the new set, find it's current match
      const currentDataSet = find(
        currentDataSets,
        d => d.label === newDataSet.label && d.type === newDataSet.type
      );

      // There is no original to update, so simply add new one
      if (!currentDataSet || !newDataSet.data) return newDataSet;

      if (!currentDataSet.data) {
        currentDataSet.data = [];
      } else {
        currentDataSet.data.length = newDataSet.data.length;
      }

      // copy in values
      assign(currentDataSet.data, newDataSet.data);

      // apply dataset changes, but keep copied data
      return {
        ...currentDataSet,
        ...newDataSet,
        data: currentDataSet.data,
      };
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
  }, [props, computedData]);

  return (
    <canvas
      {...rest}
      height={height}
      width={width}
      ref={canvas}
      id={id}
      className={className}
      onClick={onClick}
      data-testid='canvas'
      role='img'
    >
      {fallbackContent}
    </canvas>
  );
});

export default ChartComponent;
