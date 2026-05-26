import React, { useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
      offset: [2, 2, 2, 2, 2, 2], // Initialize offset for each segment
    },
  ],
};

export function App() {
  const chartRef = useRef(null);

  // Function to handle click events on the Doughnut chart
  const handleChartClick = (e) => {
    const chart = chartRef.current;
    const points = chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);

    if (points.length) {
      const firstPoint = points[0];

      // Apply the offset effect
      chart.data.datasets[firstPoint.datasetIndex].offset[firstPoint.index] = 60;
      chart.update();

      // Reset the offset after a brief delay
      setTimeout(() => {
        chart.data.datasets[firstPoint.datasetIndex].offset[firstPoint.index] = 0;
        chart.update();
      }, 1000); // Adjust the delay time as needed
    }
  };

  // Function to handle click events on legend items
  const handleLegendClick = (e, legendItem,legend) => {
    const chart = legend.chart;
    const index = legendItem.index;

    // Apply the offset effect
    chart.data.datasets[0].offset[index] = 60;
    chart.tooltip.setActiveElements([{ datasetIndex: 0, index }]);
    chart.update();

    // Reset the offset after a brief delay
    setTimeout(() => {
      chart.data.datasets[0].offset[index] = 0;
      chart.update();
    }, 1000); // Adjust the delay time as needed
  };

  return (
    <Doughnut
      data={data}
      options={{
        maintainAspectRatio: true,
        responsive: true,
        onClick: (e) => handleChartClick(e), // Call the function for chart click events
        plugins: {
          legend: {
            onClick:  handleLegendClick// Call the function for legend item click events
          },
        },
      }}
      ref={chartRef}
    />
  );
}
