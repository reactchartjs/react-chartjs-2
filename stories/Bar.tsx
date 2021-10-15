import React from 'react';
import { Bar } from '../src';
import * as data from './Bar.data';

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
  data: data.verticalData,
  options: data.verticalOptions,
};

export const Horizontal = args => <Bar {...args} />;

Horizontal.args = {
  data: data.horizontalData,
  options: data.horizontalOptions,
};

export const Stacked = args => <Bar {...args} />;

Stacked.args = {
  data: data.stackedData,
  options: data.stackedOptions,
};

export const Grouped = args => <Bar {...args} />;

Grouped.args = {
  data: data.groupedData,
  options: data.groupedOptions,
};
