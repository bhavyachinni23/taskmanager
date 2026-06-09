import { FiCheckSquare } from 'react-icons/fi';

const EmptyState = ({ title = 'No tasks found', description = 'Create your first task to get started', action }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
      <FiCheckSquare className="text-3xl text-gray-400 dark:text-gray-500" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mb-6">{description}</p>
    {action}
  </div>
);

export default EmptyState;
