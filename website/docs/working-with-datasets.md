---
slug: /docs/working-with-datasets
description: Working with datasets in react-chartjs-2
---

# Working with datasets

You will find that any event which causes the chart to re-render, such as hover tooltips, etc., will cause the first dataset to be copied over to other datasets, causing your lines and bars to merge together.

This is because to track changes in the dataset series, the library needs a `key` to be specified. If none is found, it can't tell the difference between the datasets while updating. To get around this issue, you can take these two approaches:

1. Add a `label` property to each dataset. By default, this library uses the `label` property as the key to distinguish datasets.
2. Specify a different property to be used as a key by passing a `datasetIdKey` prop to your chart component.

See this example:

```tsx
import { Line } from 'react-chartjs-2';

<Line
  datasetIdKey='id'
  data={{
    labels: ['Jun', 'Jul', 'Aug'],
    datasets: [
      {
        id: 1,
        label: '',
        data: [5, 6, 7],
      },
      {
        id: 2,
        label: '',
        data: [3, 2, 1],
      },
    ],
  }}
/>
```
