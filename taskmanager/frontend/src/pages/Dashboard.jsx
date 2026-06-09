import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckSquare, FiClock, FiAlertCircle, FiList, FiPlus, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../hooks/useTasks';
import TaskCard from '../components/tasks/TaskCard';
import TaskModal from '../components/modals/TaskModal';
import ConfirmModal from '../components/modals/ConfirmModal';
import { StatSkeleton, TaskSkeleton } from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';

const StatCard = ({ icon: Icon, label, value, color, delay }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
    className="card p-5">
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</span>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="text-lg" />
      </div>
    </div>
    <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
  </motion.div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const { tasks, loading, createTask, updateTask, deleteTask } = useTasks();
  const [taskModal, setTaskModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'completed').length
  };

  const recentTasks = tasks.slice(0, 5);

  const handleEdit = (task) => { setEditTask(task); setTaskModal(true); };
  const handleDelete = (id) => setDeleteId(id);
  const handleStatusChange = (id, status) => updateTask(id, { status });

  const handleSubmit = async (data) => {
    if (editTask) {
      await updateTask(editTask._id, data);
      setEditTask(null);
    } else {
      await createTask(data);
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {user?.name?.split(' ')[0]}! 👋
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Here's your task overview for today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? Array(4).fill(0).map((_, i) => <StatSkeleton key={i} />) : (
          <>
            <StatCard icon={FiList} label="Total Tasks" value={stats.total} color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" delay={0} />
            <StatCard icon={FiCheckSquare} label="Completed" value={stats.completed} color="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" delay={0.05} />
            <StatCard icon={FiClock} label="In Progress" value={stats.inProgress} color="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400" delay={0.1} />
            <StatCard icon={FiAlertCircle} label="Overdue" value={stats.overdue} color="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" delay={0.15} />
          </>
        )}
      </div>

      {/* Recent Tasks */}
      <div className="card">
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">Recent Tasks</h3>
          <div className="flex items-center gap-3">
            <Link to="/tasks" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
              View all <FiArrowRight />
            </Link>
            <button onClick={() => { setEditTask(null); setTaskModal(true); }} className="btn-primary text-sm py-1.5 flex items-center gap-1">
              <FiPlus /> New Task
            </button>
          </div>
        </div>
        <div className="p-5">
          {loading ? (
            <div className="space-y-3">{Array(3).fill(0).map((_, i) => <TaskSkeleton key={i} />)}</div>
          ) : recentTasks.length === 0 ? (
            <EmptyState
              description="You have no tasks yet. Create one to get started!"
              action={<button onClick={() => setTaskModal(true)} className="btn-primary flex items-center gap-2"><FiPlus />Create Task</button>}
            />
          ) : (
            <div className="space-y-3">
              {recentTasks.map(task => (
                <TaskCard key={task._id} task={task} onEdit={handleEdit} onDelete={handleDelete} onStatusChange={handleStatusChange} />
              ))}
            </div>
          )}
        </div>
      </div>

      <TaskModal isOpen={taskModal} onClose={() => { setTaskModal(false); setEditTask(null); }} onSubmit={handleSubmit} task={editTask} />
      <ConfirmModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => deleteTask(deleteId)} />
    </div>
  );
};

export default Dashboard;
