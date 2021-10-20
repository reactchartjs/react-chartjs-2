import React, { useState } from 'react';
import { Pie } from '../src';
import { data, randomDataset } from './Pie.data';

export default {
  title: 'Components/Pie',
  component: Pie,
  parameters: {
    layout: 'centered',
  },
  args: {
    width: 500,
    height: 400,
  },
};

export const Default = args => <Pie {...args} />;

Default.args = {
  data,
};

export const Dynamic = args => {
  const [datasets, setDatasets] = useState(() => [randomDataset()]);
  const onAdd = () => {
    setDatasets(datasets => [...datasets, randomDataset()]);
  };
  const onRemove = () => {
    setDatasets(datasets => datasets.slice(0, -1));
  };
  const data = {
    labels: datasets.map((_, i) => `#${i}`),
    datasets: [
      {
        data: datasets.map(({ value }) => value),
        backgroundColor: datasets.map(({ color }) => color),
      },
    ],
  };

  return (
    <>
      <Pie {...args} data={data} />
      <button onClick={onRemove}>Remove</button>
      <button onClick={onAdd}>Add</button>
      <ul>
        {datasets.map(({ value, color }, i) => (
          <li key={i} style={{ backgroundColor: color }}>
            {value}
          </li>
        ))}
      </ul>
    </>
  );
};
