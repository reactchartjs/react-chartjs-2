import { vi, describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import 'chart.js/auto';
import { Chart as ChartJS } from 'chart.js';
import {
  Line,
  Bar,
  Radar,
  Doughnut,
  PolarArea,
  Bubble,
  Pie,
  Scatter,
} from '../src/index.js';

describe('Typed Chart Components', () => {
  const basicData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [12, 19, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
      },
    ],
  };

  const options = {
    responsive: false,
  };

  let chart: ChartJS | null = null;

  const ref = (el: ChartJS | null) => {
    chart = el;
  };

  afterEach(() => {
    if (chart) {
      chart.destroy();
      chart = null;
    }
    cleanup();
  });

  describe('Line Chart', () => {
    it('should render Line chart', () => {
      render(<Line data={basicData} options={options} ref={ref} />);

      expect(chart).toBeTruthy();
      expect(chart instanceof ChartJS).toBe(true);
      expect(chart?.config.type).toBe('line');
    });

    it('should pass data to Line chart', () => {
      render(<Line data={basicData} options={options} ref={ref} />);

      expect(chart?.config.data.labels).toEqual(basicData.labels);
      expect(chart?.config.data.datasets).toHaveLength(1);
      expect(chart?.config.data.datasets[0].label).toBe('Dataset 1');
    });

    it('should pass options to Line chart', () => {
      render(<Line data={basicData} options={options} ref={ref} />);

      expect(chart?.options.responsive).toBe(false);
    });

    it('should update Line chart on data change', () => {
      const newData = {
        labels: ['Green', 'Purple'],
        datasets: [
          {
            label: 'Updated Dataset',
            data: [5, 10],
          },
        ],
      };

      const { rerender } = render(
        <Line data={basicData} options={options} ref={ref} />
      );

      const updateSpy = vi.spyOn(chart!, 'update');

      rerender(<Line data={newData} options={options} ref={ref} />);

      expect(updateSpy).toHaveBeenCalled();
      expect(chart?.config.data.labels).toEqual(newData.labels);
    });
  });

  describe('Bar Chart', () => {
    it('should render Bar chart', () => {
      render(<Bar data={basicData} options={options} ref={ref} />);

      expect(chart).toBeTruthy();
      expect(chart instanceof ChartJS).toBe(true);
      expect(chart?.config.type).toBe('bar');
    });

    it('should pass data to Bar chart', () => {
      render(<Bar data={basicData} options={options} ref={ref} />);

      expect(chart?.config.data.labels).toEqual(basicData.labels);
      expect(chart?.config.data.datasets).toHaveLength(1);
    });

    it('should handle horizontal bar options', () => {
      const horizontalOptions = {
        indexAxis: 'y' as const,
        responsive: false,
      };

      render(<Bar data={basicData} options={horizontalOptions} ref={ref} />);

      expect(chart?.options.indexAxis).toBe('y');
    });
  });

  describe('Radar Chart', () => {
    it('should render Radar chart', () => {
      render(<Radar data={basicData} options={options} ref={ref} />);

      expect(chart).toBeTruthy();
      expect(chart instanceof ChartJS).toBe(true);
      expect(chart?.config.type).toBe('radar');
    });

    it('should pass data to Radar chart', () => {
      render(<Radar data={basicData} options={options} ref={ref} />);

      expect(chart?.config.data.labels).toEqual(basicData.labels);
      expect(chart?.config.data.datasets).toHaveLength(1);
    });
  });

  describe('Doughnut Chart', () => {
    it('should render Doughnut chart', () => {
      render(<Doughnut data={basicData} options={options} ref={ref} />);

      expect(chart).toBeTruthy();
      expect(chart instanceof ChartJS).toBe(true);
      expect(chart?.config.type).toBe('doughnut');
    });

    it('should pass data to Doughnut chart', () => {
      render(<Doughnut data={basicData} options={options} ref={ref} />);

      expect(chart?.config.data.labels).toEqual(basicData.labels);
      expect(chart?.config.data.datasets).toHaveLength(1);
    });

    it('should handle doughnut-specific options', () => {
      const doughnutOptions = {
        cutout: '70%',
        responsive: false,
      };

      render(
        <Doughnut data={basicData} options={doughnutOptions} ref={ref} />
      );

      expect(chart?.options.cutout).toBe('70%');
    });
  });

  describe('PolarArea Chart', () => {
    it('should render PolarArea chart', () => {
      render(<PolarArea data={basicData} options={options} ref={ref} />);

      expect(chart).toBeTruthy();
      expect(chart instanceof ChartJS).toBe(true);
      expect(chart?.config.type).toBe('polarArea');
    });

    it('should pass data to PolarArea chart', () => {
      render(<PolarArea data={basicData} options={options} ref={ref} />);

      expect(chart?.config.data.labels).toEqual(basicData.labels);
      expect(chart?.config.data.datasets).toHaveLength(1);
    });
  });

  describe('Bubble Chart', () => {
    const bubbleData = {
      datasets: [
        {
          label: 'Bubble Dataset',
          data: [
            { x: 20, y: 30, r: 15 },
            { x: 40, y: 10, r: 10 },
          ],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    };

    it('should render Bubble chart', () => {
      render(<Bubble data={bubbleData} options={options} ref={ref} />);

      expect(chart).toBeTruthy();
      expect(chart instanceof ChartJS).toBe(true);
      expect(chart?.config.type).toBe('bubble');
    });

    it('should pass data to Bubble chart', () => {
      render(<Bubble data={bubbleData} options={options} ref={ref} />);

      expect(chart?.config.data.datasets).toHaveLength(1);
      expect(chart?.config.data.datasets[0].data).toHaveLength(2);
    });
  });

  describe('Pie Chart', () => {
    it('should render Pie chart', () => {
      render(<Pie data={basicData} options={options} ref={ref} />);

      expect(chart).toBeTruthy();
      expect(chart instanceof ChartJS).toBe(true);
      expect(chart?.config.type).toBe('pie');
    });

    it('should pass data to Pie chart', () => {
      render(<Pie data={basicData} options={options} ref={ref} />);

      expect(chart?.config.data.labels).toEqual(basicData.labels);
      expect(chart?.config.data.datasets).toHaveLength(1);
    });
  });

  describe('Scatter Chart', () => {
    const scatterData = {
      datasets: [
        {
          label: 'Scatter Dataset',
          data: [
            { x: -10, y: 0 },
            { x: 0, y: 10 },
            { x: 10, y: 5 },
          ],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    };

    it('should render Scatter chart', () => {
      render(<Scatter data={scatterData} options={options} ref={ref} />);

      expect(chart).toBeTruthy();
      expect(chart instanceof ChartJS).toBe(true);
      expect(chart?.config.type).toBe('scatter');
    });

    it('should pass data to Scatter chart', () => {
      render(<Scatter data={scatterData} options={options} ref={ref} />);

      expect(chart?.config.data.datasets).toHaveLength(1);
      expect(chart?.config.data.datasets[0].data).toHaveLength(3);
    });
  });

  describe('Common functionality across all typed charts', () => {
    const charts = [
      { name: 'Line', Component: Line, type: 'line' },
      { name: 'Bar', Component: Bar, type: 'bar' },
      { name: 'Radar', Component: Radar, type: 'radar' },
      { name: 'Doughnut', Component: Doughnut, type: 'doughnut' },
      { name: 'PolarArea', Component: PolarArea, type: 'polarArea' },
      { name: 'Pie', Component: Pie, type: 'pie' },
    ];

    charts.forEach(({ name, Component, type }) => {
      describe(`${name} common features`, () => {
        it('should forward ref correctly', () => {
          render(<Component data={basicData} options={options} ref={ref} />);

          expect(chart).toBeTruthy();
          expect(chart?.config.type).toBe(type);
        });

        it('should destroy chart on unmount', () => {
          const { unmount } = render(
            <Component data={basicData} options={options} ref={ref} />
          );

          expect(chart).toBeTruthy();
          const destroySpy = vi.spyOn(chart!, 'destroy');

          unmount();

          expect(destroySpy).toHaveBeenCalled();
        });

        it('should accept className prop', () => {
          render(
            <Component
              data={basicData}
              options={options}
              className='custom-chart'
              ref={ref}
            />
          );

          expect(chart?.canvas).toHaveClass('custom-chart');
        });

        it('should accept plugins prop', () => {
          const customPlugin = {
            id: 'customPlugin',
            beforeDraw: vi.fn(),
          };

          render(
            <Component
              data={basicData}
              options={options}
              plugins={[customPlugin]}
              ref={ref}
            />
          );

          expect(chart?.config.plugins).toContain(customPlugin);
        });

        it('should handle redraw prop', () => {
          const newData = {
            labels: ['A', 'B'],
            datasets: [{ label: 'New', data: [1, 2] }],
          };

          const { rerender } = render(
            <Component data={basicData} options={options} redraw ref={ref} />
          );

          const originalChart = chart;
          const destroySpy = vi.spyOn(originalChart!, 'destroy');

          rerender(
            <Component data={newData} options={options} redraw ref={ref} />
          );

          expect(destroySpy).toHaveBeenCalled();
        });

        it('should pass through aria-label', () => {
          const ariaLabel = `${name} Chart`;

          render(
            <Component
              data={basicData}
              options={options}
              aria-label={ariaLabel}
              ref={ref}
            />
          );

          expect(chart?.canvas.getAttribute('aria-label')).toBe(ariaLabel);
        });

        it('should handle height and width props', () => {
          render(
            <Component
              data={basicData}
              options={options}
              height={400}
              width={600}
              ref={ref}
            />
          );

          expect(chart?.canvas.height).toBe(400);
          expect(chart?.canvas.width).toBe(600);
        });
      });
    });
  });

  describe('Type safety and registration', () => {
    it('should not require type prop for typed components', () => {
      // This test verifies that typed components work without explicit type prop
      render(<Line data={basicData} ref={ref} />);
      expect(chart?.config.type).toBe('line');

      if (chart) chart.destroy();
      chart = null;

      render(<Bar data={basicData} ref={ref} />);
      expect(chart?.config.type).toBe('bar');
    });

    it('should have controllers registered', () => {
      // Verify that creating each chart type registers its controller
      const chartTypes = [
        { Component: Line, type: 'line' },
        { Component: Bar, type: 'bar' },
        { Component: Radar, type: 'radar' },
        { Component: Doughnut, type: 'doughnut' },
        { Component: PolarArea, type: 'polarArea' },
        { Component: Bubble, type: 'bubble' },
        { Component: Pie, type: 'pie' },
        { Component: Scatter, type: 'scatter' },
      ];

      chartTypes.forEach(({ Component, type }) => {
        render(<Component data={basicData} ref={ref} />);
        expect(chart?.config.type).toBe(type);
        
        if (chart) {
          chart.destroy();
          chart = null;
        }
      });
    });
  });
});
