import React from 'react';
import { Scatter } from '../src';
import { data, options } from '../sandboxes/scatter/default/App';

export default {
  title: 'Components/Scatter',
  component: Scatter,
  parameters: {
    layout: 'centered',
  },
  args: {
    width: 500,
    height: 400,
  },
};

export const Default = args => <Scatter {...args} />;

Default.args = {
  data,
  options,
};
