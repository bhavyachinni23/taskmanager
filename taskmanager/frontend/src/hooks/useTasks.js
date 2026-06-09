import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

export const useTasks = (filters = {}) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => { if (v && v !== 'all') params.append(k, v); });
      const { data } = await api.get(`/tasks?${params}`);
      setTasks(data.tasks);
      setTotal(data.total);
    } catch (err) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const createTask = async (taskData) => {
    try {
      const { data } = await api.post('/tasks', taskData);
      setTasks(prev => [data.task, ...prev]);
      setTotal(prev => prev + 1);
      toast.success('Task created!');
      return { success: true, task: data.task };
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create task');
      return { success: false };
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const { data } = await api.put(`/tasks/${id}`, taskData);
      setTasks(prev => prev.map(t => t._id === id ? data.task : t));
      toast.success('Task updated!');
      return { success: true, task: data.task };
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update task');
      return { success: false };
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(prev => prev.filter(t => t._id !== id));
      setTotal(prev => prev - 1);
      toast.success('Task deleted!');
      return { success: true };
    } catch (err) {
      toast.error('Failed to delete task');
      return { success: false };
    }
  };

  return { tasks, loading, total, fetchTasks, createTask, updateTask, deleteTask };
};
