// components/TodoForm.tsx
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
      className={`p-4 rounded-lg ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
      }`}
    >
      <h2 className='text-lg font-semibold mb-4'>Add New Task</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Task title'
            className={`w-full p-2 border rounded ${
              theme === 'dark'
                ? 'bg-gray-600 border-gray-500 text-white'
                : 'bg-white border-gray-300'
            }`}
            required
          />
        </div>

        <div>
          <label
            className={`block mb-1 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Due Date
          </label>
          <input
            type='date'
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={`w-full p-2 border rounded ${
              theme === 'dark'
                ? 'bg-gray-600 border-gray-500 text-white'
                : 'bg-white border-gray-300'
            }`}
          />
        </div>

        <div>
          <label
            className={`block mb-1 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as 'low' | 'medium' | 'high')
            }
            className={`w-full p-2 border rounded ${
              theme === 'dark'
                ? 'bg-gray-600 border-gray-500 text-white'
                : 'bg-white border-gray-300'
            }`}
          >
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
          </select>
        </div>

        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700'
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
