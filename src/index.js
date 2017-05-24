import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';
import isEqual from 'lodash.isequal';

class ChartComponent extends React.Component {
  static getLabelAsKey = d => d.label;

  static propTypes = {
    data: PropTypes.oneOfType([
    	PropTypes.object,
    	PropTypes.func
    ]).isRequired,
    getDatasetAtEvent: PropTypes.func,
    getElementAtEvent: PropTypes.func,
    getElementsAtEvent: PropTypes.func,
    height: PropTypes.number,
    legend: PropTypes.object,
    onElementsClick: PropTypes.func,
    options: PropTypes.object,
    plugins: PropTypes.arrayOf(PropTypes.object),
    redraw: PropTypes.bool,
    type: PropTypes.oneOf(['doughnut', 'pie', 'line', 'bar', 'horizontalBar', 'radar', 'polarArea', 'bubble']),
    width: PropTypes.number,
    datasetKeyProvider: PropTypes.func
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
    options: {},
    datasetKeyProvider: ChartComponent.getLabelAsKey
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
      plugins,
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

    const nextData = this.transformDataProp(nextProps);

	  if( !isEqual(this.shadowDataProp, nextData)) {
		  return true;
	  }

    return !isEqual(plugins, nextProps.plugins);


  }

  componentWillUnmount() {
    this.chart_instance.destroy();
  }

  transformDataProp(props) {
    const { data } = props;
    if (typeof(data) == 'function') {
      const node = ReactDOM.findDOMNode(this);
      return data(node);
    } else {
      return data;
    }
  }

  // Chart.js directly mutates the data.dataset objects by adding _meta proprerty
  // this makes impossible to compare the current and next data changes
  // therefore we memoize the data prop while sending a fake to Chart.js for mutation.
  // see https://github.com/chartjs/Chart.js/blob/master/src/core/core.controller.js#L615-L617
  memoizeDataProps() {
    if (!this.props.data) {
      return;
    }

    const data = this.transformDataProp(this.props);

    this.shadowDataProp = {
      ...data,
      datasets: data.datasets && data.datasets.map(set => {
        return {
            ...set
        };
      })
    };

    return data;
  }

  updateChart() {
    const {options} = this.props;

    const data = this.memoizeDataProps(this.props);

    if (!this.chart_instance) return;

    if (options) {
      this.chart_instance.options = Chart.helpers.configMerge(this.chart_instance.options, options);
    }

    // Pipe datasets to chart instance datasets enabling
    // seamless transitions
    let currentDatasets = (this.chart_instance.config.data && this.chart_instance.config.data.datasets) || [];
    const nextDatasets = data.datasets || [];

	  // use the key provider to work out which series have been added/removed/changed
	  const currentDatasetKeys = currentDatasets.map(this.props.datasetKeyProvider);
	  const nextDatasetKeys = nextDatasets.map(this.props.datasetKeyProvider);
    const shouldWarn = !currentDatasetKeys.every(d => typeof d !== "undefined") || !nextDatasetKeys.every(d => typeof d !== "undefined");
	  const newDatasets = nextDatasets.filter(d => currentDatasetKeys.indexOf(this.props.datasetKeyProvider(d)) === -1);

    if (shouldWarn && !this.hasWarned) {
      this.hasWarned = true; // Only warn once per chart so console isn't spammed with warnings
      console.error('[react-chartjs-2] Warning: Each dataset needs a unique key. By default, the "label" property on each dataset is used. Alternatively, you may provide a "datasetKeyProvider" as a prop that returns a unique key.');
    }

	  // process the updates (via a reverse for loop so we can safely splice deleted datasets out of the array
	  for (let idx = currentDatasets.length - 1; idx >= 0; idx -= 1) {
			const currentDatasetKey = this.props.datasetKeyProvider(currentDatasets[idx]);
			if (nextDatasetKeys.indexOf(currentDatasetKey) === -1) {
			  // deleted series
			  currentDatasets.splice(idx, 1);
		  } else {
			  const retainedDataset = nextDatasets.find(d => this.props.datasetKeyProvider(d) === currentDatasetKey);
			  if (retainedDataset) {
				  // update it in place if it is a retained dataset
				  currentDatasets[idx].data.splice(retainedDataset.data.length);
				  retainedDataset.data.forEach((point, pid) => {
					  currentDatasets[idx].data[pid] = retainedDataset.data[pid];
				  });
				  const {data, ...otherProps} = retainedDataset;
				  currentDatasets[idx] = {
					  data: currentDatasets[idx].data,
					  ...currentDatasets[idx],
					  ...otherProps
				  };
			  }
		  }
	  }
	  // finally add any new series
	  newDatasets.forEach(d => currentDatasets.push(d));
    const { datasets, ...rest } = data;

    this.chart_instance.config.data = {
      ...this.chart_instance.config.data,
      ...rest
    };

    this.chart_instance.update();
  }

  renderChart() {
    const {options, legend, type, redraw, plugins} = this.props;
    const node = ReactDOM.findDOMNode(this);
    const data = this.memoizeDataProps();

    this.chart_instance = new Chart(node, {
      type,
      data,
      options,
      plugins
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
