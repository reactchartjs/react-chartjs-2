---
slug: /faq/registered-element
---

# How to fix "... is not a registered element" error?

As you can see in [migration to v4 guide](/docs/migration-to-v4#tree-shaking):

> v4 of this library, [just like Chart.js v3](https://www.chartjs.org/docs/latest/getting-started/v3-migration.html#setup-and-installation), is tree-shakable. It means that you need to import and register the controllers, elements, scales, and plugins you want to use.
>
> For a list of all the available items to import, see [Chart.js docs](https://www.chartjs.org/docs/latest/getting-started/integration.html#bundlers-webpack-rollup-etc).

So you should register missed components. For example, if you have `Uncaught Error: "arc" is not a registered element.` error, you should register `ArcElement`:

```js
import { ArcElement } from "chart.js";

ChartJS.register(ArcElement);
```
