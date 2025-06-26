// src/components/ProgressTracker.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ProgressTracker = () => {
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Study Hours',
        data: [10, 12, 8, 15],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Study Progress Over Time',
      },
    },
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Progress Tracker</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default ProgressTracker;
