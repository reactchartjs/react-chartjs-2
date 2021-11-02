import React from 'react';
import { Bubble } from '../src';
import { data, options } from '../sandboxes/bubble/default/App';

export default {
  title: 'Components/Bubble',
  component: Bubble,
  parameters: {
    layout: 'centered',
  },
  args: {
    width: 500,
    height: 400,
  },
};

export const Default = args => <Bubble {...args} />;

Default.args = {
  data,
  options,
};
