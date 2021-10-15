import React, { useState, useEffect } from 'react';
import { InteractionItem } from 'chart.js';
import Chart from '../src';
import * as data from './Chart.data';

export default {
  title: 'Components/Chart',
  component: Chart,
  parameters: {
    layout: 'centered',
  },
  args: {
    width: 500,
    height: 400,
  },
};

export const MultiType = args => <Chart {...args} />;

MultiType.args = {
  data: data.multiTypeData,
};

export const Dynamic = args => {
  const [dynamicData, setDynamicData] = useState(data.getDynamicData);

  useEffect(() => {
    const interval = setInterval(
      () => setDynamicData(data.getDynamicData()),
      3000
    );

    return () => clearInterval(interval);
  }, []);

  return <Chart {...args} data={dynamicData} />;
};

Dynamic.args = {
  options: data.dynamicOptions,
};

export const ClickEvents = ({
  onDatasetClick,
  onElementClick,
  onElementsClick,
  options,
  data,
  ...args
}) => {
  const getDatasetAtEvent = (dataset: InteractionItem[]) => {
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;

    onDatasetClick(data.datasets[datasetIndex].label);
  };

  const getElementAtEvent = (element: InteractionItem[]) => {
    if (!element.length) return;

    const { datasetIndex, index } = element[0];

    onElementClick(data.labels[index], data.datasets[datasetIndex].data[index]);
  };

  const getElementsAtEvent = (elements: InteractionItem[]) => {
    if (!elements.length) return;

    onElementsClick(elements);
  };

  return (
    <Chart
      {...args}
      type='bar'
      options={options}
      data={data}
      getDatasetAtEvent={getDatasetAtEvent}
      getElementAtEvent={getElementAtEvent}
      getElementsAtEvent={getElementsAtEvent}
    />
  );
};

ClickEvents.args = {
  options: data.eventsOptions,
  data: data.eventsData,
};

ClickEvents.argTypes = {
  onDatasetClick: { action: 'dataset clicked' },
  onElementClick: { action: 'element clicked' },
  onElementsClick: { action: 'elements clicked' },
};
