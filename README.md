[![build status](	https://img.shields.io/travis/gor181/react-chartjs-2.svg?branch=master&style=flat-square)](https://travis-ci.org/gor181/react-chartjs-2)
[![version](https://img.shields.io/npm/v/react-chartjs-2.svg?style=flat-square)](https://www.npmjs.com/package/react-chartjs-2)
[![downloads](https://img.shields.io/npm/dm/react-chartjs-2.svg?style=flat-square)](https://npm-stat.com/charts.html?package=react-chartjs-2&from=2016-01-01)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](http://opensource.org/licenses/MIT)

# react-chartjs-2

React wrapper for [Chart.js 2](http://www.chartjs.org/docs/#getting-started)
Open for PRs and contributions!

# UPDATE to 2.x
As of 2.x we have made chart.js a peer dependency for greater flexibility. Please add chart.js as a dependency on your project to use 2.x. Currently, 2.4.x is the recommended version of chart.js to use.

# Looking for Contributors!
Actively looking for contributors as for the moment I do not have enough time to dedicate for maintaining this lib.
All contributors can add themselves to Contributors section at the bottom of README.

## Demo & Examples

Live demo: [gor181.github.io/react-chartjs-2](http://gor181.github.io/react-chartjs-2/)

To build the examples locally, run:

```bash
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.

## Demo & Examples via React Storybook

We have to build the package, then you can run storybook.

```bash
npm run build
npm run storybook
```

Then open [`localhost:6006`](http://localhost:6006) in a browser.


## Installation via NPM

```bash
npm install react-chartjs-2 chart.js --save
```


## Usage

Check example/src/components/* for usage.

```js
import {Doughnut} from 'react-chartjs-2';

<Doughnut data={...} />
```

### Properties

* data: (PropTypes.object | PropTypes.func).isRequired,
* width: PropTypes.number,
* height: PropTypes.number,
* legend: PropTypes.object,
* options: PropTypes.object,
* redraw: PropTypes.bool,
* getDatasetAtEvent: PropTypes.func,
* getElementAtEvent: PropTypes.func,
* getElementsAtEvent: PropTypes.func
* onElementsClick: PropTypes.func, // alias for getElementsAtEvent (backward compatibility)

### Custom size
In order for Chart.js to obey the custom size you need to set `maintainAspectRatio` to false, example:

```js
<Bar
	data={data}
	width={100}
	height={50}
	options={{
		maintainAspectRatio: false
	}}
/>
```

### Chart.js instance
Chart.js instance can be accessed by placing a ref to the element as:

```js
render() {
	componentDidMount() {
		console.log(this.refs.chart.chart_instance); // returns a Chart.js instance reference
	}
	return (
		<Doughnut ref='chart' data={data} />
	)
}
```

### Getting context for data generation
Canvas node and hence context, that can be used to create CanvasGradient background,
is passed as argument to data if given as function:

This approach is useful when you want to keep your components pure.

```js
render() {
	const data = (canvas) => {
		const ctx = canvas.getContext("2d")
		const gradient = ctx.createLinearGradient(0,0,100,0);
		...
		return {
			...
			backgroundColor: gradient
			...
		}
	}

	return (
		<Line data={data} />
	)
}
```

### Chart.js Defaults
Chart.js defaults can be set by importing the `defaults` object:

```javascript
import { defaults } from 'react-chartjs-2';

// Disable animating charts by default.
defaults.global.animation = false;
```

If you want to bulk set properties, try using the [lodash.merge](https://lodash.com/docs/#merge) function. This function will do a deep recursive merge preserving previously set values that you don't want to update.

```js
import { defaults } from 'react-chartjs-2';
import merge from 'lodash.merge';
// or
// import { merge } from 'lodash';

merge(defaults, {
	global: {
  		animation: false,
		line: {
			borderColor: '#F85F73',
		},
	},
});
```

### Chart.js object

You can access the internal Chart.js object to register plugins or extend charts like this:

```JavaScript
import { Chart } from 'react-chartjs-2';

componentWillMount() {
	Chart.pluginService.register({
		afterDraw: function (chart, easing) {
			// Plugin code.
		}
	});
}
```

### Scatter Charts

If you're using Chart.js 2.6 and below, add the `showLines: false` property to your chart options. This was later [added](https://github.com/chartjs/Chart.js/commit/7fa60523599a56255cde78a49e848166bd233c6e) in the default config, so users of later versions would not need to do this extra step.

### Events

#### onElementsClick || getElementsAtEvent (function)

A function to be called when mouse clicked on chart elememts, will return all element at that point as an array. [Check](https://github.com/chartjs/Chart.js/blob/master/docs/09-Advanced.md#getelementsatevente)

```js
{
	onElementsClick: (elems) => {},
	getElementsAtEvent: (elems) => {},
	// `elems` is an array of chartElements
}

```
#### getElementAtEvent (function)

Calling getElementAtEvent(event) on your Chart instance passing an argument of an event, or jQuery event, will return the single element at the event position. If there are multiple items within range, only the first is returned [Check](https://github.com/chartjs/Chart.js/blob/master/docs/09-Advanced.md#getelementatevente)

```js
{
	getElementAtEvent: (elems) => {},
  // => returns the first element at the event point.
}
```

#### getDatasetAtEvent (function)

Looks for the element under the event point, then returns all elements from that dataset. This is used internally for 'dataset' mode highlighting [Check](https://github.com/chartjs/Chart.js/blob/master/docs/09-Advanced.md#getdatasetatevente)

```js
{
	getDatasetAtEvent: (dataset) => {}
	// `dataset` is an array of chartElements
}
```

### Working with Multiple Datasets

You will find that any event which causes the chart to re-render, such as hover tooltips, etc., will cause the first dataset to be copied over to other datasets, causing your lines and bars to merge together. This is because to track changes in the dataset series, the library needs a `key` to be specified - if none is found, it can't tell the difference between the datasets while updating. To get around this issue, you can take these two approaches:

1. Add a `label` property on each dataset. By default, this library uses the `label` property as the key to distinguish datasets.
2. Specify a different property to be used as a key by passing a `datasetKeyProvider` prop to your chart component, which would return a unique string value for each dataset.

## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## Thanks

Jed Watson for making react-component yo builder!

## License

MIT Licensed
Copyright (c) 2016 Goran Udosic

## Contributors
Jeremy Ayerst [@jerairrest](https://github.com/jerairrest)
