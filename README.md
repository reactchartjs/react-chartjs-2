[![build status](https://img.shields.io/travis/jerairrest/react-chartjs-2.svg?branch=master&style=flat-square)](https://travis-ci.org/jerairrest/react-chartjs-2)
[![version](https://img.shields.io/npm/v/react-chartjs-2.svg?style=flat-square)](https://www.npmjs.com/package/react-chartjs-2)
[![downloads](https://img.shields.io/npm/dm/react-chartjs-2.svg?style=flat-square)](https://npm-stat.com/charts.html?package=react-chartjs-2&from=2016-01-01)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](http://opensource.org/licenses/MIT)

# react-chartjs-2

React wrapper for [Chart.js](http://www.chartjs.org/docs/#getting-started)

## Getting started

### Install library with peer dependencies

```bash
npm install --save react-chartjs-2 chart.js

# or

yarn add react-chartjs-2 chart.js
```

###### We recommend using `chart.js ^3.0.0`

### Usage

```jsx
import { Doughnut } from 'react-chartjs-2';

<Doughnut data={...} />
```

## Examples

Live: [reactchartjs.github.io/react-chartjs-2](https://reactchartjs.github.io/react-chartjs-2/#/)

See [these examples](example) for more information

## Configure

### Chart props

```js
  id?: string;
  className?: string;
  height?: number;
  width?: number;
  redraw?: boolean;
  type: Chart.ChartType
  data: Chart.ChartData | (canvas: HTMLCanvasElement | null) => Chart.ChartData;
  options?: Chart.ChartOptions;
  fallbackContent?: React.ReactNode;
  plugins?: Chart.Plugin[];
  getDatasetAtEvent?: (dataset: Chart.InteractionItem[], event: React.MouseEvent<HTMLCanvasElement>) => void;
  getElementAtEvent?: (element: Chart.InteractionItem[], event: React.MouseEvent<HTMLCanvasElement>) => void;
  getElementsAtEvent?: (elements: Chart.InteractionItem[], event: React.MouseEvent<HTMLCanvasElement>) => void;
```

In TypeScript, you can import chart props types like this:

```ts
import type { ChartProps } from 'react-chartjs-2';
```

#### id

Type `string`
Default: `undefined`

ID attribute applied to the rendered canvas

#### className

Type `string`
Default: `undefined`

class attribute applied to the rendered canvas

#### height

Type: `number`
Default: `150`

Height attribute applied to the rendered canvas

#### width

Type: `number`
Default: `300`

Width attribute applied to the rendered canvas

#### redraw

Type: `boolean`
Default: `false`

If true, will tear down and redraw chart on all updates

#### type

Type: `'bar' | 'line' | 'scatter' | 'bubble' | 'pie' | 'doughnut' | 'polarArea' | 'radar'`

Chart.js chart type (required only on ChartComponent)

#### data (required)

Type: `Chart.ChartData | (canvas: HTMLCanvasElement | null) => Chart.ChartData`

The data object that is passed into the Chart.js chart ([more info](https://www.chartjs.org/docs/latest/getting-started/)).

This can also be a function, that receives a canvas element and returns the data object.

```tsx
const data = canvas => {
    const ctx = canvas.getContext('2d');
    const g = ctx.createLinearGradient(...);

    return {
        datasets: [{
            backgroundColor: g,
            // ...the rest
        }],
    };
}
```

#### options

Type: `Chart.ChartOptions`

The options object that is passed into the Chart.js chart ([more info](https://www.chartjs.org/docs/latest/general/options.html))

### fallbackContent

Type: `React.ReactNode`

A fallback for when the canvas cannot be rendered. Can be used for accessible chart descriptions ([more info](https://www.chartjs.org/docs/latest/general/accessibility.html))

#### plugins

Type: `Chart.PluginServiceRegistrationOptions[]`

The plugins array that is passed into the Chart.js chart ([more info](https://www.chartjs.org/docs/latest/developers/plugins.html))

#### getDatasetAtEvent

Type: `(dataset: Array<{}>, event: React.MouseEvent<HTMLCanvasElement>) => void`
Default: `undefined`

Proxy for Chart.js `getDatasetAtEvent`. Calls with dataset and triggering event

#### getElementAtEvent

Type: `(element: [{}], event: React.MouseEvent<HTMLCanvasElement>) => void`
Default: `undefined`

Proxy for Chart.js `getElementAtEvent`. Calls with single element array and triggering event

#### getElementsAtEvent

Type: `(elements: Array<{}>, event: React.MouseEvent<HTMLCanvasElement>) => void`
Default: `undefined`

Proxy for Chart.js `getElementsAtEvent`. Calls with element array and triggering event

## FAQ

### Why doesn't my chart maintain it's width/height?

In order for Chart.js to obey the custom size you need to set `maintainAspectRatio` to false

```tsx
<Bar
	data={data}
	width={100}
	height={50}
	options={{ maintainAspectRatio: false }}
/>
```

### How do I access my chart's instance?

The Chart.js instance can be accessed by placing a ref to the element as:

```tsx
const App => {
  const ref = useRef();

  return <Doughnut ref={ref} data={data} options={options} />;
};
```

### How do I access the canvas context?

The canvas node and hence context can be accessed within the data function.
This approach is useful when you want to keep your components pure.

```tsx
render() {
  const data = (canvas) => {
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createLinearGradient(0,0,100,0);

    return {
      backgroundColor: gradient
      // ...the rest
    }
  }

  return <Line data={data} />;
}
```

## Additional Information

### Defaults

Chart.js defaults can be set by importing the `defaults` object:

```tsx
import { defaults } from 'react-chartjs-2';

// Disable animating charts by default.
defaults.animation = false;
```

If you want to bulk set properties, try using the [lodash.merge](https://lodash.com/docs/#merge) function. This function will do a deep recursive merge preserving previously set values that you don't want to update.

````tsx
import { defaults } from 'react-chartjs-2';
import merge from 'lodash.merge';

merge(defaults, {
	animation: false,
  line: {
    borderColor: '#F85F73',
  }
});
``` -->

<!-- ### Chart.js object

You can access the internal Chart.js object to register plugins or extend charts like this:

```JavaScript
import { Chart } from 'react-chartjs-2';

componentWillMount() {
  Chart.register({
    afterDraw: function (chart, easing) {
      // Plugin code.
    }
  });
}
````

### Working with Multiple Datasets

You will find that any event which causes the chart to re-render, such as hover tooltips, etc., will cause the first dataset to be copied over to other datasets, causing your lines and bars to merge together. This is because to track changes in the dataset series, the library needs a `key` to be specified - if none is found, it can't tell the difference between the datasets while updating. To get around this issue, you can take these two approaches:

1. Add a `label` property on each dataset. By default, this library uses the `label` property as the key to distinguish datasets.
2. Specify a different property to be used as a key by passing a `datasetKeyProvider` prop to your chart component, which would return a unique string value for each dataset.

## Development

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `dist` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

## License

[MIT Licensed](LICENSE)
Copyright (c) 2020 Jeremy Ayerst
