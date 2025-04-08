'use client';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface TodoFormProps {
  onSubmit: (
    title: string,
    dueDate?: string,
    priority?: 'low' | 'medium' | 'high'
  ) => void;
}

export default function TodoForm({ onSubmit }: TodoFormProps) {
  const { theme } = useTheme();
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, dueDate || undefined, priority);
    setTitle('');
    setDueDate('');
    setPriority('medium');
  };

  return (
    <div
      className={`p-6 rounded-2xl shadow-md transition-all ease-in-out ${
        theme === 'dark' ? 'bg-[#1c1c1e] text-white' : 'bg-white text-gray-800'
      }`}
    >
      <h2 className='text-xl font-semibold mb-4 font-sans tracking-wide'>
        Add New Task
      </h2>
      <form onSubmit={handleSubmit} className='space-y-6 font-sans'>
        {/* Task Title Input */}
        <div>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='What do you need to do?'
            className={`w-full p-4 text-sm rounded-xl outline-none focus:ring-2 transition-all
              ${
                theme === 'dark'
                  ? 'bg-[#2c2c2e] border border-[#3a3a3c] text-white focus:ring-pink-500'
                  : 'bg-gray-50 border border-gray-300 focus:ring-pink-500'
              }`}
            required
          />
        </div>

        {/* Due Date Input */}
        <div>
          <label
            className={`block mb-1 text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Due Date
          </label>
          <input
            type='date'
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={`w-full p-4 text-sm rounded-xl outline-none focus:ring-2 transition-all
              ${
                theme === 'dark'
                  ? 'bg-[#2c2c2e] border border-[#3a3a3c] text-white focus:ring-orange-400'
                  : 'bg-gray-50 border border-gray-300 focus:ring-orange-400'
              }`}
          />
        </div>

        {/* Priority Dropdown */}
        <div className="relative">
          <label
            className={`block mb-1 text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as 'low' | 'medium' | 'high')
            }
            className={`w-full p-4 text-sm rounded-xl outline-none focus:ring-2 transition-all
              ${
                theme === 'dark'
                  ? 'bg-[#2c2c2e] border border-[#3a3a3c] text-white focus:ring-purple-400'
                  : 'bg-gray-50 border border-gray-300 focus:ring-purple-400'
              }`}
          >
            <option value='low'>whenever</option>
            <option value='medium'>Soon</option>
            <option value='high'>ASAP</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full py-3 font-semibold text-white rounded-xl shadow-md transition-all bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500'
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
