import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';
import deepEqual from './utils/deepEqual';

const ChartComponent = React.createClass({

	displayName: 'ChartComponent',

	propTypes: {
		data: PropTypes.object.isRequired,
		height: PropTypes.number,
		legend: PropTypes.object,
		onElementsClick: PropTypes.func,
		options: PropTypes.object,
		redraw: PropTypes.bool,
		type: PropTypes.oneOf(['doughnut', 'pie', 'line', 'bar', 'horizontalBar', 'radar', 'polarArea']),
		width: PropTypes.number,
	},

	getDefaultProps() {
		return {
			legend: {
				display: true,
				position: 'bottom'
			},
			type: 'doughnut',
			height: 200,
			width: 200,
			redraw: false,
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
		const compareNext = this._objectWithoutProperties(nextProps, ['id', 'width', 'height']);
		const compareNow = this._objectWithoutProperties(this.props, ['id', 'width', 'height']);
		return !deepEqual(compareNext, compareNow, {strict: true});
	},

	componentWillUnmount() {
		this.chart_instance.destroy();
	},

	updateChart() {
		const {data, options} = this.props;

		if (!this.chart_instance) return;

		if (options) {
			Chart.helpers.configMerge(this.chart_instance.options, options);
		}

		data.datasets.forEach((dataset, index) => {
			this.chart_instance.data.datasets[index] = dataset;
		});

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

	handleOnClick(evt) {
		const elems = this.chart_instance.getElementsAtEvent(evt);
		if (elems.length) {
			const {onElementsClick} = this.props;
			onElementsClick(elems);
		}
	},

	render() {
		const {height, width, onElementsClick} = this.props;

		return (
			<canvas
				height={height}
				width={width}
				onClick={typeof onElementsClick === 'function' ? this.handleOnClick : null}
			/>
		);
	}
});

export default ChartComponent;

export function Doughnut (props) {
	return <ChartComponent {...props} type='doughnut' />;
}

export function Pie (props) {
	return <ChartComponent {...props} type='pie' />;
}

export function Line (props) {
	return <ChartComponent {...props} type='line' />;
}

export function Bar (props) {
	return <ChartComponent {...props} type='bar' />;
}

export function HorizontalBar (props) {
	return <ChartComponent {...props} type='horizontalBar' />;
}

export function Radar (props) {
	return <ChartComponent {...props} type='radar' />;
}

export function Polar (props) {
	return <ChartComponent {...props} type='polarArea' />;
}
