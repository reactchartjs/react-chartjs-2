import { vi, describe, it, expect, beforeEach } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import 'chart.js/auto';
import { Chart as ChartJS } from 'chart.js';
import { Chart } from '../src/index.js';
import {
  reforwardRef,
  setOptions,
  setLabels,
  setDatasets,
  cloneData,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from '../src/utils.js';
import type { ChartData, ChartOptions } from 'chart.js';

describe('Utils', () => {
  describe('reforwardRef', () => {
    it('should call function ref with value', () => {
      const ref = vi.fn();
      const value = { test: 'value' };

      reforwardRef(ref, value);

      expect(ref).toHaveBeenCalledWith(value);
      expect(ref).toHaveBeenCalledTimes(1);
    });

    it('should set current property on object ref', () => {
      const ref = { current: null };
      const value = { test: 'value' };

      reforwardRef(ref, value);

      expect(ref.current).toBe(value);
    });

    it('should handle null ref gracefully', () => {
      expect(() => reforwardRef(null, { test: 'value' })).not.toThrow();
    });

    it('should handle undefined ref gracefully', () => {
      expect(() => reforwardRef(undefined, { test: 'value' })).not.toThrow();
    });
  });

  describe('setOptions', () => {
    it('should update chart options', () => {
      const chart = {
        options: {
          responsive: false,
          maintainAspectRatio: true,
        },
      } as any;

      const newOptions: ChartOptions = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      };

      setOptions(chart, newOptions);

      expect(chart.options.responsive).toBe(true);
      expect(chart.options.plugins?.legend?.display).toBe(false);
      expect(chart.options.maintainAspectRatio).toBe(true);
    });

    it('should handle empty options', () => {
      const chart = {
        options: {},
      } as any;

      setOptions(chart, {});

      expect(chart.options).toEqual({});
    });

    it('should not throw when chart has no options', () => {
      const chart = {} as any;
      const newOptions: ChartOptions = { responsive: true };

      expect(() => setOptions(chart, newOptions)).not.toThrow();
    });
  });

  describe('setLabels', () => {
    it('should update labels in chart data', () => {
      const currentData: ChartData = {
        labels: ['old1', 'old2'],
        datasets: [],
      };

      const newLabels = ['new1', 'new2', 'new3'];

      setLabels(currentData, newLabels);

      expect(currentData.labels).toEqual(newLabels);
    });

    it('should handle undefined labels', () => {
      const currentData: ChartData = {
        labels: ['old1', 'old2'],
        datasets: [],
      };

      setLabels(currentData, undefined);

      expect(currentData.labels).toBeUndefined();
    });

    it('should handle empty labels array', () => {
      const currentData: ChartData = {
        labels: ['old1', 'old2'],
        datasets: [],
      };

      setLabels(currentData, []);

      expect(currentData.labels).toEqual([]);
    });
  });

  describe('setDatasets', () => {
    it('should update datasets with matching labels', () => {
      const currentData: ChartData = {
        labels: ['A', 'B'],
        datasets: [
          { label: 'Dataset 1', data: [1, 2] },
          { label: 'Dataset 2', data: [3, 4] },
        ],
      };

      const newDatasets = [
        { label: 'Dataset 1', data: [5, 6] },
        { label: 'Dataset 2', data: [7, 8] },
      ];

      setDatasets(currentData, newDatasets);

      expect(currentData.datasets[0].data).toEqual([5, 6]);
      expect(currentData.datasets[1].data).toEqual([7, 8]);
    });

    it('should add new datasets when no match is found', () => {
      const currentData: ChartData = {
        labels: ['A', 'B'],
        datasets: [{ label: 'Dataset 1', data: [1, 2] }],
      };

      const newDatasets = [
        { label: 'Dataset 1', data: [5, 6] },
        { label: 'Dataset 3', data: [9, 10] },
      ];

      setDatasets(currentData, newDatasets);

      expect(currentData.datasets).toHaveLength(2);
      expect(currentData.datasets[1].label).toBe('Dataset 3');
      expect(currentData.datasets[1].data).toEqual([9, 10]);
    });

    it('should use custom datasetIdKey', () => {
      const currentData: ChartData = {
        labels: ['A', 'B'],
        datasets: [
          { id: 'ds1', label: 'Dataset 1', data: [1, 2] } as any,
          { id: 'ds2', label: 'Dataset 2', data: [3, 4] } as any,
        ],
      };

      const newDatasets = [
        { id: 'ds1', label: 'Updated 1', data: [5, 6] } as any,
        { id: 'ds2', label: 'Updated 2', data: [7, 8] } as any,
      ];

      setDatasets(currentData, newDatasets, 'id');

      expect(currentData.datasets[0].label).toBe('Updated 1');
      expect(currentData.datasets[1].label).toBe('Updated 2');
    });

    it('should handle datasets with no data', () => {
      const currentData: ChartData = {
        labels: ['A', 'B'],
        datasets: [{ label: 'Dataset 1', data: [1, 2] }],
      };

      const newDatasets = [{ label: 'Dataset 2' } as any];

      setDatasets(currentData, newDatasets);

      expect(currentData.datasets).toHaveLength(1);
      expect(currentData.datasets[0].label).toBe('Dataset 2');
    });

    it('should prevent duplicate dataset references', () => {
      const currentData: ChartData = {
        labels: ['A', 'B'],
        datasets: [{ label: 'Dataset 1', data: [1, 2] }],
      };

      const newDatasets = [
        { label: 'Dataset 1', data: [5, 6] },
        { label: 'Dataset 1', data: [7, 8] },
      ];

      setDatasets(currentData, newDatasets);

      expect(currentData.datasets).toHaveLength(2);
      expect(currentData.datasets[0]).not.toBe(currentData.datasets[1]);
    });
  });

  describe('cloneData', () => {
    it('should clone chart data with labels and datasets', () => {
      const originalData: ChartData = {
        labels: ['A', 'B', 'C'],
        datasets: [
          { label: 'Dataset 1', data: [1, 2, 3] },
          { label: 'Dataset 2', data: [4, 5, 6] },
        ],
      };

      const clonedData = cloneData(originalData);

      expect(clonedData.labels).toEqual(originalData.labels);
      expect(clonedData.datasets).toHaveLength(2);
      expect(clonedData.datasets[0].label).toBe('Dataset 1');
      expect(clonedData.datasets[1].label).toBe('Dataset 2');
    });

    it('should create independent copy of data', () => {
      const originalData: ChartData = {
        labels: ['A', 'B'],
        datasets: [{ label: 'Dataset 1', data: [1, 2] }],
      };

      const clonedData = cloneData(originalData);

      // Modify cloned data
      clonedData.labels = ['X', 'Y'];
      clonedData.datasets[0].data = [99, 100];

      // Original should remain unchanged
      expect(originalData.labels).toEqual(['A', 'B']);
      expect(originalData.datasets[0].data).toEqual([1, 2]);
    });

    it('should use custom datasetIdKey', () => {
      const originalData: ChartData = {
        labels: ['A', 'B'],
        datasets: [
          { id: 'ds1', label: 'Dataset 1', data: [1, 2] } as any,
          { id: 'ds2', label: 'Dataset 2', data: [3, 4] } as any,
        ],
      };

      const clonedData = cloneData(originalData, 'id');

      expect(clonedData.datasets).toHaveLength(2);
      expect(clonedData.datasets[0]).toHaveProperty('id', 'ds1');
      expect(clonedData.datasets[1]).toHaveProperty('id', 'ds2');
    });

    it('should handle empty datasets', () => {
      const originalData: ChartData = {
        labels: ['A', 'B'],
        datasets: [],
      };

      const clonedData = cloneData(originalData);

      expect(clonedData.datasets).toEqual([]);
      expect(clonedData.labels).toEqual(['A', 'B']);
    });
  });

  describe('Event handler functions', () => {
    let chart: ChartJS | null = null;

    const data = {
      labels: ['January', 'February', 'March'],
      datasets: [
        {
          label: 'Sales',
          data: [10, 20, 30],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
        },
        {
          label: 'Revenue',
          data: [15, 25, 35],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
        },
      ],
    };

    const options = {
      responsive: false,
    };

    const ref = (el: ChartJS | null) => {
      chart = el;
    };

    beforeEach(() => {
      chart = null;
    });

    describe('getDatasetAtEvent', () => {
      it('should return dataset elements at event location', () => {
        const { container } = render(
          <Chart data={data} options={options} type='bar' ref={ref} />
        );

        const canvas = container.querySelector('canvas');
        expect(canvas).toBeTruthy();
        expect(chart).toBeTruthy();

        if (canvas && chart) {
          const event = new MouseEvent('click', {
            clientX: 100,
            clientY: 100,
            bubbles: true,
          });

          Object.defineProperty(event, 'nativeEvent', {
            value: event,
            writable: false,
          });

          const elements = getDatasetAtEvent(chart, event as any);

          expect(Array.isArray(elements)).toBe(true);
        }
      });

      it('should call getElementsAtEventForMode with correct parameters', () => {
        const { container } = render(
          <Chart data={data} options={options} type='bar' ref={ref} />
        );

        const canvas = container.querySelector('canvas');

        if (canvas && chart) {
          const spy = vi.spyOn(chart, 'getElementsAtEventForMode');

          const event = new MouseEvent('click', {
            clientX: 100,
            clientY: 100,
            bubbles: true,
          });

          Object.defineProperty(event, 'nativeEvent', {
            value: event,
            writable: false,
          });

          getDatasetAtEvent(chart, event as any);

          expect(spy).toHaveBeenCalledWith(
            event,
            'dataset',
            { intersect: true },
            false
          );
        }
      });
    });

    describe('getElementAtEvent', () => {
      it('should return single element at event location', () => {
        const { container } = render(
          <Chart data={data} options={options} type='bar' ref={ref} />
        );

        const canvas = container.querySelector('canvas');
        expect(canvas).toBeTruthy();
        expect(chart).toBeTruthy();

        if (canvas && chart) {
          const event = new MouseEvent('click', {
            clientX: 100,
            clientY: 100,
            bubbles: true,
          });

          Object.defineProperty(event, 'nativeEvent', {
            value: event,
            writable: false,
          });

          const elements = getElementAtEvent(chart, event as any);

          expect(Array.isArray(elements)).toBe(true);
        }
      });

      it('should call getElementsAtEventForMode with nearest mode', () => {
        const { container } = render(
          <Chart data={data} options={options} type='bar' ref={ref} />
        );

        const canvas = container.querySelector('canvas');

        if (canvas && chart) {
          const spy = vi.spyOn(chart, 'getElementsAtEventForMode');

          const event = new MouseEvent('click', {
            clientX: 100,
            clientY: 100,
            bubbles: true,
          });

          Object.defineProperty(event, 'nativeEvent', {
            value: event,
            writable: false,
          });

          getElementAtEvent(chart, event as any);

          expect(spy).toHaveBeenCalledWith(
            event,
            'nearest',
            { intersect: true },
            false
          );
        }
      });
    });

    describe('getElementsAtEvent', () => {
      it('should return all elements at event location', () => {
        const { container } = render(
          <Chart data={data} options={options} type='bar' ref={ref} />
        );

        const canvas = container.querySelector('canvas');
        expect(canvas).toBeTruthy();
        expect(chart).toBeTruthy();

        if (canvas && chart) {
          const event = new MouseEvent('click', {
            clientX: 100,
            clientY: 100,
            bubbles: true,
          });

          Object.defineProperty(event, 'nativeEvent', {
            value: event,
            writable: false,
          });

          const elements = getElementsAtEvent(chart, event as any);

          expect(Array.isArray(elements)).toBe(true);
        }
      });

      it('should call getElementsAtEventForMode with index mode', () => {
        const { container } = render(
          <Chart data={data} options={options} type='bar' ref={ref} />
        );

        const canvas = container.querySelector('canvas');

        if (canvas && chart) {
          const spy = vi.spyOn(chart, 'getElementsAtEventForMode');

          const event = new MouseEvent('click', {
            clientX: 100,
            clientY: 100,
            bubbles: true,
          });

          Object.defineProperty(event, 'nativeEvent', {
            value: event,
            writable: false,
          });

          getElementsAtEvent(chart, event as any);

          expect(spy).toHaveBeenCalledWith(
            event,
            'index',
            { intersect: true },
            false
          );
        }
      });
    });
  });
});
