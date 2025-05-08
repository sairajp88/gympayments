// src/components/RevenueChart.jsx
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
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

export default function RevenueChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Monthly Revenue (₹)',
        data: [4000, 5000, 6000, 3000, 7000],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: '#007bff',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      },
    },
  };

  return (
    <div className="card mt-4">
      <div className="card-header">Monthly Revenue</div>
      <div className="card-body">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
