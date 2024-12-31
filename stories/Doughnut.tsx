import React, { useState, useEffect } from 'react';
import 'chart.js/auto';
import { Doughnut } from '../src';
import { data } from '../sandboxes/doughnut/default/App';

// Interface for the chart factory
interface ChartFactory {
  createChart(args: any): JSX.Element;
}

// Implementation of the Doughnut chart factory
class DoughnutFactory implements ChartFactory {
  /**
   * Creates a Doughnut chart with the given arguments.
   * @param args - The arguments to pass to the Doughnut component.
   * @returns A JSX element representing the Doughnut chart.
   */
  createChart(args: any): JSX.Element {
    return <Doughnut {...args} />;
  }
}

// Implementation of the Rotating Doughnut chart factory
class RotatingDoughnutFactory implements ChartFactory {
  /**
   * Creates a Rotating Doughnut chart with the given arguments.
   * @param args - The arguments to pass to the Doughnut component.
   * @returns A JSX element representing the Rotating Doughnut chart.
   */
  createChart(args: any): JSX.Element {
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setRotation(rotation => rotation + 90);
      }, 3000);

      return () => clearInterval(interval);
    });

    return <Doughnut {...args} options={{ rotation }} />;
  }
}

// Storybook configuration for the Doughnut component
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

// Storybook story for the default Doughnut chart
export const Default = args => {
  const factory = new DoughnutFactory();
  return factory.createChart({ ...args, data });
};

// Storybook story for the rotating Doughnut chart
export const Rotation = args => {
  const factory = new RotatingDoughnutFactory();
  return factory.createChart({ ...args, data });
};
