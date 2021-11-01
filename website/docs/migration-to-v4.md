---
slug: /docs/migration-to-v4
description: react-chartjs-2 migration guide to v4
---

# Migration to v4

react-chartjs-2 introduces a number of breaking changes. In order to improve performance, offer new features, and improve maintainability, it was necessary to break backwards compatibility, but we aimed to do so only when worth the benefit.

## New exports

- All re-exports from `chart.js` were removed;
- Default export was renamed to `Chart`.

```jsx title="v3"
import Chart, {
  Chart as ChartJS,
  defaults
} from 'react-chartjs-2';
```

```jsx title="v4"
import {
  Chart as ChartJS,
  defaults
} from 'chart.js';
import {
  Chart
} from 'react-chartjs-2';
```

## Tree-shaking

react-chartjs-2@v4, [just like Chart.js@v3](https://www.chartjs.org/docs/latest/getting-started/v3-migration.html#setup-and-installation), is tree-shakable. So you need to import and register the controllers, elements, scales and plugins you want to use, for a list of all the available items to import see [Chart.js docs](https://www.chartjs.org/docs/latest/getting-started/integration.html#bundlers-webpack-rollup-etc).

```jsx title="v3"
import Chart from 'react-chartjs-2';

<Chart type='line' data={chartData} />
```

```jsx title="v4 - lazy way"
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

<Chart type='line' data={chartData} />
```

```jsx title="v4 - tree-shakable way"
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title);

<Chart type='line' data={chartData} />
```

Typed chart components register their controllers by default, so you don't need to register them by yourself. For example: using [`Line`](/components/line) component you don't need to register `LineController`.

```jsx title="v4 - Line component"
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title);

<Line data={chartData} />
```

## Draw charts with gradients

The possibility to pass a function to the `data` prop was removed.

```jsx title="v3"
const chartData = canvas => {
  const ctx = canvas.getContext('2d');

  return {
    datasets: [{
        backgroundColor: createBackgroundGradient(ctx),
        // ...
    }],
  };
};

<Chart type='bar' data={chartData} />
```

```jsx title="v4"
const chartRef = useRef(null);
const [chartData, setChartData] = useState({
  datasets: [],
});

useEffect(() => {
  const chart = chartRef.current;

  if (chart) {
    setChartData({
      datasets: [{
          backgroundColor: createBackgroundGradient(chart.ctx),
          // ...
      }]
    });
  }
}, []);

<Chart type='bar' data={chartData} />
```

[See full working example.](/examples/gradient-chart)

## Get data from click events

`getDatasetAtEvent`, `getElementAtEvent` and `getElementsAtEvent` props were removed in favor of tree-shakable methods with the same names.

```jsx title="v3"
<Chart
  type='bar'
  data={chartData}
  getDatasetAtEvent={(dataset, event) => { /* ... */ }}
  getElementAtEvent={(element, event) => { /* ... */ }}
  getElementsAtEvent={(elements, event) => { /* ... */ }}
/>
```

```jsx title="v4"
const chartRef = useRef(null);

<Chart
  ref={chartRef}
  type='bar'
  data={chartData}
  onClick={(event) => {
    const dataset = getDatasetAtEvent(chartRef.current, event);
    const element = getElementAtEvent(chartRef.current, event);
    const elements = getElementsAtEvent(chartRef.current, event);
  }}
/>
```

[See full working example.](/examples/chart-events)
