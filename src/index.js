import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';
import isEqual from 'lodash.isequal';

class ChartComponent extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    getDatasetAtEvent: PropTypes.func,
    getElementAtEvent: PropTypes.func,
    getElementsAtEvent: PropTypes.func,
    height: PropTypes.number,
    legend: PropTypes.object,
    onElementsClick: PropTypes.func,
    options: PropTypes.object,
    redraw: PropTypes.bool,
    type: PropTypes.oneOf(['doughnut', 'pie', 'line', 'bar', 'horizontalBar', 'radar', 'polarArea', 'bubble']),
    width: PropTypes.number
  }

  static defaultProps = {
    legend: {
      display: true,
      position: 'bottom'
    },
    type: 'doughnut',
    height: 150,
    width: 300,
    redraw: false,
    options: {}
  }

  componentWillMount() {
    this.chart_instance = undefined;
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    if (this.props.redraw) {
      this.chart_instance.destroy();
      this.renderChart();
      return;
    }

    this.updateChart();
  }

  shouldComponentUpdate(nextProps) {
    const {
      redraw,
      type,
      options,
      legend,
      height,
      width
    } = this.props;

    if (nextProps.redraw === true) {
      return true;
    }

    if (height !== nextProps.height || width !== nextProps.width) {
      return true;
    }

    if (type !== nextProps.type) {
      return true;
    }

    if (!isEqual(legend, nextProps.legend)) {
      return true;
    }

    if (!isEqual(options, nextProps.options)) {
      return true;
    }

    return !isEqual(this.shadowDataProp, nextProps.data);
  }

  componentWillUnmount() {
    this.chart_instance.destroy();
  }

  // Chart.js directly mutates the data.dataset objects by adding _meta proprerty
  // this makes impossible to compare the current and next data changes
  // therefore we memoize the data prop while sending a fake to Chart.js for mutation.
  // see https://github.com/chartjs/Chart.js/blob/master/src/core/core.controller.js#L615-L617
  memoizeDataProps() {
    const { data } = this.props;

    if (!data) {
      return;
    }

    this.shadowDataProp = {
      ...data,
      datasets: data.datasets && data.datasets.map(set => {
        return {
            ...set
        }
      })
    };
  }

  updateChart() {
    const {data, options} = this.props;

    this.memoizeDataProps();

    if (!this.chart_instance) return;

    if (options) {
      this.chart_instance.options = Chart.helpers.configMerge(this.chart_instance.options, options);
    }

    // Pipe datasets to chart instance datasets enabling
    // seamless transitions
    let currentDatasets = (this.chart_instance.config.data && this.chart_instance.config.data.datasets) || [];
    const nextDatasets = data.datasets || [];

    nextDatasets.forEach((dataset, sid) => {
      if (currentDatasets[sid] && currentDatasets[sid].data) {
        currentDatasets[sid].data.splice(nextDatasets[sid].data.length);

        dataset.data.forEach((point, pid) => {
          currentDatasets[sid].data[pid] = nextDatasets[sid].data[pid];
        });

        const { data, ...otherProps } = dataset;

        currentDatasets[sid] = {
          data: currentDatasets[sid].data,
          ...currentDatasets[sid],
          ...otherProps
        };
      } else {
        currentDatasets[sid] = nextDatasets[sid];
      }
    });

    const { datasets, ...rest } = data;

    this.chart_instance.config.data = {
      ...this.chart_instance.config.data,
      ...rest
    };

    this.chart_instance.update();
  }

  renderChart() {
    const {data, options, legend, type, redraw} = this.props;
    const node = ReactDOM.findDOMNode(this);

    this.memoizeDataProps();

    this.chart_instance = new Chart(node, {
      type,
      data,
      options
    });
  }

  handleOnClick = (event) => {
    const instance = this.chart_instance;

    const {
      getDatasetAtEvent,
      getElementAtEvent,
      getElementsAtEvent,
      onElementsClick
    } = this.props;

    getDatasetAtEvent && getDatasetAtEvent(instance.getDatasetAtEvent(event), event);
    getElementAtEvent && getElementAtEvent(instance.getElementAtEvent(event), event);
    getElementsAtEvent && getElementsAtEvent(instance.getElementsAtEvent(event), event);
    onElementsClick && onElementsClick(instance.getElementsAtEvent(event), event); // Backward compatibility
  }

  render() {
    const {height, width, onElementsClick} = this.props;

    return (
      <canvas
        height={height}
        width={width}
        onClick={this.handleOnClick}
      />
    );
  }
}

export default ChartComponent;

export class Doughnut extends React.Component {
  render() {
    return (
      <ChartComponent
        {...this.props}
        ref={ref => this.chart_instance = ref && ref.chart_instance}
        type='doughnut'
      />
    );
  }
}

export class Pie extends React.Component {
  render() {
    return (
      <ChartComponent
        {...this.props}
        ref={ref => this.chart_instance = ref && ref.chart_instance}
        type='pie'
      />
    );
  }
}

export class Line extends React.Component {
  render() {
    return (
      <ChartComponent
        {...this.props}
        ref={ref => this.chart_instance = ref && ref.chart_instance}
        type='line'
      />
    );
  }
}

export class Bar extends React.Component {
  render() {
    return (
      <ChartComponent
        {...this.props}
        ref={ref => this.chart_instance = ref && ref.chart_instance}
        type='bar'
      />
    );
  }
}

export class HorizontalBar extends React.Component {
  render() {
    return (
      <ChartComponent
        {...this.props}
        ref={ref => this.chart_instance = ref && ref.chart_instance}
        type='horizontalBar'
      />
    );
  }
}

export class Radar extends React.Component {
  render() {
    return (
      <ChartComponent
        {...this.props}
        ref={ref => this.chart_instance = ref && ref.chart_instance}
        type='radar'
      />
    );
  }
}

export class Polar extends React.Component {
  render() {
    return (
      <ChartComponent
        {...this.props}
        ref={ref => this.chart_instance = ref && ref.chart_instance}
        type='polarArea'
      />
    );
  }
}

export class Bubble extends React.Component {
  render() {
    return (
      <ChartComponent
        {...this.props}
        ref={ref => this.chart_instance = ref && ref.chart_instance}
        type='bubble'
      />
    );
  }
}

export const defaults = Chart.defaults;
export {Chart};
