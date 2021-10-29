import React from 'react';
import { Bar } from '../src';
import * as verticalBar from '../sandboxes/bar/vertical/App';
import * as horizontalBar from '../sandboxes/bar/horizontal/App';
import * as stackedBar from '../sandboxes/bar/stacked/App';
import * as groupedBar from '../sandboxes/bar/grouped/App';

export default {
  title: 'Components/Bar',
  component: Bar,
  parameters: {
    layout: 'centered',
  },
  args: {
    width: 500,
    height: 400,
  },
};

export const Vertical = args => <Bar {...args} />;

Vertical.args = {
  data: verticalBar.data,
  options: verticalBar.options,
};

export const Horizontal = args => <Bar {...args} />;

Horizontal.args = {
  data: horizontalBar.data,
  options: horizontalBar.options,
};

export const Stacked = args => <Bar {...args} />;

Stacked.args = {
  data: stackedBar.data,
  options: stackedBar.options,
};

export const Grouped = args => <Bar {...args} />;

Grouped.args = {
  data: groupedBar.data,
  options: groupedBar.options,
};
