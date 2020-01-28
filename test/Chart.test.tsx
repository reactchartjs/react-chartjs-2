import React from 'react';
import 'jest-canvas-mock';
import { fireEvent, render } from '@testing-library/react';
import Chart, { dataTestIds, ChartProps } from '../src';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const getProps = (props: Partial<ChartProps> = {}): ChartProps => ({
  data,
  options: {},
  ...props,
});

const getContent = (props: ChartProps) => <Chart {...props} />;

describe('Chart', () => {
  it('should render without crashing', () => {
    const { container } = render(getContent(getProps()));
    expect(container).toBeTruthy();
  });

  it('renders chart on props.redraw(true)', () => {
    const spy = jest.spyOn(Chart.prototype, 'renderChart');
    const { rerender } = render(getContent(getProps()));

    expect(spy).toHaveBeenCalledTimes(1);

    rerender(getContent(getProps({ redraw: true })));
    expect(spy).toHaveBeenCalledTimes(2);

    spy.mockRestore();
  });

  it('renders on props.height change', () => {
    const spy = jest.spyOn(Chart.prototype, 'render');
    const { rerender } = render(getContent(getProps({ height: 100 })));

    expect(spy).toHaveBeenCalledTimes(1);

    rerender(
      getContent(
        getProps({
          height: 101,
        })
      )
    );
    expect(spy).toHaveBeenCalledTimes(2);

    spy.mockRestore();
  });

  it('renders on props.width change', () => {
    const spy = jest.spyOn(Chart.prototype, 'render');
    const { rerender } = render(getContent(getProps({ width: 100 })));

    expect(spy).toHaveBeenCalledTimes(1);

    rerender(
      getContent(
        getProps({
          width: 101,
        })
      )
    );
    expect(spy).toHaveBeenCalledTimes(2);

    spy.mockRestore();
  });

  it('renders on props.type change', () => {
    const spy = jest.spyOn(Chart.prototype, 'render');
    const { rerender } = render(getContent(getProps({ type: 'line' })));

    expect(spy).toHaveBeenCalledTimes(1);

    rerender(getContent(getProps({ type: 'line' })));

    expect(spy).toHaveBeenCalledTimes(1);

    rerender(getContent(getProps({ type: 'bar' })));

    expect(spy).toHaveBeenCalledTimes(2);

    spy.mockRestore();
  });

  // it('renders on props.legend change', () => {
  //   const spy = jest.spyOn(Chart.prototype, 'render');
  //   const { rerender } = render(getContent(getProps({ legend: {} })));
  //
  //   expect(spy).toHaveBeenCalledTimes(1);
  //
  //   rerender(getContent(getProps({ legend: {} })));
  //
  //   expect(spy).toHaveBeenCalledTimes(1);
  //
  //   rerender(getContent(getProps({ legend: { onClick: jest.fn() } })));
  //
  //   expect(spy).toHaveBeenCalledTimes(2);
  //
  //   spy.mockRestore();
  // });

  it('renders on props.options change', () => {
    const spy = jest.spyOn(Chart.prototype, 'render');
    const { rerender } = render(getContent(getProps({ options: {} })));

    expect(spy).toHaveBeenCalledTimes(1);

    rerender(
      getContent(
        getProps({
          options: {},
        })
      )
    );

    expect(spy).toHaveBeenCalledTimes(1);

    rerender(
      getContent(
        getProps({
          options: {
            aspectRatio: 100,
          },
        })
      )
    );

    expect(spy).toHaveBeenCalledTimes(2);

    spy.mockRestore();
  });

  it('renders on props.data change', () => {
    const spy = jest.spyOn(Chart.prototype, 'render');
    const { rerender } = render(getContent(getProps()));

    expect(spy).toHaveBeenCalledTimes(1);

    rerender(getContent(getProps({ data: {} })));

    expect(spy).toHaveBeenCalledTimes(2);

    spy.mockRestore();
  });

  it("doesn't render when props didn't change", () => {
    const spy = jest.spyOn(Chart.prototype, 'render');
    const { rerender } = render(getContent(getProps()));

    rerender(getContent(getProps({ data })));
    rerender(getContent(getProps({ data })));

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });

  it("doesn't render when function references are changed", () => {
    const spy = jest.spyOn(Chart.prototype, 'render');
    const { rerender } = render(getContent(getProps()));

    rerender(getContent(getProps({ data })));
    rerender(getContent(getProps({ data, getDatasetAtEvent: jest.fn() })));
    rerender(getContent(getProps({ data, getDatasetAtEvent: jest.fn() })));
    rerender(getContent(getProps({ data, getDatasetAtEvent: jest.fn() })));

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });

  it('calls getDatasetAtEvent', () => {
    const getDatasetAtEvent = jest.fn();
    const { getByTestId } = render(getContent(getProps({ getDatasetAtEvent })));

    fireEvent.click(getByTestId(dataTestIds.canvas));

    expect(getDatasetAtEvent).toHaveBeenCalled();
  });

  it('calls getElementAtEvent', () => {
    const getElementAtEvent = jest.fn();
    const { getByTestId } = render(getContent(getProps({ getElementAtEvent })));

    fireEvent.click(getByTestId(dataTestIds.canvas));

    expect(getElementAtEvent).toHaveBeenCalled();
  });

  it('calls getElementsAtEvent', () => {
    const getElementsAtEvent = jest.fn();
    const { getByTestId } = render(
      getContent(getProps({ getElementsAtEvent }))
    );

    fireEvent.click(getByTestId(dataTestIds.canvas));

    expect(getElementsAtEvent).toHaveBeenCalled();
  });

  it('calls onElementsClick', () => {
    const onElementsClick = jest.fn();
    const { getByTestId } = render(getContent(getProps({ onElementsClick })));

    fireEvent.click(getByTestId(dataTestIds.canvas));

    expect(onElementsClick).toHaveBeenCalled();
  });

  describe('props.data function', () => {
    it('calls data func with canvas node', () => {
      const resultData = { test: 1 };
      const dataFn = jest.fn(() => resultData);
      // @ts-ignore
      const { getByTestId } = render(getContent(getProps({ data: dataFn })));

      const canvas = getByTestId(dataTestIds.canvas);

      expect(dataFn).toHaveBeenCalledTimes(1);
      expect(dataFn).toHaveBeenCalledWith(canvas);
    });
  });

  describe('checkDatasets', () => {
    let consoleSpy: any;

    beforeEach(() => {
      consoleSpy = jest.spyOn(global.console, 'error');
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    // it("should log error to console if datasets don't have a label", () => {
    //   const { rerender } = render(getContent(getProps({ data: {} })));
    //
    //   rerender(
    //     getContent(
    //       getProps({
    //         data: {
    //           datasets: [
    //             {
    //               data: [10, 20, 10, 20, 10, 20, 10],
    //             },
    //             {
    //               data: [50, 100, 50, 100, 50, 100, 50],
    //             },
    //           ],
    //         },
    //       })
    //     )
    //   );
    //
    //   expect(consoleSpy).toHaveBeenCalledTimes(1);
    // });

    it('should not log error to console if all datasets have a label', () => {
      const { rerender } = render(getContent(getProps({ data: {} })));

      rerender(
        getContent(
          getProps({
            data: {
              datasets: [
                {
                  label: 'My first dataset',
                  data: [10, 20, 10, 20, 10, 20, 10],
                },
                {
                  label: 'My second dataset',
                  data: [50, 100, 50, 100, 50, 100, 50],
                },
              ],
            },
          })
        )
      );

      expect(consoleSpy).toHaveBeenCalledTimes(0);
    });

    it('should not log error to console if a custom datasetKeyProvider is provided', () => {
      const { rerender } = render(
        getContent(getProps({ datasetKeyProvider: d => d._id }))
      );

      rerender(
        getContent(
          getProps({
            data: {
              datasets: [
                {
                  // @ts-ignore
                  _id: '238940890234809234',
                  data: [10, 20, 10, 20, 10, 20, 10],
                },
                {
                  _id: '098340598345839455',
                  data: [50, 100, 50, 100, 50, 100, 50],
                },
              ],
            },
          })
        )
      );

      expect(consoleSpy).toHaveBeenCalledTimes(0);
    });
  });
});
