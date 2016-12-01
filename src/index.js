import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';
import deepEqual from './utils/deepEqual';

const ChartComponent = React.createClass({

	displayName: 'ChartComponent',

	propTypes: {
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
	},

	getDefaultProps() {
		return {
			legend: {
				display: true,
				position: 'bottom'
			},
			type: 'doughnut',
			height: 150,
			width: 300,
			redraw: false
		};
	},

	componentWillMount() {
		this.chart_instance = undefined;
	},

	componentDidMount() {
		this.renderChart();
	},

	componentDidUpdate() {
		if (this.props.redraw) {
			this.chart_instance.destroy();
			this.renderChart();
		} else {
			this.updateChart();
		}
	},

	_objectWithoutProperties (obj, keys) {
		var target = {};
		for (var i in obj) {
			if (keys.indexOf(i) >= 0) continue;
			if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
			target[i] = obj[i];
		}
		return target;
	},

	shouldComponentUpdate(nextProps, nextState) {
		const ignoredProperties = ['id', 'width', 'height', 'onElementsClick'];
		const compareNext = this._objectWithoutProperties(nextProps, ignoredProperties);
		const compareNow = this._objectWithoutProperties(this.props, ignoredProperties);

		return !deepEqual(compareNext, compareNow, {strict: true});
	},

	componentWillUnmount() {
		this.chart_instance.destroy();
	},

	updateChart() {
		const {data, options} = this.props;

		if (!this.chart_instance) return;

		if (options) {
			this.chart_instance.options = Chart.helpers.configMerge(this.chart_instance.options, options);
		}

		this.chart_instance.config.data = {
			...this.chart_instance.config.data,
			...data
		};

		this.chart_instance.update();
	},

	renderChart() {
		const {data, options, legend, type} = this.props;
		const node = ReactDOM.findDOMNode(this);

		this.chart_instance = new Chart(node, {
			type,
			data,
			options
		});
	},

	handleOnClick(event) {
    const instance = this.chart_instance;

    const {
      getDatasetAtEvent,
      getElementAtEvent,
      getElementsAtEvent,
      onElementsClick
    } = this.props;

    getDatasetAtEvent && getDatasetAtEvent(instance.getDatasetAtEvent(event));
		getElementAtEvent && getElementAtEvent(instance.getElementAtEvent(event));
		getElementsAtEvent && getElementsAtEvent(instance.getElementsAtEvent(event));
    onElementsClick && onElementsClick(instance.getElementsAtEvent(event)); // Backward compatibility
	},

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
});

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
export { Chart };
