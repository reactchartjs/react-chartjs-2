import React from 'react';
import { Radar } from '../src';
import { data, options } from './Radar.data';

export default {
  title: 'Components/Radar',
  component: Radar,
  parameters: {
    layout: 'centered',
  },
  args: {
    width: 500,
    height: 400,
  },
};

export const Default = args => <Radar {...args} />;

Default.args = {
  data,
  options,
};
