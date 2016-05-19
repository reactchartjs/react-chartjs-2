'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.Doughnut = Doughnut;
exports.Pie = Pie;
exports.Line = Line;
exports.Bar = Bar;
exports.Radar = Radar;
exports.Polar = Polar;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _chartJs = require('chart.js');

var _chartJs2 = _interopRequireDefault(_chartJs);

var ChartComponent = _react2['default'].createClass({

	displayName: 'ChartComponent',

	propTypes: {
		data: _react.PropTypes.object.isRequired,
		height: _react.PropTypes.number,
		legend: _react.PropTypes.object,
		options: _react.PropTypes.object,
		redraw: _react.PropTypes.bool,
		type: _react.PropTypes.oneOf(['doughnut', 'pie', 'line', 'bar', 'radar', 'polarArea']),
		width: _react.PropTypes.number
	},

	getDefaultProps: function getDefaultProps() {
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

	componentWillMount: function componentWillMount() {
		this.chart_instance = undefined;
	},

	componentDidMount: function componentDidMount() {
		this.renderChart();
	},

	componentDidUpdate: function componentDidUpdate() {
		if (this.props.redraw) {
			this.chart_instance.destroy();
			this.renderChart();
		}
	},

	shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
		return this.props !== nextProps;
	},

	componentWillUnmount: function componentWillUnmount() {
		this.chart_instance.destroy();
	},

	renderChart: function renderChart() {
		var _props = this.props;
		var data = _props.data;
		var options = _props.options;
		var legend = _props.legend;
		var type = _props.type;

		var node = _reactDom2['default'].findDOMNode(this);

		this.chart_instance = new _chartJs2['default'](node, {
			type: type,
			data: data,
			options: options
		});
	},

	render: function render() {
		var _props2 = this.props;
		var height = _props2.height;
		var width = _props2.width;

		return _react2['default'].createElement('canvas', {
			height: height,
			width: width
		});
	}
});

exports['default'] = ChartComponent;

function Doughnut(props) {
	return _react2['default'].createElement(ChartComponent, _extends({}, props, { type: 'doughnut' }));
}

function Pie(props) {
	return _react2['default'].createElement(ChartComponent, _extends({}, props, { type: 'pie' }));
}

function Line(props) {
	return _react2['default'].createElement(ChartComponent, _extends({}, props, { type: 'line' }));
}

function Bar(props) {
	return _react2['default'].createElement(ChartComponent, _extends({}, props, { type: 'bar' }));
}

function Radar(props) {
	return _react2['default'].createElement(ChartComponent, _extends({}, props, { type: 'radar' }));
}

function Polar(props) {
	return _react2['default'].createElement(ChartComponent, _extends({}, props, { type: 'polarArea' }));
}