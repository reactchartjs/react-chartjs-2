import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Welcome from './Welcome';

import DoughnutExample from '../example/src/components/doughnut';
import DynamicDoughnutExample from '../example/src/components/dynamic-doughnut';
import PieExample from '../example/src/components/pie';
import LineExample from '../example/src/components/line';
import BarExample from '../example/src/components/bar';
import HorizontalBarExample from '../example/src/components/horizontalBar';
import RadarExample from '../example/src/components/radar';
import PolarExample from '../example/src/components/polar';
import MixedDataExample from '../example/src/components/mix';

storiesOf('Welcome', module)
  .add('to react-chartjs-2', () => (
    <Welcome />
  ));

storiesOf('Doughnut Example', module)
  .add('Basic Example', () => (
    <DoughnutExample />
  ));
storiesOf('DynamicDoughnut Example', module)
  .add('Basic Example', () => (
    <DynamicDoughnutExample />
  ));
storiesOf('Pie Example', module)
  .add('Basic Example', () => (
    <PieExample />
  ));
storiesOf('Line Example', module)
  .add('Basic Example', () => (
    <LineExample />
  ));
storiesOf('Bar Example', module)
  .add('Basic Example', () => (
    <BarExample />
  ));
storiesOf('HorizontalBar Example', module)
  .add('Basic Example', () => (
    <HorizontalBarExample />
  ));
storiesOf('Radar Example', module)
  .add('Basic Example', () => (
    <RadarExample />
  ));
storiesOf('Polar Example', module)
  .add('Basic Example', () => (
    <PolarExample />
  ));
