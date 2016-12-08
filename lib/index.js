'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chart = exports.defaults = exports.Bubble = exports.Polar = exports.Radar = exports.HorizontalBar = exports.Bar = exports.Line = exports.Pie = exports.Doughnut = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _chart = require('chart.js');

var _chart2 = _interopRequireDefault(_chart);

var _lodash = require('lodash.isequal');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChartComponent = function (_React$Component) {
  _inherits(ChartComponent, _React$Component);

  function ChartComponent() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ChartComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ChartComponent.__proto__ || Object.getPrototypeOf(ChartComponent)).call.apply(_ref, [this].concat(args))), _this), _this.handleOnClick = function (event) {
      var instance = _this.chart_instance;

      var _this$props = _this.props,
          getDatasetAtEvent = _this$props.getDatasetAtEvent,
          getElementAtEvent = _this$props.getElementAtEvent,
          getElementsAtEvent = _this$props.getElementsAtEvent,
          onElementsClick = _this$props.onElementsClick;


      getDatasetAtEvent && getDatasetAtEvent(instance.getDatasetAtEvent(event), event);
      getElementAtEvent && getElementAtEvent(instance.getElementAtEvent(event), event);
      getElementsAtEvent && getElementsAtEvent(instance.getElementsAtEvent(event), event);
      onElementsClick && onElementsClick(instance.getElementsAtEvent(event), event); // Backward compatibility
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ChartComponent, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.chart_instance = undefined;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.renderChart();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.redraw) {
        this.chart_instance.destroy();
        this.renderChart();
        return;
      }

      this.updateChart();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var _props = this.props,
          redraw = _props.redraw,
          type = _props.type,
          options = _props.options,
          legend = _props.legend,
          height = _props.height,
          width = _props.width;


      if (nextProps.redraw === true) {
        return true;
      }

      if (height !== nextProps.height || width !== nextProps.width) {
        return true;
      }

      if (type !== nextProps.type) {
        return true;
      }

      if (!(0, _lodash2.default)(legend, nextProps.legend)) {
        return true;
      }

      if (!(0, _lodash2.default)(options, nextProps.options)) {
        return true;
      }

      return !(0, _lodash2.default)(this.shadowDataProp, nextProps.data);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.chart_instance.destroy();
    }

    // Chart.js directly mutates the data.dataset objects by adding _meta proprerty
    // this makes impossible to compare the current and next data changes
    // therefore we memoize the data prop while sending a fake to Chart.js for mutation.
    // see https://github.com/chartjs/Chart.js/blob/master/src/core/core.controller.js#L615-L617

  }, {
    key: 'memoizeDataProps',
    value: function memoizeDataProps() {
      var data = this.props.data;


      if (!data) {
        return;
      }

      this.shadowDataProp = _extends({}, data, {
        datasets: data.datasets && data.datasets.map(function (set) {
          return Object.assign({}, set);
        })
      });
    }
  }, {
    key: 'updateChart',
    value: function updateChart() {
      var _props2 = this.props,
          data = _props2.data,
          options = _props2.options;


      this.memoizeDataProps();

      if (!this.chart_instance) return;

      if (options) {
        this.chart_instance.options = _chart2.default.helpers.configMerge(this.chart_instance.options, options);
      }

      // Pipe datasets to chart instance datasets enabling
      // seamless transitions
      var currentDatasets = this.chart_instance.config.data && this.chart_instance.config.data.datasets || [];
      var nextDatasets = data.datasets || [];

      nextDatasets.forEach(function (dataset, sid) {
        if (currentDatasets[sid] && currentDatasets[sid].data) {
          currentDatasets[sid].data.splice(nextDatasets[sid].data.length);

          dataset.data.forEach(function (point, pid) {
            currentDatasets[sid].data[pid] = nextDatasets[sid].data[pid];
          });

          var _data = dataset.data,
              otherProps = _objectWithoutProperties(dataset, ['data']);

          currentDatasets[sid] = _extends({
            data: currentDatasets[sid].data
          }, currentDatasets[sid], otherProps);
        } else {
          currentDatasets[sid] = nextDatasets[sid];
        }
      });

      var datasets = data.datasets,
          rest = _objectWithoutProperties(data, ['datasets']);

      this.chart_instance.config.data = _extends({}, this.chart_instance.config.data, rest);

      this.chart_instance.update();
    }
  }, {
    key: 'renderChart',
    value: function renderChart() {
      var _props3 = this.props,
          data = _props3.data,
          options = _props3.options,
          legend = _props3.legend,
          type = _props3.type,
          redraw = _props3.redraw;

      var node = _reactDom2.default.findDOMNode(this);

      this.memoizeDataProps();

      this.chart_instance = new _chart2.default(node, {
        type: type,
        data: data,
        options: options
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          height = _props4.height,
          width = _props4.width,
          onElementsClick = _props4.onElementsClick;


      return _react2.default.createElement('canvas', {
        height: height,
        width: width,
        onClick: this.handleOnClick
      });
    }
  }]);

  return ChartComponent;
}(_react2.default.Component);

ChartComponent.propTypes = {
  data: _react.PropTypes.object.isRequired,
  getDatasetAtEvent: _react.PropTypes.func,
  getElementAtEvent: _react.PropTypes.func,
  getElementsAtEvent: _react.PropTypes.func,
  height: _react.PropTypes.number,
  legend: _react.PropTypes.object,
  onElementsClick: _react.PropTypes.func,
  options: _react.PropTypes.object,
  redraw: _react.PropTypes.bool,
  type: _react.PropTypes.oneOf(['doughnut', 'pie', 'line', 'bar', 'horizontalBar', 'radar', 'polarArea', 'bubble']),
  width: _react.PropTypes.number
};
ChartComponent.defaultProps = {
  legend: {
    display: true,
    position: 'bottom'
  },
  type: 'doughnut',
  height: 150,
  width: 300,
  redraw: false,
  options: {}
};
exports.default = ChartComponent;

var Doughnut = exports.Doughnut = function (_React$Component2) {
  _inherits(Doughnut, _React$Component2);

  function Doughnut() {
    _classCallCheck(this, Doughnut);

    return _possibleConstructorReturn(this, (Doughnut.__proto__ || Object.getPrototypeOf(Doughnut)).apply(this, arguments));
  }

  _createClass(Doughnut, [{
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(ChartComponent, _extends({}, this.props, {
        ref: function ref(_ref2) {
          return _this3.chart_instance = _ref2 && _ref2.chart_instance;
        },
        type: 'doughnut'
      }));
    }
  }]);

  return Doughnut;
}(_react2.default.Component);

var Pie = exports.Pie = function (_React$Component3) {
  _inherits(Pie, _React$Component3);

  function Pie() {
    _classCallCheck(this, Pie);

    return _possibleConstructorReturn(this, (Pie.__proto__ || Object.getPrototypeOf(Pie)).apply(this, arguments));
  }

  _createClass(Pie, [{
    key: 'render',
    value: function render() {
      var _this5 = this;

      return _react2.default.createElement(ChartComponent, _extends({}, this.props, {
        ref: function ref(_ref3) {
          return _this5.chart_instance = _ref3 && _ref3.chart_instance;
        },
        type: 'pie'
      }));
    }
  }]);

  return Pie;
}(_react2.default.Component);

var Line = exports.Line = function (_React$Component4) {
  _inherits(Line, _React$Component4);

  function Line() {
    _classCallCheck(this, Line);

    return _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).apply(this, arguments));
  }

  _createClass(Line, [{
    key: 'render',
    value: function render() {
      var _this7 = this;

      return _react2.default.createElement(ChartComponent, _extends({}, this.props, {
        ref: function ref(_ref4) {
          return _this7.chart_instance = _ref4 && _ref4.chart_instance;
        },
        type: 'line'
      }));
    }
  }]);

  return Line;
}(_react2.default.Component);

var Bar = exports.Bar = function (_React$Component5) {
  _inherits(Bar, _React$Component5);

  function Bar() {
    _classCallCheck(this, Bar);

    return _possibleConstructorReturn(this, (Bar.__proto__ || Object.getPrototypeOf(Bar)).apply(this, arguments));
  }

  _createClass(Bar, [{
    key: 'render',
    value: function render() {
      var _this9 = this;

      return _react2.default.createElement(ChartComponent, _extends({}, this.props, {
        ref: function ref(_ref5) {
          return _this9.chart_instance = _ref5 && _ref5.chart_instance;
        },
        type: 'bar'
      }));
    }
  }]);

  return Bar;
}(_react2.default.Component);

var HorizontalBar = exports.HorizontalBar = function (_React$Component6) {
  _inherits(HorizontalBar, _React$Component6);

  function HorizontalBar() {
    _classCallCheck(this, HorizontalBar);

    return _possibleConstructorReturn(this, (HorizontalBar.__proto__ || Object.getPrototypeOf(HorizontalBar)).apply(this, arguments));
  }

  _createClass(HorizontalBar, [{
    key: 'render',
    value: function render() {
      var _this11 = this;

      return _react2.default.createElement(ChartComponent, _extends({}, this.props, {
        ref: function ref(_ref6) {
          return _this11.chart_instance = _ref6 && _ref6.chart_instance;
        },
        type: 'horizontalBar'
      }));
    }
  }]);

  return HorizontalBar;
}(_react2.default.Component);

var Radar = exports.Radar = function (_React$Component7) {
  _inherits(Radar, _React$Component7);

  function Radar() {
    _classCallCheck(this, Radar);

    return _possibleConstructorReturn(this, (Radar.__proto__ || Object.getPrototypeOf(Radar)).apply(this, arguments));
  }

  _createClass(Radar, [{
    key: 'render',
    value: function render() {
      var _this13 = this;

      return _react2.default.createElement(ChartComponent, _extends({}, this.props, {
        ref: function ref(_ref7) {
          return _this13.chart_instance = _ref7 && _ref7.chart_instance;
        },
        type: 'radar'
      }));
    }
  }]);

  return Radar;
}(_react2.default.Component);

var Polar = exports.Polar = function (_React$Component8) {
  _inherits(Polar, _React$Component8);

  function Polar() {
    _classCallCheck(this, Polar);

    return _possibleConstructorReturn(this, (Polar.__proto__ || Object.getPrototypeOf(Polar)).apply(this, arguments));
  }

  _createClass(Polar, [{
    key: 'render',
    value: function render() {
      var _this15 = this;

      return _react2.default.createElement(ChartComponent, _extends({}, this.props, {
        ref: function ref(_ref8) {
          return _this15.chart_instance = _ref8 && _ref8.chart_instance;
        },
        type: 'polarArea'
      }));
    }
  }]);

  return Polar;
}(_react2.default.Component);

var Bubble = exports.Bubble = function (_React$Component9) {
  _inherits(Bubble, _React$Component9);

  function Bubble() {
    _classCallCheck(this, Bubble);

    return _possibleConstructorReturn(this, (Bubble.__proto__ || Object.getPrototypeOf(Bubble)).apply(this, arguments));
  }

  _createClass(Bubble, [{
    key: 'render',
    value: function render() {
      var _this17 = this;

      return _react2.default.createElement(ChartComponent, _extends({}, this.props, {
        ref: function ref(_ref9) {
          return _this17.chart_instance = _ref9 && _ref9.chart_instance;
        },
        type: 'bubble'
      }));
    }
  }]);

  return Bubble;
}(_react2.default.Component);

var defaults = exports.defaults = _chart2.default.defaults;
exports.Chart = _chart2.default;