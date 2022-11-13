---
slug: /faq/registered-scale
---

# How to fix "... is not a registered scale" error?

As you can see in [migration to v4 guide](/docs/migration-to-v4#tree-shaking):

> v4 of this library, [just like Chart.js v3](https://www.chartjs.org/docs/latest/getting-started/v3-migration.html#setup-and-installation), is tree-shakable. It means that you need to import and register the controllers, elements, scales, and plugins you want to use.
>
> For a list of all the available items to import, see [Chart.js docs](https://www.chartjs.org/docs/latest/getting-started/integration.html#bundlers-webpack-rollup-etc).

So you should register missed components. For example, if you have `Uncaught Error: "category" is not a registered scale.` error, you should register `CategoryScale`:

```js
import { CategoryScale, Chart } from "chart.js";

Chart.register(CategoryScale);
```
