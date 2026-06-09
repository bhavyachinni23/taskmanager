import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiCalendar, FiClock } from 'react-icons/fi';
import { PRIORITY_CONFIG, STATUS_CONFIG, formatDate, isOverdue } from '../../utils/helpers';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const priority = PRIORITY_CONFIG[task.priority];
  const status = STATUS_CONFIG[task.status];
  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="card p-4 hover:shadow-md transition-shadow duration-200 group"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <input
            type="checkbox"
            checked={task.status === 'completed'}
            onChange={() => onStatusChange(task._id, task.status === 'completed' ? 'pending' : 'completed')}
            className="mt-1 w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className={`font-medium text-gray-900 dark:text-white truncate ${task.status === 'completed' ? 'line-through text-gray-400' : ''}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{task.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button onClick={() => onEdit(task)} className="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
            <FiEdit2 className="text-sm" />
          </button>
          <button onClick={() => onDelete(task._id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
            <FiTrash2 className="text-sm" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className={`badge ${priority.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${priority.dot} mr-1`} />
          {priority.label}
        </span>
        <span className={`badge ${status.color}`}>{status.label}</span>
        {task.dueDate && (
          <span className={`badge flex items-center gap-1 ${overdue ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}>
            <FiCalendar className="text-xs" />
            {overdue ? 'Overdue' : formatDate(task.dueDate)}
          </span>
        )}
        {task.tags?.map(tag => (
          <span key={tag} className="badge bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">#{tag}</span>
        ))}
      </div>
    </motion.div>
  );
};

export default TaskCard;
