import React, { useState, useEffect, useRef, useReducer, useMemo } from 'react';
import 'chart.js/auto';
import type { InteractionItem } from 'chart.js';
import { Chart as ChartJS } from 'chart.js';
import 'chartjs-adapter-date-fns';
import annotationPlugin from 'chartjs-plugin-annotation';
import zoomPlugin from 'chartjs-plugin-zoom';

import {
  Chart,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from '../src';
import * as multitypeChart from '../sandboxes/chart/multitype/App';
import * as eventsChart from '../sandboxes/chart/events/App';
import * as data from './Chart.data';

ChartJS.register(annotationPlugin, zoomPlugin);

// Container Component
const ChartContainer = ({ data, options }) => {
  const [dynamicData, setDynamicData] = useState(data.getDynamicData);

  useEffect(() => {
    const interval = setInterval(
      () => setDynamicData(data.getDynamicData()),
      3000
    );

    return () => clearInterval(interval);
  }, []);

  const chartRef = useRef<ChartJS>(null);

  const onDatasetClick = (datasetIndex) => {
    // Handle dataset click
    // Works only when "datasetEvents" is enabled
  };

  const onElementClick = (index, datasetIndex) => {
    // Handle element click
    // Works only when "elementEvents" is enabled
  };

  const onElementsClick = (elements) => {
    // Handle elements click
    // Works only when "elementsEvents" is enabled
  };

  const onClick = (event) => {
    const { current: chart } = chartRef;

    if (!chart) {
      return;
    }

    const dataset = getDatasetAtEvent(chart, event);
    const element = getElementAtEvent(chart, event);
    const elements = getElementsAtEvent(chart, event);

    if (dataset.length) {
      const datasetIndex = dataset[0].datasetIndex;
      onDatasetClick(datasetIndex);
    }

    if (element.length) {
      const { datasetIndex, index } = element[0];
      onElementClick(index, datasetIndex);
    }

    if (elements.length) {
      onElementsClick(elements);
    }
  };

  return (
    <Chart
      ref={chartRef}
      type='bar'
      options={options}
      data={dynamicData}
      onClick={onClick}
    />
  );
};

// Presentational Components
export const MultiType = (args) => <ChartContainer {...args} data={multitypeChart.data} />;
export const Dynamic = (args) => <ChartContainer {...args} data={data} />;
export const ClickEvents = (args) => <ChartContainer {...args} data={eventsChart.data} />;
export const Redraw = (args) => <ChartContainer {...args} data={multitypeChart.data} />;
export const SameDataToggle = (args) => {
  const [currentData, toggleData] = useReducer(
    (prevState) =>
      prevState === data.sameData1 ? data.sameData2 : data.sameData1,
    data.sameData1
  );

  return <ChartContainer {...args} data={currentData} onClick={toggleData} />;
};
export const Decimation = (args) => {
  const[currentData, toggleData] = useReducer(
    data.getDecimationData,
    data.getDecimationData()
  );

  return <ChartContainer {...args} data={currentData} onClick={toggleData} />;
};
export const DynamicOptions = (args) => {
  const [yMax, setYMax] = useState(100);
  const options = useMemo(
    () => ({
      plugins: {
        annotation: {
          annotations: {
            box1: {
              type: 'box',
              xMin: 1,
              xMax: 2,
              yMin: 50,
              yMax: yMax,
              backgroundColor: 'rgba(255, 99, 132, 0.25)',
            },
          },
        },
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: 'xy',
          },
        },
      },
    }),
    [yMax]
  );

  return (
    <>
      <button onClick={() => setYMax((y) => y + 10)}>Update options</button>
      <ChartContainer {...args} options={options} />
    </>
  );
};
