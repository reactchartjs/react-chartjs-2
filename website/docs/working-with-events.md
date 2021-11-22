---
slug: /docs/working-with-events
description: Working with events in react-chartjs-2
---

# Working with events

There are three helper methods to get data from click event.

## getDatasetAtEvent

Gets dataset from mouse click event.

```jsx
import { useRef } from 'react';
import { Bar, getDatasetAtEvent } from 'react-chartjs-2';

function App() {
  const chartRef = useRef();
  const onClick = (event) => {
    console.log(getDatasetAtEvent(chartRef.current, event));
  }

  return (
    <Bar
      ref={chartRef}
      data={data}
      onClick={onClick}
    />
  );
}
```

## getElementAtEvent

Gets single dataset element from mouse click event.

```jsx
import { useRef } from 'react';
import { Bar, getElementAtEvent } from 'react-chartjs-2';

function App() {
  const chartRef = useRef();
  const onClick = (event) => {
    console.log(getElementAtEvent(chartRef.current, event));
  }

  return (
    <Bar
      ref={chartRef}
      data={data}
      onClick={onClick}
    />
  );
}
```

## getElementsAtEvent

Gets all dataset elements from mouse click event.

```jsx
import { useRef } from 'react';
import { Bar, getElementsAtEvent } from 'react-chartjs-2';

function App() {
  const chartRef = useRef();
  const onClick = (event) => {
    console.log(getElementsAtEvent(chartRef.current, event));
  }

  return (
    <Bar
      ref={chartRef}
      data={data}
      onClick={onClick}
    />
  );
}
```

See the [full working example](/examples/chart-events).
