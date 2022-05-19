---
slug: /faq/typescript
---

# How to use react-chartjs-2 with TypeScript?

TypeScript has extremely robust type inference capabilities and most of the time
we can enjoy type safety and autocompletion without having to do any extra work.

But occasionally types need to be set explicitly. They can be imported from `Chart.js`:

```typescript
import type { ChartData, ChartOptions } from 'chart.js';
```

...and then used with `options` and `data` props:

```typescript
interface LineProps {
  options: ChartOptions<'line'>;
  data: ChartData<'line'>;
}
```

The generic type being passed is a `ChartType` that can be one of the following values:
`'bar'`, `'line'`, `'scatter'`, `'bubble'`, `'pie'`, `'doughnut'`, `'polarArea'` or `'radar'`.
