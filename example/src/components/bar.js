import React from "react";
import { Bar } from "react-chartjs-2";

const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [95, 59, 80, 81, 56, 55, 80],
        },
        {
            label: "My second dataset",
            backgroundColor: "rgba(55,109,82,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(55,109,82,0.2)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [95, 59, 80, 81, 56, 55, 80],
        },
    ],
};

function BarChart() {
    return (
        <div>
            <h2>Bar Example (custom size)</h2>
            <Bar
                data={data}
                width={100}
                height={250}
                options={{
                    maintainAspectRatio: false,
                }}
            />
        </div>
    );
}
export default BarChart;
