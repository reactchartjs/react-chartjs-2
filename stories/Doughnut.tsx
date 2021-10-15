import React from 'react';
import { Doughnut } from '../src';
import { data } from './Doughnut.data';

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
