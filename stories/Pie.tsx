import React from 'react';
import { Pie } from '../src';
import { data } from './Pie.data';

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
