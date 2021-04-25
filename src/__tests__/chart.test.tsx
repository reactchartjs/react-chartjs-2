import * as React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Chart from 'chart.js/auto';
import ChartComponent from '../chart';

describe('<ChartComponent />', () => {
  const data = {
    labels: ['red', 'blue'],
    datasets: [{ label: 'colors', data: [1, 2] }],
  };

  const options = {
    responsive: false,
  };

  let chart: any, update: any, destroy: any;
  const ref = (el: Chart | null): void => {
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
    render(
      <ChartComponent data={data} options={options} type='bar' ref={ref} />
    );

    expect(data).toStrictEqual({
      labels: ['red', 'blue'],
      datasets: [{ label: 'colors', data: [1, 2] }],
    });

    // expect(options).toStrictEqual({
    //   responsive: false,
    // });
  });

  it('should set ref to chart instance', () => {
    render(
      <ChartComponent data={data} options={options} type='bar' ref={ref} />
    );

    expect(chart).toBeTruthy();
    expect(chart instanceof Chart).toBe(true);
  });

  it('should pass props onto chart', () => {
    render(
      <ChartComponent data={data} options={options} type='bar' ref={ref} />
    );

    expect(chart.config.data).toMatchObject(data);
    expect(chart.config.options).toMatchObject(options);
    expect(chart.config.type).toEqual('bar');
  });

  it('should pass props onto chart if data is fn', () => {
    const dataFn = jest.fn(c => (c ? data : {}));

    render(
      <ChartComponent data={dataFn} options={options} type='bar' ref={ref} />
    );

    expect(chart.config.data).toMatchObject(data);
    expect(chart.config.options).toMatchObject(options);
    expect(chart.config.type).toEqual('bar');

    expect(dataFn).toHaveBeenCalledTimes(1);
    expect(dataFn).toHaveBeenCalledWith(expect.any(HTMLCanvasElement));
    expect(update).toHaveBeenCalledTimes(1);
  });

  it('should pass new data on data change', () => {
    const newData = {
      labels: ['red', 'blue'],
      datasets: [{ label: 'colors', data: [2, 1] }],
    };

    const { rerender } = render(
      <ChartComponent data={data} options={options} type='bar' ref={ref} />
    );

    // const meta = chart.config.data.datasets[0]._meta;
    const id = chart.id;

    rerender(
      <ChartComponent data={newData} options={options} type='bar' ref={ref} />
    );

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
      <ChartComponent data={data} options={options} type='bar' ref={ref} />
    );

    const meta = chart.config.data.datasets[0]._meta;
    const id = chart.id;

    rerender(
      <ChartComponent data={newData} options={options} type='bar' ref={ref} />
    );

    expect(chart.config.data).toMatchObject(newData);
    expect(meta).not.toEqual(chart.config.data.datasets[0]);
    expect(update).toHaveBeenCalled();
    expect(chart.id).toEqual(id);
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
      <ChartComponent data={oldData} options={options} type='bar' ref={ref} />
    );

    const meta0 = chart.config.data.datasets[0]._meta;
    const meta1 = chart.config.data.datasets[1]._meta;

    const id = chart.id;

    rerender(
      <ChartComponent data={newData} options={options} type='bar' ref={ref} />
    );

    expect(chart.config.data).toMatchObject(newData);
    expect(meta0).toEqual(chart.config.data.datasets[1]._meta);
    expect(meta1).toEqual(chart.config.data.datasets[0]._meta);
    expect(update).toHaveBeenCalled();
    expect(chart.id).toEqual(id);
  });

  it('should properly update when original data did not exist', () => {
    const oldData = {
      labels: ['red', 'blue'],
      datasets: [{ label: 'new-colors' }, { label: 'colors', data: [3, 2] }],
    };

    const newData = {
      labels: ['red', 'blue'],
      datasets: [
        { label: 'colors', data: [4, 5] },
        { label: 'new-colors', data: [1, 2] },
      ],
    };

    const { rerender } = render(
      <ChartComponent data={oldData} options={options} type='bar' ref={ref} />
    );

    // even when we feed the data as undefined, the constructor will
    // force it to []. Here we force it back
    chart.config.data.datasets[0].data = undefined;
    const meta0 = chart.config.data.datasets[0]._meta;
    const meta1 = chart.config.data.datasets[1]._meta;

    const id = chart.id;

    rerender(
      <ChartComponent data={newData} options={options} type='bar' ref={ref} />
    );

    expect(chart.config.data).toMatchObject(newData);
    expect(meta0).toEqual(chart.config.data.datasets[1]._meta);
    expect(meta1).toEqual(chart.config.data.datasets[0]._meta);
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
      datasets: [{ label: 'colors', data: [4, 5] }, { label: 'new-colors' }],
    };

    const { rerender } = render(
      <ChartComponent data={oldData} options={options} type='bar' ref={ref} />
    );

    const id = chart.id;

    rerender(
      <ChartComponent data={newData} options={options} type='bar' ref={ref} />
    );

    expect(chart.config.data).toMatchObject(newData);
    expect(update).toHaveBeenCalled();
    expect(chart.id).toEqual(id);
  });

  it('should pass new options on options change', () => {
    const newOptions = {
      responsive: true,
    };

    const { rerender } = render(
      <ChartComponent data={data} options={options} type='bar' ref={ref} />
    );

    const id = chart.id;

    rerender(
      <ChartComponent data={data} options={newOptions} type='bar' ref={ref} />
    );

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
      <ChartComponent
        data={data}
        options={options}
        type='bar'
        ref={ref}
        redraw
      />
    );

    // const id = chart.id;
    const originalChartDestroy = Object.assign({}, destroy);

    rerender(
      <ChartComponent
        data={newData}
        options={options}
        type='bar'
        ref={ref}
        redraw
      />
    );

    expect(originalChartDestroy).toHaveBeenCalled();
  });

  it('should destroy when unmounted', () => {
    const { unmount } = render(
      <ChartComponent data={data} options={options} type='bar' ref={ref} />
    );

    expect(chart).toBeTruthy();

    unmount();

    expect(chart).toBe(null);
  });

  it('should add className ', () => {
    render(
      <ChartComponent
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

  it('should call getDatasetAtEvent', () => {
    const getDatasetAtEvent = jest.fn();

    const { getByTestId } = render(
      <ChartComponent
        data={data}
        options={options}
        type='bar'
        ref={ref}
        getDatasetAtEvent={getDatasetAtEvent}
      />
    );

    fireEvent.click(getByTestId('canvas'));

    expect(getDatasetAtEvent).toHaveBeenCalled();
  });

  it('should call getElementAtEvent', () => {
    const getElementAtEvent = jest.fn();

    const { getByTestId } = render(
      <ChartComponent
        data={data}
        options={options}
        type='bar'
        ref={ref}
        getElementAtEvent={getElementAtEvent}
      />
    );

    fireEvent.click(getByTestId('canvas'));

    expect(getElementAtEvent).toHaveBeenCalled();
  });

  it('should call getElementsAtEvent', () => {
    const getElementsAtEvent = jest.fn();

    const { getByTestId } = render(
      <ChartComponent
        data={data}
        options={options}
        type='bar'
        ref={ref}
        getElementsAtEvent={getElementsAtEvent}
      />
    );

    fireEvent.click(getByTestId('canvas'));

    expect(getElementsAtEvent).toHaveBeenCalled();
  });

  it('should show fallback content if given', () => {
    const fallback = <p data-testid='fallbackContent'>Fallback content</p>;
    const { getByTestId } = render(
      <ChartComponent
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
      <ChartComponent
        data={data}
        options={options}
        type='bar'
        ref={ref}
        aria-label={ariaLabel}
      />
    );

    expect(chart.canvas.getAttribute('aria-label')).toBe(ariaLabel);
  });
});
