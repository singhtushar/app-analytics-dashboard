// src/components/BarChart.js
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { appsData as data } from "../../data/appsData";
import _isNumber from "lodash/isNumber";
import _times from "lodash/times";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function random_rgba() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return (
    "rgba(" +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    r().toFixed(1) +
    ")"
  );
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const PieChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    // Transform data for visualization
    const categories = [...new Set(data.map((app) => app.Category))];
    const averageRatings = categories.map((category) => {
      const categoryApps = data.filter((app) => app.Category === category);
      const totalRatings = categoryApps.reduce(
        (acc, app) => acc + (_isNumber(app.Rating) ? app.Rating : 0),
        0
      );
      const averageRating = totalRatings / categoryApps.length;
      return averageRating.toFixed(2);
    });

    setChartData({
      labels: categories,
      datasets: [
        {
          label: "Average Rating by Category",
          data: averageRatings,
          backgroundColor: _times(averageRatings.length, random_rgba),
        },
      ],
    });
  }, []);

  return (
    <div>
      <h2>Average Rating by Category</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
