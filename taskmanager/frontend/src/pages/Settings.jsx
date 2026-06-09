import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiBell, FiMail, FiSave } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${checked ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'}`}
  >
    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${checked ? 'translate-x-5' : ''}`} />
  </button>
);

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, updateUser } = useAuth();
  const [notifications, setNotifications] = useState(user?.notifications || { email: true, push: true });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data } = await api.put('/auth/profile', { notifications });
      updateUser(data.user);
      toast.success('Settings saved!');
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Appearance */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Appearance</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {theme === 'dark' ? <FiMoon className="text-gray-500 text-lg" /> : <FiSun className="text-yellow-500 text-lg" />}
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Toggle between light and dark theme</p>
            </div>
          </div>
          <Toggle checked={theme === 'dark'} onChange={toggleTheme} />
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Notifications</h3>
        <div className="space-y-4">
          {[
            { key: 'email', icon: FiMail, label: 'Email Notifications', desc: 'Receive notifications via email' },
            { key: 'push', icon: FiBell, label: 'Push Notifications', desc: 'Receive in-app push notifications' },
          ].map(({ key, icon: Icon, label, desc }) => (
            <div key={key} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
              <div className="flex items-center gap-3">
                <Icon className="text-gray-500 text-lg" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
                </div>
              </div>
              <Toggle checked={notifications[key]} onChange={val => setNotifications(p => ({ ...p, [key]: val }))} />
            </div>
          ))}
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary mt-4 flex items-center gap-2">
          <FiSave /> {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </motion.div>

      {/* About */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">About TaskFlow</h3>
        <div className="space-y-1.5 text-sm text-gray-500 dark:text-gray-400">
          <p>Version 1.0.0</p>
          <p>Built with React, Vite, Tailwind CSS, Node.js, Express, MongoDB, Socket.IO & Chart.js</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
