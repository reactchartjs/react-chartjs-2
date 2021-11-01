---
slug: /docs/events
description: Working with events in react-chartjs-2
---

# Working with events

There are 3 helpers to get data from click event:

## getDatasetAtEvent

Get dataset from mouse click event.

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

Get single dataset element from mouse click event.

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

Get all dataset elements from mouse click event

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

[See sandbox with working example](/examples/chart-events).
