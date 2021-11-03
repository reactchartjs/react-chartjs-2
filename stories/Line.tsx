import React from 'react';
import 'chart.js/auto';
import { Line } from '../src';
import * as defaultLine from '../sandboxes/line/default/App';
import * as multiaxisLine from '../sandboxes/line/multiaxis/App';

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
  data: defaultLine.data,
  options: defaultLine.options,
};

export const MultiAxis = args => <Line {...args} />;

MultiAxis.args = {
  data: multiaxisLine.data,
  options: multiaxisLine.options,
};
