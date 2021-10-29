import React from 'react';
import { Radar } from '../src';
import { data } from '../sandboxes/radar/default/App';

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
};
