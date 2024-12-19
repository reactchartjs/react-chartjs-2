import React, { useState, useEffect } from 'react';
import 'chart.js/auto';
import { Doughnut } from '../src';
import { data } from '../sandboxes/doughnut/default/App';

export default {
  title: 'Components/Doughnut',
  component: Doughnut,
  parameters: {
    layout: 'centered',
  },
  args: {
    width: 500,
    height: 400,
  },
};

export const Default = args => <Doughnut {...args} />;

Default.args = {
  data,
};

export const Rotation = args => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(rotation => rotation + 90);
    }, 3000);

    return () => clearInterval(interval);
  });

  return <Doughnut {...args} options={{ rotation }} />;
};

Rotation.args = {
  data,
};
