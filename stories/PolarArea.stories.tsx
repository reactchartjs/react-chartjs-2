import React from 'react';
import 'chart.js/auto';
import { PolarArea } from '../src';
import { data } from '../sandboxes/polarArea/default/App';

export default {
  title: 'Components/PolarArea',
  component: PolarArea,
  parameters: {
    layout: 'centered',
  },
  args: {
    width: 500,
    height: 400,
  },
};

export const Default = args => <PolarArea {...args} />;

Default.args = {
  data,
};
