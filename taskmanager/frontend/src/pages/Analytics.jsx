import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement,
  Title, Tooltip, Legend, LineElement, PointElement
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import api from '../utils/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, LineElement, PointElement);

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/tasks/analytics').then(({ data }) => {
      setAnalytics(data.analytics);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array(4).fill(0).map((_, i) => <div key={i} className="card h-64 animate-pulse bg-gray-100 dark:bg-gray-700 rounded-xl" />)}
    </div>
  );

  if (!analytics) return <p className="text-gray-500">Failed to load analytics.</p>;

  const statusMap = Object.fromEntries(analytics.statusStats.map(s => [s._id, s.count]));
  const priorityMap = Object.fromEntries(analytics.priorityStats.map(s => [s._id, s.count]));

  const statusData = {
    labels: ['Pending', 'In Progress', 'Completed'],
    datasets: [{
      data: [statusMap['pending'] || 0, statusMap['in-progress'] || 0, statusMap['completed'] || 0],
      backgroundColor: ['#94a3b8', '#3b82f6', '#22c55e'],
      borderWidth: 0,
    }]
  };

  const priorityData = {
    labels: ['Low', 'Medium', 'High', 'Critical'],
    datasets: [{
      label: 'Tasks',
      data: [priorityMap.low || 0, priorityMap.medium || 0, priorityMap.high || 0, priorityMap.critical || 0],
      backgroundColor: ['#60a5fa', '#facc15', '#fb923c', '#f87171'],
      borderRadius: 6,
    }]
  };

  const dailyData = {
    labels: analytics.dailyStats.map(d => d._id),
    datasets: [{
      label: 'Tasks Created',
      data: analytics.dailyStats.map(d => d.count),
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59,130,246,0.1)',
      fill: true,
      tension: 0.4,
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: 'bottom' } },
    maintainAspectRatio: false
  };

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Tasks', value: analytics.total, color: 'text-blue-600' },
          { label: 'Completed', value: statusMap['completed'] || 0, color: 'text-green-600' },
          { label: 'In Progress', value: statusMap['in-progress'] || 0, color: 'text-yellow-600' },
          { label: 'Overdue', value: analytics.overdue, color: 'text-red-600' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card p-5">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{s.label}</p>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="card p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Status Distribution</h3>
          <div className="h-56">
            <Doughnut data={statusData} options={{ ...chartOptions, cutout: '60%' }} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="card p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Priority Breakdown</h3>
          <div className="h-56">
            <Bar data={priorityData} options={{ ...chartOptions, plugins: { legend: { display: false } } }} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="card p-5 md:col-span-2">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Tasks Created (Last 7 Days)</h3>
          <div className="h-56">
            <Line data={dailyData} options={chartOptions} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
