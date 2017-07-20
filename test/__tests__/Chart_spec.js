import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { jsdom } from 'jsdom';
import sinon from 'sinon';

import Chart, { Chart as ChartConstructor } from '../../src/index';

const noop = () => {};
const createDOM = () => jsdom('<!doctype html><html><body><div></div></body></html>');

describe('<Chart />', () => {
  let DOM;

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
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };

  ChartConstructor.plugins.register({
    afterInit: function (chartInstance) {
      chartInstance.getDatasetAtEvent = function (e) {
        return ChartConstructor.Interaction.modes.dataset(this, e, this.options);
      };
    }
  });

  const mountComponent = props => mount(
      <Chart data={data} {...props} />,
      { attachTo: DOM.body.firstChild }
  );

  beforeEach(() => {
    DOM = createDOM();
  });

  it('renders', () => {
    const wrapper = mountComponent();
    expect(wrapper).to.be.truthy;
  });

  it('renders chart on props.redraw(true)', () => {
    const spy = sinon.spy(Chart.prototype, 'renderChart');
    const wrapper = mountComponent();

    expect(spy.callCount).to.equal(1);

    wrapper.setProps({ redraw: true });
    expect(spy.callCount).to.equal(2);

    spy.restore();
  });

  it('renders on props.height change', () => {
    const spy = sinon.spy(Chart.prototype, 'render');
    const wrapper = mountComponent({ height: 100 });

    expect(spy.callCount).to.equal(1);

    wrapper.setProps({ height: 101 });
    expect(spy.callCount).to.equal(2);

    spy.restore();
  });

  it('renders on props.width change', () => {
    const spy = sinon.spy(Chart.prototype, 'render');
    const wrapper = mountComponent({ width: 100 });

    expect(spy.callCount).to.equal(1);

    wrapper.setProps({ width: 101 });
    expect(spy.callCount).to.equal(2);

    spy.restore();
  });

  it('renders on props.type change', () => {
    const spy = sinon.spy(Chart.prototype, 'render');
    const wrapper = mountComponent({ type: 'line' });

    expect(spy.callCount).to.equal(1);

    wrapper.setProps({ type: 'line' });

    expect(spy.callCount).to.equal(1);

    wrapper.setProps({ type: 'bar' });

    expect(spy.callCount).to.equal(2);

    spy.restore();
  });

  it('renders on props.legend change', () => {
    const spy = sinon.spy(Chart.prototype, 'render');
    const wrapper = mountComponent({ legend: {} });

    expect(spy.callCount).to.equal(1);

    wrapper.setProps({ legend: {} });

    expect(spy.callCount).to.equal(1);

    wrapper.setProps({ legend: { a: 1 } });

    expect(spy.callCount).to.equal(2);

    spy.restore();
  });

  it('renders on props.options change', () => {
    const spy = sinon.spy(Chart.prototype, 'render');
    const wrapper = mountComponent({ options: {} });

    expect(spy.callCount).to.equal(1);

    wrapper.setProps({ options: {} });

    expect(spy.callCount).to.equal(1);

    wrapper.setProps({ options: { a: 1 } });

    expect(spy.callCount).to.equal(2);

    spy.restore();
  });

  it('renders on props.data change', () => {
    const spy = sinon.spy(Chart.prototype, 'render');
    const wrapper = mountComponent();

    expect(spy.callCount).to.equal(1);

    wrapper.setProps({ data: {} });
    expect(spy.callCount).to.equal(2);

    spy.restore();
  });

  it('doesn\'t render when props didn\'t change', () => {
    const spy = sinon.spy(Chart.prototype, 'render');
    const wrapper = mountComponent();

    wrapper.setProps({ data });
    wrapper.setProps({ data });

    expect(spy.callCount).to.equal(1);

    spy.restore();
  });

  it('doesn\'t render when function references are changed', () => {
    const spy = sinon.spy(Chart.prototype, 'render');
    const wrapper = mountComponent();

    wrapper.setProps({ data });
    wrapper.setProps({ data, getDatasetAtEvent: noop });
    wrapper.setProps({ data, getElementAtEvent: noop });
    wrapper.setProps({ data, getElementsAtEvent: noop });

    expect(spy.callCount).to.equal(1);

    spy.restore();
  });

  it('calls getDatasetAtEvent', () => {
    const getDatasetAtEvent = sinon.spy();
    const wrapper = mountComponent({ getDatasetAtEvent });

    wrapper.find('canvas').simulate('click');

    expect(getDatasetAtEvent.called).to.equal(true);
  });

  it('calls getElementAtEvent', () => {
    const getElementAtEvent = sinon.spy();
    const wrapper = mountComponent({ getElementAtEvent });

    wrapper.find('canvas').simulate('click');

    expect(getElementAtEvent.called).to.equal(true);
  });

  it('calls getElementsAtEvent', () => {
    const getElementsAtEvent = sinon.spy();
    const wrapper = mountComponent({ getElementsAtEvent });

    wrapper.find('canvas').simulate('click');

    expect(getElementsAtEvent.called).to.equal(true);
  });

  it('calls onElementsClick', () => {
    const onElementsClick = sinon.spy();
    const wrapper = mountComponent({ onElementsClick });

    wrapper.find('canvas').simulate('click');

    expect(onElementsClick.called).to.equal(true);
  });

  describe('props.data function', () => {
    it('calls data func with canvas node', () => {
      const resultData = { test: 1 };
      const dataFn = sinon.spy((canvas) => resultData);
      const wrapper = mountComponent({ data: dataFn });

      const canvas = wrapper.find('canvas').at(0).node;

      expect(dataFn.callCount).to.equal(1);
      expect(dataFn.calledWith(canvas)).to.equal(true);
    });
  });
});
