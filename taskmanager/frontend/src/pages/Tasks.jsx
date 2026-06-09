import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiSearch, FiFilter } from 'react-icons/fi';
import { useTasks } from '../hooks/useTasks';
import TaskCard from '../components/tasks/TaskCard';
import TaskModal from '../components/modals/TaskModal';
import ConfirmModal from '../components/modals/ConfirmModal';
import { TaskSkeleton } from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';

const Tasks = () => {
  const [filters, setFilters] = useState({ search: '', status: 'all', priority: 'all', sort: '-createdAt' });
  const [taskModal, setTaskModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const { tasks, loading, total, createTask, updateTask, deleteTask } = useTasks(filters);

  const setFilter = (key, val) => setFilters(p => ({ ...p, [key]: val }));

  const handleEdit = (task) => { setEditTask(task); setTaskModal(true); };
  const handleDelete = (id) => setDeleteId(id);
  const handleStatusChange = (id, status) => updateTask(id, { status });
  const handleSubmit = async (data) => {
    if (editTask) { await updateTask(editTask._id, data); setEditTask(null); }
    else await createTask(data);
  };

  const selectClass = "px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500";

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text" placeholder="Search tasks..." value={filters.search}
            onChange={e => setFilter('search', e.target.value)}
            className="input-field pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <select value={filters.status} onChange={e => setFilter('status', e.target.value)} className={selectClass}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select value={filters.priority} onChange={e => setFilter('priority', e.target.value)} className={selectClass}>
            <option value="all">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
          <select value={filters.sort} onChange={e => setFilter('sort', e.target.value)} className={selectClass}>
            <option value="-createdAt">Newest First</option>
            <option value="createdAt">Oldest First</option>
            <option value="dueDate">Due Date</option>
            <option value="-priority">Priority</option>
            <option value="title">Title A-Z</option>
          </select>
          <button onClick={() => { setEditTask(null); setTaskModal(true); }} className="btn-primary flex items-center gap-2">
            <FiPlus /> New Task
          </button>
        </div>
      </div>

      {/* Count */}
      {!loading && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {total} {total === 1 ? 'task' : 'tasks'} found
        </p>
      )}

      {/* Task List */}
      {loading ? (
        <div className="space-y-3">{Array(5).fill(0).map((_, i) => <TaskSkeleton key={i} />)}</div>
      ) : tasks.length === 0 ? (
        <EmptyState
          title="No tasks found"
          description={filters.search || filters.status !== 'all' || filters.priority !== 'all' ? 'Try adjusting your filters.' : 'Create your first task to get started!'}
          action={
            <button onClick={() => setTaskModal(true)} className="btn-primary flex items-center gap-2">
              <FiPlus /> Create Task
            </button>
          }
        />
      ) : (
        <AnimatePresence mode="popLayout">
          <div className="space-y-3">
            {tasks.map(task => (
              <TaskCard key={task._id} task={task} onEdit={handleEdit} onDelete={handleDelete} onStatusChange={handleStatusChange} />
            ))}
          </div>
        </AnimatePresence>
      )}

      <TaskModal isOpen={taskModal} onClose={() => { setTaskModal(false); setEditTask(null); }} onSubmit={handleSubmit} task={editTask} />
      <ConfirmModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => deleteTask(deleteId)} />
    </div>
  );
};

export default Tasks;
