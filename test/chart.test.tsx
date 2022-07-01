import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'chart.js/auto';
import { Chart as ChartJS } from 'chart.js';
import { Chart } from '../src';

describe('<Chart />', () => {
  const data = {
    labels: ['red', 'blue'],
    datasets: [{ label: 'colors', data: [1, 2] }],
  };

  const options = {
    responsive: false,
  };

  let chart: any, update: any, destroy: any;
  const ref = (el: ChartJS<any> | undefined | null): void => {
    chart = el;

    if (chart) {
      update = jest.spyOn(chart, 'update');
      destroy = jest.spyOn(chart, 'destroy');
    }
  };

  beforeEach(() => {
    chart = null;
  });

  afterEach(() => {
    if (chart) chart.destroy();

    cleanup();

    if (update) update.mockClear();
    if (destroy) destroy.mockClear();
  });

  it('should not pollute props', () => {
    render(<Chart data={data} options={options} type='bar' ref={ref} />);

    expect(data).toStrictEqual({
      labels: ['red', 'blue'],
      datasets: [{ label: 'colors', data: [1, 2] }],
    });

    // expect(options).toStrictEqual({
    //   responsive: false,
    // });
  });

  it('should set ref to chart instance', () => {
    render(<Chart data={data} options={options} type='bar' ref={ref} />);

    expect(chart).toBeTruthy();
    expect(chart instanceof ChartJS).toBe(true);
  });

  it('should pass props onto chart', () => {
    render(<Chart data={data} options={options} type='bar' ref={ref} />);

    expect(chart.config.data).toMatchObject(data);
    expect(chart.config.options).toMatchObject(options);
    expect(chart.config.type).toEqual('bar');
  });

  it('should pass new data on data change', () => {
    const newData = {
      labels: ['red', 'blue'],
      datasets: [{ label: 'colors', data: [2, 1] }],
    };

    const { rerender } = render(
      <Chart data={data} options={options} type='bar' ref={ref} />
    );

    // const meta = chart.config.data.datasets[0]._meta;
    const id = chart.id;

    rerender(<Chart data={newData} options={options} type='bar' ref={ref} />);

    expect(chart.config.data).toMatchObject(newData);
    // make sure that other properties were maintained
    // expect(chart.config.data.datasets[0]._meta).toEqual(meta);
    expect(update).toHaveBeenCalled();
    expect(chart.id).toEqual(id);
  });

  it('should properly update with entirely new data', () => {
    const newData = {
      labels: ['purple', 'pink'],
      datasets: [{ label: 'new-colors', data: [1, 10] }],
    };

    const { rerender } = render(
      <Chart data={data} options={options} type='bar' ref={ref} />
    );

    const meta = chart.config.data.datasets[0]._meta;
    const id = chart.id;

    rerender(<Chart data={newData} options={options} type='bar' ref={ref} />);

    expect(chart.config.data).toMatchObject(newData);
    expect(meta).not.toEqual(chart.config.data.datasets[0]);
    expect(update).toHaveBeenCalled();
    expect(chart.id).toEqual(id);
  });

  it('should properly update with a new chart type', () => {
    const newType = 'line';

    const { rerender } = render(
      <Chart data={data} options={options} type='bar' ref={ref} />
    );

    const originalChartDestroy = Object.assign({}, destroy);

    rerender(<Chart data={data} options={options} type={newType} ref={ref} />);

    expect(originalChartDestroy).toHaveBeenCalled();
  });

  it('should properly maintain order with new data', () => {
    const oldData = {
      labels: ['red', 'blue'],
      datasets: [
        { label: 'new-colors', data: [1, 2] },
        { label: 'colors', data: [3, 2] },
      ],
    };

    const newData = {
      labels: ['red', 'blue'],
      datasets: [
        { label: 'colors', data: [4, 5] },
        { label: 'new-colors', data: [1, 2] },
      ],
    };

    const { rerender } = render(
      <Chart data={oldData} options={options} type='bar' ref={ref} />
    );

    const meta = Object.assign({}, chart._metasets);

    const id = chart.id;

    rerender(<Chart data={newData} options={options} type='bar' ref={ref} />);

    expect(chart.config.data).toMatchObject(newData);
    expect(meta[0]).toBe(chart._metasets[1]);
    expect(meta[1]).toBe(chart._metasets[0]);
    expect(update).toHaveBeenCalled();
    expect(chart.id).toEqual(id);
  });

  it('should properly update when original data did not exist', () => {
    const oldData = {
      labels: ['red', 'blue'],
      datasets: [
        { label: 'new-colors', data: [] },
        { label: 'colors', data: [3, 2] },
      ],
    };

    const newData = {
      labels: ['red', 'blue'],
      datasets: [
        { label: 'colors', data: [4, 5] },
        { label: 'new-colors', data: [1, 2] },
      ],
    };

    const { rerender } = render(
      <Chart data={oldData} options={options} type='bar' ref={ref} />
    );

    // even when we feed the data as undefined, the constructor will
    // force it to []. Here we force it back
    chart.config.data.datasets[0].data = undefined;
    const meta = Object.assign({}, chart._metasets);

    const id = chart.id;

    rerender(<Chart data={newData} options={options} type='bar' ref={ref} />);

    expect(chart.config.data).toMatchObject(newData);
    expect(meta[0]).toBe(chart._metasets[1]);
    expect(update).toHaveBeenCalled();
    expect(chart.id).toEqual(id);
  });

  it('should properly update when incoming data does not exist', () => {
    const oldData = {
      labels: ['red', 'blue'],
      datasets: [
        { label: 'new-colors', data: [1, 2] },
        { label: 'colors', data: [3, 2] },
      ],
    };

    const newData = {
      labels: ['red', 'blue'],
      datasets: [
        { label: 'colors', data: [4, 5] },
        { label: 'new-colors', data: [] },
      ],
    };

    const { rerender } = render(
      <Chart data={oldData} options={options} type='bar' ref={ref} />
    );

    const id = chart.id;

    rerender(<Chart data={newData} options={options} type='bar' ref={ref} />);

    expect(chart.config.data).toMatchObject(newData);
    expect(update).toHaveBeenCalled();
    expect(chart.id).toEqual(id);
  });

  it('should pass new options on options change', () => {
    const newOptions = {
      responsive: true,
    };

    const { rerender } = render(
      <Chart data={data} options={options} type='bar' ref={ref} />
    );

    const id = chart.id;

    rerender(<Chart data={data} options={newOptions} type='bar' ref={ref} />);

    expect(chart.options).toMatchObject(newOptions);
    expect(update).toHaveBeenCalled();
    expect(chart.id).toEqual(id);
  });

  it('should destroy and rerender when set to redraw', () => {
    const newData = {
      labels: ['red', 'blue'],
      datasets: [{ label: 'colors', data: [2, 1] }],
    };

    const { rerender } = render(
      <Chart data={data} options={options} type='bar' ref={ref} redraw />
    );

    // const id = chart.id;
    const originalChartDestroy = Object.assign({}, destroy);

    rerender(
      <Chart data={newData} options={options} type='bar' ref={ref} redraw />
    );

    expect(originalChartDestroy).toHaveBeenCalled();
  });

  it('should destroy when unmounted', () => {
    const { unmount } = render(
      <Chart data={data} options={options} type='bar' ref={ref} />
    );

    expect(chart).toBeTruthy();

    unmount();

    expect(chart).toBe(null);
  });

  it('should add className ', () => {
    render(
      <Chart
        data={data}
        options={options}
        className='chart-example'
        type='bar'
        ref={ref}
      />
    );

    expect(chart).toBeTruthy();
    expect(chart.canvas).toHaveProperty('className');
    expect(chart.canvas).toHaveClass('chart-example');
  });

  it('should call onClick', () => {
    const onClick = jest.fn();

    const { getByTestId } = render(
      <Chart
        data-testid='canvas'
        data={data}
        options={options}
        type='bar'
        ref={ref}
        onClick={onClick}
      />
    );

    fireEvent.click(getByTestId('canvas'));

    expect(onClick).toHaveBeenCalled();
  });

  it('should show fallback content if given', () => {
    const fallback = <p data-testid='fallbackContent'>Fallback content</p>;
    const { getByTestId } = render(
      <Chart
        data={data}
        options={options}
        className='chart-example'
        type='bar'
        ref={ref}
        fallbackContent={fallback}
      />
    );

    expect(chart).toBeTruthy();
    expect(chart.canvas).toContainElement(getByTestId('fallbackContent'));
  });

  it('should pass through aria labels to the canvas element', () => {
    const ariaLabel = 'ARIA LABEL';
    render(
      <Chart
        data={data}
        options={options}
        type='bar'
        ref={ref}
        aria-label={ariaLabel}
      />
    );

    expect(chart.canvas.getAttribute('aria-label')).toBe(ariaLabel);
  });

  it('should rerender datasets with same labels', () => {
    const getData = () => ({
      labels: [1, 2, 3],
      datasets: [
        {
          label: '',
          data: [5, 6, 7],
        },
        {
          label: '',
          data: [3, 2, 1],
        },
      ],
    });

    const { rerender } = render(
      <Chart ref={ref} type='line' data={getData()} />
    );

    const [prevDataset1, prevDataset2] = chart.config.data.datasets;

    rerender(<Chart ref={ref} type='line' data={getData()} />);

    const [nextDataset1, nextDataset2] = chart.config.data.datasets;

    expect(prevDataset1).toBe(nextDataset1);
    expect(prevDataset2).not.toBe(nextDataset2);
  });

  it('should rerender datasets with id', () => {
    const getData = () => ({
      labels: [1, 2, 3],
      datasets: [
        {
          id: 1,
          label: '',
          data: [5, 6, 7],
        },
        {
          id: 2,
          label: '',
          data: [3, 2, 1],
        },
      ],
    });

    const { rerender } = render(
      <Chart ref={ref} datasetIdKey='id' type='line' data={getData()} />
    );

    const [prevDataset1, prevDataset2] = chart.config.data.datasets;

    rerender(
      <Chart ref={ref} datasetIdKey='id' type='line' data={getData()} />
    );

    const [nextDataset1, nextDataset2] = chart.config.data.datasets;

    expect(prevDataset1).toBe(nextDataset1);
    expect(prevDataset2).toBe(nextDataset2);
  });

  it('should pass updateMode prop to update method', () => {
    const newData = {
      labels: ['purple', 'pink'],
      datasets: [{ label: 'new-colors', data: [1, 10] }],
    };

    const { rerender } = render(
      <Chart
        data={data}
        options={options}
        type='bar'
        updateMode='active'
        ref={ref}
      />
    );

    rerender(
      <Chart
        data={newData}
        options={options}
        type='bar'
        updateMode='active'
        ref={ref}
      />
    );

    expect(update).toHaveBeenCalledTimes(1);
    expect(update).toBeCalledWith('active');
  });
});
