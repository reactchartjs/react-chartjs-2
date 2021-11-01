---
slug: /faq/chartjs-instance
---

# How to access the Chart.js instance?

The Chart.js instance can be accessed by placing a ref to the element as:

```tsx
function App() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;

    if (chart) {
      console.log('ChartJS', chart);
    }
  }, []);

  return <Chart ref={chartRef} type='line' data={chartData} />;
}
```

[See sandbox with working example](/examples/chart-ref).

