---
slug: /faq/esm-only
---

# How to fix "Cannot find module 'react-chartjs-2'" error?

Chart.js v4 and react-chartjs-2 v5 are [ESM-only packages](https://nodejs.org/api/esm.html). To use them in your project, it also should be ESM:

```json title="package.json"
{
  "type": "module"
}
```

If you are experiencing this problem with Jest, you should follow [this doc](https://jestjs.io/docs/ecmascript-modules) to enable ESM support. Or, we can recommend you migrate to [Vitest](https://vitest.dev/). Vitest has ESM support out of the box and [has almost the same API as Jest](https://vitest.dev/guide/migration.html#migrating-from-jest). [Here is our example of migration](https://github.com/reactchartjs/react-chartjs-2/commit/7f3ec96101d21e43cae8cbfe5e09a46a17cff1ef).

