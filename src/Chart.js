import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';

import uid from 'uid';

const ChartComponent = React.createClass({

	displayName: 'ChartComponent',

	propTypes: {
		data: PropTypes.object.isRequired,
		height: PropTypes.number,
		legend: PropTypes.object,
		options: PropTypes.object,
		redraw: PropTypes.bool,
		type: PropTypes.oneOf(['doughnut', 'pie', 'line', 'bar', 'radar', 'polarArea']),
		width: PropTypes.number
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
			redraw: true
		};
	},

	componentWillMount() {
		this.chart_instance = undefined;
    this.chart_uid = uid(10);
	},

	componentDidMount() {
    this.renderChart();
  },

  componentDidUpdate() {
		if (this.props.redraw) {
			this.chart_instance.destroy();
	    this.renderChart();
		}
  },

	shouldComponentUpdate(nextProps) {
		return this.props !== nextProps;
	},

  componentWillUnmount() {
    this.chart_instance.destroy();
  },

	renderChart() {
    const {data, options, legend, type} = this.props;
    const node = ReactDOM.findDOMNode(this.refs[this.getRefKey()]);

    this.chart_instance = new Chart(node, {
      type,
      data,
      options
    });
  },

  getRefKey() {
    return `chart-${this.chart_uid}`;
  },

  render() {
		const {height, width} = this.props;

    return (
      <canvas
				height={height}
				width={width}
				ref={this.getRefKey()}
				key={this.chart_uid}
			/>
    );
  }
});

export default ChartComponent;

export function Doughnut(props) {
	return <ChartComponent {...props} type='doughnut' />;
}

export function Pie(props) {
	return <ChartComponent {...props} type='pie' />;
}

export function Line(props) {
	return <ChartComponent {...props} type='line' />;
}

export function Bar(props) {
	return <ChartComponent {...props} type='bar' />;
}

export function Radar(props) {
	return <ChartComponent {...props} type='radar' />;
}

export function Polar(props) {
	return <ChartComponent {...props} type='polarArea' />;
}
