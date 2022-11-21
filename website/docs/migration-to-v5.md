---
slug: /docs/migration-to-v5
description: react-chartjs-2 migration guide to v5
---

# Migration to v5

Chart.js v4 and react-chartjs-2 v5 are [ESM-only packages](https://nodejs.org/api/esm.html). To use them in your project, it also should be ESM:

```json title="package.json"
{
  "type": "module"
}
```
