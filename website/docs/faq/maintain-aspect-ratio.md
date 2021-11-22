---
slug: /faq/maintain-aspect-ratio
---

# Why doesn't the chart maintain its width/height?

In order for Chart.js to obey the custom size you need to set `maintainAspectRatio` to `false`:

```tsx
<Bar
  data={data}
  width={100}
  height={50}
  options={{ maintainAspectRatio: false }}
/>
```
