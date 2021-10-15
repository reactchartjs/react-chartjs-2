import React from 'react';
import { Line } from '../src';
import * as data from './Line.data';

export default {
  title: 'Components/Line',
  component: Line,
  parameters: {
    layout: 'centered',
  },
  args: {
    width: 500,
    height: 400,
  },
};

export const Default = args => <Line {...args} />;

Default.args = {
  data: data.data,
  options: data.options,
};

export const MultiAxis = args => <Line {...args} />;

MultiAxis.args = {
  data: data.multiAxisData,
  options: data.multiAxisOptions,
};
