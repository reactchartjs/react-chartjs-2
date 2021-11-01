---
slug: /faq/canvas-context
---

# How to access the canvas context?

The canvas node and hence context can be accessed by placing a ref to the element as:

```tsx
function App() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;

    if (chart) {
      console.log('CanvasRenderingContext2D', chart.ctx);
      console.log('HTMLCanvasElement', chart.canvas);
    }
  }, []);

  return <Chart ref={chartRef} type='line' data={chartData} />;
}
```

[See sandbox with working example](/examples/gradient-chart).
